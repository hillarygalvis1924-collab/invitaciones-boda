import Image from 'next/image'
import { AnimateIn } from './AnimateIn'

interface Tarjeta {
  img: string
  alt: string
  lineas: string[]
}

const TARJETAS: Tarjeta[] = [
  {
    img: '/preboda.png',
    alt: 'Preboda',
    lineas: [
      'Antes de la boda queremos compartir un momento especial con todos ustedes. Será un espacio para descansar, conocernos, disfrutar del lugar y pasar un rato agradable juntos mientras contamos los minutos para el gran momento.',
    ],
  },
  {
    img: '/ceremonia.png',
    alt: 'Ceremonia',
    lineas: [
      'Cada historia de amor tiene momentos que la transforman para siempre. Para nosotros, este será uno de ellos. Con el corazón lleno de emoción, intercambiaremos nuestras promesas y comenzaremos la aventura más hermosa: construir una vida juntos.',
    ],
  },
  {
    img: '/recepcion.png',
    alt: 'Recepción',
    lineas: [
      'Queremos celebrar este día rodeados de las personas que más queremos. Será una noche para reír, bailar, brindar y agradecer por cada abrazo, cada sonrisa y cada recuerdo compartido.',
    ],
  },
  {
    img: '/dresscode.png',
    alt: 'Dress code',
    lineas: [
      'Tonos delicados para un día inolvidable.',
      'Los invitamos a vestir colores suaves inspirados en el mar y el atardecer.',
      'Blanco, beige y arena reservados para los novios.',
    ],
  },
]

export default function Detalles() {
  return (
    <section id="detalles" className="scroll-mt-16 py-24 bg-arena/25">
      <div className="mx-auto max-w-5xl px-5">

        <AnimateIn className="text-center mb-16">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Detalles
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Ceremonia &amp; Recepción
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TARJETAS.map(({ img, alt, lineas }, i) => (
            <AnimateIn key={alt} delay={i * 100}>
              <div className="flex flex-col items-center text-center border border-arena bg-hueso/70 h-full overflow-hidden">
                <div className="relative w-full h-44">
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col items-center p-6 gap-4">
                  <div className="w-6 h-px bg-dorado/50" aria-hidden="true" />
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
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={400} className="text-center mt-10">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-carbon/35">
            Estamos en la playa — lino, colores suaves y zapatos cómodos serán tus mejores aliados
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
