import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code2, Sparkles, Layers, Cpu, Coffee, Award } from "lucide-react";
import { SplitReveal } from "./SplitReveal";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: end, duration: 2, ease: "power2.out",
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.v) + suffix; },
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-baseline justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-foreground/40" /> 01 — About
          </div>
        </div>
        <SplitReveal as="h2" className="font-display max-w-4xl text-[clamp(2.2rem,5.5vw,5rem)] font-medium leading-[1.05] text-balance">
          Building digital products with passion.
        </SplitReveal>

        <div className="mt-20 grid grid-cols-12 gap-4">
          <div className="glass relative col-span-12 overflow-hidden rounded-2xl p-8 md:col-span-7 md:row-span-2 md:p-10">
            <Sparkles className="h-6 w-6 text-silver" />
            <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              I'm a full-stack developer and <span className="font-serif text-silver">UI/UX designer</span> with over 6 years of experience creating beautiful, functional digital products.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              I specialize in modern web technologies and love turning complex problems into simple, elegant solutions — from responsive web apps to complete design systems.
            </p>
          </div>
          {[
            { icon: Code2, k: "Years Experience", v: 6, s: "+" },
            { icon: Layers, k: "Projects", v: 50, s: "+" },
            { icon: Award, k: "Awards", v: 15, s: "+" },
            { icon: Coffee, k: "Coffees", v: 1000, s: "+" },
          ].map(({ icon: Icon, k, v, s }, i) => (
            <div key={i} className="glass col-span-6 rounded-2xl p-6 md:col-span-2 md:p-8">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div className="mt-6 font-display text-4xl font-medium md:text-5xl">
                <Counter end={v} suffix={s} />
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</p>
            </div>
          ))}
          <div className="glass col-span-12 flex items-center gap-6 rounded-2xl p-8 md:col-span-5">
            <Cpu className="h-8 w-8 text-silver" />
            <div>
              <p className="font-display text-xl">React · Next.js · Node</p>
              <p className="mt-1 text-sm text-muted-foreground">Mentoring developers and contributing to open source.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
