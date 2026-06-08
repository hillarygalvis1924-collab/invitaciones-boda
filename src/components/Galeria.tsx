'use client'

import { useState, useEffect, useCallback, Fragment } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { AnimateIn } from './AnimateIn'

/*
  Añadir las fotos en /public/fotos/foto1.jpg … foto10.jpg
  (o ajustar el array FOTOS con los nombres/extensiones reales)
*/
const FOTOS = [
  '1000180662',
  '1000184253',
  '1000184298',
  '1000184299',
  '1000184300',
  '1000184301',
  '1000184302',
].map((name) => ({
  src: `/fotos/fotosinvitacion/${name}.jpg`,
  alt: 'Hillary y Juan Pablo',
}))

export default function Galeria() {
  const [idx, setIdx] = useState<number | null>(null)

  const prev = useCallback(
    () => setIdx((i) => (i !== null ? (i - 1 + FOTOS.length) % FOTOS.length : null)),
    [],
  )
  const next = useCallback(
    () => setIdx((i) => (i !== null ? (i + 1) % FOTOS.length : null)),
    [],
  )

  // Navegación con teclado en el lightbox
  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, prev, next])

  return (
    <section id="galeria" className="scroll-mt-16 py-24 bg-hueso">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-12">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Galería
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Momentos nuestros
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        {/* Grid — 2 cols en móvil, 3 en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {FOTOS.map(({ src, alt }, i) => (
            <AnimateIn key={src} delay={i * 50} className="w-full">
              <button
                onClick={() => setIdx(i)}
                className="relative w-full aspect-square overflow-hidden bg-arena block hover:opacity-90 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dorado"
                aria-label={`Ampliar ${alt}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={idx !== null}
        onOpenChange={(open) => { if (!open) setIdx(null) }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl sm:max-w-4xl p-0 bg-carbon/95 ring-0 rounded-none gap-0"
        >
          <DialogTitle className="sr-only">
            {idx !== null ? `${FOTOS[idx].alt} (${idx + 1} de ${FOTOS.length})` : 'Galería'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Usa las flechas izquierda/derecha del teclado para navegar entre fotos.
          </DialogDescription>

          {/* Imagen */}
          {idx !== null && (
            <div className="relative w-full h-[65vh] bg-carbon">
              <Image
                key={idx}
                src={FOTOS[idx].src}
                alt={FOTOS[idx].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          {/* Controles: prev · contador · next · cerrar */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              {idx !== null ? `${idx + 1} / ${FOTOS.length}` : ''}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={next}
                className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors"
                aria-label="Foto siguiente"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
              <DialogClose
                className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors"
                aria-label="Cerrar galería"
              >
                <X size={18} strokeWidth={1.5} />
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
