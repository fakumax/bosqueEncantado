export function MagicParticles() {
  return (
    <div
      id="spark-overlay"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <video
        src="/videos/spark1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  )
}
