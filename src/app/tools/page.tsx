'use client';

import Link from 'next/link';

export default function Tools() {
  const tools = [
    {
      id: 'fpas',
      name: 'FPAS - Prior Authorization System',
      tagline: 'Automated Prior Auth',
      description: 'Production-ready FHIR-based prior authorization platform with intelligent automation and real-time decision support.',
      features: [
        'Real-time eligibility verification',
        'Automated decision engine',
        'FHIR R4 integration',
        'Clinical criteria matching',
        'Compliance tracking'
      ],
      status: 'live',
      demoUrl: 'https://fpas-ui.vercel.app',
      pricing: 'Enterprise',
      popular: true
    },
    {
      id: 'fhir-quiz',
      name: 'FHIR Quiz Training Platform',
      tagline: 'Interactive FHIR Assessment',
      description: 'Comprehensive FHIR knowledge testing platform with 100+ questions, real-time scoring, and detailed explanations.',
      features: [
        'Interactive quiz interface',
        '100+ FHIR questions',
        'Real-time scoring system',
        'Detailed explanations',
        'Progress tracking'
      ],
      status: 'live',
      demoUrl: 'https://fhirquiz.vercel.app',
      pricing: 'Free',
      popular: true
    },
    {
      id: 'plumly-ai',
      name: 'Plumly AI Summary Tool',
      tagline: 'AI-powered summarization',
      description: 'Advanced AI-powered document summarization tool for healthcare content with FHIR-aware processing.',
      features: [
        'AI-powered summarization',
        'Healthcare document processing',
        'FHIR-aware content analysis',
        'Multi-format support',
        'Context preservation'
      ],
      status: 'live',
      demoUrl: 'https://plumly.vercel.app',
      pricing: 'Free',
      popular: true
    },
    {
      id: 'agent-interop',
      name: 'Agent Interoperability Platform',
      tagline: 'Multi-agent healthcare exchange',
      description: 'Multi-agent system for healthcare data exchange and interoperability testing with FHIR validation.',
      features: [
        'Multi-agent architecture',
        'FHIR validation engine',
        'Interoperability testing',
        'Real-time data exchange',
        'Protocol compliance'
      ],
      status: 'live',
      demoUrl: 'https://agent-inter-op.vercel.app',
      pricing: 'Free',
      popular: true
    },
    {
      id: 'fhir-viewbuilder',
      name: 'FHIR View Definition Builder',
      tagline: 'Visual FHIR builder',
      description: 'Visual builder for creating FHIR ViewDefinition resources with drag-and-drop interface and live preview.',
      features: [
        'Drag-and-drop interface',
        'Live preview functionality',
        'FHIR ViewDefinition support',
        'Visual resource builder',
        'Export capabilities'
      ],
      status: 'live',
      demoUrl: 'https://fhir-viewdefinition-builder.vercel.app',
      pricing: 'Free',
      popular: false
    },
    {
      id: 'fhir-query-converter',
      name: 'FHIR Query Converter',
      tagline: 'Query format conversion',
      description: 'Powerful conversion tool for transforming between different FHIR query formats and search syntaxes.',
      features: [
        'Multi-format conversion',
        'FHIR search syntax support',
        'Query validation',
        'Syntax highlighting',
        'Format preservation'
      ],
      status: 'live',
      demoUrl: 'https://fhir-query-converter.vercel.app',
      pricing: 'Free',
      popular: false
    },
    {
      id: 'fhirspective',
      name: 'FHIRspective Data Quality Assessment',
      tagline: 'Comprehensive data quality analysis',
      description: 'Comprehensive FHIR data quality analysis tool with automated reports and improvement recommendations.',
      features: [
        'Data quality scoring',
        'Automated reporting',
        'Improvement recommendations',
        'Quality metrics dashboard',
        'Compliance checking'
      ],
      status: 'live',
      demoUrl: 'https://fhirspective.vercel.app',
      pricing: 'Free',
      popular: true
    },
    {
      id: 'smart-scheduling',
      name: 'Smart Scheduling System',
      tagline: 'AI-powered appointment scheduling',
      description: 'Intelligent healthcare appointment scheduling with FHIR integration and AI-powered optimization.',
      features: [
        'AI-powered optimization',
        'FHIR integration',
        'Appointment management',
        'Resource scheduling',
        'Conflict resolution'
      ],
      status: 'live',
      demoUrl: 'https://smartscheduling.vercel.app',
      pricing: 'Free',
      popular: false
    },
    {
      id: 'liara-health-ai',
      name: 'Liara Health AI Connect',
      tagline: 'Advanced health AI platform',
      description: 'Advanced health AI platform connecting patients, providers, and systems with intelligent FHIR workflows.',
      features: [
        'Patient-provider connectivity',
        'Intelligent FHIR workflows',
        'AI-driven insights',
        'System integration',
        'Health data analytics'
      ],
      status: 'live',
      demoUrl: 'https://smart-health-connect.vercel.app',
      pricing: 'Free',
      popular: false
    },
    {
      id: 'quiz',
      name: 'FHIR Quiz Engine',
      tagline: 'Test your knowledge',
      description: 'Interactive FHIR quiz platform for training and certification preparation.',
      features: [
        'Comprehensive question bank',
        'Adaptive learning paths',
        'Progress tracking',
        'Certification prep',
        'Team dashboards'
      ],
      status: 'live',
      demoUrl: 'https://fhirquiz.vercel.app',
      pricing: 'Starting at $99/month',
      popular: false
    },
    {
      id: 'smart-connect',
      name: 'SMART Health Connect',
      tagline: 'SMART on FHIR testing',
      description: 'Test and validate SMART on FHIR applications with comprehensive auth flows.',
      features: [
        'OAuth 2.0 validation',
        'SMART scopes testing',
        'Token validation',
        'App registration testing',
        'Compliance reports'
      ],
      status: 'live',
      demoUrl: 'https://smart-health-connect.vercel.app',
      pricing: 'Starting at $199/month',
      popular: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'beta':
        return 'bg-accent-orange text-white px-2 py-1 rounded text-sm';
      case 'live':
        return 'bg-primary-green text-white px-2 py-1 rounded text-sm';
      default:
        return 'bg-neutral-gray text-white px-2 py-1 rounded text-sm';
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
              <Link href="/tools" className="text-primary-blue font-semibold">
                Tools
              </Link>
              <Link href="/training" className="text-neutral-gray hover:text-primary-blue font-medium">
                Training
              </Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">
                Blog
              </Link>
              <Link href="/podcast" className="text-neutral-gray hover:text-primary-blue font-medium">
                Podcast
              </Link>
              <Link href="/partners" className="text-neutral-gray hover:text-primary-blue font-medium">
                Partners
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="btn-primary text-sm">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-green to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Driven FHIR Tools</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Accelerate your FHIR development with our suite of AI-powered tools.
            From mapping to analytics, we provide the automation you need to scale.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/tools/fhir-builder"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Try AI Builder (Free)
            </Link>
            <Link
              href="#tools-catalog"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Catalog */}
      <section id="tools-catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Choose Your FHIR Tool
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={`card hover:shadow-xl transition-shadow ${
                  tool.popular ? 'ring-2 ring-primary-blue' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-navy mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary-blue">
                      {tool.tagline}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={getStatusBadge(tool.status)}>
                      {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                    </span>
                    {tool.popular && (
                      <span className="bg-primary-blue text-white px-2 py-1 rounded text-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-neutral-gray mb-6">
                  {tool.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-primary-navy">Key Features:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-neutral-gray">
                        <span className="text-primary-green mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-lg font-bold text-primary-navy">
                      {tool.pricing}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={tool.demoUrl}
                    className="btn-primary flex-1 text-center"
                  >
                    Try Demo
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary flex-1 text-center"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight: AI Builder */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary-navy">
                Featured: AI FHIR App Builder
              </h2>
              <p className="text-lg text-neutral-gray mb-8">
                Our flagship tool turns your FHIR requirements into working applications.
                Choose your stack, connect to a FHIR server, and download a complete
                scaffold ready for deployment.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-primary-green text-xl mr-3">1.</span>
                  <span className="text-neutral-gray">Select use case (Patient Summary, Quality Measures)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-green text-xl mr-3">2.</span>
                  <span className="text-neutral-gray">Connect to FHIR server or upload CapabilityStatement</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-green text-xl mr-3">3.</span>
                  <span className="text-neutral-gray">Choose tech stack (Next.js + HAPI FHIR)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-green text-xl mr-3">4.</span>
                  <span className="text-neutral-gray">AI generates working application scaffold</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-green text-xl mr-3">5.</span>
                  <span className="text-neutral-gray">Download ZIP or deploy to Vercel</span>
                </div>
              </div>

              <a
                href="https://fhir-viewdefinition-builder.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Start Building Now (Free)
              </a>
            </div>

            <div className="bg-primary-navy text-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Demo Output Preview</h3>
              <div className="bg-black p-4 rounded text-green-400 font-mono text-sm">
                <div>✓ Generated Next.js 15 app with TypeScript</div>
                <div>✓ HAPI FHIR server configuration</div>
                <div>✓ Patient summary components</div>
                <div>✓ SMART on FHIR authentication</div>
                <div>✓ Docker compose for local development</div>
                <div>✓ Vercel deployment configuration</div>
                <div className="mt-2 text-white">
                  📦 Download ready: patient-summary-app.zip
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary-navy">
            Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Starter</h3>
              <div className="text-3xl font-bold text-primary-blue mb-4">$199</div>
              <div className="text-neutral-gray mb-6">per month</div>
              <ul className="text-left text-neutral-gray space-y-2 mb-6">
                <li>✓ Data Quality Assessor</li>
                <li>✓ Basic mapping tools</li>
                <li>✓ Email support</li>
                <li>✓ Up to 10k records/month</li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center">
                Get Started
              </Link>
            </div>

            <div className="card text-center ring-2 ring-primary-blue">
              <div className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm mb-4">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Professional</h3>
              <div className="text-3xl font-bold text-primary-blue mb-4">$499</div>
              <div className="text-neutral-gray mb-6">per month</div>
              <ul className="text-left text-neutral-gray space-y-2 mb-6">
                <li>✓ All Starter features</li>
                <li>✓ FHIR Analytics</li>
                <li>✓ Advanced mapping</li>
                <li>✓ Priority support</li>
                <li>✓ Up to 100k records/month</li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center">
                Get Started
              </Link>
            </div>

            <div className="card text-center">
              <h3 className="text-xl font-bold mb-4 text-primary-navy">Enterprise</h3>
              <div className="text-3xl font-bold text-primary-blue mb-4">Custom</div>
              <div className="text-neutral-gray mb-6">tailored pricing</div>
              <ul className="text-left text-neutral-gray space-y-2 mb-6">
                <li>✓ All Professional features</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
                <li>✓ Unlimited records</li>
                <li>✓ SLA guarantees</li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center">
                Contact Sales
              </Link>
            </div>
          </div>

          <p className="text-neutral-gray">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Accelerate Your FHIR Development?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of healthcare organizations using FHIR IQ tools
            to ship faster and more reliable FHIR implementations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/tools/fhir-builder"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                AI-powered FHIR tools for faster, more reliable healthcare interoperability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools/fhir-builder" className="hover:text-white">AI FHIR Builder</Link></li>
                <li><Link href="/tools/mapper" className="hover:text-white">Mapper to FHIR</Link></li>
                <li><Link href="/tools/data-quality" className="hover:text-white">Data Quality</Link></li>
                <li><Link href="/tools/analytics" className="hover:text-white">FHIR Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}