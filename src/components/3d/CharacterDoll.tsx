import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, RoundedBox, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const CharacterDoll: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const avatarRef = useRef<THREE.Group>(null);
  const hologramGroupRef = useRef<THREE.Group>(null);

  // Load Pixar 3D Girl Avatar texture
  const texture = useTexture('/images/pixar_avatar.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Head/body tracks cursor with smooth lerp tilt
      const targetRotationY = state.pointer.x * 0.35;
      const targetRotationX = -state.pointer.y * 0.25;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.08
      );

      // Subtle hair sway & breathing motion
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.015;
    }

    if (avatarRef.current) {
      // Breathing & anti-gravity floating
      avatarRef.current.position.y = Math.sin(time * 2) * 0.1;
      avatarRef.current.scale.y = 1 + Math.sin(time * 2.5) * 0.012;
      avatarRef.current.scale.x = 1 + Math.cos(time * 2.5) * 0.008;
    }

    if (hologramGroupRef.current) {
      // Rotating floating holograms
      hologramGroupRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <group ref={avatarRef}>
        {/* Soft Ambient Rear Glow */}
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[3.8, 5.2]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
        </mesh>

        {/* 3D Pixar Avatar Frame */}
        <RoundedBox
          args={[3.4, 4.8, 0.12]}
          radius={0.3}
          smoothness={8}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            map={texture}
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.7}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Specular Glass Front Overlay */}
        <RoundedBox
          args={[3.44, 4.84, 0.14]}
          radius={0.32}
          smoothness={8}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.85}
            opacity={0.25}
            transparent
            roughness={0.1}
            ior={1.2}
          />
        </RoundedBox>

        {/* Floating Holographic Elements */}
        <group ref={hologramGroupRef}>
          {/* AI Brain Hologram */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={[-1.8, 1.8, 0.5]}>
            <mesh>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#C084FC" wireframe emissive="#8B5CF6" emissiveIntensity={0.5} />
            </mesh>
            <Html distanceFactor={10} center>
              <div style={{
                background: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(192, 132, 252, 0.5)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
              }}>
                🧠 AI Engine
              </div>
            </Html>
          </Float>

          {/* Python Logo Hologram */}
          <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1} position={[1.8, 1.2, 0.5]}>
            <mesh>
              <torusGeometry args={[0.2, 0.08, 16, 32]} />
              <meshStandardMaterial color="#3776AB" emissive="#3776AB" emissiveIntensity={0.6} />
            </mesh>
            <Html distanceFactor={10} center>
              <div style={{
                background: 'rgba(55, 118, 171, 0.3)',
                border: '1px solid rgba(96, 165, 250, 0.5)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 15px rgba(55, 118, 171, 0.5)',
              }}>
                🐍 Python 3.12
              </div>
            </Html>
          </Float>

          {/* Cyber Shield Hologram */}
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6} position={[-1.6, -1.4, 0.5]}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.25, 0.1, 6]} />
              <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
            </mesh>
            <Html distanceFactor={10} center>
              <div style={{
                background: 'rgba(6, 182, 212, 0.3)',
                border: '1px solid rgba(6, 182, 212, 0.5)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
              }}>
                🛡️ CyberGuard
              </div>
            </Html>
          </Float>
        </group>
      </group>
    </group>
  );
};

export default CharacterDoll;
