'use client';

import Link from 'next/link';

export default function Podcast() {
  // Mock recent episodes - these would come from RSS feed in production
  const recentEpisodes = [
    {
      id: 1,
      title: "AI-Powered FHIR: The Future of Healthcare Interoperability",
      description: "Exploring how artificial intelligence is transforming FHIR implementations and accelerating healthcare data exchange.",
      publishDate: "2024-01-20",
      duration: "45:32",
      episodeNumber: 42,
      audioUrl: "#", // Will link to actual hosted audio
      transcript: "Available",
      guests: ["Dr. Sarah Johnson", "Mike Chen, CTO at HealthTech"]
    },
    {
      id: 2,
      title: "FHIR R5: What's New and Why It Matters",
      description: "Deep dive into FHIR R5 features, improvements, and migration considerations for existing implementations.",
      publishDate: "2024-01-15",
      duration: "38:15",
      episodeNumber: 41,
      audioUrl: "#",
      transcript: "Available",
      guests: ["Lloyd McKenzie, HL7 FHIR Team"]
    },
    {
      id: 3,
      title: "Real-World FHIR Implementation: Lessons from the Trenches",
      description: "Healthcare CTO shares insights from a large-scale FHIR deployment, including challenges and solutions.",
      publishDate: "2024-01-10",
      duration: "52:18",
      episodeNumber: 40,
      audioUrl: "#",
      transcript: "Available",
      guests: ["Jennifer Martinez, CTO Regional Health"]
    },
    {
      id: 4,
      title: "SMART on FHIR: Building Secure Healthcare Apps",
      description: "Complete guide to SMART on FHIR authentication, authorization, and best practices for app developers.",
      publishDate: "2024-01-05",
      duration: "41:27",
      episodeNumber: 39,
      audioUrl: "#",
      transcript: "Available",
      guests: ["Josh Mandel, SMART Team Lead"]
    }
  ];

  const subscriptionLinks = [
    {
      platform: "Apple Podcasts",
      url: "https://podcasts.apple.com/podcast/fhir-iq-podcast", // Replace with actual URL
      icon: "🎧"
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/show/fhir-iq-podcast", // Replace with actual URL
      icon: "🎵"
    },
    {
      platform: "Google Podcasts",
      url: "https://podcasts.google.com/feed/fhir-iq-podcast", // Replace with actual URL
      icon: "🎙️"
    },
    {
      platform: "RSS Feed",
      url: "https://fhiriq.substack.com/feed", // Link to your Substack RSS
      icon: "📡"
    }
  ];

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
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/training" className="text-neutral-gray hover:text-primary-blue font-medium">
                Training
              </Link>
              <Link href="/blog" className="text-neutral-gray hover:text-primary-blue font-medium">
                Blog
              </Link>
              <Link href="/podcast" className="text-primary-blue font-semibold">
                Podcast
              </Link>
              <Link href="/partners" className="text-neutral-gray hover:text-primary-blue font-medium">
                Partners
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="btn-primary text-sm">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-purple to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR IQ Podcast</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Deep conversations with FHIR experts, implementers, and innovators.
            Get insights, practical advice, and the latest developments in healthcare interoperability.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://fhiriq.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Read on Substack
            </a>
            <a
              href="#subscribe"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </section>

      {/* Latest Episode Highlight */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-navy">
            Latest Episode
          </h2>
          {recentEpisodes[0] && (
            <div className="card">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm">
                      Episode {recentEpisodes[0].episodeNumber}
                    </span>
                    <span className="text-neutral-gray">{recentEpisodes[0].duration}</span>
                    <span className="text-neutral-gray">
                      {new Date(recentEpisodes[0].publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary-navy">
                    {recentEpisodes[0].title}
                  </h3>
                  <p className="text-neutral-gray mb-6">
                    {recentEpisodes[0].description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-primary-navy">Guests:</h4>
                    <ul className="text-neutral-gray">
                      {recentEpisodes[0].guests.map((guest, index) => (
                        <li key={index}>• {guest}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-primary-navy text-white p-6 rounded-lg text-center">
                    <div className="text-6xl mb-4">🎙️</div>
                    <h4 className="font-bold mb-4">Listen Now</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-white text-primary-navy py-2 px-4 rounded font-semibold hover:bg-gray-100 transition">
                        ▶️ Play Episode
                      </button>
                      <a
                        href="https://fhiriq.substack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-accent-orange text-white py-2 px-4 rounded font-semibold hover:bg-orange-600 transition"
                      >
                        View on Substack
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Recent Episodes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEpisodes.slice(1).map((episode) => (
              <div key={episode.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-bg-accent text-primary-blue px-2 py-1 rounded text-sm">
                    Episode {episode.episodeNumber}
                  </span>
                  <span className="text-sm text-neutral-gray">{episode.duration}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-primary-navy line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-neutral-gray text-sm mb-4 line-clamp-3">
                  {episode.description}
                </p>
                <div className="text-sm text-neutral-gray mb-4">
                  {new Date(episode.publishDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary flex-1 text-sm">
                    Listen
                  </button>
                  <button className="btn-secondary flex-1 text-sm">
                    Transcript
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Never Miss an Episode
          </h2>
          <p className="text-xl mb-8">
            Subscribe to the FHIR IQ Podcast on your favorite platform and stay up-to-date
            with the latest in healthcare interoperability.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {subscriptionLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue p-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3"
              >
                <span className="text-2xl">{link.icon}</span>
                {link.platform}
              </a>
            ))}
          </div>

          <div className="bg-white/10 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
              📬 Get Show Notes & Transcripts
            </h3>
            <p className="mb-6">
              Subscribe to our Substack for detailed show notes, full transcripts,
              and additional FHIR insights between episodes.
            </p>
            <a
              href="https://fhiriq.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-block"
            >
              Subscribe to Substack
            </a>
          </div>
        </div>
      </section>

      {/* Podcast Topics */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            What We Cover
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Implementation</h3>
              <p className="text-neutral-gray">
                Real-world FHIR implementation stories, challenges, and solutions from the field.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">AI & Innovation</h3>
              <p className="text-neutral-gray">
                How artificial intelligence and emerging technologies are transforming FHIR.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Expert Interviews</h3>
              <p className="text-neutral-gray">
                Deep conversations with FHIR architects, implementers, and industry leaders.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Standards & Specs</h3>
              <p className="text-neutral-gray">
                Breaking down FHIR specifications, profiles, and implementation guides.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Industry Trends</h3>
              <p className="text-neutral-gray">
                Analysis of healthcare IT trends, regulations, and market developments.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Practical Tips</h3>
              <p className="text-neutral-gray">
                Actionable advice for developers, architects, and healthcare IT professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want to be a Guest?
          </h2>
          <p className="text-xl mb-8">
            Share your FHIR expertise with our audience. We're always looking for
            implementers, vendors, and innovators to join the conversation.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Pitch Your Story
            </Link>
            <a
              href="https://fhiriq.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-navy transition"
            >
              Read Our Newsletter
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Expert insights and practical advice for healthcare interoperability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Podcast</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#subscribe" className="hover:text-white">Subscribe</a></li>
                <li><a href="https://fhiriq.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Substack</a></li>
                <li><Link href="/contact" className="hover:text-white">Be a Guest</Link></li>
                <li><a href="#" className="hover:text-white">RSS Feed</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FHIR IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}