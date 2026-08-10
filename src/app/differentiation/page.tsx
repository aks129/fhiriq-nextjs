'use client';

import Link from 'next/link';
import { useState } from 'react';

type CapabilityStatus = "full" | "partial" | "none";

interface Vendor {
  name: string;
  shortName: string;
}

interface Capability {
  name: string;
  description: string;
  example?: string;
  scores: Record<string, CapabilityStatus>;
}

const VENDORS: Vendor[] = [
  { name: "Open Quality", shortName: "OQ" },
  { name: "Innovaccer", shortName: "INN" },
  { name: "Arcadia", shortName: "ARC" },
  { name: "Health Catalyst", shortName: "HC" },
  { name: "Lightbeam", shortName: "LB" },
  { name: "Edifecs", shortName: "EDF" },
  { name: "Athena Pop Health", shortName: "ATH" },
  { name: "Raw LLMs", shortName: "LLM" }
];

const CAPABILITIES: Capability[] = [
  {
    name: "Understands CQL",
    description: "Can parse and interpret Clinical Quality Language (CQL) measure definitions natively.",
    example: "Parse CQL like 'define Numerator: exists [Observation: Mammography]' and evaluate it.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Understands FHIR logic",
    description: "Native support for FHIR resources, references, and data structures.",
    example: "Traverse Patient → Observation → code → coding → system/code relationships.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "partial",
      "Arcadia": "partial",
      "Health Catalyst": "partial",
      "Lightbeam": "none",
      "Edifecs": "partial",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Explains WHY a measure failed",
    description: "Provides human-readable explanations for why a patient did or did not meet measure criteria.",
    example: "'Patient failed because mammography was performed 28 months ago, exceeding the 27-month window.'",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Shows missing/incorrect data",
    description: "Identifies gaps in data feeds, incorrect mappings, or documentation issues.",
    example: "'No mammography observation found. Check if CPT 77067 is being captured from claims feed.'",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "partial",
      "Arcadia": "partial",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Root cause insights",
    description: "AI-driven analysis of why performance is dropping across populations.",
    example: "'15% drop in CMS125 numerator traced to missing radiology interface since March 2024.'",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Evidence-based explanations",
    description: "Links reasoning to clinical guidelines, measure specifications, and source data.",
    example: "'Per CMS125v12 specification section 4.2, mammography must occur within 27 months of period end.'",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Transparent rule logic",
    description: "Shows the exact logic path used to evaluate each patient against measure criteria.",
    example: "Visual trace: Initial Pop ✓ → Denominator ✓ → Exclusion ✗ → Numerator ✓ = PASS",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "SQL-on-FHIR native",
    description: "Built on SQL-on-FHIR standard for reproducible, portable analytics.",
    example: "Generate ViewDefinitions that work across Databricks, BigQuery, Snowflake.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Data quality scoring",
    description: "Automated scoring of data completeness, timeliness, and accuracy.",
    example: "Data quality score: 78%. Missing: 12% encounter types, 8% procedure codes.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "partial",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Agentic recommendations",
    description: "AI-generated, actionable next steps to close gaps or fix data issues.",
    example: "'Schedule mammography outreach for 234 patients. Priority: high-risk, last visit >6mo.'",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "partial"
    }
  },
  {
    name: "Real-time explainability",
    description: "Instant explanations as data changes, not batch-processed reports.",
    example: "See explanation update in real-time as new claims arrive.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Deployable in days",
    description: "Quick setup without months of implementation or custom development.",
    example: "Connect FHIR server, configure measures, see results in <1 week.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  },
  {
    name: "Interoperability-first DNA",
    description: "Built from ground up on FHIR, CQL, and healthcare standards.",
    example: "Native support for US Core, QI-Core, HEDIS value sets, NLM VSAC.",
    scores: {
      "Open Quality": "full",
      "Innovaccer": "none",
      "Arcadia": "none",
      "Health Catalyst": "none",
      "Lightbeam": "none",
      "Edifecs": "none",
      "Athena Pop Health": "none",
      "Raw LLMs": "none"
    }
  }
];

const StatusIcon = ({ status }: { status: CapabilityStatus }) => {
  switch (status) {
    case "full":
      return (
        <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
          <span className="text-fg font-bold">✓</span>
        </div>
      );
    case "partial":
      return (
        <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
          <span className="text-fg font-bold">⚠</span>
        </div>
      );
    case "none":
      return (
        <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
          <span className="text-fg-3 font-bold">✗</span>
        </div>
      );
  }
};

