"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ChromaticQuantumKnot({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mainKnotRef = useRef<THREE.Mesh>(null);
  const wireKnotRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const gimbalRingRef = useRef<THREE.Mesh>(null);
  const outerGimbalRef = useRef<THREE.Mesh>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    const time = clock.getElapsedTime();

    // Smooth spring tilt towards mouse pointer
    groupRef.current.rotation.y += (px * 0.9 - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (-py * 0.9 - groupRef.current.rotation.x) * 0.06;

    // Continuous majestic rotation
    if (mainKnotRef.current) {
      mainKnotRef.current.rotation.x = time * 0.35;
      mainKnotRef.current.rotation.y = time * 0.45;
    }
    if (wireKnotRef.current) {
      wireKnotRef.current.rotation.x = time * 0.35;
      wireKnotRef.current.rotation.y = time * 0.45;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.8;
      innerCoreRef.current.rotation.y += delta * 1.1;
    }
    if (gimbalRingRef.current) {
      gimbalRingRef.current.rotation.z -= delta * 0.25;
      gimbalRingRef.current.rotation.x += delta * 0.15;
    }
    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.y += delta * 0.2;
      outerGimbalRef.current.rotation.z += delta * 0.1;
    }
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y = time * 0.6;
      satellitesGroupRef.current.rotation.x = Math.sin(time * 0.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Chrome Metallic Torus Knot */}
      <mesh ref={mainKnotRef}>
        <torusKnotGeometry args={[1.15, 0.36, 256, 32, 2, 3]} />
        <meshStandardMaterial
          color="#0f0f18"
          emissive="#241442"
          emissiveIntensity={0.35}
          roughness={0.12}
          metalness={0.94}
        />
      </mesh>

      {/* Outer Laser Wireframe Shell */}
      <mesh ref={wireKnotRef}>
        <torusKnotGeometry args={[1.16, 0.365, 120, 20, 2, 3]} />
        <meshBasicMaterial
          color="#38E1FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Internal High-Energy Octahedral Singularity */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#C6FF4A"
          emissive="#C6FF4A"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>

      {/* Inner Cyber Gimbal Ring (Cyan) */}
      <mesh ref={gimbalRingRef}>
        <torusGeometry args={[2.05, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#38E1FF"
          emissive="#38E1FF"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Gyro Gimbal Ring (Lime) */}
      <mesh ref={outerGimbalRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.45, 0.016, 16, 80]} />
        <meshStandardMaterial
          color="#C6FF4A"
          emissive="#C6FF4A"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Orbiting Holographic Data Crystals */}
      <group ref={satellitesGroupRef}>
        <mesh position={[2.2, 0.4, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#38E1FF"
            emissive="#38E1FF"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[-2.2, -0.4, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#C6FF4A"
            emissive="#C6FF4A"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0, 2.45, 0]}>
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color="#7C5CFF"
            emissive="#7C5CFF"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

function CyberConstellation({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7C5CFF"),
      new THREE.Color("#38E1FF"),
      new THREE.Color("#C6FF4A"),
    ];

    for (let i = 0; i < count; i++) {
      // Deterministic seed formula for React 19 purity
      const seed1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r1 = seed1 - Math.floor(seed1);
      const seed2 = Math.sin((i + 1) * 39.346 + 11.135) * 43758.5453;
      const r2 = seed2 - Math.floor(seed2);
      const seed3 = Math.sin((i + 2) * 73.156 + 54.53) * 43758.5453;
      const r3 = seed3 - Math.floor(seed3);

      pos[i * 3] = (r1 - 0.5) * 14;
      pos[i * 3 + 1] = (r2 - 0.5) * 14;
      pos[i * 3 + 2] = (r3 - 0.5) * 10;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 6]} intensity={2.2} color="#38E1FF" />
        <pointLight position={[-5, -4, -3]} intensity={2.8} color="#7C5CFF" />
        <pointLight position={[4, -5, 3]} intensity={1.8} color="#C6FF4A" />

        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.2}>
          <ChromaticQuantumKnot pointer={pointer} />
        </Float>

        <CyberConstellation count={110} />
      </Canvas>
    </div>
  );
}
