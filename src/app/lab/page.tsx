'use client';

import Link from 'next/link';

type Tool = {
  href: string;
  title: string;
  desc: string;
  badge?: string;
  external?: boolean;
};

const tools: Tool[] = [
  { href: '/library', title: 'ViewDefinition Library', desc: 'Pre-built SQL on FHIR ViewDefinitions for US Core 7.0. Copy-paste ready.', badge: 'Ready to use' },
  { href: '/fhirsquire', title: 'FHIRSquire', desc: 'AI-powered FHIR profile advisor. Ask questions, get instant guidance.' },
  { href: 'https://fhirspective.vercel.app', title: 'FHIRspective', desc: 'Analyze and validate FHIR resources for data quality issues.', external: true },
  { href: 'https://agent-inter-op.vercel.app', title: 'FHIR Data Mapper', desc: 'AI-assisted data mapping with a visual editor.', external: true },
  { href: 'https://s77.vercel.app', title: 'CQL Builder', desc: 'Generate CQL from natural language. Early experiment.', badge: 'Experiment', external: true },
];

export default function Lab() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Navigation — matches homepage */}
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
              <Link href="/podcast" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">Podcast</Link>
              <Link href="/blog" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">Newsletter</Link>
              <Link href="/lab" className="text-[#38BDF8] text-sm font-medium tracking-wide">Lab</Link>
              <Link href="/resources" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">Resources</Link>
              <Link href="/about" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm font-medium tracking-wide transition">About</Link>
              <a
                href="https://evestel.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Lab section */}
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-[#38BDF8] text-sm font-medium tracking-widest uppercase mb-4 block">The Lab</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Experiments &amp; Ideas
            </h1>
            <p className="text-lg text-[#94A3B8] font-light max-w-2xl mx-auto">
              Open source tools for the FHIR community. Some are production-ready,
              some are experiments. All are free to use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
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
              href="https://github.com/aks129"
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

          <div className="text-center mt-16">
            <Link href="/" className="text-[#94A3B8] hover:text-[#38BDF8] text-sm transition">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#38BDF8]/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#64748B] text-sm">© 2026 FHIR IQ. All rights reserved.</p>
            <p className="text-[#475569] text-xs">FHIR® is a registered trademark of HL7® and is used with permission.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
