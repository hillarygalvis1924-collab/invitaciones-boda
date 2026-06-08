import { Plane, BusFront, MapPin, ExternalLink } from 'lucide-react'
import { AnimateIn } from './AnimateIn'

function WhatsAppIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const VENUE_LAT = '9.5286'
const VENUE_LNG = '-75.5695'
const VENUE_MAPS_URL = 'https://maps.app.goo.gl/TaZxd2dAdESaoK8CA'
const WA_MSG = encodeURIComponent('Hola, tengo una pregunta sobre la boda de Hillary y Juan Pablo.')
const CONTACTOS = [
  { nombre: 'Hillary', phone: '573194834447' },
  { nombre: 'Juan Pablo', phone: '573168816578' },
]

const TIPS = [
  'Equipaje ligero',
  'Ropa fresca',
  'Protector solar',
  'Zapatos cómodos',
]

export default function ComoLlegar() {
  return (
    <section id="como-llegar" className="scroll-mt-16 py-24 bg-arena/25">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-16">
          <p className="font-sans text-[1.1rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Logística
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Cómo llegar
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
          <p className="font-sans text-[1.1rem] text-carbon/55 mt-5 max-w-sm mx-auto leading-6">
            Guarda esta página — la consultarás el día del viaje.
          </p>
        </AnimateIn>

        {/* Grid: pasos + mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Pasos ── */}
          <AnimateIn delay={100}>
            <ol className="space-y-0" aria-label="Pasos para llegar">

              {/* Paso 1 */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-dorado flex items-center justify-center shrink-0 bg-hueso">
                    <span className="font-sans text-[1.1rem] text-dorado font-medium">1</span>
                  </div>
                  <div className="w-px flex-1 bg-arena min-h-8 my-1" aria-hidden="true" />
                </div>
                <div className="pb-10 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Plane size={14} strokeWidth={1.4} className="text-dorado shrink-0" aria-hidden="true" />
                    <h3 className="font-heading text-xl text-carbon">Vuelo a Montería</h3>
                  </div>
                  <div className="font-sans text-[1.1rem] text-carbon/65 leading-6 space-y-2">
                    <p>
                      Cada invitado gestiona su propio vuelo. Te recomendamos reservar
                      con anticipación — los vuelos a Montería se llenan rápido.
                    </p>
                    <ul className="space-y-1 mt-3">
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span><strong className="font-medium text-carbon/80">Ruta:</strong> Bogotá (BOG) → Montería (MTR)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span><strong className="font-medium text-carbon/80">Aeropuerto:</strong> Los Garzones (MTR)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span>
                          <strong className="font-medium text-carbon/80">Llegada sugerida:</strong>{' '}
                          antes de las 11:30 a.m.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* Paso 2 */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-dorado flex items-center justify-center shrink-0 bg-hueso">
                    <span className="font-sans text-[1.1rem] text-dorado font-medium">2</span>
                  </div>
                  <div className="w-px flex-1 bg-arena min-h-8 my-1" aria-hidden="true" />
                </div>
                <div className="pb-10 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <BusFront size={14} strokeWidth={1.4} className="text-dorado shrink-0" aria-hidden="true" />
                    <h3 className="font-heading text-xl text-carbon">Van en el aeropuerto</h3>
                  </div>
                  <div className="font-sans text-[1.1rem] text-carbon/65 leading-6 space-y-2">
                    <p>
                      En horarios coordinados habrá vans esperándote en el aeropuerto
                      para llevarlos juntos al venue. ¡Sin estrés de transporte!
                    </p>
                    <ul className="space-y-1 mt-3">
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span>
                          <strong className="font-medium text-carbon/80">Salida van 1:</strong>{' '}
                          11:30 a.m.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span>
                          <strong className="font-medium text-carbon/80">Salida van 2:</strong>{' '}
                          12:30 p.m.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-dorado/80 shrink-0">→</span>
                        <span>
                          <strong className="font-medium text-carbon/80">Trayecto estimado:</strong>{' '}
                          2.5 horas
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* Paso 3 */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-dorado flex items-center justify-center shrink-0 bg-hueso">
                    <span className="font-sans text-[1.1rem] text-dorado font-medium">3</span>
                  </div>
                </div>
                <div className="pb-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} strokeWidth={1.4} className="text-dorado shrink-0" aria-hidden="true" />
                    <h3 className="font-heading text-xl text-carbon">Llegada a las villas</h3>
                  </div>
                  <p className="font-sans text-[1.1rem] text-carbon/65 leading-6">
                    Bienvenidos al lugar de la boda. Descansa, disfruta la brisa del
                    mar y prepárate para celebrar.
                  </p>
                </div>
              </li>
            </ol>

            {/* Tips */}
            <div className="mt-2 pt-8 border-t border-arena">
              <p className="font-sans text-[1.1rem] uppercase tracking-[0.2em] text-dorado mb-4">
                Qué llevar
              </p>
              <div className="flex flex-wrap gap-2">
                {TIPS.map((tip) => (
                  <span
                    key={tip}
                    className="font-sans text-[1.1rem] text-carbon/60 border border-arena px-3 py-1.5"
                  >
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* ── Mapa y acciones ── */}
          <AnimateIn delay={200} className="flex flex-col gap-5">

            {/* Mapa embebido */}
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-arena bg-arena/40">
              <iframe
                title="Ubicación del venue"
                src={`https://maps.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&z=8&output=embed`}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mapa de ubicación del venue"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={VENUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-sans text-[1.1rem] uppercase tracking-[0.18em] text-carbon/80 border border-carbon/20 px-5 min-h-[44px] hover:border-dorado hover:text-dorado transition-colors duration-300 flex-1"
              >
                <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
                Abrir en Google Maps
              </a>
            </div>

            {/* Contacto WhatsApp */}
            <div className="border-l-2 border-dorado/40 pl-4 py-1">
              <p className="font-sans text-[1.1rem] uppercase tracking-[0.15em] text-carbon/55 mb-3">
                ¿Dudas? Escríbenos:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                {CONTACTOS.map(({ nombre, phone }) => (
                  <a
                    key={nombre}
                    href={`https://wa.me/${phone}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-sans text-[1.1rem] uppercase tracking-[0.18em] text-white bg-oceano-dk px-5 min-h-[44px] hover:bg-oceano transition-colors duration-300 flex-1"
                  >
                    <WhatsAppIcon size={14} />
                    {nombre}
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
