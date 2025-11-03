'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArchitecturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Architectures' },
    { id: 'integration', label: 'Integration & Exchange' },
    { id: 'storage', label: 'Data Storage' },
    { id: 'analytics', label: 'Analytics & Research' },
    { id: 'apps', label: 'Application Development' },
    { id: 'clinical', label: 'Clinical Workflows' },
  ];

  const architectures = [
    {
      id: 'fhir-facade',
      title: 'FHIR Facade',
      category: 'integration',
      description: 'Expose legacy systems through modern FHIR APIs without migrating underlying data',
      useCases: ['Legacy system modernization', 'API standardization', 'Gradual FHIR adoption'],
      complexity: 'Medium',
      icon: '🔄',
    },
    {
      id: 'clinical-data-repository',
      title: 'FHIR Clinical Data Repository (CDR)',
      category: 'storage',
      description: 'Centralized storage of clinical data in native FHIR format for enterprise access',
      useCases: ['Enterprise data hub', 'Single source of truth', 'Multi-system integration'],
      complexity: 'High',
      icon: '🏛️',
    },
    {
      id: 'health-apps',
      title: 'FHIR for Health Apps',
      category: 'apps',
      description: 'Build patient-facing and provider applications using SMART on FHIR',
      useCases: ['Patient portals', 'Clinical decision support', 'Mobile health apps'],
      complexity: 'Medium',
      icon: '📱',
    },
    {
      id: 'interoperability',
      title: 'FHIR for Interoperability',
      category: 'integration',
      description: 'Enable seamless data exchange between healthcare organizations',
      useCases: ['HIE connectivity', 'Payer-provider exchange', 'Care coordination'],
      complexity: 'Medium',
      icon: '🔗',
    },
    {
      id: 'clinical-reasoning',
      title: 'FHIR Clinical Reasoning',
      category: 'clinical',
      description: 'Implement CDS Hooks, clinical pathways, and quality measure reporting',
      useCases: ['Quality measure reporting', 'Clinical decision support', 'Care pathways'],
      complexity: 'High',
      icon: '🧠',
    },
    {
      id: 'research-platform',
      title: 'FHIR for Research',
      category: 'analytics',
      description: 'De-identify and aggregate clinical data for research and population health',
      useCases: ['Clinical research', 'Population health', 'Real-world evidence'],
      complexity: 'High',
      icon: '🔬',
    },
    {
      id: 'analytics-platform',
      title: 'FHIR Analytics Platform',
      category: 'analytics',
      description: 'Flatten and transform FHIR data for analytics, BI, and machine learning',
      useCases: ['Business intelligence', 'Predictive analytics', 'Reporting dashboards'],
      complexity: 'High',
      icon: '📊',
    },
    {
      id: 'data-lake',
      title: 'FHIR Data Lake',
      category: 'storage',
      description: 'Store raw FHIR resources at scale for multi-purpose analytics and AI',
      useCases: ['Big data analytics', 'ML training data', 'Historical data retention'],
      complexity: 'High',
      icon: '🌊',
    },
  ];

  const filteredArchitectures = selectedCategory === 'all'
    ? architectures
    : architectures.filter(arch => arch.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              FHIR Reference Architectures
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Proven architecture patterns, design approaches, and implementation strategies for building healthcare data platforms with FHIR
            </p>
            <div className="flex gap-4">
              <Link href="/consulting" className="bg-white text-primary-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Architecture Guidance
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Cards Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArchitectures.map(arch => (
              <div
                key={arch.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-blue hover:shadow-lg transition cursor-pointer"
                onClick={() => {
                  const element = document.getElementById(`arch-${arch.id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <div className="text-4xl mb-4">{arch.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{arch.title}</h3>
                <p className="text-gray-600 mb-4">{arch.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    arch.complexity === 'High' ? 'bg-orange-100 text-orange-800' :
                    arch.complexity === 'Medium' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {arch.complexity} Complexity
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Common Use Cases:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {arch.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-blue mr-2">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-primary-blue font-semibold text-sm">
                  View Details →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Architecture Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Detailed Architecture Patterns</h2>

          {/* FHIR Facade */}
          <div id="arch-fhir-facade" className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🔄</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">FHIR Facade Architecture</h3>
                <p className="text-gray-600">Modernize legacy systems with a FHIR API layer without data migration</p>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h4 className="text-lg font-semibold mb-3">Architecture Overview</h4>
              <p className="text-gray-700 mb-4">
                A FHIR Facade acts as an API translation layer that exposes legacy data through modern FHIR endpoints. The underlying data remains in its original format (HL7 v2, proprietary databases, etc.) while the facade transforms requests and responses in real-time.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 font-mono text-sm">
                <div className="text-gray-700">
                  SMART App / EHR → FHIR API Gateway → Facade Service → Legacy System
                  <br />
                  ↓ FHIR Request&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Transform&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Query
                  <br />
                  ← FHIR Response&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Transform&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Native Format
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3">Key Components</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">API Gateway:</span>
                  <span>Handles authentication, rate limiting, and routing</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Transformation Engine:</span>
                  <span>Converts between FHIR and legacy formats bidirectionally</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Caching Layer:</span>
                  <span>Reduces load on legacy systems with intelligent caching</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Validation Service:</span>
                  <span>Ensures FHIR compliance and data quality</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mb-3 mt-6">When to Use</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-900 mb-2">✓ Best For:</div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Legacy system modernization</li>
                    <li>• Gradual FHIR adoption</li>
                    <li>• Read-heavy use cases</li>
                    <li>• Regulatory compliance (TEFCA, etc.)</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="font-semibold text-orange-900 mb-2">⚠ Consider Alternatives:</div>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• High transaction volumes</li>
                    <li>• Complex write operations</li>
                    <li>• Real-time clinical workflows</li>
                    <li>• Analytics and reporting</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3 mt-6">Implementation Considerations</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Performance:</strong> Add Redis/Memcached for caching transformed resources</li>
                <li><strong>Data Mapping:</strong> Document mapping rules between legacy and FHIR models</li>
                <li><strong>Error Handling:</strong> Gracefully handle legacy system unavailability</li>
                <li><strong>Versioning:</strong> Support multiple FHIR versions (R4, R5) if needed</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Link href="/consulting" className="text-primary-blue font-semibold hover:underline">
                Get Implementation Help →
              </Link>
            </div>
          </div>

          {/* Clinical Data Repository */}
          <div id="arch-clinical-data-repository" className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🏛️</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">FHIR Clinical Data Repository (CDR)</h3>
                <p className="text-gray-600">Enterprise-grade storage with native FHIR data model</p>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h4 className="text-lg font-semibold mb-3">Architecture Overview</h4>
              <p className="text-gray-700 mb-4">
                A FHIR CDR stores clinical data in native FHIR format, serving as the single source of truth for an organization. Unlike a facade, data is actually stored as FHIR resources, enabling rich querying, versioning, and compliance features.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 font-mono text-sm">
                <div className="text-gray-700">
                  Data Sources → ETL Pipeline → FHIR Server → Search/Query Layer
                  <br />
                  (HL7v2, CDA, CSV)&nbsp;&nbsp;&nbsp;↓ Transform&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Store&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ API
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FHIR Resources → PostgreSQL/MongoDB
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Elasticsearch
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3">Key Components</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">FHIR Server:</span>
                  <span>HAPI FHIR, Microsoft FHIR Server, or Google Cloud Healthcare API</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Storage Layer:</span>
                  <span>PostgreSQL for structured data, MongoDB for document storage</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Search Engine:</span>
                  <span>Elasticsearch for complex FHIR search parameters</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">ETL Pipeline:</span>
                  <span>Data ingestion from multiple source systems</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Terminology Service:</span>
                  <span>ValueSet expansion and code system management</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mb-3 mt-6">Storage Strategies</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-gray-900">Relational (PostgreSQL)</div>
                  <div className="text-sm text-gray-600">Best for structured queries, transactions, and SQL analytics</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="font-semibold text-gray-900">Document (MongoDB)</div>
                  <div className="text-sm text-gray-600">Best for flexible schemas, high write throughput, resource versioning</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-gray-900">Hybrid Approach</div>
                  <div className="text-sm text-gray-600">Store in PostgreSQL, index in Elasticsearch for search</div>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3 mt-6">Implementation Considerations</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Scalability:</strong> Plan for sharding/partitioning by patient, organization, or date</li>
                <li><strong>Versioning:</strong> Implement resource history and audit trail capabilities</li>
                <li><strong>Data Quality:</strong> Validate resources against profiles on ingestion</li>
                <li><strong>Performance:</strong> Index common search parameters (patient, date, code)</li>
                <li><strong>Backup & DR:</strong> Implement point-in-time recovery and geo-replication</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Link href="/consulting" className="text-primary-blue font-semibold hover:underline">
                Design Your CDR →
              </Link>
            </div>
          </div>

          {/* FHIR for Health Apps */}
          <div id="arch-health-apps" className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">📱</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">FHIR for Health Applications</h3>
                <p className="text-gray-600">Build patient and provider apps with SMART on FHIR</p>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h4 className="text-lg font-semibold mb-3">Architecture Overview</h4>
              <p className="text-gray-700 mb-4">
                SMART on FHIR enables healthcare applications to launch from within EHRs and securely access patient data. This architecture standardizes authentication, authorization, and data access patterns across the healthcare ecosystem.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 font-mono text-sm">
                <div className="text-gray-700">
                  EHR Launch → SMART App → OAuth 2.0 Flow → FHIR API
                  <br />
                  ↓ Context&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Authorize&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Token&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Data
                  <br />
                  Patient ID&nbsp;&nbsp;&nbsp;&nbsp;Request Scopes&nbsp;&nbsp;Access Token&nbsp;&nbsp;&nbsp;FHIR Resources
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3">Key Components</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">SMART Launch:</span>
                  <span>EHR launch, standalone launch, or backend services</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Authorization Server:</span>
                  <span>OAuth 2.0 / OpenID Connect for secure authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">FHIR Client Library:</span>
                  <span>fhir.js, HAPI FHIR Client, or language-specific SDKs</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">App Frontend:</span>
                  <span>React, Vue, or Angular with SMART on FHIR JS library</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mb-3 mt-6">App Types</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-semibold text-blue-900 mb-2">Patient-Facing</div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Patient portals</li>
                    <li>• Medication tracking</li>
                    <li>• Symptom checkers</li>
                    <li>• Appointment scheduling</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-semibold text-purple-900 mb-2">Provider-Facing</div>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Clinical decision support</li>
                    <li>• Risk calculators</li>
                    <li>• Order entry</li>
                    <li>• Documentation aids</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-900 mb-2">Backend Services</div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Bulk data export</li>
                    <li>• Population health</li>
                    <li>• Analytics pipelines</li>
                    <li>• Quality reporting</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3 mt-6">Implementation Considerations</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Scopes:</strong> Request minimal necessary scopes (patient/*.read vs user/*.write)</li>
                <li><strong>Security:</strong> Implement PKCE for public clients, validate tokens server-side</li>
                <li><strong>UX:</strong> Handle launch context, patient selection, and session management</li>
                <li><strong>Offline Access:</strong> Request refresh tokens for apps that need persistent access</li>
                <li><strong>Testing:</strong> Use SMART App Launcher and Inferno for certification testing</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Link href="/builder" className="text-primary-blue font-semibold hover:underline">
                Build SMART Apps →
              </Link>
            </div>
          </div>

          {/* FHIR Analytics Platform */}
          <div id="arch-analytics-platform" className="bg-white rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">📊</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">FHIR Analytics Platform</h3>
                <p className="text-gray-600">Flatten and transform FHIR for BI, reporting, and ML</p>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h4 className="text-lg font-semibold mb-3">Architecture Overview</h4>
              <p className="text-gray-700 mb-4">
                FHIR resources are hierarchical and nested, making them challenging for traditional analytics tools. An analytics platform flattens FHIR data into relational tables or data warehouse schemas optimized for querying and reporting.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 font-mono text-sm">
                <div className="text-gray-700">
                  FHIR Server → Bulk Export → ETL Pipeline → Data Warehouse
                  <br />
                  ↓ $export&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ NDJSON&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Flatten&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Analytics
                  <br />
                  Resources&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Files&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQL Tables&nbsp;&nbsp;&nbsp;&nbsp;Tableau/Power BI
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Python/R
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3">Key Components</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Bulk Data Export:</span>
                  <span>FHIR $export operation for large-scale data extraction</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Flattening Engine:</span>
                  <span>FHIRPath, SQL views, or Apache Spark for transformation</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Data Warehouse:</span>
                  <span>Snowflake, BigQuery, Redshift, or Azure Synapse</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">BI Layer:</span>
                  <span>Tableau, Power BI, Looker, or custom dashboards</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mb-3 mt-6">Flattening Strategies</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">1. OMOP Common Data Model</div>
                  <div className="text-sm text-gray-600 mb-2">Transform FHIR resources to OMOP tables for standardized analytics</div>
                  <div className="text-xs font-mono bg-white p-2 rounded">
                    Patient → person, Observation → measurement, Condition → condition_occurrence
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">2. Star Schema</div>
                  <div className="text-sm text-gray-600 mb-2">Create fact and dimension tables for traditional BI tools</div>
                  <div className="text-xs font-mono bg-white p-2 rounded">
                    fact_observations (date_key, patient_key, code_key, value)
                    <br />
                    dim_patients, dim_codes, dim_date
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">3. Wide Tables</div>
                  <div className="text-sm text-gray-600 mb-2">Denormalize into wide tables with one row per resource</div>
                  <div className="text-xs font-mono bg-white p-2 rounded">
                    patient_id, observation_code, observation_value, effective_date, ...
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3 mt-6">Implementation Code Example</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {`-- Flatten Observation resources to SQL table
CREATE TABLE observations_flat AS
SELECT
  o.id,
  o.resource->>'subject' AS patient_id,
  o.resource->'code'->'coding'->0->>'code' AS code,
  o.resource->'code'->'coding'->0->>'display' AS code_display,
  o.resource->'valueQuantity'->>'value' AS value_numeric,
  o.resource->'valueQuantity'->>'unit' AS unit,
  o.resource->>'effectiveDateTime' AS effective_date
FROM fhir_observation o;

-- Index for performance
CREATE INDEX idx_obs_patient ON observations_flat(patient_id);
CREATE INDEX idx_obs_code ON observations_flat(code);
CREATE INDEX idx_obs_date ON observations_flat(effective_date);`}
              </div>

              <h4 className="text-lg font-semibold mb-3 mt-6">Implementation Considerations</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Performance:</strong> Use incremental loads, not full refreshes</li>
                <li><strong>Data Quality:</strong> Handle missing values, invalid codes, null-flavored data</li>
                <li><strong>Versioning:</strong> Track resource versions and handle updates/deletes</li>
                <li><strong>Privacy:</strong> Apply de-identification, masking, and access controls</li>
                <li><strong>Terminology:</strong> Normalize codes (LOINC, SNOMED) for consistent analytics</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Link href="/consulting" className="text-primary-blue font-semibold hover:underline">
                Build Analytics Platform →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Design Patterns Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FHIR Design Patterns</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven patterns for modeling clinical data in FHIR
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Contained Resources</h3>
              <p className="text-gray-600 text-sm mb-3">
                Embed referenced resources within a parent resource for atomic operations
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`Observation {
  contained: [Practitioner]
  performer: "#prac1"
}`}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Bundles</h3>
              <p className="text-gray-600 text-sm mb-3">
                Group multiple resources together for transactions or messaging
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`Bundle {
  type: "transaction"
  entry: [Patient, Obs, ...]
}`}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Extensions</h3>
              <p className="text-gray-600 text-sm mb-3">
                Add custom data elements not covered by base FHIR specification
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`Patient {
  extension: [{
    url: "race"
    valueCoding: {...}
  }]
}`}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Profiles</h3>
              <p className="text-gray-600 text-sm mb-3">
                Constrain base resources for specific use cases and regions
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`US Core Patient:
- Must have name
- Must have identifier
- Race/ethnicity required`}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Must Support</h3>
              <p className="text-gray-600 text-sm mb-3">
                Mark elements that systems must handle if present in data
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`mustSupport: true
// Server MUST store
// Client MUST display
// If present in data`}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Search Parameters</h3>
              <p className="text-gray-600 text-sm mb-3">
                Define custom search criteria for resources beyond standard parameters
              </p>
              <div className="text-xs bg-gray-50 p-3 rounded font-mono">
                {`GET /Observation?
  code=8867-4
  &date=gt2024-01-01
  &_sort=-date`}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/profilingguide" className="text-primary-blue font-semibold hover:underline text-lg">
              Learn FHIR Profiling & Design →
            </Link>
          </div>
        </div>
      </section>

      {/* Data Platforms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Data Platforms on FHIR</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build modern healthcare data platforms with FHIR as the foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Cloud-Native FHIR Platforms</h3>
              <p className="text-gray-600 mb-6">
                Leverage managed FHIR services from major cloud providers for scalable, compliant data platforms
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-gray-900">Azure Health Data Services</div>
                  <div className="text-sm text-gray-600">Managed FHIR server with DICOM, MedTech IoMT connector</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-gray-900">Google Cloud Healthcare API</div>
                  <div className="text-sm text-gray-600">FHIR R4, HL7v2, DICOM stores with BigQuery integration</div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="font-semibold text-gray-900">AWS HealthLake</div>
                  <div className="text-sm text-gray-600">FHIR data lake with ML-powered entity extraction</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-2">Key Capabilities</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Auto-scaling FHIR servers with SLA guarantees</li>
                  <li>• Built-in compliance (HIPAA, HITRUST, SOC 2)</li>
                  <li>• Native integration with analytics tools</li>
                  <li>• Managed backups and disaster recovery</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Open Source FHIR Platforms</h3>
              <p className="text-gray-600 mb-6">
                Deploy and customize open-source FHIR servers for full control and flexibility
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="font-semibold text-gray-900">HAPI FHIR</div>
                  <div className="text-sm text-gray-600">Java-based, most feature-complete, production-ready</div>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <div className="font-semibold text-gray-900">Firely Server (Vonk)</div>
                  <div className="text-sm text-gray-600">.NET-based, high performance, commercial support available</div>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <div className="font-semibold text-gray-900">IBM FHIR Server</div>
                  <div className="text-sm text-gray-600">Java, linear scalability, multi-tenancy support</div>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <div className="font-semibold text-gray-900">Medplum</div>
                  <div className="text-sm text-gray-600">TypeScript, includes EHR features, developer-friendly</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-2">Key Capabilities</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Full customization and white-labeling</li>
                  <li>• Self-hosted or private cloud deployment</li>
                  <li>• Active community and ecosystem</li>
                  <li>• Plugin architectures for extensibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Data Platform Architecture Layers</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-lg p-4 mb-2">
                  <div className="font-bold">Ingestion</div>
                </div>
                <div className="text-sm text-gray-600">HL7v2, CDA, CSV, APIs</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 rounded-lg p-4 mb-2">
                  <div className="font-bold">Storage</div>
                </div>
                <div className="text-sm text-gray-600">FHIR Server, Database</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-800 rounded-lg p-4 mb-2">
                  <div className="font-bold">Processing</div>
                </div>
                <div className="text-sm text-gray-600">ETL, Validation, Enrichment</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 text-orange-800 rounded-lg p-4 mb-2">
                  <div className="font-bold">Access</div>
                </div>
                <div className="text-sm text-gray-600">APIs, Analytics, Apps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Help Choosing the Right Architecture?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Every healthcare organization has unique requirements. Get expert guidance on selecting and implementing the optimal FHIR architecture for your use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consulting"
              className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              Schedule Architecture Review
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Related Resources</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/profilingguide" className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="text-accent-orange font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">FHIR Profiling Design</h3>
              <p className="text-gray-600 mb-4">Learn to design FHIR profiles and implementation guides</p>
            </Link>

            <Link href="/cqlguide" className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="text-accent-purple font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">CQL Quality Measures</h3>
              <p className="text-gray-600 mb-4">Implement clinical reasoning and quality reporting</p>
            </Link>

            <Link href="/mappingguide" className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="text-primary-blue font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">FHIR Mapping Wiki</h3>
              <p className="text-gray-600 mb-4">Master data transformation and mapping patterns</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
