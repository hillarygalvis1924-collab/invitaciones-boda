import { AnimateIn } from './AnimateIn'

interface Evento {
  hora: string
  nombre: string
}

interface Dia {
  dia: string
  fecha: string
  principal?: true
  eventos: Evento[]
}

const DIAS: Dia[] = [
  {
    dia: 'Viernes',
    fecha: '29 de mayo',
    eventos: [
      { hora: '[ hora ]', nombre: 'Llegada al venue' },
      { hora: '[ hora ]', nombre: 'Instalación en habitaciones' },
      { hora: '[ hora ]', nombre: 'Cóctel de bienvenida' },
      { hora: '[ hora ]', nombre: 'Cena informal de llegada' },
    ],
  },
  {
    dia: 'Sábado',
    fecha: '30 de mayo',
    principal: true,
    eventos: [
      { hora: '[ hora ]', nombre: 'Preparativos y fotografía' },
      { hora: '[ hora ]', nombre: 'Ceremonia' },
      { hora: '[ hora ]', nombre: 'Cóctel nupcial' },
      { hora: '[ hora ]', nombre: 'Cena de gala' },
      { hora: '[ hora ]', nombre: 'Fiesta y baile' },
    ],
  },
  {
    dia: 'Domingo',
    fecha: '31 de mayo',
    eventos: [
      { hora: '[ hora ]', nombre: 'Brunch de despedida' },
      { hora: '[ hora ]', nombre: 'Últimas fotos juntos' },
      { hora: '[ hora ]', nombre: 'Hasta pronto' },
    ],
  },
]

export default function Cronograma() {
  return (
    <section id="cronograma" className="scroll-mt-16 py-24 bg-hueso">
      <div className="mx-auto max-w-5xl px-5">

        {/* Encabezado */}
        <AnimateIn className="text-center mb-16">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-dorado mb-4">
            Agenda
          </p>
          <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] text-carbon leading-tight">
            Tres días de celebración
          </h2>
          <div className="w-10 h-px bg-dorado mx-auto mt-6" aria-hidden="true" />
        </AnimateIn>

        {/* Columnas por día */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DIAS.map(({ dia, fecha, principal, eventos }, i) => (
            <AnimateIn key={dia} delay={i * 110}>
              <div
                className={[
                  'flex flex-col gap-5 p-7 h-full',
                  principal
                    ? 'border border-dorado/45 bg-arena/20'
                    : 'border border-arena bg-transparent',
                ].join(' ')}
              >
                {/* Etiqueta día */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-dorado">
                      {dia}
                    </p>
                    {principal && (
                      <span className="font-sans text-[0.5rem] uppercase tracking-[0.15em] text-dorado/60 border border-dorado/30 px-1.5 py-0.5">
                        Día principal
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl text-carbon mt-0.5">{fecha}</h3>
                </div>

                {/* Separador */}
                <div className="w-6 h-px bg-dorado/40" aria-hidden="true" />

                {/* Eventos */}
                <ul className="space-y-3.5 flex-1">
                  {eventos.map(({ hora, nombre }) => (
                    <li key={nombre} className="flex gap-3 items-baseline">
                      <span className="font-sans text-[0.58rem] text-dorado/75 uppercase tracking-wide whitespace-nowrap shrink-0 min-w-[3.5rem]">
                        {hora}
                      </span>
                      <span className="font-sans text-[0.72rem] text-carbon/65 leading-snug">
                        {nombre}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Nota */}
        <AnimateIn delay={400} className="text-center mt-10">
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-carbon/35">
            Horarios exactos serán confirmados próximamente
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
