'use client'

import Link from 'next/link'
import { MAIN_NAV_ITEMS } from '@/lib/mainNavLinks'

type Props = {
  open: boolean
  onClose: () => void
  /** Highlight Blog when on blog routes */
  blogActive?: boolean
}

export function MainNavDrawer({ open, onClose, blogActive }: Props) {
  return (
    <div
      className={`nav-mobile-layer ${open ? 'nav-mobile-layer--open' : ''}`}
      id="site-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Site navigation"
    >
      <button
        type="button"
        className="nav-mobile-layer-backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <nav className="nav-mobile-panel" aria-label="Primary">
        <ul className="nav-mobile-list">
          {MAIN_NAV_ITEMS.map(({ href, label }) => {
            const isBlog = href === '/blog'
            const active = isBlog && blogActive
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-mobile-link ${active ? 'nav-mobile-link--active' : ''}`}
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
