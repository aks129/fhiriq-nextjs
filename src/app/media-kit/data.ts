// Out of the FHIR — Media Kit / Reach Report data
// Sources: LinkedIn analytics, Apple Podcasts Connect, Spotify for Podcasters, Substack.
// Period: May 2025 – May 2026 (trailing 365 days). Refresh quarterly.

export type ColorKey = "teal" | "purple" | "coral" | "amber" | "blue" | "green" | "dim";

export const meta = {
  brandName: "Out of the FHIR — Media Kit",
  subtitle: "HEALTHCARE INTEROPERABILITY ECOSYSTEM · TRAILING 365D",
  ownerName: "Eugene Vestel",
  ownerEmail: "gene@fhiriq.com",
  ownerSite: "fhiriq.com",
  periodLabel: "Trailing 365d · May 2025 – May 2026",
  sourcesLine: "Sources: LinkedIn, Apple Podcasts, Spotify, Substack · May 2025 – May 2026",
  verifiedSources: "LinkedIn + Apple + Spotify + Substack · verified",
  pendingSources: "YouTube + GitHub · pending",
};

export type Stat = {
  value: string;
  label: string;
  colorKey: ColorKey;
  sub?: string;
  growth?: string;
};

export const heroStats: Stat[] = [
  { value: "313k", label: "LinkedIn impressions / yr", colorKey: "teal", growth: "+132.7%", sub: "Personal + page + group" },
  { value: "5,843", label: "Owned audience", colorKey: "purple", sub: "3.7k LinkedIn + 777 group + 554 Substack" },
  { value: "68.8%", label: "Senior+ on LinkedIn", colorKey: "amber", sub: "Senior, Director, CXO, VP" },
  { value: "48.2%", label: "Substack open rate", colorKey: "blue", sub: "Industry avg ~35%" },
];

export type Platform = {
  name: string;
  metric: string;
  sub: string;
  growth: string;
  colorKey: ColorKey;
  detail: string;
  verified: boolean;
};

export const platforms: Platform[] = [
  { name: "LinkedIn personal", metric: "3,761", sub: "followers", growth: "+41.3% YoY", colorKey: "blue", detail: "210,934 impressions · +132.7% YoY", verified: true },
  { name: "FHIR Goats group", metric: "777", sub: "members", growth: "84k post views", colorKey: "purple", detail: "78 posts · 1,077 avg views/post", verified: true },
  { name: "FHIR IQ Playbook (Substack)", metric: "554", sub: "subscribers", growth: "48.2% open rate", colorKey: "amber", detail: "72 posts · 29.7k views · $736 ARR", verified: true },
  { name: "Podcast — Apple", metric: "1,620", sub: "all-time plays", growth: "63% follow rate", colorKey: "coral", detail: "26 eps · 131 listeners · 157 hrs", verified: true },
  { name: "Podcast — Spotify", metric: "874", sub: "all-time plays", growth: "64 followers", colorKey: "coral", detail: "27 eps · 159 hrs · 602 streams", verified: true },
  { name: "Out of the FHIR (LinkedIn page)", metric: "401", sub: "new followers (365d)", growth: "7.4% eng rate", colorKey: "coral", detail: "77 posts · 18.8k impressions", verified: true },
  { name: "YouTube + GitHub + sites", metric: "TBD", sub: "Pending data", growth: "Pending", colorKey: "green", detail: "YouTube Studio export + GitHub", verified: false },
];

export type Bar = { role: string; pct: number; colorKey: ColorKey };

export const audienceSeniority: Bar[] = [
  { role: "Senior", pct: 34.4, colorKey: "teal" },
  { role: "Director", pct: 14.2, colorKey: "purple" },
  { role: "CXO", pct: 12.2, colorKey: "coral" },
  { role: "Entry", pct: 11.2, colorKey: "amber" },
  { role: "VP", pct: 8.0, colorKey: "blue" },
  { role: "Other", pct: 20.0, colorKey: "dim" },
];

export const audienceIndustry: Bar[] = [
  { role: "Hospitals & Health Care", pct: 28.7, colorKey: "teal" },
  { role: "IT Services & Consulting", pct: 18.6, colorKey: "purple" },
  { role: "Software Development", pct: 9.1, colorKey: "blue" },
  { role: "Tech, Info, Internet", pct: 5.2, colorKey: "amber" },
  { role: "Other", pct: 38.4, colorKey: "dim" },
];

