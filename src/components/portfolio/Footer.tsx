export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative h-px w-full overflow-hidden bg-border">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/60 to-transparent animate-[marquee_8s_linear_infinite]" />
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Rodolfo Guce · Designed & built in motion</p>
          <p>v1.0 · Lisbon ◦ 38.7°N</p>
        </div>
      </div>
    </footer>
  );
}
