'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface FotoStripProps {
  fotos: string[]
}

export default function FotoStrip({ fotos }: FotoStripProps) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (fotos.length <= 1) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % fotos.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(timer)
  }, [fotos.length])

  return (
    <div className="py-8 bg-hueso">
      <div className="mx-auto max-w-2xl px-5">
        <div className="overflow-hidden">
          <Image
            src={fotos[idx]}
            alt="Hillary y Juan Pablo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 672px"
            loading="lazy"
            className="w-full h-auto transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          />
        </div>
      </div>
    </div>
  )
}
