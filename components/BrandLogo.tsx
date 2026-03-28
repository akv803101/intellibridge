'use client'

import Link from 'next/link'

const SRC = '/intellibridge-logo-horizontal.png'

type Props = {
  className?: string
  /** Tailwind height classes; width follows PNG aspect ratio */
  heightClass?: string
  priority?: boolean
}

export function BrandLogo({ className = '', heightClass = 'h-12 sm:h-14', priority }: Props) {
  return (
    <Link
      href="/"
      className={`brand-logo-link block w-max max-w-[min(380px,92vw)] shrink-0 no-underline ${className}`}
    >
      {/* Native img: avoids next/image flex sizing quirks that can clip the mark */}
      {/* eslint-disable-next-line @next/next/no-img-element -- intentional for full raster visibility */}
      <img
        src={SRC}
        alt="IntelliBridge"
        width={1103}
        height={375}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={`block w-auto max-w-full object-contain object-left ${heightClass}`}
      />
    </Link>
  )
}
