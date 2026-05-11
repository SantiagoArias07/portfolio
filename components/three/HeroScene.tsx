"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

interface MouseRef {
  x: number;
  y: number;
}

function DistortedMesh({ mouseRef }: { mouseRef: React.RefObject<MouseRef> }) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = mouseRef.current ?? { x: 0, y: 0 };
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.6,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.6 + state.clock.elapsedTime * 0.04,
      0.04
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1}>
        <icosahedronGeometry args={[2, 3]} />
        <MeshDistortMaterial
          color="#00ff88"
          wireframe
          distort={0.35}
          speed={1.8}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      aria-hidden
      className="absolute inset-0"
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 6]} intensity={2} color="#00ff88" />
      <pointLight position={[-6, -4, -4]} intensity={0.8} color="#003322" />
      <Stars
        radius={80}
        depth={50}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />
      <DistortedMesh mouseRef={mouseRef} />
    </Canvas>
  );
}
