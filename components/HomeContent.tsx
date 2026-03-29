'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ApplyModal } from '@/components/ApplyModal'
import { BrandLogo } from '@/components/BrandLogo'
import { MainNavDrawer } from '@/components/MainNavDrawer'
import { MentorsCarousel } from '@/components/MentorsCarousel'
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
    const faqBtns = document.querySelectorAll('.faq-q')
    const faqListeners: Array<{ el: Element; fn: EventListener }> = []
    faqBtns.forEach((btn) => {
      const fn = () => {
        const item = btn.parentElement
        if (!item) return
        const wasOpen = item.classList.contains('open')
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'))
        if (!wasOpen) item.classList.add('open')
      }
      btn.addEventListener('click', fn)
      faqListeners.push({ el: btn, fn })
    })
    const onScroll = () => {
      const stickyBar = document.getElementById('stickyBar')
      if (!stickyBar) return
      if (window.scrollY > 600) stickyBar.classList.add('show')
      else stickyBar.classList.remove('show')
    }
    window.addEventListener('scroll', onScroll)
    const tabListeners: Array<{ el: Element; fn: EventListener }> = []
    document.querySelectorAll('.track-tab').forEach((tab) => {
      const fn = () => {
        document.querySelectorAll('.track-tab').forEach((t) => t.classList.remove('active'))
        tab.classList.add('active')
      }
      tab.addEventListener('click', fn)
      tabListeners.push({ el: tab, fn })
    })
    return () => {
      faqListeners.forEach(({ el, fn }) => el.removeEventListener('click', fn))
      tabListeners.forEach(({ el, fn }) => el.removeEventListener('click', fn))
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
    <div className="hero-badge"><span className="dot"></span> Industry-Led Bootcamps · Cohort 5 Starting Soon</div>
    <h1>Become a <em>Data & AI</em><br />Professional in 16 Weeks</h1>
    <p className="hero-sub">Hands-on, mentor-led programs in Data Science, Data Engineering, Business Intelligence, AI and Automation — built for real-world career outcomes across every industry.</p>
    <div className="hero-ctas">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => setApplyOpen(true)}>
        Apply for Next Cohort →
      </button>
      <a href="#programs" className="btn btn-outline btn-lg">Explore Programs</a>
    </div>
    <p className="cohort-tag">🗓️ Cohort 5 starts from <strong>15 June 2026</strong> · Limited seats</p>
    <div className="hero-stats">
      <div className="stat"><div className="stat-num">1,200+</div><div className="stat-label">Professionals Placed</div></div>
      <div className="stat"><div className="stat-num">5</div><div className="stat-label">Specialisation Tracks</div></div>
      <div className="stat"><div className="stat-num">97%</div><div className="stat-label">Satisfaction Rate</div></div>
      <div className="stat"><div className="stat-num">40+</div><div className="stat-label">Industry SMEs</div></div>
    </div>
  </div>
</section>


<div className="logos">
  <p>Alumni now working at</p>
  <div className="logo-row">
    <span className="logo-pill">Deloitte</span>
    <span className="logo-pill">EY</span>
    <span className="logo-pill">Infosys</span>
    <span className="logo-pill">TCS</span>
    <span className="logo-pill">KPMG</span>
    <span className="logo-pill">Accenture</span>
    <span className="logo-pill">Wipro</span>
    <span className="logo-pill">HDFC Bank</span>
    <span className="logo-pill">Zomato</span>
    <span className="logo-pill">Flipkart</span>
  </div>
</div>


