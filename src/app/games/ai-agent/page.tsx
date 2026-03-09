import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agent for Health | HIMSS 2026 Game by FHIR IQ',
  description:
    'Deploy AI agents to solve real healthcare scenarios. Choose the right tools, data sources, and workflows to earn your AI Agent badge. Built for HIMSS 2026.',
  openGraph: {
    title: 'AI Agent for Health | HIMSS 2026',
    description:
      'Deploy AI agents to solve healthcare challenges. Earn your badge. Share on LinkedIn.',
    url: 'https://fhiriq.com/games/ai-agent',
  },
};

export default function AIAgentPage() {
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
              <Link href="/games/hti6-builder" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                HTI-6 Builder
              </Link>
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">
                Podcast
              </Link>
              <a
                href="https://healthio-kappa.vercel.app/ai-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#38BDF8]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161B22] border border-[#8B5CF6]/30 text-[#8B5CF6] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            HIMSS 2026 &middot; Las Vegas
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
            AI Agent <span className="text-[#8B5CF6]">for</span><br />
            <span className="text-[#8B5CF6]">Health</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            You&apos;re the AI architect. Deploy agents to solve real healthcare
            scenarios &mdash; choose the right models, data sources, guardrails,
            and workflows to succeed.
          </p>

          {/* Badge Tiers */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F949;</div>
              <p className="text-[#CD7F32] font-medium text-sm">Apprentice</p>
              <p className="text-[#64748B] text-xs">50%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F948;</div>
              <p className="text-[#C0C0C0] font-medium text-sm">Operator</p>
              <p className="text-[#64748B] text-xs">70%+</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">&#x1F3C6;</div>
              <p className="text-[#F59E0B] font-medium text-sm">Architect</p>
              <p className="text-[#64748B] text-xs">90%+</p>
            </div>
          </div>

          <a
            href="https://healthio-kappa.vercel.app/ai-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all inline-flex items-center justify-center gap-3"
          >
            Deploy Your Agent
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
          <span className="text-xs tracking-widest uppercase">Learn more</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#8B5CF6] to-transparent" />
        </div>
      </section>

      {/* Scenario Types */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-4 block">Scenarios</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Real Healthcare Challenges
            </h2>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              Each scenario presents a real-world healthcare problem. Pick the
              right AI approach to solve it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '&#x1F3E5;', title: 'Clinical Decision Support', desc: 'Deploy agents that surface relevant clinical guidelines at the point of care', color: '#EF4444' },
              { icon: '&#x1F4CB;', title: 'Prior Authorization', desc: 'Automate PA workflows while maintaining compliance and audit trails', color: '#F59E0B' },
              { icon: '&#x1F50D;', title: 'Quality Measure Gaps', desc: 'Identify care gaps and recommend interventions using HEDIS logic', color: '#10B981' },
              { icon: '&#x1F4C4;', title: 'Clinical Summarization', desc: 'Summarize patient records for transitions of care and referrals', color: '#38BDF8' },
              { icon: '&#x1F512;', title: 'PHI & Guardrails', desc: 'Configure safety layers to prevent PHI leakage and hallucination', color: '#8B5CF6' },
              { icon: '&#x1F4CA;', title: 'Population Health', desc: 'Analyze cohorts and risk-stratify populations from FHIR data', color: '#FB923C' },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] rounded-xl p-6 border border-[#38BDF8]/10 hover:border-[#8B5CF6]/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <h3 className="text-white font-medium">{item.title}</h3>
                </div>
                <p className="text-[#94A3B8] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(139,92,246,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Think Like an AI Architect
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Read the Scenario', desc: 'A real healthcare organization needs an AI solution. Understand the constraints, data, and goals.', color: '#38BDF8' },
              { step: '02', title: 'Configure Your Agent', desc: 'Choose the model, data sources, FHIR APIs, guardrails, and workflow design that fits.', color: '#8B5CF6' },
              { step: '03', title: 'Earn Your Badge', desc: 'Get scored on accuracy, safety, and efficiency. Share your Apprentice, Operator, or Architect badge.', color: '#10B981' },
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] rounded-2xl p-8 border border-[#38BDF8]/10 hover:border-[#8B5CF6]/20 transition-all text-center">
                <div className="text-5xl font-light mb-4" style={{ color: item.color }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://healthio-kappa.vercel.app/ai-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
            >
              Start Playing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
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
            <Link href="/games/hti6-builder" className="group bg-[#161B22] rounded-xl p-6 border border-[#10B981]/20 hover:border-[#10B981]/40 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#x1F3D7;</span>
                <h3 className="text-white font-medium">HTI-6 Regulation Builder</h3>
              </div>
              <p className="text-[#94A3B8] text-sm">Build the regulatory stack from HTI-1 to HTI-6. Earn your compliance badge.</p>
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
