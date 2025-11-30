'use client';

import { useState } from 'react';
import Link from 'next/link';

const ORG_TYPES = [
  "Health System",
  "Payer",
  "ACO / Risk-bearing Group",
  "Quality / Performance Improvement Org",
  "Data Platform / Infrastructure",
  "Startup",
  "Vendor / Consultancy",
  "Other"
];

const INTERESTS = [
  "Explaining why a measure passed or failed",
  "Understanding missing data or incorrect mappings",
  "Transparent, evidence-based logic",
  "Root cause insights",
  "SQL-on-FHIR alignment",
  "Preparing for dQMs",
  "Reducing manual chart review",
  "Improving population outcomes"
];

const PILOT_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "possibly", label: "Possibly" },
  { value: "updates", label: "No, just want updates" }
];

export default function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    role: "",
    orgType: "",
    problems: "",
    interests: [] as string[],
    pilotInterest: "",
    additionalInfo: "",
    consent: false
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSelectAllInterests = () => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.length === INTERESTS.length ? [] : [...INTERESTS]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.organization.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.role.trim() !== "" &&
      formData.orgType !== "" &&
      formData.problems.trim() !== "" &&
      formData.consent
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            Thank you — you're on the list.
          </h1>
          <p className="text-gray-500 font-light mb-8">
            We'll reach out shortly with next steps.
          </p>
          <Link
            href="/investor"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Idea Vision
          </Link>
        </div>
      </div>
    );
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
              <Link href="/architectures" className="text-neutral-gray hover:text-primary-blue font-medium">
                Architectures
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
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

      {/* Back Link */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link
          href="/investor"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Idea Vision
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-2xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
          Early Access Program
        </h1>
        <p className="text-lg text-gray-500 font-light leading-relaxed">
          We're building an AI that explains healthcare quality, surfaces missing or incorrect data,
          and helps teams fix what matters.
        </p>
        <p className="text-gray-500 font-light mt-4">
          If you're interested in joining early access or being considered for a pilot,
          share a few details below. We'll reach out personally.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition"
              required
            />
          </div>

          {/* Organization */}
          <div className="space-y-2">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organization <span className="text-red-500">*</span>
            </label>
            <input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role / Title <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition"
              required
            />
          </div>

          {/* Organization Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              What type of organization best describes you? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {ORG_TYPES.map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="orgType"
                    value={type}
                    checked={formData.orgType === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, orgType: e.target.value }))}
                    className="w-4 h-4 text-primary-blue border-gray-300 focus:ring-primary-blue"
                  />
                  <span className="text-gray-600">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Problems */}
          <div className="space-y-2">
            <label htmlFor="problems" className="block text-sm font-medium text-gray-700">
              What problems are you currently facing with quality measurement or improvement? <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-400 font-light">
              Examples: unclear logic, inconsistent data, missing feeds, lack of explainability,
              difficulty diagnosing root cause, time spent reviewing charts, failing measures without clarity.
            </p>
            <textarea
              id="problems"
              value={formData.problems}
              onChange={(e) => setFormData(prev => ({ ...prev, problems: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition min-h-[120px]"
              required
            />
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              What interests you about Open Quality?
            </label>
            <div className="space-y-2">
              {INTERESTS.map((interest) => (
                <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                  />
                  <span className="text-gray-600">{interest}</span>
                </label>
              ))}
              <label className="flex items-center space-x-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.interests.length === INTERESTS.length}
                  onChange={handleSelectAllInterests}
                  className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                />
                <span className="text-gray-600">All of the above</span>
              </label>
            </div>
          </div>

          {/* Pilot Interest */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Are you interested in pilot participation or early product testing?
            </label>
            <div className="space-y-2">
              {PILOT_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pilotInterest"
                    value={option.value}
                    checked={formData.pilotInterest === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, pilotInterest: e.target.value }))}
                    className="w-4 h-4 text-primary-blue border-gray-300 focus:ring-primary-blue"
                  />
                  <span className="text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
              Anything else we should know?
            </label>
            <textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition min-h-[100px]"
            />
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
              className="w-4 h-4 mt-0.5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
            />
            <label htmlFor="consent" className="text-gray-600 cursor-pointer leading-relaxed">
              I consent to be contacted about early access, pilots, and product updates. <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="w-full bg-primary-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Join Early Access
              </>
            )}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">Open Quality · Early Access</p>
            <div className="flex gap-8">
              <Link href="/investor" className="text-gray-400 hover:text-white transition">
                Idea Vision
              </Link>
              <Link href="/differentiation" className="text-gray-400 hover:text-white transition">
                Differentiation Matrix
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2025 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
