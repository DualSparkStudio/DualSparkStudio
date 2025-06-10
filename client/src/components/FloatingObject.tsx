import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

interface FloatingObjectProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  color?: string;
  shape?: 'box' | 'sphere' | 'tetrahedron' | 'octahedron';
}

// Inner component that uses Three.js hooks
const FloatingObjectImplementation = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  color = '#64FFDA',
  shape = 'box'
}: FloatingObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Slow rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  // Determine geometry based on shape parameter
  const renderGeometry = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[size, 32, 32]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'box':
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

// Wrapper component that provides the Canvas context
const FloatingObject = (props: FloatingObjectProps) => {
  return (
    <div className="w-24 h-24">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingObjectImplementation {...props} />
      </Canvas>
    </div>
  );
};

export default FloatingObject;
