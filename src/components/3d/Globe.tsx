import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const latLongToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const GlobeInner = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Coordinates for Sangareddy, Telangana
  const sangareddyPos = latLongToVector3(17.6194, 78.0823, 2.02);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Atmosphere */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Main Globe */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.3} />
      </Sphere>

      {/* Location Marker */}
      <group position={sangareddyPos}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        
        {/* Pulsing Ring - simplistic representation */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        <Html distanceFactor={15} center>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: 'translateY(-20px)'
          }}>
            Sangareddy, Telangana
          </div>
        </Html>
      </group>
    </group>
  );
};

const GlobeCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <GlobeInner />
    </Canvas>
  );
};

export default GlobeCanvas;
