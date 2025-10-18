import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const substackPublicationId = process.env.SUBSTACK_PUBLICATION_ID;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Subscribe to Substack
    if (substackPublicationId) {
      try {
        // Substack subscription API endpoint
        const substackUrl = `https://evestel.substack.com/api/v1/free?nojs=true`;

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('first_url', request.headers.get('referer') || 'https://fhiriq.com');

        const substackResponse = await fetch(substackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });

        if (!substackResponse.ok) {
          console.error('Substack subscription error:', substackResponse.status);
          // Continue even if Substack fails - we'll still send confirmation email
        } else {
          console.log('Successfully subscribed to Substack:', email);
        }
      } catch (substackError) {
        console.error('Substack API error:', substackError);
        // Continue even if Substack fails
      }
    }

    // Send confirmation email using Resend
    if (resendApiKey) {
      try {
        const confirmationHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0066cc 0%, #003d99 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to FHIR IQ!</h1>
            </div>

            <div style="padding: 40px; background: #ffffff;">
              <h2 style="color: #333; margin-top: 0;">You're Now Subscribed!</h2>

              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to the <strong>FHIR IQ Newsletter</strong>!
                You'll now receive the latest insights on:
              </p>

              <ul style="color: #666; font-size: 16px; line-height: 1.8;">
                <li>🔬 FHIR standards and best practices</li>
                <li>🤖 AI-powered healthcare development</li>
                <li>📊 Data quality and interoperability</li>
                <li>🎙️ Out of the FHIR Podcast episodes</li>
                <li>💡 Product updates and new tools</li>
              </ul>

              <div style="background: #f8f9fa; border-left: 4px solid #0066cc; padding: 20px; margin: 30px 0;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">What's Next?</h3>
                <p style="color: #666; margin: 10px 0;">
                  Check out our latest podcast episodes and explore our free FHIR tools:
                </p>
                <ul style="color: #666; margin: 10px 0;">
                  <li><a href="https://fhiriq.com/podcast" style="color: #0066cc;">Listen to Out of the FHIR Podcast</a></li>
                  <li><a href="https://fhirspective.vercel.app" style="color: #0066cc;">Try FHIRspective Data Quality Analyzer</a></li>
                  <li><a href="https://agent-inter-op.vercel.app" style="color: #0066cc;">Explore FHIR Data Mapper</a></li>
                </ul>
              </div>

              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Have questions? Book a free consultation with our team:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                   style="background: #0066cc; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Schedule a Meeting
                </a>
              </div>

              <p style="color: #999; font-size: 14px; margin-top: 40px;">
                You're receiving this email because you subscribed to FHIR IQ Newsletter at
                <a href="https://fhiriq.com" style="color: #0066cc;">fhiriq.com</a>.
                To manage your subscription, visit your
                <a href="https://evestel.substack.com" style="color: #0066cc;">Substack settings</a>.
              </p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                FHIR IQ | Healthcare Interoperability Experts<br>
                <a href="https://fhiriq.com" style="color: #0066cc;">fhiriq.com</a> |
                <a href="mailto:gene@fhiriq.com" style="color: #0066cc;">gene@fhiriq.com</a>
              </p>
            </div>
          </div>
        `;

        const confirmationText = `
Welcome to FHIR IQ Newsletter!

You're now subscribed and will receive the latest insights on:
- FHIR standards and best practices
- AI-powered healthcare development
- Data quality and interoperability
- Out of the FHIR Podcast episodes
- Product updates and new tools

What's Next?
- Listen to Out of the FHIR Podcast: https://fhiriq.com/podcast
- Try FHIRspective Data Quality Analyzer: https://fhirspective.vercel.app
- Explore FHIR Data Mapper: https://agent-inter-op.vercel.app

Have questions? Book a free consultation:
https://calendar.app.google/TMvRGiiYfbBKNd889

---
FHIR IQ | Healthcare Interoperability Experts
https://fhiriq.com | gene@fhiriq.com

You're receiving this email because you subscribed to FHIR IQ Newsletter at fhiriq.com.
To manage your subscription, visit: https://evestel.substack.com
        `;

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'FHIR IQ Newsletter <newsletter@fhiriq.com>',
            to: [email],
            subject: 'Welcome to FHIR IQ Newsletter! 🎉',
            html: confirmationHtml,
            text: confirmationText
          })
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
          // Continue even if email fails
        } else {
          const resendData = await resendResponse.json();
          console.log('Confirmation email sent successfully:', resendData);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails
      }
    }

    // Notify admin about new subscription
    if (resendApiKey) {
      try {
        const adminNotificationHtml = `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
          <p><strong>Source:</strong> ${request.headers.get('referer') || 'Direct'}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This subscriber has been added to your Substack newsletter and received a confirmation email.
          </p>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'FHIR IQ Notifications <notifications@fhiriq.com>',
            to: ['gene@fhiriq.com'],
            subject: `New Newsletter Subscriber: ${email}`,
            html: adminNotificationHtml
          })
        });
      } catch (notifyError) {
        console.error('Admin notification error:', notifyError);
        // Don't fail the request if admin notification fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to FHIR IQ Newsletter! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}
