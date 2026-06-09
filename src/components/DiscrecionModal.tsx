'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Heart } from 'lucide-react'

const STORAGE_KEY = 'discrecion_vista'

export default function DiscrecionModal() {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Quita el if para que salga siempre:
    if (localStorage.getItem(STORAGE_KEY)) return
    setVisible(true)
  }, [])

  // Focus al abrir
  useEffect(() => {
    if (visible) btnRef.current?.focus()
  }, [visible])

  // Bloqueo de scroll mientras está abierto
  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [visible])

  const close = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }, [])

  // Cierre con Esc
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible, close])

  if (!visible) return null

  return (
    // Sin aria-hidden en el overlay — lo heredaría el dialog y lo ocultaría de lectores
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4
        bg-oceano-dk/70 backdrop-blur-sm
        animate-in fade-in duration-300
        motion-reduce:animate-none"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="discrecion-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-hueso w-full max-w-[440px] rounded-sm px-8 py-10
          flex flex-col items-center gap-6 text-center shadow-2xl
          animate-in fade-in zoom-in-95 duration-300
          motion-reduce:animate-none"
      >
        {/* Encabezado decorativo */}
        <div className="flex flex-col items-center gap-2">
          <Heart size={18} strokeWidth={1.4} className="text-dorado" aria-hidden="true" />
          <p
            id="discrecion-title"
            className="text-2xl text-dorado leading-none"
            style={{ fontFamily: 'var(--font-parisienne), cursive' }}
          >
            Con cariño
          </p>
        </div>

        <div className="w-8 h-px bg-dorado/40" aria-hidden="true" />

        {/* Cuerpo */}
        <p className="font-heading text-[1.05rem] text-carbon/75 leading-relaxed italic">
          Tu presencia significa mucho para nosotros. Quisimos que esta fuera una
          celebración íntima y, aunque nos habría encantado tener cerca a todos nuestros
          seres queridos, esta vez tuvimos que tomar decisiones difíciles. Por eso te
          pedimos, de corazón, que trates esta invitación con discreción y evites
          comentarla con otras personas. Gracias por comprenderlo y por ser parte de
          este día.
        </p>

        {/* Botón */}
        <button
          ref={btnRef}
          onClick={close}
          className="mt-2 font-sans text-[0.72rem] uppercase tracking-[0.25em]
            text-white bg-dorado px-8 min-h-[44px] rounded-sm
            hover:bg-dorado/80 transition-colors duration-300"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
