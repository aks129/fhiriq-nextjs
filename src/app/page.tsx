'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image?: string;
  category: string;
  popular: boolean;
  sku: string;
}

interface BlogPost {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  publishedDate: string;
  author?: string;
  slug?: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    initializePage();
    initializeAnalytics();
  }, []);

  async function initializePage() {
    try {
      console.log('Initializing FHIR IQ Home page...');

      await Promise.all([
        loadFeaturedProducts(),
        loadRecentBlogPosts()
      ]);

      console.log('Home page initialization complete');
    } catch (error) {
      console.error('Home page initialization error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFeaturedProducts() {
    try {
      // For now, use mock data - replace with actual API call
      const mockProducts: Product[] = [
        {
          _id: '1',
          name: 'FHIR Developer License - Professional',
          description: 'Advanced FHIR validation and code generation tools for professional developers.',
          price: 799,
          originalPrice: 999,
          currency: 'USD',
          image: '/images/fhir-dev-license.jpg',
          category: 'license',
          popular: true,
          sku: 'FHIR-DEV-PRO-1Y'
        },
        {
          _id: '2',
          name: 'FHIR Training - Fundamentals',
          description: 'Comprehensive FHIR training course covering fundamentals and best practices.',
          price: 299,
          currency: 'USD',
          image: '/images/fhir-training.jpg',
          category: 'training',
          popular: false,
          sku: 'FHIR-TRN-FND'
        },
        {
          _id: '3',
          name: 'FHIR Consultation Package',
          description: 'Expert consultation services for FHIR implementation and optimization.',
          price: 1500,
          currency: 'USD',
          image: '/images/fhir-consultation.jpg',
          category: 'consulting',
          popular: true,
          sku: 'FHIR-CON-PKG'
        }
      ];

      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  }

  async function loadRecentBlogPosts() {
    try {
      // For now, use mock data - replace with actual API call
      const mockBlogPosts: BlogPost[] = [
        {
          _id: '1',
          title: 'Getting Started with FHIR R4',
          excerpt: 'Learn the fundamentals of FHIR R4 and how to implement healthcare interoperability.',
          featuredImage: '/images/blog-fhir-r4.jpg',
          publishedDate: '2024-01-15',
          author: 'FHIR IQ Team',
          slug: 'getting-started-fhir-r4'
        },
        {
          _id: '2',
          title: 'AI-Powered FHIR Application Development',
          excerpt: 'Discover how AI can accelerate your FHIR application development process.',
          featuredImage: '/images/blog-ai-fhir.jpg',
          publishedDate: '2024-01-10',
          author: 'FHIR IQ Team',
          slug: 'ai-powered-fhir-development'
        },
        {
          _id: '3',
          title: 'FHIR Security Best Practices',
          excerpt: 'Essential security considerations when implementing FHIR-based healthcare systems.',
          featuredImage: '/images/blog-fhir-security.jpg',
          publishedDate: '2024-01-05',
          author: 'FHIR IQ Team',
          slug: 'fhir-security-best-practices'
        }
      ];

      setBlogPosts(mockBlogPosts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  }

  function initializeAnalytics() {
    try {
      // Track page view
      trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
      });

      // Track scroll depth
      let scroll25Tracked = false;
      let scroll50Tracked = false;
      let scroll75Tracked = false;
      let scroll90Tracked = false;

      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent >= 25 && !scroll25Tracked) {
          trackEvent('scroll_depth', { depth: 25 });
          scroll25Tracked = true;
        }
        if (scrollPercent >= 50 && !scroll50Tracked) {
          trackEvent('scroll_depth', { depth: 50 });
          scroll50Tracked = true;
        }
        if (scrollPercent >= 75 && !scroll75Tracked) {
          trackEvent('scroll_depth', { depth: 75 });
          scroll75Tracked = true;
        }
        if (scrollPercent >= 90 && !scroll90Tracked) {
          trackEvent('scroll_depth', { depth: 90 });
          scroll90Tracked = true;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  }

  async function handleNewsletterSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!newsletterEmail) {
      alert('Please enter your email address');
      return;
    }

    if (!isValidEmail(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);

    try {
      // TODO: Implement newsletter subscription API
      console.log('Newsletter signup:', newsletterEmail);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
      trackEvent('newsletter_signup', { email: newsletterEmail });
    } catch (error) {
      console.error('Newsletter signup error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  }

  function trackEvent(eventName: string, properties: any = {}) {
    try {
      console.log('Track event:', eventName, properties);

      // Example implementation for Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, properties);
      }

      // Example implementation for PostHog
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture(eventName, properties);
      }
    } catch (error) {
      console.error('Event tracking error:', error);
    }
  }

  function formatPrice(price: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered FHIR Development Platform
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Accelerate your healthcare interoperability projects with our advanced FHIR tools,
            AI-powered code generation, and expert consulting services.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/builder"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'start_building' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Building
            </Link>
            <Link
              href="/products"
              onClick={() => trackEvent('hero_cta_clicked', { button: 'view_products' })}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => {
                  trackEvent('product_clicked', {
                    productId: product._id,
                    productName: product.name,
                    category: product.category
                  });
                }}
              >
                <div className="h-48 bg-gray-200">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(product.price, product.currency)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through">
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                      )}
                    </div>
                    {product.popular && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Blog Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => {
                  trackEvent('blog_post_clicked', {
                    postId: post._id,
                    postTitle: post.title
                  });
                }}
              >
                <div className="h-48 bg-gray-200">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with FHIR IQ</h2>
          <p className="text-xl mb-8">
            Get the latest insights, tutorials, and product updates delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              required
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                <li><Link href="/products" className="hover:text-white">Developer Licenses</Link></li>
                <li><Link href="/products" className="hover:text-white">Training Courses</Link></li>
                <li><Link href="/products" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/builder" className="hover:text-white">AI Builder</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
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
