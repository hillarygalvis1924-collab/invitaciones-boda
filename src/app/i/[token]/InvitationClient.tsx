'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './InvitationClient.module.css'
import { useAudio } from '@/components/AudioProvider'

type Status = 'loading' | 'ok' | 'blocked' | 'invalid'

interface GuestData {
  name: string
  message: string
  cupos: number
}

interface Props {
  token: string
}

const DEFAULT_MSG =
  'Con todo nuestro cariño te invitamos a acompañarnos en uno de los días más importantes de nuestras vidas. Tu presencia significa el mundo para nosotros y queremos celebrar este momento rodeados de las personas que más queremos. Será un fin de semana inolvidable frente al mar.'

/* Fotos polaroid — colocar en /public/invitacion/
   Área visible: ~134×133 px. Proporción libre, se recorta centrado. */
const PHOTOS: { src: string; cap: string; cls: 'p1' | 'p2' | 'p3' }[] = [
  { src: '/invitacion/Foto-1.jpg', cap: 'tú y yo',     cls: 'p1' },
  { src: '/invitacion/Foto-2.jpg', cap: 'por siempre', cls: 'p2' },
  { src: '/invitacion/Foto-3.jpg', cap: 'la playa',    cls: 'p3' },
]

export default function InvitationClient({ token }: Props) {
  const [status, setStatus]           = useState<Status>('loading')
  const [guest, setGuest]             = useState<GuestData | null>(null)
  const [blockedName, setBlockedName] = useState('')
  const [open, setOpen]               = useState(false)
  const { play }                      = useAudio()

  /* ── Device binding ─────────────────────────────────────────────────── */
  useEffect(() => {
    let deviceId = localStorage.getItem('inv-device-id')
    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem('inv-device-id', deviceId)
    }

    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, deviceId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.allowed) {
          setGuest(data.guest)
          setStatus('ok')
        } else if (data.reason === 'other_device') {
          setBlockedName(data.guest?.name ?? '')
          setStatus('blocked')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => setStatus('invalid'))
  }, [token])

  const handleOpen = useCallback(() => {
    if (!open) {
      setOpen(true)
      play()
    }
  }, [open, play])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !open) {
        e.preventDefault()
        handleOpen()
      }
    },
    [open, handleOpen],
  )

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (status === 'loading') {
    return (
      <div className={styles.stateScreen}>
        <div className={styles.loadingDot} />
      </div>
    )
  }

  /* ── Invalid ─────────────────────────────────────────────────────────── */
  if (status === 'invalid') {
    return (
      <div className={styles.stateScreen}>
        <p className={styles.stateMsg}>Esta invitación no está disponible.</p>
        <p className={styles.stateSub}>Verifica el enlace o contacta a los novios.</p>
      </div>
    )
  }

  /* ── Blocked ─────────────────────────────────────────────────────────── */
  if (status === 'blocked') {
    return (
      <div className={styles.stateScreen}>
        <p className={styles.stateMsg}>
          Esta invitación es personal de {blockedName || 'este invitado'}.
        </p>
        <p className={styles.stateSub}>Si necesitas ayuda, escríbenos.</p>
      </div>
    )
  }

  /* ── OK — sobre ──────────────────────────────────────────────────────── */
  const g   = guest!
  const msg = g.message.trim() || DEFAULT_MSG

  return (
    <div className={`${styles.wrapper} ${open ? styles.wrapperOpen : ''}`}>

      <div
        className={`${styles.scene} ${open ? styles.sceneOpen : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Tocar para abrir la invitación"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
      >
        {/* Reveal: aparece encima del sobre al abrirlo */}
        <div className={styles.reveal}>
          <div className={styles.revealScript}>Nos casamos</div>
          <div className={styles.revealDate}>29 · 30 · 31 de Mayo, 2027</div>
          <div className={styles.revealPlace}>Tolú · Sucre</div>
        </div>

        <div className={styles.env}>
          <div className={styles.back} />

          {/* Carta con mensaje personalizado */}
          <div className={styles.letter}>
            <div className={styles.hi}>Querido {g.name}</div>
            <div className={styles.rule} />
            <div className={styles.msg}>{msg}</div>
            <div className={styles.sign}>Juan Pablo &amp; Hillary</div>
            <Link
              href="/"
              className={styles.btn}
              onClick={(e) => e.stopPropagation()}
            >
              Detalles
            </Link>
          </div>

          {/* Fotos polaroid */}
          <div className={styles.photos}>
            {PHOTOS.map(({ src, cap, cls }) => (
              <div key={src} className={`${styles.photo} ${styles[cls]}`}>
                <div className={styles.img}>
                  <Image
                    src={src}
                    alt={cap}
                    fill
                    className="object-cover"
                    sizes="134px"
                    loading="lazy"
                  />
                </div>
                <div className={styles.cap}>{cap}</div>
              </div>
            ))}
          </div>

          {/* Solapas del sobre */}
          <div className={`${styles.flap} ${styles.flapLeft}`} />
          <div className={`${styles.flap} ${styles.flapRight}`} />
          <div className={`${styles.flap} ${styles.flapBottom}`} />

          {/* Nombre del destinatario en el frente */}
          <div className={styles.name}>
            <small className={styles.nameSmall}>Para</small>
            {g.name}
          </div>

          <div className={`${styles.flap} ${styles.flapTop}`} />

          {/* Lacre */}
          <div className={styles.seal}>
            <span className={styles.sealSpan}>J&amp;H</span>
          </div>
        </div>
      </div>

      <p className={`${styles.hint} ${open ? styles.hintHidden : ''}`}>
        Toca el sobre para abrir
      </p>
    </div>
  )
}
