import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const techIcons = [
  { name: 'Python', color: '#3776AB', pos: [-2.2, 1.8, 0.6], icon: '🐍' },
  { name: 'AI & ML', color: '#8B5CF6', pos: [2.2, 1.6, 0.6], icon: '🧠' },
  { name: 'Cybersecurity', color: '#06B6D4', pos: [-2.4, -0.8, 0.6], icon: '🛡️' },
  { name: 'Flask', color: '#EC4899', pos: [2.4, -0.6, 0.6], icon: '🌶️' },
  { name: 'JavaScript', color: '#F7DF1E', pos: [-1.8, -2.2, 0.6], icon: '⚡' },
  { name: 'MySQL', color: '#00758F', pos: [1.8, -2.0, 0.6], icon: '🐬' },
  { name: 'HTML & CSS', color: '#E34F26', pos: [0, 2.6, 0.6], icon: '🎨' },
];

const codeSnippets = [
  'def detect_threat(url): return AI.predict(url)',
  'import torch.nn as nn',
  'SELECT * FROM cyber_logs WHERE threat_level > 8',
];

const GlowingPortraitFrame: React.FC = () => {
  const containerRef = useRef<THREE.Group>(null);
  const portraitRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const techGroupRef = useRef<THREE.Group>(null);

  // Load Real Uploaded Portrait Photo
  const texture = useTexture('/images/profile.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (containerRef.current) {
      // Mouse Parallax Effect
      const targetRotationY = state.pointer.x * 0.35;
      const targetRotationX = -state.pointer.y * 0.25;

      containerRef.current.rotation.y = THREE.MathUtils.lerp(
        containerRef.current.rotation.y,
        targetRotationY,
        0.06
      );
      containerRef.current.rotation.x = THREE.MathUtils.lerp(
        containerRef.current.rotation.x,
        targetRotationX,
        0.06
      );
    }

    if (portraitRef.current) {
      // Floating up and down gently
      portraitRef.current.position.y = Math.sin(time * 1.5) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.4;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.25;
    }

    if (techGroupRef.current) {
      techGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={containerRef} position={[0, -0.1, 0]}>
      <group ref={portraitRef}>
        {/* Holographic Glowing Ring 1 */}
        <mesh ref={ringRef} position={[0, 0, -0.15]}>
          <ringGeometry args={[2.2, 2.32, 64]} />
          <meshBasicMaterial color="#C084FC" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>

        {/* Holographic Glowing Ring 2 */}
        <mesh ref={ringRef2} position={[0, 0, -0.2]}>
          <ringGeometry args={[2.4, 2.48, 64]} />
          <meshBasicMaterial color="#3B82F6" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>

        {/* Background Purple Halo Disc */}
        <mesh position={[0, 0, -0.25]}>
          <circleGeometry args={[2.3, 64]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
        </mesh>

        {/* Circular Glass Frame with Real Portrait Photo */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[2.0, 64]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>

        {/* Neon Edge Glass Border Ring */}
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[1.98, 2.06, 64]} />
          <meshPhysicalMaterial
            color="#C084FC"
            emissive="#8B5CF6"
            emissiveIntensity={0.6}
            roughness={0.1}
            clearcoat={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Specular Glass Overlay Front */}
        <mesh position={[0, 0, 0.04]}>
          <circleGeometry args={[1.97, 64]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.8}
            opacity={0.15}
            transparent
            roughness={0.05}
            ior={1.2}
          />
        </mesh>

        {/* Floating Technology Badges */}
        <group ref={techGroupRef}>
          {techIcons.map((tech, idx) => (
            <Float
              key={idx}
              speed={2 + idx * 0.2}
              rotationIntensity={0.3}
              floatIntensity={0.6}
              position={tech.pos as [number, number, number]}
            >
              <Html distanceFactor={9} center>
                <div
                  style={{
                    background: 'rgba(11, 15, 36, 0.75)',
                    border: `1px solid ${tech.color}`,
                    backdropFilter: 'blur(16px)',
                    padding: '6px 14px',
                    borderRadius: '24px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: `0 0 20px ${tech.color}40`,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              </Html>
            </Float>
          ))}

          {/* Floating Animated Code Snippet */}
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5} position={[0, -2.6, 0.8]}>
            <Html distanceFactor={9} center>
              <div
                style={{
                  background: 'rgba(5, 8, 22, 0.85)',
                  border: '1px solid rgba(192, 132, 252, 0.4)',
                  backdropFilter: 'blur(20px)',
                  padding: '8px 18px',
                  borderRadius: '12px',
                  color: '#34D399',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                  whiteSpace: 'nowrap',
                }}
              >
                {codeSnippets[0]}
              </div>
            </Html>
          </Float>
        </group>
      </group>
    </group>
  );
};

export default GlowingPortraitFrame;
