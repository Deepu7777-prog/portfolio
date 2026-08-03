import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import CharacterDoll from './CharacterDoll';
import { BackgroundParticles } from './BackgroundParticles';

const HeroScene: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[5, -3, 3]} intensity={0.6} color="#06B6D4" />

        <Suspense fallback={null}>
          <BackgroundParticles />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <CharacterDoll />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
