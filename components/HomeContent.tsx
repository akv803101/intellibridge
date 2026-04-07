'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ApplyModal } from '@/components/ApplyModal'
import { BrandLogo } from '@/components/BrandLogo'
import { MainNavDrawer } from '@/components/MainNavDrawer'
import { MAIN_NAV_ITEMS } from '@/lib/mainNavLinks'

export function HomeContent() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const onScroll = () => {
      const stickyBar = document.getElementById('stickyBar')
      if (!stickyBar) return
      if (window.scrollY > 600) stickyBar.classList.add('show')
      else stickyBar.classList.remove('show')
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
<nav>
  <BrandLogo priority />
  <button
    type="button"
    className="nav-menu-btn"
    aria-expanded={mobileNavOpen}
    aria-controls="site-nav-drawer"
    onClick={() => setMobileNavOpen((o) => !o)}
  >
    <span className="sr-only">{mobileNavOpen ? 'Close menu' : 'Open menu'}</span>
    <span className={`nav-menu-icon ${mobileNavOpen ? 'nav-menu-icon--open' : ''}`} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  </button>
  <ul className="nav-links">
    {MAIN_NAV_ITEMS.map(({ href, label }) => (
      <li key={href}>
        {href === '/blog/' ? (
          <Link href={href}>{label}</Link>
        ) : (
          <a href={href}>{label}</a>
        )}
      </li>
    ))}
  </ul>
  <div className="nav-ctas">
    <a href="http://business.intellibridge.in/" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Corporate Training</a>
    <a href="#" className="btn btn-ghost">Login</a>
    <button type="button" className="btn btn-primary" onClick={() => setApplyOpen(true)}>
      Apply Now →
    </button>
  </div>
</nav>

<MainNavDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        homeActions={{ onApply: () => setApplyOpen(true) }}
      />

<section className="hero">
  <div className="hero-bg"></div>
  <div className="hero-grid"></div>
  <div className="hero-content">
    <div className="hero-badge"><span className="dot"></span> Cohort 5 · Starts 15 June 2026</div>
    <h1>
      Learn Data &amp; AI.
      <br />
      Build Real Systems.
      <br />
      <em>Consult for Real Clients.</em>
    </h1>
    <p className="hero-sub">
      India&apos;s only practitioner-led bootcamp that trains you to build <strong>and</strong> sell Data &amp; AI
      solutions — as an employee, freelancer, or independent consultant.
    </p>
    <div className="hero-ctas">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => setApplyOpen(true)}>
        Apply for Cohort 5 →
      </button>
      <a href="#paths" className="btn btn-outline btn-lg">
        Explore Career Paths
      </a>
    </div>
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">1,200+</div>
        <div className="stat-label">Professionals Placed</div>
      </div>
      <div className="stat">
        <div className="stat-num">6</div>
        <div className="stat-label">Specialisation Tracks</div>
      </div>
      <div className="stat">
        <div className="stat-num">97%</div>
        <div className="stat-label">Satisfaction Rate</div>
      </div>
      <div className="stat">
        <div className="stat-num">40+</div>
        <div className="stat-label">Industry SMEs</div>
      </div>
    </div>
  </div>
</section>