export default function Differentiation() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const toggleRow = (capName: string) => {
    setExpandedRow(expandedRow === capName ? null : capName);
  };

  const filteredVendors = selectedVendor
    ? VENDORS.filter(v => v.name === "Open Quality" || v.name === selectedVendor)
    : VENDORS;

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="bg-bg shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/lab" className="text-neutral-gray hover:text-primary-blue font-medium">
                Solutions
              </Link>
              <Link href="/architectures" className="text-neutral-gray hover:text-primary-blue font-medium">
                Architectures
              </Link>
              <Link href="/lab" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/resources" className="text-neutral-gray hover:text-primary-blue font-medium">
                Resources
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="text-neutral-gray hover:text-primary-blue font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-blue via-bg-3 to-bg-3 text-fg py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Differentiation Matrix</h1>
          <p className="text-xl text-fg-2 font-light">
            Open Quality vs. Pop Health Vendors
          </p>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-bg-2 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
                <span className="text-fg font-bold">✓</span>
              </div>
              <span className="text-fg-2">Full capability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
                <span className="text-fg font-bold">⚠</span>
              </div>
              <span className="text-fg-2">Partial / limited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bg-2 flex items-center justify-center">
                <span className="text-fg-3 font-bold">✗</span>
              </div>
              <span className="text-fg-2">No capability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Filter */}
      <section className="py-6 bg-bg border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-fg-2 mr-3">Compare with:</span>
            <button
              onClick={() => setSelectedVendor(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedVendor === null
                  ? 'bg-primary-blue text-fg'
                  : 'bg-bg-2 text-fg-2 hover:bg-bg-2'
              }`}
            >
              All
            </button>
            {VENDORS.filter(v => v.name !== "Open Quality").map(vendor => (
              <button
                key={vendor.name}
                onClick={() => setSelectedVendor(selectedVendor === vendor.name ? null : vendor.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedVendor === vendor.name
                    ? 'bg-primary-blue text-fg'
                    : 'bg-bg-2 text-fg-2 hover:bg-bg-2'
                }`}
              >
                {vendor.shortName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix Table */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-line">
                  <th className="text-left py-4 px-4 font-semibold text-fg min-w-[220px]">
                    Capability
                  </th>
                  {filteredVendors.map(vendor => (
                    <th
                      key={vendor.name}
                      className={`py-4 px-3 font-semibold text-center min-w-[90px] ${
                        vendor.name === "Open Quality"
                          ? 'text-primary-blue bg-bg-2'
                          : 'text-fg-2'
                      }`}
                    >
                      <span className="hidden lg:inline">{vendor.name}</span>
                      <span className="lg:hidden">{vendor.shortName}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((cap, i) => (
                  <>
                    <tr
                      key={cap.name}
                      className={`border-b border-line hover:bg-bg-2 cursor-pointer transition ${
                        i % 2 === 0 ? 'bg-bg' : 'bg-bg-2'
                      }`}
                      onClick={() => toggleRow(cap.name)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-fg-2">{cap.name}</span>
                          <span className="text-fg-3 text-sm">
                            {expandedRow === cap.name ? '▲' : '▼'}
                          </span>
                        </div>
                      </td>
                      {filteredVendors.map(vendor => (
                        <td
                          key={vendor.name}
                          className={`py-4 px-3 text-center ${
                            vendor.name === "Open Quality" ? 'bg-bg-2' : ''
                          }`}
                        >
                          <div className="flex justify-center">
                            <StatusIcon status={cap.scores[vendor.name]} />
                          </div>
                        </td>
                      ))}
                    </tr>
                    {expandedRow === cap.name && (
                      <tr className="bg-bg-2">
                        <td colSpan={filteredVendors.length + 1} className="py-6 px-6">
                          <div className="max-w-3xl">
                            <p className="text-fg-2 mb-3">
                              {cap.description}
                            </p>
                            {cap.example && (
                              <div className="bg-bg rounded-lg p-4 border border-line">
                                <span className="text-fg-3 text-sm">Example: </span>
                                <span className="text-fg-2 italic">{cap.example}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-16 bg-bg-2">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">
            What This Means for Teams
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg rounded-xl p-8 shadow-md">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-fg mb-3">For Quality Teams</h3>
              <p className="text-fg-2">
                Stop manually reviewing charts to understand why measures fail.
                Get instant, evidence-based explanations.
              </p>
            </div>
            <div className="bg-bg rounded-xl p-8 shadow-md">
              <div className="text-4xl mb-4">🗃️</div>
              <h3 className="text-xl font-bold text-fg mb-3">For Data Teams</h3>
              <p className="text-fg-2">
                Identify missing feeds and mapping issues before they impact performance.
                SQL-on-FHIR native for portable analytics.
              </p>
            </div>
            <div className="bg-bg rounded-xl p-8 shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-fg mb-3">For Leadership</h3>
              <p className="text-fg-2">
                Understand root causes of performance drops.
                Make data-driven decisions with transparent AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-blue via-bg-3 to-bg-3 text-fg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">See the Difference</h2>
          <p className="text-xl text-fg-2 mb-10">
            Request a demo to see explainable quality in action.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-bg text-primary-blue px-8 py-4 rounded-xl font-semibold hover:bg-bg-2 transition text-lg"
          >
            Request Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-2 text-fg py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-fg-3">Open Quality · Differentiation Matrix</p>
            <div className="flex gap-8">
              <Link href="/investor" className="text-fg-3 hover:text-fg transition">
                Investor One-Pager
              </Link>
              <Link href="/contact" className="text-fg-3 hover:text-fg transition">
                Contact
              </Link>
              <Link href="/about" className="text-fg-3 hover:text-fg transition">
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-line-2 text-center">
            <p className="text-fg-3">&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
