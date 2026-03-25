import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth mouse movement
    const targetX = (state.mouse.x * viewport.width) / 2;
    const targetY = (state.mouse.y * viewport.height) / 2;
    
    mouse.current.x += (targetX - mouse.current.x) * 0.1;
    mouse.current.y += (targetY - mouse.current.y) * 0.1;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        
        // Simple attraction/repulsion
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 2) {
            positions[i * 3] += dx * 0.01;
            positions[i * 3 + 1] += dy * 0.01;
        }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00e3fd"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

export const NeuralBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ParticleField />
            </Canvas>
        </div>
    );
};
