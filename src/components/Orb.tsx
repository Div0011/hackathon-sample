import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PulsingOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="#00E5FF"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#00E5FF"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Halo / Atmosphere */}
      <mesh scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  );
};

export const OrbBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00e5ff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
           <PulsingOrb />
        </Float>
      </Canvas>
    </div>
  );
};
