'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

{/*Logos */}
const logos = [
  { name: 'Google', src: '/logos/icons8-google-30.png' },
  { name: 'Pinterest', src: '/logos/icons8-pinterest-24.png' },
  { name: 'Apple', src: '/logos/icons8-apple-30.png' },
  { name: 'Adobe', src: '/logos/icons8-adobe-30.png' },
  { name: 'LinkedIn', src: '/logos/icons8-linkedin-30.png' },
  { name: 'Microsoft', src: '/logos/icons8-microsoft-30.png' },
];


  // FAQ state INSIDE the main component

  const faqData = [
    {
      question: "What services are included?",
      answer: "Our core services include full-site SEO audits, keyword research, backlink monitoring, and automated technical issue fixing."
    },
    {
      question: "How do I rank additional services?",
      answer: "By using additional tokens or upgrading your plan, you can add multiple domains and service categories to your dashboard for real-time tracking."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, we offer a month-to-month subscription model. You can cancel or downgrade your plan at any time through your account settings without penalties."
    },
    {
      question: "Do you provide guarantees?",
      answer: "While SEO results vary by industry, we guarantee a 100% technical health score on our platform and provide 24/7 support to help you achieve your traffic goals."
    },
    {
      question: "How can I contact you?",
      answer: "Our support team is available via live chat in the dashboard, or you can email us directly at support@seo-ai.com for high-priority technical inquiries."
    }
  ];


