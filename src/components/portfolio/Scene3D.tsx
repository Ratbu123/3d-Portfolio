import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

function Monolith() {
  const group = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const [shape, setShape] = useState(0);

  const geometries = useMemo(
    () => [
      new THREE.IcosahedronGeometry(1.1, 4),
      new THREE.TorusKnotGeometry(0.8, 0.28, 160, 24),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TorusGeometry(0.9, 0.32, 32, 96),
      new THREE.DodecahedronGeometry(1.15, 0),
      new THREE.BoxGeometry(1.6, 1.6, 1.6, 4, 4, 4),
    ],
    []
  );
  const wireGeometries = useMemo(
    () => geometries.map((g) => g.clone().scale(1.45, 1.45, 1.45)),
    [geometries]
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const mx = state.mouse.x * 0.3;
    const my = state.mouse.y * 0.3;
    group.current.rotation.y += (mx - group.current.rotation.y) * 0.02 + 0.001;
    group.current.rotation.x += (-my - group.current.rotation.x) * 0.02;
    if (orb.current) orb.current.position.y = Math.sin(t * 0.6) * 0.15;
    if (wire.current) wire.current.rotation.y = t * 0.1;
  });

  useEffect(() => {
    if (!group.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.2 },
    });
    tl.to(group.current.position, { y: -2, z: 1 }, 0)
      .to(group.current.rotation, { z: Math.PI * 0.4 }, 0)
      .to(group.current.scale, { x: 1.4, y: 1.4, z: 1.4 }, 0.3);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const idx = Math.min(geometries.length - 1, Math.floor(p * geometries.length));
      setShape((prev) => (prev !== idx ? idx : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [geometries.length]);

  useEffect(() => {
    if (!orb.current || !wire.current) return;
    gsap.fromTo(
      [orb.current.scale, wire.current.scale],
      { x: 0.6, y: 0.6, z: 0.6 },
      { x: 1, y: 1, z: 1, duration: 1.1, ease: "elastic.out(1,0.55)" }
    );
    gsap.fromTo(
      orb.current.rotation,
      { x: 0, y: 0 },
      { x: Math.PI, y: Math.PI, duration: 1.2, ease: "power3.out" }
    );
  }, [shape]);

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={orb} geometry={geometries[shape]}>
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0.05}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.04}
            backside
            color="#ffffff"
          />
        </mesh>
        <mesh ref={wire} geometry={wireGeometries[shape]}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.14} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function Scene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#040404"]} />
        <fog attach="fog" args={["#040404", 6, 18]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#aaaaaa" />
        <Monolith />
        <Particles />
        <Environment preset="studio" />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />
    </div>
  );
}
