import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, systemPrompt } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      // Fallback to simple responses if OpenAI not configured
      const response = generateFallbackResponse(message);
      return NextResponse.json({
        message: response,
        conversationId: conversationId || generateConversationId(),
        timestamp: new Date().toISOString()
      });
    }

    // Use OpenAI for enhanced responses
    const aiResponse = await generateAIResponse(message, systemPrompt, openaiApiKey);

    return NextResponse.json({
      message: aiResponse,
      conversationId: conversationId || generateConversationId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);

    // Fallback to simple response on error
    const fallbackResponse = generateFallbackResponse('error');

    return NextResponse.json({
      message: fallbackResponse,
      conversationId: generateConversationId(),
      timestamp: new Date().toISOString()
    });
  }
}

// Helper functions
async function generateAIResponse(message: string, systemPrompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using more cost-effective model
        messages: [
          {
            role: 'system',
            content: systemPrompt || DEFAULT_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || generateFallbackResponse(message);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateFallbackResponse(message);
  }
}

function generateFallbackResponse(message: string): string {
  // Enhanced FHIR knowledge base responses
  const fhirKeywords: Record<string, string> = {
    'patient': `The Patient resource represents an individual receiving health services. Key elements include:
• Demographics (name, birthDate, gender)
• Identifiers (MRN, SSN)
• Contact information and addresses
• Communication preferences and languages

Example: A Patient resource might include a patient's medical record number, full name, date of birth, and primary care provider. Would you like to see a code example or learn about FHIR IQ's Patient portal tools?`,

    'observation': `Observations are measurements and assertions about a patient, such as:
• Vital signs (blood pressure, temperature, heart rate)
• Laboratory results (glucose, cholesterol)
• Diagnostic findings
• Social history assessments

FHIR Observation resources follow the LOINC coding system for standardization. Would you like to explore our Data Quality Scanner to validate your Observation data?`,

    'condition': `Conditions represent problems, diagnoses, or clinical states, including:
• Active diagnoses (diabetes, hypertension)
• Historical conditions
• Problem lists and care plans
• Clinical status and verification status

Conditions typically use ICD-10 or SNOMED CT coding. Our FHIR Builder AI can help you create condition management applications quickly.`,

    'medication': `Medication resources in FHIR include:
• MedicationRequest (prescriptions)
• MedicationAdministration (given medications)
• MedicationStatement (patient-reported)
• Medication (drug information)

These use RxNorm coding for drug identification. FHIR IQ's tools can help you build medication reconciliation workflows.`,

    'encounter': `Encounters represent interactions between patients and healthcare providers:
• Office visits and consultations
• Hospital admissions and discharges
• Emergency department visits
• Telemedicine appointments

Encounters link to other resources like Observations and Conditions. Want to see how our AI Builder creates encounter management apps?`,

    'implementation': `FHIR implementation involves several key phases:

📋 **Planning Phase**
• Define use cases and requirements
• Choose FHIR version (R4 recommended)
• Select implementation guides (US Core, etc.)

🏗️ **Development Phase**
• Set up FHIR server (HAPI, Firely, etc.)
• Implement resource profiles
• Build client applications

✅ **Testing Phase**
• Validate against reference servers
• Test resource conformance
• Performance and security testing

FHIR IQ can accelerate this process with our consulting services and AI-powered tools. Would you like to schedule a consultation?`,

    'fhir': `FHIR (Fast Healthcare Interoperability Resources) is a modern standard for healthcare data exchange featuring:

🔹 **RESTful API**: Standard HTTP operations (GET, POST, PUT, DELETE)
🔹 **JSON/XML**: Familiar data formats for developers
🔹 **Resources**: Modular building blocks (Patient, Observation, etc.)
🔹 **Profiles**: Constraints for specific use cases
🔹 **Implementation Guides**: Best practices for different scenarios

FHIR IQ specializes in AI-powered FHIR development. Our tools can help you build FHIR applications 10x faster. Want to try our AI Builder?`,

    'smart on fhir': `SMART on FHIR is an authentication framework that enables:
• Secure app authorization using OAuth 2.0
• Patient and provider context sharing
• Third-party app integration with EHRs
• Standardized launch patterns

Key components include launch context, access tokens, and FHIR resource permissions. FHIR IQ has extensive experience with SMART implementations.`,

    'builder': `FHIR Builder AI is our flagship tool that lets you:
🤖 **Describe in Plain English**: Tell us what app you need
📱 **Generate Working Code**: Get React, Python, or Java applications
🔧 **Customize & Extend**: Modify generated code to fit your needs
📚 **Follow Best Practices**: Automatically includes FHIR compliance

Try our demo at ${process.env.NEXT_PUBLIC_BUILDER_URL || 'https://fhir-viewdefinition-builder.vercel.app'}`,

    'consultation': `FHIR IQ offers expert consulting services including:
• FHIR implementation strategy and planning
• Data migration and transformation
• Custom application development
• Performance optimization and security
• Training and team enablement

Our consultants have implemented FHIR at scale for payers, providers, and health tech companies. Would you like to schedule a discovery call?`,

    'training': `FHIR IQ provides comprehensive training programs:
📚 **FHIR Fundamentals**: Introduction to resources and APIs
🏗️ **Implementation Workshop**: Hands-on development training
🤖 **AI-Assisted Development**: Using AI tools for FHIR apps
🎯 **Specialized Tracks**: Payer, provider, and developer focused

All training includes real-world projects and certification. Check out our training calendar for upcoming sessions.`
  };

  const lowerMessage = message.toLowerCase();

  // Check for complex queries that suggest consulting needs
  const consultingTriggers = ['budget', 'timeline', 'proposal', 'implementation project', 'team training', 'custom development'];
  if (consultingTriggers.some(trigger => lowerMessage.includes(trigger))) {
    return `That sounds like a substantial project! FHIR IQ specializes in helping organizations with complex FHIR implementations. Our expert consultants can provide:

• Implementation strategy and planning
• Custom development and integration
• Team training and enablement
• Ongoing support and optimization

Would you like to schedule a consultation to discuss your specific needs? We offer free discovery calls to understand your requirements and provide tailored recommendations.`;
  }

  // Find the best keyword match
  for (const [keyword, response] of Object.entries(fhirKeywords)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Generic helpful response
  return `I'm the FHIR IQ Assistant, specializing in FHIR standards and implementation. I can help you with:

🔹 **FHIR Resources**: Patient, Observation, Condition, Medication, etc.
🔹 **Implementation Guidance**: Best practices, patterns, and strategies
🔹 **FHIR IQ Tools**: AI Builder, Data Quality Scanner, Testing Suite
🔹 **Services**: Consulting, training, and development support

What specific FHIR topic would you like to explore? Try asking about "FHIR basics," "implementation planning," or "AI Builder demo."`;
}

const DEFAULT_SYSTEM_PROMPT = `You are the FHIR IQ Assistant, an expert AI chatbot specializing in FHIR (Fast Healthcare Interoperability Resources) standards and implementation. You represent FHIR IQ, a leading consultancy that combines deep FHIR expertise with AI-driven development tools.

Key Guidelines:
1. FHIR Expertise: Provide accurate, up-to-date information about FHIR R4/R5, implementation guides, and best practices
2. FHIR IQ Services: When relevant, mention FHIR IQ's consulting, training, and AI tools
3. Code Examples: Provide practical FHIR JSON/XML examples when helpful
4. Lead Qualification: For complex questions, suggest booking a consultation
5. Resource Recommendations: Direct users to relevant blog posts, documentation, or tools
6. Professional Tone: Maintain a helpful, knowledgeable, and professional demeanor
7. Limitations: Acknowledge when questions are outside your scope or require human expertise

FHIR IQ Services:
- Consulting: FHIR implementation strategy, data migration, API development
- Training: FHIR fundamentals, advanced development, AI-assisted workflows
- AI Tools: FHIR Builder AI, Data Quality Scanner, API Testing Suite

Never provide medical advice or diagnose conditions. Focus on technical implementation and standards guidance.`;

function generateConversationId(): string {
  return 'conv_' + Math.random().toString(36).substr(2, 9);
}