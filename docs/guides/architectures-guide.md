# FHIR Reference Architectures Guide

> **Status**: Community-maintained guide
> **FHIR Version**: R4, R5
> **Last Updated**: November 2025
> **Contributors**: FHIR IQ Community

Proven architecture patterns and implementation strategies for building scalable FHIR systems.

## Table of Contents

- [Introduction](#introduction)
- [Architecture Patterns](#architecture-patterns)
  - [FHIR Facade](#fhir-facade)
  - [Clinical Data Repository (CDR)](#clinical-data-repository-cdr)
  - [FHIR for Health Apps](#fhir-for-health-apps)
  - [FHIR for Interoperability](#fhir-for-interoperability)
  - [FHIR Analytics Platform](#fhir-analytics-platform)
  - [FHIR Data Lake](#fhir-data-lake)
- [Design Patterns](#design-patterns)
- [Data Platforms on FHIR](#data-platforms-on-fhir)
- [Contributing](#contributing)

## Introduction

This guide provides reference architecture patterns for implementing FHIR across different use cases. Each pattern includes architecture diagrams, key components, implementation considerations, and when to use each approach.

View the interactive version with diagrams at [fhiriq.com/architectures](https://www.fhiriq.com/architectures)

## Architecture Patterns

### FHIR Facade

**Use Case**: Expose legacy systems through modern FHIR APIs without migrating underlying data

**Complexity**: Medium

#### Architecture Overview

A FHIR Facade acts as an API translation layer that exposes legacy data through modern FHIR endpoints. The underlying data remains in its original format (HL7 v2, proprietary databases, etc.) while the facade transforms requests and responses in real-time.

```
Client/EHR → API Gateway → Facade Service → Legacy System
    ↓             ↓             ↓              ↓
FHIR Request  Authenticate  Transform    Native Query
FHIR Response   Validate    Transform   Native Response
```

#### Key Components

- **API Gateway**: Handles authentication, rate limiting, and routing
- **Transformation Engine**: Converts between FHIR and legacy formats bidirectionally
- **Caching Layer**: Reduces load on legacy systems with intelligent caching
- **Validation Service**: Ensures FHIR compliance and data quality

#### When to Use

✅ **Best For:**
- Legacy system modernization
- Gradual FHIR adoption
- Read-heavy use cases
- Regulatory compliance (TEFCA, etc.)

⚠️ **Consider Alternatives:**
- High transaction volumes
- Complex write operations
- Real-time clinical workflows
- Analytics and reporting

#### Implementation Considerations

- **Performance**: Add Redis/Memcached for caching transformed resources
- **Data Mapping**: Document mapping rules between legacy and FHIR models
- **Error Handling**: Gracefully handle legacy system unavailability
- **Versioning**: Support multiple FHIR versions (R4, R5) if needed

#### Real-World Example

*Contribute your implementation experience!*

---

### Clinical Data Repository (CDR)

**Use Case**: Centralized storage of clinical data in native FHIR format for enterprise access

**Complexity**: High

#### Architecture Overview

A FHIR CDR stores clinical data in native FHIR format, serving as the single source of truth for an organization. Unlike a facade, data is actually stored as FHIR resources, enabling rich querying, versioning, and compliance features.

```
Data Sources → ETL Pipeline → FHIR Server → Storage (PostgreSQL/MongoDB)
(HL7v2, CDA)                                    ↓
                                          Search Index (Elasticsearch)
                                                ↓
                                            REST API
```

#### Key Components

- **FHIR Server**: HAPI FHIR, Microsoft FHIR Server, or Google Cloud Healthcare API
- **Storage Layer**: PostgreSQL for structured data, MongoDB for document storage
- **Search Engine**: Elasticsearch for complex FHIR search parameters
- **ETL Pipeline**: Data ingestion from multiple source systems
- **Terminology Service**: ValueSet expansion and code system management

#### Storage Strategies

**Relational (PostgreSQL):**
- Best for structured queries, transactions, and SQL analytics

**Document (MongoDB):**
- Best for flexible schemas, high write throughput, resource versioning

**Hybrid Approach:**
- Store in PostgreSQL, index in Elasticsearch for search

#### Implementation Considerations

- **Scalability**: Plan for sharding/partitioning by patient, organization, or date
- **Versioning**: Implement resource history and audit trail capabilities
- **Data Quality**: Validate resources against profiles on ingestion
- **Performance**: Index common search parameters (patient, date, code)
- **Backup**: Regular backups with point-in-time recovery

#### Real-World Example

*Contribute your implementation experience!*

---

### FHIR for Health Apps

**Use Case**: Build patient-facing and provider applications using SMART on FHIR

**Complexity**: Medium

#### Architecture Overview

SMART on FHIR enables healthcare applications to launch from within EHRs and securely access patient data. This architecture standardizes authentication, authorization, and data access patterns across the healthcare ecosystem.

```
EHR System → SMART App → OAuth Server → FHIR API
    ↓            ↓            ↓            ↓
Launch Context  Request   Access Token  Resources
              Scopes
```

#### Key Components

- **SMART Launch**: EHR launch, standalone launch, or backend services
- **Authorization Server**: OAuth 2.0 / OpenID Connect for secure authentication
- **FHIR Client Library**: fhir.js, HAPI FHIR Client, or language-specific SDKs
- **App Frontend**: React, Vue, or Angular with SMART on FHIR JS library

#### App Types

**Patient-Facing:**
- Patient portals
- Medication tracking
- Symptom checkers
- Appointment scheduling

**Provider-Facing:**
- Clinical decision support
- Documentation assistants
- Quality measure dashboards
- Population health tools

**Administrative:**
- Revenue cycle management
- Prior authorization
- Care coordination
- Analytics dashboards

#### Implementation Considerations

- **Security**: Implement OAuth 2.0 flows correctly (authorization code, refresh tokens)
- **Scopes**: Request minimal necessary scopes (patient/*.read, user/*.*)
- **Offline Access**: Use refresh tokens for apps that need persistent access
- **Multi-Tenant**: Support multiple EHR vendors with different FHIR implementations

#### Real-World Example

*Contribute your implementation experience!*

---

### FHIR for Interoperability

**Use Case**: Enable seamless data exchange between healthcare organizations

**Complexity**: Medium

#### Architecture Overview

FHIR-based interoperability enables standardized data exchange between payers, providers, and patients. Used in HIE connectivity, CMS regulations (Prior Auth, Pa ty, ADT notifications), and care coordination.

#### Key Use Cases

- **HIE Connectivity**: Connect to health information exchanges
- **Payer-Provider Exchange**: Da Vinci use cases (Coverage, Prior Auth, etc.)
- **Care Coordination**: ADT notifications, referrals, care plans
- **Public Health Reporting**: Immunizations, lab results, vital records

#### Standards and IGs

- **US Core**: Foundation for US-based exchange
- **Da Vinci**: Payer-provider data exchange
- **CARIN Blue Button**: Patient access to claims data
- **TEFCA**: Trusted Exchange Framework

#### Implementation Considerations

- **Security**: mTLS, OAuth 2.0, SMART Backend Services
- **Consent Management**: Honor patient consent directives
- **Identity Matching**: Patient matching across organizations
- **Audit Logging**: Track all data access and exchange

---

### FHIR Analytics Platform

**Use Case**: Flatten and transform FHIR data for analytics, BI, and machine learning

**Complexity**: High

#### Architecture Overview

FHIR resources are hierarchical and nested, making them challenging for traditional analytics tools. An analytics platform flattens FHIR data into relational tables or data warehouse schemas optimized for querying and reporting.

```
FHIR Server → Bulk Export ($export) → ETL Pipeline → Data Warehouse
    ↓              ↓                       ↓              ↓
Resources       NDJSON Files          Flatten        SQL Tables
                                     Transform          ↓
                                                   BI Tools (Tableau/Power BI)
                                                   ML/Analytics (Python/R)
```

#### Key Components

- **Bulk Data Export**: FHIR $export operation for large-scale data extraction
- **Flattening Engine**: FHIRPath, SQL views, or Apache Spark for transformation
- **Data Warehouse**: Snowflake, BigQuery, Redshift, or Azure Synapse
- **BI Layer**: Tableau, Power BI, Looker, or custom dashboards

#### Flattening Strategies

**1. OMOP Common Data Model:**
Transform FHIR resources to OMOP tables for standardized analytics
```
Patient → person
Observation → measurement
Condition → condition_occurrence
```

**2. Star Schema:**
Create fact and dimension tables for traditional BI
```
Fact: Observations, Encounters, Procedures
Dimensions: Patient, Provider, Location, Time
```

**3. Wide Tables:**
Denormalize FHIR into wide tables for specific use cases
```
patient_id | name | age | last_hba1c | last_bp | medications | ...
```

#### Implementation Considerations

- **Performance**: Use incremental loads, not full refreshes
- **Data Quality**: Handle missing/invalid FHIR data gracefully
- **Privacy**: De-identify PHI for analytics environments
- **Versioning**: Track FHIR resource versions in warehouse

#### Real-World Example

*Contribute your implementation experience!*

---

### FHIR Data Lake

**Use Case**: Store raw FHIR resources at scale for multi-purpose analytics and AI

**Complexity**: High

#### Architecture Overview

A FHIR Data Lake stores raw FHIR resources (JSON) in cloud object storage for big data analytics, machine learning training data, and long-term historical retention.

#### Key Components

- **Object Storage**: AWS S3, Azure Blob, Google Cloud Storage
- **Metadata Catalog**: AWS Glue, Azure Data Catalog
- **Query Engine**: AWS Athena, Azure Synapse, Google BigQuery
- **Processing**: Apache Spark, Databricks, AWS EMR

#### Use Cases

- **Big Data Analytics**: Process millions of FHIR resources
- **ML Training Data**: Feed machine learning pipelines
- **Historical Retention**: Long-term storage for compliance
- **Research**: De-identified data for clinical research

#### Implementation Considerations

- **Partitioning**: Organize by resourceType, date, patient cohort
- **Compression**: Use Parquet or ORC for efficient storage
- **Security**: Encrypt at rest and in transit
- **Cost**: Lifecycle policies to archive old data

---

## Design Patterns

### Contained Resources
Embed referenced resources within a parent resource for atomic operations

```json
{
  "resourceType": "Observation",
  "contained": [{
    "resourceType": "Practitioner",
    "id": "prac1"
  }],
  "performer": [{ "reference": "#prac1" }]
}
```

### Bundles
Group multiple resources together for transactions or messaging

```json
{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    { "resource": { "resourceType": "Patient" } },
    { "resource": { "resourceType": "Observation" } }
  ]
}
```

### Extensions
Add custom data elements not covered by base FHIR specification

```json
{
  "resourceType": "Patient",
  "extension": [{
    "url": "http://example.org/fhir/StructureDefinition/race",
    "valueCoding": {
      "system": "urn:oid:2.16.840.1.113883.6.238",
      "code": "2106-3",
      "display": "White"
    }
  }]
}
```

### Profiles
Constrain base resources for specific use cases and regions

```
US Core Patient:
- Must have name
- Must have identifier
- Race/ethnicity required (via extensions)
```

## Data Platforms on FHIR

### Cloud-Native Platforms

**Google Cloud Healthcare API:**
- Managed FHIR server (R4, STU3)
- Built-in de-identification
- BigQuery integration
- HL7v2 and DICOM support

**Microsoft Azure Health Data Services:**
- Managed FHIR server
- DICOM and MedTech services
- Integration with Azure Synapse
- Built-in analytics

**AWS HealthLake:**
- Managed FHIR data store
- Natural language processing
- Integration with AWS analytics
- HIPAA eligible

### Open Source

**HAPI FHIR:**
- Most popular open-source FHIR server
- Java-based, highly customizable
- Supports all FHIR versions

**IBM FHIR Server:**
- Enterprise-grade, high performance
- Multi-tenancy support
- Strong conformance

**LinuxForHealth FHIR Server:**
- Cloud-native, Kubernetes-ready
- High performance and scalability

## Contributing

We welcome contributions from the FHIR community:

- Share your architecture implementations
- Add diagrams and visualizations
- Document lessons learned
- Provide performance benchmarks

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Resources

### Official Specifications
- [FHIR R4](http://hl7.org/fhir/R4/)
- [FHIR R5](http://hl7.org/fhir/R5/)
- [Bulk Data IG](http://hl7.org/fhir/uv/bulkdata/)

### Implementation Guides
- [US Core](http://hl7.org/fhir/us/core/)
- [Da Vinci](https://www.hl7.org/fhir/us/davinci-alerts/)
- [SMART App Launch](http://hl7.org/fhir/smart-app-launch/)

### Tools and Platforms
- [Google Cloud Healthcare API](https://cloud.google.com/healthcare-api)
- [Azure Health Data Services](https://azure.microsoft.com/en-us/products/health-data-services)
- [AWS HealthLake](https://aws.amazon.com/healthlake/)
- [HAPI FHIR](https://hapifhir.io/)

---

**Maintained by**: [FHIR IQ Community](https://www.fhiriq.com)
**View on Website**: [fhiriq.com/architectures](https://www.fhiriq.com/architectures)
**Contribute**: [GitHub Repository](https://github.com/aks129/fhiriq-nextjs/tree/master/docs/guides)
