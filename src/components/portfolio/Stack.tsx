const techs = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Figma", "Adobe XD", "React Native", "Flutter", "Docker", "AWS"];

export function Stack() {
  return (
    <section id="stack" className="relative py-32 md:py-48">
      <div className="mx-auto mb-16 max-w-7xl px-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" /> 03 — Stack
        </div>
        <h2 className="font-display mt-6 max-w-3xl text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.05] text-balance">
          What I bring to <span className="font-serif text-silver">the table</span>.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">A comprehensive skill set spanning design, development, and deployment.</p>
      </div>

      <div className="relative overflow-hidden border-y border-border py-10">
        <div className="marquee flex shrink-0 gap-16 whitespace-nowrap will-change-transform">
          {[...techs, ...techs].map((t, i) => (
            <span key={i} className="font-display flex items-center gap-16 text-5xl font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground md:text-7xl">
              {t}
              <span className="text-silver">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
