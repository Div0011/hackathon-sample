import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ElasticMesh = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  const count = 40; // Grid resolution
  const particlesCount = count * count;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const initial = new Float32Array(particlesCount * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        const x = (i - count / 2) * 0.4;
        const y = (j - count / 2) * 0.4;
        pos[idx] = x;
        pos[idx + 1] = y;
        pos[idx + 2] = 0;
        
        initial[idx] = x;
        initial[idx + 1] = y;
        initial[idx + 2] = 0;
      }
    }
    return [pos, initial];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const currentPositions = posAttr.array as Float32Array;

    // Target mouse position in world space
    const targetX = (state.mouse.x * state.viewport.width) / 2;
    const targetY = (state.mouse.y * state.viewport.height) / 2;
    
    mouse.current.x += (targetX - mouse.current.x) * 0.1;
    mouse.current.y += (targetY - mouse.current.y) * 0.1;

    for (let i = 0; i < particlesCount; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];
        
        // Distance from mouse
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Wave effect
        const wave = Math.sin(dist * 2 - time * 2) * 0.15;
        
        // Mouse interaction (push away)
        const force = Math.max(0, 1.5 - dist) * 0.5;
        
        currentPositions[i * 3] = x + (dx / (dist + 0.1)) * force;
        currentPositions[i * 3 + 1] = y + (dy / (dist + 0.1)) * force;
        currentPositions[i * 3 + 2] = wave - force * 2;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />

      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00e3fd"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505]">
      {/* Deep gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20" />
      
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />
        <ambientLight intensity={0.5} />
        
        <ElasticMesh />
        
        {/* Floating secondary accent orbs */}
        <mesh position={[5, 2, -2]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#bc00ff" transparent opacity={0.02} />
        </mesh>
        <mesh position={[-5, -3, -2]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#00e3fd" transparent opacity={0.02} />
        </mesh>
      </Canvas>

      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, #00e3fd11 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
};
