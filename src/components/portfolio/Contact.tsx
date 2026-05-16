import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { SplitReveal } from "./SplitReveal";

const socials = [
  { Icon: Github, label: "Github" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
];

export function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <section id="contact" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" /> 05 — Contact
        </div>
        <SplitReveal as="h2" className="font-display max-w-5xl text-[clamp(2.5rem,8vw,8rem)] font-medium leading-[1] text-balance">
          Let's work together.
        </SplitReveal>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Have a project in mind? Feel free to reach out and let's create something amazing.
        </p>

        <div className="mt-20 grid grid-cols-12 gap-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="col-span-12 space-y-8 lg:col-span-7"
          >
            {[
              { id: "name", label: "Your name", type: "text" },
              { id: "email", label: "Email address", type: "email" },
              { id: "msg", label: "Tell me about the project", type: "textarea" },
            ].map((f) => (
              <div key={f.id} className="relative border-b border-border pb-3">
                <label
                  className={`pointer-events-none absolute left-0 origin-left transition-all duration-300 ${
                    focused === f.id ? "-translate-y-3 scale-75 text-silver" : "translate-y-3 text-muted-foreground"
                  } text-xs uppercase tracking-[0.25em]`}
                >
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    onFocus={() => setFocused(f.id)}
                    onBlur={() => setFocused(null)}
                    className="w-full resize-none bg-transparent pt-6 text-lg outline-none"
                  />
                ) : (
                  <input
                    type={f.type}
                    onFocus={() => setFocused(f.id)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent pt-6 text-lg outline-none"
                  />
                )}
              </div>
            ))}
            <button
              data-magnetic
              type="submit"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-background"
            >
              <span className="relative z-10">Send transmission</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>

          <aside className="col-span-12 space-y-12 lg:col-span-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Email</p>
              <a href="mailto:GuceDiter03@gmail.com" className="font-display mt-3 block text-xl md:text-2xl">GuceDiter03@gmail.com</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Phone</p>
              <p className="font-display mt-3 text-2xl">+69 963 679 6878</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Based</p>
              <p className="font-display mt-3 text-2xl">Alitagtag, Batangas</p>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Elsewhere</p>
              <div className="flex gap-3">
                {socials.map(({ Icon, label }) => (
                  <a key={label} data-magnetic href="#" aria-label={label} className="glass flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:-translate-y-1">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
