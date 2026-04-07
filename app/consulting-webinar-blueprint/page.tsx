import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IntelliBridge — 15-Episode Consulting Webinar Blueprint',
  description:
    'A start-to-finish consulting simulation across 15 episodes with one running use case — from discovery to delivery and scaling your practice.',
}

/** Embeds the standalone blueprint HTML from /public (single source of truth). */
export default function ConsultingWebinarBlueprintPage() {
  return (
    <iframe
      className="consulting-blueprint-frame"
      src="/intellibridge-consulting-webinar-blueprint.html"
      title="IntelliBridge — AI consulting webinar blueprint"
    />
  )
}
