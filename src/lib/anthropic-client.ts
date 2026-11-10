import Anthropic from '@anthropic-ai/sdk';
import { getVercelOidcToken } from '@vercel/oidc';

/**
 * Anthropic client authenticated by workload identity federation, with no
 * API key stored anywhere.
 *
 * On Vercel each function invocation can get a short-lived OIDC token for
 * this project. It is exchanged at Anthropic's token endpoint for an access
 * token, under the rule `fhiriq-site-chat-prod` in the "vestel ai llc" org,
 * which accepts only fhiriq-nextjs production deployments and only allows
 * model calls (workspace:inference). scripts/setup-anthropic-wif.sh created
 * the rule and set the three IDs below in Vercel.
 *
 * The SDK's own federation reads the identity token from a file or an env
 * var, which does not fit Vercel, where the token arrives per request. This
 * provider does the same RFC 7523 exchange the SDK does
 * (lib/credentials/oidc-federation.js) and caches the result.
 *
 * Returns null when the IDs are not configured (local dev, preview), and the
 * chat route then answers with its fixed fallback text.
 */

const TOKEN_URL = 'https://api.anthropic.com/v1/oauth/token';
const BETAS = 'oauth-2025-04-20,oidc-federation-2026-04-01';

let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(opts?: { forceRefresh?: boolean }) {
  const now = Math.floor(Date.now() / 1000);
  if (cached && !opts?.forceRefresh && cached.expiresAt - 60 > now) {
    return cached;
  }

  const body: Record<string, string> = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: await getVercelOidcToken(),
    federation_rule_id: process.env.ANTHROPIC_FEDERATION_RULE_ID!,
    organization_id: process.env.ANTHROPIC_ORGANIZATION_ID!,
    service_account_id: process.env.ANTHROPIC_SERVICE_ACCOUNT_ID!,
  };
  if (process.env.ANTHROPIC_WORKSPACE_ID) {
    body.workspace_id = process.env.ANTHROPIC_WORKSPACE_ID;
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'anthropic-beta': BETAS },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // The response body can echo request details; log only the status and
    // request id. The Workload identity page in Claude Console has the rest.
    throw new Error(
      `WIF token exchange failed: ${res.status} (request-id ${res.headers.get('request-id') ?? 'none'})`,
    );
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: data.access_token, expiresAt: now + Number(data.expires_in) };
  return cached;
}

export function federatedClient(): Anthropic | null {
  const configured =
    process.env.ANTHROPIC_FEDERATION_RULE_ID &&
    process.env.ANTHROPIC_ORGANIZATION_ID &&
    process.env.ANTHROPIC_SERVICE_ACCOUNT_ID;
  if (!configured) return null;
  return new Anthropic({ credentials: accessToken });
}
