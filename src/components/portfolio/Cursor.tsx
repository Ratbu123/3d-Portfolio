import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      dxTo(e.clientX); dyTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-magnetic], a, button")) {
        gsap.to(ring, { scale: 2.4, opacity: 0.8, duration: 0.4 });
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4 });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground mix-blend-difference md:block" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference md:block" />
    </>
  );
}
