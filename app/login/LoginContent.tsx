'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/authContext'
import { BrandLogo } from '@/components/BrandLogo'

export function LoginContent() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && user) router.replace('/admin/')
  }, [user, loading, router])

  async function handleSendMagicLink() {
    setError('')
    const addr = email.trim()
    if (!/^\S+@\S+\.\S+$/.test(addr)) return setError('Enter a valid email address.')
    setSending(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: addr,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
      setSent(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send sign-in link. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="login-loading">
        <div className="login-spinner" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="hero-bg" aria-hidden />
      <div className="hero-grid" aria-hidden />

      <nav>
        <BrandLogo />
        <ul className="nav-links" />
        <div className="nav-ctas">
          <Link href="/" className="btn btn-ghost">← Back to site</Link>
        </div>
      </nav>

      <div className="login-card-wrap">
        <div className="login-card">
          <div className="login-badge">
            <span className="modal-badge-dot" aria-hidden />
            Secure Sign In
          </div>

          <h1 className="login-title">
            Welcome to <em>IntelliBridge</em>
          </h1>
          <p className="login-sub">Sign in with a one-time link sent to your email.</p>

          {error && <div className="login-error" role="alert">{error}</div>}

          {sent ? (
            <div className="login-phone-wrap">
              <div className="login-error" role="status" style={{ color: 'inherit' }}>
                Check <strong>{email}</strong> for a sign-in link. You can close this tab once you click it.
              </div>
              <button
                className="login-resend"
                onClick={() => { setSent(false); setError('') }}
              >
                ← Use a different email
              </button>
            </div>
          ) : (
            <div className="login-phone-wrap">
              <div className="mfield">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMagicLink()}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <button className="modal-submit" onClick={handleSendMagicLink} disabled={sending}>
                {sending ? 'Sending link…' : 'Send sign-in link →'}
                <div className={`mspin${sending ? ' mspin-visible' : ''}`} aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
