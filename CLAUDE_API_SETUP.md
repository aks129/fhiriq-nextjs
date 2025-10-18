# Claude API Setup for FHIR IQ Chat

## Adding Your Claude API Key to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your `fhiriq-nextjs` project

2. **Navigate to Environment Variables**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add the Claude API Key**
   - Name: `ANTHROPIC_API_KEY`
   - Value: [Your Claude API key from https://console.anthropic.com]
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"
   - OR simply push any change to trigger auto-deploy

## Getting a Claude API Key

If you don't have a Claude API key yet:

1. Go to https://console.anthropic.com
2. Sign in or create an account
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy the key (it won't be shown again!)
6. Add it to Vercel as described above

## Testing the Chat

Once deployed:
1. Visit your website
2. Click the chat bubble in the bottom right
3. Ask a question like "What products does FHIR IQ offer?"
4. The chat should respond with AI-powered answers about your products

## Fallback Behavior

If the API key is not set, the chat will use the built-in fallback responses (still functional, but not AI-powered).

## Current Configuration

- Model: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
- Max tokens: 1024
- System prompt: FHIR IQ representative focused on products
- Contact: gene@fhiriq.com
- Booking: https://calendar.app.google/TMvRGiiYfbBKNd889
