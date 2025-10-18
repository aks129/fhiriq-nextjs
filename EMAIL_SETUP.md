# Email Setup for FHIR IQ Contact Form

## Overview

Contact form submissions are sent to **gene@fhiriq.com** using the Resend email service.

## Setup Steps

### 1. Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Free tier includes 3,000 emails/month (plenty for contact forms)

### 2. Verify Your Domain

**Important**: You need to verify **fhiriq.com** to send from @fhiriq.com addresses.

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter: `fhiriq.com`
4. Copy the DNS records provided
5. Add these DNS records to your domain registrar:
   - TXT record for domain verification
   - DKIM records for email authentication
6. Click "Verify" after DNS propagates (can take 1-48 hours)

**DNS Records Example:**
```
Type: TXT
Name: _resend (or as specified)
Value: [provided by Resend]

Type: TXT  
Name: resend._domainkey
Value: [provided by Resend]
```

### 3. Get API Key

1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it: "FHIR IQ Contact Form"
4. Permission: "Sending access"
5. Copy the API key (shown only once!)

### 4. Add to Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your `fhiriq-nextjs` project
3. Settings → Environment Variables
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: [Your API key from step 3]
   - **Environment**: All (Production, Preview, Development)
5. Click "Save"

### 5. Redeploy

Option A: Automatic
- Push any change to trigger deployment

Option B: Manual
- Go to Deployments tab
- Click three dots on latest deployment  
- Click "Redeploy"

## Email Details

**From Address**: `FHIR IQ Contact Form <noreply@fhiriq.com>`
**To Address**: `gene@fhiriq.com`
**Reply-To**: Customer's email address (so you can reply directly)

**Email Format**:
```
Subject: FHIR IQ Contact: [Name] - [Company]

New Contact Form Submission

From: [Customer Name]
Email: [Customer Email]
Company: [Company or "Not provided"]

Message:
[Customer's message]

---
Submitted from: https://fhiriq.com
Time: [Timestamp in ET]
```

## Testing

1. Visit https://fhiriq.com/contact
2. Fill out the form
3. Submit
4. Check gene@fhiriq.com inbox (might take 1-2 minutes)
5. Verify you can reply directly to the customer

## Troubleshooting

**Not receiving emails?**

1. Check Resend dashboard → Logs to see delivery status
2. Check spam folder in gene@fhiriq.com
3. Verify domain is verified in Resend
4. Check Vercel environment variable is set
5. Check Vercel deployment logs for errors

**Domain not verified?**

1. Use DNS checker: https://mxtoolbox.com/SuperTool.aspx
2. Enter: `_resend.fhiriq.com`
3. Verify TXT record appears
4. Wait 1-24 hours for propagation
5. Click "Verify" again in Resend

**Temporary workaround** (until domain verified):
- Use Resend's test domain temporarily
- Change line 68 in `/api/contact/route.ts`:
  ```typescript
  from: 'FHIR IQ Contact Form <onboarding@resend.dev>',
  ```

## Current Status

✅ Contact form API implemented
✅ Email validation added
✅ HTML and plain text email formats
✅ Reply-to header set to customer email
✅ Graceful fallback if API key not set
⏳ Waiting for RESEND_API_KEY configuration
⏳ Waiting for domain verification

## Cost

Resend Pricing:
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails

Contact forms typically use < 100 emails/month, so **free tier is sufficient**.
