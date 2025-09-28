'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  enclosure?: {
    url: string;
    type: string;
    length: string;
  };
  guid: string;
  duration?: string;
}

export default function Podcast() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch podcast episodes from RSS feed
    const fetchPodcastFeed = async () => {
      try {
        // Using a CORS proxy for client-side RSS feed fetching
        const rssUrl = 'https://api.substack.com/feed/podcast/4334682.rss';
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(proxyUrl);
        const text = await response.text();

        // Parse RSS XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const items = xmlDoc.querySelectorAll('item');
        const parsedEpisodes: PodcastEpisode[] = [];

        items.forEach((item, index) => {
          if (index < 10) { // Limit to 10 most recent episodes
            const episode: PodcastEpisode = {
              title: item.querySelector('title')?.textContent || '',
              description: item.querySelector('description')?.textContent || '',
              pubDate: item.querySelector('pubDate')?.textContent || '',
              link: item.querySelector('link')?.textContent || '',
              guid: item.querySelector('guid')?.textContent || String(index),
            };

            const enclosureNode = item.querySelector('enclosure');
            if (enclosureNode) {
              episode.enclosure = {
                url: enclosureNode.getAttribute('url') || '',
                type: enclosureNode.getAttribute('type') || '',
                length: enclosureNode.getAttribute('length') || '',
              };
            }

            // Extract duration if available
            const duration = item.querySelector('duration');
            if (duration) {
              episode.duration = duration.textContent || '';
            }

            parsedEpisodes.push(episode);
          }
        });

        setEpisodes(parsedEpisodes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching podcast feed:', err);
        setError('Failed to load podcast episodes');
        setLoading(false);
      }
    };

    fetchPodcastFeed();
  }, []);

  const subscriptionLinks = [
    {
      platform: "Substack Podcast",
      url: "https://evestel.substack.com/podcast",
      icon: "🎧"
    },
    {
      platform: "Apple Podcasts",
      url: "https://podcasts.apple.com/podcast/id4334682",
      icon: "🎵"
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/show/4334682",
      icon: "🎶"
    },
    {
      platform: "RSS Feed",
      url: "https://api.substack.com/feed/podcast/4334682.rss",
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
              href="https://evestel.substack.com/podcast"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Listen on Substack
            </a>
            <a
              href="https://api.substack.com/feed/podcast/4334682.rss"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              Subscribe via RSS
            </a>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Latest Episodes
          </h2>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              <p className="mt-4 text-gray-600">Loading episodes...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <a
                href="https://evestel.substack.com/podcast"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Substack Podcast Page
              </a>
            </div>
          )}

          {!loading && !error && episodes.length > 0 && (
            <div className="space-y-8">
              {episodes.map((episode, index) => (
                <article key={episode.guid} className="card hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm">
                          Episode {episodes.length - index}
                        </span>
                        {episode.duration && (
                          <span className="text-neutral-gray">{episode.duration}</span>
                        )}
                        <span className="text-neutral-gray">
                          {new Date(episode.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-navy">
                        {episode.title}
                      </h3>
                      <div
                        className="text-neutral-gray mb-6 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: episode.description }}
                      />
                      <div className="flex gap-4">
                        {episode.enclosure && (
                          <audio controls className="w-full max-w-md">
                            <source src={episode.enclosure.url} type={episode.enclosure.type} />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <a
                          href={episode.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                          View on Substack
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && episodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No episodes found.</p>
              <a
                href="https://evestel.substack.com/podcast"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Substack Podcast Page
              </a>
            </div>
          )}
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
              href="https://evestel.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-block"
            >
              Subscribe to Substack
            </a>
          </div>
        </div>
      </section>

      {/* Podcast Player Embed */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-navy">
            Listen to Our Podcast
          </h2>
          <div className="bg-white rounded-lg shadow-xl p-4">
            <iframe
              src="https://evestel.substack.com/embed/podcast"
              width="100%"
              height="600"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="FHIR IQ Podcast Player"
            ></iframe>
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
            Share your FHIR expertise with our audience. We&apos;re always looking for
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
              href="https://evestel.substack.com"
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
                <li><a href="https://evestel.substack.com/podcast" target="_blank" rel="noopener noreferrer" className="hover:text-white">Substack</a></li>
                <li><Link href="/contact" className="hover:text-white">Be a Guest</Link></li>
                <li><a href="https://api.substack.com/feed/podcast/4334682.rss" target="_blank" rel="noopener noreferrer" className="hover:text-white">RSS Feed</a></li>
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