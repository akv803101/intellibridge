import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://intellibridge.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'IntelliBridge — Learn Data & AI. Build. Consult.',
  description:
    "India's practitioner-led bootcamp for Data & AI — technical tracks plus a consulting path to scope, price, and deliver for real clients.",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#06080f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontJakarta.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
