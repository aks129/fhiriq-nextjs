import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend or similar service
    // For now, we'll use a simple email forwarding approach
    const emailContent = `
New Contact Form Submission from FHIR IQ Website

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}

---
Submitted from: ${request.headers.get('origin') || 'Unknown'}
Time: ${new Date().toISOString()}
    `;

    // In production, integrate with email service (Resend, SendGrid, etc.)
    // For now, log it and return success
    console.log('Contact form submission:', emailContent);

    // TODO: Integrate with email service to send to gene@fhiriq.com
    // Example with fetch to a serverless email endpoint:
    /*
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@fhiriq.com',
        to: 'gene@fhiriq.com',
        subject: `Contact Form: ${name} - ${company || 'No Company'}`,
        text: emailContent
      })
    });
    */

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
