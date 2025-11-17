'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 17, 2025</p>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              FHIR IQ ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website fhiriq.com (the "Site") and use our services.
            </p>
            <p className="text-gray-700 mb-4">
              This policy applies to all users located in the United States, including residents of Pennsylvania, and complies with applicable federal and state privacy laws.
            </p>
            <p className="text-gray-700">
              By using our Site, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We may collect personally identifiable information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Fill out contact forms or request information</li>
              <li>Subscribe to our newsletter</li>
              <li>Register for our services or create an account</li>
              <li>Schedule consultations or meetings</li>
              <li>Purchase products or services</li>
              <li>Participate in surveys or provide feedback</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Personal information may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name and job title</li>
              <li>Phone number</li>
              <li>Billing and payment information</li>
              <li>Professional credentials and background</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you visit our Site, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Device identifiers</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Clickstream data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 mb-4">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>To provide, operate, and maintain our services</li>
              <li>To process transactions and send transaction notifications</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you technical notices, updates, and security alerts</li>
              <li>To communicate with you about products, services, and promotional offers</li>
              <li>To improve our Site and develop new products and services</li>
              <li>To monitor and analyze usage trends and preferences</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          {/* Information Sharing and Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, rent, or trade your personal information. We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We may share information with third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Payment processors</li>
              <li>Email service providers</li>
              <li>Analytics providers</li>
              <li>Hosting and infrastructure providers</li>
              <li>Customer relationship management platforms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Business Transfers</h3>
            <p className="text-gray-700 mb-4">
              If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Legal Requirements</h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Protection of Rights</h3>
            <p className="text-gray-700 mb-4">
              We may disclose information to protect and defend our rights, property, or safety, or that of our users or others.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
              <li>Secure data storage and backup procedures</li>
            </ul>
            <p className="text-gray-700">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Restriction:</strong> Request restriction of processing of your information</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us at <a href="mailto:gene@fhiriq.com" className="text-primary-blue hover:underline">gene@fhiriq.com</a>. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700">
              Our Site may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700">
              Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
            </p>
          </section>

          {/* Pennsylvania-Specific Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Pennsylvania Residents</h2>
            <p className="text-gray-700 mb-4">
              If you are a Pennsylvania resident, you have specific rights under Pennsylvania law:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Right to know what personal information we collect and how it is used</li>
              <li>Right to request deletion of your personal information</li>
              <li>Right to opt out of the sale of personal information (we do not sell personal information)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-gray-700">
              Pennsylvania residents can exercise these rights by contacting us at <a href="mailto:gene@fhiriq.com" className="text-primary-blue hover:underline">gene@fhiriq.com</a>.
            </p>
          </section>

          {/* Do Not Track Signals */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Do Not Track Signals</h2>
            <p className="text-gray-700">
              Some web browsers have a "Do Not Track" feature. Our Site does not currently respond to Do Not Track signals. You can manage tracking preferences through your browser settings and third-party tools.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">FHIR IQ</p>
              <p className="text-gray-700">Email: <a href="mailto:gene@fhiriq.com" className="text-primary-blue hover:underline">gene@fhiriq.com</a></p>
              <p className="text-gray-700">Website: <a href="https://www.fhiriq.com" className="text-primary-blue hover:underline">www.fhiriq.com</a></p>
              <p className="text-gray-700 mt-4">
                For privacy-related inquiries, please include "Privacy Policy" in the subject line.
              </p>
            </div>
          </section>

          {/* Consent */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Consent</h2>
            <p className="text-gray-700">
              By using our Site, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please discontinue use of our Site immediately.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Leading healthcare interoperability solutions powered by AI and FHIR expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
                <li><Link href="/consulting" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/architectures" className="hover:text-white">Architectures</Link></li>
                <li><Link href="/resources" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-3">&copy; 2025 FHIR IQ. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              FHIR® is a registered trademark of Health Level Seven International (HL7®) and is used with permission.
              Use of this trademark does not constitute endorsement by HL7 or represent any official HL7 initiatives.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
