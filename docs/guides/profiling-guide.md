# FHIR Data Modeling & Profiling Design Guide

> **Status**: Community-maintained guide
> **FHIR Version**: R4, R5
> **Last Updated**: November 2025
> **Contributors**: FHIR IQ Community

Master the art of designing FHIR profiles using the proven "Learn, Build, Use" framework.

## Table of Contents

- [Introduction](#introduction)
- [The Learn, Build, Use Framework](#the-learn-build-use-framework)
- [LEARN Phase](#learn-phase)
- [BUILD Phase](#build-phase)
- [USE Phase](#use-phase)
- [Profiling Patterns](#profiling-patterns)
- [Tools and Resources](#tools-and-resources)
- [Real-World Examples](#real-world-examples)
- [Contributing](#contributing)

## Introduction

FHIR profiling is the process of constraining and extending FHIR base resources to meet specific implementation requirements. This guide uses the **"Learn, Build, Use"** framework to help you master FHIR data modeling and profiling design.

### What is FHIR Profiling?

Profiling allows you to adapt FHIR's generic resources for your specific use case by:

- **Constraining**: Making optional elements required, limiting value sets, or restricting cardinality
- **Extending**: Adding new elements that don't exist in the base resource
- **Documenting**: Providing clear usage guidance for implementers
- **Validating**: Ensuring data conforms to your business requirements

## The Learn, Build, Use Framework

### 📚 LEARN
Understand FHIR specifications, implementation guides, and existing patterns

### 🔨 BUILD
Design and create profiles that align with your business requirements

### 🚀 USE
Implement, validate, and iterate on your profiles in production

## LEARN Phase

### Step 1: Understand the Base Resource

Before profiling, deeply understand the FHIR base resource:

```json
// Example: FHIR Patient Resource (simplified)
{
  "resourceType": "Patient",
  "identifier": [],      // 0..* - Optional, repeating
  "active": true,        // 0..1 - Optional boolean
  "name": [],           // 0..* - Optional, repeating
  "telecom": [],        // 0..* - Contact information
  "gender": "male",     // 0..1 - Optional code
  "birthDate": "1990-01-01",  // 0..1 - Optional date
  "address": []         // 0..* - Optional, repeating
}
```

**Key Questions:**
- What elements are required vs. optional?
- What are the cardinality constraints (0..1, 0..*, 1..1, 1..*)?
- What value sets are bound to coded elements?
- Are there invariants (business rules) to follow?

### Step 2: Review Existing Implementation Guides

Don't reinvent the wheel. Study proven patterns:

**US Realm:**
- [US Core](http://hl7.org/fhir/us/core/) - Foundation for US implementations
- [Da Vinci](https://www.hl7.org/fhir/us/davinci-alerts/) - Payer-provider exchange
- [CARIN Blue Button](http://hl7.org/fhir/us/carin-bb/) - Patient access to claims
- [Vital Records](http://hl7.org/fhir/us/vrdr/) - Death reporting

**International:**
- [International Patient Summary (IPS)](http://hl7.org/fhir/uv/ips/)
- [SMART App Launch](http://hl7.org/fhir/smart-app-launch/)

### Step 3: Analyze Your Requirements

Map business requirements to FHIR concepts:

**Example Business Requirement:**
> "We need to capture patient demographic data including a required MRN, name, date of birth, and at least one contact method (phone or email)."

**FHIR Analysis:**
- Base Resource: `Patient`
- Required Elements: identifier (MRN), name, birthDate, telecom
- Constraints: identifier must have system + value, telecom min cardinality 1

## BUILD Phase

### Step 1: Create StructureDefinition

Use tools like Forge, Simplifier, or FSH to create profiles:

**FHIR Shorthand (FSH) Example:**

```fsh
Profile: MyOrganizationPatient
Parent: Patient
Id: my-org-patient
Title: "My Organization Patient Profile"
Description: "Patient profile for My Organization with required MRN and contact"

* identifier 1..* MS
  * ^slicing.discriminator.type = #value
  * ^slicing.discriminator.path = "type"
  * ^slicing.rules = #open
* identifier contains MRN 1..1 MS
* identifier[MRN].type = http://terminology.hl7.org/CodeSystem/v2-0203#MR
* identifier[MRN].system 1..1
* identifier[MRN].value 1..1

* name 1..* MS
* name.family 1..1 MS
* name.given 1..* MS

* birthDate 1..1 MS

* telecom 1..* MS
* telecom.system MS
* telecom.value MS

* gender MS
* address MS
```

### Step 2: Add Extensions

When base FHIR doesn't have what you need:

```fsh
Extension: RaceExtension
Id: patient-race
Title: "Patient Race"
Description: "US Core race extension"
* value[x] only Coding
* valueCoding from http://hl7.org/fhir/us/core/ValueSet/omb-race-category (required)

// Use in profile
Profile: MyOrganizationPatient
Parent: Patient
* extension contains RaceExtension named race 0..*
```

### Step 3: Define Must Support

Mark elements that implementers MUST handle:

```fsh
* identifier MS  // Must Support
* name MS
* birthDate MS
* gender MS  // Must support but not required
```

**Must Support Meaning:**
- **Servers**: Must store and return if present
- **Clients**: Must display or meaningfully use if present
- **Does NOT mean required** (unless cardinality is 1..*)

### Step 4: Document Usage

Clear documentation is critical:

```fsh
* identifier ^short = "Medical Record Number and other identifiers"
* identifier ^definition = "Patient identifiers including required MRN. At least one identifier with type=MR must be provided."
* identifier ^comment = "MRN system should be http://hospital.org/fhir/mrn"

* telecom ^requirements = "At least one contact method (phone or email) is required for patient communication."
```

## USE Phase

### Step 1: Generate Artifacts

Convert profiles to implementation artifacts:

```bash
# Using SUSHI (FSH compiler)
npm install -g fsh-sushi
sushi .

# Output: StructureDefinition JSON files
```

### Step 2: Validate Data

```javascript
// Using HAPI FHIR Validator
const validator = require('@fhir/validator');

const patient = {
  resourceType: "Patient",
  identifier: [{
    type: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
        code: "MR"
      }]
    },
    system: "http://hospital.org/fhir/mrn",
    value: "MRN12345"
  }],
  name: [{ family: "Smith", given: ["John"] }],
  birthDate: "1990-01-01",
  telecom: [{ system: "phone", value: "555-0100" }]
};

const result = await validator.validate(patient, {
  profile: 'http://example.org/fhir/StructureDefinition/my-org-patient'
});

console.log(result.isValid); // true/false
console.log(result.messages); // validation errors
```

### Step 3: Publish and Share

- **IG Publisher**: Generate Implementation Guide website
- **Simplifier**: Publish to public registry
- **Internal Registry**: FHIR server with CapabilityStatement

### Step 4: Iterate

Profiles evolve based on real-world usage:

1. Collect feedback from implementers
2. Track validation errors in production
3. Update profiles with new requirements
4. Version profiles properly (1.0.0 → 1.1.0)

## Profiling Patterns

### Pattern 1: Slicing

Group repeating elements by a discriminator:

```fsh
* identifier ^slicing.discriminator.type = #value
* identifier ^slicing.discriminator.path = "type"
* identifier contains
    MRN 1..1 and
    SSN 0..1 and
    DriversLicense 0..1
```

### Pattern 2: Choice Type Constraints

Limit `[x]` element types:

```fsh
// Base FHIR: value[x] can be many types
// Constrain to specific types:
* value[x] only Quantity or CodeableConcept
```

### Pattern 3: ValueSet Binding

Control allowed codes:

```fsh
* gender from http://hl7.org/fhir/ValueSet/administrative-gender (required)
* maritalStatus from http://hl7.org/fhir/ValueSet/marital-status (extensible)
```

**Binding Strengths:**
- **required**: Must use code from this ValueSet
- **extensible**: Should use, but can use others if needed
- **preferred**: Suggested but not enforced
- **example**: Just an example

### Pattern 4: Invariants (Business Rules)

```fsh
Invariant: pat-1
Description: "Either birthDate or deceased[x] SHALL be present"
Severity: #error
Expression: "birthDate.exists() or deceased.exists()"
```

## Tools and Resources

### Profiling Tools

**Visual Editors:**
- [Forge](https://fire.ly/products/forge/) - Desktop profiling tool
- [Simplifier](https://simplifier.net/) - Web-based profiler

**Text-Based:**
- [FHIR Shorthand (FSH)](https://fshschool.org/) - Domain-specific language
- [SUSHI](https://fshschool.org/docs/sushi/) - FSH compiler

**Validators:**
- [HAPI FHIR Validator](https://hapifhir.io/hapi-fhir/docs/validation/instance_validator.html)
- [Official FHIR Validator](https://confluence.hl7.org/display/FHIR/Using+the+FHIR+Validator)

### Learning Resources

- [FSH School](https://fshschool.org/) - Interactive FSH tutorial
- [Profiling Academy](https://www.devdays.com/fhir-profiling-academy/)
- [HL7 FHIR Profiling Guide](http://hl7.org/fhir/profiling.html)

## Real-World Examples

### US Core Patient Profile

One of the most widely used profiles:

**Key Constraints:**
- Required: identifier, name, gender
- Must Support: identifier, name, telecom, gender, birthDate, address, communication
- Extensions: race, ethnicity, birthsex

[View on Simplifier](http://hl7.org/fhir/us/core/StructureDefinition-us-core-patient.html)

### Da Vinci Coverage Profile

Insurance coverage profiling:

**Key Constraints:**
- Required: status, beneficiary, payor
- Specific identifier slicing for member ID
- Value set bindings for coverage type

## Contributing

Share your profiling experience:

- Add real-world profile examples
- Document profiling patterns you've used
- Share validation strategies
- Contribute to FSH examples

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Resources

### Official Specifications
- [FHIR Profiling](http://hl7.org/fhir/profiling.html)
- [StructureDefinition](http://hl7.org/fhir/structuredefinition.html)
- [FHIR Shorthand](https://build.fhir.org/ig/HL7/fhir-shorthand/)

### Implementation Guides
- [US Core](http://hl7.org/fhir/us/core/)
- [IPS](http://hl7.org/fhir/uv/ips/)

### Tools
- [SUSHI](https://fshschool.org/docs/sushi/)
- [Forge](https://fire.ly/products/forge/)
- [Simplifier](https://simplifier.net/)

---

**Maintained by**: [FHIR IQ Community](https://www.fhiriq.com)
**View on Website**: [fhiriq.com/profilingguide](https://www.fhiriq.com/profilingguide)
**Contribute**: [GitHub Repository](https://github.com/aks129/fhiriq-nextjs/tree/master/docs/guides)
