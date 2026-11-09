'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CQLGuide() {
  return (
    <div className="min-h-screen bg-bg-2">
      {/* Navigation */}
      <Nav />

      {/* GitHub Contribution Banner */}
      <div className="bg-gradient-to-r from-bg-3 to-bg-3 text-fg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <div className="font-semibold">Community-Driven Guide</div>
                <div className="text-sm opacity-90">Help improve this guide with your implementation experience</div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/aks129/fhiriq-nextjs/blob/master/docs/guides/cql-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg text-fg px-4 py-2 rounded-lg font-semibold hover:bg-bg-2 transition inline-flex items-center gap-2"
              >
                <span>📖</span> View on GitHub
              </a>
              <a
                href="https://github.com/aks129/fhiriq-nextjs/edit/master/docs/guides/cql-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-fg border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition inline-flex items-center gap-2"
              >
                <span>✏️</span> Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-fg py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Clinical Quality Language (CQL) for FHIR Quality Measures
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            A comprehensive guide to implementing quality measures using CQL on FHIR,
            featuring breast cancer screening as a practical example
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Introduction Section */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">Introduction to CQL on FHIR</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-fg-2 mb-4">
              Clinical Quality Language (CQL) is a high-level, domain-specific language focused on clinical quality
              and is designed to be both human-readable and machine-processable. When combined with FHIR, CQL enables
              the expression of clinical knowledge in a way that can be executed against FHIR data sources.
            </p>

            <div className="bg-bg-2 border-l-4 border-primary-blue p-6 my-6">
              <h3 className="text-xl font-semibold text-fg mb-2">Why CQL + FHIR?</h3>
              <ul className="space-y-2 text-fg-2">
                <li><strong>Standardization:</strong> CQL provides a standard way to express clinical logic</li>
                <li><strong>Interoperability:</strong> Works seamlessly with FHIR data models</li>
                <li><strong>Quality Measures:</strong> Essential for eCQMs (electronic Clinical Quality Measures)</li>
                <li><strong>Clinical Decision Support:</strong> Enables sophisticated CDS rules</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-fg mt-8 mb-4">Key Components</h3>
            <div className="grid md:grid-cols-3 gap-6 my-6">
              <div className="border border-line rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2 text-primary-blue">CQL Libraries</h4>
                <p className="text-fg-2">Reusable collections of CQL expressions and functions</p>
              </div>
              <div className="border border-line rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2 text-accent-purple">FHIR Resources</h4>
                <p className="text-fg-2">Patient data represented as FHIR resources (Patient, Observation, etc.)</p>
              </div>
              <div className="border border-line rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2 text-primary-green">Measure Resources</h4>
                <p className="text-fg-2">FHIR Measure resources that define quality measures</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breast Cancer Screening Example */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">
            Example: Breast Cancer Screening Quality Measure
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-fg-2 mb-6">
              A worked example from CMS125 Breast Cancer Screening, using the 2026 FHIR version of the
              measure (QI-Core 6.0.0). The excerpts below are taken from the published CQL, which{' '}
              <a href="https://openquality.us" className="underline">Open Quality</a> carries in full.
              Checked October 2026.
            </p>

            <h3 className="text-2xl font-bold text-fg mb-4">1. Measure Definition</h3>
            <div className="bg-bg-2 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Clinical Criteria:</h4>
              <ul className="list-disc pl-6 space-y-2 text-fg-2">
                <li><strong>Initial population:</strong> female patients aged 42 to 74 at the end of the measurement period, with a qualifying outpatient encounter in the period</li>
                <li><strong>Denominator:</strong> the initial population</li>
                <li><strong>Numerator:</strong> a mammogram ending between October 1 two years before the measurement period and the end of the period (27 months for a calendar-year period)</li>
                <li><strong>Exclusions:</strong> hospice, palliative care, age 66+ with advanced illness and frailty or living long-term in a nursing home, bilateral mastectomy, or left and right unilateral mastectomies</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-fg mb-4">2. CQL Library Structure</h3>
            <pre className="bg-bg-2 text-fg p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`library CMS125FHIRBreastCancerScreening version '0.4.000'

using QICore version '6.0.0'

include FHIRHelpers version '4.4.000' called FHIRHelpers
include QICoreCommon version '4.0.000' called QICoreCommon
include AdultOutpatientEncounters version '4.19.000' called AdultOutpatientEncounters
include Hospice version '6.18.000' called Hospice
include Status version '1.15.000' called Status
include PalliativeCare version '1.18.000' called PalliativeCare
include AdvancedIllnessandFrailty version '1.27.000' called AIFrailLTCF

valueset "Mammography": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.108.12.1018'
valueset "Bilateral Mastectomy": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.198.12.1005'
// ...six more mastectomy value sets in the full library

parameter "Measurement Period" Interval<DateTime>

context Patient

define "Initial Population":
  AgeInYearsAt(date from end of "Measurement Period") in Interval[42, 74]
    and Patient.sex = '248152002'
    and exists AdultOutpatientEncounters."Qualifying Encounters"

define "Denominator":
  "Initial Population"

define "Denominator Exclusions":
  Hospice."Has Hospice Services"
    or exists "Bilateral Mastectomy Procedure"
    // ...or bilateral mastectomy diagnosis, or right AND left unilateral
    // mastectomy, or the frailty and palliative care exclusions
    or AIFrailLTCF."Is Age 66 or Older with Advanced Illness and Frailty"
    or AIFrailLTCF."Is Age 66 or Older Living Long Term in a Nursing Home"
    or PalliativeCare."Has Palliative Care in the Measurement Period"

define "Numerator":
  exists ( ( ( [ObservationClinicalResult: "Mammography"] ).isDiagnosticStudyPerformed ( ) ) Mammogram
      where Mammogram.effective.toInterval ( ) ends during day of
        Interval["October 1 Two Years Prior to the Measurement Period", end of "Measurement Period"]
  )

define "October 1 Two Years Prior to the Measurement Period":
  DateTime((year from start of "Measurement Period" - 2), 10, 1, 0, 0, 0, 0, 0)`}</code>
            </pre>

            <h3 className="text-2xl font-bold text-fg mb-4">3. FHIR Measure Resource</h3>
            <pre className="bg-bg-2 text-fg p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "resourceType": "Measure",
  "id": "breast-cancer-screening",
  "url": "http://example.org/Measure/breast-cancer-screening",
  "version": "1.0.0",
  "name": "BreastCancerScreening",
  "title": "Breast Cancer Screening",
  "status": "active",
  "experimental": false,
  "date": "2025-01-01",
  "description": "Percentage of women 42-74 years of age who had a mammogram to screen for breast cancer",
  "purpose": "To measure the rate of breast cancer screening in eligible women",
  "scoring": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/measure-scoring",
      "code": "proportion",
      "display": "Proportion"
    }]
  },
  "type": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/measure-type",
      "code": "process",
      "display": "Process"
    }]
  }],
  "improvementNotation": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/measure-improvement-notation",
      "code": "increase",
      "display": "Increased score indicates improvement"
    }]
  },
  "library": [
    "http://example.org/Library/BreastCancerScreening"
  ],
  "group": [{
    "population": [{
      "code": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/measure-population",
          "code": "initial-population"
        }]
      },
      "criteria": {
        "language": "text/cql-identifier",
        "expression": "Initial Population"
      }
    }, {
      "code": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/measure-population",
          "code": "denominator"
        }]
      },
      "criteria": {
        "language": "text/cql-identifier",
        "expression": "Denominator"
      }
    }, {
      "code": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/measure-population",
          "code": "numerator"
        }]
      },
      "criteria": {
        "language": "text/cql-identifier",
        "expression": "Numerator"
      }
    }, {
      "code": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/measure-population",
          "code": "denominator-exclusion"
        }]
      },
      "criteria": {
        "language": "text/cql-identifier",
        "expression": "Denominator Exclusions"
      }
    }]
  }]
}`}</code>
            </pre>

            <h3 className="text-2xl font-bold text-fg mb-4">4. Sample FHIR Data</h3>
            <p className="text-fg-2 mb-4">
              Example patient data that would be evaluated by this measure:
            </p>
            <pre className="bg-bg-2 text-fg p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`// Patient Resource. The 2026 measure reads Patient.sex (SNOMED 248152002),
