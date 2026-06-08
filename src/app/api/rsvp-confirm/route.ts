import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase'

const VALID_HORARIOS = ['van1', 'van2']

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('inv_ok')?.value
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = createServerClient()

  const { data: inv } = await supabase
    .from('invitations')
    .select('party_size')
    .eq('token', token)
    .single()

  if (!inv) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  const { asistentes, necesita_van, horario_van, restricciones, mensaje_rsvp } = await req.json()

  if (!Number.isInteger(asistentes) || asistentes < 1 || asistentes > inv.party_size)
    return NextResponse.json({ error: 'Número de asistentes inválido' }, { status: 400 })
  if (typeof necesita_van !== 'boolean')
    return NextResponse.json({ error: 'Indica si necesitas la van' }, { status: 400 })
  if (necesita_van && !VALID_HORARIOS.includes(horario_van))
    return NextResponse.json({ error: 'Indica el horario de la van' }, { status: 400 })

  const { error } = await supabase
    .from('invitations')
    .update({
      confirmado: true,
      asistentes,
      necesita_van,
      horario_van: necesita_van ? horario_van : null,
      restricciones: typeof restricciones === 'string' && restricciones.trim() ? restricciones.trim() : null,
      mensaje_rsvp: typeof mensaje_rsvp === 'string' && mensaje_rsvp.trim() ? mensaje_rsvp.trim() : null,
      confirmado_at: new Date().toISOString(),
    })
    .eq('token', token)

  if (error) {
    console.error('[rsvp-confirm]', error.message)
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
