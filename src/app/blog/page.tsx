'use client';

import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with FHIR R4",
      excerpt: "A comprehensive guide to understanding and implementing FHIR R4 in your healthcare applications.",
      date: "2024-09-15",
      author: "FHIR IQ Team"
    },
    {
      id: 2,
      title: "AI in Healthcare Interoperability",
      excerpt: "How artificial intelligence is revolutionizing healthcare data exchange and FHIR implementations.",
      date: "2024-09-10",
      author: "FHIR IQ Team"
    },
    {
      id: 3,
      title: "FHIR Security Best Practices",
      excerpt: "Essential security considerations when building FHIR-compliant healthcare applications.",
      date: "2024-09-05",
      author: "FHIR IQ Team"
    }
  ];

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
              <Link href="/blog" className="text-blue-600 font-semibold">
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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FHIR IQ Blog</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Insights, tutorials, and best practices for healthcare interoperability
            and FHIR implementation from our team of experts.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest FHIR insights and updates.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-700">
              Subscribe
            </button>
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