import Image from 'next/image'
import { AnimateIn } from './AnimateIn'

export default function Historia() {
  return (
    <section id="historia" className="scroll-mt-16 py-24 bg-hueso overflow-hidden">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-16">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Nuestra historia
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Dos caminos, una historia
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        {/* Cuerpo: texto + fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Texto */}
          <AnimateIn delay={100} className="order-2 md:order-1">
            <div className="space-y-5 font-sans text-sm leading-7 text-carbon/70">
              <p>
                Hace 8 años comenzó nuestra historia, cuando la vida nos unió en un
                momento en el que aún teníamos muchos sueños por cumplir. Desde entonces
                hemos compartido risas, aventuras, aprendizajes y también desafíos que
                nos hicieron más fuertes.
              </p>
              <p>
                A lo largo de estos años hemos crecido juntos, apoyándonos en cada paso,
                celebrando los momentos felices y encontrando en el otro la fuerza para
                seguir adelante cuando las cosas no eran fáciles. Cada experiencia vivida
                nos enseñó que el amor no solo se encuentra, sino que se construye día a
                día con paciencia, confianza y dedicación.
              </p>
              <p>
                Hoy, después de todo el camino recorrido, seguimos eligiéndonos con la
                misma ilusión, pero con un amor más profundo y una historia llena de
                recuerdos que atesoramos. Por eso queremos celebrar este momento tan
                especial junto a las personas que han sido parte de nuestras vidas y que
                nos han acompañado de una u otra manera en este hermoso viaje.
              </p>
              <p>
                Con mucha emoción, los invitamos a compartir con nosotros el comienzo de
                nuestro nuevo capítulo.
              </p>
            </div>

            {/* Firma */}
            <p className="font-ampersand text-2xl text-dorado mt-8">
              <span className="font-script">Hillary</span>
              {' '}&amp;{' '}
              <span className="font-script">Juan Pablo</span>
            </p>
          </AnimateIn>

          {/* Fotos */}
          <AnimateIn delay={200} className="order-1 md:order-2">
            {/*
              Añadir imágenes en /public/fotos/historia1.jpeg y /public/fotos/historia2.jpeg
              Formato recomendado: retrato (3:4), mínimo 800 × 1067 px
            */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-arena rounded-sm">
                <Image
                  src="/fotos/historia1.jpeg"
                  alt="Hillary y Juan Pablo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              {/* Segunda foto desplazada hacia abajo para efecto editorial */}
              <div className="relative aspect-[3/4] overflow-hidden bg-arena/70 rounded-sm mt-8">
                <Image
                  src="/fotos/historia2.jpeg"
                  alt="Hillary y Juan Pablo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
