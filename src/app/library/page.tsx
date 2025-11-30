'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ViewDefinition {
  id: string;
  name: string;
  resource: string;
  profile: string;
  description: string;
  columns: string[];
  viewDefinitionJson: object;
  sqlSnippet: string;
}

const VIEW_DEFINITIONS: ViewDefinition[] = [
  {
    id: 'us-core-patient',
    name: 'US Core Patient',
    resource: 'Patient',
    profile: 'US Core 7.0',
    description: 'Flattened patient demographics including name, gender, birthDate, and identifiers',
    columns: ['patient_id', 'family_name', 'given_name', 'gender', 'birth_date', 'mrn'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_patient',
      resource: 'Patient',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      select: [
        { column: [{ name: 'patient_id', path: 'id' }] },
        { column: [{ name: 'family_name', path: "name.where(use='official').family.first()" }] },
        { column: [{ name: 'given_name', path: "name.where(use='official').given.first()" }] },
        { column: [{ name: 'gender', path: 'gender' }] },
        { column: [{ name: 'birth_date', path: 'birthDate' }] },
        { column: [{ name: 'mrn', path: "identifier.where(type.coding.code='MR').value.first()" }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS patient_id,
  JSON_EXTRACT_SCALAR(name, '$[0].family') AS family_name,
  JSON_EXTRACT_SCALAR(name, '$[0].given[0]') AS given_name,
  gender,
  birthDate AS birth_date,
  JSON_EXTRACT_SCALAR(identifier, '$[?(@.type.coding[0].code=="MR")].value') AS mrn
FROM fhir.patient`
  },
  {
    id: 'us-core-observation-vitals',
    name: 'US Core Vital Signs',
    resource: 'Observation',
    profile: 'US Core 7.0',
    description: 'Vital signs observations with patient reference, code, value, and effective date',
    columns: ['observation_id', 'patient_id', 'loinc_code', 'display', 'value', 'unit', 'effective_date'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_vital_signs',
      resource: 'Observation',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      where: [
        { path: "category.coding.where(system='http://terminology.hl7.org/CodeSystem/observation-category' and code='vital-signs').exists()" }
      ],
      select: [
        { column: [{ name: 'observation_id', path: 'id' }] },
        { column: [{ name: 'patient_id', path: 'subject.reference' }] },
        { column: [{ name: 'loinc_code', path: "code.coding.where(system='http://loinc.org').code.first()" }] },
        { column: [{ name: 'display', path: 'code.text' }] },
        { column: [{ name: 'value', path: 'valueQuantity.value' }] },
        { column: [{ name: 'unit', path: 'valueQuantity.unit' }] },
        { column: [{ name: 'effective_date', path: 'effectiveDateTime' }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS observation_id,
  JSON_EXTRACT_SCALAR(subject, '$.reference') AS patient_id,
  JSON_EXTRACT_SCALAR(code, '$.coding[0].code') AS loinc_code,
  JSON_EXTRACT_SCALAR(code, '$.text') AS display,
  CAST(JSON_EXTRACT_SCALAR(valueQuantity, '$.value') AS FLOAT64) AS value,
  JSON_EXTRACT_SCALAR(valueQuantity, '$.unit') AS unit,
  effectiveDateTime AS effective_date
FROM fhir.observation
WHERE JSON_EXTRACT_SCALAR(category, '$[0].coding[0].code') = 'vital-signs'`
  },
  {
    id: 'us-core-condition',
    name: 'US Core Condition',
    resource: 'Condition',
    profile: 'US Core 7.0',
    description: 'Active conditions with patient reference, diagnosis codes, and clinical status',
    columns: ['condition_id', 'patient_id', 'icd10_code', 'snomed_code', 'display', 'clinical_status', 'onset_date'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_condition',
      resource: 'Condition',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      select: [
        { column: [{ name: 'condition_id', path: 'id' }] },
        { column: [{ name: 'patient_id', path: 'subject.reference' }] },
        { column: [{ name: 'icd10_code', path: "code.coding.where(system='http://hl7.org/fhir/sid/icd-10-cm').code.first()" }] },
        { column: [{ name: 'snomed_code', path: "code.coding.where(system='http://snomed.info/sct').code.first()" }] },
        { column: [{ name: 'display', path: 'code.text' }] },
        { column: [{ name: 'clinical_status', path: 'clinicalStatus.coding.code.first()' }] },
        { column: [{ name: 'onset_date', path: 'onsetDateTime' }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS condition_id,
  JSON_EXTRACT_SCALAR(subject, '$.reference') AS patient_id,
  (SELECT code FROM UNNEST(JSON_EXTRACT_ARRAY(code, '$.coding'))
   WHERE JSON_EXTRACT_SCALAR(code, '$.system') = 'http://hl7.org/fhir/sid/icd-10-cm' LIMIT 1) AS icd10_code,
  (SELECT code FROM UNNEST(JSON_EXTRACT_ARRAY(code, '$.coding'))
   WHERE JSON_EXTRACT_SCALAR(code, '$.system') = 'http://snomed.info/sct' LIMIT 1) AS snomed_code,
  JSON_EXTRACT_SCALAR(code, '$.text') AS display,
  JSON_EXTRACT_SCALAR(clinicalStatus, '$.coding[0].code') AS clinical_status,
  onsetDateTime AS onset_date
FROM fhir.condition`
  },
  {
    id: 'us-core-medication-request',
    name: 'US Core MedicationRequest',
    resource: 'MedicationRequest',
    profile: 'US Core 7.0',
    description: 'Medication orders with patient reference, RxNorm codes, and prescriber info',
    columns: ['request_id', 'patient_id', 'rxnorm_code', 'medication_display', 'status', 'authored_on'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_medication_request',
      resource: 'MedicationRequest',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      select: [
        { column: [{ name: 'request_id', path: 'id' }] },
        { column: [{ name: 'patient_id', path: 'subject.reference' }] },
        { column: [{ name: 'rxnorm_code', path: "medicationCodeableConcept.coding.where(system='http://www.nlm.nih.gov/research/umls/rxnorm').code.first()" }] },
        { column: [{ name: 'medication_display', path: 'medicationCodeableConcept.text' }] },
        { column: [{ name: 'status', path: 'status' }] },
        { column: [{ name: 'authored_on', path: 'authoredOn' }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS request_id,
  JSON_EXTRACT_SCALAR(subject, '$.reference') AS patient_id,
  JSON_EXTRACT_SCALAR(medicationCodeableConcept, '$.coding[0].code') AS rxnorm_code,
  JSON_EXTRACT_SCALAR(medicationCodeableConcept, '$.text') AS medication_display,
  status,
  authoredOn AS authored_on
FROM fhir.medication_request`
  },
  {
    id: 'us-core-encounter',
    name: 'US Core Encounter',
    resource: 'Encounter',
    profile: 'US Core 7.0',
    description: 'Healthcare encounters with patient, provider, location, and service type',
    columns: ['encounter_id', 'patient_id', 'encounter_class', 'type_code', 'status', 'period_start', 'period_end'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_encounter',
      resource: 'Encounter',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      select: [
        { column: [{ name: 'encounter_id', path: 'id' }] },
        { column: [{ name: 'patient_id', path: 'subject.reference' }] },
        { column: [{ name: 'encounter_class', path: 'class.code' }] },
        { column: [{ name: 'type_code', path: 'type.coding.code.first()' }] },
        { column: [{ name: 'status', path: 'status' }] },
        { column: [{ name: 'period_start', path: 'period.start' }] },
        { column: [{ name: 'period_end', path: 'period.end' }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS encounter_id,
  JSON_EXTRACT_SCALAR(subject, '$.reference') AS patient_id,
  JSON_EXTRACT_SCALAR(class, '$.code') AS encounter_class,
  JSON_EXTRACT_SCALAR(type, '$[0].coding[0].code') AS type_code,
  status,
  JSON_EXTRACT_SCALAR(period, '$.start') AS period_start,
  JSON_EXTRACT_SCALAR(period, '$.end') AS period_end
FROM fhir.encounter`
  },
  {
    id: 'us-core-procedure',
    name: 'US Core Procedure',
    resource: 'Procedure',
    profile: 'US Core 7.0',
    description: 'Clinical procedures with CPT/SNOMED codes, status, and performed date',
    columns: ['procedure_id', 'patient_id', 'cpt_code', 'snomed_code', 'display', 'status', 'performed_date'],
    viewDefinitionJson: {
      resourceType: 'ViewDefinition',
      name: 'us_core_procedure',
      resource: 'Procedure',
      meta: {
        profile: ['http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition']
      },
      select: [
        { column: [{ name: 'procedure_id', path: 'id' }] },
        { column: [{ name: 'patient_id', path: 'subject.reference' }] },
        { column: [{ name: 'cpt_code', path: "code.coding.where(system='http://www.ama-assn.org/go/cpt').code.first()" }] },
        { column: [{ name: 'snomed_code', path: "code.coding.where(system='http://snomed.info/sct').code.first()" }] },
        { column: [{ name: 'display', path: 'code.text' }] },
        { column: [{ name: 'status', path: 'status' }] },
        { column: [{ name: 'performed_date', path: 'performedDateTime' }] }
      ]
    },
    sqlSnippet: `SELECT
  id AS procedure_id,
  JSON_EXTRACT_SCALAR(subject, '$.reference') AS patient_id,
  (SELECT code FROM UNNEST(JSON_EXTRACT_ARRAY(code, '$.coding'))
   WHERE JSON_EXTRACT_SCALAR(code, '$.system') = 'http://www.ama-assn.org/go/cpt' LIMIT 1) AS cpt_code,
  (SELECT code FROM UNNEST(JSON_EXTRACT_ARRAY(code, '$.coding'))
   WHERE JSON_EXTRACT_SCALAR(code, '$.system') = 'http://snomed.info/sct' LIMIT 1) AS snomed_code,
  JSON_EXTRACT_SCALAR(code, '$.text') AS display,
  status,
  performedDateTime AS performed_date
FROM fhir.procedure`
  }
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const resources = ['all', ...new Set(VIEW_DEFINITIONS.map(v => v.resource))];

  const filteredDefinitions = VIEW_DEFINITIONS.filter(def => {
    const matchesSearch = def.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      def.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      def.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResource = selectedResource === 'all' || def.resource === selectedResource;
    return matchesSearch && matchesResource;
  });

  const copyToClipboard = async (text: string, id: string, type: 'json' | 'sql') => {
    await navigator.clipboard.writeText(text);
    setCopiedId(`${id}-${type}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">
                Solutions
              </Link>
              <Link href="/library" className="text-primary-blue font-medium">
                Library
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/services" className="text-neutral-gray hover:text-primary-blue font-medium">
                Services
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <a href="https://calendar.app.google/TMvRGiiYfbBKNd889" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Writing Boilerplate
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Use standard SQL on FHIR ViewDefinitions. Open source, US Core 7.0 compatible, ready to deploy.
          </p>
        </div>
      </section>

      {/* Banner */}
      <div className="bg-primary-green text-white py-3">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">
            <strong>New:</strong> ViewDefinitions now aligned with SQL on FHIR IG v2.0 specification.{' '}
            <Link href="/cql-to-sql" className="underline hover:no-underline">
              Learn about our CQL-to-SQL engine →
            </Link>
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search ViewDefinitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {resources.map(resource => (
                <button
                  key={resource}
                  onClick={() => setSelectedResource(resource)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedResource === resource
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {resource === 'all' ? 'All Resources' : resource}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ViewDefinitions Table */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredDefinitions.length} of {VIEW_DEFINITIONS.length} ViewDefinitions
            </p>
            <a
              href="https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline text-sm"
            >
              SQL on FHIR IG →
            </a>
          </div>

          <div className="space-y-6">
            {filteredDefinitions.map((def) => (
              <div key={def.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{def.name}</h3>
                        <span className="bg-primary-blue/10 text-primary-blue px-2 py-1 rounded text-xs font-medium">
                          {def.resource}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                          {def.profile}
                        </span>
                      </div>
                      <p className="text-gray-600">{def.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Columns:</p>
                    <div className="flex flex-wrap gap-2">
                      {def.columns.map(col => (
                        <code key={col} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {col}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* JSON */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                        <span className="text-gray-400 text-sm">ViewDefinition JSON</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(def.viewDefinitionJson, null, 2), def.id, 'json')}
                          className="text-gray-400 hover:text-white transition flex items-center gap-1 text-sm"
                        >
                          {copiedId === `${def.id}-json` ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy JSON
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-green-400 text-xs overflow-x-auto max-h-48">
                        {JSON.stringify(def.viewDefinitionJson, null, 2)}
                      </pre>
                    </div>

                    {/* SQL */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                        <span className="text-gray-400 text-sm">Generated SQL (BigQuery)</span>
                        <button
                          onClick={() => copyToClipboard(def.sqlSnippet, def.id, 'sql')}
                          className="text-gray-400 hover:text-white transition flex items-center gap-1 text-sm"
                        >
                          {copiedId === `${def.id}-sql` ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy SQL
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-blue-400 text-xs overflow-x-auto max-h-48">
                        {def.sqlSnippet}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDefinitions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No ViewDefinitions match your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Custom ViewDefinitions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We can help you create ViewDefinitions tailored to your implementation guide or custom profiles.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cql-to-sql" className="btn-primary">
              Explore CQL-to-SQL Engine
            </Link>
            <a href="https://calendar.app.google/TMvRGiiYfbBKNd889" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Link href="/" className="text-2xl font-bold">FHIR IQ</Link>
              <p className="text-gray-400 mt-2">The Semantic Intelligence Layer for Healthcare</p>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/cql-to-sql" className="text-gray-400 hover:text-white transition">CQL-to-SQL</Link>
              <Link href="/early-access" className="text-gray-400 hover:text-white transition">Design Partner Program</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 FHIR IQ. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">
              FHIR® is a registered trademark of Health Level Seven International (HL7®) and is used with permission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
