import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, Icosahedron } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Monolith() {
  const group = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

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
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={orb}>
          <icosahedronGeometry args={[1.1, 4]} />
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
        <mesh ref={wire} scale={1.55}>
          <Icosahedron args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
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
