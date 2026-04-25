'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './dashboard.css';

// ─── Mock data ────────────────────────────────────────────────────────────────
const KEYWORDS = [
  { kw: 'seo analytics tool',       pos: 3,  prev: 5,  volume: 12400, traffic: 3800, diff: 'Easy'   },
  { kw: 'rank tracking software',   pos: 7,  prev: 11, volume: 8200,  traffic: 1200, diff: 'Medium' },
  { kw: 'best seo platform 2025',   pos: 1,  prev: 2,  volume: 6500,  traffic: 4100, diff: 'Hard'   },
  { kw: 'backlink monitor',         pos: 12, prev: 9,  volume: 5100,  traffic: 610,  diff: 'Easy'   },
  { kw: 'technical seo audit',      pos: 4,  prev: 4,  volume: 9800,  traffic: 2200, diff: 'Medium' },
  { kw: 'keyword research free',    pos: 18, prev: 22, volume: 32000, traffic: 890,  diff: 'Hard'   },
  { kw: 'google search console api',pos: 6,  prev: 7,  volume: 4300,  traffic: 940,  diff: 'Medium' },
  { kw: 'seo reporting dashboard',  pos: 2,  prev: 5,  volume: 7100,  traffic: 3100, diff: 'Easy'   },
];

const TRAFFIC_DATA = [18, 24, 21, 35, 42, 38, 55, 60, 52, 70, 78, 82];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ISSUES = [
  { label: 'Missing meta descriptions', count: 14, sev: 'high' },
  { label: 'Broken internal links',     count: 3,  sev: 'high' },
  { label: 'Slow page speed (>3s)',     count: 7,  sev: 'med'  },
  { label: 'Missing alt text',          count: 28, sev: 'low'  },
  { label: 'Duplicate title tags',      count: 2,  sev: 'med'  },
];

const BACKLINKS = [
  { domain: 'techcrunch.com',    da: 94, type: 'Dofollow', date: '2 days ago'   },
  { domain: 'producthunt.com',  da: 90, type: 'Dofollow', date: '5 days ago'   },
  { domain: 'dev.to',           da: 78, type: 'Nofollow',  date: '1 week ago'   },
  { domain: 'medium.com',       da: 95, type: 'Nofollow',  date: '2 weeks ago'  },
];

