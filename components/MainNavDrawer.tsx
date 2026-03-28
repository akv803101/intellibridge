'use client'

import Link from 'next/link'
import { MAIN_NAV_ITEMS } from '@/lib/mainNavLinks'

type Props = {
  open: boolean
  onClose: () => void
  /** Highlight Blog when on blog routes */
  blogActive?: boolean
  /** Home page: extra CTAs that sit in the bar on desktop only */
  homeActions?: {
    onApply: () => void
  }
}

const CORPORATE_URL = 'http://business.intellibridge.in/'

export function MainNavDrawer({ open, onClose, blogActive, homeActions }: Props) {
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
        {homeActions ? (
          <>
            <div className="nav-mobile-divider" aria-hidden />
            <div className="nav-mobile-actions">
              <a
                href={CORPORATE_URL}
                className="btn btn-outline nav-mobile-action-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Corporate Training
              </a>
              <a
                href="#"
                className="btn btn-ghost nav-mobile-action-btn"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                }}
              >
                Login
              </a>
              <button
                type="button"
                className="btn btn-primary nav-mobile-action-btn"
                onClick={() => {
                  onClose()
                  homeActions.onApply()
                }}
              >
                Apply Now →
              </button>
            </div>
          </>
        ) : null}
      </nav>
    </div>
  )
}
