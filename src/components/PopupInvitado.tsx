'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { invitados } from '@/data/invitados'

/* ─── Contenido del popup (necesita useSearchParams → Suspense) ─── */
function PopupContent() {
  const params = useSearchParams()
  const slug = params.get('invitado') ?? ''
  const invitado = invitados[slug]

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!invitado) return

    // No volver a mostrar en esta sesión
    if (sessionStorage.getItem(`popup-visto-${slug}`)) return

    // Persistir datos del invitado para el formulario RSVP
    sessionStorage.setItem('invitado-slug', slug)
    sessionStorage.setItem('invitado-nombre', invitado.nombre)
    sessionStorage.setItem('invitado-cupos', String(invitado.cupos))

    setOpen(true)
  }, [slug, invitado])

  function cerrar() {
    sessionStorage.setItem(`popup-visto-${slug}`, '1')
    setOpen(false)
  }

  if (!invitado) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) cerrar() }}>
      <DialogContent className="max-w-sm sm:max-w-sm text-center">
        {/* Línea dorada superior */}
        <div className="w-8 h-px bg-dorado mx-auto" aria-hidden="true" />

        <div className="flex flex-col items-center gap-3 py-2">
          {/* Saludo */}
          <DialogTitle className="font-heading text-[clamp(1.6rem,5vw,2.2rem)] text-carbon leading-tight">
            Hola,<br />
            <span className="text-oceano-dk">{invitado.nombre}</span>
          </DialogTitle>

          {/* Mensaje personalizado */}
          <DialogDescription className="font-sans text-sm text-carbon/65 leading-6 max-w-xs">
            {invitado.mensaje}
          </DialogDescription>

          {/* Cupos */}
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-dorado border border-dorado/30 px-3 py-1.5">
            {invitado.cupos === 1
              ? '1 cupo reservado para ti'
              : `${invitado.cupos} cupos reservados para ustedes`}
          </p>
        </div>

        {/* CTA */}
        <DialogClose
          onClick={cerrar}
          className="w-full font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white bg-oceano-dk hover:bg-oceano min-h-[44px] flex items-center justify-center transition-colors duration-300 -mx-4 -mb-4 sm:-mx-4 sm:-mb-4 mt-2 rounded-b-xl"
        >
          Ver invitación
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Wrapper con Suspense (requerido por useSearchParams en Next.js) ─── */
export default function PopupInvitado() {
  return (
    <Suspense fallback={null}>
      <PopupContent />
    </Suspense>
  )
}
