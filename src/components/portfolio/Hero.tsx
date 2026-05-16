import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { SplitReveal } from "./SplitReveal";

const roles = ["Full-Stack Developer", "UI/UX Designer"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-meta", { opacity: 0, y: 20, duration: 1, delay: 0.6, stagger: 0.1, ease: "power3.out" });
      gsap.to(".hero-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative grain min-h-screen overflow-hidden">
      <div className="hero-parallax relative z-10 mx-auto flex min-h-screen flex-col justify-start md:justify-end px-6 pb-20 pt-24 md:pt-32">
        <div className="hero-meta mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" />
          <span>Welcome to my portfolio</span>
        </div>
        <h1 className="font-display text-[clamp(3rem,11vw,11rem)] font-medium leading-[0.9] text-balance">
          <SplitReveal as="span" className="block">Hi, I'm</SplitReveal>
          <span className="block">
            <SplitReveal as="span" className="inline" delay={0.15}>Rodolfo</SplitReveal>{" "}
            <span className="font-serif text-silver">Guce</span>
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-3">
          <div className="hero-meta md:col-span-1">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Currently</p>
            <div className="mt-2 h-7 overflow-hidden">
              <div
                className="transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)]"
                style={{ transform: `translateY(-${role * 1.75}rem)` }}
              >
                {roles.map((r) => (
                  <p key={r} className="h-7 text-base font-medium">{r}</p>
                ))}
              </div>
            </div>
          </div>
          <p className="hero-meta text-sm leading-relaxed text-muted-foreground md:col-span-1 md:text-base">
            Crafting elegant digital experiences with clean code and thoughtful design. I build products that users love and businesses need.
          </p>
          <div className="hero-meta flex items-center justify-start gap-3 md:justify-end">
            <a data-magnetic href="#work" className="group relative overflow-hidden rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background">
              <span className="relative z-10">View My Work</span>
            </a>
            <a data-magnetic href="#contact" className="rounded-full border border-border px-6 py-3 text-xs font-medium uppercase tracking-[0.2em]">Contact Me</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Scroll</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </div>
    </section>
  );
}
