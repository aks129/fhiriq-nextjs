'use client';

import Link from 'next/link';

export default function Partners() {
  const partners = [
    {
      id: 1,
      name: "HL7 International",
      logo: "🏥", // Replace with actual logo
      description: "Official collaboration on FHIR specification development and implementation guidance.",
      category: "Standards Organization",
      website: "https://hl7.org",
      featured: true
    },
    {
      id: 2,
      name: "HIMSS",
      logo: "🌐", // Replace with actual logo
      description: "Strategic partnership for healthcare IT education and interoperability initiatives.",
      category: "Industry Association",
      website: "https://himss.org",
      featured: true
    },
    {
      id: 3,
      name: "Firely",
      logo: "🔥", // Replace with actual logo
      description: "Technology partnership for FHIR server implementations and SDK integrations.",
      category: "Technology Partner",
      website: "https://fire.ly",
      featured: false
    },
    {
      id: 4,
      name: "Smile Digital Health",
      logo: "😊", // Replace with actual logo
      description: "Joint solutions for enterprise FHIR deployments and compliance frameworks.",
      category: "Technology Partner",
      website: "https://smiledigitalhealth.com",
      featured: false
    },
    {
      id: 5,
      name: "InterSystems",
      logo: "🔗", // Replace with actual logo
      description: "Integration partnership for healthcare data platforms and FHIR repositories.",
      category: "Platform Partner",
      website: "https://intersystems.com",
      featured: false
    },
    {
      id: 6,
      name: "Epic",
      logo: "⚡", // Replace with actual logo
      description: "Certified app partner for Epic App Orchard marketplace integrations.",
      category: "EHR Partner",
      website: "https://epic.com",
      featured: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "FHIR IQ's expertise accelerated our FHIR implementation by 6 months. Their AI tools identified data quality issues we didn't know existed.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "Regional Health Network",
      logo: "🏥",
      metrics: "89% reduction in mapping errors"
    },
    {
      id: 2,
      quote: "The training program transformed our team's understanding of FHIR. We went from struggling with basics to confidently building production apps.",
      author: "Michael Rodriguez",
      role: "Lead Developer",
      company: "HealthTech Solutions",
      logo: "💻",
      metrics: "Team productivity increased 3x"
    },
    {
      id: 3,
      quote: "FHIR IQ's consulting saved us $500K in avoided technical debt. Their architects guided us away from common pitfalls.",
      author: "Dr. Jennifer Park",
      role: "Chief Medical Officer",
      company: "Metro Medical Group",
      logo: "🩺",
      metrics: "$500K in avoided costs"
    },
    {
      id: 4,
      quote: "The AI-powered mapping tool reduced our data transformation time from weeks to days. Game-changing for our interoperability strategy.",
      author: "David Kim",
      role: "CTO",
      company: "Integrated Care Systems",
      logo: "🔧",
      metrics: "80% faster data mapping"
    }
  ];

  const integrations = [
    {
      name: "HAPI FHIR",
      description: "Certified reference implementation",
      status: "Certified"
    },
    {
      name: "Microsoft FHIR Server",
      description: "Azure cloud deployment ready",
      status: "Supported"
    },
    {
      name: "Google Cloud Healthcare API",
      description: "Native GCP integration",
      status: "Certified"
    },
    {
      name: "AWS HealthLake",
      description: "AWS marketplace available",
      status: "Listed"
    },
    {
      name: "IBM FHIR Server",
      description: "LinuxONE optimized",
      status: "Supported"
    },
    {
      name: "Vonk FHIR Server",
      description: "Fire.ly partnership",
      status: "Certified"
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
              <Link href="/podcast" className="text-neutral-gray hover:text-primary-blue font-medium">
                Podcast
              </Link>
              <Link href="/partners" className="text-primary-blue font-semibold">
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
      <section className="bg-gradient-to-r from-primary-green to-primary-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Partners & Ecosystem</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver comprehensive FHIR solutions.
            From standards organizations to technology vendors, we build on proven partnerships.
          </p>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Strategic Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {partners.filter(p => p.featured).map((partner) => (
              <div key={partner.id} className="card text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{partner.logo}</div>
                <h3 className="text-xl font-bold mb-2 text-primary-navy">{partner.name}</h3>
                <div className="bg-bg-accent text-primary-blue px-3 py-1 rounded-full text-sm mb-4 inline-block">
                  {partner.category}
                </div>
                <p className="text-neutral-gray mb-6">{partner.description}</p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Integrations */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Technology Integrations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-primary-navy">{integration.name}</h3>
                  <p className="text-sm text-neutral-gray">{integration.description}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    integration.status === 'Certified'
                      ? 'bg-primary-green text-white'
                      : integration.status === 'Supported'
                      ? 'bg-primary-blue text-white'
                      : 'bg-neutral-gray text-white'
                  }`}>
                    {integration.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{testimonial.logo}</div>
                  <div>
                    <h3 className="font-bold text-primary-navy">{testimonial.author}</h3>
                    <p className="text-sm text-neutral-gray">{testimonial.role}</p>
                    <p className="text-sm text-primary-blue">{testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-neutral-gray mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="bg-bg-accent p-3 rounded">
                  <div className="text-sm font-semibold text-primary-blue">
                    Impact: {testimonial.metrics}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Partners Grid */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Partner Network
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{partner.logo}</div>
                  <div>
                    <h3 className="font-bold text-primary-navy">{partner.name}</h3>
                    <p className="text-sm text-primary-blue">{partner.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-navy">
            Partnership Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Accelerated Implementation</h3>
              <p className="text-neutral-gray">
                Leverage proven integrations and certified solutions to reduce implementation time by 60%.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Reduced Risk</h3>
              <p className="text-neutral-gray">
                Battle-tested partnerships ensure compatibility and long-term support for your FHIR projects.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-3 text-primary-navy">Seamless Integration</h3>
              <p className="text-neutral-gray">
                Pre-built connectors and APIs enable rapid integration with existing healthcare systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Become a Partner
          </h2>
          <p className="text-xl mb-8">
            Join our ecosystem of healthcare technology leaders. Together, we can accelerate
            FHIR adoption and improve healthcare interoperability worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Partner With Us
            </Link>
            <Link
              href="/solutions"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition"
            >
              View Solutions
            </Link>
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
                Building the future of healthcare interoperability through strategic partnerships.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Become a Partner</Link></li>
                <li><a href="#integrations" className="hover:text-white">Integrations</a></li>
                <li><a href="#testimonials" className="hover:text-white">Case Studies</a></li>
                <li><Link href="/solutions" className="hover:text-white">Joint Solutions</Link></li>
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
                <li><Link href="/podcast" className="hover:text-white">Podcast</Link></li>
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