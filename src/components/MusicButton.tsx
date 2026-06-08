'use client'

import { Music } from 'lucide-react'
import { useAudio } from './AudioProvider'

export default function MusicButton() {
  const { playing, toggle } = useAudio()

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-hueso/90 border border-dorado/40 flex items-center justify-center shadow-md hover:border-dorado transition-colors duration-300 backdrop-blur-sm"
    >
      <Music
        size={22}
        strokeWidth={1.5}
        className={`transition-colors duration-300 ${
          playing
            ? 'text-dorado animate-spin [animation-duration:3s]'
            : 'text-carbon/40'
        }`}
      />
    </button>
  )
}
