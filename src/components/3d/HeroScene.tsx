import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundParticles } from './BackgroundParticles';

const HeroScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[5, -3, 3]} intensity={0.4} color="#06B6D4" />
        
        <Suspense fallback={null}>
          <BackgroundParticles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
