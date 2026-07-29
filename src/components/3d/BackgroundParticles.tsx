import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
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
  const butterfly1Ref = useRef<THREE.Group>(null);
  const butterfly2Ref = useRef<THREE.Group>(null);
  const lightRaysRef = useRef<THREE.Group>(null);

  // Initialize petals (30)
  const petalData = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 8 + 4,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.15 + 0.1,
      speedY: Math.random() * 0.015 + 0.01,
      speedX: (Math.random() - 0.5) * 0.01,
      spinSpeed: Math.random() * 0.02 + 0.01,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize sparkles (60)
  const sparklesData = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    const speeds = new Float32Array(60);
    const offsets = new Float32Array(60);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      speeds[i] = Math.random() * 0.01 + 0.005;
      offsets[i] = Math.random() * 100;
    }
    return { pos, speeds, offsets };
  }, []);

  // Initialize hearts (12)
  const heartsData = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 8 - 4,
      z: (Math.random() - 0.5) * 4 - 3,
      scale: Math.random() * 0.08 + 0.05,
      speedY: Math.random() * 0.01 + 0.005,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize bubbles (15)
  const bubblesData = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 8 - 4,
      z: (Math.random() - 0.5) * 6 - 2,
      scale: Math.random() * 0.2 + 0.08,
      speedY: Math.random() * 0.015 + 0.01,
      offset: Math.random() * 100,
    }));
  }, []);

  // Initialize stars (50)
  const starsData = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    const frequencies = new Float32Array(50);
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4;
      frequencies[i] = Math.random() * 2 + 1;
    }
    return { pos, frequencies };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Animate Petals
    if (petalsRef.current) {
      petalsRef.current.children.forEach((child, i) => {
        const data = petalData[i];
        data.y -= data.speedY;
        data.x += Math.sin(time + data.offset) * 0.005;
        child.position.set(data.x, data.y, data.z);
        child.rotation.x += data.spinSpeed;
        child.rotation.y += data.spinSpeed * 0.5;

        // Reset if offscreen
        if (data.y < -5) {
          data.y = 5;
          data.x = (Math.random() - 0.5) * 12;
        }
      });
    }

    // 2. Animate Sparkles
    if (sparklesRef.current) {
      const posAttr = sparklesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < 60; i++) {
        const idx = i * 3;
        arr[idx + 1] -= sparklesData.speeds[i];
        arr[idx] += Math.sin(time + sparklesData.offsets[i]) * 0.003;

        // Reset if offscreen
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
        child.rotation.y = Math.sin(time + data.offset) * 0.2;

        // Reset if offscreen
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
        data.x += Math.cos(time * 0.3 + data.offset) * 0.005;
        child.position.set(data.x, data.y, data.z);

        // Reset if offscreen
        if (data.y > 6) {
          data.y = -6;
          data.x = (Math.random() - 0.5) * 12;
        }
      });
    }

    // 5. Animate Twinkling Stars
    if (starsRef.current) {
      // Modulate sizes or opacity using time inside custom shaders isn't necessary,
      // we can slowly rotate stars to create a twinkling dynamic.
      starsRef.current.rotation.z = time * 0.02;
    }

    // 6. Animate Butterflies
    if (butterfly1Ref.current) {
      const b1 = butterfly1Ref.current;
      const posX = -6 + (time * 0.8) % 15;
      const posY = 1 + Math.sin(time * 2.5) * 0.5;
      b1.position.set(posX, posY, -2);
      
      // Flap wings
      const leftWing = b1.children[0];
      const rightWing = b1.children[1];
      leftWing.rotation.y = Math.sin(time * 25) * 0.8;
      rightWing.rotation.y = -Math.sin(time * 25) * 0.8;
    }

    if (butterfly2Ref.current) {
      const b2 = butterfly2Ref.current;
      const posX = 7 - ((time * 0.6) % 15);
      const posY = -1 + Math.sin(time * 2) * 0.4;
      b2.position.set(posX, posY, -3);
      
      // Flap wings
      const leftWing = b2.children[0];
      const rightWing = b2.children[1];
      leftWing.rotation.y = Math.sin(time * 20) * 0.8;
      rightWing.rotation.y = -Math.sin(time * 20) * 0.8;
    }

    // 7. Light Rays slow movement
    if (lightRaysRef.current) {
      lightRaysRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    }
  });

  return (
    <group>
      {/* 1. Cherry Blossom / Flower Petals Group */}
      <group ref={petalsRef}>
        {petalData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]} scale={[data.scale, data.scale, data.scale]}>
            <shapeGeometry args={[petalShape]} />
            <meshPhysicalMaterial 
              color="#FBCFE8" 
              roughness={0.6} 
              transmission={0.4} 
              thickness={0.2}
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}
      </group>

      {/* 2. Sparkles Points */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparklesData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#FEF08A"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* 3. Subtle Hearts Group */}
      <group ref={heartsRef}>
        {heartsData.map((data, i) => (
          <mesh key={i} position={[data.x, data.y, data.z]} scale={[data.scale, data.scale, data.scale]}>
            <shapeGeometry args={[heartShape]} />
            <meshBasicMaterial color="#FDA4AF" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* 4. Glass Bubbles Group */}
      <group ref={bubblesRef}>
        {bubblesData.map((data, i) => (
          <group key={i} position={[data.x, data.y, data.z]}>
            <Sphere args={[data.scale, 16, 16]}>
              <meshPhysicalMaterial
                color="#ECFEFF"
                transmission={0.8}
                roughness={0.1}
                ior={1.2}
                thickness={0.1}
                transparent
                opacity={0.3}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* 5. Twinkling Stars Points */}
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

      {/* 6. Butterflies */}
      {/* Butterfly 1 */}
      <group ref={butterfly1Ref}>
        {/* Left wing */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.2, 0.15]} />
          <meshBasicMaterial color="#F472B6" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        {/* Right wing */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.2]}>
          <planeGeometry args={[0.2, 0.15]} />
          <meshBasicMaterial color="#F472B6" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Butterfly 2 */}
      <group ref={butterfly2Ref}>
        {/* Left wing */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.16, 0.12]} />
          <meshBasicMaterial color="#F5D0FE" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Right wing */}
        <mesh position={[0.08, 0, 0]} rotation={[0, 0, 0.2]}>
          <planeGeometry args={[0.16, 0.12]} />
          <meshBasicMaterial color="#F5D0FE" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 7. Light Rays */}
      <group ref={lightRaysRef} position={[0, 5, -5]} rotation={[0, 0, -0.3]}>
        <mesh position={[-2, -5, 0]} rotation={[0, 0, 0.1]}>
          <coneGeometry args={[1.5, 12, 16]} />
          <meshBasicMaterial color="#FAE8FF" transparent opacity={0.06} />
        </mesh>
        <mesh position={[2, -5, 0]} rotation={[0, 0, -0.1]}>
          <coneGeometry args={[2.0, 12, 16]} />
          <meshBasicMaterial color="#ECFEFF" transparent opacity={0.05} />
        </mesh>
      </group>
    </group>
  );
}
