import Image from 'next/image'
import { AnimateIn } from './AnimateIn'

export default function LluviaSobres() {
  return (
    <section className="py-24 bg-hueso">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <AnimateIn className="flex flex-col items-center gap-8">
          <Image
            src="/lluvia de sobres.png"
            alt="Lluvia de sobres"
            width={0}
            height={0}
            sizes="(min-width: 768px) 420px, 80vw"
            className="w-64 md:w-80 h-auto"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-px bg-dorado" aria-hidden="true" />
            <p className="font-heading text-[1.1rem] text-carbon/70 leading-relaxed max-w-md font-normal italic">
              Lo más importante para nosotros es compartir este día con ustedes. Sabemos que el
              viaje y su compañía ya representan un regalo enorme. Si además desean hacernos un
              obsequio, hemos elegido la modalidad de lluvia de sobres.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
