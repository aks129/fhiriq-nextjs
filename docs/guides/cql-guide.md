# Clinical Quality Language (CQL) for FHIR Quality Measures

> **Status**: Community-maintained guide
> **FHIR Version**: R4, R5
> **CQL Version**: 1.5
> **Last Updated**: November 2025
> **Contributors**: FHIR IQ Community

A comprehensive guide to implementing quality measures using CQL on FHIR, featuring practical examples including breast cancer screening.

## Table of Contents

- [Introduction](#introduction)
- [Why CQL + FHIR?](#why-cql--fhir)
- [Key Components](#key-components)
- [Breast Cancer Screening Example](#breast-cancer-screening-example)
- [Implementation Steps](#implementation-steps)
- [CQL Patterns](#cql-patterns)
- [Testing and Validation](#testing-and-validation)
- [Performance Optimization](#performance-optimization)
- [Common Pitfalls](#common-pitfalls)
- [Contributing](#contributing)

## Introduction

Clinical Quality Language (CQL) is a high-level, domain-specific language focused on clinical quality and is designed to be both human-readable and machine-processable. When combined with FHIR, CQL enables the expression of clinical knowledge in a way that can be executed against FHIR data sources.

## Why CQL + FHIR?

- **Standardization**: CQL provides a standard way to express clinical logic
- **Interoperability**: Works seamlessly with FHIR data models
- **Quality Measures**: Essential for eCQMs (electronic Clinical Quality Measures)
- **Clinical Decision Support**: Enables sophisticated CDS rules
- **Portability**: Logic can be shared and reused across systems

## Key Components

### CQL Libraries
Reusable collections of CQL expressions and functions that can be shared across multiple measures.

### FHIR Resources
Patient data represented as FHIR resources (Patient, Observation, Condition, Procedure, etc.)

### Measure Resources
FHIR Measure resources that define quality measures and reference CQL libraries.

## Breast Cancer Screening Example

Based on CMS 125 - women ages 50-74 who had a mammogram within the past 27 months.

### Clinical Criteria

- **Population**: Women ages 50-74
- **Denominator**: All women in the age range
- **Numerator**: Women who had a mammogram in the past 27 months
- **Exclusions**: Women with bilateral mastectomy, certain diagnoses

### CQL Library Structure

```cql
library BreastCancerScreening version '1.0.0'

using FHIR version '4.0.1'

include FHIRHelpers version '4.0.1'
include MATGlobalCommonFunctions version '5.0.000' called Global

codesystem "LOINC": 'http://loinc.org'
codesystem "SNOMEDCT": 'http://snomed.info/sct'

valueset "Mammography": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.108.12.1018'
valueset "Bilateral Mastectomy": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.198.12.1005'

parameter "Measurement Period" Interval<DateTime>

context Patient

// Initial Population
define "Initial Population":
  Patient.gender = 'female'
    and AgeInYearsAt(start of "Measurement Period") >= 50
    and AgeInYearsAt(start of "Measurement Period") < 75

// Denominator
define "Denominator":
  "Initial Population"

// Numerator
define "Numerator":
  exists (
    [Observation: "Mammography"] Mammogram
      where Mammogram.status in { 'final', 'amended', 'corrected' }
        and Mammogram.effective during Interval[
          start of "Measurement Period" - 27 months,
          end of "Measurement Period"
        ]
  )

// Denominator Exclusions
define "Denominator Exclusions":
  exists (
    [Procedure: "Bilateral Mastectomy"] BilateralMastectomy
      where BilateralMastectomy.status = 'completed'
        and BilateralMastectomy.performed before end of "Measurement Period"
  )
```

### FHIR Measure Resource

```json
{
  "resourceType": "Measure",
  "id": "breast-cancer-screening",
  "url": "http://example.org/Measure/breast-cancer-screening",
  "version": "1.0.0",
  "name": "BreastCancerScreening",
  "title": "Breast Cancer Screening",
  "status": "active",
  "experimental": false,
  "date": "2025-01-01",
  "description": "Percentage of women 50-74 years of age who had a mammogram to screen for breast cancer",
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
        "language": "text/cql",
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
        "language": "text/cql",
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
        "language": "text/cql",
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
        "language": "text/cql",
        "expression": "Denominator Exclusions"
      }
    }]
  }]
}
```

### Sample FHIR Data

```json
// Patient Resource
{
  "resourceType": "Patient",
  "id": "patient-example",
  "gender": "female",
  "birthDate": "1968-03-15"
}

// Observation Resource (Mammogram)
{
  "resourceType": "Observation",
  "id": "mammogram-example",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "24604-1",
      "display": "Mammography"
    }]
  },
  "subject": {
    "reference": "Patient/patient-example"
  },
  "effectiveDateTime": "2024-06-15",
  "valueString": "Screening mammogram completed - no abnormalities detected"
}
```

## Implementation Steps

### Step 1: Set Up CQL Execution Engine

Choose and configure a CQL execution engine:

**JavaScript/Node.js:**
```bash
npm install cql-execution cql-exec-fhir
```

**Popular Options:**
- **cql-execution** (MITRE) - JavaScript-based CQL engine
- **CQL Evaluator** - Java-based engine integrated with HAPI FHIR
- **Clinical Quality Framework (CQF)** - Reference implementation

### Step 2: Translate CQL to ELM

CQL must be translated to Expression Logical Model (ELM) JSON for execution:

```bash
npm install -g cql-translation-service
cql-to-elm BreastCancerScreening.cql > BreastCancerScreening.json
```

### Step 3: Execute Against FHIR Data

```javascript
const cql = require('cql-execution');
const cqlfhir = require('cql-exec-fhir');

// Load ELM JSON
const elmLibrary = require('./BreastCancerScreening.json');

// Create execution context
const library = new cql.Library(elmLibrary);
const codeService = new cql.CodeService(valuesets);
const executor = new cql.Executor(library, codeService);

// Set up FHIR patient data
const patientSource = cqlfhir.PatientSource.FHIRv401();
patientSource.loadBundleFromFile('./patient-data.json');

// Set parameters
const parameters = {
  "Measurement Period": new cql.Interval(
    new Date('2024-01-01'),
    new Date('2024-12-31')
  )
};

// Execute
const results = executor.exec(patientSource, parameters);
console.log(results);
```

### Step 4: Generate Measure Report

Create a FHIR MeasureReport resource from the results:

```javascript
const measureReport = {
  resourceType: "MeasureReport",
  status: "complete",
  type: "individual",
  measure: "http://example.org/Measure/breast-cancer-screening",
  subject: { reference: "Patient/patient-example" },
  date: new Date().toISOString(),
  period: {
    start: "2024-01-01",
    end: "2024-12-31"
  },
  group: [{
    population: [
      { code: "initial-population", count: results.initialPopulation ? 1 : 0 },
      { code: "denominator", count: results.denominator ? 1 : 0 },
      { code: "numerator", count: results.numerator ? 1 : 0 },
      { code: "denominator-exclusion", count: results.denominatorExclusions ? 1 : 0 }
    ]
  }]
};
```

## CQL Patterns

### Pattern 1: Date Range Queries

```cql
define "Recent Lab Results":
  [Observation: "HbA1c Lab Test"] LabTest
    where LabTest.effective during Interval[Today() - 90 days, Today()]
      and LabTest.status = 'final'
```

### Pattern 2: Value Comparisons

```cql
define "Uncontrolled Diabetes":
  exists (
    [Observation: "HbA1c"] HbA1c
      where (HbA1c.value as Quantity) >= 9 '%'
        and HbA1c.effective during "Measurement Period"
  )
```

### Pattern 3: Multiple Resource Types

```cql
define "Has Active Diabetes Medication":
  exists (
    [MedicationRequest: "Diabetes Medications"] Med
      where Med.status = 'active'
        and Med.authoredOn during "Measurement Period"
  )
  or exists (
    [MedicationStatement: "Diabetes Medications"] Med
      where Med.status = 'active'
        and Med.effective overlaps "Measurement Period"
  )
```

### Pattern 4: Complex Logic with Functions

```cql
define function "Normalize Interval"(choice Choice<FHIR.dateTime, FHIR.Period, FHIR.Timing, FHIR.instant, FHIR.string, FHIR.Age, FHIR.Range>):
  case
    when choice is FHIR.dateTime then Interval[choice as FHIR.dateTime, choice as FHIR.dateTime]
    when choice is FHIR.Period then choice as FHIR.Period
    when choice is FHIR.Timing then Message(null, true, 'NOT_IMPLEMENTED', 'Error', 'Timing choice not implemented')
    when choice is FHIR.instant then Interval[choice as FHIR.instant, choice as FHIR.instant]
    when choice is FHIR.Age then Message(null, true, 'NOT_IMPLEMENTED', 'Error', 'Age choice not implemented')
    when choice is FHIR.Range then Message(null, true, 'NOT_IMPLEMENTED', 'Error', 'Range choice not implemented')
    when choice is FHIR.string then Message(null, true, 'NOT_IMPLEMENTED', 'Error', 'String choice not implemented')
    else null
  end
```

## Testing and Validation

### Unit Testing CQL

```javascript
const assert = require('assert');

describe('Breast Cancer Screening Measure', () => {
  it('should include women aged 50-74', () => {
    const patient = {
      gender: 'female',
      birthDate: '1968-03-15'
    };
    const result = executor.exec(patientSource);
    assert.equal(result.initialPopulation, true);
  });

  it('should exclude women under 50', () => {
    const patient = {
      gender: 'female',
      birthDate: '2000-01-01'
    };
    const result = executor.exec(patientSource);
    assert.equal(result.initialPopulation, false);
  });
});
```

### Validation Tools

- **CQL Testing Framework** - Automated testing for CQL logic
- **MAT (Measure Authoring Tool)** - Visual CQL editor and validator
- **Cypress (Bonnie)** - Testing tool for eCQMs

## Performance Optimization

### 1. Use Specific Queries

```cql
// Bad: Retrieves all observations
define "All Observations":
  [Observation]

// Good: Specific value set
define "HbA1c Results":
  [Observation: "HbA1c Lab Test"]
```

### 2. Filter Early

```cql
// Bad: Filter after retrieval
define "Recent Labs":
  [Observation] O
    where O.effective during "Measurement Period"

// Good: Use search parameters
define "Recent Labs":
  [Observation: during "Measurement Period"]
```

### 3. Avoid Redundant Calculations

```cql
// Bad: Recalculate
define "Is Diabetic":
  exists([Condition: "Diabetes"])

define "Diabetic With Meds":
  exists([Condition: "Diabetes"]) and exists([MedicationRequest])

// Good: Reuse
define "Is Diabetic":
  exists([Condition: "Diabetes"])

define "Diabetic With Meds":
  "Is Diabetic" and exists([MedicationRequest])
```

## Common Pitfalls

### ❌ Pitfall 1: Incorrect Date Handling

```cql
// Wrong: Comparing DateTime to Date
Observation.effective = @2024-01-01

// Right: Use during or same as
Observation.effective same day as @2024-01-01
```

### ❌ Pitfall 2: Missing Null Checks

```cql
// Wrong: Assumes value exists
(Observation.value as Quantity) > 5

// Right: Check for null
exists(Observation.value) and (Observation.value as Quantity) > 5
```

### ❌ Pitfall 3: Incorrect Value Set References

```cql
// Wrong: Hardcoded code
[Observation: code in { Code { code: '8867-4', system: 'http://loinc.org' } }]

// Right: Use value set
[Observation: "Heart Rate"]
```

## Real-World Examples

### Example 1: Diabetes HbA1c Control

*Coming soon - contribute your implementation!*

### Example 2: Hypertension Blood Pressure Monitoring

*Coming soon - contribute your implementation!*

### Example 3: Medication Adherence

*Coming soon - contribute your implementation!*

## Contributing

Have CQL implementation experience to share? We'd love your contributions!

- Add quality measure examples
- Share CQL patterns and best practices
- Document performance optimizations
- Provide testing strategies

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Resources

### Official Specifications
- [CQL Specification](https://cql.hl7.org/)
- [FHIR Clinical Reasoning Module](http://hl7.org/fhir/clinicalreasoning-module.html)
- [Quality Measure IG](http://hl7.org/fhir/us/cqfmeasures/)

### Tools
- [CQL Translation Service](https://github.com/cqframework/cql-translation-service)
- [cql-execution](https://github.com/cqframework/cql-execution)
- [MAT (Measure Authoring Tool)](https://www.emeasuretool.cms.gov/)
- [Bonnie (Cypress)](https://bonnie.healthit.gov/)

### Tutorials
- [CQL Tutorial](https://cql.hl7.org/docs/tutorial.html)
- [eCQM Logic and Implementation Guidance](https://ecqi.healthit.gov/ecqm-logic-and-implementation-guidance)

---

**Maintained by**: [FHIR IQ Community](https://www.fhiriq.com)
**View on Website**: [fhiriq.com/cqlguide](https://www.fhiriq.com/cqlguide)
**Contribute**: [GitHub Repository](https://github.com/aks129/fhiriq-nextjs/tree/master/docs/guides)
