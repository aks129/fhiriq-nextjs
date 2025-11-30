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

    // Log submission for debugging
    console.log('Design Partner application submitted:', {
      fullName,
      organization,
      email,
      role,
      orgType,
      pilotInterest,
      interests: interests.join(', '),
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Early access form error:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
