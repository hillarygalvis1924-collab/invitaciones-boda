import InvitationClient from './InvitationClient'

export default async function InvitacionPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <InvitationClient token={token} />
}
