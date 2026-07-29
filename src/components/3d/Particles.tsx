import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 100;
  
  const { positions, initialPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 6 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
    }
    
    return { positions: pos, initialPositions: initPos };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      pointsRef.current.rotation.y += 0.05 * state.clock.getDelta();
      
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const ix = initialPositions[idx];
        const iy = initialPositions[idx + 1];
        const iz = initialPositions[idx + 2];
        
        posArray[idx] = ix + Math.sin(time + ix) * 0.1;
        posArray[idx + 1] = iy + Math.cos(time + iy) * 0.1;
        posArray[idx + 2] = iz + Math.sin(time + iz) * 0.1;
      }
      
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#93C5FD"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
