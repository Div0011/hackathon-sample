import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ElasticMesh = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  const count = 45; // Res grid
  const particlesCount = count * count;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const initial = new Float32Array(particlesCount * 3);
    const cls = new Float32Array(particlesCount * 3);
    
    // Vintage Comic Palette
    const palette = [
        new THREE.Color('#e63946'), // Red
        new THREE.Color('#ffb703'), // Yellow
        new THREE.Color('#219ebc')  // Teal
    ];

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
    
    mouse.current.x += (targetX - mouse.current.x) * 0.12;
    mouse.current.y += (targetY - mouse.current.y) * 0.12;

    for (let i = 0; i < particlesCount; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];
        
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const ripple = Math.sin(dist * 2.0 - time * 2.0) * 0.15;
        const drag = Math.max(0, 1.8 - dist) * 0.8;
        
        currentPositions[i * 3] = x + (dx / (dist + 0.1)) * drag;
        currentPositions[i * 3 + 1] = y + (dy / (dist + 0.1)) * drag;
        currentPositions[i * 3 + 2] = ripple - drag * 3.0;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.z = Math.cos(time * 0.1) * 0.05;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#fffdf2] transition-colors duration-1000">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#e6394611] via-transparent to-[#ffb70311] opacity-60" />
      
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#fffdf2']} />
        <fog attach="fog" args={['#fffdf2', 5, 20]} />
        <ambientLight intensity={1.5} />
        
        <ElasticMesh />
        
        <mesh position={[10, 5, -5]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshBasicMaterial color="#e63946" transparent opacity={0.05} />
        </mesh>
        <mesh position={[-10, -5, -5]}>
          <sphereGeometry args={[7, 16, 16]} />
          <meshBasicMaterial color="#ffb703" transparent opacity={0.05} />
        </mesh>
      </Canvas>
    </div>
  );
};
