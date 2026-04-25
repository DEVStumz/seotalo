'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import './payment.css';

const PLANS = {
  pro: {
    name: 'Pro',
    emoji: '🚀',
    price: 19,
    period: '/month',
    features: ['Unlimited keyword tracks', 'Advanced SEO tools', '24/7 Support', 'Professional reports'],
    badge: 'Most Popular',
  },
  premium: {
    name: 'Premium',
    emoji: '💎',
    price: 39,
    period: '/month',
    features: ['Everything in Pro', 'Custom API access', 'Dedicated account manager'],
    badge: 'Power Users',
  },
};

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planKey = (searchParams.get('plan') || 'pro') as 'pro' | 'premium';
  const plan = PLANS[planKey] || PLANS.pro;

  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
  });
  const [flipped, setFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, raw: string) => {
    let val = raw;
    if (field === 'cardNumber') val = formatCardNumber(raw);
    if (field === 'expiry') val = formatExpiry(raw);
    if (field === 'cvv') val = raw.replace(/\D/g, '').slice(0, 4);
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Cardholder name required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
    if (form.expiry.length < 5) e.expiry = 'Enter expiry MM/YY';
    if (form.cvv.length < 3) e.cvv = 'Enter CVV';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setProcessing(true);
    setTimeout(() => router.push('/dashboard'), 2200);
  };

  const last4 = form.cardNumber.replace(/\s/g, '').slice(-4) || '••••';
  const cardName = form.name || 'YOUR NAME';
  const expiry = form.expiry || 'MM/YY';

  return (
    <main className="pay-root">
      <div className="pay-grid-overlay" />
      <div className="pay-star pay-star--lg"><img src="/concave-star.svg" alt="" /></div>
      <div className="pay-star pay-star--sm"><img src="/concave-star.svg" alt="" /></div>

      {/* Nav */}
      <nav className="pay-nav">
        <Link href="/onboarding" className="pay-back">← Back</Link>
        <span className="pay-logo">SEOtalo</span>
        <div className="pay-secure">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0L0 2.5V6.5C0 9.9 2.55 13.08 6 14C9.45 13.08 12 9.9 12 6.5V2.5L6 0Z" fill="currentColor" opacity=".4"/><path d="M4.5 7.5L5.5 8.5L7.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          256-bit SSL
        </div>
      </nav>

      <div className="pay-layout">

        {/* ── LEFT: Form ── */}
        <div className="pay-form-col">
          <div className="pay-form-card glass-card">

            <div className="pay-header">
              <p className="pay-eyebrow">Secure Checkout</p>
              <h2 className="pay-title">Payment Details</h2>
            </div>

            {/* Credit Card Visual */}
            <div
              className={`pay-card-visual ${flipped ? 'pay-card-visual--flipped' : ''}`}
              onClick={() => setFlipped(f => !f)}
            >
              <div className="pay-card-front">
                <div className="pay-card-chip" />
                <div className="pay-card-logo">{plan.emoji}</div>
                <div className="pay-card-number">
                  {form.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="pay-card-bottom">
                  <div>
                    <div className="pay-card-label">Card Holder</div>
                    <div className="pay-card-value">{cardName}</div>
                  </div>
                  <div>
                    <div className="pay-card-label">Expires</div>
                    <div className="pay-card-value">{expiry}</div>
                  </div>
                </div>
              </div>
              <div className="pay-card-back">
                <div className="pay-card-stripe" />
                <div className="pay-card-cvv-row">
                  <span className="pay-card-label">CVV</span>
                  <div className="pay-card-cvv-box">{form.cvv || '•••'}</div>
                </div>
                <p className="pay-card-hint">Click to flip</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="pay-fields">
              <div className="pay-field">
                <label className="pay-label">Email address</label>
                <input
                  className={`pay-input ${errors.email ? 'pay-input--err' : ''}`}
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                {errors.email && <span className="pay-err">{errors.email}</span>}
              </div>

              <div className="pay-field">
                <label className="pay-label">Cardholder name</label>
                <input
                  className={`pay-input ${errors.name ? 'pay-input--err' : ''}`}
                  placeholder="Alex Rivera"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                />
                {errors.name && <span className="pay-err">{errors.name}</span>}
              </div>

              <div className="pay-field">
                <label className="pay-label">Card number</label>
                <input
                  className={`pay-input pay-input--mono ${errors.cardNumber ? 'pay-input--err' : ''}`}
                  placeholder="0000 0000 0000 0000"
                  value={form.cardNumber}
                  onChange={e => handleChange('cardNumber', e.target.value)}
                />
                {errors.cardNumber && <span className="pay-err">{errors.cardNumber}</span>}
              </div>

              <div className="pay-row-2">
                <div className="pay-field">
                  <label className="pay-label">Expiry</label>
                  <input
                    className={`pay-input pay-input--mono ${errors.expiry ? 'pay-input--err' : ''}`}
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={e => handleChange('expiry', e.target.value)}
                    onFocus={() => setFlipped(false)}
                  />
                  {errors.expiry && <span className="pay-err">{errors.expiry}</span>}
                </div>
                <div className="pay-field">
                  <label className="pay-label">CVV</label>
                  <input
                    className={`pay-input pay-input--mono ${errors.cvv ? 'pay-input--err' : ''}`}
                    placeholder="•••"
                    value={form.cvv}
                    onChange={e => handleChange('cvv', e.target.value)}
                    onFocus={() => setFlipped(true)}
                    onBlur={() => setFlipped(false)}
                  />
                  {errors.cvv && <span className="pay-err">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            <button
              className={`pay-submit ${processing ? 'pay-submit--loading' : ''}`}
              onClick={handleSubmit}
              disabled={processing}
            >
              {processing ? (
                <span className="pay-spinner-row">
                  <span className="pay-spinner" /> Processing payment…
                </span>
              ) : (
                `Pay $${plan.price}.00 → Launch Dashboard`
              )}
            </button>

            <p className="pay-legal">
              By completing payment you agree to our <span>Terms of Service</span>. Cancel anytime.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="pay-summary-col">
          <div className="pay-summary glass-card">
            <p className="pay-eyebrow">Order Summary</p>

            <div className="pay-plan-badge-row">
              <span className="pay-plan-emoji">{plan.emoji}</span>
              <div>
                <div className="pay-plan-name">SEOtalo {plan.name}</div>
                <div className="pay-plan-badge">{plan.badge}</div>
              </div>
            </div>

            <ul className="pay-feature-list">
              {plan.features.map(f => (
                <li key={f}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="white" fillOpacity=".1"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="pay-divider" />

            <div className="pay-price-rows">
              <div className="pay-price-row">
                <span>Subtotal</span>
                <span>${plan.price}.00</span>
              </div>
              <div className="pay-price-row">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="pay-price-row pay-price-row--total">
                <span>Total today</span>
                <span>${plan.price}.00</span>
              </div>
            </div>

            <div className="pay-renewal">
              Renews automatically at ${plan.price}/month. Cancel anytime.
            </div>

            {/* Trust badges */}
            <div className="pay-trust">
              <div className="pay-trust-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 0L0 3.33V8.67C0 12.53 3.4 16.11 8 17.33C12.6 16.11 16 12.53 16 8.67V3.33L8 0Z" fill="currentColor" opacity=".3"/><path d="M5.5 8.5L7 10L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                SSL Secured
              </div>
              <div className="pay-trust-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.2" opacity=".5"/></svg>
                Encrypted
              </div>
              <div className="pay-trust-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.8 5.5L15 6.1L11.2 9.5L12.4 14.5L8 11.8L3.6 14.5L4.8 9.5L1 6.1L6.2 5.5L8 1Z" stroke="currentColor" strokeWidth="1.2" opacity=".5"/></svg>
                5-star rated
              </div>
            </div>
          </div>

          {/* Plan switcher */}
          <div className="pay-switcher">
            <p className="pay-switcher-label">Wrong plan?</p>
            {planKey === 'pro' ? (
              <Link href="/payment?plan=premium" className="pay-switch-link">Upgrade to Premium ($39/mo) →</Link>
            ) : (
              <Link href="/payment?plan=pro" className="pay-switch-link">Switch to Pro ($19/mo) →</Link>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}