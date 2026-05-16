import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/portfolio/Cursor";
import { Scene3D } from "@/components/portfolio/Scene3D";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Stack } from "@/components/portfolio/Stack";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ætherion — Creative Developer Portfolio" },
      { name: "description", content: "Cinematic portfolio of a creative developer crafting immersive 3D web experiences with WebGL, GSAP, and motion design." },
      { property: "og:title", content: "Ætherion — Creative Developer Portfolio" },
      { property: "og:description", content: "Cinematic portfolio of a creative developer crafting immersive 3D web experiences." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative">
      <Cursor />
      <Scene3D />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
