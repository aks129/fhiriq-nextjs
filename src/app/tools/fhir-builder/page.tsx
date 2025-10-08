'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FHIRAppBuilder() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [appName, setAppName] = useState('My Healthcare App');
  const [selectedAuth, setSelectedAuth] = useState('smart-on-fhir');
  const [selectedTenant, setSelectedTenant] = useState('multi-tenant');
  const [selectedUseCase, setSelectedUseCase] = useState('patient-portal');
  const [selectedIGs, setSelectedIGs] = useState<string[]>(['us-core']);
  const [aiEnabled, setAiEnabled] = useState(true);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const useCases = [
    { id: 'patient-portal', name: 'Patient Portal', icon: '👤', desc: 'Patient-facing health records access', count: '2.3K' },
    { id: 'provider-dashboard', name: 'Provider Dashboard', icon: '⚕️', desc: 'Clinical workflow management', count: '1.8K' },
    { id: 'care-coordination', name: 'Care Coordination', icon: '🤝', desc: 'Multi-provider care management', count: '950' },
    { id: 'telehealth', name: 'Telehealth Platform', icon: '💻', desc: 'Virtual care delivery', count: '1.5K' },
    { id: 'analytics', name: 'Health Analytics', icon: '📊', desc: 'Population health insights', count: '720' },
    { id: 'payer-platform', name: 'Payer Platform', icon: '💳', desc: 'Insurance & claims management', count: '580' },
  ];

  const implementationGuides = [
    { id: 'us-core', name: 'US Core', desc: 'Base FHIR profiles for US realm' },
    { id: 'carin-bb', name: 'CARIN Blue Button', desc: 'Payer data exchange' },
    { id: 'davinci-pdex', name: 'Da Vinci PDex', desc: 'Payer data exchange' },
    { id: 'davinci-hrex', name: 'Da Vinci HRex', desc: 'Health record exchange' },
    { id: 'smart-app', name: 'SMART App Launch', desc: 'App authorization framework' },
    { id: 'bulk-data', name: 'Bulk Data', desc: 'Large-scale data export' },
  ];

  const toggleIG = (igId: string) => {
    setSelectedIGs(prev =>
      prev.includes(igId) ? prev.filter(id => id !== igId) : [...prev, igId]
    );
  };

  const steps = [
    { num: 1, name: 'Use Case' },
    { num: 2, name: 'Architecture' },
    { num: 3, name: 'Standards' },
    { num: 4, name: 'Deploy' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/tools" className="text-accent-teal hover:text-accent-teal-dark text-sm font-medium">
            ← Back to Tools
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Coming Soon Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-accent-orange text-white">
            Coming Soon - Q4 2025
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            FHIR App Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build production-ready FHIR healthcare applications powered by AI.
            From concept to deployment in minutes, not months.
          </p>
        </div>

        {/* Interactive App Builder */}
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden mb-16 relative">
          {/* Preview Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-accent-orange to-red-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm">
              Interactive Preview - Full Version Q4 2025
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold">FHIR App Builder</div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">{appName}</span>
              </div>
              <button className="px-4 py-1.5 bg-gradient-to-r from-accent-teal to-accent-purple hover:opacity-90 rounded text-sm font-medium transition-all">
                Generate App
              </button>
            </div>
          </div>

          {/* Step Progress */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, idx) => (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep >= step.num
                        ? 'bg-accent-teal text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.num}
                    </div>
                    <div className={`mt-2 text-xs font-medium ${
                      currentStep >= step.num ? 'text-accent-teal' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-4 ${
                      currentStep > step.num ? 'bg-accent-teal' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8 min-h-[700px]">
            {/* Step 1: Use Case Selection */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Use Case</h2>
                <p className="text-gray-600 mb-8">Select from thousands of pre-built healthcare templates</p>

                <div className="grid md:grid-cols-3 gap-6">
                  {useCases.map((useCase) => (
                    <button
                      key={useCase.id}
                      onClick={() => setSelectedUseCase(useCase.id)}
                      className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
                        selectedUseCase === useCase.id
                          ? 'border-accent-teal bg-accent-teal/5 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-4xl mb-3">{useCase.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{useCase.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{useCase.count} templates</span>
                        {selectedUseCase === useCase.id && (
                          <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors"
                  >
                    Next: Architecture →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Architecture */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure Architecture</h2>
                <p className="text-gray-600 mb-8">Set up authentication and multi-tenancy</p>

                <div className="space-y-8 max-w-3xl">
                  {/* App Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Application Name
                    </label>
                    <input
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-teal focus:border-transparent text-lg"
                      placeholder="Enter your app name"
                    />
                  </div>

                  {/* Authentication */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Authentication Method
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedAuth('smart-on-fhir')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedAuth === 'smart-on-fhir'
                            ? 'border-accent-teal bg-accent-teal/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">SMART on FHIR</h4>
                          {selectedAuth === 'smart-on-fhir' && (
                            <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">OAuth 2.0 + FHIR context</p>
                      </button>

                      <button
                        onClick={() => setSelectedAuth('custom-oauth')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedAuth === 'custom-oauth'
                            ? 'border-accent-teal bg-accent-teal/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Custom OAuth 2.0</h4>
                          {selectedAuth === 'custom-oauth' && (
                            <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Standard OAuth 2.0</p>
                      </button>
                    </div>
                  </div>

                  {/* Tenancy */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tenancy Model
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedTenant('multi-tenant')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedTenant === 'multi-tenant'
                            ? 'border-accent-purple bg-accent-purple/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Multi-Tenant</h4>
                          {selectedTenant === 'multi-tenant' && (
                            <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Shared infrastructure, isolated data</p>
                      </button>

                      <button
                        onClick={() => setSelectedTenant('single-tenant')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedTenant === 'single-tenant'
                            ? 'border-accent-purple bg-accent-purple/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">Single Tenant</h4>
                          {selectedTenant === 'single-tenant' && (
                            <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Dedicated infrastructure per client</p>
                      </button>
                    </div>
                  </div>

                  {/* AI Integration */}
                  <div>
                    <label className="flex items-center justify-between p-4 bg-gradient-to-r from-accent-teal/10 to-accent-purple/10 rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">AI Agent Integration</h4>
                        <p className="text-sm text-gray-600">Connect to LLM-powered AI agents for intelligent workflows</p>
                      </div>
                      <button
                        onClick={() => setAiEnabled(!aiEnabled)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                          aiEnabled ? 'bg-accent-teal' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          aiEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`} />
                      </button>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors"
                  >
                    Next: Standards →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Implementation Guides */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Implementation Guides</h2>
                <p className="text-gray-600 mb-8">Choose FHIR standards and profiles for your app</p>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
                  {implementationGuides.map((ig) => (
                    <button
                      key={ig.id}
                      onClick={() => toggleIG(ig.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedIGs.includes(ig.id)
                          ? 'border-accent-teal bg-accent-teal/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{ig.name}</h4>
                          <p className="text-sm text-gray-600">{ig.desc}</p>
                        </div>
                        <div className={`ml-3 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          selectedIGs.includes(ig.id)
                            ? 'border-accent-teal bg-accent-teal'
                            : 'border-gray-300'
                        }`}>
                          {selectedIGs.includes(ig.id) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-900">
                      <span className="font-semibold">Selected {selectedIGs.length} Implementation Guide{selectedIGs.length !== 1 ? 's' : ''}</span>
                      <p className="mt-1 text-blue-700">Your app will be compliant with these FHIR standards and profiles</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 bg-accent-teal text-white rounded-lg font-semibold hover:bg-accent-teal-dark transition-colors"
                  >
                    Next: Deploy →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Deployment */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Deploy Your App</h2>
                <p className="text-gray-600 mb-8">Choose deployment options and generate your application</p>

                <div className="max-w-4xl space-y-6">
                  {/* Deployment Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">App Configuration Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">App Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{appName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Use Case:</span>
                        <span className="ml-2 font-medium text-gray-900">{useCases.find(u => u.id === selectedUseCase)?.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Authentication:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedAuth === 'smart-on-fhir' ? 'SMART on FHIR' : 'Custom OAuth 2.0'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tenancy:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedTenant === 'multi-tenant' ? 'Multi-Tenant' : 'Single Tenant'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">AI Integration:</span>
                        <span className="ml-2 font-medium text-gray-900">{aiEnabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Implementation Guides:</span>
                        <span className="ml-2 font-medium text-gray-900">{selectedIGs.length} selected</span>
                      </div>
                    </div>
                  </div>

                  {/* Deployment Options */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-accent-teal transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Deploy to GitHub</h4>
                      <p className="text-sm text-gray-600">Push code to your repository</p>
                    </div>

                    <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-accent-teal transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Deploy to Vercel</h4>
                      <p className="text-sm text-gray-600">Instant production hosting</p>
                    </div>

                    <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-accent-teal transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5 4.44 4.44 0 0 0 16 0a4.48 4.48 0 0 0-3.17 1.22a4.35 4.35 0 0 0-1.15 3.19a4.24 4.24 0 0 0 3.26 1.97M12 24c2.97 0 6.16-4.45 6.16-8.18c0-2.55-1.41-4.31-3.81-4.31c-2.43 0-3.87 1.76-3.87 4.31C10.48 19.55 9.03 24 12 24z"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Submit to App Store</h4>
                      <p className="text-sm text-gray-600">iOS app submission ready</p>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="bg-gradient-to-r from-accent-teal to-accent-purple p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">Ready to Build?</h3>
                    <p className="text-white/90 mb-6">Generate your complete FHIR application with one click</p>
                    <button className="px-8 py-4 bg-white text-accent-teal font-bold rounded-lg hover:bg-gray-50 transition-colors text-lg shadow-lg">
                      🚀 Generate Application
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thousands of Use Cases</h3>
            <p className="text-gray-600">
              Pre-built templates for patient portals, provider dashboards, telehealth, analytics, and more
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Native Integration</h3>
            <p className="text-gray-600">
              Connect to LLM-powered AI agents for intelligent clinical workflows and automation
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Standards Compliant</h3>
            <p className="text-gray-600">
              Built-in support for US Core, CARIN BB, Da Vinci, and other major implementation guides
            </p>
          </div>
        </div>

        {/* Notify Me Section */}
        <div className="bg-gradient-to-r from-accent-teal to-accent-purple rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Early Access
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Be among the first to build FHIR apps with AI. Join our beta program for Q4 2025 launch.
          </p>

          {!submitted ? (
            <form onSubmit={handleNotifyMe} className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-accent-teal font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Join Beta
              </button>
            </form>
          ) : (
            <div className="bg-white/20 text-white px-6 py-4 rounded-lg max-w-md mx-auto">
              <p className="font-semibold">Thank you! We will notify you when we launch.</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Development Roadmap</h3>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-accent-teal">
                <div className="text-accent-teal font-bold mb-2">Q1 2025</div>
                <div className="font-semibold text-gray-900 mb-2">Alpha Release</div>
                <div className="text-sm text-gray-600">Core builder with 100+ templates</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-gray-500 font-bold mb-2">Q2 2025</div>
                <div className="font-semibold text-gray-900 mb-2">Beta Release</div>
                <div className="text-sm text-gray-600">AI agent integration & deployment automation</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-gray-500 font-bold mb-2">Q4 2025</div>
                <div className="font-semibold text-gray-900 mb-2">v1.0 Release</div>
                <div className="text-sm text-gray-600">1000s of use cases, full IG support, App Store ready</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
