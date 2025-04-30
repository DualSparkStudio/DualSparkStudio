import { useState, useRef, useEffect } from 'react';
import { useGLTF, Html, useAnimations, Center, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { toast } from 'sonner';

// Loading component that shows progress
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
        <p className="text-primary font-semibold mt-4">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
};

// Error display component
const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <Html center>
      <div className="bg-red-500/20 backdrop-blur-md p-4 rounded-lg border border-red-500">
        <p className="text-red-500">{message}</p>
      </div>
    </Html>
  );
};

interface ModelLoaderProps {
  modelPath: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  animationName?: string;
  interactable?: boolean;
  onClick?: () => void;
}

const ModelLoader = ({
  modelPath,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animationName,
  interactable = false,
  onClick
}: ModelLoaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const modelRef = useRef<THREE.Group>(null);
  
  // Load the model with error handling
  const { scene, animations, materials } = useGLTF(modelPath, undefined, 
    (e) => {
      console.error('Error loading model:', e);
      setError(`Failed to load model: ${e.message}`);
      toast.error('Failed to load 3D model');
    });
  
  // Set up animations if available
  const { actions, mixer } = useAnimations(animations, modelRef);
  
  // Start animation if specified
  useEffect(() => {
    if (animationName && actions[animationName]) {
      actions[animationName]?.reset().fadeIn(0.5).play();
      return () => {
        actions[animationName]?.fadeOut(0.5);
      };
    }
  }, [animationName, actions]);
  
  // Apply material enhancements
  useEffect(() => {
    // Update all materials with better reflectivity and quality
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 1.5;
          material.needsUpdate = true;
        }
      });
    }
    
    // Apply shadows to all meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    // Create a clone to avoid changing the cached original
    const clonedScene = scene.clone();
    
    // Apply the cloned scene to our model ref
    if (modelRef.current) {
      modelRef.current.clear();
      modelRef.current.add(clonedScene);
    }
  }, [scene, materials]);
  
  // Animate on hover if interactable
  useFrame(() => {
    if (modelRef.current && interactable) {
      if (hovered) {
        modelRef.current.rotation.y += 0.01;
        modelRef.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.1;
      } else {
        modelRef.current.position.y = position[1];
      }
    }
  });
  
  // Handle loading errors
  if (error) {
    return <ErrorDisplay message={error} />;
  }
  
  return (
    <Center position={position}>
      {!scene ? (
        <Loader />
      ) : (
        <group
          ref={modelRef}
          scale={scale}
          rotation={rotation as [number, number, number]}
          onClick={interactable ? onClick : undefined}
          onPointerOver={interactable ? () => setHovered(true) : undefined}
          onPointerOut={interactable ? () => setHovered(false) : undefined}
          {...(interactable ? { cursor: 'pointer' } : {})}
        />
      )}
    </Center>
  );
};

export default ModelLoader;

// Preload models to avoid suspense issues
useGLTF.preload('/models/logo.glb'); 