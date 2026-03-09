import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTI-6 Regulation Builder | HIMSS 2026 Game by FHIR IQ',
  description:
    'Can you build the right regulatory framework? Drag, drop, and assemble HTI-1 through HTI-6 rules into the correct compliance stack. Earn your badge and share on LinkedIn.',
  openGraph: {
    title: 'HTI-6 Regulation Builder | HIMSS 2026',
    description:
      'Build the regulatory stack. Earn your compliance badge. Share it on LinkedIn.',
    url: 'https://fhiriq.com/games/hti6-builder',
  },
};

export default function HTI6BuilderPage() {
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
              <Link href="/games/healthio" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Badge Challenge
              </Link>
              <Link href="/games/ai-agent" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                AI Agent
              </Link>
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Podcast
              </Link>
              <a
                href="https://healthio-kappa.vercel.app/hti6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#38BDF8]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22] border border-[#10B981]/30 text-[#10B981] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            HIMSS 2026 &middot; Las Vegas
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            HTI-6 <span className="text-[#10B981]">Regulation</span><br />
            Builder
          </h1>

          <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            Can you build the right regulatory stack? Assemble HTI-1 through
            HTI-6 rules into the correct compliance framework and prove you
            know your ONC regulations.
          </p>

          {/* Badge Tiers */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F949;</div>
              <p className="text-[#CD7F32] font-medium text-sm">Compliant</p>
              <p className="text-[#64748B] text-xs">50%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F948;</div>
              <p className="text-[#C0C0C0] font-medium text-sm">Regulator</p>
              <p className="text-[#64748B] text-xs">70%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F3C6;</div>
              <p className="text-[#F59E0B] font-medium text-sm">Policy Architect</p>
              <p className="text-[#64748B] text-xs">90%+</p>
            </div>
          </div>

          <a
            href="https://healthio-kappa.vercel.app/hti6"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all inline-flex items-center justify-center gap-3"
          >
            Build the Stack
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
          <span className="text-xs tracking-widest uppercase">Learn more</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#10B981] to-transparent" />
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#10B981] text-sm font-medium tracking-widest uppercase mb-4 block">The Challenge</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Know Your Regulations
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              ONC&apos;s HTI rules are reshaping healthcare IT. Can you match each
              regulation to its requirements?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { rule: 'HTI-1', topic: 'Information Blocking', desc: 'Identify the 8 exceptions and enforcement provisions', color: '#38BDF8' },
              { rule: 'HTI-2', topic: 'TEFCA & QHINs', desc: 'Match network participation requirements and exchange purposes', color: '#8B5CF6' },
              { rule: 'HTI-3', topic: 'Prior Authorization', desc: 'Map payer-to-provider API requirements and timelines', color: '#F59E0B' },
              { rule: 'HTI-4', topic: 'Patient Access', desc: 'Connect patient rights to the correct API standards', color: '#EF4444' },
              { rule: 'HTI-5', topic: 'AI & Algorithms', desc: 'Categorize transparency and bias requirements for health AI', color: '#10B981' },
              { rule: 'HTI-6', topic: 'Interoperability', desc: 'Build the full compliance stack from FHIR to certification', color: '#FB923C' },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#38BDF8]/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 rounded text-xs font-mono font-bold" style={{ color: item.color, backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    {item.rule}
                  </span>
                  <h3 className="text-white font-medium">{item.topic}</h3>
                </div>
                <p className="text-[#94A3B8] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            HTI rules affect <span className="text-[#10B981]">every healthcare organization</span>
          </h2>
          <p className="text-lg text-[#94A3B8] font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            From information blocking enforcement to AI transparency requirements,
            these regulations are rewriting the rules of healthcare IT. Test whether
            your team is ready.
          </p>
          <a
            href="https://healthio-kappa.vercel.app/hti6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
          >
            Start Building
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Other Games */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#64748B] text-sm uppercase tracking-widest mb-6 text-center">More HIMSS 2026 Games</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/games/healthio" className="group bg-[#161B22] rounded-xl p-6 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#x1F3C6;</span>
                <h3 className="text-white font-medium">FHIR IQ Badge Challenge</h3>
              </div>
              <p className="text-[#94A3B8] text-sm">10-question FHIR quiz. Earn Bronze, Silver, or Gold.</p>
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
