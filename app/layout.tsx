import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

/** Display / headings (maps to --font-syne in globals.css) */
const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
})

/** Body / UI text (maps to --font-dm in globals.css) */
const fontSans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://intellibridge.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'IntelliBridge — Become a Data & AI Professional',
  description:
    'Hands-on, mentor-led programs in Data Science, Data Engineering, Business Intelligence, AI and Automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