<section className="section-paths" id="paths" style={{ background: 'var(--bg)', padding: '6rem 4%' }}>
  <div className="container">
    <div className="section-label">Two Career Paths</div>
    <h2>
      Get placed. Or build your <em>consulting practice.</em>
    </h2>
    <p className="section-sub">
      Every other bootcamp stops at placement. IntelliBridge gives you a second, equally powerful path — becoming an
      independent Data &amp; AI consultant.
    </p>
    <div className="dual-path">
      <div className="path-card">
        <div className="path-icon" aria-hidden>
          🏢
        </div>
        <h3>Path A — Get Hired</h3>
        <p>
          Land a role as Data Scientist, Data Engineer, BI Analyst, ML Engineer, or AI Developer at top companies.
          Full placement support, mock interviews, and referral network.
        </p>
        <div className="path-tags">
          <span className="path-tag">Resume + LinkedIn</span>
          <span className="path-tag">Mock Interviews</span>
          <span className="path-tag">40+ Hiring Partners</span>
          <span className="path-tag">₹8L+ Avg Hike</span>
        </div>
      </div>
      <div className="path-card path-card--consulting">
        <span className="path-new">NEW</span>
        <div className="path-icon" aria-hidden>
          🚀
        </div>
        <h3>Path B — Consult &amp; Freelance</h3>
        <p>
          Learn to scope, price, and deliver Data &amp; AI projects for real clients. Build a consulting portfolio,
          land your first gig, and grow from solo consultant to micro-agency.
        </p>
        <div className="path-tags">
          <span className="path-tag">Project Scoping</span>
          <span className="path-tag">Client Management</span>
          <span className="path-tag">Pricing Strategy</span>
          <span className="path-tag">Portfolio Building</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="programs" id="programs">
  <div className="container">
    <div className="section-label">Programs</div>
    <h2>
      6 Focused Tracks. <em>Infinite Possibilities.</em>
    </h2>
    <p className="section-sub">
      Five technical tracks built by practitioners. One brand-new consulting track that teaches you to sell what you
      build.
    </p>
    <div className="program-grid">
      <div className="program-card">
        <div className="prog-icon">📊</div>
        <span className="prog-tag tag-ds">Data Science</span>
        <h3>Data Science &amp; ML</h3>
        <p>From Python to production ML. Build real projects in healthcare, finance, and e-commerce.</p>
        <div className="prog-meta">
          <span>⏱ 16 weeks</span>
          <span>🖥 Live + Async</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">🔧</div>
        <span className="prog-tag tag-de">Data Engineering</span>
        <h3>Data Engineering</h3>
        <p>Spark, dbt, Airflow, cloud data stacks. Build scalable pipelines on AWS/GCP/Azure.</p>
        <div className="prog-meta">
          <span>⏱ 14 weeks</span>
          <span>🖥 Live + Async</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">📈</div>
        <span className="prog-tag tag-bi">BI</span>
        <h3>BI &amp; Analytics</h3>
        <p>SQL, Power BI, Tableau, and data storytelling. Translate numbers into strategic decisions.</p>
        <div className="prog-meta">
          <span>⏱ 12 weeks</span>
          <span>🖥 Live + Async</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">🤖</div>
        <span className="prog-tag tag-ai">AI &amp; GenAI</span>
        <h3>Applied AI &amp; GenAI</h3>
        <p>LLMs, RAG, agents, prompt engineering, and AI product thinking for the AI economy.</p>
        <div className="prog-meta">
          <span>⏱ 14 weeks</span>
          <span>🖥 Live + Async</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">⚙️</div>
        <span className="prog-tag tag-auto">Automation</span>
        <h3>AI-Powered Automation</h3>
        <p>RPA, no-code/low-code, Python scripting, and intelligent workflow design.</p>
        <div className="prog-meta">
          <span>⏱ 10 weeks</span>
          <span>🖥 Live + Async</span>
        </div>
      </div>

      <div className="program-card program-highlight">
        <div className="prog-badge-new">NEW TRACK</div>
        <div className="prog-icon">💼</div>
        <span className="prog-tag tag-ai">Consulting</span>
        <h3>Data &amp; AI Consulting</h3>
        <p>
          Learn to scope, price, and deliver AI consulting engagements. Build a portfolio. Land your first paying
          client.
        </p>
        <div className="prog-meta">
          <span>⏱ 10 weeks</span>
          <span>🖥 Live Webinars</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="webinar-section" id="consulting-webinars" style={{ padding: '6rem 4%' }}>
  <div className="container">
    <div className="section-label">Consulting Webinar Series</div>
    <h2>
      Don&apos;t just learn AI. <em>Sell AI.</em>
    </h2>
    <p className="section-sub">
      A 10-episode live series that teaches you the business of Data &amp; AI consulting — scoping, pricing, delivering,
      and growing a practice. India-first use cases throughout.
    </p>
    <div className="web-grid">
      <div className="web-card">
        <div className="web-num">01</div>
        <div>
          <h4>The AI Consulting Landscape in India</h4>
          <p>Market size, salary benchmarks, freelance vs in-house. Deliverable: your personal consulting roadmap.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">02</div>
        <div>
          <h4>Your First Data Audit</h4>
          <p>Assess a company&apos;s data maturity. Live walkthrough with an Indian retailer dataset. Deliverable: audit template.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">03</div>
        <div>
          <h4>Scoping &amp; Pricing AI Projects</h4>
          <p>Write SOWs, estimate effort, set milestones. Indian pricing norms for freelance and agency. Deliverable: SOW template.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">04</div>
        <div>
          <h4>Client-Ready Dashboard Build</h4>
          <p>Consulting simulation: client brief → requirements → build in Power BI / Streamlit → present to stakeholders.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">05</div>
        <div>
          <h4>AI Chatbot for Indian SMEs</h4>
          <p>WhatsApp + LLM chatbot for customer support. Regional language handling, cost optimization, deployment.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">06</div>
        <div>
          <h4>Automating Back-Office with AI Agents</h4>
          <p>Invoice processing, GST reconciliation, data entry automation. Agentic AI for Indian business operations.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">07</div>
        <div>
          <h4>Predictive Analytics for BFSI</h4>
          <p>Loan default prediction, customer churn for NBFCs. Build the model AND the consulting presentation.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">08</div>
        <div>
          <h4>Building Your Consulting Portfolio</h4>
          <p>Portfolio website, LinkedIn positioning, case study writing. Live review of learner portfolios.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">09</div>
        <div>
          <h4>Finding &amp; Closing Your First Clients</h4>
          <p>Cold outreach, Upwork/Toptal strategy, LinkedIn DMs, referral systems. Selling to Indian SMEs and startups.</p>
        </div>
      </div>
      <div className="web-card">
        <div className="web-num">10</div>
        <div>
          <h4>Solo Consultant → Micro-Agency</h4>
          <p>Scaling with freelancers, productizing services, recurring revenue. Guest: an Indian AI consultant who&apos;s done it.</p>
        </div>
      </div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg)' }} id="outcomes">
  <div className="container">
    <div className="section-label">Outcomes</div>
    <h2>
      Real results. <em>Two kinds of success.</em>
    </h2>
    <p className="section-sub">
      Whether you choose employment or consulting — our graduates are building real careers.
    </p>
    <div className="outcome-grid">
      <div className="outcome-card">
        <div className="outcome-num">
          <span>87%</span>
        </div>
        <div className="outcome-desc">New role or promotion within 6 months</div>
      </div>
      <div className="outcome-card">
        <div className="outcome-num">
          <span>₹8L+</span>
        </div>
        <div className="outcome-desc">Average salary hike for career switchers</div>
      </div>
      <div className="outcome-card">
        <div className="outcome-num">
          <span>16 wks</span>
        </div>
        <div className="outcome-desc">Avg time from enrolment to first offer</div>
      </div>
      <div className="outcome-card">
        <div className="outcome-num">
          <span>₹50K+</span>
        </div>
        <div className="outcome-desc">First consulting gig value (consulting track)</div>
      </div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg2)' }} id="why">
  <div className="container">
    <div className="section-label">The IntelliBridge Difference</div>
    <h2>
      Why 1,200+ professionals <em>chose us</em>
    </h2>
    <p className="section-sub">
      Not all bootcamps are equal. Here&apos;s exactly what sets us apart — especially now with the consulting track.
    </p>
    <div className="compare-scroll" style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 14 }}>
      <table className="compare-table">
        <thead>
          <tr>
            <th>What You Get</th>
            <th>Generic Platforms</th>
            <th className="col-head-ib">IntelliBridge ✦</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Instructors</strong>
            </td>
            <td className="col-others">Academics or retired professionals</td>
            <td className="col-ib">Active practitioners with 10+ yrs</td>
          </tr>
          <tr>
            <td>
              <strong>Career Outcomes</strong>
            </td>
            <td className="col-others">Placement only</td>
            <td className="col-ib">Placement OR consulting practice</td>
          </tr>
          <tr>
            <td>
              <strong>Business Skills</strong>
            </td>
            <td className="col-others">None — only tech</td>
            <td className="col-ib">Scoping, pricing, SOWs, client mgmt</td>
          </tr>
          <tr>
            <td>
              <strong>Projects</strong>
            </td>
            <td className="col-others">1 toy project</td>
            <td className="col-ib">6 industry-grade + mock consulting projects</td>
          </tr>
          <tr>
            <td>
              <strong>India Focus</strong>
            </td>
            <td className="col-others">Generic global content</td>
            <td className="col-ib">Indian SMEs, BFSI, GST, regional AI</td>
          </tr>
          <tr>
            <td>
              <strong>1:1 Mentorship</strong>
            </td>
            <td className="col-others">Unavailable or paid add-on</td>
            <td className="col-ib">Unlimited 1:1 calls included</td>
          </tr>
          <tr>
            <td>
              <strong>Post-Graduation</strong>
            </td>
            <td className="col-others">Access cut off</td>
            <td className="col-ib">2 years community + Consulting Circle</td>
          </tr>
          <tr>
            <td>
              <strong>Consulting Community</strong>
            </td>
            <td className="col-others">Doesn&apos;t exist</td>
            <td className="col-ib">Peer reviews, lead sharing, gig matching</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
