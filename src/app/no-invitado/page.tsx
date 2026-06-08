export default function NoInvitado() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(120% 90% at 50% 18%, #FBF8F1 0%, #F7F3EA 55%, #EEE6D6 100%)',
        padding: '2rem',
        gap: '1rem',
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      }}
    >
      <p style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', fontStyle: 'italic', color: '#5C4A30' }}>
        Esta página es exclusiva para invitados.
      </p>
      <p style={{ fontSize: '1.1rem', letterSpacing: '0.08em', color: '#5C4A30', opacity: 0.5 }}>
        Si recibiste un enlace de invitación, úsalo para acceder.
      </p>
    </div>
  )
}
