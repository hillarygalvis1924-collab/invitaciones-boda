'use client'

import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'

interface AudioContextValue {
  playing: boolean
  play: () => Promise<void>
  toggle: () => void
}

const AudioCtx = createContext<AudioContextValue>({
  playing: false,
  play: async () => {},
  toggle: () => {},
})

export function useAudio() {
  return useContext(AudioCtx)
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(async () => {
    const a = audioRef.current
    if (!a || !a.paused) return
    a.volume = 0.4
    try { await a.play() } catch { /* bloqueado por el navegador; ignorar */ }
  }, [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.volume = 0.4
      a.play().catch(() => {})
    } else {
      a.pause()
    }
  }, [])

  // Fallback: primer click/touch en la página arranca la música (un solo uso)
  useEffect(() => {
    const handler = () => { play() }
    document.addEventListener('click', handler, { once: true })
    document.addEventListener('touchstart', handler, { once: true })
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [play])

  return (
    <AudioCtx.Provider value={{ playing, play, toggle }}>
      <audio
        ref={audioRef}
        src="/cancion.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {children}
    </AudioCtx.Provider>
  )
}
