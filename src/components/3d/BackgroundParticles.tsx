import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a heart shape
const heartShape = (() => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0, 0.3, 0.3, 0.6, 0.6, 0.6);
  shape.bezierCurveTo(0.9, 0.6, 0.9, 0.2, 0.9, 0.2);
  shape.bezierCurveTo(0.9, -0.2, 0.5, -0.6, 0, -1.0);
  shape.bezierCurveTo(-0.5, -0.6, -0.9, -0.2, -0.9, 0.2);
  shape.bezierCurveTo(-0.9, 0.2, -0.9, 0.6, -0.6, 0.6);
  shape.bezierCurveTo(-0.3, 0.6, 0, 0.3, 0, 0);
  return shape;
})();

// Create a petal shape
const petalShape = (() => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.3, 0.5, 0.1, 1.0);
  shape.quadraticCurveTo(-0.1, 1.0, -0.3, 0.5);
  shape.quadraticCurveTo(0, 0.0, 0, 0);
  return shape;
})();

export function BackgroundParticles() {
  const petalsRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Points>(null);
  const heartsRef = useRef<THREE.Group>(null);
  const bubblesRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  // Initialize petals (25)
  const petalData = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      x: (Math.random() - 0.5) * 14,
      y: Math.random() * 10 + 2,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.12 + 0.08,
      speedY: Math.random() * 0.012 + 0.008,
      spinSpeed: Math.random() * 0.015 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize sparkles (40)
  const sparklesData = useMemo(() => {
    const pos = new Float32Array(40 * 3);
    const speeds = new Float32Array(40);
    const offsets = new Float32Array(40);
    for (let i = 0; i < 40; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
      speeds[i] = Math.random() * 0.008 + 0.004;
      offsets[i] = Math.random() * 100;
    }
    return { pos, speeds, offsets };
  }, []);

  // Initialize hearts (8)
  const heartsData = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 8 - 4,
      z: (Math.random() - 0.5) * 4 - 3,
      scale: Math.random() * 0.06 + 0.04,
      speedY: Math.random() * 0.008 + 0.004,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize bubbles (10)
  const bubblesData = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 8 - 4,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.15 + 0.06,
      speedY: Math.random() * 0.01 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize stars (35)
  const starsData = useMemo(() => {
    const pos = new Float32Array(35 * 3);
    for (let i = 0; i < 35; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4;
    }
    return { pos };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Animate Petals
    if (petalsRef.current) {
      petalsRef.current.children.forEach((child, i) => {
        const data = petalData[i];
        data.y -= data.speedY;
        data.x += Math.sin(time + data.offset) * 0.004;
        child.position.set(data.x, data.y, data.z);
        child.rotation.x += data.spinSpeed;
        child.rotation.y += data.spinSpeed * 0.5;

        if (data.y < -5) {
          data.y = 6;
          data.x = (Math.random() - 0.5) * 14;
        }
      });
    }

    // 2. Animate Sparkles
    if (sparklesRef.current) {
      const posAttr = sparklesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < 40; i++) {
        const idx = i * 3;
        arr[idx + 1] -= sparklesData.speeds[i];
        arr[idx] += Math.sin(time + sparklesData.offsets[i]) * 0.002;

        if (arr[idx + 1] < -6) {
          arr[idx + 1] = 6;
          arr[idx] = (Math.random() - 0.5) * 14;
        }
      }
      posAttr.needsUpdate = true;
    }

    // 3. Animate Hearts
    if (heartsRef.current) {
      heartsRef.current.children.forEach((child, i) => {
        const data = heartsData[i];
        data.y += data.speedY;
        data.x += Math.sin(time * 0.5 + data.offset) * 0.003;
        child.position.set(data.x, data.y, data.z);

        if (data.y > 6) {
          data.y = -6;
          data.x = (Math.random() - 0.5) * 10;
        }
      });
    }

    // 4. Animate Bubbles
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((child, i) => {
        const data = bubblesData[i];
        data.y += data.speedY;
        data.x += Math.cos(time * 0.3 + data.offset) * 0.004;
        child.position.set(data.x, data.y, data.z);

        if (data.y > 6) {
          data.y = -6;
          data.x = (Math.random() - 0.5) * 12;
        }
      });
    }

    // 5. Stars Rotation
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.01;
    }
  });

  return (
    <group>
      {/* 1. Flower Petals */}
      <group ref={petalsRef}>
        {petalData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]} scale={[data.scale, data.scale, data.scale]}>
            <shapeGeometry args={[petalShape]} />
            <meshStandardMaterial 
              color="#EC4899" 
              roughness={0.4} 
              transparent
              opacity={0.65}
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}
      </group>

      {/* 2. Sparkles */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparklesData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#3B82F6"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* 3. Hearts */}
      <group ref={heartsRef}>
        {heartsData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]} scale={[data.scale, data.scale, data.scale]}>
            <shapeGeometry args={[heartShape]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* 4. Glass Bubbles */}
      <group ref={bubblesRef}>
        {bubblesData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]}>
            <sphereGeometry args={[data.scale, 16, 16]} />
            <meshStandardMaterial
              color="#06B6D4"
              roughness={0.1}
              metalness={0.2}
              transparent
              opacity={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starsData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#FFFFFF"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default BackgroundParticles;
