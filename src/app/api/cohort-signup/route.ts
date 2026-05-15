import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ROLES = new Set([
  'Healthcare PM',
  'Clinician',
  'Engineer / Developer',
  'Founder / Operator',
  'Other',
]);

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
    const role = String(body?.role ?? '').trim();
    const build = String(body?.build ?? '').trim();

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!ALLOWED_ROLES.has(role)) {
      return NextResponse.json({ error: 'Please pick a valid role from the list.' }, { status: 400 });
    }

    if (name.length > 200 || email.length > 320 || build.length > 2000) {
      return NextResponse.json({ error: 'One of the fields is too long.' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const source = request.headers.get('referer') || 'Direct';

    console.log('Cohort signup:', { name, email, role, build, timestamp, source });

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM || 'FHIR IQ Cohort <notifications@healthclaw.io>';

    if (resendApiKey) {
      const subject = `New Healthcare AI Builders signup: ${name} (${role})`;
      const html = `
        <h2>New Cohort Signup — Healthcare AI Builders</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        <p><strong>What they want to build:</strong><br>${escapeHtml(build) || '<em>(not provided)</em>'}</p>
        <hr>
        <p style="color:#666;font-size:12px;">
          Time: ${timestamp} ET<br>
          Source: ${escapeHtml(source)}
        </p>
      `;
      const text = [
        'New Cohort Signup — Healthcare AI Builders',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Role: ${role}`,
        `What they want to build: ${build || '(not provided)'}`,
        '',
        `Time: ${timestamp} ET`,
        `Source: ${source}`,
      ].join('\n');

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
      console.warn('RESEND_API_KEY not set — cohort signup logged only, no email sent.');
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Eugene will reach out within 48 hours to schedule your intro call.",
    });
  } catch (error) {
    console.error('Cohort signup error:', error);
    return NextResponse.json({ error: 'Failed to process signup.' }, { status: 500 });
  }
}
