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

    const resendApiKey = process.env.RESEND_API_KEY;

    // Email content
    const emailSubject = `Newsletter signup started: ${email}`;
    const emailHtml = `
      <h2>Newsletter signup started (confirm on Substack)</h2>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
      <p><strong>Source:</strong> ${request.headers.get('referer') || 'Direct'}</p>
    `;

    const emailText = `
Newsletter signup started (confirm on Substack)

Email: ${email}
Time: ${new Date().toISOString()}
Source: ${request.headers.get('referer') || 'Direct'}
    `;

    if (resendApiKey) {
      try {
        // Send email using Resend API
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'FHIR IQ Newsletter <notifications@fhirbuilders.com>',
            to: ['gene@fhiriq.com'],
            subject: emailSubject,
            html: emailHtml,
            text: emailText
          })
        });

        // Read the body once; a second .json() call throws.
        if (!resendResponse.ok) {
          console.error('Resend API error:', await resendResponse.json());
        }

      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Noted. Confirm the subscription on Substack.'
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
}
