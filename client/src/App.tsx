import '@fontsource/inter';
import {
    AdaptiveDpr,
    Environment,
    Loader,
    OrbitControls,
    Preload,
    Stars,
    useGLTF
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Router from './components/Router';
import ShootingStars from './components/ShootingStars';
import { Toaster } from './components/ui/sonner';
import './index.css';
import { queryClient } from './lib/queryClient';
import { useAudio } from './lib/stores/useAudio';

// Preload any models that will be used in the app
useGLTF.preload('/models/logo.glb');

// Performance-optimized 3D scene component
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  
  // Move the camera to a better position
  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Custom optimized animation loop with frame throttling
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate the group with optimized transformations (reduced calculations)
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.1) * 0.2;
    }
    
    // Animate particles for better performance using shader uniforms
    if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
      particlesRef.current.material.uniforms.uTime.value = time;
    }
  });
  
  // Custom particle system using shaders for better performance (reduced count)
  const particleCount = 800; // Reduced from 2000
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Create a sphere distribution
    const radius = 10 + Math.random() * 10;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    sizes[i] = Math.random() * 1.5 + 0.5;
  }
  
  // Simplified shader for particles
  const particleShader = {
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 0.3 },
      uColor: { value: new THREE.Color('#64ffda') },
      uColor2: { value: new THREE.Color('#ff4d5a') }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSize;
      attribute float size;
      varying vec3 vPosition;
      
      void main() {
        vPosition = position;
        
        // Simplified movement calculation
        vec3 pos = position;
        pos.y += sin(uTime * 0.1 + position.x * 0.02) * 0.8;
        pos.x += cos(uTime * 0.1 + position.z * 0.02) * 0.8;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Simplified size calculation
        gl_PointSize = size * uSize * (20.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 uColor2;
      uniform float uTime;
      varying vec3 vPosition;
      
      void main() {
        // Create a smooth circular particle
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        // Simplified color mixing
        float colorMix = sin(vPosition.x * 0.05 + vPosition.y * 0.05 + uTime * 0.1) * 0.5 + 0.5;
        vec3 color = mix(uColor, uColor2, colorMix);
        
        // Simplified glow effect
        float glow = 1.0 - dist * 2.0;
        
        gl_FragColor = vec4(color, glow);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  };
  
  return (
    <group ref={groupRef}>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Reduced number of lights for better performance */}
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1.0} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]} // Reduced from 2048
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Removed fill light for performance */}
      
      {/* Rim light */}
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={0.8} 
        color="#64ffda" 
        distance={20}
        decay={2}
      />
      
      {/* Custom particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={particleCount} 
            array={positions} 
            itemSize={3} 
          />
          <bufferAttribute 
            attach="attributes-size" 
            count={particleCount} 
            array={sizes} 
            itemSize={1} 
          />
        </bufferGeometry>
        <shaderMaterial attach="material" args={[particleShader]} />
      </points>
      
      {/* Optimized Stars component */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1500} // Reduced from 5000
        factor={4} 
        saturation={0.5}
        fade
        speed={0.5} // Reduced animation speed
      />
      
      {/* Controls with performance optimizations */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.1} // Reduced speed
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Environment for better lighting */}
      <Environment preset="night" />
    </group>
  );
};

const App = () => {
  const [mounted, setMounted] = useState(false);
  const { setBackgroundMusic, initSounds } = useAudio();

  // Effect for mounted state to prevent hydration issues with theme
  useEffect(() => {
    setMounted(true);
    
    // Initialize sound effects and background music
    initSounds();
    
    // Set up background music
    const bgMusic = new Audio('/sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    setBackgroundMusic(bgMusic);
    
    // Clean up the audio on unmount
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [setBackgroundMusic, initSounds]);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="relative min-h-screen overflow-hidden">
          {/* Main 3D Canvas background with performance optimizations */}
          <div className="fixed inset-0 z-0">
            <Canvas
              dpr={[1.0, 1.5]} // Increased DPR for better quality
              gl={{ 
                antialias: true, // Enable antialiasing for better visualization
                alpha: true,
                powerPreference: 'high-performance',
                physicallyCorrectLights: false, // Disable for performance
                logarithmicDepthBuffer: false, // Disable for performance
                // Basic tone mapping for performance
                outputEncoding: THREE.SRGBColorSpace,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2
              }}
              camera={{ position: [0, 0, 20], fov: 70, near: 0.1, far: 200 }} // Adjusted camera for better view
              shadows={false} // Disable shadows for performance
              frameloop="always" // Always render to ensure animations work
              performance={{ min: 0.5 }} // Increase minimum performance threshold
            >
              <AdaptiveDpr pixelated />
              <Suspense fallback={null}>
                <Scene />
                <ShootingStars count={30} area={100} speed={40} frequency={0.1} />
                <Preload all />
              </Suspense>
              
              {/* Simplified post-processing */}
              <EffectComposer enabled multisampling={0}>
                <Bloom luminanceThreshold={0.1} intensity={0.8} />
              </EffectComposer>
            </Canvas>
            <Loader />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <Router />
          </div>
          
          {/* Toast notifications */}
          <Toaster position="top-right" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
