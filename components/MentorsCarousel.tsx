'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Mentor = {
  initials: string
  name: string
  title: string
  bio: string
  tags: string[]
}

const MENTORS: Mentor[] = [
  {
    initials: 'SB',
    name: 'Samrat Saurav Bora',
    title: 'Performance Marketing Specialist · Paid media strategist',
    bio: 'Drives ROI across SaaS, edtech, and global markets. Focuses on full-funnel paid media, experimentation, and accountable growth metrics.',
    tags: ['Paid media', 'Performance marketing', 'SaaS', 'Edtech', 'Growth', 'A/B testing', 'ROI & attribution'],
  },
  {
    initials: 'AV',
    name: 'Aakash Verma',
    title: 'Senior Product Owner · Kipi.ai · Ex-Morgan Stanley',
    bio: 'Product owner shipping AI-forward products. PGDM (LEAD); CSPO and CSM. Former Morgan Stanley; brings rigor in discovery, roadmaps, and stakeholder alignment.',
    tags: ['Product', 'AI PM', 'Agile', 'CSPO', 'Discovery', 'Roadmaps', 'BFSI', 'Stakeholder mgmt'],
  },
  {
    initials: 'SP',
    name: 'Suryakant Paswan',
    title: 'Analytics Manager · Supply chain & demand planning',
    bio: 'Specializes in supply chain analytics, inventory optimization, and demand planning. Google Certified Data Analyst and trainer; builds on Power BI, SQL, Python, and Azure.',
    tags: ['Power BI', 'SQL', 'Python', 'Azure', 'Supply chain', 'Demand planning', 'Inventory', 'Training'],
  },
  {
    initials: 'RS',
    name: 'Rahul Sharma',
    title: 'Lead Data Scientist · Deloitte India',
    bio: '10 years building ML systems in banking and insurance. Led teams at Mu Sigma, ZS Associates, and Deloitte.',
    tags: ['ML', 'BFSI', 'Python', 'Banking', 'Insurance', 'Modeling', 'Team leadership', 'Consulting'],
  },
  {
    initials: 'PA',
    name: 'Priya Anand',
    title: 'Senior DE · Flipkart Data Platform',
    bio: 'Built petabyte-scale pipelines at Flipkart. Former Thoughtworks engineer with deep expertise in Spark and dbt.',
    tags: ['Spark', 'dbt', 'GCP', 'Data pipelines', 'Petabyte scale', 'ETL', 'Platform eng'],
  },
  {
    initials: 'VK',
    name: 'Vikram Kumar',
    title: 'Director Analytics · HDFC Life',
    bio: 'Transformed BI culture at two Fortune 500 companies. Power BI MVP, Tableau expert, and data storytelling coach.',
    tags: ['Power BI', 'Tableau', 'SQL', 'Data storytelling', 'BI strategy', 'Exec dashboards', 'Coaching'],
  },
  {
    initials: 'NA',
    name: 'Neha Arora',
    title: 'AI Lead · Zomato · Ex-Google Brain',
    bio: 'Published researcher in LLMs. Built GenAI features at Zomato used by 50M+ users. Teaches AI product thinking.',
    tags: ['LLMs', 'GenAI', 'Agents', 'Research', 'AI product', 'NLP', 'Production ML'],
  },
]

export function MentorsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth
    setCanPrev(scrollLeft > 6)
    setCanNext(scrollLeft < max - 6)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      ro.disconnect()
    }
  }, [updateArrows])

  const scrollStep = useCallback((dir: -1 | 1) => {
    const container = scrollerRef.current
    if (!container) return
    const slide = container.querySelector('.mentor-carousel-slide')
    if (!slide || !(slide instanceof HTMLElement)) return
    const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap) || 20
    const delta = slide.offsetWidth + gap
    container.scrollBy({ left: dir * delta, behavior: 'smooth' })
  }, [])

  return (
    <div className="mentor-carousel-wrap">
      <div className="mentor-carousel-toolbar">
        <div className="mentor-carousel-nav">
          <button
            type="button"
            className="mentor-carousel-btn"
            onClick={() => scrollStep(-1)}
            disabled={!canPrev}
            aria-label="Previous mentors"
          >
            ‹
          </button>
          <button
            type="button"
            className="mentor-carousel-btn"
            onClick={() => scrollStep(1)}
            disabled={!canNext}
            aria-label="Next mentors"
          >
            ›
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="mentor-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Mentor profiles"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            scrollStep(-1)
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            scrollStep(1)
          }
        }}
      >
        {MENTORS.map((m) => (
          <div key={m.name} className="mentor-carousel-slide">
            <div className="mentor-card mentor-card--carousel">
              <div className="mentor-avatar">{m.initials}</div>
              <h4>{m.name}</h4>
              <div className="mentor-title">{m.title}</div>
              <p>{m.bio}</p>
              <div className="mentor-exp">
                {m.tags.map((t) => (
                  <span key={t} className="exp-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
