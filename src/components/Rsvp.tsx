'use client'

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnimateIn } from './AnimateIn'
import { cn } from '@/lib/utils'

/*
  Actualizar cuando los horarios de las vans estén confirmados.
  Corresponden a los horarios en ComoLlegar.tsx.
*/
const HORARIOS_VAN = [
  { value: 'van1', label: 'Van 1 — 11:30 a.m.' },
  { value: 'van2', label: 'Van 2 — 12:30 p.m.' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  nombre: string
  asistentes: string
  usa_van: 'si' | 'no' | ''
  horario_van: string
  restricciones: string
  mensaje: string
}

export default function Rsvp() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    asistentes: '1',
    usa_van: '',
    horario_van: '',
    restricciones: '',
    mensaje: '',
  })
  const [maxCupos, setMaxCupos] = useState(10)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Pre-rellenar desde sessionStorage si hay invitado con slug
  useEffect(() => {
    const nombre = sessionStorage.getItem('invitado-nombre')
    const cupos = Number(sessionStorage.getItem('invitado-cupos'))
    if (nombre) setForm((prev) => ({ ...prev, nombre }))
    if (cupos > 0) {
      setMaxCupos(cupos)
      setForm((prev) => ({ ...prev, asistentes: String(Math.min(cupos, 1)) }))
    }
  }, [])

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.usa_van) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: sessionStorage.getItem('invitado-slug') ?? '',
          nombre: form.nombre.trim(),
          asistentes: Number(form.asistentes),
          usa_van: form.usa_van === 'si',
          horario_van: form.usa_van === 'si' ? form.horario_van : null,
          restricciones: form.restricciones.trim() || null,
          mensaje: form.mensaje.trim() || null,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Error al enviar')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Algo salió mal. Intenta de nuevo.')
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-16 py-24 bg-oceano-dk">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-12">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-white/50 mb-4">
            Confirmación de asistencia
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-white leading-tight">
            ¿Nos acompañas?
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        <AnimateIn delay={100} className="mx-auto max-w-lg">

          {status === 'success' ? (
            /* ── Estado de confirmación exitosa ── */
            <div className="bg-hueso p-10 text-center flex flex-col items-center gap-5">
              <CheckCircle size={36} strokeWidth={1.2} className="text-dorado" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-3xl text-carbon">¡Gracias por confirmar!</h3>
                <p className="font-sans text-sm text-carbon/60 mt-3 leading-6">
                  Ya tienes tu lugar reservado.
                  <br />
                  Nos vemos en la playa en mayo de 2027.
                </p>
              </div>
              <div className="w-8 h-px bg-dorado" aria-hidden="true" />
              <p className="font-heading italic text-2xl text-oceano-dk">
                Hillary &amp; Juan Pablo
              </p>
            </div>
          ) : (
            /* ── Formulario ── */
            <form
              onSubmit={handleSubmit}
              className="bg-hueso p-8 flex flex-col gap-5"
              noValidate
            >
              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="rsvp-nombre"
                  className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65"
                >
                  Nombre completo *
                </Label>
                <Input
                  id="rsvp-nombre"
                  value={form.nombre}
                  onChange={(e) => update('nombre', e.target.value)}
                  placeholder="Tu nombre o el de tu grupo"
                  required
                  className="h-10 text-sm"
                />
              </div>

              {/* Asistentes */}
              <div className="flex flex-col gap-2">
                <Label className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65">
                  Número de asistentes *
                </Label>
                <Select
                  value={form.asistentes}
                  onValueChange={(v) => update('asistentes', v ?? '1')}
                >
                  <SelectTrigger className="h-10 w-full text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: maxCupos }, (_, i) => String(i + 1)).map((n) => (
                      <SelectItem key={n} value={n}>
                        {n} {n === '1' ? 'persona' : 'personas'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Van — toggle binario */}
              <div className="flex flex-col gap-2">
                <Label className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65">
                  ¿Necesitas la van desde el aeropuerto? *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['si', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('usa_van', opt)}
                      className={cn(
                        'font-sans text-[0.65rem] uppercase tracking-[0.12em] min-h-[44px] px-3 border transition-colors duration-200',
                        form.usa_van === opt
                          ? 'bg-oceano-dk text-white border-oceano-dk'
                          : 'bg-transparent text-carbon/55 border-arena hover:border-oceano',
                      )}
                    >
                      {opt === 'si' ? 'Sí, necesito van' : 'No, llego por mi cuenta'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horario van — aparece solo si usa van */}
              {form.usa_van === 'si' && (
                <div className="flex flex-col gap-2">
                  <Label className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65">
                    Horario de van preferido
                  </Label>
                  <Select
                    value={form.horario_van}
                    onValueChange={(v) => update('horario_van', v ?? '')}
                  >
                    <SelectTrigger className="h-10 w-full text-sm">
                      <SelectValue placeholder="Selecciona un horario" />
                    </SelectTrigger>
                    <SelectContent>
                      {HORARIOS_VAN.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Restricciones alimentarias */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="rsvp-restricciones"
                  className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65"
                >
                  Restricciones alimentarias{' '}
                  <span className="text-carbon/35 normal-case tracking-normal">— opcional</span>
                </Label>
                <Textarea
                  id="rsvp-restricciones"
                  value={form.restricciones}
                  onChange={(e) => update('restricciones', e.target.value)}
                  placeholder="Alergias, vegetariano, vegano, sin gluten…"
                  rows={2}
                  className="text-sm resize-none"
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="rsvp-mensaje"
                  className="font-sans text-[0.62rem] uppercase tracking-[0.15em] text-carbon/65"
                >
                  Mensaje para los novios{' '}
                  <span className="text-carbon/35 normal-case tracking-normal">— opcional</span>
                </Label>
                <Textarea
                  id="rsvp-mensaje"
                  value={form.mensaje}
                  onChange={(e) => update('mensaje', e.target.value)}
                  placeholder="Cuéntanos algo bonito…"
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>

              {/* Error inline */}
              {status === 'error' && (
                <p className="font-sans text-xs text-red-600 -mt-1" role="alert">
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  status === 'loading' || !form.nombre.trim() || !form.usa_van
                }
                className="w-full font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white bg-oceano-dk min-h-[44px] flex items-center justify-center transition-colors duration-300 hover:bg-oceano disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                {status === 'loading' ? 'Enviando…' : 'Confirmar asistencia'}
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  )
}
