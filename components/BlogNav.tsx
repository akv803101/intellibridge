'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import { MainNavDrawer } from '@/components/MainNavDrawer'

type Props = { active?: 'blog' }

export function BlogNav({ active }: Props) {
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

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[100] flex w-full max-w-[100vw] flex-nowrap items-center gap-2 border-b border-white/[0.08] bg-[rgba(6,8,15,0.92)] px-[max(1rem,4%)] py-3 backdrop-blur-[16px] pl-[max(1rem,calc(4%+env(safe-area-inset-left)))] pr-[max(1rem,calc(4%+env(safe-area-inset-right)))] pt-[max(0.75rem,calc(0.75rem+env(safe-area-inset-top)))] sm:gap-3 sm:py-4">
        <div className="min-w-0 shrink">
          <BrandLogo priority heightClass="h-10 w-auto sm:h-11 md:h-14" />
        </div>
        <ul className="m-0 hidden min-w-0 flex-1 list-none items-center justify-center gap-6 p-0 md:flex lg:gap-8">
          <li>
            <Link href="/#programs" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
              Programs
            </Link>
          </li>
          <li>
            <Link href="/#curriculum" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
              Curriculum
            </Link>
          </li>
          <li>
            <Link href="/#mentors" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
              Mentors
            </Link>
          </li>
          <li>
            <Link href="/#pricing" className="text-[0.9rem] font-medium text-gray-400 no-underline transition-colors hover:text-white">
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`text-[0.9rem] font-medium no-underline transition-colors ${
                active === 'blog' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>
        <div className="ml-auto flex shrink-0 items-center gap-2">
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
          <Link
            href="/#apply"
            className="inline-flex items-center gap-1 rounded-md bg-gradient-to-br from-[#00e5c0] to-[#7b6cff] px-3 py-2 text-[0.8rem] font-bold text-black no-underline transition-all hover:opacity-90 sm:px-[1.4rem] sm:py-[0.6rem] sm:text-[0.875rem]"
          >
            Apply Now →
          </Link>
        </div>
      </nav>

      <MainNavDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} blogActive={active === 'blog'} />
    </>
  )
}
