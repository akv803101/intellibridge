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

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'idle' | 'otp'>('idle')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (!loading && user) router.replace('/admin/')
  }, [user, loading, router])

  async function handleGoogleLogin() {
    setError('')
    setGoogleLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/admin/` },
      })
      if (error) setError(error.message)
    } catch {
      setError('Google sign-in failed. Please try again.')
    } finally {
      setGoogleLoading(false)
    }
  }

  async function handleSendOtp() {
    setError('')
    const num = phone.trim()
    if (num.length < 8) return setError('Enter a valid phone number with country code, e.g. +91 98765 43210')
    setSending(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: num })
      if (error) throw error
      setStep('otp')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send OTP. Check if phone auth is enabled in Supabase.')
    } finally {
      setSending(false)
    }
  }

  async function handleVerifyOtp() {
    setError('')
    setVerifying(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone.trim(),
        token: otp.trim(),
        type: 'sms',
      })
      if (error) throw error
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid OTP. Please try again.')
    } finally {
      setVerifying(false)
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
          <p className="login-sub">Sign in to access your dashboard and manage applications.</p>

          {error && <div className="login-error" role="alert">{error}</div>}

          {/* Google */}
          <button className="btn-google" onClick={handleGoogleLogin} disabled={googleLoading}>
            <GoogleIcon />
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <div className="login-divider"><span>or sign in with phone</span></div>

          {/* Phone OTP */}
          {step === 'idle' ? (
            <div className="login-phone-wrap">
              <div className="mfield">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>
              <button className="modal-submit" onClick={handleSendOtp} disabled={sending}>
                {sending ? 'Sending OTP…' : 'Send OTP →'}
                <div className={`mspin${sending ? ' mspin-visible' : ''}`} aria-hidden />
              </button>
            </div>
          ) : (
            <div className="login-phone-wrap">
              <div className="mfield">
                <label>Enter the 6-digit OTP sent to {phone}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                  placeholder="123456"
                  autoFocus
                />
              </div>
              <button className="modal-submit" onClick={handleVerifyOtp} disabled={verifying || otp.length < 6}>
                {verifying ? 'Verifying…' : 'Verify & Sign In →'}
                <div className={`mspin${verifying ? ' mspin-visible' : ''}`} aria-hidden />
              </button>
              <button
                className="login-resend"
                onClick={() => { setStep('idle'); setOtp(''); setError('') }}
              >
                ← Change number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 13.652 17.64 11.524 17.64 9.2z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}
