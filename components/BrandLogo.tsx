'use client'

import Link from 'next/link'

/** Cube compact mark; bump `LOGO_QUERY` if the asset changes and caches linger. */
const SRC = '/intellibridge-logo.svg?v=no-bg'

type Props = {
  className?: string
  /** Tailwind height classes; width follows SVG aspect ratio */
  heightClass?: string
  priority?: boolean
}

export function BrandLogo({ className = '', heightClass = 'h-12 sm:h-14', priority }: Props) {
  return (
    <Link
      href="/"
      className={`brand-logo-link block w-max max-w-[min(380px,92vw)] shrink-0 no-underline ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo asset */}
      <img
        src={SRC}
        alt="IntelliBridge"
        width={300}
        height={92}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={`block w-auto max-w-full object-contain object-left ${heightClass}`}
      />
    </Link>
  )
}
