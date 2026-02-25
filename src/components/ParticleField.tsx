import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const orig = new Float32Array(PARTICLE_COUNT * 3);
    // Create a "C" shape for the target
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random starting positions
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      // C shape target
      const angle = (Math.PI * 0.3) + (Math.random() * Math.PI * 1.4);
      const radius = 2 + Math.random() * 0.5;
      orig[i * 3] = Math.cos(angle) * radius;
      orig[i * 3 + 1] = Math.sin(angle) * radius;
      orig[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return [pos, orig];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const neonGreen = new THREE.Color("hsl(82, 100%, 55%)");
    const electricPurple = new THREE.Color("hsl(270, 100%, 65%)");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mix = Math.random();
      const color = neonGreen.clone().lerp(electricPurple, mix);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Attach listener
  useMemo(() => {
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;
    const mouseDist = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const attract = Math.min(mouseDist * 0.5, 1);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Lerp toward target position with mouse influence
      const tx = originalPositions[i3];
      const ty = originalPositions[i3 + 1];
      const tz = originalPositions[i3 + 2];

      // Add subtle drift
      const drift = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.02;

      arr[i3] += (tx - arr[i3]) * 0.02 * attract + drift;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * 0.02 * attract + drift * 0.5;
      arr[i3 + 2] += (tz - arr[i3 + 2]) * 0.01;
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
