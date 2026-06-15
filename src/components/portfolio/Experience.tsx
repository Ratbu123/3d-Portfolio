import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  { y: "2026 — Present", role: "Full-Stack Developer", co: "NextGenIT Solutions", q: "Leading development of enterprise web applications. Architecting scalable solutions and mentoring junior developers. Reduced load time by 60% and led a team of 5." },
  { y: "2025 — 2026", role: "UI/UX Developer", co: "Canva & Figma", q: "Bridged design and development teams to create seamless user experiences across web and mobile. Designed a component library used by 50+ developers and increased engagement by 45%." },
  { y: "2024 — 2025", role: "Frontend Developer", co: "Freelancing", q: "Developed responsive web applications using modern JavaScript frameworks. Built 15+ client projects from concept to deployment and mentored 3 junior developers." },
  { y: "2023 — 2024", role: "Senior High — Web Development", co: "Alitagtag Senior High School", q: "Graduated with honors. Avg 91.5. Top student on web development with focus on web designs" },
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