export const companySize: Bar[] = [
  { role: "10,001+ employees", pct: 21.6, colorKey: "teal" },
  { role: "11–50", pct: 13.0, colorKey: "purple" },
  { role: "51–200", pct: 11.9, colorKey: "coral" },
  { role: "1–10", pct: 11.8, colorKey: "amber" },
  { role: "1,001–5,000", pct: 11.0, colorKey: "blue" },
  { role: "Other", pct: 30.7, colorKey: "dim" },
];

export const substackStats: Stat[] = [
  { value: "554", label: "Subscribers", colorKey: "teal", sub: "543 free · 10 paid · 1 comp" },
  { value: "48.2%", label: "Avg open rate", colorKey: "purple", sub: "72 posts published" },
  { value: "29.7k", label: "All-time views", colorKey: "coral", sub: "2–3.5k / month" },
  { value: "$736", label: "ARR", colorKey: "amber", sub: "Validates paid willingness" },
];

export const substackTopPosts = [
  { title: "openclaw meets healthcare", views: 2336, openRate: 46.4, eng: 15.1, date: "Feb 2026" },
  { title: "Introducing Agent Interop", views: 1158, openRate: 52.8, eng: 11.7, date: "Sep 2025" },
  { title: "What Happens When a Patient Has More Processing Power Than a Provider", views: 871, openRate: 42.6, eng: 12.6, date: "Mar 2026" },
  { title: "Claude Healthcare quick impressions", views: 727, openRate: 49.7, eng: 19.4, date: "Jan 2026" },
  { title: "MCP Apps and the Healthcare Ecosystem That's About to Explode", views: 637, openRate: 48.5, eng: 19.1, date: "Feb 2026" },
];

export const substackGrowthSources = [
  { source: "Direct", visitors: 2731, subs: 64, colorKey: "teal" as ColorKey },
  { source: "Substack network", visitors: 1454, subs: 119, colorKey: "purple" as ColorKey },
  { source: "Direct to App", visitors: 1102, subs: 44, colorKey: "amber" as ColorKey },
  { source: "LinkedIn", visitors: 983, subs: 66, colorKey: "blue" as ColorKey },
  { source: "Google", visitors: 585, subs: 20, colorKey: "coral" as ColorKey },
];

export const substackCountriesLine = "US 396 · India 34 · Canada 21 · AU 13 · UK 11";

export const podcastStats: Stat[] = [
  { value: "2,494", label: "Total plays (Apple + Spotify)", colorKey: "teal", sub: "27 episodes · ~93 plays/ep" },
  { value: "316h", label: "Total listening", colorKey: "purple", sub: "157 Apple + 159 Spotify" },
  { value: "63%", label: "Apple follow rate", colorKey: "coral", sub: "Industry avg ~30–40%" },
  { value: "91+64", label: "Engaged + Spotify follows", colorKey: "amber", sub: "Loyal core" },
];

export const podcastGeo = [
  { city: "New York City", listeners: 15, colorKey: "teal" as ColorKey },
  { city: "Chicago", listeners: 6, colorKey: "purple" as ColorKey },
  { city: "Seattle", listeners: 6, colorKey: "blue" as ColorKey },
  { city: "Boston", listeners: 5, colorKey: "coral" as ColorKey },
  { city: "Pittsburgh", listeners: 5, colorKey: "amber" as ColorKey },
];

export const podcastTopEpisodes = [
  { num: "E1", title: "Grahame Grieve — Creator of FHIR", apple: 127, spotify: 49, total: 176, date: "Jun 2025" },
  { num: "E19", title: "Aaron Neiderhiser + Phil Ballentine", apple: 125, spotify: "—", total: 125, date: "Dec 2025" },
  { num: "E3", title: "Cody Ebberson (Medplum)", apple: 98, spotify: 33, total: 131, date: "Jun 2025" },
  { num: "E15", title: "Stop Building for Interoperability", apple: 93, spotify: 23, total: 116, date: "Oct 2025" },
  { num: "E2", title: "Darren Devitt", apple: 92, spotify: 58, total: 150, date: "Jun 2025" },
  { num: "E8", title: "Ron Urwongse — Provider Directory", apple: 87, spotify: 27, total: 114, date: "Aug 2025" },
];