<section style={{ background: 'var(--bg)' }} id="reviews">
  <div className="container">
    <div className="section-label">Alumni Stories</div>
    <h2>People who <em>made the jump</em></h2>
    <div className="testi-grid">
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">
          &quot;I went from supply chain to landing a Data Analyst role at EY in under 5 months. The industry case studies
          were invaluable.&quot;
        </p>
        <div className="testi-person">
          <div className="testi-avatar">AM</div>
          <div>
            <div className="testi-name">Anjali Mehta</div>
            <div className="testi-role">Data Analyst · EY India</div>
          </div>
        </div>
      </div>
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">
          &quot;The Data Engineering track was hands-down the most practical course I&apos;ve taken. Was building real
          Airflow DAGs by week 3.&quot;
        </p>
        <div className="testi-person">
          <div className="testi-avatar">SK</div>
          <div>
            <div className="testi-name">Siddharth Kumar</div>
            <div className="testi-role">Data Engineer · Infosys</div>
          </div>
        </div>
      </div>
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">
          &quot;The mentors teach you how to think about data problems. That mindset shift got me promoted to BI Lead
          within a year.&quot;
        </p>
        <div className="testi-person">
          <div className="testi-avatar">RP</div>
          <div>
            <div className="testi-name">Renu Pillai</div>
            <div className="testi-role">BI Lead · ICICI Lombard</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg2)' }} id="pricing">
  <div className="container">
    <div className="section-label">Pricing</div>
    <h2 style={{ textAlign: 'center' }}>
      Transparent pricing. <em>Flexible payments.</em>
    </h2>
    <p className="section-sub" style={{ margin: '0 auto 3.5rem', textAlign: 'center' }}>
      No hidden fees. No upsells. Pick the track that fits your career goals.
    </p>
    <div className="pricing-grid" style={{ maxWidth: '1100px' }}>
      <div className="price-card">
        <div className="price-name">BI &amp; Automation Track</div>
        <div className="price-amt">
          ₹39,999 <span>+ GST</span>
        </div>
        <div className="price-emi">or ₹4,500/mo · No-Cost EMI</div>
        <ul className="price-features">
          <li>12–10 week live cohort</li>
          <li>4 portfolio projects</li>
          <li>1:1 mentor sessions</li>
          <li>Resume &amp; LinkedIn review</li>
          <li>1 year community access</li>
          <li>Placement support</li>
        </ul>
        <button
          type="button"
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => setApplyOpen(true)}
        >
          Apply Now →
        </button>
      </div>
      <div className="price-card featured">
        <div className="featured-badge">MOST POPULAR</div>
        <div className="price-name">Data Science / DE / AI Track</div>
        <div className="price-amt">
          ₹64,999 <span>+ GST</span>
        </div>
        <div className="price-emi">or ₹7,500/mo · No-Cost EMI</div>
        <ul className="price-features">
          <li>14–16 week live cohort</li>
          <li>6 industry-grade projects + capstone</li>
          <li>Unlimited 1:1 mentorship</li>
          <li>Mock interviews (3 sessions)</li>
          <li>Resume, portfolio &amp; LinkedIn</li>
          <li>2 years community + office hours</li>
          <li>Job referral network access</li>
        </ul>
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => setApplyOpen(true)}
        >
          Apply Now →
        </button>
      </div>
      <div className="price-card price-new-track">
        <div className="featured-badge" style={{ background: 'var(--gold)', color: '#000' }}>
          NEW TRACK
        </div>
        <div className="price-name">Data &amp; AI Consulting Track</div>
        <div className="price-amt">
          ₹14,999 <span>+ GST</span>
        </div>
        <div className="price-emi">or ₹2,999/mo · No-Cost EMI</div>
        <ul className="price-features">
          <li>10-episode live webinar series</li>
          <li>Mock consulting projects with deliverables</li>
          <li>SOW, pricing &amp; proposal templates</li>
          <li>Portfolio website review</li>
          <li>Consulting Circle community (2 years)</li>
          <li>Gig matching &amp; lead sharing</li>
          <li>Can bundle with any technical track</li>
        </ul>
        <button
          type="button"
          className="btn btn-outline-gold"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => setApplyOpen(true)}
        >
          Apply Now →
        </button>
      </div>
    </div>
    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem', marginTop: '1.75rem' }}>
      💡 Bundle any technical track + Consulting Track and get ₹5,000 off the total. Ask us about employer
      reimbursement.
    </p>
  </div>
