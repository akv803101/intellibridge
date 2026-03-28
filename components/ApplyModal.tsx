'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/** Paste deployed Web App URL from Apps Script. Leave empty to submit via mailto only. */
const APPS_SCRIPT_WEB_APP_URL = ''

/** Matches NOTIFY_EMAIL in scripts/google-apps-script/intellibridge-apps-script-bootcamp.js */
const BOOTCAMP_INBOX = 'training@intellibridge.in'

type ErrKey = 'fname' | 'lname' | 'email' | 'phone' | 'track' | 'profile'

const initialErrors: Record<ErrKey, boolean> = {
  fname: false,
  lname: false,
  email: false,
  phone: false,
  track: false,
  profile: false,
}

export function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const fnameRef = useRef<HTMLInputElement>(null)

  const [success, setSuccess] = useState(false)
  const [successViaMailto, setSuccessViaMailto] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState(initialErrors)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [track, setTrack] = useState('')
  const [profile, setProfile] = useState('')
  const [experience, setExperience] = useState('')
  const [company, setCompany] = useState('')

  const reset = useCallback(() => {
    setSuccess(false)
    setSuccessViaMailto(false)
    setSubmitting(false)
    setErr(initialErrors)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setTrack('')
    setProfile('')
    setExperience('')
    setCompany('')
  }, [])

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [onClose, reset])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => fnameRef.current?.focus(), 100)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  const clearFieldError = (key: ErrKey) => {
    setErr((prev) => ({ ...prev, [key]: false }))
  }

  function validate(): boolean {
    const next = { ...initialErrors }
    let ok = true
    if (firstName.trim().length === 0) {
      next.fname = true
      ok = false
    }
    if (lastName.trim().length === 0) {
      next.lname = true
      ok = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = true
      ok = false
    }
    if (phone.trim().length <= 6) {
      next.phone = true
      ok = false
    }
    if (track === '') {
      next.track = true
      ok = false
    }
    if (profile === '') {
      next.profile = true
      ok = false
    }
    setErr(next)
    return ok
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const source = typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct'
    const payload = {
      timestamp: new Date().toISOString(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      track,
      profile,
      experience,
      company: company.trim(),
      source,
      formType: 'Bootcamp Application',
    }

    setSubmitting(true)

    if (APPS_SCRIPT_WEB_APP_URL) {
      try {
        // text/plain keeps the request "simple" so the browser actually sends the body with mode: no-cors
        await fetch(APPS_SCRIPT_WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        })
      } catch {
        /* no-cors: completion is enough */
      }
      setSuccessViaMailto(false)
    } else {
      const subject = encodeURIComponent('IntelliBridge bootcamp application')
      const body = encodeURIComponent(
        [
          'Bootcamp application',
          '',
          `Name: ${payload.firstName} ${payload.lastName}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Track: ${payload.track}`,
          `Profile: ${payload.profile}`,
          `Experience: ${payload.experience || '—'}`,
          `Company / College: ${payload.company || '—'}`,
          `Submitted: ${payload.timestamp}`,
          `Source: ${payload.source}`,
        ].join('\n'),
      )
      window.location.href = `mailto:${BOOTCAMP_INBOX}?subject=${subject}&body=${body}`
      setSuccessViaMailto(true)
    }

    setSubmitting(false)
    setSuccess(true)
  }

  function onOverlayPointerDown(e: React.MouseEvent) {
    if (e.target === overlayRef.current) handleClose()
  }

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Apply Now"
      onMouseDown={onOverlayPointerDown}
    >
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {!success ? (
          <div id="modal-form-view">
            <div className="modal-badge">
              <span className="modal-badge-dot" aria-hidden />
              Limited Cohort Seats
            </div>
            <div className="modal-title">
              Apply for <em>IntelliBridge</em>
            </div>
            <div className="modal-sub">Takes 60 seconds. Our team will reach out within 24 hours to discuss your track.</div>

            <form className="mform" onSubmit={onSubmit} noValidate>
              <div className="mrow">
                <div className={`mfield${err.fname ? ' err' : ''}`}>
                  <label>
                    First Name <span className="req">*</span>
                  </label>
                  <input
                    ref={fnameRef}
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      clearFieldError('fname')
                    }}
                    placeholder="Arjun"
                    autoComplete="given-name"
                  />
                  <span className="errmsg">Required</span>
                </div>
                <div className={`mfield${err.lname ? ' err' : ''}`}>
                  <label>
                    Last Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      clearFieldError('lname')
                    }}
                    placeholder="Sharma"
                    autoComplete="family-name"
                  />
                  <span className="errmsg">Required</span>
                </div>
              </div>

              <div className={`mfield${err.email ? ' err' : ''}`}>
                <label>
                  Email Address <span className="req">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    clearFieldError('email')
                  }}
                  placeholder="arjun@company.com"
                  autoComplete="email"
                />
                <span className="errmsg">Enter a valid email address</span>
              </div>

              <div className={`mfield${err.phone ? ' err' : ''}`}>
                <label>
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    clearFieldError('phone')
                  }}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
                <span className="errmsg">Required</span>
              </div>

              <div className="mrow">
                <div className={`mfield${err.track ? ' err' : ''}`}>
                  <label>
                    Track Interested In <span className="req">*</span>
                  </label>
                  <select
                    value={track}
                    onChange={(e) => {
                      setTrack(e.target.value)
                      clearFieldError('track')
                    }}
                  >
                    <option value="" disabled>
                      Select track…
                    </option>
                    <option value="Data Science & ML">Data Science & ML</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="BI & Analytics">BI & Analytics</option>
                    <option value="AI & GenAI">AI & GenAI</option>
                    <option value="Automation">Automation</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <span className="errmsg">Please select a track</span>
                </div>
                <div className={`mfield${err.profile ? ' err' : ''}`}>
                  <label>
                    I am a <span className="req">*</span>
                  </label>
                  <select
                    value={profile}
                    onChange={(e) => {
                      setProfile(e.target.value)
                      clearFieldError('profile')
                    }}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Career Switcher">Career Switcher</option>
                    <option value="Business Owner">Business Owner</option>
                  </select>
                  <span className="errmsg">Required</span>
                </div>
              </div>

              <div className="mrow">
                <div className="mfield">
                  <label>Experience</label>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                    <option value="">Years…</option>
                    <option value="0–1 years">0–1 years</option>
                    <option value="1–3 years">1–3 years</option>
                    <option value="3–6 years">3–6 years</option>
                    <option value="6–10 years">6–10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div className="mfield">
                  <label>Company / College</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Infosys / IIT Bombay"
                  />
                </div>
              </div>

              <button type="submit" className="modal-submit" disabled={submitting}>
                <span>{submitting ? 'Submitting…' : 'Submit Application →'}</span>
                <div className={`mspin${submitting ? ' mspin-visible' : ''}`} aria-hidden />
              </button>
            </form>
            <div className="modal-note">🔒 No spam. Your data is safe. We&apos;ll reach out within 24 hours.</div>
          </div>
        ) : (
          <div className="modal-success">
            <div className="success-circle" aria-hidden>
              🎉
            </div>
            <h3>
              {successViaMailto ? (
                <>
                  Almost <span>there!</span>
                </>
              ) : (
                <>
                  Application <span>Received!</span>
                </>
              )}
            </h3>
            <p>
              {successViaMailto ? (
                <>
                  If your email app opened with a draft to {BOOTCAMP_INBOX}, please send it to finish your application. If nothing opened, email us at{' '}
                  <a href={`mailto:${BOOTCAMP_INBOX}`} className="modal-success-link">
                    {BOOTCAMP_INBOX}
                  </a>{' '}
                  with the same details.
                </>
              ) : (
                <>
                  Thank you for applying to IntelliBridge. Our team will reach out within 24 hours to discuss your track and answer any questions.
                </>
              )}
            </p>
            <div className="success-tracks">
              <strong>What happens next:</strong>
              <br />
              {successViaMailto ? (
                <>
                  ✓ We&apos;ll reply from {BOOTCAMP_INBOX} once we receive your message
                  <br />
                  ✓ A counsellor will follow up within 24 hours
                  <br />
                  ✓ We&apos;ll match you to the right track & cohort
                  <br />✓ Free trial class before you commit
                </>
              ) : (
                <>
                  ✓ You&apos;ll get a confirmation email shortly
                  <br />
                  ✓ A counsellor will call you within 24 hours
                  <br />
                  ✓ We&apos;ll match you to the right track & cohort
                  <br />✓ Free trial class before you commit
                </>
              )}
            </div>
            <button type="button" className="modal-done-btn" onClick={handleClose}>
              Close ✕
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
