'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
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

const HORARIOS_VAN = [
  { value: 'van1', label: 'Van 1 — 11:30 a.m.' },
  { value: 'van2', label: 'Van 2 — 12:30 p.m.' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  asistentes: string
  usa_van: 'si' | 'no' | ''
  horario_van: string
  restricciones: string
  mensaje: string
}

interface Props {
  groupName: string
  cupos: number
}

export default function Rsvp({ groupName, cupos }: Props) {
  const [form, setForm] = useState<FormState>({
    asistentes: '1',
    usa_van: '',
    horario_van: '',
    restricciones: '',
    mensaje: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.usa_van) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/rsvp-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asistentes: Number(form.asistentes),
          necesita_van: form.usa_van === 'si',
          horario_van: form.usa_van === 'si' ? form.horario_van : null,
          restricciones: form.restricciones.trim() || null,
          mensaje_rsvp: form.mensaje.trim() || null,
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

        <AnimateIn className="text-center mb-12">
          <p className="font-sans text-[1.1rem] uppercase tracking-[0.25em] text-white/50 mb-4">
            Confirmación de asistencia
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-white leading-tight">
            ¿Nos acompañas?
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        <AnimateIn delay={100} className="mx-auto max-w-lg">

          {status === 'success' ? (
            <div className="bg-hueso p-10 text-center flex flex-col items-center gap-5">
              <CheckCircle size={36} strokeWidth={1.2} className="text-dorado" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-3xl text-carbon">¡Gracias por confirmar!</h3>
                <p className="font-sans text-[1.1rem] text-carbon/60 mt-3 leading-6">
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
            <form
              onSubmit={handleSubmit}
              className="bg-hueso p-8 flex flex-col gap-5"
              noValidate
            >
              {/* Nombre de grupo — solo lectura */}
              <div className="flex flex-col gap-1 border-b border-arena pb-4">
                <p className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65">
                  Confirmando para
                </p>
                <p className="font-heading text-xl text-carbon">{groupName}</p>
              </div>

              {/* Asistentes */}
              <div className="flex flex-col gap-2">
                <Label className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65">
                  Número de asistentes *
                </Label>
                <Select
                  value={form.asistentes}
                  onValueChange={(v) => update('asistentes', v ?? '1')}
                >
                  <SelectTrigger className="h-10 w-full text-[1.1rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: cupos }, (_, i) => String(i + 1)).map((n) => (
                      <SelectItem key={n} value={n}>
                        {n} {n === '1' ? 'persona' : 'personas'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Van */}
              <div className="flex flex-col gap-2">
                <Label className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65">
                  ¿Necesitas la van desde el aeropuerto? *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['si', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('usa_van', opt)}
                      className={cn(
                        'font-sans text-[1.1rem] uppercase tracking-[0.12em] min-h-[44px] px-3 border transition-colors duration-200',
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

              {/* Horario van */}
              {form.usa_van === 'si' && (
                <div className="flex flex-col gap-2">
                  <Label className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65">
                    Horario de van preferido
                  </Label>
                  <Select
                    value={form.horario_van}
                    onValueChange={(v) => update('horario_van', v ?? '')}
                  >
                    <SelectTrigger className="h-10 w-full text-[1.1rem]">
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

              {/* Restricciones */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="rsvp-restricciones"
                  className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65"
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
                  className="text-[1.1rem] resize-none"
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="rsvp-mensaje"
                  className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/65"
                >
                  Mensaje para los novios{' '}
                  <span className="text-carbon/35 normal-case tracking-normal">— opcional</span>
                </Label>
                <Textarea
                  id="rsvp-mensaje"
                  value={form.mensaje}
                  onChange={(e) => update('mensaje', e.target.value)}
                  placeholder="Si quieres dejarnos unas palabras personales, escríbelas."
                  rows={3}
                  className="text-[1.1rem] resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="font-sans text-[1.1rem] text-red-600 -mt-1" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !form.usa_van}
                className="w-full font-sans text-[1.1rem] uppercase tracking-[0.2em] text-white bg-oceano-dk min-h-[44px] flex items-center justify-center transition-colors duration-300 hover:bg-oceano disabled:opacity-40 disabled:cursor-not-allowed mt-2"
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
