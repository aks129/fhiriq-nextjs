# Substack Newsletter Integration Setup

This guide explains how to configure the FHIR IQ newsletter subscription integration with Substack.

## Features

✅ **Automatic Substack Subscription**: Subscribers are automatically added to your Substack publication
✅ **Instant Confirmation Email**: Welcome email sent immediately via Resend
✅ **Admin Notifications**: Get notified at gene@fhiriq.com for each new subscriber
✅ **Professional Welcome Email**: Branded email with links to tools and resources

## Prerequisites

1. **Substack Publication**: Active Substack publication at `evestel.substack.com`
2. **Resend Account**: Active account at [resend.com](https://resend.com) (same as contact form setup)
3. **Domain Verified**: `fhiriq.com` domain verified in Resend

## Configuration

### 1. Environment Variables

Add these to your Vercel environment variables:

```bash
# Required - Already configured for contact form
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional - Substack Publication ID
SUBSTACK_PUBLICATION_ID=evestel
```

**Where to get these values:**

- **RESEND_API_KEY**: Same as contact form - already configured in Vercel
- **SUBSTACK_PUBLICATION_ID**: Your Substack subdomain (e.g., "evestel" from evestel.substack.com)

### 2. Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/your-project
2. Navigate to **Settings** → **Environment Variables**
3. Add the variables (if not already present):
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key from https://resend.com/api-keys
   - Environment: Production, Preview, Development (check all)
4. Click **Save**
5. **Redeploy** your application for changes to take effect

### 3. Verify Resend Email Domains

The newsletter integration sends emails from two addresses:

1. **Confirmation Email**: `newsletter@fhiriq.com` → to subscriber
2. **Admin Notification**: `notifications@fhiriq.com` → to gene@fhiriq.com

**Setup in Resend:**

1. Go to https://resend.com/domains
2. Verify `fhiriq.com` domain is verified (should already be done)
3. No additional configuration needed - Resend allows any sender address on verified domains

## How It Works

### User Flow

1. **User enters email** on FHIR IQ homepage newsletter form
2. **API processes request** at `/api/newsletter`
3. **Substack subscription** - User added to evestel.substack.com mailing list
4. **Confirmation email sent** - Immediate branded welcome email via Resend
5. **Admin notification** - Gene receives email about new subscriber

### Email Templates

#### Subscriber Confirmation Email
- **From**: FHIR IQ Newsletter <newsletter@fhiriq.com>
- **Subject**: Welcome to FHIR IQ Newsletter! 🎉
- **Content**:
  - Welcome message
  - What to expect (FHIR insights, podcast, tools)
  - Links to free tools (FHIRspective, Data Mapper)
  - Calendar booking link
  - Unsubscribe link to Substack

#### Admin Notification Email
- **From**: FHIR IQ Notifications <notifications@fhiriq.com>
- **To**: gene@fhiriq.com
- **Subject**: New Newsletter Subscriber: {email}
- **Content**: Subscriber email, timestamp, source

## Testing

### 1. Test Locally

```bash
# Make sure environment variables are set
export RESEND_API_KEY=re_xxxxxxxxxxxxx
export SUBSTACK_PUBLICATION_ID=evestel

# Start development server
npm run dev

# Visit http://localhost:3000
# Scroll to newsletter section at bottom of homepage
# Enter your email and click "Subscribe"
```

### 2. Test in Production

1. Visit https://fhiriq.com
2. Scroll to bottom newsletter section
3. Enter a test email address
4. Click **Subscribe**
5. Check for:
   - Success message: "Thank you for subscribing! Check your email for confirmation."
   - Confirmation email in inbox from `newsletter@fhiriq.com`
   - Notification email to `gene@fhiriq.com`
   - Subscriber appears in Substack dashboard: https://evestel.substack.com/publish/subscribers

### 3. Verify Emails

**Subscriber Confirmation Email Should Include:**
- ✅ Welcome heading
- ✅ List of newsletter topics
- ✅ Links to podcast, FHIRspective, Data Mapper
- ✅ Calendar booking button
- ✅ Unsubscribe link to Substack

**Admin Notification Should Include:**
- ✅ Subscriber email address
- ✅ Subscription timestamp
- ✅ Traffic source

## API Endpoint

### POST `/api/newsletter`

**Request:**
```json
{
  "email": "subscriber@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to FHIR IQ Newsletter! Check your email for confirmation."
}
```

**Error Response (400):**
```json
{
  "error": "Invalid email address"
}
```

## Substack Integration Details

The integration uses Substack's public subscription API:

```
POST https://evestel.substack.com/api/v1/free?nojs=true
Content-Type: application/x-www-form-urlencoded

email={subscriber_email}&first_url={referrer_url}
```

**Note**: This is Substack's standard form submission endpoint. No API key required.

## Troubleshooting

### Newsletter form shows "Failed to subscribe"

**Check:**
1. `RESEND_API_KEY` is set in Vercel environment variables
2. Domain `fhiriq.com` is verified in Resend
3. Check Vercel deployment logs for errors

### Emails not being sent

**Check:**
1. Resend API key is valid: https://resend.com/api-keys
2. Check Resend dashboard logs: https://resend.com/emails
3. Verify sender email addresses are using verified domain `fhiriq.com`

### Substack subscription not working

**Check:**
1. Substack publication is active: https://evestel.substack.com
2. Publication allows free subscriptions
3. Check browser console for API errors
4. Manually verify subscriber in Substack dashboard

### User received Substack confirmation but not custom email

**This is expected behavior:**
- Substack sends its own confirmation email
- Resend sends our custom branded confirmation email
- Users will receive **both emails**
- Our email is more branded and includes tool links

## Email Deliverability

### Best Practices

1. **Warm up your domain**: Start with small volumes, increase gradually
2. **Monitor bounce rates**: Check Resend dashboard regularly
3. **SPF/DKIM records**: Already configured with Resend domain verification
4. **Unsubscribe link**: Included in all emails (points to Substack)

### Email Volume Limits

- **Resend Free Tier**: 3,000 emails/month, 100 emails/day
- **Resend Paid Tier**: 50,000 emails/month starting at $20/month
- Current usage: ~2 emails per subscriber (confirmation + admin notification)

## Managing Subscribers

### View All Subscribers

**Substack Dashboard:**
https://evestel.substack.com/publish/subscribers

**Resend Email Logs:**
https://resend.com/emails

### Remove/Unsubscribe

Users can unsubscribe via:
1. Link in confirmation email → Substack settings
2. Any newsletter email → Substack unsubscribe
3. Manual removal in Substack dashboard

### Export Subscriber List

1. Go to Substack dashboard: https://evestel.substack.com/publish/subscribers
2. Click **Export** to download CSV
3. Includes: email, subscription date, status

## Cost Breakdown

| Service | Usage | Cost |
|---------|-------|------|
| Substack | Newsletter hosting | Free (built-in subscription management) |
| Resend | Confirmation emails | Free tier: 3,000/month<br>Paid: $20/month for 50k |

**Estimated costs for 100 subscribers/month:**
- Substack: $0
- Resend: $0 (within free tier)

**Total: $0/month** (until you exceed Resend free tier)

## Next Steps

1. ✅ Add `RESEND_API_KEY` to Vercel (if not done)
2. ✅ Redeploy application
3. ✅ Test newsletter signup on production site
4. ✅ Verify confirmation emails are received
5. ✅ Check admin notifications at gene@fhiriq.com
6. ✅ Monitor Substack subscriber list

## Support

For issues with:
- **Resend**: https://resend.com/docs or support@resend.com
- **Substack**: https://support.substack.com
- **FHIR IQ Integration**: Check Vercel logs or contact gene@fhiriq.com

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Substack API Documentation](https://on.substack.com/api)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
