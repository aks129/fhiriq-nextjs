'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ChatBot from '../components/ChatBot';

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const initializeAnalytics = useCallback(() => {
    try {
      trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
      });

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

    if (!newsletterEmail || !isValidEmail(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for subscribing!');
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
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (type: string, event: string, properties: unknown) => void }).gtag('event', eventName, properties);
      }
      if (typeof window !== 'undefined' && 'posthog' in window) {
        (window as unknown as { posthog: { capture: (event: string, properties: unknown) => void } }).posthog.capture(eventName, properties);
      }
    } catch (error) {
      console.error('Event tracking error:', error);
    }
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-[#38BDF8]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center">
                <span className="text-[#0A0A0F] font-bold text-sm">FQ</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">FHIR IQ</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/solutions" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Solutions
              </Link>
              <Link href="/library" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Library
              </Link>
              <Link href="/tools" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Tools
              </Link>
              <Link href="/blog" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Blog
              </Link>
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Podcast
              </Link>
              <Link href="/about" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                About
              </Link>
              <a
                href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
              >
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22] border border-[#38BDF8]/20 text-[#38BDF8] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Building the Open Quality Coalition
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            <span className="text-[#38BDF8]">Healthcare Agents</span> &<br />
            AI-Ready APIs
          </h1>

          <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Open source tools empowering the HL7 FHIR community.<br className="hidden md:block" />
            Advancing SQL on FHIR and transparent quality measurement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'explore_tools' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all inline-flex items-center justify-center gap-2"
            >
              Explore Open Source Tools
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/early-access"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'join_coalition' })}
              className="px-8 py-4 border border-[#38BDF8]/30 text-[#38BDF8] font-medium rounded-lg hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/50 transition-all"
            >
              Join the Coalition
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#38BDF8] to-transparent" />
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0C4A6E]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">What We&apos;re Building</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Open Quality Infrastructure
            </h2>
            <p className="text-xl text-[#94A3B8] font-light max-w-2xl mx-auto">
              Community-driven tools solving real problems in healthcare quality measurement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Open Quality */}
            <Link href="/cql-to-sql" className="group relative bg-gradient-to-br from-[#161B22] to-[#0D1117] rounded-2xl p-8 border border-[#38BDF8]/20 hover:border-[#38BDF8]/50 transition-all hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full text-[#34D399] text-xs font-medium tracking-wide">
                  Open Source
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#0EA5E9]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all">
                <svg className="w-7 h-7 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">Transparent Quality</h3>
              <p className="text-[#94A3B8] mb-6 leading-relaxed">
                Open, auditable quality measure logic. No more black boxes. See exactly how measures are computed.
              </p>
              <div className="flex items-center gap-2 text-[#38BDF8] font-medium group-hover:gap-3 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* SQL on FHIR */}
            <Link href="/library" className="group bg-[#161B22] rounded-2xl p-8 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
              <div className="w-14 h-14 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">SQL on FHIR</h3>
              <p className="text-[#94A3B8] mb-6 leading-relaxed">
                Supporting the HL7 SQL on FHIR work group. ViewDefinitions, flattening patterns, and best practices.
              </p>
              <div className="flex items-center gap-2 text-[#38BDF8] font-medium group-hover:gap-3 transition-all">
                Explore Library
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Community */}
            <Link href="/early-access" className="group bg-[#161B22] rounded-2xl p-8 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
              <div className="w-14 h-14 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">Coalition Partners</h3>
              <p className="text-[#94A3B8] mb-6 leading-relaxed">
                Join healthcare organizations collaborating on open standards for quality measurement.
              </p>
              <div className="flex items-center gap-2 text-[#38BDF8] font-medium group-hover:gap-3 transition-all">
                Join Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(239,68,68,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                The Problem
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Quality Measures Are<br />
                <span className="text-[#EF4444]">Black Boxes</span>
              </h2>
              <p className="text-xl text-[#94A3B8] font-light mb-8 leading-relaxed">
                Healthcare organizations struggle with opaque measure logic, inconsistent results, and no way to understand why patients pass or fail. We&apos;re changing that.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Open, transparent measure logic',
                  'Community-validated implementations',
                  'Works with your existing data warehouse',
                  'HL7 FHIR & SQL on FHIR aligned'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#CBD5E1]">
                    <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/cql-to-sql" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all">
                See How It Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Code Terminal */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#38BDF8]/20 via-transparent to-[#EF4444]/20 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-[#0D1117] rounded-2xl border border-[#38BDF8]/20 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-[#38BDF8]/10">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="ml-3 text-xs text-[#64748B] font-mono">cql-compiler.ts</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-[#64748B] mb-4">{'// Input: CQL'}</div>
                  <div className="mb-6">
                    <span className="text-[#38BDF8]">define</span> <span className="text-white">&quot;Breast Cancer Screening&quot;</span>:<br />
                    <span className="pl-4 text-[#CBD5E1]">exists</span> <span className="text-[#CBD5E1]">[Observation: </span><span className="text-[#FBBF24]">&quot;Mammography&quot;</span><span className="text-[#CBD5E1]">]</span><br />
                    <span className="pl-4 text-[#CBD5E1]">where</span> <span className="text-[#CBD5E1]">effective during </span><span className="text-[#FBBF24]">&quot;Measurement Period&quot;</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent my-6" />
                  <div className="text-[#64748B] mb-4">{'-- Output: SQL'}</div>
                  <div>
                    <span className="text-[#EF4444]">SELECT</span> <span className="text-white">patient_id</span>,<br />
                    <span className="pl-4 text-[#EF4444]">CASE WHEN</span> <span className="text-white">COUNT</span>(*) &gt; 0<br />
                    <span className="pl-4 text-[#EF4444]">THEN</span> <span className="text-[#10B981]">true</span> <span className="text-[#EF4444]">ELSE</span> <span className="text-[#F87171]">false</span> <span className="text-[#EF4444]">END</span><br />
                    <span className="text-[#EF4444]">FROM</span> <span className="text-white">fhir.observation</span><br />
                    <span className="text-[#EF4444]">WHERE</span> <span className="text-white">code</span> <span className="text-[#EF4444]">IN</span> (<span className="text-[#FBBF24]">&apos;24606-6&apos;</span>, ...)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">Developer Tools</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Open Source Utilities
            </h2>
            <p className="text-xl text-[#94A3B8] font-light max-w-2xl mx-auto">
              Production-ready tools for FHIR development and data engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/library', title: 'ViewDefinition Library', desc: 'Pre-built SQL on FHIR ViewDefinitions for US Core 7.0', badge: 'New', badgeColor: 'green' },
              { href: '/fhirsquire', title: 'FHIRSquire', desc: 'AI-powered FHIR profile advisor with instant guidance', badge: 'Live', badgeColor: 'green' },
              { href: 'https://fhirspective.vercel.app', title: 'FHIRspective', desc: 'Data quality analyzer for FHIR resources', badge: 'Live', badgeColor: 'green', external: true },
              { href: 'https://agent-inter-op.vercel.app', title: 'FHIR Data Mapper', desc: 'AI-assisted data mapping with visual editor', badge: 'Live', badgeColor: 'green', external: true },
              { href: 'https://s77.vercel.app', title: 'CQL Builder', desc: 'Generate CQL from natural language descriptions', badge: 'POC', badgeColor: 'orange', external: true },
            ].map((tool, i) => (
              tool.external ? (
                <a key={i} href={tool.href} target="_blank" rel="noopener noreferrer" className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{tool.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${tool.badgeColor === 'green' ? 'bg-[#10B981]/10 text-[#34D399]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-sm mb-4">{tool.desc}</p>
                  <div className="text-[#38BDF8] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Launch <span className="opacity-50">↗</span>
                  </div>
                </a>
              ) : (
                <Link key={i} href={tool.href} className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{tool.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${tool.badgeColor === 'green' ? 'bg-[#10B981]/10 text-[#34D399]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-sm mb-4">{tool.desc}</p>
                  <div className="text-[#38BDF8] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore →
                  </div>
                </Link>
              )
            ))}
            <Link href="/tools" className="group bg-[#0D1117] rounded-xl p-6 border border-dashed border-[#38BDF8]/20 hover:border-[#38BDF8]/40 transition-all flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center mb-4 group-hover:bg-[#38BDF8]/20 transition-all">
                <svg className="w-6 h-6 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">View All Tools</h3>
              <p className="text-[#64748B] text-sm">Explore our complete toolkit</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Coalition CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C4A6E]/20 via-transparent to-[#10B981]/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Open to All Organizations
          </div>

          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Coalition for <span className="text-[#38BDF8]">Open Quality</span>
          </h2>

          <p className="text-xl text-[#94A3B8] font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            We&apos;re building a community of healthcare organizations, vendors, and developers committed to transparent, open source quality measurement. Join us in solving this together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/early-access"
              className="px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all"
            >
              Join the Coalition
            </Link>
            <a
              href="https://github.com/fhiriq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#38BDF8]/30 text-[#38BDF8] font-medium rounded-lg hover:bg-[#38BDF8]/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">Resources</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Guides & Documentation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/architectures', label: 'Reference', title: 'FHIR Architectures', desc: 'Proven architecture patterns', color: '#38BDF8' },
              { href: '/cqlguide', label: 'Guide', title: 'CQL Quality Measures', desc: 'Implement quality measures using CQL', color: '#8B5CF6' },
              { href: '/profilingguide', label: 'Guide', title: 'FHIR Profiling', desc: 'Master data modeling and profiling', color: '#FB923C' },
              { href: '/mappingguide', label: 'Guide', title: 'Mapping Wiki', desc: 'Data mapping patterns and best practices', color: '#38BDF8' },
            ].map((resource, i) => (
              <Link key={i} href={resource.href} className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all">
                <span className="text-xs font-medium tracking-widest uppercase mb-3 block" style={{ color: resource.color }}>
                  {resource.label}
                </span>
                <h3 className="text-lg font-medium text-white mb-2">{resource.title}</h3>
                <p className="text-[#64748B] text-sm">{resource.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/resources" className="text-[#38BDF8] font-medium hover:underline">
              View All Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 relative">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">Stay Updated</h2>
          <p className="text-[#94A3B8] mb-8">
            Get updates on CQL-to-SQL development, new tools, and healthcare data insights.
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-white placeholder-[#64748B] focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]/50"
              required
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all disabled:opacity-50"
            >
              {newsletterLoading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#38BDF8]/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center">
                  <span className="text-[#0A0A0F] font-bold text-sm">FQ</span>
                </div>
                <span className="text-lg font-semibold text-white">FHIR IQ</span>
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Open source tools for the HL7 FHIR community
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Solutions</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/cql-to-sql" className="hover:text-[#38BDF8] transition">CQL-to-SQL Engine</Link></li>
                <li><Link href="/solutions" className="hover:text-[#38BDF8] transition">Data Quality</Link></li>
                <li><Link href="/services" className="hover:text-[#38BDF8] transition">Advisory Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Resources</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/library" className="hover:text-[#38BDF8] transition">ViewDefinition Library</Link></li>
                <li><Link href="/tools" className="hover:text-[#38BDF8] transition">Developer Tools</Link></li>
                <li><Link href="/blog" className="hover:text-[#38BDF8] transition">Blog</Link></li>
                <li><Link href="/podcast" className="hover:text-[#38BDF8] transition">Podcast</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/about" className="hover:text-[#38BDF8] transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#38BDF8] transition">Contact</Link></li>
                <li><Link href="/investor" className="hover:text-[#38BDF8] transition">Investors</Link></li>
                <li><Link href="/privacy" className="hover:text-[#38BDF8] transition">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#38BDF8]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#64748B] text-sm">
              © 2025 FHIR IQ. All rights reserved.
            </p>
            <p className="text-[#475569] text-xs">
              FHIR® is a registered trademark of HL7® and is used with permission.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
}
