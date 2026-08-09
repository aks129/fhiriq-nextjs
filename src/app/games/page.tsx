'use client';

import Link from 'next/link';

export default function Games() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="bg-bg shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-fg">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/products" className="text-fg-2 hover:text-fg">
                Products
              </Link>
              <Link href="/builder" className="text-fg-2 hover:text-fg">
                AI Builder
              </Link>
              <Link href="/games" className="text-fg font-semibold">
                Fun &amp; Games
              </Link>
              <Link href="/blog" className="text-fg-2 hover:text-fg">
                Blog
              </Link>
              <Link href="/about" className="text-fg-2 hover:text-fg">
                About
              </Link>
              <Link href="/contact" className="text-fg-2 hover:text-fg">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bg-3 to-bg-3 text-fg py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Fun &amp; Games</h1>
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
      <section className="py-12 bg-bg-2">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-fg">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-bg rounded-xl shadow-lg p-6 border-2 border-line-2">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-fg">Interoperability Mode</h3>
              <p className="text-fg-2 mb-4">
                Focus on healthcare regulations, compliance, and strategic interoperability concepts.
              </p>
              <ul className="space-y-2 text-sm text-fg-2">
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  21st Century Cures Act
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  TEFCA & QHIN Networks
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  CMS Mandates & Compliance
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  Healthcare IT Strategy
                </li>
              </ul>
            </div>

            <div className="bg-bg rounded-xl shadow-lg p-6 border-2 border-line-2">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-fg">FHIR Deep Dive</h3>
              <p className="text-fg-2 mb-4">
                Technical deep dive into FHIR resources, operations, profiles, and implementation.
              </p>
              <ul className="space-y-2 text-sm text-fg-2">
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  FHIR Resources & Operations
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  US Core Profiles
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  Bulk Data & Subscriptions
                </li>
                <li className="flex items-start">
                  <span className="text-fg mr-2">✓</span>
                  Search Parameters & Bundles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Game Iframe */}
      <section className="py-8 bg-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-bg-2 to-bg-2 rounded-2xl p-4 shadow-2xl">
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
              <p className="text-sm text-fg-2">
                Having issues?
                <a
                  href="https://interop-game12.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg hover:text-fg font-semibold ml-1"
                >
                  Open game in new tab
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-bg-2">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">
            Game Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Multiplayer</h3>
              <p className="text-fg-2">
                Real-time collaboration with 2-20 players via Pusher Channels presence
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Role-Based Learning</h3>
              <p className="text-fg-2">
                Play as Payer PM, Provider/EHR, Developer, Architect, and 16+ other roles
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Timed Rounds</h3>
              <p className="text-fg-2">
                60-90 second timer per event with auto-advance and constraint mechanics
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Leaderboards</h3>
              <p className="text-fg-2">
                Track your performance and compete with others on the global leaderboard
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Educational Content</h3>
              <p className="text-fg-2">
                Learn through 50+ event scenarios with detailed explanations for each choice
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-bg-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Export Results</h3>
              <p className="text-fg-2">
                Download game summaries in JSON/CSV format with detailed scoring breakdown
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-fg">
            Ready to Level Up Your Interoperability Knowledge?
          </h2>
          <p className="text-xl text-fg-2 mb-8">
            Scroll up and start playing Interop Quest now, or explore our other products and training offerings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-block bg-fg text-bg px-8 py-3 rounded-lg font-semibold hover:bg-fg transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/training"
              className="inline-block bg-bg-3 text-fg px-8 py-3 rounded-lg font-semibold hover:bg-bg-3 transition-colors"
            >
              FHIR Training
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-2 text-fg py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