// not Patient.gender; see the QI-Core 6 Patient profile for how it is carried.
{
  "resourceType": "Patient",
  "id": "patient-example",
  "gender": "female",
  "birthDate": "1968-03-15"
}

// Observation Resource (Mammogram)
// 24606-6 is in the Mammography value set (checked against tx.fhir.org)
{
  "resourceType": "Observation",
  "id": "mammogram-example",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "24606-6",
      "display": "MG Breast Screening"
    }]
  },
  "subject": {
    "reference": "Patient/patient-example"
  },
  "effectiveDateTime": "2024-06-15",
  "valueString": "Screening mammogram completed - no abnormalities detected"
}`}</code>
            </pre>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">Implementation Steps</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary-blue pl-6">
              <h3 className="text-xl font-bold text-fg mb-2">Step 1: Set Up CQL Execution Engine</h3>
              <p className="text-fg-2 mb-4">
                Choose and configure a CQL execution engine. Popular options include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-fg-2">
                <li><strong>cql-execution:</strong> JavaScript-based CQL engine by MITRE</li>
                <li><strong>CQL Evaluator:</strong> Java-based engine integrated with HAPI FHIR</li>
                <li><strong>Clinical Quality Framework (CQF):</strong> Reference implementation</li>
              </ul>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg mt-4 overflow-x-auto">
                <code>{`npm install cql-execution cql-exec-fhir`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-accent-purple pl-6">
              <h3 className="text-xl font-bold text-fg mb-2">Step 2: Translate CQL to ELM</h3>
              <p className="text-fg-2 mb-4">
                CQL must be translated to Expression Logical Model (ELM) JSON for execution:
              </p>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg mt-4 overflow-x-auto">
                <code>{`# The reference translator is the Java CQL-to-ELM translator in
