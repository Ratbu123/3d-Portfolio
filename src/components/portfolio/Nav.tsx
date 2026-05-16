import { useEffect, useState } from "react";
import { getLenis } from "@/hooks/useLenis";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", ...links.map((l) => l.id)];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button onClick={() => go("hero")} className="font-display text-sm font-semibold tracking-[0.2em] uppercase">
          Æ/01
        </button>
        <nav className={`hidden md:block transition-all duration-500 ${scrolled ? "glass rounded-full px-2 py-2" : ""}`}>
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  data-magnetic
                  onClick={() => go(l.id)}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {active === l.id && (
                    <span className="absolute inset-0 rounded-full bg-foreground/10" />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button data-magnetic onClick={() => go("contact")} className="group relative overflow-hidden rounded-full border border-border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em]">
          <span className="relative z-10 transition-colors group-hover:text-background">Let's talk</span>
          <span className="absolute inset-0 -translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
        </button>
      </div>
    </header>
  );
}
