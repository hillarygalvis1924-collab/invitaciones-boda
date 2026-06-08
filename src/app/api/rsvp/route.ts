import { createServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, nombre, asistentes, usa_van, horario_van, restricciones, mensaje } = body

    // Validación
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
      return Response.json({ error: 'El nombre es requerido' }, { status: 400 })
    }
    if (!Number.isInteger(asistentes) || asistentes < 1 || asistentes > 20) {
      return Response.json({ error: 'Número de asistentes inválido' }, { status: 400 })
    }
    if (typeof usa_van !== 'boolean') {
      return Response.json({ error: 'Indica si necesitas la van' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from('rsvp').insert({
      slug: typeof slug === 'string' ? slug : null,
      nombre: nombre.trim(),
      asistentes,
      usa_van,
      horario_van: typeof horario_van === 'string' && horario_van ? horario_van : null,
      restricciones: typeof restricciones === 'string' && restricciones.trim() ? restricciones.trim() : null,
      mensaje: typeof mensaje === 'string' && mensaje.trim() ? mensaje.trim() : null,
    })

    if (error) {
      console.error('[rsvp] Supabase insert error:', error.message)
      return Response.json({ error: 'Error al guardar la confirmación' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error interno'
    console.error('[rsvp] Error:', msg)
    return Response.json({ error: msg }, { status: 500 })
  }
}