export const notableGuests = [
  { name: "Grahame Grieve", credential: "Creator of FHIR", colorKey: "teal" as ColorKey },
  { name: "Mark Scrimshire", credential: "CMS Blue Button architect", colorKey: "purple" as ColorKey },
  { name: "Brendan Keeler", credential: "Particle Health / Health API Guy", colorKey: "coral" as ColorKey },
  { name: "Pooja Babbrah", credential: "Point-of-Care Partners", colorKey: "amber" as ColorKey },
  { name: "Jill DeGraff", credential: "1upHealth / SMART Health IT", colorKey: "blue" as ColorKey },
  { name: "Cody Ebberson", credential: "Medplum CTO", colorKey: "teal" as ColorKey },
  { name: "Ron Urwongse", credential: "Defacto Health (Provider Directory)", colorKey: "purple" as ColorKey },
  { name: "Ewout Kramer + Ward Weistra", credential: "Firely", colorKey: "coral" as ColorKey },
  { name: "Chad Sanderson + Mark Freeman", credential: "Gable.ai", colorKey: "blue" as ColorKey },
  { name: "Kerry Weinberg", credential: "PhenoML", colorKey: "amber" as ColorKey },
];

export const sponsorInventory = [
  { tier: "Anchor sponsor — Annual State-of-FHIR Report", price: "$25–40k", note: "Logo, named insight section, co-marketed across 313k LinkedIn impressions + 554 Substack subscribers (48% open rate). 1 slot.", colorKey: "teal" as ColorKey, scarce: true, priority: 1 },
  { tier: "Executive Roundtable title sponsor", price: "$15–25k", note: "Curated 12–15 decision-makers drawn from podcast guest network + FHIR Goats group. Branded recap distributed to full ecosystem. Quarterly.", colorKey: "purple" as ColorKey, scarce: true, priority: 2 },
  { tier: "Co-sponsor — Annual Report", price: "$8–12k", note: "Logo + section. 3 slots available.", colorKey: "teal" as ColorKey, scarce: false, priority: 3 },
  { tier: "Substack sponsored issue", price: "$2–4k", note: "Long-form case study. 48.2% avg open rate. Posts have hit 2,336 views. Top funnel for paid + LinkedIn syndication.", colorKey: "amber" as ColorKey, scarce: false, priority: 4 },
  { tier: "Podcast presenting sponsor (4 episodes)", price: "$1–2k / month", note: "Host-read pre + mid-roll. ~90 plays/ep across Apple + Spotify, concentrated in NYC/Boston/Chicago/Pittsburgh. Value is association with the guest bench.", colorKey: "coral" as ColorKey, scarce: false, priority: 5 },
];

export const advisoryOffers = [
  { name: "Executive coaching — 1:1", who: "Healthcare AI founders, CTOs, product leaders", price: "$1.5–3k / month", format: "2× monthly + async" },
  { name: "Cohort advisory program", who: "PM + dev teams building on FHIR", price: "$3–5k / seat / quarter", format: "Office hours + private channel" },
  { name: "Fractional interop advisor", who: "Series A–B health tech", price: "$8–15k / month retainer", format: "Weekly + architecture review" },
  { name: "Custom workshop", who: "Provider IT / payer teams", price: "$10–25k / engagement", format: "On-site or remote, 1–3 days" },
];

export const coachingClientTypes = [
  { label: "Healthcare AI founders", desc: "Pre-seed through Series B", colorKey: "teal" as ColorKey },
  { label: "CTOs + heads of engineering", desc: "Health tech scale-ups", colorKey: "purple" as ColorKey },
  { label: "Product leaders", desc: "Building on FHIR or claims data", colorKey: "coral" as ColorKey },
  { label: "Payer + provider innovators", desc: "Internal AI / interop teams", colorKey: "amber" as ColorKey },
];

export const coachingProof = [
  { quote: "Shaped our entire FHIR + AI strategy in 90 days.", attribution: "VP Product, payer infrastructure co.", colorKey: "teal" as ColorKey, placeholder: true },
  { quote: "Best 1:1 healthcare technical advisor we found.", attribution: "Founder, health AI Series A", colorKey: "purple" as ColorKey, placeholder: true },
  { quote: "Helped us move from prototype to production faster than internal team alone.", attribution: "Engineering lead, digital health", colorKey: "coral" as ColorKey, placeholder: true },
];

export const authoritySignals = [
  { label: "DevDays 2026 speaker", colorKey: "teal" as ColorKey },
  { label: "FHIR IQ Playbook — 554 subs · 48% open rate", colorKey: "amber" as ColorKey },
  { label: "OSS maintainer — SmartHealthConnect + FHIR Guardrails + HealthClaw", colorKey: "purple" as ColorKey },
  { label: "Out of the FHIR — 27 episodes, FHIR ecosystem guest roster", colorKey: "coral" as ColorKey },
  { label: "FHIR Goats group founder (777 members)", colorKey: "blue" as ColorKey },
  { label: "Free Claude Code course (healthcare)", colorKey: "green" as ColorKey },
];

