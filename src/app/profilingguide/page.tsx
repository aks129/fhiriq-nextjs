'use client';

import Link from 'next/link';

export default function ProfilingGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
              <span className="ml-4 text-gray-400">|</span>
              <span className="ml-4 text-lg font-semibold text-gray-700">FHIR Profiling Guide</span>
            </div>
            <Link href="/" className="text-primary-blue hover:text-primary-navy font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* GitHub Contribution Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <div className="font-semibold">Community-Driven Guide</div>
                <div className="text-sm opacity-90">Help improve this guide with your profiling patterns and experience</div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/aks129/fhiriq-nextjs/blob/master/docs/guides/profiling-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition inline-flex items-center gap-2"
              >
                <span>📖</span> View on GitHub
              </a>
              <a
                href="https://github.com/aks129/fhiriq-nextjs/edit/master/docs/guides/profiling-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition inline-flex items-center gap-2"
              >
                <span>✏️</span> Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FHIR Data Modeling & Profiling Design Guide
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mb-6">
            Master the art of designing FHIR profiles using the proven &quot;Learn, Build, Use&quot; framework
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="font-semibold">Learn</span> → Understand FHIR base specifications
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="font-semibold">Build</span> → Design custom profiles
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="font-semibold">Use</span> → Implement and validate
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction to FHIR Profiling</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              FHIR profiling is the process of constraining and extending FHIR base resources to meet specific
              implementation requirements. This guide uses the <strong>&quot;Learn, Build, Use&quot;</strong> framework to
              help you master FHIR data modeling and profiling design.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary-blue p-6 my-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is FHIR Profiling?</h3>
              <p className="text-gray-700 mb-4">
                Profiling allows you to adapt FHIR&apos;s generic resources for your specific use case by:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Constraining:</strong> Making optional elements required, limiting value sets, or restricting cardinality</li>
                <li><strong>Extending:</strong> Adding new elements that don&apos;t exist in the base resource</li>
                <li><strong>Documenting:</strong> Providing clear usage guidance for implementers</li>
                <li><strong>Validating:</strong> Ensuring data conforms to your business requirements</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Learn, Build, Use Framework</h3>
            <div className="grid md:grid-cols-3 gap-6 my-6">
              <div className="border-2 border-primary-blue rounded-lg p-6 bg-blue-50">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-bold text-xl mb-2 text-primary-blue">LEARN</h4>
                <p className="text-gray-700">Understand FHIR specifications, implementation guides, and existing patterns</p>
              </div>
              <div className="border-2 border-accent-purple rounded-lg p-6 bg-purple-50">
                <div className="text-3xl mb-3">🔨</div>
                <h4 className="font-bold text-xl mb-2 text-accent-purple">BUILD</h4>
                <p className="text-gray-700">Design and create profiles that align with your business requirements</p>
              </div>
              <div className="border-2 border-primary-green rounded-lg p-6 bg-green-50">
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="font-bold text-xl mb-2 text-primary-green">USE</h4>
                <p className="text-gray-700">Implement, validate, and iterate on your profiles in production</p>
              </div>
            </div>
          </div>
        </section>

        {/* LEARN Phase */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📚</div>
            <h2 className="text-3xl font-bold text-primary-blue">Phase 1: LEARN</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Understanding FHIR Base Specifications</h3>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-3">Start with the Fundamentals</h4>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Resource Structure:</strong> Every FHIR resource has:
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Metadata (id, meta, implicitRules, language)</li>
                    <li>• Narrative (text - human-readable summary)</li>
                    <li>• Extensions (for additional data not in base spec)</li>
                    <li>• Resource-specific elements (Patient.name, Observation.value, etc.)</li>
                  </ul>
                </li>
                <li>
                  <strong>Data Types:</strong> Understand primitive types (string, integer, boolean) and complex types (CodeableConcept, Reference, Period)
                </li>
                <li>
                  <strong>Cardinality:</strong> Elements can be 0..1 (optional), 1..1 (required), 0..* (optional repeating), or 1..* (required repeating)
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-primary-blue pl-6 mb-6">
              <h4 className="font-semibold text-lg mb-2">Key Resources to Study</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// Patient - Demographics and administrative information
// Observation - Measurements and simple assertions
// Condition - Problems, diagnoses
// Procedure - Events and interventions
// MedicationRequest - Prescriptions and orders
// Encounter - Interactions between patient and healthcare provider
// Organization - Healthcare providers, payers
// Practitioner - Healthcare professionals`}</code>
              </pre>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Step 2: Aligning Business Goals with FHIR</h3>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">Business Analysis Framework</h4>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong>1. Define Your Use Case</strong>
                  <p className="ml-4 mt-1">What problem are you solving? Who are the stakeholders?</p>
                  <p className="ml-4 text-sm italic text-gray-600">
                    Example: &quot;We need to exchange lab results between hospital labs and primary care physicians&quot;
                  </p>
                </div>
                <div>
                  <strong>2. Identify Required Data Elements</strong>
                  <p className="ml-4 mt-1">What information must be captured? What&apos;s optional vs. required?</p>
                  <p className="ml-4 text-sm italic text-gray-600">
                    Example: Test name, result value, reference ranges, performing lab, collection date
                  </p>
                </div>
                <div>
                  <strong>3. Map to FHIR Resources</strong>
                  <p className="ml-4 mt-1">Which FHIR resources best represent your data?</p>
                  <p className="ml-4 text-sm italic text-gray-600">
                    Example: Observation (for results), DiagnosticReport (for report), Specimen (for sample)
                  </p>
                </div>
                <div>
                  <strong>4. Determine Constraints</strong>
                  <p className="ml-4 mt-1">What rules and validations does your business require?</p>
                  <p className="ml-4 text-sm italic text-gray-600">
                    Example: Result value must be present, status must be &apos;final&apos; or &apos;amended&apos;
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Step 3: Research Implementation Guides</h3>

            <p className="text-gray-700 mb-4">
              Don&apos;t reinvent the wheel! Research existing implementation guides (IGs) that address similar use cases.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-primary-blue">US Core Implementation Guide</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Foundational profiles for US healthcare. Start here for most US implementations.
                </p>
                <a
                  href="http://hl7.org/fhir/us/core/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:underline text-sm"
                >
                  View US Core IG →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-accent-purple">International Patient Summary</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Global standard for patient summaries. Good for cross-border use cases.
                </p>
                <a
                  href="http://hl7.org/fhir/uv/ips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:underline text-sm"
                >
                  View IPS IG →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-primary-green">CARIN Blue Button</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Payer data exchange profiles. Essential for claims and coverage data.
                </p>
                <a
                  href="http://hl7.org/fhir/us/carin-bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:underline text-sm"
                >
                  View CARIN BB IG →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-accent-orange">Da Vinci Project</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Value-based care IGs including prior auth, care gaps, and risk adjustment.
                </p>
                <a
                  href="http://hl7.org/fhir/us/davinci-hrex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:underline text-sm"
                >
                  View Da Vinci IGs →
                </a>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-primary-blue p-6">
              <h4 className="font-semibold mb-2">Research Checklist:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Does an existing IG already solve my use case?</li>
                <li>✓ What profiles from existing IGs can I reuse?</li>
                <li>✓ What terminology (value sets, code systems) is already standardized?</li>
                <li>✓ What extensions are commonly used in my domain?</li>
                <li>✓ What are the conformance expectations (SHALL, SHOULD, MAY)?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BUILD Phase */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🔨</div>
            <h2 className="text-3xl font-bold text-accent-purple">Phase 2: BUILD</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Design Your Profile</h3>

            <p className="text-gray-700 mb-6">
              Now that you&apos;ve learned FHIR and researched existing patterns, it&apos;s time to design your profile.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-3">Profile Design Principles</h4>
              <ol className="space-y-3 text-gray-700">
                <li>
                  <strong>1. Start Simple, Then Constrain</strong>
                  <p className="ml-4 mt-1 text-sm">Begin with the base resource. Add constraints incrementally based on real requirements.</p>
                </li>
                <li>
                  <strong>2. Reuse Before Creating</strong>
                  <p className="ml-4 mt-1 text-sm">Use existing profiles (like US Core) as your base. Only create new profiles when necessary.</p>
                </li>
                <li>
                  <strong>3. Make Required What Must Be Required</strong>
                  <p className="ml-4 mt-1 text-sm">Only set min=1 (required) if the data is truly essential. Over-constraining makes adoption difficult.</p>
                </li>
                <li>
                  <strong>4. Use Standard Terminologies</strong>
                  <p className="ml-4 mt-1 text-sm">Leverage LOINC, SNOMED CT, RxNorm, and other standard code systems wherever possible.</p>
                </li>
                <li>
                  <strong>5. Document Everything</strong>
                  <p className="ml-4 mt-1 text-sm">Clear definitions and usage notes are crucial for implementer success.</p>
                </li>
              </ol>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-3">Example: Lab Result Profile</h4>
            <p className="text-gray-700 mb-4">
              Let&apos;s design a profile for lab results that builds on US Core Observation Lab:
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "resourceType": "StructureDefinition",
  "url": "http://example.org/fhir/StructureDefinition/lab-result",
  "name": "LabResult",
  "title": "Laboratory Result Profile",
  "status": "draft",
  "description": "Profile for lab test results in our system",
  "fhirVersion": "4.0.1",
  "kind": "resource",
  "abstract": false,
  "type": "Observation",
  "baseDefinition": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-observation-lab",
  "derivation": "constraint",

  "differential": {
    "element": [
      {
        "id": "Observation.status",
        "path": "Observation.status",
        "short": "Result status",
        "definition": "Status of the lab result",
        "mustSupport": true,
        "binding": {
          "strength": "required",
          "valueSet": "http://example.org/fhir/ValueSet/lab-result-status"
        }
      },
      {
        "id": "Observation.category",
        "path": "Observation.category",
        "min": 1,
        "mustSupport": true,
        "patternCodeableConcept": {
          "coding": [{
            "system": "http://terminology.hl7.org/CodeSystem/observation-category",
            "code": "laboratory"
          }]
        }
      },
      {
        "id": "Observation.code",
        "path": "Observation.code",
        "short": "Lab test code (LOINC preferred)",
        "mustSupport": true,
        "binding": {
          "strength": "extensible",
          "valueSet": "http://example.org/fhir/ValueSet/lab-test-codes"
        }
      },
      {
        "id": "Observation.value[x]",
        "path": "Observation.value[x]",
        "short": "Result value",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "Observation.interpretation",
        "path": "Observation.interpretation",
        "short": "High, low, normal, etc.",
        "mustSupport": true
      },
      {
        "id": "Observation.referenceRange",
        "path": "Observation.referenceRange",
        "short": "Reference range for result interpretation",
        "min": 0,
        "max": "*",
        "mustSupport": true
      },
      {
        "id": "Observation.performer",
        "path": "Observation.performer",
        "short": "Laboratory that performed the test",
        "min": 1,
        "type": [{
          "code": "Reference",
          "targetProfile": [
            "http://hl7.org/fhir/us/core/StructureDefinition/us-core-organization"
          ]
        }],
        "mustSupport": true
      }
    ]
  }
}`}</code>
            </pre>

            <div className="border-l-4 border-accent-purple pl-6 mb-6">
              <h4 className="font-semibold text-lg mb-2">Key Profile Elements Explained:</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>baseDefinition:</strong> We build on US Core Observation Lab (don&apos;t start from scratch!)</li>
                <li><strong>derivation: constraint:</strong> We&apos;re constraining, not creating a new resource type</li>
                <li><strong>min: 1:</strong> Makes optional elements required for our use case</li>
                <li><strong>mustSupport: true:</strong> Implementers must be able to process this element</li>
                <li><strong>binding.strength:</strong> How strictly codes must match the value set (required, extensible, preferred, example)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Step 5: Define Extensions</h3>

            <p className="text-gray-700 mb-4">
              When FHIR base resources don&apos;t have an element you need, create an extension:
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "resourceType": "StructureDefinition",
  "url": "http://example.org/fhir/StructureDefinition/lab-urgency",
  "name": "LabUrgency",
  "title": "Lab Test Urgency Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "context": [{
    "type": "element",
    "expression": "Observation"
  }],
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",

  "differential": {
    "element": [{
      "id": "Extension",
      "path": "Extension",
      "short": "Lab test urgency level",
      "definition": "Indicates the clinical urgency of the lab test (routine, urgent, stat)",
      "max": "1"
    }, {
      "id": "Extension.url",
      "path": "Extension.url",
      "fixedUri": "http://example.org/fhir/StructureDefinition/lab-urgency"
    }, {
      "id": "Extension.value[x]",
      "path": "Extension.value[x]",
      "type": [{
        "code": "code"
      }],
      "binding": {
        "strength": "required",
        "valueSet": "http://example.org/fhir/ValueSet/lab-urgency-codes"
      }
    }]
  }
}

// Usage in an Observation:
{
  "resourceType": "Observation",
  "id": "lab-example",
  "extension": [{
    "url": "http://example.org/fhir/StructureDefinition/lab-urgency",
    "valueCode": "stat"
  }],
  // ... rest of observation
}`}</code>
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Step 6: Create Value Sets</h3>

            <p className="text-gray-700 mb-4">
              Value sets define the allowed codes for coded elements:
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "resourceType": "ValueSet",
  "url": "http://example.org/fhir/ValueSet/lab-result-status",
  "name": "LabResultStatus",
  "title": "Lab Result Status Codes",
  "status": "draft",
  "description": "Allowed status values for lab results",
  "compose": {
    "include": [{
      "system": "http://hl7.org/fhir/observation-status",
      "concept": [
        {
          "code": "final",
          "display": "Final"
        },
        {
          "code": "amended",
          "display": "Amended"
        },
        {
          "code": "corrected",
          "display": "Corrected"
        },
        {
          "code": "preliminary",
          "display": "Preliminary"
        }
      ]
    }]
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* USE Phase */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🚀</div>
            <h2 className="text-3xl font-bold text-primary-green">Phase 3: USE</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 7: Validation and Testing</h3>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-3">Validation Strategy</h4>
              <ol className="space-y-3 text-gray-700">
                <li>
                  <strong>1. Use the FHIR Validator</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
                    <code>{`java -jar validator_cli.jar \\
  -version 4.0.1 \\
  -ig your-implementation-guide.json \\
  -profile http://example.org/fhir/StructureDefinition/lab-result \\
  patient-example.json`}</code>
                  </pre>
                </li>
                <li>
                  <strong>2. Create Test Fixtures</strong>
                  <p className="ml-4 mt-1 text-sm">Build a library of valid and invalid examples to test your profiles</p>
                </li>
                <li>
                  <strong>3. Automate Validation</strong>
                  <p className="ml-4 mt-1 text-sm">Integrate validation into your CI/CD pipeline</p>
                </li>
                <li>
                  <strong>4. Test Edge Cases</strong>
                  <p className="ml-4 mt-1 text-sm">Minimum data, maximum data, optional elements, extensions</p>
                </li>
              </ol>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-3">Example: Valid Lab Result</h4>
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "resourceType": "Observation",
  "id": "lab-glucose-example",
  "meta": {
    "profile": [
      "http://example.org/fhir/StructureDefinition/lab-result"
    ]
  },
  "extension": [{
    "url": "http://example.org/fhir/StructureDefinition/lab-urgency",
    "valueCode": "routine"
  }],
  "status": "final",
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/observation-category",
      "code": "laboratory",
      "display": "Laboratory"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "2339-0",
      "display": "Glucose [Mass/volume] in Blood"
    }],
    "text": "Blood Glucose"
  },
  "subject": {
    "reference": "Patient/example",
    "display": "Jane Doe"
  },
  "effectiveDateTime": "2025-01-15T08:30:00Z",
  "issued": "2025-01-15T09:45:00Z",
  "performer": [{
    "reference": "Organization/lab-acme",
    "display": "ACME Laboratory Services"
  }],
  "valueQuantity": {
    "value": 95,
    "unit": "mg/dL",
    "system": "http://unitsofmeasure.org",
    "code": "mg/dL"
  },
  "interpretation": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
      "code": "N",
      "display": "Normal"
    }]
  }],
  "referenceRange": [{
    "low": {
      "value": 70,
      "unit": "mg/dL",
      "system": "http://unitsofmeasure.org",
      "code": "mg/dL"
    },
    "high": {
      "value": 100,
      "unit": "mg/dL",
      "system": "http://unitsofmeasure.org",
      "code": "mg/dL"
    },
    "type": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/referencerange-meaning",
        "code": "normal",
        "display": "Normal Range"
      }]
    }
  }]
}`}</code>
            </pre>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Step 8: Implementation and Iteration</h3>

            <div className="border-l-4 border-primary-green pl-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">Implementation Checklist:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>□ Publish Your Implementation Guide</strong>
                  <p className="ml-4 text-sm text-gray-600">Use the FHIR IG Publisher to create browsable documentation</p>
                </li>
                <li>
                  <strong>□ Provide Example Resources</strong>
                  <p className="ml-4 text-sm text-gray-600">Include valid examples for each profile</p>
                </li>
                <li>
                  <strong>□ Document Conformance Expectations</strong>
                  <p className="ml-4 text-sm text-gray-600">Clear SHALL/SHOULD/MAY requirements</p>
                </li>
                <li>
                  <strong>□ Set Up a Test Server</strong>
                  <p className="ml-4 text-sm text-gray-600">Allow implementers to test against your profiles</p>
                </li>
                <li>
                  <strong>□ Gather Feedback</strong>
                  <p className="ml-4 text-sm text-gray-600">Iterate based on real-world implementation experience</p>
                </li>
                <li>
                  <strong>□ Version Your Profiles</strong>
                  <p className="ml-4 text-sm text-gray-600">Use semantic versioning to manage changes</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices Summary</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold text-green-800 mb-4">✓ DO</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li>✅ Start with existing IGs and profiles</li>
                <li>✅ Use standard terminologies (LOINC, SNOMED, RxNorm)</li>
                <li>✅ Keep profiles as simple as possible</li>
                <li>✅ Provide clear documentation and examples</li>
                <li>✅ Test thoroughly with real data</li>
                <li>✅ Version your profiles appropriately</li>
                <li>✅ Engage with the FHIR community</li>
                <li>✅ Use mustSupport judiciously</li>
                <li>✅ Consider backward compatibility</li>
                <li>✅ Document your design decisions</li>
              </ul>
            </div>

            <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="text-xl font-bold text-red-800 mb-4">✗ DON&apos;T</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li>❌ Over-constrain optional elements</li>
                <li>❌ Create custom code systems unnecessarily</li>
                <li>❌ Profile without understanding the base resource</li>
                <li>❌ Ignore existing implementation patterns</li>
                <li>❌ Skip validation and testing</li>
                <li>❌ Make breaking changes in minor versions</li>
                <li>❌ Create extensions for data that fits existing elements</li>
                <li>❌ Use too many nested extensions</li>
                <li>❌ Forget about implementer experience</li>
                <li>❌ Profile in isolation without stakeholder input</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tools and Resources */}
        <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Tools & Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Essential Tools</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://simplifier.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    Simplifier.net
                  </a>
                  <p className="text-sm text-white/80 mt-1">Profile editor and IG publishing platform</p>
                </li>
                <li>
                  <a
                    href="https://forge.fire.ly/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    Forge by Firely
                  </a>
                  <p className="text-sm text-white/80 mt-1">Desktop profile editor</p>
                </li>
                <li>
                  <a
                    href="https://fshschool.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    FSH School
                  </a>
                  <p className="text-sm text-white/80 mt-1">Learn FHIR Shorthand for faster profiling</p>
                </li>
                <li>
                  <a
                    href="https://github.com/FHIR/sample-ig"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    FHIR IG Publisher
                  </a>
                  <p className="text-sm text-white/80 mt-1">Generate implementation guide websites</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Learning Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.hl7.org/fhir/profiling.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    FHIR Profiling Documentation
                  </a>
                  <p className="text-sm text-white/80 mt-1">Official HL7 profiling guide</p>
                </li>
                <li>
                  <a
                    href="https://www.hl7.org/fhir/implementationguide.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    Implementation Guide Resource
                  </a>
                  <p className="text-sm text-white/80 mt-1">How to structure IGs</p>
                </li>
                <li>
                  <a
                    href="https://build.fhir.org/ig/FHIR/ig-guidance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    IG Authoring Best Practices
                  </a>
                  <p className="text-sm text-white/80 mt-1">Guidance from the FHIR community</p>
                </li>
                <li>
                  <a
                    href="https://chat.fhir.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 underline font-medium"
                  >
                    FHIR Community Chat
                  </a>
                  <p className="text-sm text-white/80 mt-1">Get help from FHIR experts</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help with FHIR Profiling?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts can help you design, validate, and implement FHIR profiles
            tailored to your organization&apos;s specific requirements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/consulting"
              className="bg-primary-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-navy transition"
            >
              Consult with an Expert
            </Link>
            <Link
              href="/contact"
              className="border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-primary-blue hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 FHIR IQ. FHIR Data Modeling & Profiling Design Guide.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Last updated: January 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
