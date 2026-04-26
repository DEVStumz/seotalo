'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './onboarding.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  websiteUrl: string;
  industry: string;
  teamSize: string;
  goals: string[];
  plan: string;
}

// ─── Step config ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Account', icon: '👤' },
  { id: 2, label: 'Website', icon: '🌐' },
  { id: 3, label: 'Goals',   icon: '🎯' },
  { id: 4, label: 'Plan',    icon: '🚀' },
];

const GOALS = [
  { id: 'traffic',    label: 'Grow Organic Traffic',  icon: '📈' },
  { id: 'rankings',  label: 'Improve Rankings',       icon: '🏆' },
  { id: 'backlinks', label: 'Build Backlinks',        icon: '🔗' },
  { id: 'technical', label: 'Fix Technical Issues',   icon: '⚙️' },
  { id: 'content',   label: 'Optimise Content',       icon: '✍️' },
  { id: 'local',     label: 'Local SEO',              icon: '📍' },
];

const INDUSTRIES = [
  'E-commerce', 'SaaS / Tech', 'Agency', 'Consulting',
  'Media / Publishing', 'Finance', 'Healthcare', 'Other',
];

const TEAM_SIZES = ['Just me', '2–5', '6–20', '21–50', '50+'];

const PLANS = [
  {
    id: 'basic',
    emoji: '📦',
    name: 'Basic',
    price: '$0',
    period: '',
    desc: 'Perfect to get started',
    features: ['5 Keyword tracks', 'Basic analytics', 'Weekly reports'],
    featured: false,
  },
  {
    id: 'pro',
    emoji: '🚀',
    name: 'Pro',
    price: '$19',
    period: '/mo',
    desc: 'Most popular for growing teams',
    features: ['Unlimited tracks', 'Advanced SEO tools', '24/7 Support', 'Professional reports'],
    featured: true,
  },
  {
    id: 'premium',
    emoji: '💎',
    name: 'Premium',
    price: '$39',
    period: '/mo',
    desc: 'For agencies & power users',
    features: ['Everything in Pro', 'Custom API access', 'Dedicated account manager'],
    featured: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  // ✅ All hooks and logic live INSIDE the component
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    websiteUrl: '',
    industry: '',
    teamSize: '',
    goals: [],
    plan: 'pro',
  });

  // Mount animation
  useEffect(() => {
    document.querySelectorAll('.ob-reveal').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 80}ms`;
      el.classList.add('ob-reveal--run');
    });
  }, [step]);

  const goTo = (next: number) => {
    if (animating) return;
    setDirection(next > step ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 260);
  };

  const handleGoal = (id: string) => {
    setForm(f => ({
      ...f,
      goals: f.goals.includes(id) ? f.goals.filter(g => g !== id) : [...f.goals, id],
    }));
  };

  // ✅ handleFinish is INSIDE the component — can access form, setComplete, router
  const handleFinish = () => {
    if (form.plan === 'basic') {
      // Basic is free — show success screen
      setComplete(true);
    } else {
      // Pro or Premium — go to payment page
      router.push(`/payment?plan=${form.plan}`);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  // ── Success screen (Basic plan only) ─────────────────────────────────────
  if (complete) {
    return (
      <main className="ob-root">
        <div className="ob-grid-overlay" />
        <div className="ob-star ob-star--lg"><img src="/concave-star.svg" alt="" /></div>
        <div className="ob-star ob-star--sm"><img src="/concave-star.svg" alt="" /></div>

        <div className="ob-success-wrap">
          <div className="ob-success-card glass-card">
            <div className="ob-success-icon">✦</div>
            <h1 className="ob-success-title">You're all set.</h1>
            <p className="ob-success-sub">
              Your SEOtalo workspace is being created.<br />
              We'll send a confirmation to <strong>{form.email || 'your inbox'}</strong>.
            </p>
            <div className="ob-success-stats">
              <div className="ob-success-stat">
                <span className="ob-success-stat-val">0</span>
                <span className="ob-success-stat-label">Keywords tracked</span>
              </div>
              <div className="ob-success-stat">
                <span className="ob-success-stat-val">0</span>
                <span className="ob-success-stat-label">Issues found</span>
              </div>
              <div className="ob-success-stat">
                <span className="ob-success-stat-val">∞</span>
                <span className="ob-success-stat-label">Potential</span>
              </div>
            </div>
            <Link href="/dashboard" className="btn btn-light rounded-2 px-4 py-2 fw-semibold mt-2">
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Main wizard ───────────────────────────────────────────────────────────
  return (
    <main className="ob-root">
      <div className="ob-grid-overlay" />
      <div className="ob-star ob-star--lg"><img src="/concave-star.svg" alt="" /></div>
      <div className="ob-star ob-star--md"><img src="/concave-star.svg" alt="" /></div>
      <div className="ob-star ob-star--sm"><img src="/concave-star.svg" alt="" /></div>

      {/* Top nav */}
      <nav className="ob-nav">
        <Link href="/" className="ob-logo">SEOtalo</Link>
        <span className="ob-nav-hint text-secondary small opacity-75">
          Step {step} of {STEPS.length}
        </span>
      </nav>

      {/* Progress bar */}
      <div className="ob-progress-wrap">
        <div className="ob-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Step breadcrumbs */}
      <div className="ob-steps-row">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`ob-step-dot ${step === s.id ? 'ob-step-dot--active' : ''} ${step > s.id ? 'ob-step-dot--done' : ''}`}
          >
            <span className="ob-step-dot-icon">{step > s.id ? '✓' : s.icon}</span>
            <span className="ob-step-dot-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div className={`ob-card-wrap ${animating ? (direction === 'forward' ? 'ob-exit-left' : 'ob-exit-right') : ''}`}>
        <div className="ob-card glass-card">

          {/* ── Step 1: Account ── */}
          {step === 1 && (
            <>
              <div className="ob-card-header ob-reveal">
                <p className="ob-eyebrow">Let's get started</p>
                <h2 className="ob-card-title">Create your account</h2>
                <p className="ob-card-sub text-secondary">Free forever. No credit card required.</p>
              </div>

              <div className="ob-form ob-reveal">
                <div className="ob-row-2">
                  <div className="ob-field">
                    <label className="ob-label">First name</label>
                    <input
                      className="ob-input"
                      placeholder="Alex"
                      value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="ob-field">
                    <label className="ob-label">Last name</label>
                    <input
                      className="ob-input"
                      placeholder="Rivera"
                      value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="ob-field ob-reveal">
                  <label className="ob-label">Email address</label>
                  <input
                    className="ob-input"
                    type="email"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>

                <div className="ob-field ob-reveal">
                  <label className="ob-label">Password</label>
                  <div className="ob-input-eye-wrap">
                    <input
                      className="ob-input ob-input--has-eye"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="ob-eye-btn"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="ob-divider ob-reveal">
                  <span>or continue with</span>
                </div>

                <div className="ob-social-row ob-reveal">
                  <button className="ob-social-btn">
                    <img src="/logos/icons8-google-30.png" alt="Google" style={{ height: 18, filter: 'brightness(0) invert(1)' }} />
                    Google
                  </button>
                  <button className="ob-social-btn">
                    <img src="/logos/icons8-github-30.png" alt="GitHub" style={{ height: 18, filter: 'brightness(0) invert(1)' }} />
                    GitHub
                  </button>
                </div>
              </div>

              <div className="ob-actions ob-reveal">
                <button
                  className="btn btn-light rounded-2 px-4 py-2 fw-semibold w-100"
                  onClick={() => goTo(2)}
                >
                  Continue <span className="ms-1">→</span>
                </button>
                <p className="ob-legal">
                  By continuing you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
                </p>
              </div>
            </>
          )}

          {/* ── Step 2: Website ── */}
          {step === 2 && (
            <>
              <div className="ob-card-header ob-reveal">
                <p className="ob-eyebrow">Step 2 of 4</p>
                <h2 className="ob-card-title">Tell us about your site</h2>
                <p className="ob-card-sub text-secondary">We'll run your first audit automatically.</p>
              </div>

              <div className="ob-form ob-reveal">
                <div className="ob-field">
                  <label className="ob-label">Website URL</label>
                  <div className="ob-input-prefix-wrap">
                    <span className="ob-input-prefix">https://</span>
                    <input
                      className="ob-input ob-input--prefixed"
                      placeholder="yourwebsite.com"
                      value={form.websiteUrl}
                      onChange={e => setForm(f => ({ ...f, websiteUrl: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="ob-field ob-reveal">
                  <label className="ob-label">Industry</label>
                  <div className="ob-chip-group">
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind}
                        className={`ob-chip ${form.industry === ind ? 'ob-chip--active' : ''}`}
                        onClick={() => setForm(f => ({ ...f, industry: ind }))}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ob-field ob-reveal">
                  <label className="ob-label">Team size</label>
                  <div className="ob-chip-group">
                    {TEAM_SIZES.map(size => (
                      <button
                        key={size}
                        className={`ob-chip ${form.teamSize === size ? 'ob-chip--active' : ''}`}
                        onClick={() => setForm(f => ({ ...f, teamSize: size }))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ob-actions ob-reveal">
                <button className="ob-back-btn" onClick={() => goTo(1)}>← Back</button>
                <button
                  className="btn btn-light rounded-2 px-4 py-2 fw-semibold flex-grow-1"
                  onClick={() => goTo(3)}
                >
                  Continue <span className="ms-1">→</span>
                </button>
              </div>
            </>
          )}

          {/* ── Step 3: Goals ── */}
          {step === 3 && (
            <>
              <div className="ob-card-header ob-reveal">
                <p className="ob-eyebrow">Step 3 of 4</p>
                <h2 className="ob-card-title">What are your goals?</h2>
                <p className="ob-card-sub text-secondary">Select all that apply — we'll personalise your dashboard.</p>
              </div>

              <div className="ob-goals-grid ob-reveal">
                {GOALS.map(g => (
                  <button
                    key={g.id}
                    className={`ob-goal-card ${form.goals.includes(g.id) ? 'ob-goal-card--active' : ''}`}
                    onClick={() => handleGoal(g.id)}
                  >
                    <span className="ob-goal-icon">{g.icon}</span>
                    <span className="ob-goal-label">{g.label}</span>
                    {form.goals.includes(g.id) && <span className="ob-goal-check">✓</span>}
                  </button>
                ))}
              </div>

              <div className="ob-actions ob-reveal">
                <button className="ob-back-btn" onClick={() => goTo(2)}>← Back</button>
                <button
                  className="btn btn-light rounded-2 px-4 py-2 fw-semibold flex-grow-1"
                  onClick={() => goTo(4)}
                  disabled={form.goals.length === 0}
                >
                  Continue <span className="ms-1">→</span>
                </button>
              </div>
            </>
          )}

          {/* ── Step 4: Plan ── */}
          {step === 4 && (
            <>
              <div className="ob-card-header ob-reveal">
                <p className="ob-eyebrow">Step 4 of 4</p>
                <h2 className="ob-card-title">Choose your plan</h2>
                <p className="ob-card-sub text-secondary">Upgrade or downgrade at any time.</p>
              </div>

              <div className="ob-plans ob-reveal">
                {PLANS.map(p => (
                  <button
                    key={p.id}
                    className={`ob-plan-card ${p.featured ? 'ob-plan-card--featured' : ''} ${form.plan === p.id ? 'ob-plan-card--selected' : ''}`}
                    onClick={() => setForm(f => ({ ...f, plan: p.id }))}
                  >
                    {p.featured && <span className="ob-plan-badge">Most popular</span>}
                    <div className="ob-plan-top">
                      <span className="ob-plan-emoji">{p.emoji}</span>
                      <div>
                        <div className="ob-plan-name">{p.name}</div>
                        <div className="ob-plan-desc">{p.desc}</div>
                      </div>
                      <div className="ob-plan-price">
                        {p.price}<span className="ob-plan-period">{p.period}</span>
                      </div>
                    </div>
                    <ul className="ob-plan-features">
                      {p.features.map(f => <li key={f}>✓ {f}</li>)}
                    </ul>
                    <div className={`ob-plan-selector ${form.plan === p.id ? 'ob-plan-selector--on' : ''}`} />
                  </button>
                ))}
              </div>

              <div className="ob-actions ob-reveal">
                <button className="ob-back-btn" onClick={() => goTo(3)}>← Back</button>
                <button
                  className="btn btn-light rounded-2 px-4 py-2 fw-semibold flex-grow-1"
                  onClick={handleFinish}
                >
                  {form.plan === 'basic' ? 'Launch my workspace ✦' : `Continue to Payment →`}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
}