import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }

    // Simple FHIR knowledge response (can be enhanced with vector search)
    const response = generateChatResponse(message);

    return NextResponse.json({
      message: response,
      sessionId: sessionId || generateSessionId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      {
        error: 'Chat service unavailable',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper functions
function generateChatResponse(message: string): string {
  // Simple FHIR knowledge base responses
  const fhirKeywords: Record<string, string> = {
    'patient': 'The Patient resource represents an individual receiving health services.',
    'observation': 'Observations are measurements and assertions about a patient.',
    'condition': 'Conditions represent problems, diagnoses, or clinical states.',
    'medication': 'Medication resources represent substances used in healthcare.',
    'encounter': 'Encounters represent interactions between patients and healthcare providers.',
    'fhir': 'FHIR (Fast Healthcare Interoperability Resources) is a standard for healthcare data exchange.'
  };

  const lowerMessage = message.toLowerCase();

  for (const [keyword, response] of Object.entries(fhirKeywords)) {
    if (lowerMessage.includes(keyword)) {
      return `${response} Would you like to know more about FHIR resources or explore our AI Builder tool?`;
    }
  }

  return "I'm here to help with FHIR-related questions. Try asking about Patient, Observation, Condition, or other FHIR resources!";
}

function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9);
}