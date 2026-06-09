import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Historia from '@/components/Historia'
import Detalles from '@/components/Detalles'
import ComoLlegar from '@/components/ComoLlegar'
import Rsvp from '@/components/Rsvp'
import SinNinos from '@/components/SinNinos'
import LluviaSobres from '@/components/LluviaSobres'
import PopupInvitado from '@/components/PopupInvitado'
import DiscrecionModal from '@/components/DiscrecionModal'
import FotoStrip from '@/components/FotoStrip'

const BASE = '/fotos/fotosinvitacion'

export default async function Home() {
  const token = (await cookies()).get('inv_ok')?.value
  if (!token) redirect('/no-invitado')

  const supabase = createServerClient()
  const { data } = await supabase
    .from('invitations')
    .select('guest_name, party_size')
    .eq('token', token)
    .single()

  if (!data) redirect('/no-invitado')

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Historia />

        <FotoStrip fotos={[
          `${BASE}/invitacion1.jpg`,
          `${BASE}/invitacion2.jpg`,
          `${BASE}/1000180662.jpg`,
        ]} />

        <Detalles />

        <FotoStrip fotos={[
          `${BASE}/1000184253.jpg`,
          `${BASE}/1000184298.jpg`,
          `${BASE}/1000184299.jpg`,
        ]} />

        <ComoLlegar />
        <LluviaSobres />

        <FotoStrip fotos={[
          `${BASE}/1000184285.jpg`,
          `${BASE}/1000184301.jpg`,
          `${BASE}/1000184302.jpg`,
          `${BASE}/1000184289.jpg`,
        ]} />

        <SinNinos />
        <Rsvp groupName={data.guest_name} cupos={data.party_size} />
      </main>

      <PopupInvitado />
      <DiscrecionModal />

      <footer className="py-10 px-5 bg-carbon text-center">
        <p className="font-heading text-lg text-white/40 tracking-widest">H &amp; J · 2027</p>
      </footer>
    </>
  )
}
