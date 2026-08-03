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
  const cubesRef = useRef<THREE.Group>(null);

  // Initialize petals (30)
  const petalData = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 12 + 2,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.12 + 0.08,
      speedY: Math.random() * 0.012 + 0.008,
      spinSpeed: Math.random() * 0.015 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize sparkles (50)
  const sparklesData = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    const speeds = new Float32Array(50);
    const offsets = new Float32Array(50);
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
      speeds[i] = Math.random() * 0.008 + 0.004;
      offsets[i] = Math.random() * 100;
    }
    return { pos, speeds, offsets };
  }, []);

  // Initialize hearts (12)
  const heartData = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      x: (Math.random() - 0.5) * 14,
      y: Math.random() * 10 - 5,
      z: (Math.random() - 0.5) * 5 - 2,
      scale: Math.random() * 0.08 + 0.05,
      speedY: Math.random() * 0.006 + 0.003,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize bubbles (15)
  const bubbleData = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 12 - 6,
      z: (Math.random() - 0.5) * 5 - 1,
      scale: Math.random() * 0.2 + 0.1,
      speedY: Math.random() * 0.01 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize floating glass cubes (10)
  const cubeData = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 10 - 5,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.3 + 0.15,
      speedRot: Math.random() * 0.01 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate petals
    if (petalsRef.current) {
      petalsRef.current.children.forEach((child, i) => {
        const data = petalData[i];
        if (!data) return;
        child.position.y -= data.speedY;
        child.position.x += Math.sin(time + data.offset) * 0.005;
        child.rotation.x += data.spinSpeed;
        child.rotation.y += data.spinSpeed * 0.5;

        if (child.position.y < -6) {
          child.position.y = 8;
          child.position.x = (Math.random() - 0.5) * 16;
        }
      });
    }

    // Animate sparkles
    if (sparklesRef.current) {
      const positions = sparklesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 50; i++) {
        positions[i * 3 + 1] -= sparklesData.speeds[i];
        positions[i * 3] += Math.sin(time + sparklesData.offsets[i]) * 0.003;
        if (positions[i * 3 + 1] < -6) {
          positions[i * 3 + 1] = 8;
        }
      }
      sparklesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate hearts
    if (heartsRef.current) {
      heartsRef.current.children.forEach((child, i) => {
        const data = heartData[i];
        if (!data) return;
        child.position.y += data.speedY;
        child.position.x += Math.cos(time * 0.8 + data.offset) * 0.004;

        if (child.position.y > 7) {
          child.position.y = -6;
          child.position.x = (Math.random() - 0.5) * 14;
        }
      });
    }

    // Animate bubbles
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((child, i) => {
        const data = bubbleData[i];
        if (!data) return;
        child.position.y += data.speedY;
        child.position.x += Math.sin(time + data.offset) * 0.006;

        if (child.position.y > 8) {
          child.position.y = -7;
          child.position.x = (Math.random() - 0.5) * 16;
        }
      });
    }

    // Animate glass cubes
    if (cubesRef.current) {
      cubesRef.current.children.forEach((child, i) => {
        const data = cubeData[i];
        if (!data) return;
        child.rotation.x += data.speedRot;
        child.rotation.y += data.speedRot * 0.8;
        child.position.y += Math.sin(time + data.offset) * 0.003;
      });
    }
  });

  return (
    <group>
      {/* Petals */}
      <group ref={petalsRef}>
        {petalData.map((data, i) => (
          <mesh
            key={i}
            position={[data.x, data.y, data.z]}
            scale={[data.scale, data.scale, data.scale]}
          >
            <shapeGeometry args={[petalShape]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FFB7D5" : "#EC4899"}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Sparkles */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparklesData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#C084FC"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Floating Hearts */}
      <group ref={heartsRef}>
        {heartData.map((data, i) => (
          <mesh
            key={i}
            position={[data.x, data.y, data.z]}
            scale={[data.scale, data.scale, data.scale]}
            rotation={[Math.PI, 0, 0]}
          >
            <shapeGeometry args={[heartShape]} />
            <meshStandardMaterial
              color="#F43F5E"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Glass Bubbles */}
      <group ref={bubblesRef}>
        {bubbleData.map((data, i) => (
          <mesh
            key={i}
            position={[data.x, data.y, data.z]}
            scale={[data.scale, data.scale, data.scale]}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color="#60A5FA"
              transparent
              opacity={0.2}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Glass Cubes */}
      <group ref={cubesRef}>
        {cubeData.map((data, i) => (
          <mesh
            key={i}
            position={[data.x, data.y, data.z]}
            scale={[data.scale, data.scale, data.scale]}
          >
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial
              color="#C084FC"
              transparent
              opacity={0.25}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
