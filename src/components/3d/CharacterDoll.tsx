import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CharacterDoll: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const dollRef = useRef<THREE.Group>(null);

  // Load the uploaded realistic 3D designer doll texture
  const texture = useTexture('/images/doll.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse interaction (Smooth parallax tilt and head/body angle tracking)
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

      // Subtle natural sway and hair movement rotation offset
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.02;
    }

    if (dollRef.current) {
      // Natural anti-gravity breathing pulsation & floating motion
      dollRef.current.position.y = Math.sin(time * 2) * 0.12;
      dollRef.current.scale.y = 1 + Math.sin(time * 2.5) * 0.015;
      dollRef.current.scale.x = 1 + Math.cos(time * 2.5) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <group ref={dollRef}>
        {/* Soft Rear Luxury Glow Backdrop */}
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[3.6, 5.0]} />
          <meshBasicMaterial
            color="#FF6FAE"
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Realistic 3D Doll Framed Mesh with Smooth Curved Edge & Premium Glass Backing */}
        <RoundedBox
          args={[3.2, 4.6, 0.12]}
          radius={0.3}
          smoothness={8}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            map={texture}
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Soft Ambient Front Specular Highlight Glass Rim */}
        <RoundedBox
          args={[3.24, 4.64, 0.14]}
          radius={0.32}
          smoothness={8}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.9}
            opacity={0.3}
            transparent
            roughness={0.1}
            ior={1.2}
          />
        </RoundedBox>
      </group>
    </group>
  );
};

export default CharacterDoll;
