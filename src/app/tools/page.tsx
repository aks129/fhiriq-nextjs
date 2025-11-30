'use client';

import Link from 'next/link';

export default function Tools() {
  const tools = [
    {
      id: 'cql-builder',
      name: 'CQL Builder',
      tagline: 'AI-Powered Clinical Quality Language Generation',
      description: 'Generate production-ready CQL code using natural language descriptions. AI-powered code generation with auto-fix capabilities and Synthea test data integration.',
      features: [
        'Natural language to CQL generation',
        'Multi-IG support (US Core, QI-Core, HEDIS)',
        'Auto-fix validation errors with AI',
        'CQL-to-ELM compilation',
        'VSAC value set integration'
      ],
      status: 'poc',
      demoUrl: 'https://s77.vercel.app',
      category: 'quality'
    },
    {
      id: 'viewdefinition-library',
      name: 'ViewDefinition Library',
      tagline: 'Pre-built SQL on FHIR ViewDefinitions',
      description: 'Open source ViewDefinitions for US Core 7.0. Copy JSON or generated SQL with one click. Stop writing boilerplate.',
      features: [
        'US Core 7.0 compatible',
        'SQL on FHIR IG v2.0 spec',
        'One-click copy JSON/SQL',
        'BigQuery, Snowflake ready',
        'Open source'
      ],
      status: 'live',
      demoUrl: '/library',
      category: 'analytics'
    },
    {
      id: 'fhirsquire',
      name: 'FHIRSquire',
      tagline: 'AI-Powered FHIR Profile Advisor',
      description: 'Get instant, AI-powered guidance on FHIR profiles, implementation guides, and best practices. Navigate the complexity of FHIR standards with confidence.',
      features: [
        'AI-powered profile recommendations',
        'Implementation guide navigation',
        'Best practices and code examples',
        'US Core, CARIN BB, Da Vinci support'
      ],
      status: 'live',
      demoUrl: '/fhirsquire',
      category: 'development'
    },
    {
      id: 'fhirspective',
      name: 'FHIRspective Data Quality Analyzer',
      tagline: 'Eliminate Gray Water Data',
      description: 'Get instant assessment of your FHIR data quality using standards-based DQ frameworks. Identify issues before they cause production problems.',
      features: [
        'Standards-based DQ scoring',
        'US Core & IG compliance validation',
        'Automated quality reports',
        'Completeness & conformance metrics',
        'Actionable recommendations'
      ],
      status: 'live',
      demoUrl: 'https://fhirspective.vercel.app',
      category: 'quality'
    },
    {
      id: 'data-mapper',
      name: 'FHIR Data Mapper',
      tagline: 'AI-Assisted Data Mapping',
      description: 'Map your data to FHIR faster with intelligent mapping suggestions and validation. Reduce weeks of manual work to hours.',
      features: [
        'AI-assisted mapping suggestions',
        'HL7 v2, CDA, CSV to FHIR',
        'Visual mapping interface',
        'Built-in FHIR validation',
        'Export mapping configurations'
      ],
      status: 'live',
      demoUrl: 'https://agent-inter-op.vercel.app',
      category: 'development'
    },
    {
      id: 'fhir-query-converter',
      name: 'FHIR Query Converter',
      tagline: 'Convert FHIR Query Formats',
      description: 'Convert between FHIR query formats and search syntaxes for different FHIR server implementations.',
      features: [
        'Multi-format conversion',
        'FHIR search parameter support',
        'Query validation',
        'Syntax highlighting',
        'Copy-paste ready output'
      ],
      status: 'live',
      demoUrl: 'https://fhir-query-converter.vercel.app',
      category: 'development'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-primary-green text-white';
      case 'poc':
        return 'bg-yellow-500 text-white';
      case 'beta':
        return 'bg-accent-orange text-white';
      default:
        return 'bg-neutral-gray text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quality':
        return 'bg-accent-purple/10 text-accent-purple';
      case 'analytics':
        return 'bg-primary-blue/10 text-primary-blue';
      case 'development':
        return 'bg-primary-green/10 text-primary-green';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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
              <Link href="/library" className="text-neutral-gray hover:text-primary-blue font-medium">
                Library
              </Link>
              <Link href="/tools" className="text-primary-blue font-semibold">
                Tools
              </Link>
              <Link href="/services" className="text-neutral-gray hover:text-primary-blue font-medium">
                Services
              </Link>
              <Link href="/resources" className="text-neutral-gray hover:text-primary-blue font-medium">
                Resources
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-green to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Developer Tools</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Open source utilities for FHIR development, data quality, and analytics
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/library"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ViewDefinition Library
            </Link>
            <Link
              href="/cql-to-sql"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              CQL-to-SQL Engine
            </Link>
          </div>
        </div>
      </section>

      {/* CQL-to-SQL Banner */}
      <section className="bg-gradient-to-r from-accent-purple to-primary-blue text-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium opacity-80 mb-1">Coming Q1 2026</div>
            <h3 className="text-2xl font-bold">CQL-to-SQL Compilation Engine</h3>
            <p className="opacity-90">Compile Clinical Quality Language to native SQL for your data warehouse</p>
          </div>
          <Link href="/cql-to-sql" className="bg-white text-accent-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap">
            Learn More
          </Link>
        </div>
      </section>

      {/* Tools Catalog */}
      <section id="tools-catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Free and open source tools for FHIR development and healthcare data engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(tool.category)}`}>
                    {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(tool.status)}`}>
                    {tool.status === 'poc' ? 'POC' : tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-primary-blue font-medium mb-3">
                  {tool.tagline}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {tool.description}
                </p>

                <div className="mb-6">
                  <ul className="space-y-1">
                    {tool.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-primary-green mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tool.demoUrl}
                  target={tool.demoUrl.startsWith('http') ? '_blank' : undefined}
                  rel={tool.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary w-full text-center block"
                >
                  {tool.status === 'poc' ? 'Try POC' : 'Open Tool'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Tools
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Standards Compliant</h3>
              <p className="text-gray-600">
                Built for US Core, CARIN BB, Da Vinci, and SQL on FHIR implementation guides
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Open Source First</h3>
              <p className="text-gray-600">
                Free tools for the community. Use them, extend them, contribute back
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Leverage AI for code generation, mapping suggestions, and quality recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Partner CTA */}
      <section className="py-16 bg-gradient-to-r from-accent-purple to-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want Early Access to the CQL-to-SQL Engine?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our Design Partner Program and shape the future of clinical quality analytics
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/early-access"
              className="bg-white text-accent-purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Apply for Design Partner Program
            </Link>
            <Link
              href="/cql-to-sql"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent-purple transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                The Semantic Intelligence Layer for Healthcare
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/cql-to-sql" className="hover:text-white">CQL-to-SQL Engine</Link></li>
                <li><Link href="/solutions" className="hover:text-white">Data Quality</Link></li>
                <li><Link href="/services" className="hover:text-white">Advisory Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/library" className="hover:text-white">ViewDefinition Library</Link></li>
                <li><Link href="/tools" className="hover:text-white">Developer Tools</Link></li>
                <li><Link href="/architectures" className="hover:text-white">Architectures</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/investor" className="hover:text-white">Investors</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
