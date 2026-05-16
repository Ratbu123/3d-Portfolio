import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SplitReveal({
  children, as: Tag = "h2", className = "", delay = 0,
}: { children: string; as?: any; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden align-bottom mr-[0.25em]"><span class="inline-block translate-y-full will-change-transform">${w}</span></span>`
      )
      .join("");
    const inner = el.querySelectorAll<HTMLElement>("span > span");
    const tw = gsap.to(inner, {
      yPercent: -100,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.06,
      delay,
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [children, delay]);

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}
