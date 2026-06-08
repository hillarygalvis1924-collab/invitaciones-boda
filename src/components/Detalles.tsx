import { Sun, Heart, Music, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimateIn } from './AnimateIn'

interface Tarjeta {
  Icono: LucideIcon
  titulo: string
  lineas: string[]
}

const TARJETAS: Tarjeta[] = [
  {
    Icono: Sun,
    titulo: 'Preboda',
    lineas: [
      'Viernes 29 de mayo de 2027',
      'Lago en el cielo',
    ],
  },
  {
    Icono: Heart,
    titulo: 'Ceremonia',
    lineas: [
      'Sábado 30 de mayo de 2027',
      'Lago en el cielo',
    ],
  },
  {
    Icono: Music,
    titulo: 'Recepción',
    lineas: [
      'Sábado 30 de mayo de 2027',
      'Lago en el cielo',
      'Cena · música · baile',
    ],
  },
  {
    Icono: Sparkles,
    titulo: 'Dress code',
    lineas: [
      '🌊✨ Tonos delicados para un día inolvidable.',
      'Los invitamos a vestir colores suaves inspirados en el mar y el atardecer.',
      'Blanco, beige y arena reservados para los novios.',
    ],
  },
]

export default function Detalles() {
  return (
    <section id="detalles" className="scroll-mt-16 py-24 bg-arena/25">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-16">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Detalles
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Ceremonia &amp; Recepción
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TARJETAS.map(({ Icono, titulo, lineas }, i) => (
            <AnimateIn key={titulo} delay={i * 100}>
              <div className="flex flex-col items-center text-center p-8 border border-arena bg-hueso/70 h-full">
                <Icono size={20} strokeWidth={1.3} className="text-dorado mb-5" aria-hidden="true" />
                <h3 className="font-heading text-[1.6rem] text-carbon">{titulo}</h3>
                <div className="w-6 h-px bg-dorado/50 my-4" aria-hidden="true" />
                <ul className="space-y-2">
                  {lineas.map((linea) => (
                    <li
                      key={linea}
                      className="font-sans text-[0.72rem] text-carbon/60 leading-relaxed"
                    >
                      {linea}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Nota dress code */}
        <AnimateIn delay={400} className="text-center mt-10">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-carbon/35">
            Estamos en la playa — lino, colores suaves y zapatos cómodos serán tus mejores aliados
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