</section>

<div className="cta-banner" id="apply">
  <div className="container">
    <div className="section-label" style={{ marginBottom: '0.5rem' }}>
      Start Your Journey
    </div>
    <h2>
      Ready to build <em>and sell</em> Data &amp; AI?
    </h2>
    <p>Join Cohort 5 — starts 15 June 2026. Limited to 40 seats per track.</p>
    <div className="hero-ctas">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => setApplyOpen(true)}>
        Apply Now →
      </button>
      <a href="tel:+916360156124" className="btn btn-outline btn-lg">Book a Call</a>
    </div>
    <div className="trust-row">
      <span className="trust-item">No credit card to apply</span>
      <span className="trust-item">Free counselling session</span>
      <span className="trust-item">10-day money-back guarantee</span>
    </div>
  </div>
</div>


<footer>
  <div className="container">
    <div className="footer-grid">
      <div className="footer-brand">
        <BrandLogo heightClass="h-8 w-auto sm:h-9" className="mb-1" />
        <p>
          India&apos;s leading practitioner-led bootcamp for Data Science, Data Engineering, BI, AI, Automation — and
          now, <strong style={{ color: 'var(--gold)' }}>Data &amp; AI Consulting</strong>.
        </p>
        <div className="social-links" style={{ marginTop: '1rem' }}>
          <a href="#">in</a>
          <a href="#">tw</a>
          <a href="#">yt</a>
          <a href="#">ig</a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Programs</h5>
        <a href="#">Data Science</a>
        <a href="#">Data Engineering</a>
        <a href="#">BI & Analytics</a>
        <a href="#">AI & GenAI</a>
        <a href="#">Automation</a>
        <a href="#">Data &amp; AI Consulting</a>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <a href="#">About Us</a>
        <a href="#">Mentors</a>
        <a href="#">Alumni</a>
        <Link href="/blog/">Blog</Link>
        <a href="#">Careers</a>
      </div>
      <div className="footer-col">
        <h5>Contact</h5>
        <a href="mailto:hello@intellibridge.in">hello@intellibridge.in</a>
        <a href="tel:+916360156124">+91 63601 56124</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Refund Policy</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 IntelliBridge. All rights reserved. GSTIN: 29XXXXX1234X1ZX</p>
      <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>Powered by IntelliBridge Learning Platform</p>
    </div>
  </div>
</footer>


<div className="sticky-bar" id="stickyBar">
  <p>🗓️ Cohort 5 starts from <span>15 June 2026</span> · Only 12 seats left</p>
  <button type="button" className="btn btn-primary" onClick={() => setApplyOpen(true)}>
    Apply Now →
  </button>
</div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />

    </>
  )
}
