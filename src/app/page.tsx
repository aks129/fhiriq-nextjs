'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ChatBot from '../components/ChatBot';

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const initializeAnalytics = useCallback(() => {
    try {
      // Track page view
      trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
      });

      // Track scroll depth
      let scroll25Tracked = false;
      let scroll50Tracked = false;
      let scroll75Tracked = false;
      let scroll90Tracked = false;

      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent >= 25 && !scroll25Tracked) {
          trackEvent('scroll_depth', { depth: 25 });
          scroll25Tracked = true;
        }
        if (scrollPercent >= 50 && !scroll50Tracked) {
          trackEvent('scroll_depth', { depth: 50 });
          scroll50Tracked = true;
        }
        if (scrollPercent >= 75 && !scroll75Tracked) {
          trackEvent('scroll_depth', { depth: 75 });
          scroll75Tracked = true;
        }
        if (scrollPercent >= 90 && !scroll90Tracked) {
          trackEvent('scroll_depth', { depth: 90 });
          scroll90Tracked = true;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }, []);

  useEffect(() => {
    initializeAnalytics();
  }, [initializeAnalytics]);

  async function handleNewsletterSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!newsletterEmail) {
      alert('Please enter your email address');
      return;
    }

    if (!isValidEmail(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for subscribing! Check your email for confirmation.');
        setNewsletterEmail('');
        trackEvent('newsletter_signup', { email: newsletterEmail });
      } else {
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  }

  function trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
    try {
      console.log('Track event:', eventName, properties);

      // Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (type: string, event: string, properties: unknown) => void }).gtag('event', eventName, properties);
      }

      // PostHog
      if (typeof window !== 'undefined' && 'posthog' in window) {
        (window as unknown as { posthog: { capture: (event: string, properties: unknown) => void } }).posthog.capture(eventName, properties);
      }
    } catch (error) {
      console.error('Event tracking error:', error);
    }
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

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
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
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
      <section className="bg-gradient-to-br from-primary-navy via-primary-blue to-accent-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Semantic Intelligence Layer<br />for Healthcare
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Turn clinical logic into enterprise intelligence. Operationalize quality measures directly in your data warehouse.
            </p>

            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link
                href="/cql-to-sql"
                onClick={() => trackEvent('hero_cta_clicked', { button: 'cql_to_sql' })}
                className="bg-white text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                Explore CQL-to-SQL Engine
              </Link>
              <Link
                href="/early-access"
                onClick={() => trackEvent('hero_cta_clicked', { button: 'design_partner' })}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition text-lg"
              >
                Join Design Partner Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered tools and services to accelerate healthcare data intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CQL to SQL Engine - Primary */}
            <Link href="/cql-to-sql" className="bg-gradient-to-br from-primary-blue to-accent-purple text-white rounded-2xl p-8 hover:shadow-xl transition group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">CQL-to-SQL Engine</h3>
              <p className="opacity-90 mb-4">
                Compile Clinical Quality Language to native SQL. Run quality measures in Snowflake, Databricks, or BigQuery.
              </p>
              <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Data Quality */}
            <Link href="/solutions" className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary-blue hover:shadow-lg transition group">
              <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Data Quality Audits</h3>
              <p className="text-gray-600 mb-4">
                Eliminate gray water data before it hits your analytics layer. Automated FHIR conformance and completeness checks.
              </p>
              <div className="flex items-center gap-2 text-primary-blue font-semibold group-hover:gap-3 transition-all">
                Explore
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Advisory */}
            <Link href="/services" className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary-blue hover:shadow-lg transition group">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Advisory & Architecture</h3>
              <p className="text-gray-600 mb-4">
                Enterprise enablement from FHIR experts. Strategic planning, architecture reviews, and implementation support.
              </p>
              <div className="flex items-center gap-2 text-primary-blue font-semibold group-hover:gap-3 transition-all">
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CQL to SQL Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary-blue/10 text-primary-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Now in Development
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From CQL to SQL in Seconds
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Traditional Java-based CQL engines are slow, opaque, and require separate infrastructure. Our approach compiles CQL directly to optimized SQL that runs natively in your data warehouse.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Transparent, auditable SQL output
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Native warehouse performance (Snowflake, Databricks, BigQuery)
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Direct BI tool integration
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SQL on FHIR ViewDefinition compatible
                </li>
              </ul>
              <Link href="/cql-to-sql" className="btn-primary inline-block">
                Learn More About CQL-to-SQL
              </Link>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs">CQL → SQL</span>
              </div>
              <div className="text-green-400 mb-4">
                <span className="text-gray-500">{'// Input: CQL'}</span><br />
                <span className="text-blue-400">define</span> <span className="text-white">&quot;Breast Cancer Screening&quot;</span>:<br />
                <span className="pl-4">exists</span> [Observation: <span className="text-yellow-400">&quot;Mammography&quot;</span>]<br />
                <span className="pl-4">where</span> effective during <span className="text-yellow-400">&quot;Measurement Period&quot;</span>
              </div>
              <div className="border-t border-gray-700 pt-4 text-blue-400">
                <span className="text-gray-500">{'-- Output: SQL'}</span><br />
                <span className="text-purple-400">SELECT</span> <span className="text-white">patient_id</span>,<br />
                <span className="pl-4 text-purple-400">CASE WHEN</span> <span className="text-white">COUNT</span>(*) &gt; 0<br />
                <span className="pl-4 text-purple-400">THEN</span> <span className="text-green-400">true</span> <span className="text-purple-400">ELSE</span> <span className="text-red-400">false</span> <span className="text-purple-400">END</span><br />
                <span className="text-purple-400">FROM</span> <span className="text-white">fhir.observation</span><br />
                <span className="text-purple-400">WHERE</span> <span className="text-white">code</span> <span className="text-purple-400">IN</span> (<span className="text-yellow-400">&apos;24606-6&apos;</span>, ...)<br />
                <span className="pl-4 text-purple-400">AND</span> <span className="text-white">effective_date</span> <span className="text-purple-400">BETWEEN</span> ...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Developer Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Open source utilities for FHIR development and data engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/library" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">ViewDefinition Library</h3>
                <span className="bg-primary-green/10 text-primary-green px-2 py-1 rounded text-sm font-medium">New</span>
              </div>
              <p className="text-gray-600 mb-4">
                Pre-built SQL on FHIR ViewDefinitions for US Core 7.0. Copy JSON or SQL with one click.
              </p>
              <div className="text-primary-blue font-semibold">Browse Library →</div>
            </Link>

            <Link href="/fhirsquire" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">FHIRSquire</h3>
                <span className="bg-primary-green/10 text-primary-green px-2 py-1 rounded text-sm font-medium">Live</span>
              </div>
              <p className="text-gray-600 mb-4">
                AI-powered FHIR profile advisor. Get instant guidance on profiles, IGs, and best practices.
              </p>
              <div className="text-primary-blue font-semibold">Try FHIRSquire →</div>
            </Link>

            <a href="https://fhirspective.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">FHIRspective</h3>
                <span className="bg-primary-green/10 text-primary-green px-2 py-1 rounded text-sm font-medium">Live</span>
              </div>
              <p className="text-gray-600 mb-4">
                Data quality analyzer for FHIR resources. Assess completeness, conformance, and identify issues.
              </p>
              <div className="text-primary-blue font-semibold">Analyze Data →</div>
            </a>

            <a href="https://agent-inter-op.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">FHIR Data Mapper</h3>
                <span className="bg-primary-green/10 text-primary-green px-2 py-1 rounded text-sm font-medium">Live</span>
              </div>
              <p className="text-gray-600 mb-4">
                AI-assisted data mapping from source schemas to FHIR resources. Visual mapping editor.
              </p>
              <div className="text-primary-blue font-semibold">Start Mapping →</div>
            </a>

            <a href="https://s77.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-blue transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">CQL Builder</h3>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">POC</span>
              </div>
              <p className="text-gray-600 mb-4">
                Generate CQL from natural language descriptions. AI-powered clinical logic authoring.
              </p>
              <div className="text-primary-blue font-semibold">Try POC →</div>
            </a>

            <Link href="/tools" className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="text-xl font-semibold mb-2">View All Tools</h3>
              <p className="text-gray-600">
                Explore our full suite of FHIR development tools
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Design Partner CTA */}
      <section className="py-20 bg-gradient-to-br from-accent-purple to-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            Limited to 3 Partners · Q1 2026
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be one of three design partners shaping the future of CQL-to-SQL. Get early access, direct founder access, and influence the roadmap.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/early-access"
              className="bg-white text-accent-purple px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Apply for Design Partner Program
            </Link>
            <Link
              href="/cql-to-sql"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent-purple transition text-lg"
            >
              Learn About CQL-to-SQL
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guides, architectures, and best practices for FHIR implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/architectures" className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border-2 border-primary-blue">
              <div className="text-primary-blue font-semibold text-sm mb-2">REFERENCE</div>
              <h3 className="text-xl font-semibold mb-2">FHIR Architectures</h3>
              <p className="text-gray-600 mb-4">Proven architecture patterns for healthcare data platforms</p>
              <div className="text-sm text-gray-500">8 patterns</div>
            </Link>

            <Link href="/cqlguide" className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
              <div className="text-accent-purple font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">CQL Quality Measures</h3>
              <p className="text-gray-600 mb-4">Implement quality measures using CQL on FHIR</p>
              <div className="text-sm text-gray-500">Implementation guide</div>
            </Link>

            <Link href="/profilingguide" className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
              <div className="text-accent-orange font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">FHIR Profiling</h3>
              <p className="text-gray-600 mb-4">Master FHIR data modeling and profiling</p>
              <div className="text-sm text-gray-500">Design guide</div>
            </Link>

            <Link href="/mappingguide" className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
              <div className="text-primary-blue font-semibold text-sm mb-2">GUIDE</div>
              <h3 className="text-xl font-semibold mb-2">Mapping Wiki</h3>
              <p className="text-gray-600 mb-4">FHIR data mapping patterns and best practices</p>
              <div className="text-sm text-gray-500">Interactive guide</div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/resources" className="text-primary-blue font-semibold hover:underline text-lg">
              View All Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Get updates on CQL-to-SQL development, new tools, and healthcare data insights.
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="btn-primary whitespace-nowrap disabled:opacity-50"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
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
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/investor" className="hover:text-white">Investors</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-3">&copy; 2025 FHIR IQ. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              FHIR® is a registered trademark of Health Level Seven International (HL7®) and is used with permission.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
}
