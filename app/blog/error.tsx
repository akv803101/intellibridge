'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function BlogError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Blog route error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 text-center text-gray-900">
      <h1 className="mb-3 font-[family-name:var(--font-jakarta)] text-2xl font-bold">Something went wrong loading the blog</h1>
      <p className="mb-6 max-w-md text-gray-600">
        Try again, or restart the dev server with a clean cache: stop it, then run{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">npm run dev:clean</code>
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-teal-600 px-4 py-2 font-semibold text-white"
        >
          Try again
        </button>
        <Link href="/" className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 no-underline">
          Home
        </Link>
      </div>
    </div>
  )
}
