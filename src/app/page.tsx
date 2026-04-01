'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ChatBot from '../components/ChatBot';
import HealthIOBanner from '../components/HealthIOBanner';

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
      {/* HIMSS 2026 Banner */}
      <HealthIOBanner />

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
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Podcast
              </Link>
              <Link href="/blog" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Newsletter
              </Link>
              <Link href="/tools" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Lab
              </Link>
              <Link href="/resources" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Resources
              </Link>
              <Link href="/about" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                About
              </Link>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('nav_cta_clicked', { button: 'subscribe' })}
                className="px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Founder-Led */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.12)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38BDF8]/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#8B5CF6]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22] border border-[#38BDF8]/20 text-[#38BDF8] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Out of the FHIR Podcast &middot; New episodes weekly
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            I help healthcare orgs<br />
            make sense of <span className="text-[#38BDF8]">FHIR, AI,</span><br />
            <span className="text-[#38BDF8]">and quality measurement</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            I&apos;m Eugene Vestel. Through consulting, open-source tools, and the
            Out of the FHIR podcast, I help teams navigate healthcare interoperability
            and turn data into outcomes.
          </p>

          <p className="text-sm text-[#64748B] mb-10">
            Payer Interoperability Analytics &amp; AI Lead at Outcomes &middot; Former NCQA Advisor &middot; 15+ years in healthcare data
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://evestel.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'subscribe_playbook' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all inline-flex items-center justify-center gap-2"
            >
              Subscribe to the Playbook
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/podcast"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'listen_podcast' })}
              className="px-8 py-4 border border-[#38BDF8]/30 text-[#38BDF8] font-medium rounded-lg hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/50 transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Listen to the Podcast
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#38BDF8] to-transparent" />
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 border-y border-[#38BDF8]/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C4A6E]/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: 'Outcomes', detail: 'Payer Interoperability Analytics & AI Lead' },
              { label: 'NCQA Advisor', detail: 'Quality Measurement' },
              { label: 'b.well Connected Health', detail: 'Director of Data & Analytics' },
              { label: 'UPMC Health System', detail: '5 Years in Clinical Analytics' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-[#64748B] text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(139,92,246,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-4 block">Podcast</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Out of the <span className="text-[#8B5CF6]">FHIR</span>
              </h2>
              <p className="text-lg text-[#94A3B8] font-light mb-8 leading-relaxed">
                Weekly conversations with the people building the future of healthcare
                interoperability. From HL7 work group chairs to startup founders to
                CMS policy makers &mdash; the stories behind the standards.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="https://evestel.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-[#CBD5E1] text-sm hover:border-[#38BDF8]/40 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 text-[#FB923C]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                  </svg>
                  Substack
                </a>
                <a
                  href="https://open.spotify.com/show/outofthefhir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-[#CBD5E1] text-sm hover:border-[#1DB954]/40 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/podcast/out-of-the-fhir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-[#CBD5E1] text-sm hover:border-[#D56DFB]/40 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 text-[#D56DFB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c4.988 0 8.94 3.16 9.69 7.62.09.42-.18.84-.6.93-.42.09-.84-.18-.93-.6C19.38 6.78 16.08 4.08 12 4.08c-4.08 0-7.38 2.7-8.025 6.438-.09.42-.51.69-.93.6-.42-.09-.69-.51-.6-.93.75-4.46 4.702-7.62 9.42-7.62zm.135 3.24c3.24 0 5.835 2.34 6.36 5.46.06.42-.24.81-.66.87-.42.06-.81-.24-.87-.66-.39-2.34-2.46-4.17-4.83-4.17s-4.44 1.83-4.83 4.17c-.06.42-.45.72-.87.66a.738.738 0 01-.66-.87c.525-3.12 3.12-5.46 6.36-5.46zm-.075 3.306A3.024 3.024 0 0114.94 12c0 1.32-.84 2.43-2.01 2.82v4.02c0 .51-.42.93-.93.93a.934.934 0 01-.93-.93v-4.02A3.006 3.006 0 019 12a3.024 3.024 0 012.925-3.006z" />
                  </svg>
                  Apple
                </a>
                <a
                  href="https://youtube.com/@outofthefhir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-[#CBD5E1] text-sm hover:border-[#FF0000]/40 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </div>

              <Link
                href="/podcast"
                className="inline-flex items-center gap-2 text-[#38BDF8] font-medium hover:gap-3 transition-all"
              >
                Browse all episodes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Podcast Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6]/20 via-transparent to-[#38BDF8]/20 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-[#161B22] rounded-2xl border border-[#8B5CF6]/20 p-8 space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">Out of the FHIR</h3>
                    <p className="text-[#64748B] text-sm">with Eugene Vestel</p>
                  </div>
                </div>

                {/* Sample episodes */}
                {[
                  { guest: 'HL7 Work Group Insights', topic: 'The future of SQL on FHIR and ViewDefinitions' },
                  { guest: 'Quality Measurement Deep Dive', topic: 'Why CQL needs a better execution story' },
                  { guest: 'Interoperability in Practice', topic: 'Real-world FHIR implementation lessons' },
                ].map((ep, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#0D1117] border border-[#38BDF8]/10 hover:border-[#38BDF8]/20 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{ep.guest}</p>
                      <p className="text-[#64748B] text-xs mt-1">{ep.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Playbook Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C4A6E]/15 via-transparent to-[#8B5CF6]/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">Newsletter</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            The FHIR IQ <span className="text-[#38BDF8]">Playbook</span>
          </h2>

          <p className="text-lg text-[#94A3B8] font-light mb-4 max-w-2xl mx-auto leading-relaxed">
            A weekly newsletter on FHIR implementation, quality measurement,
            healthcare AI, and the tools and standards shaping interoperability.
            Written for the people doing the actual work.
          </p>

          <p className="text-sm text-[#64748B] mb-10">
            Trusted by 450+ healthcare data professionals
          </p>

          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-4 rounded-lg bg-[#161B22] border border-[#38BDF8]/20 text-white placeholder-[#64748B] focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]/50"
              required
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              onClick={() => trackEvent('newsletter_cta_clicked', { location: 'main_section' })}
              className="px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe Free'}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-[#64748B] text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Weekly insights
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unsubscribe anytime
            </span>
          </div>
        </div>
      </section>

      {/* The Lab - Open Source Tools */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">The Lab</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Things I&apos;m Building &amp; Exploring
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              Open source tools for the FHIR community. Some are production-ready,
              some are experiments. All are free to use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/library', title: 'ViewDefinition Library', desc: 'Pre-built SQL on FHIR ViewDefinitions for US Core 7.0. Copy-paste ready.', badge: 'Ready to use' },
              { href: '/fhirsquire', title: 'FHIRSquire', desc: 'AI-powered FHIR profile advisor. Ask questions, get instant guidance.' },
              { href: 'https://fhirspective.vercel.app', title: 'FHIRspective', desc: 'Analyze and validate FHIR resources for data quality issues.', external: true },
              { href: 'https://agent-inter-op.vercel.app', title: 'FHIR Data Mapper', desc: 'AI-assisted data mapping with a visual editor.', external: true },
              { href: 'https://s77.vercel.app', title: 'CQL Builder', desc: 'Generate CQL from natural language. Early experiment.', badge: 'Experiment', external: true },
            ].map((tool, i) => (
              tool.external ? (
                <a key={i} href={tool.href} target="_blank" rel="noopener noreferrer" className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{tool.title}</h3>
                    {tool.badge && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[#FBBF24]/10 text-[#FBBF24]">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[#94A3B8] text-sm mb-4">{tool.desc}</p>
                  <div className="text-[#38BDF8] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Try it <span className="opacity-50">↗</span>
                  </div>
                </a>
              ) : (
                <Link key={i} href={tool.href} className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{tool.title}</h3>
                    {tool.badge && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[#10B981]/10 text-[#34D399]">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[#94A3B8] text-sm mb-4">{tool.desc}</p>
                  <div className="text-[#38BDF8] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore →
                  </div>
                </Link>
              )
            ))}
            <a
              href="https://github.com/fhiriq"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0D1117] rounded-xl p-6 border border-dashed border-[#38BDF8]/20 hover:border-[#38BDF8]/40 transition-all flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center mb-4 group-hover:bg-[#38BDF8]/20 transition-all">
                <svg className="w-6 h-6 text-[#38BDF8]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">View on GitHub</h3>
              <p className="text-[#64748B] text-sm">All projects are open source</p>
            </a>
          </div>
        </div>
      </section>

      {/* HealthClaw - Personal Health AI */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-4 block">Open Source &middot; Community Project</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Building <span className="text-[#10B981]">HealthClaw</span>
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto mb-6">
              A personal AI health agent stack I&apos;m building openly with the community &mdash;
              no commercial angle. Exploring what happens when patients have the same processing
              power as provider systems.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://open.substack.com/pub/evestel/p/building-a-new-empowered-health-system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#10B981] hover:underline"
              >
                Building a New Empowered Health System ↗
              </a>
              <a
                href="https://open.substack.com/pub/evestel/p/how-i-build-my-personal-openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#10B981] hover:underline"
              >
                How I Build My Personal OpenClaw ↗
              </a>
            </div>
          </div>

          {/* HealthClaw Guardrails — primary card */}
          <a
            href="https://healthclaw.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit HealthClaw Guardrails at healthclaw.io"
            className="group block bg-[#0D1117] rounded-2xl p-8 md:p-10 border border-[#10B981]/30 hover:border-[#10B981]/60 transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] mb-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] text-xs font-medium tracking-widest uppercase">Live</span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-[#10B981]/15 text-[#34D399]">healthclaw.io</span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-[#161B22] text-[#64748B]">Open Source</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">HealthClaw Guardrails</h3>
            <p className="text-[#94A3B8] text-base mb-6 max-w-3xl leading-relaxed">
              A security layer between AI agents and clinical data. Redacts PHI on every read,
              enforces multi-step human approval for clinical writes — proposal → permission evaluation →
              HMAC confirmation → immutable audit log — and keeps your health agent interactions HIPAA-compliant.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {['12 MCP Tools', 'PHI Redaction', 'FHIR R4/R6', 'US Core v9', 'Fasten Connect', 'Local SQLite'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[#10B981] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Visit healthclaw.io
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <a
                href="https://github.com/aks129/HealthClawGuardrails"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#64748B] hover:text-[#94A3B8] text-sm flex items-center gap-1.5 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>
          </a>

          {/* Smart Health Connect — secondary card, same weight */}
          <a
            href="https://github.com/aks129/SmartHealthConnect"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Smart Health Connect on GitHub"
            className="group block bg-[#0D1117] rounded-2xl p-8 md:p-10 border border-[#38BDF8]/20 hover:border-[#38BDF8]/50 transition-all hover:shadow-[0_0_50px_rgba(56,189,248,0.12)] mb-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#38BDF8] text-xs font-medium tracking-widest uppercase">SMART on FHIR</span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-[#38BDF8]/10 text-[#38BDF8]">Open Source</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">Smart Health Connect</h3>
            <p className="text-[#94A3B8] text-base mb-6 max-w-3xl leading-relaxed">
              A SMART on FHIR patient records platform that aggregates your health data from Epic, Cerner,
              and other EHRs into a single secure interface. Provides curated health visualizations and MCP tools —
              the data layer that HealthClaw agents work with.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {['SMART on FHIR R4', 'React + TypeScript', 'MCP Tools', 'AI Health Insights', 'Multi-EHR', 'PostgreSQL'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-[#38BDF8] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              View on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          {/* More work */}
          <div className="text-center">
            <p className="text-[#64748B] text-sm mb-2">More experiments in progress — Curatr Skills and others</p>
            <a
              href="https://github.com/aks129"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-white text-sm font-medium transition flex items-center gap-1.5 justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              See all projects on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Resources & Guides */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">Resources</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Free Guides &amp; References
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              Practical resources I&apos;ve written based on real implementation experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/architectures', label: 'Reference', title: 'FHIR Architectures', desc: 'Proven architecture patterns for FHIR systems', color: '#38BDF8' },
              { href: '/cqlguide', label: 'Guide', title: 'CQL Quality Measures', desc: 'Implement quality measures using CQL', color: '#8B5CF6' },
              { href: '/profilingguide', label: 'Guide', title: 'FHIR Profiling', desc: 'Data modeling and profiling best practices', color: '#FB923C' },
              { href: '/mappingguide', label: 'Guide', title: 'Mapping Wiki', desc: 'Data mapping patterns and techniques', color: '#38BDF8' },
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

      {/* Fun & Games */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] text-sm font-medium tracking-widest uppercase mb-4 block">Fun &amp; Games</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Test Your Healthcare Knowledge
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              Three challenges, three badges. Built for the HIMSS 2026 community &mdash;
              because learning FHIR, regulations, and AI agents should actually be fun.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/games/healthio', label: 'FHIR Quiz', title: 'FHIR IQ Badge Challenge', desc: 'Test your knowledge of FHIR R4, US Core, CQL, and quality measures. Earn Bronze, Silver, or Gold.', labelClass: 'text-[#F59E0B]', icon: '🏆' },
              { href: '/games/hti6-builder', label: 'Regulation', title: 'HTI-6 Builder', desc: 'Master the regulatory stack from HTI-1 through HTI-6. Earn your Policy Architect badge.', labelClass: 'text-[#10B981]', icon: '🏛️' },
              { href: '/games/ai-agent', label: 'AI Agents', title: 'AI Agent for Health', desc: 'Deploy AI agents against real clinical scenarios — prior auth, quality gaps, guardrails, and more.', labelClass: 'text-[#8B5CF6]', icon: '🤖' },
            ].map((game, i) => (
              <Link key={i} href={game.href} className="group bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{game.icon}</span>
                  <span className={`text-xs font-medium tracking-widest uppercase ${game.labelClass}`}>{game.label}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{game.title}</h3>
                <p className="text-[#94A3B8] text-sm mb-4">{game.desc}</p>
                <div className="text-[#38BDF8] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Play now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Me */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(56,189,248,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="bg-gradient-to-br from-[#161B22] to-[#0D1117] rounded-2xl p-10 md:p-14 border border-[#38BDF8]/20">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">Advisory</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Work With Me
            </h2>
            <p className="text-lg text-[#94A3B8] font-light mb-8 leading-relaxed max-w-2xl">
              I advise healthcare organizations on FHIR implementation strategy,
              data architecture, quality measurement, and AI readiness.
              Whether you&apos;re starting your FHIR journey or optimizing an existing
              implementation, I can help you move faster and avoid common pitfalls.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                'FHIR implementation strategy',
                'Data architecture & pipelines',
                'Quality measure implementation',
                'SQL on FHIR adoption',
                'AI & LLM integration',
                'Team training & enablement',
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

            <a
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('advisory_cta_clicked', { button: 'book_call' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
            >
              Book a Call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA - Newsletter */}
      <section className="py-20 relative">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">Stay in the Loop</h2>
          <p className="text-[#94A3B8] mb-8">
            Join 450+ healthcare data professionals getting weekly insights on FHIR, AI, and quality measurement.
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
                Helping healthcare organizations navigate FHIR, AI, and quality measurement.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/evestel/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-[#64748B] hover:text-[#38BDF8] transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/fhiriq" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-[#64748B] hover:text-[#38BDF8] transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Content</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/podcast" className="hover:text-[#38BDF8] transition">Podcast</Link></li>
                <li><Link href="/blog" className="hover:text-[#38BDF8] transition">Newsletter</Link></li>
                <li><Link href="/resources" className="hover:text-[#38BDF8] transition">Guides & Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Tools</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/library" className="hover:text-[#38BDF8] transition">ViewDefinition Library</Link></li>
                <li><Link href="/tools" className="hover:text-[#38BDF8] transition">The Lab</Link></li>
                <li><Link href="/cql-to-sql" className="hover:text-[#38BDF8] transition">CQL-to-SQL</Link></li>
                <li><a href="https://healthclaw.io" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition">HealthClaw</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Fun &amp; Games</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/games/healthio" className="hover:text-[#38BDF8] transition">FHIR IQ Badge Challenge</Link></li>
                <li><Link href="/games/hti6-builder" className="hover:text-[#38BDF8] transition">HTI-6 Builder</Link></li>
                <li><Link href="/games/ai-agent" className="hover:text-[#38BDF8] transition">AI Agent for Health</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm tracking-wider uppercase">Connect</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                <li><Link href="/about" className="hover:text-[#38BDF8] transition">About Eugene</Link></li>
                <li><Link href="/contact" className="hover:text-[#38BDF8] transition">Contact</Link></li>
                <li><a href="https://calendar.app.google/TMvRGiiYfbBKNd889" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition">Book a Call</a></li>
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