<section className="programs" id="programs">
  <div className="container">
    <div className="section-label">Our Programs</div>
    <h2>5 Focused Tracks.<br /><em>Infinite Career Possibilities.</em></h2>
    <p className="section-sub">Each track is independently crafted by practitioners, aligned to industry hiring needs — not generic curricula.</p>
    <div className="program-grid">

      <div className="program-card">
        <div className="prog-icon">📊</div>
        <span className="prog-tag tag-ds">Data Science</span>
        <h3>Data Science & Machine Learning</h3>
        <p>From Python fundamentals to production ML models. Build real projects in healthcare, finance, and e-commerce. Land roles as DS, ML Engineer, or Analyst.</p>
        <div className="prog-meta">
          <span>⏱ 16 weeks</span>
          <span>🖥 Live + Async</span>
          <span>📜 Certificate</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">🔧</div>
        <span className="prog-tag tag-de">Data Engineering</span>
        <h3>Data Engineering & Pipelines</h3>
        <p>Master Spark, dbt, Airflow, and cloud data stacks (AWS/GCP/Azure). Build scalable pipelines. Target DE, Analytics Engineer and Platform roles.</p>
        <div className="prog-meta">
          <span>⏱ 14 weeks</span>
          <span>🖥 Live + Async</span>
          <span>📜 Certificate</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">📈</div>
        <span className="prog-tag tag-bi">Business Intelligence</span>
        <h3>Business Intelligence & Analytics</h3>
        <p>SQL, Power BI, Tableau, and storytelling with data. Become the person who translates numbers into strategic decisions for leadership teams.</p>
        <div className="prog-meta">
          <span>⏱ 12 weeks</span>
          <span>🖥 Live + Async</span>
          <span>📜 Certificate</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">🤖</div>
        <span className="prog-tag tag-ai">AI & GenAI</span>
        <h3>Applied AI & Generative AI</h3>
        <p>LLMs, RAG, prompt engineering, agents, and AI product thinking. Build GenAI applications across industries and position yourself for the AI economy.</p>
        <div className="prog-meta">
          <span>⏱ 14 weeks</span>
          <span>🖥 Live + Async</span>
          <span>📜 Certificate</span>
        </div>
      </div>

      <div className="program-card">
        <div className="prog-icon">⚙️</div>
        <span className="prog-tag tag-auto">Automation</span>
        <h3>AI-Powered Process Automation</h3>
        <p>RPA, no-code/low-code automation, Python scripting, and intelligent workflow design. Automate operations across BFSI, logistics, HR, and manufacturing.</p>
        <div className="prog-meta">
          <span>⏱ 10 weeks</span>
          <span>🖥 Live + Async</span>
          <span>📜 Certificate</span>
        </div>
      </div>

    </div>
  </div>
</section>


