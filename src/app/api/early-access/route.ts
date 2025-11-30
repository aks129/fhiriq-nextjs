import { NextRequest, NextResponse } from 'next/server';

// Google Form entry IDs
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf6Z_EFgyxqtUXR7t4E7Su3v5SgJXYAsia1crDPCSiqnxSigA/formResponse';
const GOOGLE_FORM_ENTRIES = {
  fullName: 'entry.1573045922',
  organization: 'entry.439554761',
  email: 'entry.2057947240',
  role: 'entry.1038064730',
  orgType: 'entry.32503790',
  orgTypeOther: 'entry.32503790.other_option_response',
  problems: 'entry.1364177038',
  interests: 'entry.825326795',
  pilotInterest: 'entry.33126276',
  additionalInfo: 'entry.1730320025',
};

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

    // Submit to Google Forms
    try {
      const formData = new URLSearchParams();
      formData.append(GOOGLE_FORM_ENTRIES.fullName, fullName);
      formData.append(GOOGLE_FORM_ENTRIES.organization, organization);
      formData.append(GOOGLE_FORM_ENTRIES.email, email);
      formData.append(GOOGLE_FORM_ENTRIES.role, role);

      // Handle org type - check if it's a standard option or "Other"
      const standardOrgTypes = [
        "Health System",
        "Payer",
        "ACO / Risk-bearing Group",
        "Quality / Performance Improvement Org",
        "Data Platform / Infrastructure",
        "Startup",
        "Vendor / Consultancy"
      ];

      if (standardOrgTypes.includes(orgType)) {
        formData.append(GOOGLE_FORM_ENTRIES.orgType, orgType);
      } else {
        formData.append(GOOGLE_FORM_ENTRIES.orgType, '__other_option__');
        formData.append(GOOGLE_FORM_ENTRIES.orgTypeOther, orgType);
      }

      formData.append(GOOGLE_FORM_ENTRIES.problems, problems);
      formData.append(GOOGLE_FORM_ENTRIES.interests, interests.join(', '));

      // Map pilot interest
      const pilotMap: Record<string, string> = {
        'yes': 'Yes',
        'possibly': 'Possibly',
        'updates': 'No, just want updates'
      };
      formData.append(GOOGLE_FORM_ENTRIES.pilotInterest, pilotMap[pilotInterest] || pilotInterest);

      formData.append(GOOGLE_FORM_ENTRIES.additionalInfo, additionalInfo || '');

      // Log the form data being sent
      console.log('Submitting to Google Forms with data:', Object.fromEntries(formData));

      const googleResponse = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
      });

      // Log full response details
      console.log('Google Form submission response:', {
        status: googleResponse.status,
        statusText: googleResponse.statusText,
        url: googleResponse.url,
        redirected: googleResponse.redirected,
      });

      // If we get a response (even a redirect), the submission likely worked
      if (googleResponse.ok || googleResponse.redirected) {
        console.log('Google Form submission appears successful');
      } else {
        const responseText = await googleResponse.text();
        console.error('Google Form response body:', responseText.substring(0, 500));
      }
    } catch (googleError) {
      // Log but don't fail - Google Forms submission is best-effort
      console.error('Google Forms submission error:', googleError);
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
