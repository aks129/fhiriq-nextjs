import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FHIR IQ Badge Challenge | Test Your FHIR Knowledge at HIMSS 2026',
  description:
    'How well do you know FHIR? Take the 10-question challenge, earn your Bronze, Silver, or Gold badge, and share it on LinkedIn. Built by FHIR IQ for HIMSS 2026 in Las Vegas.',
  openGraph: {
    title: 'FHIR IQ Badge Challenge | HIMSS 2026',
    description:
      'Test your FHIR knowledge in 10 questions. Earn a badge. Share it on LinkedIn.',
    url: 'https://fhiriq.com/games/healthio',
  },
};

export default function HealthIOPage() {
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
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Podcast
              </Link>
              <Link href="/blog" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Newsletter
              </Link>
              <Link href="/tools" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Lab
              </Link>
              <Link href="/about" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                About
              </Link>
              <a
                href="https://healthio-kappa.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22] border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            HIMSS 2026 &middot; Las Vegas
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            FHIR IQ <span className="text-[#F59E0B]">Badge</span><br />
            Challenge
          </h1>

          <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            How well do you know FHIR? Take the 10-question challenge,
            earn your badge, and share it with the world.
          </p>

          {/* Badge Tiers */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F949;</div>
              <p className="text-[#CD7F32] font-medium text-sm">Bronze</p>
              <p className="text-[#64748B] text-xs">50%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F948;</div>
              <p className="text-[#C0C0C0] font-medium text-sm">Silver</p>
              <p className="text-[#64748B] text-xs">70%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F3C6;</div>
              <p className="text-[#F59E0B] font-medium text-sm">Gold</p>
              <p className="text-[#64748B] text-xs">90%+</p>
            </div>
          </div>

          <a
            href="https://healthio-kappa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all inline-flex items-center justify-center gap-3"
          >
            Start the Challenge
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
          <span className="text-xs tracking-widest uppercase">Learn more</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#F59E0B] to-transparent" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] text-sm font-medium tracking-widest uppercase mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Three Steps to Your Badge
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Your Name',
                desc: 'Type in your name so we can personalize your badge when you earn it.',
                color: '#38BDF8',
              },
              {
                step: '02',
                title: 'Answer 10 Questions',
                desc: 'Test your knowledge of FHIR resources, operations, profiles, and interoperability.',
                color: '#F59E0B',
              },
              {
                step: '03',
                title: 'Earn & Share',
                desc: 'Get your Bronze, Silver, or Gold badge and share it on LinkedIn or via text.',
                color: '#10B981',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] rounded-2xl p-8 border border-[#38BDF8]/10 hover:border-[#38BDF8]/20 transition-all text-center">
                <div className="text-5xl font-light mb-4" style={{ color: item.color }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Play Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(245,158,11,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#F59E0B] text-sm font-medium tracking-widest uppercase mb-4 block">Built for HIMSS</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                The quickest way to<br />
                <span className="text-[#F59E0B]">flex your FHIR knowledge</span>
              </h2>
              <p className="text-lg text-[#94A3B8] font-light mb-8 leading-relaxed">
                Whether you&apos;re at the HIMSS 2026 booth or playing from
                home, the Badge Challenge is a fast, fun way to test what you
                know about healthcare interoperability. Share your results on
                LinkedIn and see how you stack up.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'AI-powered question generation',
                  'Covers FHIR R4, US Core, CQL, and more',
                  'Instant badge with shareable link',
                  'Works on mobile and desktop',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#CBD5E1]">
                    <div className="w-5 h-5 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://healthio-kappa.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
              >
                Take the Challenge
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Preview Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/20 via-transparent to-[#EF4444]/20 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-[#0D1117] rounded-2xl border border-[#F59E0B]/20 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-[#F59E0B]/10">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="ml-3 text-xs text-[#64748B] font-mono">healthio-kappa.vercel.app</span>
                </div>
                <div className="p-8 text-center space-y-6">
                  <div className="text-6xl">&#x1F3C6;</div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">FHIR IQ Badge</h3>
                    <p className="text-[#64748B]">10 Questions &middot; 3 Badge Tiers</p>
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 bg-[#161B22] rounded-lg border border-[#38BDF8]/10 flex items-center px-4">
                      <span className="text-[#64748B] text-sm">Enter your name...</span>
                    </div>
                    <div className="h-12 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">Start Challenge</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 pt-2">
                    <div className="text-center">
                      <div className="text-2xl">&#x1F949;</div>
                      <p className="text-xs text-[#64748B] mt-1">50%+</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">&#x1F948;</div>
                      <p className="text-xs text-[#64748B] mt-1">70%+</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">&#x1F3C6;</div>
                      <p className="text-xs text-[#64748B] mt-1">90%+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More HIMSS 2026 Games */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#64748B] text-sm uppercase tracking-widest mb-6 text-center">More HIMSS 2026 Games</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/games/hti6-builder" className="group bg-[#161B22] rounded-xl p-6 border border-[#10B981]/20 hover:border-[#10B981]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#x1F3D7;</span>
                <h3 className="text-white font-medium">HTI-6 Regulation Builder</h3>
              </div>
              <p className="text-[#94A3B8] text-sm">Build the regulatory stack from HTI-1 to HTI-6. Earn your compliance badge.</p>
            </Link>
            <Link href="/games/ai-agent" className="group bg-[#161B22] rounded-xl p-6 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#x1F916;</span>
                <h3 className="text-white font-medium">AI Agent for Health</h3>
              </div>
              <p className="text-[#94A3B8] text-sm">Deploy AI agents to solve healthcare scenarios. Earn your agent badge.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#38BDF8]/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center">
                <span className="text-[#0A0A0F] font-bold text-sm">FQ</span>
              </div>
              <span className="text-lg font-semibold text-white">FHIR IQ</span>
            </div>
            <p className="text-[#64748B] text-sm">
              &copy; 2025 FHIR IQ. FHIR&reg; is a registered trademark of HL7&reg;.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
