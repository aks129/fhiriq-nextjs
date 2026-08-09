'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build email content
    const subject = encodeURIComponent(`FHIR IQ Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:gene@fhiriq.com?subject=${subject}&body=${body}`;

    // Clear form after a brief delay
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitStatus('success');
    }, 500);
  };

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
              <Link href="/blog" className="text-fg-2 hover:text-fg">
                Blog
              </Link>
              <Link href="/about" className="text-fg-2 hover:text-fg">
                About
              </Link>
              <Link href="/contact" className="text-fg font-semibold">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bg-3 to-bg-3 text-fg py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ready to accelerate your FHIR implementation? Let's discuss how
            FHIR IQ can help you achieve your healthcare interoperability goals.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-fg">Send Us a Message</h2>

              {submitStatus === 'success' && (
                <div className="bg-bg-2 border border-line-2 text-fg px-4 py-3 rounded mb-6">
                  Your email client should open with your message. Please send it to complete your inquiry.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg-2 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-line-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-fg-2 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-line-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-2"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-fg-2 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-line-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-fg-2 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-line-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-2"
                    placeholder="Tell us about your FHIR project or requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-fg text-bg py-3 px-6 rounded-lg font-semibold hover:bg-fg transition"
                >
                  Open Email to Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-fg">Other Ways to Reach Us</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-bg-2 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <span className="text-fg">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a href="mailto:gene@fhiriq.com" className="text-fg hover:text-fg block">
                      gene@fhiriq.com
                    </a>
                    <p className="text-fg-2 text-sm mt-1">Direct inquiries and support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-bg-2 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <span className="text-fg">📅</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Book a Meeting</h3>
                    <p className="text-fg-2 mb-3">
                      Schedule a free consultation to discuss your FHIR implementation needs.
                    </p>
                    <a
                      href="https://calendar.app.google/TMvRGiiYfbBKNd889"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-fg text-bg px-6 py-2 rounded-lg font-semibold hover:bg-fg transition"
                    >
                      Schedule Meeting →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-bg-2 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <span className="text-fg">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                    <p className="text-fg-2 mb-2">
                      Get instant answers to your FHIR questions with our AI-powered chat.
                    </p>
                    <button className="text-fg font-semibold hover:text-fg">
                      Start Chat →
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-fg">Quick Questions?</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-fg">What's the best way to get started?</h4>
                    <p className="text-fg-2 text-sm">
                      Book a free consultation call to discuss your specific FHIR requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg">Do you offer custom development?</h4>
                    <p className="text-fg-2 text-sm">
                      Yes, we provide custom FHIR development and implementation services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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