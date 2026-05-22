import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const linkedin = String(body?.linkedin ?? '').trim();
    const build = String(body?.build ?? '').trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (name.length > 200 || email.length > 320 || linkedin.length > 500 || build.length > 2000) {
      return NextResponse.json({ error: 'One of the fields is too long.' }, { status: 400 });
    }

    if (linkedin && !/^https?:\/\//.test(linkedin)) {
      return NextResponse.json({ error: 'LinkedIn URL must start with http(s)://' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const source = request.headers.get('referer') || 'Direct';

    console.log('Workshop signup:', { name, email, linkedin, build, timestamp, source });

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM || 'FHIR Builders <notifications@fhirbuilders.com>';

    if (resendApiKey) {
      const subject = `Workshop signup: ${name}`;
      const html = `
        <h2>New Workshop Signup — Cohort 00 (free)</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${escapeHtml(linkedin)}">${escapeHtml(linkedin)}</a></p>` : ''}
        <p><strong>What they want to build:</strong><br>${build ? escapeHtml(build) : '<em>(not provided)</em>'}</p>
        <hr>
        <p style="color:#666;font-size:12px;">
          Time: ${timestamp} ET<br>
          Source: ${escapeHtml(source)}
        </p>
      `;
      const text = [
        'New Workshop Signup — Cohort 00 (free)',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        linkedin ? `LinkedIn: ${linkedin}` : null,
        `What they want to build: ${build || '(not provided)'}`,
        '',
        `Time: ${timestamp} ET`,
        `Source: ${source}`,
      ].filter(Boolean).join('\n');

      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: ['gene@fhiriq.com'],
            reply_to: email,
            subject,
            html,
            text,
          }),
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json().catch(() => ({}));
          console.error('Resend API error:', errorData);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the user-facing request just because the email failed.
        // The console log above is the backup capture.
      }
    } else {
      console.warn('RESEND_API_KEY not set — workshop signup logged only, no email sent.');
    }

    return NextResponse.json({
      success: true,
      message: "You're in. I'll email you within 48 hours with the Session 1 details.",
    });
  } catch (error) {
    console.error('Workshop signup error:', error);
    return NextResponse.json({ error: 'Failed to process signup.' }, { status: 500 });
  }
}