export const ownedAssets = [
  { name: "HealthClaw", desc: "Production agent platform for personal + family health records", colorKey: "teal" as ColorKey },
  { name: "FHIR Guardrails MCP", desc: "Open-source safety proxy for AI on FHIR", colorKey: "purple" as ColorKey },
  { name: "SmartHealthConnect", desc: "Patient-facing FHIR dashboard + MCP server", colorKey: "blue" as ColorKey },
  { name: "FHIR IQ Playbook", desc: "Substack newsletter — 554 subs, 48% open rate, 72 posts", colorKey: "amber" as ColorKey },
  { name: "Out of the FHIR", desc: "Podcast — 27 episodes, Apple + Spotify, FHIR community guests", colorKey: "coral" as ColorKey },
  { name: "FHIR Goats group", desc: "Private LinkedIn group — 777 members, 84k post views/yr", colorKey: "blue" as ColorKey },
  { name: "Claude Code for Healthcare", desc: "Free course + advisory program", colorKey: "green" as ColorKey },
];

export const tabs = [
  { id: "sponsor", label: "Sponsor view", sub: "Media kit + inventory" },
  { id: "advisory", label: "Advisory view", sub: "Thought leadership" },
  { id: "coaching", label: "Coaching view", sub: "Executive coaching" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

export const copy = {
  sponsorIntro:
    "You're not buying impressions — you're buying access to a difficult-to-reach healthcare interoperability ecosystem. 313k LinkedIn impressions/yr at 68.8% senior+, a 554-subscriber long-form publication at 48% open rate, and a podcast guest roster featuring the FHIR community's leadership cohort. Targeted influence at decision-maker depth.",
  advisoryIntro:
    "Independent healthcare interoperability media + builder ecosystem. Thought leadership distributed across 313k annual LinkedIn impressions, a 554-subscriber long-form newsletter at 48% open rate, a 777-member private group, a 27-episode podcast with the FHIR community's leadership cohort, and an active open-source surface.",
  coachingIntro:
    "Executive coaching for healthcare AI founders, CTOs, and product leaders navigating the move from prototype to production. Drawing on FHIR + AI + agent infrastructure experience and an active operator community of senior healthcare leaders.",
  podcastFraming:
    "Not a reach play. The value is the guest roster and the concentrated audience. ~90 plays per episode across platforms, all from US healthcare-interop hub cities. Sponsors buy association with the ecosystem's leading voices.",
  substackFraming:
    "Long-form healthcare interop publication. 48.2% open rate (above industry average), 15.4% engagement. The funnel: LinkedIn + Substack network → newsletter → paid + advisory.",
  guestFraming:
    "The actual sponsorship asset. This guest list is the FHIR + healthcare interop industry's leadership cohort.",
  whyThisWorks:
    "Healthcare AI is awash with bad experiences, unfinished processes, and broken handoffs. Most problems don't need new science — they need someone willing to prototype the thing, put it in front of the people doing the work, and iterate against reality. That's the gap, and it's the work. Coaching engagements compound the rest of the ecosystem: every operator I work with feeds back into the podcast, the Playbook, and the open-source tools.",
};

// Tailwind class tokens per color key — text, soft bg, border, solid bg, left-border accent
export const palette: Record<ColorKey, { text: string; bg: string; border: string; solid: string; leftBorder: string }> = {
  teal:   { text: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-200",     solid: "bg-sky-500",     leftBorder: "border-l-sky-400" },
  purple: { text: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200",  solid: "bg-violet-500",  leftBorder: "border-l-violet-400" },
  coral:  { text: "text-rose-600",    bg: "bg-rose-50",    border: "border-rose-200",    solid: "bg-rose-500",    leftBorder: "border-l-rose-400" },
  amber:  { text: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200",   solid: "bg-amber-500",   leftBorder: "border-l-amber-400" },
  blue:   { text: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",    solid: "bg-blue-500",    leftBorder: "border-l-blue-400" },
  green:  { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", solid: "bg-emerald-500", leftBorder: "border-l-emerald-400" },
  dim:    { text: "text-slate-500",   bg: "bg-slate-50",   border: "border-slate-200",   solid: "bg-slate-400",   leftBorder: "border-l-slate-400" },
};