# github.com/cqframework/clinical_quality_language. MADiE and most
# measure engines run it for you; run it yourself for local testing.`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-primary-green pl-6">
              <h3 className="text-xl font-bold text-fg mb-2">Step 3: Execute Measure Evaluation</h3>
              <p className="text-fg-2 mb-4">
                Use the $evaluate-measure operation on a FHIR server:
              </p>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg mt-4 overflow-x-auto">
                <code>{`POST [base]/Measure/breast-cancer-screening/$evaluate-measure
Content-Type: application/fhir+json

{
  "resourceType": "Parameters",
  "parameter": [{
    "name": "periodStart",
    "valueDate": "2024-01-01"
  }, {
    "name": "periodEnd",
    "valueDate": "2024-12-31"
  }, {
    "name": "subject",
    "valueString": "Patient/patient-example"
  }, {
    "name": "reportType",
    "valueCode": "subject"
  }]
}`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-accent-orange pl-6">
              <h3 className="text-xl font-bold text-fg mb-2">Step 4: Process MeasureReport</h3>
              <p className="text-fg-2 mb-4">
                The server returns a MeasureReport resource with evaluation results:
              </p>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg mt-4 overflow-x-auto">
                <code>{`{
  "resourceType": "MeasureReport",
  "status": "complete",
  "type": "individual",
  "measure": "http://example.org/Measure/breast-cancer-screening",
  "subject": {
    "reference": "Patient/patient-example"
  },
  "period": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "group": [{
    "population": [{
      "code": {
        "coding": [{
          "code": "initial-population"
        }]
      },
      "count": 1
    }, {
      "code": {
        "coding": [{
          "code": "denominator"
        }]
      },
      "count": 1
    }, {
      "code": {
        "coding": [{
          "code": "numerator"
        }]
      },
      "count": 1
    }]
  }],
  "evaluatedResource": [{
    "reference": "Patient/patient-example"
  }, {
    "reference": "Observation/mammogram-example"
  }]
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-line rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-blue mb-4">✓ Do&apos;s</h3>
              <ul className="space-y-3 text-fg-2">
                <li>✅ Use standard value sets from VSAC (Value Set Authority Center)</li>
                <li>✅ Include version numbers in library declarations</li>
                <li>✅ Write comprehensive unit tests for CQL logic</li>
                <li>✅ Document clinical rationale for each criterion</li>
                <li>✅ Use FHIRPath expressions when possible</li>
                <li>✅ Reuse the shared CMS libraries (QICoreCommon, Status, Hospice, PalliativeCare, AdvancedIllnessandFrailty)</li>
              </ul>
            </div>

            <div className="border border-line rounded-lg p-6">
              <h3 className="text-xl font-bold text-fg mb-4">✗ Don&apos;ts</h3>
              <ul className="space-y-3 text-fg-2">
                <li>❌ Hardcode codes instead of using value sets</li>
                <li>❌ Ignore data quality and completeness issues</li>
                <li>❌ Create overly complex nested logic</li>
                <li>❌ Skip validation against test patient data</li>
                <li>❌ Forget to handle missing or null data</li>
                <li>❌ Neglect performance optimization for large datasets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testing & Validation */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">Testing & Validation</h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-fg mb-4">CQL Test Framework</h3>
            <p className="text-fg-2 mb-4">
              The CQL Framework provides comprehensive testing capabilities:
            </p>

            <div className="bg-bg-2 border-l-4 border-primary-blue p-6 mb-6">
              <h4 className="font-semibold mb-2">Latest Testing Resources:</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/cqframework/cql-tests-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:underline font-medium"
                  >
                    CQL Tests Results Repository →
                  </a>
                  <p className="text-sm text-fg-2 mt-1">
                    Comprehensive test suite with expected results for CQL implementations
                  </p>
                </li>
                <li>
                  <a
                    href="https://github.com/cqframework"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:underline font-medium"
                  >
                    CQ Framework GitHub Organization →
                  </a>
                  <p className="text-sm text-fg-2 mt-1">
                    Official CQL specifications, tools, and reference implementations
                  </p>
                </li>
              </ul>
            </div>

            <h4 className="text-xl font-bold text-fg mb-3">Example Test Case</h4>
            <pre className="bg-bg-2 text-fg p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`{
  "name": "Patient Meets Numerator - Recent Mammogram",
  "description": "55-year-old female with mammogram 6 months ago should be in numerator",
  "patientData": {
    "resourceType": "Patient",
    "id": "test-patient-1",
    "gender": "female",
    "birthDate": "1969-01-01"
  },
  "observations": [{
    "resourceType": "Observation",
    "status": "final",
    "code": {
      "coding": [{
        "system": "http://loinc.org",
        "code": "24604-1"
      }]
    },
    "effectiveDateTime": "2024-06-01"
  }],
  "measurementPeriod": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "expectedResults": {
    "initialPopulation": true,
    "denominator": true,
    "numerator": true,
    "denominatorExclusion": false
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="bg-bg rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-fg mb-6">Common CQL Patterns</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-fg mb-3">Date Range Queries</h3>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg overflow-x-auto">
                <code>{`define "Observations in Measurement Period":
  [Observation] O
    where O.effective during "Measurement Period"
      and O.status in { 'final', 'amended', 'corrected' }`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fg mb-3">Value Set Membership</h3>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg overflow-x-auto">
                <code>{`define "Diabetes Diagnoses":
  [Condition: "Diabetes"] DiabetesCondition
    where DiabetesCondition.clinicalStatus ~ "active"
      and DiabetesCondition.verificationStatus ~ "confirmed"`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fg mb-3">Age Calculations</h3>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg overflow-x-auto">
                <code>{`define "Patient Age at Start":
  AgeInYearsAt(start of "Measurement Period")

define "Eligible Age Range":
  "Patient Age at Start" >= 50 and "Patient Age at Start" < 75`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fg mb-3">Exists vs Count</h3>
              <pre className="bg-bg-2 text-fg p-4 rounded-lg overflow-x-auto">
                <code>{`// Use exists for boolean checks (more efficient)
define "Has Recent Lab":
  exists ([Observation: "Lab Test"] O where O.effective during "Recent Period")

// Use count when you need the actual number
define "Number of Encounters":
  Count([Encounter] E where E.period during "Measurement Period")`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-fg rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Official Documentation</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://cql.hl7.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    HL7 CQL Specification
                  </a>
                </li>
                <li>
                  <a
                    href="https://ecqi.healthit.gov/cql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    eCQI Resource Center - CQL
                  </a>
                </li>
                <li>
                  <a
                    href="https://build.fhir.org/ig/HL7/cqf-measures/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    Quality Measure Implementation Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Tools & Libraries</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/cqframework"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    CQ Framework on GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cqframework/cql-tests-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    CQL Test Results Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cqframework/clinical_quality_language"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-fg-2 underline"
                  >
                    CQL Language Specification
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-bg rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-fg mb-4">
            Need Help Implementing CQL Quality Measures?
          </h2>
          <p className="text-xl text-fg-2 mb-8 max-w-2xl mx-auto">
            I can help you design, implement, and validate CQL-based quality measures for your organization.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/consulting"
              className="bg-primary-blue text-fg px-8 py-4 rounded-lg font-semibold hover:bg-primary-navy transition"
            >
              Consult with an Expert
            </Link>
            <Link
              href="/contact"
              className="border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-primary-blue hover:text-fg transition"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
