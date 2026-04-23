'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/lib/authContext'
import { BrandLogo } from '@/components/BrandLogo'

interface Application {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  track: string
  profile: string
  experience?: string
  company?: string
  timestamp: string
  source?: string
}

const TRACKS = [
  'Data Science & ML',
  'Data Engineering',
  'BI & Analytics',
  'AI & GenAI',
  'Automation',
  'Data & AI Consulting',
]

export function AdminContent() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  const [apps, setApps] = useState<Application[]>([])
  const [fetching, setFetching] = useState(true)
  const [search, setSearch] = useState('')
  const [trackFilter, setTrackFilter] = useState('')
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!user) router.replace('/login/')
    else if (!isAdmin) router.replace('/')
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    if (!user || !isAdmin) return
    async function fetchApps() {
      try {
        const q = query(collection(db, 'applications'), orderBy('timestamp', 'desc'))
        const snap = await getDocs(q)
        setApps(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Application, 'id'>) })))
      } catch {
        // Firestore not yet configured or empty
      } finally {
        setFetching(false)
      }
    }
    fetchApps()
  }, [user, isAdmin])

  const filtered = apps.filter((a) => {
    const term = search.toLowerCase()
    const matchSearch =
      !term ||
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(term) ||
      (a.email || '').toLowerCase().includes(term) ||
      (a.phone || '').includes(term)
    const matchTrack = !trackFilter || a.track === trackFilter
    return matchSearch && matchTrack
  })

  const thisMonth = apps.filter((a) => {
    const d = new Date(a.timestamp)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const topTrack = (() => {
    const counts: Record<string, number> = {}
    apps.forEach((a) => { counts[a.track] = (counts[a.track] || 0) + 1 })
    const top = Object.entries(counts).sort((x, y) => y[1] - x[1])[0]
    return top ? top[0] : '—'
  })()

  async function handleSignOut() {
    setSigningOut(true)
    await signOut(auth)
    router.replace('/login/')
  }

  if (loading || (user && isAdmin && fetching)) {
    return (
      <div className="admin-loading">
        <div className="login-spinner" aria-label="Loading" />
      </div>
    )
  }

  if (!user || !isAdmin) return null

  return (
    <div className="admin-wrap">
      <nav>
        <BrandLogo />
        <ul className="nav-links" />
        <div className="nav-ctas">
          <span className="admin-user-label">
            {user.email || user.phoneNumber}
          </span>
          <button className="btn btn-ghost" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </nav>

      <div className="admin-content">
        {/* Header */}
        <div className="admin-header">
          <div>
            <div className="section-label">Admin Dashboard</div>
            <h1 className="admin-page-title">Applications</h1>
          </div>
          <Link href="/" className="btn btn-ghost" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            ← Back to site
          </Link>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-num">{apps.length}</div>
            <div className="admin-stat-label">Total Applications</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-num">{thisMonth}</div>
            <div className="admin-stat-label">This Month</div>
          </div>
          <div className="admin-stat-card admin-stat-card--accent">
            <div className="admin-stat-num admin-stat-num--sm">{topTrack}</div>
            <div className="admin-stat-label">Top Track</div>
          </div>
        </div>

        {/* Track breakdown */}
        <div className="admin-track-row">
          {TRACKS.map((t) => {
            const count = apps.filter((a) => a.track === t).length
            return (
              <button
                key={t}
                className={`admin-track-chip${trackFilter === t ? ' admin-track-chip--active' : ''}`}
                onClick={() => setTrackFilter(trackFilter === t ? '' : t)}
              >
                {t} <span className="admin-track-chip-count">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <input
            className="admin-search"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-select"
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
          >
            <option value="">All Tracks</option>
            {TRACKS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {(search || trackFilter) && (
            <button
              className="btn btn-ghost"
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => { setSearch(''); setTrackFilter('') }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Track</th>
                <th>Profile</th>
                <th>Experience</th>
                <th>Company</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-empty">
                    {apps.length === 0
                      ? 'No applications yet. Submissions from the Apply form will appear here.'
                      : 'No results match your search.'}
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id}>
                    <td className="admin-td-name">{a.firstName} {a.lastName}</td>
                    <td><a href={`mailto:${a.email}`} className="admin-link">{a.email}</a></td>
                    <td>{a.phone}</td>
                    <td><span className="admin-track-badge">{a.track}</span></td>
                    <td>{a.profile}</td>
                    <td>{a.experience || '—'}</td>
                    <td>{a.company || '—'}</td>
                    <td className="admin-td-date">
                      {new Date(a.timestamp).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <p className="admin-count">
            Showing {filtered.length} of {apps.length} application{apps.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