<section style={{ background: 'var(--bg)' }} id="outcomes">
  <div className="container">
    <div className="section-label">Outcomes</div>
    <h2>Real results.<br /><em>Real careers.</em></h2>
    <p className="section-sub">Our learners don't just finish a course. They switch careers, get promoted, or land their first data role — often within 3 months of graduating.</p>
    <div className="outcome-grid">
      <div className="outcome-card"><div className="outcome-num"><span>87%</span></div><div className="outcome-desc">Get a new role or promotion within 6 months</div></div>
      <div className="outcome-card"><div className="outcome-num"><span>₹8L+</span></div><div className="outcome-desc">Average salary hike for career switchers</div></div>
      <div className="outcome-card"><div className="outcome-num"><span>16 wks</span></div><div className="outcome-desc">Average time from enrolment to first offer</div></div>
      <div className="outcome-card"><div className="outcome-num"><span>40+</span></div><div className="outcome-desc">Hiring partner companies actively recruiting</div></div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg2)' }} id="why">
  <div className="container">
    <div className="section-label">The IntelliBridge Difference</div>
    <h2>Why 1,200+ professionals<br /><em>chose IntelliBridge</em></h2>
    <p className="section-sub">Not all bootcamps are equal. See exactly what sets us apart from generic online courses and mass-market platforms.</p>
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
            <td>👨‍🏫 Instructors</td>
            <td className="col-others"><span className="cross">✗</span> Academics or retired professionals</td>
            <td className="col-ib"><span className="tick">✓</span> Active practitioners with 10+ yrs</td>
          </tr>
          <tr>
            <td>🏭 Industry Focus</td>
            <td className="col-others"><span className="cross">✗</span> Generic tech examples</td>
            <td className="col-ib"><span className="tick">✓</span> BFSI, healthcare, retail, logistics & more</td>
          </tr>
          <tr>
            <td>🛠 Projects</td>
            <td className="col-others"><span className="cross">✗</span> 1 toy project</td>
            <td className="col-ib"><span className="tick">✓</span> 6 industry-grade portfolio projects</td>
          </tr>
          <tr>
            <td>🎯 1:1 Mentorship</td>
            <td className="col-others"><span className="cross">✗</span> Unavailable or paid add-on</td>
            <td className="col-ib"><span className="tick">✓</span> Unlimited 1:1 calls included</td>
          </tr>
          <tr>
            <td>💼 Career Support</td>
            <td className="col-others"><span className="cross">✗</span> Generic job board</td>
            <td className="col-ib"><span className="tick">✓</span> Resume, mock interviews, referrals</td>
          </tr>
          <tr>
            <td>⏳ Post-Graduation</td>
            <td className="col-others"><span className="cross">✗</span> Access cut off</td>
            <td className="col-ib"><span className="tick">✓</span> 2 years community + office hours</td>
          </tr>
          <tr>
            <td>🏢 Cohort Format</td>
            <td className="col-others"><span className="cross">✗</span> Self-paced, alone</td>
            <td className="col-ib"><span className="tick">✓</span> Live cohort with peer accountability</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg)' }} id="curriculum">
  <div className="container">
    <div className="section-label">Curriculum Snapshot</div>
    <h2>16 weeks of <em>real-world learning</em></h2>
    <p className="section-sub">Here's a taste of what you'll cover in our flagship Data Science track. Every other track follows the same depth-first, project-first philosophy.</p>
    <div className="track-tabs">
      <button className="track-tab active">Data Science</button>
      <button className="track-tab">Data Engineering</button>
      <button className="track-tab">BI & Analytics</button>
      <button className="track-tab">AI & GenAI</button>
      <button className="track-tab">Automation</button>
    </div>
    <div className="curriculum-wrap">
      <div className="week-card">
        <div className="week-num">Weeks 1–2</div>
        <h4>Python & Statistics Foundations</h4>
        <ul className="week-topics">
          <li>Python for data — pandas, numpy, matplotlib</li>
          <li>Descriptive and inferential statistics</li>
          <li>Hypothesis testing and confidence intervals</li>
          <li>Exploratory Data Analysis (EDA) hands-on</li>
        </ul>
      </div>
      <div className="week-card">
        <div className="week-num">Weeks 3–4</div>
        <h4>SQL & Data Wrangling</h4>
        <ul className="week-topics">
          <li>Advanced SQL: window functions, CTEs, optimization</li>
          <li>Data cleaning and feature engineering</li>
          <li>Working with real messy datasets</li>
          <li>Case study: Retail sales pipeline</li>
        </ul>
      </div>
      <div className="week-card">
        <div className="week-num">Weeks 5–7</div>
        <h4>Machine Learning Core</h4>
        <ul className="week-topics">
          <li>Regression, classification, clustering</li>
          <li>Model evaluation, cross-validation, tuning</li>
          <li>Ensemble methods: XGBoost, Random Forest</li>
          <li>Project: Churn prediction for BFSI</li>
        </ul>
      </div>
      <div className="week-card">
        <div className="week-num">Weeks 8–10</div>
        <h4>Deep Learning & NLP</h4>
        <ul className="week-topics">
          <li>Neural networks from scratch with PyTorch</li>
          <li>CNNs for image classification</li>
          <li>NLP: text classification, sentiment, transformers</li>
          <li>Project: Healthcare document classifier</li>
        </ul>
      </div>
      <div className="week-card">
        <div className="week-num">Weeks 11–13</div>
        <h4>MLOps & Production Systems</h4>
        <ul className="week-topics">
          <li>Model deployment with FastAPI & Docker</li>
          <li>MLflow for experiment tracking</li>
          <li>CI/CD pipelines for ML</li>
          <li>Cloud deployment on AWS/GCP</li>
        </ul>
      </div>
      <div className="week-card">
        <div className="week-num">Weeks 14–16</div>
        <h4>Capstone + Career Sprint</h4>
        <ul className="week-topics">
          <li>Industry-sponsored capstone project</li>
          <li>Portfolio building and LinkedIn optimisation</li>
          <li>Mock interviews with working data scientists</li>
          <li>Job referrals and placement support</li>
        </ul>
      </div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg2)' }} id="mentors">
  <div className="container">
    <div className="section-label">Your Mentors</div>
    <h2>Learn from people<br /><em>actually doing the work</em></h2>
    <p className="section-sub">Every mentor has at least 8 years of hands-on experience in their field. No academics, no theory-only professors.</p>
    <MentorsCarousel />
  </div>
</section>


