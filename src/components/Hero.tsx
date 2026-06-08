import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import Countdown from './Countdown'

export default function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-oceano-dk via-[#2d4d5c] to-oceano-dk">
      {/* Foto móvil (9:16) */}
      <Image
        src="/fotos/hero-cel.jpg"
        alt=""
        fill
        preload
        loading="eager"
        className="object-cover object-center md:hidden"
        sizes="100vw"
        quality={90}
      />
      {/* Foto desktop (16:9) */}
      <Image
        src="/fotos/hero-desktop.jpg"
        alt=""
        fill
        preload
        loading="eager"
        className="object-cover object-center hidden md:block"
        sizes="100vw"
        quality={90}
      />

      {/* Overlay degradado para legibilidad del texto */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-carbon/55 via-carbon/25 to-carbon/65"
        aria-hidden="true"
      />

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center text-center px-5">
        {/* Línea dorada superior */}
        <div className="w-8 h-px bg-dorado/60 mb-6" aria-hidden="true" />

        {/* Nombres */}
        <h1 className="font-script text-[clamp(3.5rem,14vw,8rem)] leading-[1.2] text-white">
          Hillary
          <br />
          <span className="font-ampersand text-white text-[0.85em]">&amp;</span>
          <br />
          Juan Pablo
        </h1>

        {/* Línea dorada inferior */}
        <div className="w-8 h-px bg-dorado/60 mt-6 mb-5" aria-hidden="true" />

        {/* Lugar */}
        <p className="font-sans text-[1.1rem] uppercase tracking-[0.3em] text-white">
          Tolú · Sucre · Colombia
        </p>

        {/* Fecha */}
        <p className="font-sans text-[1.1rem] uppercase tracking-[0.3em] text-white mt-2">
          29 · 30 · 31 de Mayo · 2027
        </p>

        {/* Cuenta regresiva */}
        <Countdown />

        {/* CTA */}
        <a
          href="#rsvp"
          className="mt-8 font-sans text-[1.1rem] uppercase tracking-[0.2em] text-white/80 border border-white/30 px-7 min-h-[44px] flex items-center hover:border-dorado hover:text-dorado transition-colors duration-300"
        >
          Confirmar asistencia
        </a>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/35"
        aria-hidden="true"
      >
        <ChevronDown size={22} strokeWidth={1.2} />
      </div>
    </section>
  )
}
