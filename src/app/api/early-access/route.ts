import { NextRequest, NextResponse } from 'next/server';

interface EarlyAccessForm {
  fullName: string;
  organization: string;
  email: string;
  role: string;
  orgType: string;
  problems: string;
  interests: string[];
  pilotInterest: string;
  additionalInfo: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EarlyAccessForm = await request.json();
    const {
      fullName,
      organization,
      email,
      role,
      orgType,
      problems,
      interests,
      pilotInterest,
      additionalInfo
    } = body;

    // Validate required fields
    if (!fullName || !organization || !email || !role || !orgType || !problems) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Format interests list
    const interestsList = interests.length > 0
      ? interests.map(i => `• ${i}`).join('\n')
      : 'None selected';

    // Email content
    const emailSubject = `🎯 Design Partner Application: ${fullName} - ${organization}`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Design Partner Application</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From the Early Access Program</p>
        </div>

        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #1f2937; font-size: 18px; margin-top: 0;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Organization:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${organization}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Role:</td>
              <td style="padding: 8px 0; color: #1f2937;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Organization Type:</td>
              <td style="padding: 8px 0; color: #1f2937;">${orgType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Pilot Interest:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">
                ${pilotInterest === 'yes' ? '✅ Yes' : pilotInterest === 'possibly' ? '🤔 Possibly' : '📬 Updates only'}
              </td>
            </tr>
          </table>

          <h2 style="color: #1f2937; font-size: 18px; margin-top: 30px;">Problems They're Facing</h2>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
            <p style="color: #374151; margin: 0; white-space: pre-wrap;">${problems}</p>
          </div>

          <h2 style="color: #1f2937; font-size: 18px; margin-top: 30px;">Interests</h2>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
            ${interests.length > 0
              ? interests.map(i => `<div style="color: #374151; padding: 4px 0;">• ${i}</div>`).join('')
              : '<p style="color: #6b7280; margin: 0;">None selected</p>'
            }
          </div>

          ${additionalInfo ? `
          <h2 style="color: #1f2937; font-size: 18px; margin-top: 30px;">Additional Information</h2>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
            <p style="color: #374151; margin: 0; white-space: pre-wrap;">${additionalInfo}</p>
          </div>
          ` : ''}
        </div>

        <div style="background: #1f2937; padding: 20px 30px; border-radius: 0 0 12px 12px;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET<br>
            Source: Early Access Program Form
          </p>
        </div>
      </div>
    `;

    const emailText = `
NEW DESIGN PARTNER APPLICATION
==============================

CONTACT INFORMATION
-------------------
Name: ${fullName}
Organization: ${organization}
Email: ${email}
Role: ${role}
Organization Type: ${orgType}
Pilot Interest: ${pilotInterest === 'yes' ? 'Yes' : pilotInterest === 'possibly' ? 'Possibly' : 'Updates only'}

PROBLEMS THEY'RE FACING
-----------------------
${problems}

INTERESTS
---------
${interestsList}

${additionalInfo ? `ADDITIONAL INFORMATION
----------------------
${additionalInfo}` : ''}

---
Submitted: ${new Date().toISOString()}
Source: Early Access Program Form
    `;

    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'FHIR IQ Design Partner <noreply@fhiriq.com>',
            to: ['gene@fhiriq.com'],
            reply_to: email,
            subject: emailSubject,
            html: emailHtml,
            text: emailText
          })
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
          throw new Error('Failed to send email via Resend');
        }

        const resendData = await resendResponse.json();
        console.log('Design Partner application email sent:', resendData);

        return NextResponse.json({
          success: true,
          message: 'Application submitted successfully',
          emailId: resendData.id
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        console.log('Design Partner application (email failed):', emailText);

        return NextResponse.json({
          success: true,
          message: 'Application submitted successfully'
        });
      }
    } else {
      console.log('⚠️  RESEND_API_KEY not configured. Design Partner application logged:');
      console.log(emailText);

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully'
      });
    }
  } catch (error) {
    console.error('Early access form error:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
