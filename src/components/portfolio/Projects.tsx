import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  { n: "01", title: "E-Commerce Platform", tag: "Featured", year: "2026", stack: ["React", "Node.js", "MongoDB", "Stripe"], desc: "A fully responsive online shopping platform with cart management, payment integration, and admin dashboard." },
  { n: "02", title: "Project Management Tool", tag: "Web App", year: "2025", stack: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"], desc: "Collaborative workspace for teams with task tracking, time management, and real-time updates." },
  { n: "03", title: "Design System", tag: "Featured", year: "2025", stack: ["React", "Tailwind", "Storybook", "TypeScript"], desc: "Comprehensive UI component library with extensive documentation and accessibility features." },
  { n: "04", title: "Analytics Dashboard", tag: "Data Viz", year: "2024", stack: ["Vue.js", "D3.js", "Express", "Redis"], desc: "Real-time data visualization platform with customizable widgets and comprehensive reporting." },
  { n: "05", title: "Mobile Banking App", tag: "Mobile", year: "2024", stack: ["React Native", "Firebase", "Node.js", "JWT"], desc: "Secure mobile-first banking solution with biometric authentication and instant transfers." },
  { n: "06", title: "AI Content Generator", tag: "Featured", year: "2024", stack: ["Python", "OpenAI", "FastAPI", "React"], desc: "Machine learning powered tool for generating marketing copy and creative content." },
];

export function Projects() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tw = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => { tw.scrollTrigger?.kill(); tw.kill(); };
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative">
      <div className="mx-auto flex max-w-7xl items-baseline justify-between px-6 pt-32 pb-12">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" /> 02 — Selected Work
        </div>
        <p className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">Drag · Scroll</p>
      </div>

      <div ref={wrap} className="relative h-screen overflow-hidden">
        <div ref={track} className="flex h-full items-center gap-8 px-6 will-change-transform">
          {projects.map((p) => (
            <article
              key={p.n}
              className="glass group relative h-[68vh] w-[78vw] shrink-0 overflow-hidden rounded-2xl md:w-[52vw] lg:w-[42vw]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{p.n} / {projects.length.toString().padStart(2, "0")}</span>
                  <span>{p.year}</span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{p.tag}</p>
                  <h3 className="font-display mt-3 text-5xl font-medium leading-[0.95] md:text-6xl">{p.title}</h3>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button data-magnetic className="group/b inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-background">
                      Live <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5" />
                    </button>
                    <button data-magnetic className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em]">
                      <Github className="h-3.5 w-3.5" /> Code
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
