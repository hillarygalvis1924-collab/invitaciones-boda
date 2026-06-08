'use client'

import { useState, useEffect, Fragment } from 'react'

const TARGET = new Date('2027-05-29T00:00:00-05:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const BLOCKS = [
  { key: 'days', label: 'días' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'seg' },
] as const

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Cuenta regresiva para la boda"
      className="flex items-end mt-4"
    >
      {BLOCKS.map(({ key, label }, i) => (
        <Fragment key={key}>
          <div className="flex flex-col items-center px-3 md:px-5">
            <span className="font-heading text-[clamp(2rem,8vw,3.5rem)] leading-none text-white tabular-nums">
              {String(time[key]).padStart(2, '0')}
            </span>
            <span className="font-sans text-[0.5rem] uppercase tracking-[0.18em] text-white/50 mt-1.5">
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="font-heading text-2xl text-white/25 self-end mb-5" aria-hidden="true">
              ·
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
