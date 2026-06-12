export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          CR<span className="text-coral">.</span>
        </a>
        <p className="text-muted text-sm text-center">
          Diseñado y desarrollado por{' '}
          <span className="text-white font-medium">Cristian Reyes</span>
        </p>
        <p className="text-muted/40 text-xs font-mono">
          React · TS · Node.js
        </p>
      </div>
    </footer>
  );
}
