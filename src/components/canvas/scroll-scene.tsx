"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollSceneProps {
  scrollProgress: { current: number };
  pointer: { current: { x: number; y: number } };
}

function CinematicSaaSUniverse({ scrollProgress, pointer }: ScrollSceneProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const gridPlaneRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Points>(null);
  const prismRef = useRef<THREE.Group>(null);

  // Concentric accelerator rings data
  const ringOffsets = useMemo(() => [-8, -4, 0, 4, 8], []);

  // Precomputed starfield / data particles
  const [starPositions, starColors] = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7C5CFF"),
      new THREE.Color("#38E1FF"),
      new THREE.Color("#C6FF4A"),
      new THREE.Color("#FFFFFF"),
    ];

    for (let i = 0; i < count; i++) {
      const seed1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r1 = seed1 - Math.floor(seed1);
      const seed2 = Math.sin((i + 1) * 39.346 + 11.135) * 43758.5453;
      const r2 = seed2 - Math.floor(seed2);
      const seed3 = Math.sin((i + 2) * 73.156 + 54.53) * 43758.5453;
      const r3 = seed3 - Math.floor(seed3);

      pos[i * 3] = (r1 - 0.5) * 26;
      pos[i * 3 + 1] = (r2 - 0.5) * 26;
      pos[i * 3 + 2] = (r3 - 0.5) * 20;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock, camera }, delta) => {
    if (!masterGroupRef.current) return;
    const progress = scrollProgress.current;
    const px = pointer.current.x;
    const py = pointer.current.y;
    const time = clock.getElapsedTime();

    // -------------------------------------------------------------
    // Cinematic Camera Travel through Space
    // -------------------------------------------------------------
    // In Hero (0.0): Camera at z=5.5
    // In Stats (0.25): Flits forward through warp tunnel to z=2.5
    // In Bento (0.55): Tilts down looking across holographic grid
    // In Terminal & About (0.8-1.0): Rises with wide perspective
    const targetCamZ = THREE.MathUtils.lerp(5.5, -1.5, Math.pow(progress, 0.9));
    const targetCamY = THREE.MathUtils.lerp(0.2, -1.2, progress) + py * 0.4;
    const targetCamX = px * 0.5;

    camera.position.z += (targetCamZ - camera.position.z) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;
    camera.position.x += (targetCamX - camera.position.x) * 0.05;

    // Subtle dynamic pitch tilt
    camera.rotation.x = -progress * 0.35 + py * 0.1;
    camera.rotation.y = -px * 0.15;

    // -------------------------------------------------------------
    // Warp Rings Animation
    // -------------------------------------------------------------
    if (ringsGroupRef.current) {
      ringsGroupRef.current.children.forEach((child, i) => {
        child.rotation.z += delta * (0.2 + i * 0.05);
        // Rings breathe and ripple as user scrolls
        const scaleVal = 1 + Math.sin(time * 1.5 + i) * 0.05 + progress * 0.3;
        child.scale.set(scaleVal, scaleVal, scaleVal);
      });
    }

    // -------------------------------------------------------------
    // Holographic Isometric Ground Grid
    // -------------------------------------------------------------
    if (gridPlaneRef.current) {
      gridPlaneRef.current.position.y = -3.2 + Math.sin(progress * Math.PI) * 0.6;
      gridPlaneRef.current.position.z = -progress * 10;
      gridPlaneRef.current.rotation.z = time * 0.03 + px * 0.05;
    }

    // -------------------------------------------------------------
    // Prism & Orbiting Matrix
    // -------------------------------------------------------------
    if (prismRef.current) {
      prismRef.current.rotation.x = time * 0.4 + progress * Math.PI * 2;
      prismRef.current.rotation.y = time * 0.6 + px * 0.5;
      prismRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.8, Math.sin(progress * Math.PI));
      prismRef.current.position.x = THREE.MathUtils.lerp(2.2, -1.8, progress);
    }

    // Starfield drift
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.03 + progress * 0.8;
      starsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <group ref={masterGroupRef}>
      {/* Dynamic Accelerator Warp Rings along Z-axis */}
      <group ref={ringsGroupRef}>
        {ringOffsets.map((zOffset, i) => (
          <mesh key={i} position={[0, 0, zOffset]}>
            <torusGeometry args={[3.4 + i * 0.4, 0.02, 16, 64]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#38E1FF" : "#7C5CFF"}
              emissive={i % 2 === 0 ? "#38E1FF" : "#7C5CFF"}
              emissiveIntensity={0.65}
              roughness={0.2}
              metalness={0.9}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Holographic Isometric Wave Grid Plane */}
      <mesh
        ref={gridPlaneRef}
        rotation={[-Math.PI / 2.2, 0, 0]}
        position={[0, -3.2, 0]}
      >
        <planeGeometry args={[32, 32, 28, 28]} />
        <meshBasicMaterial
          color="#38E1FF"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Floating Holographic Prism Core */}
      <group ref={prismRef} position={[2.2, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#7C5CFF"
            emissive="#38E1FF"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.16, 1]} />
          <meshBasicMaterial
            color="#C6FF4A"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Floating Halo around Prism */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#C6FF4A"
            emissive="#C6FF4A"
            emissiveIntensity={0.7}
          />
        </mesh>
      </group>

      {/* Deep-Space Constellation Stream */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function ScrollScene({
  scrollProgress,
  pointer,
}: ScrollSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 10, 6]} intensity={2.2} color="#38E1FF" />
      <pointLight position={[-6, -4, -3]} intensity={2.8} color="#7C5CFF" />
      <pointLight position={[5, -5, 4]} intensity={2.0} color="#C6FF4A" />

      <CinematicSaaSUniverse
        scrollProgress={scrollProgress}
        pointer={pointer}
      />
    </Canvas>
  );
}
