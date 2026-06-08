'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Nuestra historia', id: 'historia' },
  { label: 'Detalles', id: 'detalles' },
  { label: 'Cómo llegar', id: 'como-llegar' },
  { label: 'RSVP', id: 'rsvp' },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cerrar con Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function handleLink(id: string) {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-hueso/95 backdrop-blur-sm shadow-[0_1px_0_0_#E8DCC8]'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        {/* Marca */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver al inicio"
          className={cn(
            'font-heading text-[1.35rem] tracking-widest transition-colors duration-300',
            scrolled ? 'text-carbon' : 'text-white',
          )}
        >
          H &amp; J
        </button>

        {/* Links — desktop */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => handleLink(id)}
                className={cn(
                  'font-sans text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-300',
                  'min-h-[44px] flex items-center hover:text-dorado',
                  scrolled ? 'text-carbon' : 'text-white/85',
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburguesa — móvil */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={cn(
            'flex md:hidden items-center justify-center w-11 h-11 rounded-sm transition-colors duration-300',
            scrolled ? 'text-carbon' : 'text-white',
          )}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      <div
        id="mobile-menu"
        role="menu"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
          'bg-hueso/97 backdrop-blur-sm border-t border-arena',
        )}
      >
        <ul className="flex flex-col px-5 py-3" role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id} role="none">
              <button
                role="menuitem"
                onClick={() => handleLink(id)}
                className="w-full text-left font-sans text-[0.65rem] uppercase tracking-[0.18em] text-carbon hover:text-dorado min-h-[44px] flex items-center transition-colors border-b border-arena/50 last:border-0"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
