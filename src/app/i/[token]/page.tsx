import type { Metadata } from "next"
import InvitationClient from './InvitationClient'

export const metadata: Metadata = {
  metadataBase: new URL("https://boda-hillary-juanpablo.com"),
  title: "¡Nos casamos! · Juan Pablo & Hillary",
  description: "29 · 30 · 31 de Mayo, 2027 — Tolú, Sucre. Abre tu invitación.",
  openGraph: {
    title: "¡Nos casamos! · Juan Pablo & Hillary",
    description: "29 · 30 · 31 de Mayo, 2027 — Tolú, Sucre. Abre tu invitación.",
    type: "website",
    images: [{ url: "/preview.jpg", width: 1200, height: 630, alt: "Juan Pablo & Hillary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Nos casamos! · Juan Pablo & Hillary",
    images: ["/preview.jpg"],
  },
}

export default async function InvitacionPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <InvitationClient token={token} />
}