export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ─── Scroll animation hook ───────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Special class triggers for compound animations
            if (entry.target.classList.contains('proof-cards-trigger')) {
              entry.target.classList.add('proof-cards-visible');
            }
            if (entry.target.classList.contains('pills-trigger')) {
              entry.target.classList.add('pills-visible');
            }
            if (entry.target.classList.contains('footer-brand-trigger')) {
              entry.target.classList.add('footer-brand-visible');
            }

            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(
      '.reveal, .stagger-children, .proof-cards-trigger, .pills-trigger, .footer-brand-trigger'
    ).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <main>   
      {/*  Section 1. */}
      <section className="hero-container position-relative overflow-hidden bg-black d-flex min-vh-100">
  
        <div className="grid-overlay position-absolute w-100 h-100"></div>
        
        <div className="container position-relative z-1 my-auto">
          <div className="row align-items-center">

            <div className="col-md-6">
              <div className="d-flex align-items-center mb-4 hero-badge-anim">
                <span className="badge-version fw-medium bg-white rounded-pill me-2 py-1 px-3" style={{ fontSize: '0.75rem' }}>v1.0</span>
                <div className="badge-pill-custom px-3 py-1 d-flex align-items-center">
                  <small className="text-light opacity-75"> is now live in all countries →</small>
                </div>
              </div>

              <h1 className="hero-title text-white fw-bold mb-3 mt-2 display-4 hero-title-anim">
                Boost your <br />
                website's SEO
              </h1>

              <p className="hero-subtitle text-secondary mb-5 hero-sub-anim">
                Best analytics app for agencies, consultants, <br className="d-none d-md-block" />
                affiliates, e-commerce, and more.
              </p>

              <div className="d-flex flex-column flex-sm-row align-items-center gap-3 hero-btns-anim">
                <Link href="/onboarding" className="btn btn-light rounded-2 px-4 py-2 fw-semibold">
                  Start a Free Trial <span className="ms-1">→</span>
                </Link>

                <button className="btn btn-outline-light rounded-2 px-4 py-2">
                  Watch Demo <span className="ms-1 small">▶</span>
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="star-wrapper star-lg position-absolute">
                <img src="/concave-star.svg" alt="Chrome Star Large" className="w-100 h-100"/>
              </div>

              <div className="star-wrapper star-md position-absolute">
                <img src="/concave-star.svg" alt="Chrome Star Medium" className="w-100 h-100"/>
              </div>

              <div className="star-wrapper star-sm position-absolute">
                <img src="/concave-star.svg" alt="Chrome Star Small" className="w-100 h-100"/>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2. */}
      <section className="bg-black py-2">
        <div className="logos-slider-container w-100 overflow-hidden d-flex align-items-center">
          <div className="logos-slider-track d-flex gap-5">

            {/* Track 1 */}
            {logos.map((logo, index) => (
              <div key={index} className="logo-item d-flex align-items-center">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ maxHeight: '25px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
                <span className="logo-name">{logo.name}</span>
              </div>
            ))}

             {/* Track 2 */}
            {logos.map((logo, index) => (
              <div key={index} className="logo-item d-flex align-items-center">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ maxHeight: '25px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
                <span className="logo-name">{logo.name}</span>
              </div>
            ))}

             {/* Track 3 */}
            {logos.map((logo, index) => (
              <div key={index} className="logo-item d-flex align-items-center">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ maxHeight: '25px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
                <span className="logo-name">{logo.name}</span>
              </div>
            ))}

             {/* Track 4 */}
            {logos.map((logo, index) => (
              <div key={index} className="logo-item d-flex align-items-center">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ maxHeight: '25px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
                <span className="logo-name">{logo.name}</span>
              </div>
            ))}

             {/* Track 5 */}
            {logos.map((logo, index) => (
              <div key={index} className="logo-item d-flex align-items-center">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ maxHeight: '25px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
                <span className="logo-name">{logo.name}</span>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/** Section 3. **/}
      <section className="bg-black py-5 text-white">
        <div className="container mb-3">
          <div className="mb-5 reveal">
            <span className="badge rounded-pill border border-secondary mb-3 px-3 py-2 text-secondary small">
              Features
            </span>

            <h2 className="display-4 fw-bold mb-3 tracking-tight">
              SEO Tool That <br /> Delivers Real Results
            </h2>

            <p className="text-secondary col-md-6">
              Get accurate and timely data, see where your website rankings stand, 
              track your visits and technical issues.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="row g-3 g-lg-4">
            <div className="col-12 col-lg-8 reveal">
              <div className="feature-card glass-card h-100 p-4 overflow-hidden">
                <div className="feature-content mt-auto overflow-hidden rounded">
                  <img src="/images/keyword.jpeg" className="keyword-graph-img img-fluid" alt="keyword tracking" />
                </div>               
              </div>
            </div>

            <div className="col-12 col-lg-4 reveal reveal-delay-2">
              <div className="console feature-card glass-card w-100 h-100 ">
                <img src="/images/console.jpeg" className="img-fluid analytics-rotate mt-2 mb-2" alt="Analytics Graph" />
              </div>
            </div>

            <div className="col-12 col-lg-4 reveal">
              <div className="feature-card glass-card h-100 p-4 text-center d-flex flex-column justify-content-center">
                <button className="btn btn-outline-light btn-midium rounded-pill mx-auto px-4 p-2 mt-4">Connect →</button>
                <div className="mt-3 mb-4">
                    <div className="google-logo-bg mb-2" style={{ fontSize: "3rem", fontWeight: "600"}}>Google</div>
                    <h6 style={{ opacity: "0.5"}}>Search Console</h6>
                </div>
                
              </div>
            </div>

            <div className="col-12 col-lg-8 reveal reveal-delay-2 pills-trigger">
              <div className="feature-card glass-card h-100 p-4 justify-content-center align-items-center text-center">
                <div className="pills-stack d-flex flex-column mt-4 align-items-center w-100">
                    <div className="custom-pill">High Traffic Alert</div>
                    <div className="custom-pill ms-4">New Backlink Found</div>
                    <div className="custom-pill">Technical Issue Fixed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4. */}
      <section className="proof bg-black py-5 py-lg-6 text-white overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-12 col-lg-6 mt-0 reveal reveal--left">
              <div className="proof-content">
                <div className="badge rounded-pill border border-secondary mb-3 px-3 py-1 text-secondary small opacity-75">
                  Proof
                </div>

                <h2 className="display-4 fw-bold tracking-tight mb-4 text-white">
                  Proven SEO Results <br /> You Can Trust
                </h2>

                <p className="lead text-secondary opacity-90 col-md-10 fs-5 mb-5">
                  From startups to industry leaders, we've helped businesses 
                  achieve remarkable growth in search visibility and revenue.
                </p>
              </div>
            </div>

            <div className="co-12 col-lg-6 d-flex justify-content-center">
              <div className="mobile-stagger-container position-relative mx-auto proof-cards-trigger">
                
                {/* Card 1: */}
                <div className="result-card stat-mobile-1">
                  <div className="card-inner p-4">
                    <div className="icon-badge mb-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <span className="display-5 fw-bold tracking-tight text-white">200%</span>
                    <p className="small text-secondary mb-0">More traffic</p>
                  </div>
                </div>

                {/* Card 2: */}
                <div className="result-card stat-mobile-2">
                  <div className="card-inner p-4">
                    <div className="icon-badge mb-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <span className="display-5 fw-bold tracking-tight text-white">50K+</span>
                    <p className="small text-secondary mb-0">Monthly Users</p>
                  </div>
                </div>

                {/* Card 3: */}
                <div className="result-card stat-mobile-3">
                  <div className="card-inner p-3">
                    <div className="icon-badge d-flex align-items-center justify-content-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <span className="display-6 fw-bold tracking-tight text-white">7x</span>
                    <p className="small text-secondary mb-0">ROI on SEO</p>
                  </div>
                </div>

                {/* Card 4: */}
                <div className="result-card stat-mobile-4">
                  <div className="card-inner p-3">
                    <div className="icon-badge d-flex align-items-center justify-content-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <span className="display-6 fw-boldtracking-tight text-white ">~20%</span>
                    <p className="small text-secondary mb-0">ROI on SEO</p>
                  </div>
                </div>

                {/* Card 5: */}
                <div className="result-card stat-mobile-5">
                  <div className="card-inner p-3">
                    <div className="icon-badge d-flex align-items-center justify-content-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <span className="display-6 fw-boldtracking-tight text-white ">~20</span>
                    <p className="small text-secondary mb-0">ROI on SEO</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5. */}
      <section className="pricing bg-black py-6 text-white">
        <div className="container">
          
          <div className="mb-2 py-5 reveal">
            <div className="badge rounded-pill border border-secondary mb-3 px-3 py-1 text-secondary small opacity-75">
              Pricing
            </div>

            <h2 className="display-4 fw-bold tracking-tight mb-3">
              Flexible Pricing for <br /> Every Business
            </h2>

            <p className="text-secondary col-md-6">
              Whether you're just starting or looking to scale, we have a plan tailored to your needs.
            </p>
          </div>

          <div className="row g-4 align-items-center price-card stagger-children">
            <div className="col-lg-4 mb-3">
              <div className="pricing-card glass-card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="plan-icon small-glass">📦</div>
                  <h5 className="mb-0 fw-bold">Basic</h5>
                </div>

                <div className="price-tag mb-4">
                  <span className="display-5 fw-bold">$0</span>
                </div>

                <ul className="list-unstyled mb-5 text-secondary small">
                  <li className="mb-3">✓ 5 Keyword tracks</li>
                  <li className="mb-3">✓ Basic analytics</li>
                  <li>✓ Weekly reports</li>
                </ul>

                <Link href="/onboarding" className="btn btn-outline-light w-100 rounded-2 py-2 mt-5">
                  Get Started for Free
                </Link>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="pricing-card featured-card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="plan-icon bg-black text-white rounded-circle p-1">🚀</div>
                  <h5 className="mb-0 fw-bold text-black">Pro</h5>
                </div>

                <div className="price-tag mb-4">
                  <span className="display-5 fw-bold text-black">$19</span>
                  <span className="text-muted small">/month</span>
                </div>

                <ul className="list-unstyled mb-5 text-dark opacity-75 small">
                  <li className="mb-3">✓ Unlimited tracks</li>
                  <li className="mb-3">✓ Advanced SEO tools</li>
                  <li className="mb-3">✓ 24/7 Support</li>
                  <li>✓ Professional reports</li>
                </ul>

                <Link href="/onboarding" className="btn btn-black w-100 rounded-2 py-2 fw-bold text-white">
                  Get Started for Free
                </Link>        
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="pricing-card glass-card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="plan-icon small-glass">💎</div>
                  <h5 className="mb-0 fw-bold">Premium</h5>
                </div>

                <div className="price-tag mb-4">
                  <span className="display-5 fw-bold">$39</span>
                  <span className="text-muted small">/month</span>
                </div>

                <ul className="list-unstyled mb-5 text-secondary small">
                  <li className="mb-3">✓ Everything in Pro</li>
                  <li className="mb-3">✓ Custom API access</li>
                  <li>✓ Dedicated account manager</li>
                </ul>

                <Link href="/onboarding" className="btn btn-outline-light w-100 rounded-2 py-2 mt-5">
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6. */}
      <section className=" testimonial bg-black py-6 text-white overflow-hidden">
        <div className="container p-4">
          
          <div className="mb-5 mt-5 text-md-start reveal">
            <h2 className="display-5 fw-bold tracking-tight mb-3">
              What People Say <br /> About Us
            </h2>
            <p className="text-secondary small opacity-75 col-md-5">
              Join thousands of businesses that have transformed their SEO with our platform.
            </p>
          </div>

          {/* Scrollable Container */}
          <div className="testimonial-scroll-wrapper">
            <div className="testimonial-row d-flex flex-nowrap flex-md-wrap g-4 stagger-children">
              
              {/* Testimonial Card 1 */}
              <div className="testimonial-col">
                <div className="testimonial-card glass-card p-4 h-100">
                  <p className="small text-secondary mb-4">
                    "Industry-led disruption driven by our business. We saw a 200% increase in traffic within the first three months."
                  </p>

                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div className="concave-star-avatar-wrapper bg-secondary rounded-circle">
                      <svg 
                          viewBox="0 0 100 100" 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="star-svg"
                          fill="none" 
                          stroke="none"
                        >
                          <defs>
                            {/* A light chrome gradient seen previously to make the star 'glassy' */}
                            <linearGradient id="avatarChromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                              <stop offset="50%" stopColor="#ffff" stopOpacity="1" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M50 0 C60 30, 70 40, 100 50 C70 60, 60 70, 50 100 C40 70, 30 60, 0 50 C30 40, 40 30, 50 0 Z" 
                            fill="url(#avatarChromeGradient)"
                          />
                      </svg>
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold small">Alex Rivera</h6>
                      <p className="extra-small text-secondary mb-0">CEO, Tech Solutions</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="testimonial-col">
                <div className="testimonial-card glass-card p-4 h-100">
                  <p className="small text-secondary mb-4">
                    "Thanks to SEO-AI, our organic reach has doubled. Our team can finally focus on strategy instead of manual tasks."
                  </p>

                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div className="concave-star-avatar-wrapper bg-secondary rounded-circle">
                      <svg 
                          viewBox="0 0 100 100" 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="star-svg"
                          fill="none" 
                          stroke="none"
                        >
                          <defs>
                            <linearGradient id="avatarChromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                              <stop offset="50%" stopColor="#666666" stopOpacity="1" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M50 0 C60 30, 70 40, 100 50 C70 60, 60 70, 50 100 C40 70, 30 60, 0 50 C30 40, 40 30, 50 0 Z" 
                            fill="url(#avatarChromeGradient)"
                          />
                      </svg>
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold small">Sarah Chen</h6>
                      <p className="extra-small text-secondary mb-0">Marketing Director</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="testimonial-col">
                <div className="testimonial-card glass-card p-4 h-100">
                  <p className="small text-secondary mb-4">
                    "The most intuitive SEO platform we've used. Highly recommend for any startup looking to scale quickly."
                  </p>

                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div className="concave-star-avatar-wrapper bg-secondary rounded-circle">
                      <svg 
                          viewBox="0 0 100 100" 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="star-svg"
                          fill="none" 
                          stroke="none"
                        >
                          <defs>
                            <linearGradient id="avatarChromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                              <stop offset="50%" stopColor="#666666" stopOpacity="1" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M50 0 C60 30, 70 40, 100 50 C70 60, 60 70, 50 100 C40 70, 30 60, 0 50 C30 40, 40 30, 50 0 Z" 
                            fill="url(#avatarChromeGradient)"
                          />
                      </svg>
                    </div>

                    <div>
                      <h6 className="mb-0 fw-bold small">Jake Paul</h6>
                      <p className="extra-small text-secondary mb-0">Founder, Cloudify</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="d-flex justify-content-end gap-2 mt-4 mb-4">
            <button className="btn btn-outline-secondary rounded-circle border-opacity-20">←</button>
            <button className="btn btn-outline-secondary rounded-circle border-opacity-20">→</button>
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION 7 --- */}
      <section className="faq bg-black py-6 text-white">
        <div className="container p-4">
          <div className="row g-5">
            <div className="col-lg-5 p-4 question reveal reveal--left">
              <h2 className="display-4 fw-bold mb-4">Your Questions <br /> Answered</h2>
              <p className="text-secondary"> We've got everything covered. From start-ups basics to tech-stack getting started.</p>
            </div>

            <div className="col-lg-7 mb-4 answer reveal reveal--right">
              <div className="faq-list">
                {faqData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item mb-3 ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    style={{ cursor: 'pointer', borderBottom: '1px solid #333' }}
                  >
                    <div className="faq-question d-flex justify-content-between align-items-center p-4">
                      <span className="fw-bold">{item.question}</span>
                      <div className="toggle-icon">{activeIndex === index ? '−' : '+'}</div>
                    </div>
                    
                    {activeIndex === index && (
                      <div className="faq-answer p-4 pt-0">
                        <p className="mb-0 small opacity-75">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/** SECTION 8 FOOTER */}
      <footer className="bg-black text-white pt-5 pb-4 border-top border-secondary border-opacity-10">
        <div className="container">
          <div className="row gy-5 stagger-children">

            <div className="col-lg-4">
              <h5 className="fw-bold mb-3">SEOtalo.com</h5>
              <p className="text-secondary small mb-4 opacity-75 col-md-10">
                Your entire search engine optimization workflow, <br /> 
                simplified and automated for growth.
              </p>
              <Link href="/onboarding" className="btn btn-light rounded-3 px-4 py-2 fw-bold small">
                Start a free trial ↗
              </Link>
            </div>

            <div className="col-lg-8">
              <div className="row">
                <div className="col-4 col-md-3 ms-auto">
                  <h6 className="small fw-bold mb-4">Legal</h6>
                  <ul className="list-unstyled text-secondary small opacity-75 d-grid gap-2">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Cookie Policy</li>
                  </ul>
                </div>

                <div className="col-4 col-md-3">
                  <h6 className="small fw-bold mb-4">Sales</h6>
                  <ul className="list-unstyled text-secondary small opacity-75 d-grid gap-2">
                    <li>Pricing</li>
                    <li>Enterprise</li>
                    <li>Contact Sales</li>
                  </ul>
                </div>
                
                <div className="col-4 col-md-3">
                  <h6 className="small fw-bold mb-4">Social Media</h6>
                  <div className="d-flex flex-column flex-md-row gap-3 opacity-75">
                    <i className="bi bi-youtube"></i>
                    <i className="bi bi-twitter-x"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-linkedin"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Massive Bottom Brand Mark */}
          <div className="mt-5 pt-5 text-center overflow-hidden footer-brand-trigger">
            <h1 className="footer-brand-display fw-black m-0 p-0 tracking-tighter">
              SEO<span className="brand-outline">talos</span>
            </h1>
          </div>

        </div>
      </footer>
   </main>
  );
};