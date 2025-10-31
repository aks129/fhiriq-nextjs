'use client';

import Link from 'next/link';

export default function Games() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
              <Link href="/builder" className="text-gray-700 hover:text-blue-600">
                AI Builder
              </Link>
              <Link href="/games" className="text-blue-600 font-semibold">
                Games
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Interop Quest</h1>
          <p className="text-xl mb-4 max-w-3xl mx-auto">
            Master healthcare interoperability through multiplayer gameplay
          </p>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Learn FHIR, SMART on FHIR, TEFCA/QHINs, and CMS mandates in an interactive,
            collaborative gaming experience. Play with 2-20 players and test your knowledge
            across different difficulty levels.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">2-20</div>
              <div className="text-sm opacity-90">Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm opacity-90">Game Modes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm opacity-90">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Interoperability Mode</h3>
              <p className="text-gray-600 mb-4">
                Focus on healthcare regulations, compliance, and strategic interoperability concepts.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  21st Century Cures Act
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  TEFCA & QHIN Networks
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  CMS Mandates & Compliance
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Healthcare IT Strategy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-600">FHIR Deep Dive</h3>
              <p className="text-gray-600 mb-4">
                Technical deep dive into FHIR resources, operations, profiles, and implementation.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  FHIR Resources & Operations
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  US Core Profiles
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Bulk Data & Subscriptions
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Search Parameters & Bundles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Game Iframe */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-2xl">
            <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '800px' }}>
              <iframe
                src="https://interop-game12.vercel.app"
                className="w-full h-full rounded-xl border-4 border-white shadow-xl"
                title="Interop Quest Game"
                allow="clipboard-write"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Having issues?
                <a
                  href="https://interop-game12.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
                >
                  Open game in new tab
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Game Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Multiplayer</h3>
              <p className="text-gray-600">
                Real-time collaboration with 2-20 players via Pusher Channels presence
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Role-Based Learning</h3>
              <p className="text-gray-600">
                Play as Payer PM, Provider/EHR, Developer, Architect, and 16+ other roles
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Timed Rounds</h3>
              <p className="text-gray-600">
                60-90 second timer per event with auto-advance and constraint mechanics
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Leaderboards</h3>
              <p className="text-gray-600">
                Track your performance and compete with others on the global leaderboard
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Educational Content</h3>
              <p className="text-gray-600">
                Learn through 50+ event scenarios with detailed explanations for each choice
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Export Results</h3>
              <p className="text-gray-600">
                Download game summaries in JSON/CSV format with detailed scoring breakdown
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Level Up Your Interoperability Knowledge?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Scroll up and start playing Interop Quest now, or explore our other products and training offerings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/training"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              FHIR Training
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
