export function GlobalSparklesVideo() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden mix-blend-screen opacity-65"
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/golden-particles-overlay-mobile.mp4" type="video/mp4" />
      </video>
    </div>
  )
}