<section style={{ background: 'var(--bg)' }} id="reviews">
  <div className="container">
    <div className="section-label">Alumni Stories</div>
    <h2>People who <em>made the jump</em></h2>
    <p className="section-sub">Don't take our word for it. Read what our alumni have to say about their journey.</p>
    <div className="testi-grid">
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"I went from working in supply chain to landing a Data Analyst role at EY in under 5 months. The industry case studies were invaluable — nothing else on the market comes close to that depth."</p>
        <div className="testi-person">
          <div className="testi-avatar">AM</div>
          <div>
            <div className="testi-name">Anjali Mehta</div>
            <div className="testi-role">Data Analyst · EY India</div>
            <span className="testi-badge tag-ds">Supply Chain → Data</span>
          </div>
        </div>
      </div>
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"The Data Engineering track was hands-down the most practical course I've taken. I was building real Airflow DAGs by week 3. Got 2 offers — picked the one from Infosys."</p>
        <div className="testi-person">
          <div className="testi-avatar">SK</div>
          <div>
            <div className="testi-name">Siddharth Kumar</div>
            <div className="testi-role">Data Engineer · Infosys</div>
            <span className="testi-badge tag-de">Software Dev → DE</span>
          </div>
        </div>
      </div>
      <div className="testi-card">
        <div className="stars">★★★★★</div>
        <p className="testi-quote">"The mentors don't just teach tools — they teach you how to think about data problems. That mindset shift is what got me promoted to BI Lead within a year of graduating."</p>
        <div className="testi-person">
          <div className="testi-avatar">RP</div>
          <div>
            <div className="testi-name">Renu Pillai</div>
            <div className="testi-role">BI Lead · ICICI Lombard</div>
            <span className="testi-badge tag-bi">Finance → BI</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section style={{ background: 'var(--bg2)' }} id="pricing">
  <div className="container">
    <div className="section-label">Invest in Yourself</div>
    <h2 style={{ textAlign: 'center' }}>Transparent pricing.<br /><em>Flexible payments.</em></h2>
    <p className="section-sub" style={{ margin: '0 auto 3.5rem', textAlign: 'center' }}>
      No hidden fees. No upsells. Everything you need to land a data career is included.
    </p>
    <div className="pricing-grid">
      <div className="price-card">
        <div className="price-name">BI & Automation Track</div>
        <div className="price-amt">₹39,999 <span>+ GST</span></div>
        <div className="price-emi">or ₹4,500/mo with No-Cost EMI</div>
        <ul className="price-features">
          <li>12–10 week live cohort</li>
          <li>4 portfolio projects</li>
          <li>1:1 mentor sessions</li>
          <li>Resume & LinkedIn review</li>
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
        <div className="featured-badge">Most Popular</div>
        <div className="price-name">Data Science / DE / AI Track</div>
        <div className="price-amt">₹64,999 <span>+ GST</span></div>
        <div className="price-emi">or ₹7,500/mo with No-Cost EMI</div>
        <ul className="price-features">
          <li>14–16 week live cohort</li>
          <li>6 industry-grade projects + capstone</li>
          <li>Unlimited 1:1 mentorship</li>
          <li>Mock interviews (3 sessions)</li>
          <li>Resume, portfolio & LinkedIn</li>
          <li>2 years community + office hours</li>
          <li>Job referral network access</li>
          <li>Free cohort transfer (once)</li>
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
    </div>
    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
      💡 Ask us about employer reimbursement — many companies cover 100% of the fees.
    </p>
  </div>
</section>


<section style={{ background: 'var(--bg)' }} id="faq">
  <div className="container">
    <div className="section-label">FAQ</div>
    <h2 style={{ marginBottom: '2.5rem' }}>
      Got questions?
      <br />
      <em>We&apos;ve got answers.</em>
    </h2>
    <div className="faq-list">
      <div className="faq-item open">
        <button className="faq-q">What background do I need to join? <span className="faq-icon">+</span></button>
        <div className="faq-a">No prior data experience is required for the BI & Automation tracks. For Data Science, DE, and AI tracks, basic comfort with spreadsheets or any programming is helpful. We have a pre-course module to get everyone up to speed.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q">How many hours per week does this require? <span className="faq-icon">+</span></button>
        <div className="faq-a">Plan for 10–14 hours per week: 4 hours of live sessions on weekends and 6–10 hours of assignments, projects, and reading. It is designed for working professionals.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Are the sessions recorded? <span className="faq-icon">+</span></button>
        <div className="faq-a">Yes. All live sessions are recorded and available in your dashboard within 24 hours. You can also attend recordings from the previous cohort if you want to fast-track.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q">What kind of placement support do you offer? <span className="faq-icon">+</span></button>
        <div className="faq-a">We offer 1:1 resume review, portfolio building, LinkedIn optimisation, structured interview prep with question banks, 3 mock interview sessions, and direct referrals to our 40+ hiring partners. Support continues for 2 years post-graduation.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Is there a refund policy? <span className="faq-icon">+</span></button>
        <div className="faq-a">Yes. We offer a full refund within 10 days of cohort commencement if you are not satisfied. No questions asked. Reach out to hello@intellibridge.in.</div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Do I get a certificate? <span className="faq-icon">+</span></button>
        <div className="faq-a">Yes. You receive a globally verifiable certificate of completion upon finishing all assignments and the capstone project. It includes a QR code for LinkedIn sharing.</div>
      </div>
    </div>
  </div>
</section>


<div className="cta-banner" id="apply">
  <div className="container">
    <div className="section-label" style={{ marginBottom: '0.5rem' }}>
      Start Your Journey
    </div>
    <h2>Ready to become a<br /><em>Data & AI professional?</em></h2>
    <p>Join Cohort 5 — starts from 15 June 2026. Limited to 40 seats per track.</p>
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
        <p>India's leading practitioner-led bootcamp for Data Science, Data Engineering, BI, AI and Automation careers.</p>
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
      <p>© 2025 IntelliBridge. All rights reserved. GSTIN: 29XXXXX1234X1ZX</p>
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
