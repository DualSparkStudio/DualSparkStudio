import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';

interface ParticleProps {
  count?: number;
  size?: number;
  spread?: number;
  speed?: number;
}

// Separate component for the actual particles that uses the Three.js hooks
const ParticlesImplementation = ({ 
  count = 300, 
  size = 0.03, 
  spread = 10, 
  speed = 0.1,
  themeMode = 'dark'
}: ParticleProps & { themeMode?: string }) => {
  const mesh = useRef<THREE.Points>(null);
  
  // Generate particles with random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count, spread]);
  
  // Create buffer geometry and set positions
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = particles[i].x;
      positions[i3 + 1] = particles[i].y;
      positions[i3 + 2] = particles[i].z;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count, particles]);
  
  // Animation
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speed * 0.1;
      mesh.current.rotation.y += delta * speed * 0.15;
      
      // Pulse size animation
      const time = state.clock.getElapsedTime();
      if (mesh.current.material instanceof THREE.PointsMaterial) {
        mesh.current.material.size = size * (1 + 0.1 * Math.sin(time * 0.5));
      }
    }
  });
  
  // Determine particle color based on theme
  const particleColor = themeMode === 'dark' ? '#64ffda' : '#0a192f';
  
  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial
        attach="material"
        size={size}
        sizeAttenuation={true}
        color={particleColor}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Wrapper component that provides the Canvas for the particles
const Particles = (props: ParticleProps) => {
  const { theme } = useTheme();
  
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <ParticlesImplementation {...props} themeMode={theme} />
      </Canvas>
    </div>
  );
};

export default Particles;
