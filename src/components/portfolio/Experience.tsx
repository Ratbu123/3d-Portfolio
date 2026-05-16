import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  { y: "2024 — Now", role: "Lead Creative Engineer", co: "Studio Vellum", q: "Alex turns brand language into living systems. The work doesn't just animate — it breathes." },
  { y: "2022 — 2024", role: "Senior Frontend Engineer", co: "Northbound Labs", q: "Rare combination of taste, motion craft, and engineering rigor. Shipped three product launches with zero regressions." },
  { y: "2020 — 2022", role: "Interactive Developer", co: "Atelier Dix", q: "Owned every WebGL surface we shipped. Pages routinely picked up Awwwards SOTD." },
];

export function Experience() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".xp-card").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 60, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" /> 04 — Experience
        </div>
        <div className="space-y-6">
          {items.map((it, i) => (
            <article key={i} className="xp-card glass grid grid-cols-12 gap-6 rounded-2xl p-8 md:p-12">
              <div className="col-span-12 md:col-span-3">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{it.y}</p>
                <p className="font-display mt-2 text-xl">{it.co}</p>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-xs uppercase tracking-[0.25em] text-silver">{it.role}</p>
                <p className="font-display mt-4 text-2xl leading-snug md:text-3xl">
                  <span className="font-serif text-silver">"</span>{it.q}<span className="font-serif text-silver">"</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
