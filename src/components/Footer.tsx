export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              Web <span className="text-brand">C&B</span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Svensk webbyrå som förändrar det som finns och bygger det som borde finnas.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              Sajt
            </div>
            <ul className="space-y-2.5 text-sm">
              {["Tjänster", "Galleri", "Priser", "Kalkylator", "Boka", "FAQ"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/80 hover:text-brand transition"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              Kontakt
            </div>
            <a
              href="mailto:web.candb@gmail.com"
              className="text-sm text-white/80 hover:text-brand transition block"
            >
              web.candb@gmail.com
            </a>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Svar inom 24 timmar.
              <br />
              Vardagar 09–18.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Web C&B · Alla rättigheter förbehållna</div>
          <div className="flex items-center gap-2">
            <span>Byggd med</span>
            <span className="font-semibold text-white/70">Next.js</span>
            <span>·</span>
            <span className="font-semibold text-white/70">Tailwind</span>
            <span>·</span>
            <span className="font-semibold text-white/70">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
