# FHIR Mapping Guide

> **Status**: Community-maintained guide
> **FHIR Version**: R4, R5
> **Last Updated**: November 2025
> **Contributors**: FHIR IQ Community

A practical guide to mapping legacy healthcare data formats to FHIR resources, based on real-world implementation experience.

## Table of Contents

- [Introduction](#introduction)
- [Mapping Fundamentals](#mapping-fundamentals)
- [HL7 v2 to FHIR](#hl7-v2-to-fhir)
- [CDA to FHIR](#cda-to-fhir)
- [CSV/Flat Files to FHIR](#csvflat-files-to-fhir)
- [Proprietary Formats](#proprietary-formats)
- [Tools and Libraries](#tools-and-libraries)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)
- [Contributing](#contributing)

## Introduction

Healthcare data exists in many formats: HL7 v2 messages, CDA documents, CSV extracts, proprietary databases. Mapping this data to FHIR requires understanding both the source format and FHIR's data model.

This guide provides practical examples and patterns for common mapping scenarios, drawn from production implementations.

## Mapping Fundamentals

### Core Concepts

1. **Resource Selection**: Choose the right FHIR resource for your data
2. **Cardinality**: Handle one-to-many and many-to-many relationships
3. **Terminology Mapping**: Map codes between systems
4. **Data Quality**: Handle missing, invalid, or ambiguous data
5. **References**: Link related resources correctly

### Mapping Process

```
Source Data → Analysis → Design → Implementation → Validation → Deployment
```

**Key Questions:**
- What is the business purpose of this data?
- Which FHIR resource(s) best represent it?
- What are the must-have vs. nice-to-have fields?
- How will this data be queried and used?

## HL7 v2 to FHIR

### ADT Messages to Patient

**Common Scenario**: ADT^A01 (Patient Admission) to FHIR Patient

```javascript
// HL7 v2 Message
MSH|^~\&|EPIC|HOSPITAL|||20231101120000||ADT^A01|123|P|2.5
PID|1||MRN12345^^^HOSPITAL^MR||SMITH^JOHN^A||19900101|M|||123 MAIN ST^^PITTSBURGH^PA^15260

// Maps to FHIR Patient
{
  "resourceType": "Patient",
  "identifier": [{
    "use": "usual",
    "type": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
        "code": "MR"
      }]
    },
    "system": "http://hospital.org/fhir/mrn",
    "value": "MRN12345"
  }],
  "name": [{
    "use": "official",
    "family": "SMITH",
    "given": ["JOHN"],
    "suffix": ["A"]  // Middle initial as suffix
  }],
  "gender": "male",  // M → male
  "birthDate": "1990-01-01",
  "address": [{
    "line": ["123 MAIN ST"],
    "city": "PITTSBURGH",
    "state": "PA",
    "postalCode": "15260"
  }]
}
```

**Mapping Decisions:**
- PID-3 → `identifier` (handle multiple identifiers with different types)
- PID-5 → `name` (XPN to HumanName)
- PID-7 → `birthDate` (v2 date format to FHIR date)
- PID-8 → `gender` (M/F/O/U to FHIR ValueSet)
- PID-11 → `address` (XAD to Address)

### OBX Segments to Observation

```javascript
// HL7 v2 OBX
OBX|1|NM|8867-4^Heart Rate^LN||72|/min|60-100|N|||F|||20231101120000

// Maps to FHIR Observation
{
  "resourceType": "Observation",
  "status": "final",  // OBX-11: F → final
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/observation-category",
      "code": "vital-signs"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "8867-4",
      "display": "Heart Rate"
    }]
  },
  "effectiveDateTime": "2023-11-01T12:00:00Z",
  "valueQuantity": {
    "value": 72,
    "unit": "/min",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  },
  "referenceRange": [{
    "low": { "value": 60, "unit": "/min" },
    "high": { "value": 100, "unit": "/min" }
  }],
  "interpretation": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
      "code": "N",
      "display": "Normal"
    }]
  }]
}
```

**Key Mappings:**
- OBX-3 → `code` (CE/CWE to CodeableConcept)
- OBX-5 → `value[x]` (varies by OBX-2 data type)
- OBX-6 → Units in `valueQuantity`
- OBX-7 → `referenceRange`
- OBX-8 → `interpretation`
- OBX-11 → `status`
- OBX-14 → `effectiveDateTime`

### Common HL7 v2 Patterns

**Multiple Identifiers:**
```
PID|1||MRN123^^^HOSPITAL^MR~SSN456789^^^USA^SS
```
→ Creates multiple `identifier` entries

**Repeating Fields:**
```
PID|||MRN1^MRN2^MRN3
```
→ Split and create separate elements

## CDA to FHIR

### CDA Document to FHIR Bundle

**Approach**: CDA documents typically map to FHIR Bundles containing multiple resources

```xml
<!-- CDA C-CDA Document -->
<ClinicalDocument>
  <recordTarget>
    <patientRole>
      <id extension="MRN12345" root="2.16.840.1.113883.19.5"/>
      <patient>
        <name>
          <given>John</given>
          <family>Smith</family>
        </name>
      </patient>
    </patientRole>
  </recordTarget>
</ClinicalDocument>
```

Maps to FHIR Bundle with Patient, Composition, and related resources.

### CDA Sections to FHIR Resources

| CDA Section | FHIR Resource(s) |
|-------------|------------------|
| Medications | MedicationStatement, MedicationRequest |
| Allergies | AllergyIntolerance |
| Problems | Condition |
| Procedures | Procedure |
| Results | Observation (lab), DiagnosticReport |
| Vital Signs | Observation (vital-signs) |

## CSV/Flat Files to FHIR

### Patient CSV to FHIR

**CSV Structure:**
```csv
MRN,FirstName,LastName,DOB,Gender,Phone,Email
MRN12345,John,Smith,1990-01-01,M,412-555-0100,john.smith@email.com
```

**Mapping Logic:**
```javascript
function csvToPatient(row) {
  return {
    resourceType: "Patient",
    identifier: [{
      system: "http://hospital.org/fhir/mrn",
      value: row.MRN
    }],
    name: [{
      given: [row.FirstName],
      family: row.LastName
    }],
    birthDate: row.DOB,
    gender: row.Gender.toLowerCase(), // M → male
    telecom: [
      {
        system: "phone",
        value: row.Phone,
        use: "mobile"
      },
      {
        system: "email",
        value: row.Email
      }
    ]
  };
}
```

### Lab Results CSV to Observation

**Considerations:**
- Handle missing values appropriately
- Validate code systems (LOINC, SNOMED)
- Link observations to DiagnosticReport
- Set appropriate status values

## Proprietary Formats

### Database Tables to FHIR

**Example: EHR Patient Table**

```sql
SELECT
  patient_id,
  first_name,
  last_name,
  birth_date,
  gender_code,
  ssn,
  created_date
FROM patients
WHERE active = 1
```

**Mapping Strategy:**
1. Design FHIR resource structure
2. Map columns to FHIR elements
3. Handle nulls and defaults
4. Maintain referential integrity
5. Track provenance

## Tools and Libraries

### FHIR Mapping Language

Official HL7 FHIR Mapping Language (FML) for declarative mappings:

```fml
map "http://example.org/fhir/StructureMap/PatientMap" = "Patient Mapping"

uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group PatientTransform(source src, target tgt : Patient) {
  src.id -> tgt.identifier;
  src.firstName -> tgt.name.given;
  src.lastName -> tgt.name.family;
}
```

### Popular Libraries

**JavaScript/TypeScript:**
- `fhir` - FHIR resource validation
- `fhirpath.js` - FHIRPath queries
- `@bluehalo/node-fhir-server-core` - FHIR server framework

**Python:**
- `fhir.resources` - FHIR R4/R5 models
- `fhirclient` - FHIR client library
- `fhirpath-py` - FHIRPath implementation

**Java:**
- HAPI FHIR - Comprehensive FHIR library
- `fhir-converter` (Microsoft) - HL7 v2/CDA to FHIR

**.NET:**
- Firely .NET SDK
- Microsoft FHIR Converter

### Commercial Tools

- **InterSystems HealthShare** - Built-in FHIR transformations
- **Rhapsody Integration Engine** - HL7 v2/CDA to FHIR
- **Mirth Connect** - Open source integration engine
- **Google Cloud Healthcare API** - Managed FHIR store with conversions

## Best Practices

### 1. Start with Standards

- Use official Implementation Guides (US Core, IPS, etc.)
- Follow established patterns before creating custom mappings
- Leverage standard terminologies (LOINC, SNOMED, RxNorm)

### 2. Handle Data Quality

```javascript
// Bad: Fail on missing data
const patient = {
  name: [{ family: row.lastName }] // Error if lastName is null
};

// Good: Handle gracefully
const patient = {
  name: row.lastName ? [{
    family: row.lastName,
    given: row.firstName ? [row.firstName] : undefined
  }] : undefined,
  // Include extension for missing data reason
  extension: !row.lastName ? [{
    url: "http://hl7.org/fhir/StructureDefinition/data-absent-reason",
    valueCode: "unknown"
  }] : undefined
};
```

### 3. Maintain Provenance

Track where data came from:

```json
{
  "resourceType": "Provenance",
  "target": [{ "reference": "Patient/123" }],
  "recorded": "2023-11-01T12:00:00Z",
  "agent": [{
    "type": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/provenance-participant-type",
        "code": "assembler"
      }]
    },
    "who": { "display": "HL7v2 to FHIR Mapper v2.1" }
  }],
  "entity": [{
    "role": "source",
    "what": {
      "identifier": {
        "value": "ADT-A01-MSG-123"
      }
    }
  }]
}
```

### 4. Validate Results

Always validate generated FHIR resources:

```javascript
const { Validator } = require('fhir');
const validator = new Validator();

const result = validator.validate(patientResource, { profile: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient' });

if (!result.valid) {
  console.error('Validation errors:', result.messages);
}
```

### 5. Log Mapping Decisions

Document why you made specific mapping choices:

```javascript
// Document in code comments
patient.name = [{
  // Using family + given instead of text because US Core requires structured name
  family: lastName,
  given: [firstName, middleName].filter(Boolean),
  // Suffix for credentials (MD, PhD) not middle initial - that's convention in our EHR
  suffix: credentials
}];
```

## Common Pitfalls

### ❌ Pitfall 1: Incorrect Date/Time Formats

```javascript
// Wrong: Not ISO 8601
birthDate: "11/01/1990"

// Right: ISO 8601
birthDate: "1990-11-01"
```

### ❌ Pitfall 2: Missing Required Elements

Check resource profiles for required fields (US Core, etc.)

### ❌ Pitfall 3: Incorrect Code Systems

```javascript
// Wrong: Made-up system
code: {
  coding: [{
    system: "http://myorg.com/codes",
    code: "HEARTRATE"
  }]
}

// Right: Standard terminology
code: {
  coding: [{
    system: "http://loinc.org",
    code: "8867-4",
    display: "Heart rate"
  }]
}
```

### ❌ Pitfall 4: Broken References

Ensure referenced resources exist:

```javascript
// Create resources in correct order
const patient = { resourceType: "Patient", id: "p1" };
const observation = {
  resourceType: "Observation",
  subject: { reference: "Patient/p1" } // Must exist!
};
```

### ❌ Pitfall 5: Ignoring Cardinality

Some elements are arrays, some are single values:

```javascript
// Wrong
name: { family: "Smith" }

// Right
name: [{ family: "Smith" }]
```

## Real-World Examples

### Example 1: Epic ADT to FHIR Patient

*Coming soon - contribute your implementation!*

### Example 2: Cerner Lab Results to Observation

*Coming soon - contribute your implementation!*

### Example 3: AllScripts CDA to FHIR Bundle

*Coming soon - contribute your implementation!*

## Contributing

Have mapping experience to share? We'd love your contributions!

- Add examples from your implementations
- Share code snippets and transformation logic
- Document edge cases you encountered
- Provide performance optimization tips

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Resources

### Official Specifications
- [FHIR R4 Specification](http://hl7.org/fhir/R4/)
- [FHIR Mapping Language](http://hl7.org/fhir/mapping-language.html)
- [HL7 v2 to FHIR Mapping](https://github.com/HL7/v2-to-fhir)

### Implementation Guides
- [US Core](http://hl7.org/fhir/us/core/)
- [International Patient Summary](http://hl7.org/fhir/uv/ips/)
- [C-CDA on FHIR](http://hl7.org/fhir/us/ccda/)

### Tools
- [Microsoft FHIR Converter](https://github.com/microsoft/FHIR-Converter)
- [Google Healthcare API](https://cloud.google.com/healthcare-api/docs)
- [Matchbox FHIR Mapper](https://github.com/ahdis/matchbox)

---

**Maintained by**: [FHIR IQ Community](https://www.fhiriq.com)
**View on Website**: [fhiriq.com/mappingguide](https://www.fhiriq.com/mappingguide)
**Contribute**: [GitHub Repository](https://github.com/aks129/fhiriq-nextjs/tree/master/docs/guides)
