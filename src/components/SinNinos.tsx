import Image from 'next/image'
import { AnimateIn } from './AnimateIn'

export default function SinNinos() {
  return (
    <section className="py-24 bg-hueso">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <AnimateIn className="flex flex-col items-center gap-8">
          <Image
            src="/sin ninos.png"
            alt="Celebración solo adultos"
            width={0}
            height={0}
            sizes="(min-width: 768px) 420px, 80vw"
            className="w-64 md:w-80 h-auto"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-px bg-dorado" aria-hidden="true" />
            <p className="font-heading text-[1rem] text-carbon/70 leading-relaxed max-w-md font-normal">
              Aunque les tenemos mucho cariño a los niños, hemos decidido que esta celebración sea
              únicamente para adultos. Gracias por comprender y por acompañarnos en este día tan especial.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
