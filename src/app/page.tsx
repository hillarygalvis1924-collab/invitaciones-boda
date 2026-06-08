import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Historia from '@/components/Historia'
import Detalles from '@/components/Detalles'
import ComoLlegar from '@/components/ComoLlegar'
import Rsvp from '@/components/Rsvp'
import PopupInvitado from '@/components/PopupInvitado'
import FotoStrip from '@/components/FotoStrip'

const BASE = '/fotos/fotosinvitacion'

export default function Home() {
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

        <FotoStrip fotos={[
          `${BASE}/1000184285.jpg`,
          `${BASE}/1000184301.jpg`,
          `${BASE}/1000184302.jpg`,
          `${BASE}/1000184289.jpg`,
        ]} />

        <Rsvp />
      </main>

      <PopupInvitado />

      <footer className="py-10 px-5 bg-carbon text-center">
        <p className="font-heading text-lg text-white/40 tracking-widest">H &amp; J · 2027</p>
      </footer>
    </>
  )
}
