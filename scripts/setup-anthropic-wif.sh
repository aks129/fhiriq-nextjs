#!/usr/bin/env bash
# One-time setup: let fhiriq.com's /api/chat (running on Vercel) call Claude
# through Anthropic workload identity federation, with no API key stored.
#
# Creates, in the Anthropic organization:
#   1. a service account "fhiriq-site-chat" (role: developer)
#   2. a federation issuer for Vercel's team OIDC tokens
#   3. a rule that accepts only fhiriq-nextjs production tokens
# Reuses any of the three that already exist with the same name, so it is
# safe to re-run. The existing github-actions issuer is not touched.
#
# Needs: the `ant` CLI (brew install anthropics/tap/ant), jq, and an org admin
# login. Federation endpoints accept only an org:admin OAuth token, not an
# API key.
#
# Usage:
#   bash scripts/setup-anthropic-wif.sh
#   PROFILE=fhiriq-admin bash scripts/setup-anthropic-wif.sh   # another ant profile
#
# The rule applies to all workspaces (the org has only the Default Workspace),
# and its scope is workspace:inference, which allows model calls and nothing
# else. Optionally pin one workspace: WORKSPACE_ID=wrkspc_... bash ...
set -euo pipefail

TEAM=aks129s-projects
PROJECT=fhiriq-nextjs
ISSUER_URL="https://oidc.vercel.com/$TEAM"
SUBJECT="owner:$TEAM:project:$PROJECT:environment:production"
API=https://api.anthropic.com

command -v ant >/dev/null || { echo "Install the ant CLI first: brew install anthropics/tap/ant"; exit 1; }
command -v jq  >/dev/null || { echo "Install jq first: brew install jq"; exit 1; }

# An API key in the environment would be sent instead of the admin token.
unset ANTHROPIC_API_KEY
PROFILE=${PROFILE:-admin}
if ! TOKEN=$(ant auth print-credentials --profile "$PROFILE" --access-token 2>/dev/null) || [ -z "$TOKEN" ]; then
  ant auth login --profile "$PROFILE" --scope "org:admin"
  TOKEN=$(ant auth print-credentials --profile "$PROFILE" --access-token)
fi

call() { # call METHOD PATH [JSON]
  local out code
  out=$(curl -sS -w '\n%{http_code}' -X "$1" "$API$2" \
    -H "authorization: Bearer $TOKEN" \
    -H "anthropic-version: 2026-10-21" \
    -H "content-type: application/json" ${3:+-d "$3"})
  code=${out##*$'\n'}; out=${out%$'\n'*}
  if [ "$code" -ge 300 ]; then echo "HTTP $code on $1 $2: $out" >&2; exit 1; fi
  printf '%s' "$out"
}

ORG=$(call GET /v1/organizations/me)
ORG_ID=$(jq -r .id <<<"$ORG")
echo "Organization: $(jq -r .name <<<"$ORG") ($ORG_ID)"
if [ -z "${YES:-}" ]; then
  read -r -p "Set up the site chat in this org? [y/N] " ok
  [ "$ok" = y ] || { echo "Stopped. Log in to the right org: ant auth login --profile $PROFILE --scope org:admin"; exit 1; }
fi

echo "Workspaces besides Default: $(call GET "/v1/organizations/workspaces?limit=100" | jq '.data | length')"

# 1. Service account
SA_ID=$(call GET "/v1/organizations/service_accounts?limit=100" \
  | jq -r '.data[] | select(.name=="fhiriq-site-chat") | .id' | head -1)
if [ -z "$SA_ID" ]; then
  SA_ID=$(call POST /v1/organizations/service_accounts \
    '{"name":"fhiriq-site-chat","organization_role":"developer"}' | jq -r .id)
  echo "Created service account $SA_ID"
else
  echo "Reusing service account $SA_ID"
fi

# 2. Issuer for Vercel team OIDC tokens
ISSUER_ID=$(call GET "/v1/organizations/federation_issuers?limit=100" \
  | jq -r --arg u "$ISSUER_URL" '.data[] | select(.issuer_url==$u) | .id' | head -1)
if [ -z "$ISSUER_ID" ]; then
  ISSUER_ID=$(call POST /v1/organizations/federation_issuers "$(jq -n --arg u "$ISSUER_URL" \
    '{name:"vercel-aks129s-projects", issuer_url:$u, jwks:{type:"discovery"}}')" | jq -r .id)
  echo "Created issuer $ISSUER_ID"
else
  echo "Reusing issuer $ISSUER_ID"
fi

# 3. Rule: only fhiriq-nextjs production deployments
RULE_ID=$(call GET "/v1/organizations/federation_rules?limit=100" \
  | jq -r '.data[] | select(.name=="fhiriq-site-chat-prod") | .id' | head -1)
if [ -z "$RULE_ID" ]; then
  RULE_ID=$(call POST /v1/organizations/federation_rules "$(jq -n \
    --arg iss "$ISSUER_ID" --arg sub "$SUBJECT" --arg sa "$SA_ID" --arg ws "${WORKSPACE_ID:-}" \
    '{name:"fhiriq-site-chat-prod", issuer_id:$iss,
      match:{subject_prefix:$sub},
      target:{type:"service_account", service_account_id:$sa},
      oauth_scope:"workspace:inference",
      token_lifetime_seconds:600}
     + (if $ws == "" then {applies_to_all_workspaces:true} else {workspace_id:$ws} end)')" | jq -r .id)
  echo "Created rule $RULE_ID"
else
  echo "Reusing rule $RULE_ID"
fi

# 4. Store the IDs in Vercel production. They are identifiers, not secrets.
cd "$(dirname "$0")/.."
pairs=("ANTHROPIC_FEDERATION_RULE_ID=$RULE_ID" "ANTHROPIC_ORGANIZATION_ID=$ORG_ID" \
       "ANTHROPIC_SERVICE_ACCOUNT_ID=$SA_ID")
[ -n "${WORKSPACE_ID:-}" ] && pairs+=("ANTHROPIC_WORKSPACE_ID=$WORKSPACE_ID")
for pair in "${pairs[@]}"; do
  name=${pair%%=*}; value=${pair#*=}
  printf '%s' "$value" | vercel env add "$name" production --force >/dev/null
  echo "Set $name in Vercel production"
done

echo
echo "Done. Tell Claude: \"WIF is set up\" so it can wire /api/chat to use it."
