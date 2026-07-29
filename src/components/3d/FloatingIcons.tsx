import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface IconData {
  label: string;
  color: string;
}

const icons: IconData[] = [
  { label: 'React', color: '#61DAFB' },
  { label: 'Python', color: '#3776AB' },
  { label: 'JS', color: '#F7DF1E' },
  { label: 'Flask', color: '#888888' },
  { label: 'AI', color: '#8B5CF6' },
  { label: 'CSS', color: '#264DE4' }
];

const IconSprite: React.FC<{ icon: IconData; index: number; total: number }> = ({ icon, index, total }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const angleOffset = (index / total) * Math.PI * 2;
  const radius = 3.2;
  const speed = 0.5;
  const yPos = Math.sin(index * 45) * 1.5; 
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const currentAngle = time * speed + angleOffset;
      groupRef.current.position.x = Math.cos(currentAngle) * radius;
      groupRef.current.position.z = Math.sin(currentAngle) * radius;
      groupRef.current.position.y = yPos + Math.sin(time * 2 + index) * 0.2;
      
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial color={icon.color} transparent opacity={0.2} />
        </mesh>
        <Text
          fontSize={0.25}
          color={icon.color}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          {icon.label}
        </Text>
      </Float>
    </group>
  );
};

const FloatingIcons: React.FC = () => {
  return (
    <group>
      {icons.map((icon, i) => (
        <IconSprite key={i} icon={icon} index={i} total={icons.length} />
      ))}
    </group>
  );
};

export default FloatingIcons;
