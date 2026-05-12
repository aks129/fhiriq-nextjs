'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  meta,
  heroStats,
  platforms,
  audienceSeniority,
  audienceIndustry,
  companySize,
  substackStats,
  substackTopPosts,
  substackGrowthSources,
  substackCountriesLine,
  podcastStats,
  podcastGeo,
  podcastTopEpisodes,
  notableGuests,
  sponsorInventory,
  advisoryOffers,
  coachingClientTypes,
  coachingProof,
  authoritySignals,
  ownedAssets,
  tabs,
  copy,
  palette,
  type Bar,
  type Stat,
  type TabId,
} from './data';

// ============================================================
// Primitives
// ============================================================

function Pill({ children, colorKey, size = 'md' }: { children: ReactNode; colorKey: keyof typeof palette; size?: 'sm' | 'md' }) {
  const p = palette[colorKey];
  return (
    <span
      className={`inline-flex items-center font-mono font-medium tracking-wide rounded ${p.bg} ${p.text} ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'}`}
    >
      {children}
    </span>
  );
}

function BigStat({ value, label, colorKey, sub, growth }: Stat) {
  const p = palette[colorKey];
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2 flex-wrap">
        <div className={`text-3xl font-mono font-semibold leading-none tracking-tight ${p.text}`}>{value}</div>
        {growth && <span className="text-xs font-mono font-semibold text-emerald-600">{growth}</span>}
      </div>
      <div className="text-xs text-slate-600">{label}</div>
      {sub && <div className="text-[10px] font-mono text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function StackedBar({ data }: { data: Bar[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex w-full h-2.5 rounded overflow-hidden bg-slate-100">
        {data.map((d, i) => (
          <div key={i} className={palette[d.colorKey].solid} style={{ width: `${d.pct}%` }} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-sm ${palette[d.colorKey].solid}`} />
              <span className="text-slate-700">{d.role}</span>
            </div>
            <span className="text-slate-500 font-mono">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ children, colorKey }: { children: ReactNode; colorKey: keyof typeof palette }) {
  return (
    <div className={`text-[11px] font-mono uppercase tracking-widest ${palette[colorKey].text}`}>
      ◆ {children}
    </div>
  );
}

function Card({ children, accent }: { children: ReactNode; accent?: keyof typeof palette }) {
  return (
    <div
      className={`bg-white rounded-xl border ${accent ? palette[accent].border : 'border-slate-200'} px-5 py-4 shadow-sm`}
    >
      {children}
    </div>
  );
}

// ============================================================
// Composite cards
// ============================================================

function HeroReach() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-6 py-5 shadow-sm">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <SectionHeader colorKey="teal">Aggregated ecosystem reach</SectionHeader>
        <div className="text-[10px] font-mono text-slate-400">{meta.periodLabel}</div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5">
        {heroStats.map((s, i) => (
          <BigStat key={i} {...s} />
        ))}
      </div>
    </div>
  );
}

function SubstackCard() {
  return (
    <Card accent="amber">
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <SectionHeader colorKey="amber">FHIR IQ Playbook — Substack</SectionHeader>
        <Pill colorKey="amber" size="sm">PREMIUM NEWSLETTER</Pill>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-3.5">{copy.substackFraming}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-3.5 mb-4">
        {substackStats.map((s, i) => (
          <BigStat key={i} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Top posts</div>
          <div className="flex flex-col gap-1.5">
            {substackTopPosts.slice(0, 5).map((p, i) => (
              <div key={i} className="px-2.5 py-2 rounded-md bg-slate-50">
                <div className="text-xs text-slate-800 leading-snug">{p.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {p.views.toLocaleString()} views · {p.openRate}% open · {p.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Subscriber sources (lifetime)</div>
          <div className="flex flex-col gap-1.5">
            {substackGrowthSources.map((s) => (
              <div key={s.source} className="flex justify-between items-center px-2.5 py-1.5 rounded-md bg-slate-50">
                <span className="text-xs text-slate-800">{s.source}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] font-mono text-slate-400">{s.visitors.toLocaleString()} vis</span>
                  <span className={`text-[11px] font-mono font-semibold ${palette[s.colorKey].text}`}>+{s.subs}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2.5 text-[10px] font-mono text-slate-400">Top countries: {substackCountriesLine}</div>
        </div>
      </div>
    </Card>
  );
}

function PodcastTruthCard() {
  return (
    <Card accent="coral">
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <SectionHeader colorKey="coral">Out of the FHIR podcast — Apple + Spotify combined</SectionHeader>
        <Pill colorKey="coral" size="sm">CREDIBILITY ASSET</Pill>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-3.5">{copy.podcastFraming}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-3.5 mb-4">
        {podcastStats.map((s, i) => (
          <BigStat key={i} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Top listener cities (Apple)</div>
          <div className="flex flex-col gap-1.5">
            {podcastGeo.map((g) => (
              <div key={g.city} className="flex items-center gap-2.5">
                <span className="text-[11px] text-slate-800 min-w-[90px]">{g.city}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${palette[g.colorKey].solid}`} style={{ width: `${(g.listeners / 15) * 100}%` }} />
                </div>
                <span className="text-[11px] font-mono text-slate-500 min-w-[24px] text-right">{g.listeners}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Top episodes (combined plays)</div>
          <div className="flex flex-col gap-1.5">
            {podcastTopEpisodes.slice(0, 5).map((e, i) => (
              <div key={i} className="flex justify-between items-center px-2.5 py-1.5 rounded-md bg-slate-50">
                <span className="text-[11px] text-slate-800 flex-1 mr-2">
                  {e.num} · {e.title}
                </span>
                <span className="text-[11px] font-mono font-semibold text-rose-600">{e.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3.5 px-3 py-2.5 rounded-lg bg-rose-50 text-xs text-rose-700 leading-relaxed">
        Every listener city is a US healthcare interop hub. Zero off-target waste.
      </div>
    </Card>
  );
}

function GuestRosterCard() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-1.5 flex-wrap gap-2">
        <SectionHeader colorKey="purple">Guest roster — the ecosystem bench</SectionHeader>
        <Pill colorKey="purple" size="sm">SPONSOR DRAW</Pill>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-3.5">{copy.guestFraming}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
        {notableGuests.map((g) => (
          <div
            key={g.name}
            className={`px-3 py-2.5 rounded-md bg-slate-50 border-l-2 ${palette[g.colorKey].leftBorder}`}
          >
            <div className="text-xs font-semibold text-slate-800">{g.name}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{g.credential}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PlatformGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5">
      {platforms.map((p) => (
        <div
          key={p.name}
          className={`bg-white rounded-lg border px-4 py-3.5 shadow-sm ${p.verified ? 'border-slate-200' : 'border-amber-200 opacity-70'}`}
        >
          <div className="flex justify-between items-start mb-2 gap-1.5">
            <span className="text-xs text-slate-600 font-medium">{p.name}</span>
            <Pill colorKey={p.colorKey} size="sm">{p.growth}</Pill>
          </div>
          <div className={`text-2xl font-mono font-semibold leading-none ${palette[p.colorKey].text}`}>{p.metric}</div>
          <div className="text-[11px] text-slate-400 mt-1">{p.sub}</div>
          <div className="text-[11px] text-slate-600 mt-1.5 pt-1.5 border-t border-slate-100">{p.detail}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Views
// ============================================================

function SponsorView() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-600 leading-relaxed px-0.5">{copy.sponsorIntro}</p>

      <HeroReach />
      <SubstackCard />
      <GuestRosterCard />
      <PodcastTruthCard />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3">
        <Card>
          <SectionHeader colorKey="teal">Seniority (LinkedIn)</SectionHeader>
          <div className="mt-3.5"><StackedBar data={audienceSeniority} /></div>
        </Card>
        <Card>
          <SectionHeader colorKey="purple">Industry (LinkedIn)</SectionHeader>
          <div className="mt-3.5"><StackedBar data={audienceIndustry} /></div>
        </Card>
        <Card>
          <SectionHeader colorKey="amber">Company size (LinkedIn)</SectionHeader>
          <div className="mt-3.5"><StackedBar data={companySize} /></div>
        </Card>
      </div>

      <div>
        <div className="px-0.5 mb-2.5">
          <SectionHeader colorKey="amber">Platform breakdown</SectionHeader>
        </div>
        <PlatformGrid />
      </div>

      <Card>
        <div className="flex justify-between items-center mb-3.5 flex-wrap gap-2">
          <SectionHeader colorKey="teal">Rare-opportunity inventory — calibrated to actual asset</SectionHeader>
          <span className="text-[10px] font-mono text-slate-400">Ordered by revenue priority</span>
        </div>
        <div className="flex flex-col gap-2">
          {sponsorInventory.map((s, i) => (
            <div key={i} className="flex gap-3.5 px-4 py-3.5 rounded-lg bg-slate-50 items-start">
              <div className={`w-[3px] self-stretch rounded ${palette[s.colorKey].solid} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-slate-400">#{s.priority}</span>
                  <span className="text-[13px] font-semibold text-slate-800">{s.tier}</span>
                  {s.scarce && <Pill colorKey="coral" size="sm">SCARCE</Pill>}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.note}</p>
              </div>
              <div className={`text-[13px] font-mono font-semibold whitespace-nowrap ${palette[s.colorKey].text}`}>{s.price}</div>
            </div>
          ))}
        </div>
      </Card>

      <ContactCTA />
    </div>
  );
}

function AdvisoryView() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-600 leading-relaxed px-0.5">{copy.advisoryIntro}</p>

      <HeroReach />
      <SubstackCard />
      <GuestRosterCard />

      <Card>
        <SectionHeader colorKey="amber">Authority + credibility signals</SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5 mt-3.5">
          {authoritySignals.map((s, i) => (
            <div key={i} className="flex gap-2.5 px-3.5 py-3 rounded-lg bg-slate-50 items-center">
              <div className={`w-2 h-2 rounded-full ${palette[s.colorKey].solid} flex-shrink-0`} />
              <span className="text-xs text-slate-800 leading-snug">{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader colorKey="purple">Owned ecosystem assets</SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5 mt-3.5">
          {ownedAssets.map((a) => (
            <div key={a.name} className="px-4 py-3.5 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${palette[a.colorKey].solid}`} />
                <span className="text-[13px] font-semibold text-slate-800">{a.name}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <PodcastTruthCard />

      <div>
        <div className="px-0.5 mb-2.5">
          <SectionHeader colorKey="teal">Distribution surface</SectionHeader>
        </div>
        <PlatformGrid />
      </div>

      <ContactCTA />
    </div>
  );
}

function CoachingView() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-600 leading-relaxed px-0.5">{copy.coachingIntro}</p>

      <Card>
        <SectionHeader colorKey="purple">Who I work with</SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 mt-4">
          {coachingClientTypes.map((w) => (
            <div key={w.label} className={`px-4 py-3.5 rounded-lg bg-slate-50 border-l-2 ${palette[w.colorKey].border.replace('border-', 'border-l-')}`}>
              <div className="text-[13px] font-semibold text-slate-800">{w.label}</div>
              <div className="text-[11px] text-slate-600 mt-1">{w.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader colorKey="teal">Where coaching clients come from</SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 mt-3.5">
          <BigStat value="12.7%" label="Founder/CEO/Co-founder/President" colorKey="teal" sub="Of LinkedIn followers" />
          <BigStat value="34.4%" label="Director+CXO+VP" colorKey="purple" sub="Decision-maker reach" />
          <BigStat value="554" label="Newsletter subscribers" colorKey="amber" sub="48.2% open rate" />
        </div>
      </Card>

      <Card>
        <SectionHeader colorKey="coral">Engagement tiers</SectionHeader>
        <div className="flex flex-col gap-2 mt-3.5">
          {advisoryOffers.map((o, i) => (
            <div key={i} className="px-3.5 py-3 rounded-lg bg-slate-50">
              <div className="flex justify-between items-center gap-2.5 flex-wrap">
                <div className="text-[13px] font-semibold text-slate-800">{o.name}</div>
                <div className="text-[13px] font-mono font-semibold text-sky-600">{o.price}</div>
              </div>
              <div className="flex gap-3.5 mt-1 flex-wrap">
                <span className="text-xs text-slate-600">{o.who}</span>
                <span className="text-xs font-mono text-slate-400">· {o.format}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-3.5 flex-wrap gap-2">
          <SectionHeader colorKey="teal">Proof + testimonials</SectionHeader>
          <Pill colorKey="amber" size="sm">Awaiting real quotes</Pill>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5">
          {coachingProof.map((p, i) => (
            <div
              key={i}
              className={`px-4 py-4 rounded-lg bg-slate-50 border-l-2 ${palette[p.colorKey].border.replace('border-', 'border-l-')} ${p.placeholder ? 'opacity-70' : ''}`}
            >
              <p className="text-[13px] text-slate-800 leading-relaxed italic">&ldquo;{p.quote}&rdquo;</p>
              <div className="text-[11px] font-mono text-slate-400 mt-2">— {p.attribution}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader colorKey="amber">Why this works</SectionHeader>
        <p className="text-[13px] text-slate-700 leading-relaxed mt-3.5">{copy.whyThisWorks}</p>
      </Card>

      <ContactCTA />
    </div>
  );
}

function ContactCTA() {
  return (
    <div className="bg-gradient-to-r from-accent-purple via-primary-blue to-primary-navy rounded-xl px-6 py-7 text-white mt-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-lg font-semibold mb-1">Let&apos;s talk.</div>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            Sponsorship inquiries, advisory engagements, or a 20-minute intro — same inbox. I respond to every legitimate inquiry within 48 hours.
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <a
            href="mailto:gene@fhiriq.com"
            className="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            gene@fhiriq.com
          </a>
          <a
            href="https://calendar.app.google/TMvRGiiYfbBKNd889"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-white/40 text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Book a 20-min intro →
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function MediaKitPage() {
  const [activeTab, setActiveTab] = useState<TabId>('sponsor');

  const renderContent = () => {
    switch (activeTab) {
      case 'sponsor': return <SponsorView />;
      case 'advisory': return <AdvisoryView />;
      case 'coaching': return <CoachingView />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Site nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-primary-blue">
              FHIR IQ
            </Link>
            <div className="hidden md:flex space-x-7 text-sm">
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">Solutions</Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">Tools</Link>
              <Link href="/podcast" className="text-neutral-gray hover:text-primary-blue font-medium">Podcast</Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">Blog</Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">About</Link>
              <Link href="/contact" className="text-primary-blue font-semibold">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-accent-purple via-primary-blue to-primary-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
              <span className="mr-2">🎙️</span>
              Out of the FHIR
            </span>
            <span className="text-xs font-mono text-white/70 tracking-wide">{meta.subtitle}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl">
            Media kit & ecosystem reach report
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-3xl leading-relaxed mb-6">
            Reach the healthcare interoperability ecosystem at decision-maker depth — sponsorship, advisory, and coaching opportunities across podcast, newsletter, group, and an active open-source surface.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-100 border border-emerald-300/30">
              {meta.verifiedSources}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-100 border border-amber-300/30">
              {meta.pendingSources}
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1.5 inline-flex gap-1 overflow-x-auto max-w-full">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap text-left transition-colors ${
                activeTab === t.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="text-[13px] font-medium">{t.label}</div>
              <div className={`text-[10px] font-mono tracking-wide ${activeTab === t.id ? 'text-white/70' : 'text-slate-400'}`}>
                {t.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-3">
          <span className="text-xs text-slate-500">
            {meta.ownerName} · {meta.ownerSite} · <a href={`mailto:${meta.ownerEmail}`} className="hover:text-primary-blue">{meta.ownerEmail}</a>
          </span>
          <span className="text-xs font-mono text-slate-400">{meta.sourcesLine}</span>
        </div>
      </footer>
    </div>
  );
}
