import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ElasticMesh = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  const count = 40; // Grid resolution
  const particlesCount = count * count;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const initial = new Float32Array(particlesCount * 3);
    const cls = new Float32Array(particlesCount * 3);
    
    // Pastel colors: Pink, Cyan, Lavender
    const palette = [
        new THREE.Color('#ff7eb9'),
        new THREE.Color('#7afcff'),
        new THREE.Color('#e0c3fc')
    ];

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        const x = (i - count / 2) * 0.45;
        const y = (j - count / 2) * 0.45;
        pos[idx] = x;
        pos[idx + 1] = y;
        pos[idx + 2] = 0;
        
        initial[idx] = x;
        initial[idx + 1] = y;
        initial[idx + 2] = 0;

        const color = palette[Math.floor(Math.random() * palette.length)];
        cls[idx] = color.r;
        cls[idx + 1] = color.g;
        cls[idx + 2] = color.b;
      }
    }
    return [pos, initial, cls];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const currentPositions = posAttr.array as Float32Array;

    const targetX = (state.mouse.x * state.viewport.width) / 2;
    const targetY = (state.mouse.y * state.viewport.height) / 2;
    
    mouse.current.x += (targetX - mouse.current.x) * 0.1;
    mouse.current.y += (targetY - mouse.current.y) * 0.1;

    for (let i = 0; i < particlesCount; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];
        
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const wave = Math.sin(dist * 1.5 - time * 1.5) * 0.2;
        const force = Math.max(0, 2.0 - dist) * 0.8;
        
        currentPositions[i * 3] = x + (dx / (dist + 0.1)) * force;
        currentPositions[i * 3 + 1] = y + (dy / (dist + 0.1)) * force;
        currentPositions[i * 3 + 2] = wave - force * 2.5;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.05;
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
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-background transition-colors duration-1000">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7eb922] via-transparent to-[#7afcff22] opacity-40" />
      
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#fff9fc']} />
        <fog attach="fog" args={['#fff9fc', 5, 20]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <ElasticMesh />
        
        {/* Soft pastel blobs */}
        <mesh position={[7, 4, -4]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial color="#ff7eb9" transparent opacity={0.05} />
        </mesh>
        <mesh position={[-7, -5, -4]}>
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial color="#7afcff" transparent opacity={0.05} />
        </mesh>
      </Canvas>
    </div>
  );
};
