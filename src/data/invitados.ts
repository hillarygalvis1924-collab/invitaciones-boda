export interface Invitado {
  nombre: string
  mensaje: string
  cupos: number
}

/*
  Añadir una entrada por grupo de invitados.
  El slug (clave) va en la URL: ?invitado=familia-perez
  Compartir el link personalizado con cada invitado por WhatsApp.
*/
export const invitados: Record<string, Invitado> = {
  'familia-perez': {
    nombre: 'Familia Pérez',
    mensaje: '¡Qué alegría compartir este día tan especial con ustedes!',
    cupos: 4,
  },
  'ana-y-luis': {
    nombre: 'Ana y Luis',
    mensaje: 'Gracias por acompañarnos a celebrar en la playa.',
    cupos: 2,
  },
  // Agregar más invitados aquí siguiendo el mismo patrón...
}