const NAV_ITEMS = [
  { icon: '▦', label: 'Overview',   active: true  },
  { icon: '◎', label: 'Keywords',   active: false },
  { icon: '⬡', label: 'Backlinks',  active: false },
  { icon: '⚙', label: 'Technical',  active: false },
  { icon: '📄', label: 'Reports',   active: false },
  { icon: '⚙', label: 'Settings',  active: false },
];

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const w = 280, h = 80;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h * 0.85 - 4}`).join(' ');
  const area = `M0,${h} L${pts.split(' ').map((p, i) => (i === 0 ? `${p}` : p)).join(' L')} L${w},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="db-chart-svg">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${area}`} fill="url(#chartGrad)" />
      <polyline points={pts} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counters, setCounters] = useState({ traffic: 0, keywords: 0, backlinks: 0, score: 0 });

  // Animate counters on mount
  useEffect(() => {
    const targets = { traffic: 82400, keywords: 248, backlinks: 1847, score: 94 };
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        traffic:   Math.round(targets.traffic   * ease),
        keywords:  Math.round(targets.keywords  * ease),
        backlinks: Math.round(targets.backlinks * ease),
        score:     Math.round(targets.score     * ease),
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const diffColor = (d: string) => d === 'Easy' ? '#4ade80' : d === 'Medium' ? '#facc15' : '#f87171';
  const posChange = (curr: number, prev: number) => {
    const delta = prev - curr;
    if (delta > 0) return <span className="db-pos-up">↑{delta}</span>;
    if (delta < 0) return <span className="db-pos-down">↓{Math.abs(delta)}</span>;
    return <span className="db-pos-flat">—</span>;
  };

  return (
    <div className="db-root">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="db-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`db-sidebar ${sidebarOpen ? 'db-sidebar--open' : ''}`}>
        <div className="db-sidebar-top">
          <Link href="/" className="db-sidebar-logo">SEOtalo</Link>
          <button className="db-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="db-sidebar-site">
          <div className="db-site-dot" />
          <div>
            <div className="db-site-name">mywebsite.com</div>
            <div className="db-site-status">Live · Tracking</div>
          </div>
        </div>

        <nav className="db-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              className={`db-nav-item ${activeNav === item.label ? 'db-nav-item--active' : ''}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
            >
              <span className="db-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="db-sidebar-footer">
          <div className="db-plan-chip">🚀 Pro Plan</div>
          <Link href="/" className="db-signout">Sign out</Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="db-main">

        {/* Top bar */}
        <header className="db-topbar">
          <button className="db-menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="db-topbar-title">
            <h1 className="db-page-title">{activeNav}</h1>
            <p className="db-page-sub">Last updated: just now</p>
          </div>
          <div className="db-topbar-right">
            <div className="db-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="db-search-input" placeholder="Search keywords…" />
            </div>
            <div className="db-avatar">AR</div>
          </div>
        </header>

        <div className="db-content">

          {/* ── Stat cards ── */}
          <div className="db-stats">
            <div className="db-stat-card db-reveal">
              <div className="db-stat-label">Monthly Traffic</div>
              <div className="db-stat-val">{counters.traffic.toLocaleString()}</div>
              <div className="db-stat-delta db-delta--up">↑ 24.3% vs last month</div>
              <MiniChart data={TRAFFIC_DATA} />
            </div>

            <div className="db-stat-card db-reveal" style={{ animationDelay: '80ms' }}>
              <div className="db-stat-label">Keywords Tracked</div>
              <div className="db-stat-val">{counters.keywords}</div>
              <div className="db-stat-delta db-delta--up">↑ 12 new this week</div>
            </div>

            <div className="db-stat-card db-reveal" style={{ animationDelay: '160ms' }}>
              <div className="db-stat-label">Backlinks</div>
              <div className="db-stat-val">{counters.backlinks.toLocaleString()}</div>
              <div className="db-stat-delta db-delta--up">↑ 38 new this month</div>
            </div>

            <div className="db-stat-card db-reveal" style={{ animationDelay: '240ms' }}>
              <div className="db-stat-label">Health Score</div>
              <div className="db-stat-val">{counters.score}<span className="db-stat-unit">/100</span></div>
              <div className="db-score-bar">
                <div className="db-score-fill" style={{ width: `${counters.score}%` }} />
              </div>
            </div>
          </div>

          {/* ── Bottom grid ── */}
          <div className="db-grid">

            {/* Keywords table */}
            <div className="db-card db-card--wide db-reveal">
              <div className="db-card-header">
                <div>
                  <h3 className="db-card-title">Top Keywords</h3>
                  <p className="db-card-sub">Ranking positions across tracked terms</p>
                </div>
                <button className="db-card-action">+ Add keyword</button>
              </div>
              <div className="db-table-wrap">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Position</th>
                      <th>Change</th>
                      <th>Volume</th>
                      <th>Traffic</th>
                      <th>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KEYWORDS.map((k, i) => (
                      <tr key={i}>
                        <td className="db-kw-cell">{k.kw}</td>
                        <td><span className="db-pos-badge">#{k.pos}</span></td>
                        <td>{posChange(k.pos, k.prev)}</td>
                        <td className="db-num">{k.volume.toLocaleString()}</td>
                        <td className="db-num">{k.traffic.toLocaleString()}</td>
                        <td><span className="db-diff-badge" style={{ color: diffColor(k.diff), borderColor: diffColor(k.diff) }}>{k.diff}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical issues */}
            <div className="db-card db-reveal" style={{ animationDelay: '100ms' }}>
              <div className="db-card-header">
                <div>
                  <h3 className="db-card-title">Technical Issues</h3>
                  <p className="db-card-sub">54 total · 17 critical</p>
                </div>
                <span className="db-badge-alert">!</span>
              </div>
              <div className="db-issues-list">
                {ISSUES.map((iss, i) => (
                  <div key={i} className="db-issue-row">
                    <div className={`db-issue-dot db-issue-dot--${iss.sev}`} />
                    <span className="db-issue-label">{iss.label}</span>
                    <span className="db-issue-count">{iss.count}</span>
                  </div>
                ))}
              </div>
              <button className="db-fix-btn">Run full audit →</button>
            </div>

            {/* Recent backlinks */}
            <div className="db-card db-reveal" style={{ animationDelay: '180ms' }}>
              <div className="db-card-header">
                <div>
                  <h3 className="db-card-title">New Backlinks</h3>
                  <p className="db-card-sub">Recently discovered referring domains</p>
                </div>
              </div>
              <div className="db-backlinks-list">
                {BACKLINKS.map((bl, i) => (
                  <div key={i} className="db-backlink-row">
                    <div className="db-bl-domain">
                      <div className="db-bl-favicon">{bl.domain[0].toUpperCase()}</div>
                      <div>
                        <div className="db-bl-name">{bl.domain}</div>
                        <div className="db-bl-date">{bl.date}</div>
                      </div>
                    </div>
                    <div className="db-bl-right">
                      <span className="db-bl-da">DA {bl.da}</span>
                      <span className={`db-bl-type ${bl.type === 'Dofollow' ? 'db-bl-type--do' : 'db-bl-type--no'}`}>{bl.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="db-card db-reveal" style={{ animationDelay: '260ms' }}>
              <h3 className="db-card-title" style={{ marginBottom: '16px' }}>Quick Actions</h3>
              <div className="db-quick-actions">
                <button className="db-qa-btn">
                  <span className="db-qa-icon">📊</span>
                  <span className="db-qa-label">Export Report</span>
                </button>
                <button className="db-qa-btn">
                  <span className="db-qa-icon">🔗</span>
                  <span className="db-qa-label">Connect GSC</span>
                </button>
                <button className="db-qa-btn">
                  <span className="db-qa-icon">⚙️</span>
                  <span className="db-qa-label">Run Audit</span>
                </button>
                <button className="db-qa-btn">
                  <span className="db-qa-icon">➕</span>
                  <span className="db-qa-label">Add Domain</span>
                </button>
              </div>

              {/* Upgrade nudge for non-premium */}
              <div className="db-upgrade-card">
                <div className="db-upgrade-emoji">💎</div>
                <div>
                  <div className="db-upgrade-title">Upgrade to Premium</div>
                  <div className="db-upgrade-sub">Unlock API access & dedicated support</div>
                </div>
                <Link href="/payment?plan=premium" className="db-upgrade-btn">→</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}