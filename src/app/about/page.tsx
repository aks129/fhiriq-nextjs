import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Eugene Vestel',
  description:
    'Eugene Vestel is a healthcare data expert, NCQA advisor, and host of the Out of the FHIR podcast. 15+ years helping health systems, payers, and vendors navigate FHIR and quality measurement.',
  openGraph: {
    title: 'About Eugene Vestel | FHIR IQ',
    description:
      'Healthcare data expert, NCQA advisor, and host of the Out of the FHIR podcast.',
    url: 'https://fhiriq.com/about',
  },
};

export default function About() {
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
              <Link href="/about" className="text-primary-blue font-semibold">
                About
              </Link>
              <Link href="/contact" className="text-neutral-gray hover:text-primary-blue font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-blue via-bg-3 to-bg-3 text-fg py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-bg rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
              <span className="text-6xl">👨‍💼</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Eugene Vestel, MBA</h1>
            <p className="text-2xl mb-6 text-fg-2">Founder of FHIR IQ</p>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-fg-2">
              Delivering Value from Data & AI in Healthcare | FHIR + Data Strategy + Outcomes
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://www.linkedin.com/in/evestel/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-bg text-primary-blue px-6 py-3 rounded-lg font-semibold hover:bg-bg-2 transition"
            >
              Connect on LinkedIn
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-fg px-6 py-3 rounded-lg font-semibold hover:bg-bg hover:text-primary-blue transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-bg-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-bg rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-fg">About Me</h2>
            <p className="text-lg text-fg-2 leading-relaxed mb-4">
              Most healthcare organizations are drowning in messy, siloed, and underutilized data. They struggle to meet
              interoperability standards, deliver meaningful analytics, or scale innovation—especially when FHIR feels more
              like a compliance burden than an opportunity. That's where I come in.
            </p>
            <p className="text-lg text-fg-2 leading-relaxed">
              I'm the founder of <strong>FHIR IQ</strong>, a healthcare technology company delivering AI-powered data intelligence
              solutions tailored to the real-world challenges of digital health. With over 15 years of experience in healthcare
              data and analytics, I help organizations turn complex FHIR standards into actionable insights and scalable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">Professional Experience</h2>

          <div className="space-y-8">
            {/* FHIR IQ */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-primary-blue">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Founder</h3>
                  <p className="text-xl text-primary-blue font-semibold">FHIR IQ</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">February 2025 - Present</span>
              </div>
              <p className="text-fg-2">
                Leading a healthcare technology company focused on AI-powered data intelligence solutions. Helping organizations
                transform FHIR compliance challenges into strategic opportunities through innovative tools, consulting, and training.
              </p>
            </div>

            {/* Out of the FHIR Podcast */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Host & Producer</h3>
                  <p className="text-xl text-fg font-semibold">Out of the FHIR Podcast</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">June 2025 - Present</span>
              </div>
              <p className="text-fg-2">
                Hosting a podcast exploring the cutting edge of FHIR, healthcare interoperability, and digital health innovation.
                Engaging with industry leaders, innovators, and practitioners to share insights and practical knowledge.
              </p>
            </div>

            {/* Outcomes */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Payer Interoperability Analytics and AI Lead</h3>
                  <p className="text-xl text-fg font-semibold">Outcomes</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">2025 - Present</span>
              </div>
              <p className="text-fg-2">
                Leading payer interoperability analytics and AI initiatives, driving data-driven strategies
                to improve healthcare outcomes through advanced analytics, AI solutions, and interoperability standards.
              </p>
            </div>

            {/* NCQA */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Advisor Consultant</h3>
                  <p className="text-xl text-fg font-semibold">NCQA (National Committee for Quality Assurance)</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">March 2025 - August 2025</span>
              </div>
              <p className="text-fg-2">
                Provided strategic consulting on quality measurement, healthcare data standards, and analytics initiatives
                supporting NCQA's mission to improve healthcare quality.
              </p>
            </div>

            {/* b.well Connected Health */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Director of Data & Analytics</h3>
                  <p className="text-xl text-fg font-semibold">b.well Connected Health</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">January 2022 - March 2025</span>
              </div>
              <p className="text-fg-2 mb-3">
                Led data strategy and analytics for a comprehensive health data platform serving millions of users.
                Managed FHIR implementation, data integration pipelines, and advanced analytics capabilities.
              </p>
              <ul className="list-disc list-inside text-fg-2 space-y-1">
                <li>Architected FHIR-based data ingestion and normalization frameworks</li>
                <li>Built analytics products supporting population health and personalized care</li>
                <li>Led cross-functional teams in delivering data-driven product features</li>
              </ul>
            </div>

            {/* UPMC */}
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-fg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Manager, Strategic Data Management & Operations</h3>
                  <p className="text-xl text-fg font-semibold">UPMC - Quality Analytics</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">February 2017 - January 2022</span>
              </div>
              <p className="text-fg-2 mb-3">
                Managed strategic data initiatives for one of the nation's largest integrated healthcare delivery systems.
                Focused on quality measurement, clinical analytics, and operational intelligence.
              </p>
              <ul className="list-disc list-inside text-fg-2 space-y-1">
                <li>Designed enterprise data models supporting quality reporting and value-based care</li>
                <li>Led implementation of clinical data warehouses and analytics platforms</li>
                <li>Delivered actionable insights improving patient outcomes and operational efficiency</li>
              </ul>
            </div>

            {/* Previous Experience Summary */}
            <div className="bg-bg-2 rounded-lg p-6 border border-line">
              <h3 className="text-xl font-bold text-fg mb-3">Earlier Career Highlights</h3>
              <p className="text-fg-2 mb-3">
                Additional healthcare data and analytics experience includes roles at:
              </p>
              <ul className="list-disc list-inside text-fg-2 space-y-1">
                <li><strong>Allegheny Health Network</strong> - Data analytics and reporting</li>
                <li><strong>Express Scripts / Medco Health Solutions</strong> - Pharmacy benefits analytics</li>
                <li><strong>Duane Reade</strong> - Retail pharmacy operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 bg-gradient-to-br from-bg-2 to-bg-2">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">Areas of Expertise</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-2 text-fg">FHIR Implementation</h3>
              <p className="text-fg-2">
                Deep expertise in FHIR standards, profiles, extensions, and implementation patterns across diverse healthcare use cases.
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-fg">AI & Machine Learning</h3>
              <p className="text-fg-2">
                Applying AI and machine learning to healthcare data challenges, from predictive analytics to intelligent automation.
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2 text-fg">Data Strategy & Architecture</h3>
              <p className="text-fg-2">
                Designing scalable data architectures, warehouses, and platforms that enable analytics and drive business value.
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2 text-fg">Interoperability</h3>
              <p className="text-fg-2">
                Healthcare data exchange, integration patterns, API development, and solving complex interoperability challenges.
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2 text-fg">Analytics & Insights</h3>
              <p className="text-fg-2">
                Building analytics products, dashboards, and reporting solutions that deliver actionable insights from healthcare data.
              </p>
            </div>

            <div className="bg-bg rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-fg">Quality & Outcomes</h3>
              <p className="text-fg-2">
                Quality measurement, value-based care analytics, and data solutions supporting improved patient outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">Education & Certifications</h2>

          <div className="space-y-6">
            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold text-fg">MBA in Healthcare</h3>
                  <p className="text-xl text-fg-2">University of Pittsburgh - Joseph M. Katz Graduate School of Business</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">2017 - 2018</span>
              </div>
            </div>

            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Bachelor's in Business Administration</h3>
                  <p className="text-xl text-fg-2">Brooklyn College</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">2002 - 2006</span>
              </div>
            </div>

            <div className="bg-bg rounded-lg shadow-md p-6 border-l-4 border-line-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold text-fg">Big Data Foundation Certificate</h3>
                  <p className="text-xl text-fg-2">Coursera</p>
                </div>
                <span className="text-fg-2 mt-2 md:mt-0">2017</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Leadership */}
      <section className="py-16 bg-bg-2">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-fg">Community Leadership</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">🎙️</div>
              <h3 className="text-2xl font-bold mb-3 text-fg">Out of the FHIR Podcast</h3>
              <p className="text-fg-2 mb-4">
                Host of a podcast exploring FHIR, healthcare interoperability, and digital health innovation with industry leaders.
              </p>
              <a
                href="/podcast"
                className="text-primary-blue font-semibold hover:underline"
              >
                Listen Now →
              </a>
            </div>

            <div className="bg-bg rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-fg">FHIR Community</h3>
              <p className="text-fg-2 mb-4">
                Active contributor to the FHIR Slack community and regular speaker on FHIR implementation best practices.
              </p>
              <a
                href="https://chat.fhir.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-blue font-semibold hover:underline"
              >
                Join FHIR Chat →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Substack */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-bg-3 text-fg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📰</div>
          <h2 className="text-3xl font-bold mb-4">FHIR IQ Newsletter</h2>
          <p className="text-xl mb-8 text-fg-2">
            Get the latest insights on FHIR, healthcare data, and digital health innovation delivered to your inbox.
          </p>
          <a
            href="https://evestel.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-bg text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-bg-2 transition"
          >
            Subscribe on Substack
          </a>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-fg">
            Let's Work Together
          </h2>
          <p className="text-xl text-fg-2 mb-8">
            Whether you need consulting on FHIR implementation, data strategy, or AI-powered healthcare solutions,
            I'm here to help turn your data challenges into opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/TMvRGiiYfbBKNd889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-blue text-fg px-8 py-3 rounded-lg font-semibold hover:bg-fg transition"
            >
              Schedule a Meeting
            </a>
            <Link
              href="/contact"
              className="inline-block bg-bg-3 text-fg px-8 py-3 rounded-lg font-semibold hover:bg-bg-3 transition"
            >
              Contact Me
            </Link>
          </div>
          <div className="mt-8 text-fg-2">
            <p className="mb-2">📧 eugene.vestel@gmail.com</p>
            <p>📍 Pittsburgh, Pennsylvania</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-2 text-fg py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 FHIR IQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
