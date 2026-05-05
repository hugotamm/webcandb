export default function Header() {
  const navItems = ["Tjänster", "Galleri", "Priser", "Kalkylator", "Boka", "FAQ"];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#" className="text-xl font-bold tracking-tight">
            Web <span className="text-brand">C&B</span>
          </a>
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-brand-soft p-1 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-brand text-white">SV</span>
            <span className="px-3 py-1 text-muted">EN</span>
          </div>
          <button
            aria-label="Toggle dark mode"
            className="hidden sm:flex w-8 h-8 rounded-full border border-border items-center justify-center text-muted hover:text-foreground hover:border-foreground/40 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/80 hover:text-foreground transition"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#boka"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-3 text-sm font-semibold hover:bg-brand-hover transition shadow-sm"
        >
          Få en demo för 199 kr inkl. moms
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </header>
  );
}
