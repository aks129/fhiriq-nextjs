'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'game' | 'podcast' | 'substack' | 'tool';
  url: string;
  date: string;
  tags?: string[];
  featured?: boolean;
}

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    // Initialize resources with all FHIR IQ content
    const allResources: Resource[] = [
      // Guides
      {
        id: 'architectures',
        title: 'FHIR Reference Architectures',
        description: 'Proven architecture patterns and implementation strategies for healthcare data platforms. 8 detailed patterns including FHIR Facade, CDR, Analytics, and more.',
        type: 'guide',
        url: '/architectures',
        date: '2025-11-02',
        tags: ['architecture', 'design patterns', 'enterprise'],
        featured: true,
      },
      {
        id: 'profiling',
        title: 'FHIR Profiling Design Guide',
        description: 'Master FHIR data modeling and profiling using the Learn, Build, Use framework. Covers base specs, IG research, and profile design.',
        type: 'guide',
        url: '/profilingguide',
        date: '2025-11-02',
        tags: ['profiling', 'data modeling', 'implementation guides'],
        featured: true,
      },
      {
        id: 'cql',
        title: 'CQL Quality Measures Guide',
        description: 'Learn to implement quality measures using CQL on FHIR with breast cancer screening example. Includes complete CQL library and Measure resource.',
        type: 'guide',
        url: '/cqlguide',
        date: '2025-11-01',
        tags: ['CQL', 'quality measures', 'clinical reasoning'],
        featured: true,
      },
      {
        id: 'mapping',
        title: 'FHIR IQ Mapping Wiki',
        description: 'Comprehensive guide to FHIR data mapping patterns and best practices. Transform HL7v2, CDA, and legacy data to FHIR.',
        type: 'guide',
        url: '/mappingguide',
        date: '2025-10-15',
        tags: ['mapping', 'data transformation', 'interoperability'],
        featured: false,
      },
      // Games
      {
        id: 'interop-quest',
        title: 'Interop Quest',
        description: 'Interactive game to learn FHIR interoperability concepts through real-world scenarios. Test your knowledge of patient access, bulk data, and more.',
        type: 'game',
        url: '/games',
        date: '2025-11-01',
        tags: ['learning', 'interoperability', 'interactive'],
        featured: false,
      },
      // Tools
      {
        id: 'fhir-builder',
        title: 'FHIR App Builder',
        description: 'Generate scaffolding for SMART on FHIR applications with authentication, deployment configs, and sample code.',
        type: 'tool',
        url: '/builder',
        date: '2025-10-20',
        tags: ['SMART', 'development', 'scaffolding'],
        featured: false,
      },
      {
        id: 'data-quality',
        title: 'Data Quality Analyzer',
        description: 'Assess FHIR data completeness, conformance, and identify quality issues automatically.',
        type: 'tool',
        url: '/tools',
        date: '2025-10-18',
        tags: ['validation', 'data quality', 'analytics'],
        featured: false,
      },
    ];

    setResources(allResources);
  }, []);

  const resourceTypes = [
    { id: 'all', label: 'All Resources', icon: '📚' },
    { id: 'guide', label: 'Guides', icon: '📖' },
    { id: 'game', label: 'Games', icon: '🎮' },
    { id: 'podcast', label: 'Podcast', icon: '🎙️' },
    { id: 'substack', label: 'Newsletter', icon: '📧' },
    { id: 'tool', label: 'Tools', icon: '🛠️' },
  ];

  const filteredResources = resources
    .filter(resource => selectedType === 'all' || resource.type === selectedType)
    .filter(resource =>
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredResources = resources.filter(r => r.featured);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-primary-blue text-white';
      case 'game': return 'bg-accent-purple text-white';
      case 'podcast': return 'bg-accent-teal text-white';
      case 'substack': return 'bg-accent-orange text-white';
      case 'tool': return 'bg-primary-green text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'guide': return 'Guide';
      case 'game': return 'Game';
      case 'podcast': return 'Podcast';
      case 'substack': return 'Newsletter';
      case 'tool': return 'Tool';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              FHIR IQ Resources
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Your comprehensive library of FHIR guides, tools, games, podcast episodes, and newsletter articles. Everything you need to master FHIR implementation.
            </p>
            <div className="flex gap-4">
              <Link href="/consulting" className="bg-white text-primary-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Expert Help
              </Link>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-12 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <Link
                  key={resource.id}
                  href={resource.url}
                  className="bg-white border-2 border-primary-blue rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                      {getTypeLabel(resource.type)}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(resource.date)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedType === type.id
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <Link
                    key={resource.id}
                    href={resource.url}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary-blue hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                        {getTypeLabel(resource.type)}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(resource.date)}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{resource.description}</p>
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-primary-blue font-semibold text-sm flex items-center">
                      View Resource
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <span className="text-3xl mr-3">🎙️</span>
                FHIR in Practice Podcast
              </h2>
              <p className="text-gray-600">Real-world implementation stories from healthcare technology leaders</p>
            </div>
            <Link
              href="/podcast"
              className="bg-accent-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-teal/90 transition"
            >
              View All Episodes
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Podcast episodes - these would come from your podcast feed */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-teal font-semibold text-sm mb-2">LATEST EPISODE</div>
              <h3 className="text-lg font-bold mb-2">Building a National Health Data Exchange</h3>
              <p className="text-gray-600 text-sm mb-4">
                Interview with architects behind a nationwide FHIR-based health information exchange serving millions of patients.
              </p>
              <Link href="/podcast" className="text-accent-teal font-semibold text-sm hover:underline">
                Listen Now →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-teal font-semibold text-sm mb-2">EPISODE</div>
              <h3 className="text-lg font-bold mb-2">Scaling FHIR for 10M+ Patients</h3>
              <p className="text-gray-600 text-sm mb-4">
                How a major payer built a high-performance FHIR CDR handling billions of requests per month.
              </p>
              <Link href="/podcast" className="text-accent-teal font-semibold text-sm hover:underline">
                Listen Now →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-teal font-semibold text-sm mb-2">EPISODE</div>
              <h3 className="text-lg font-bold mb-2">From HL7v2 to FHIR: Migration Stories</h3>
              <p className="text-gray-600 text-sm mb-4">
                Lessons learned from migrating a legacy HL7v2 integration engine to modern FHIR APIs.
              </p>
              <Link href="/podcast" className="text-accent-teal font-semibold text-sm hover:underline">
                Listen Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <span className="text-3xl mr-3">📧</span>
                FHIR IQ Newsletter
              </h2>
              <p className="text-gray-600">Weekly insights on FHIR standards, implementation patterns, and industry news</p>
            </div>
            <a
              href="https://evestel.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange/90 transition"
            >
              Subscribe on Substack
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Newsletter posts - these would come from Substack RSS */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-orange font-semibold text-sm mb-2">LATEST POST</div>
              <h3 className="text-lg font-bold mb-2">FHIR R5 Preview: What&apos;s New for Implementers</h3>
              <p className="text-gray-600 text-sm mb-4">
                A comprehensive overview of FHIR R5 changes, breaking changes, and migration strategies for existing implementations.
              </p>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold text-sm hover:underline"
              >
                Read More →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-orange font-semibold text-sm mb-2">POST</div>
              <h3 className="text-lg font-bold mb-2">Bulk Data Access: Performance Optimization Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Best practices for implementing FHIR $export operations at scale, with benchmarks and real-world case studies.
              </p>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold text-sm hover:underline"
              >
                Read More →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-orange font-semibold text-sm mb-2">POST</div>
              <h3 className="text-lg font-bold mb-2">SMART App Launch 2.0: Security Enhancements</h3>
              <p className="text-gray-600 text-sm mb-4">
                Understanding the security improvements in SMART App Launch 2.0 and how to implement them in your apps.
              </p>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold text-sm hover:underline"
              >
                Read More →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-accent-orange font-semibold text-sm mb-2">POST</div>
              <h3 className="text-lg font-bold mb-2">US Core 7.0: Breaking Down the Changes</h3>
              <p className="text-gray-600 text-sm mb-4">
                A detailed analysis of US Core 7.0 updates, new profiles, and what they mean for your implementation.
              </p>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-orange font-semibold text-sm hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-accent-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated with FHIR IQ
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get weekly insights on FHIR implementation, new guides, tools, and podcast episodes delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Join 5,000+ healthcare developers and architects. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Expert FHIR Guidance?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re starting a new FHIR project or optimizing an existing implementation,
              our consulting services can help you succeed faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consulting"
                className="bg-primary-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-blue/90 transition"
              >
                View Consulting Services
              </Link>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
