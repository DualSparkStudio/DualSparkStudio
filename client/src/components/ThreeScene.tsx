import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls,
  MeshDistortMaterial,
  GradientTexture,
  Text3D,
  Float,
  MeshReflectorMaterial,
  MeshWobbleMaterial,
  RoundedBox,
  Sparkles
} from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

// GSAP for animations
import gsap from 'gsap';

// Custom geometry that represents a stylized logo shape
const LogoGeometry = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      // Simplified animation
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });
  
  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 64, 16, 2, 3]} /> {/* Reduced geometry detail */}
      <MeshDistortMaterial
        color="#64ffda"
        speed={1}
        distort={0.2}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
};

// Interactive floating cubes with custom behavior - optimized
const FloatingCubes = ({ count = 20, radius = 10 }) => {
  // Reduced count for better performance
  const actualCount = Math.min(count, 15);
  
  // Create randomized cubes with memoization to avoid unnecessary recalculations
  const cubes = useMemo(() => {
    return Array.from({ length: actualCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * radius, 
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.2 + 0.1, // Slower speed
      wobbleSpeed: Math.random() * 1 + 0.5, // Slower wobble
      color: Math.random() > 0.5 ? "#64ffda" : "#ff4d5a"
    }));
  }, [actualCount, radius]);

  return (
    <group>
      {cubes.map((cube, i) => (
        <Float 
          key={i}
          speed={cube.speed}
          rotationIntensity={0.3} // Reduced intensity
          floatIntensity={0.3} // Reduced intensity
        >
          <RoundedBox
            args={[1, 1, 1]}
            radius={0.1}
            position={cube.position as [number, number, number]}
            scale={cube.scale}
            rotation={cube.rotation as [number, number, number]}
            castShadow
            receiveShadow
          >
            <MeshWobbleMaterial
              color={cube.color}
              metalness={0.5}
              roughness={0.3}
              factor={0.2} // Reduced wobble factor
              speed={cube.wobbleSpeed}
              transparent
              opacity={0.7}
            />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
};

// The main ThreeScene component
const ThreeScene = () => {
  const { camera, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Set camera position
  useEffect(() => {
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Set up scroll listener with throttling for performance
    let ticking = false;
    let lastScrollUpdate = 0;
    const scrollThrottleMs = 100; // Only update scroll every 100ms
    
    const handleScroll = () => {
      const now = Date.now();
      
      if (!ticking && now - lastScrollUpdate > scrollThrottleMs) {
        lastScrollUpdate = now;
        window.requestAnimationFrame(() => {
          const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          setScrollY(scrollPercentage);
          
          if (groupRef.current) {
            // Apply subtle rotation and position based on scroll - simplified animation
            gsap.to(groupRef.current.rotation, {
              x: scrollPercentage * 0.3,
              y: scrollPercentage * Math.PI * 0.5,
              duration: 0.7,
              ease: "power2.out"
            });
            
            // Simplified camera animation
            gsap.to(camera.position, {
              z: 10 - scrollPercentage * 1.5,
              y: 2 + scrollPercentage * 2,
              duration: 1,
              ease: "power2.out"
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  // Animation loop with optimized updates and frame skipping
  useFrame((state, delta) => {
    // Only update every other frame for performance
    if (Math.round(state.clock.elapsedTime * 10) % 2 !== 0) return;
    
    if (groupRef.current) {
      // Reduced rotation speed
      groupRef.current.rotation.y += delta * 0.03;
      
      // Simplified floating animation
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <>
      {/* Reduced lighting for better performance */}
      <ambientLight intensity={0.3} />
      
      {/* Main light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#e6f1ff" 
        castShadow
        shadow-mapSize={[512, 512]} // Reduced shadow map size
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      
      {/* Rim light - create edge highlights */}
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={0.6} 
        color="#64ffda" 
        distance={15}
        decay={2}
      />
      
      {/* Main content group */}
      <group ref={groupRef}>
        {/* Center logo piece */}
        <LogoGeometry />
        
        {/* Reduced number of floating elements */}
        <FloatingCubes count={15} radius={12} />
        
        {/* 3D Text for brand - simplified */}
        <Float
          speed={1}
          rotationIntensity={0.2}
          floatIntensity={0.2}
          position={[0, 3, 0]}
        >
          <Text3D
            font="/fonts/inter.json"
            size={0.8}
            height={0.1} // Reduced height
            curveSegments={8} // Reduced segments
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={3}
          >
            {`DualSpark`}
            <meshStandardMaterial 
              color="#64ffda" 
              metalness={0.6}
              roughness={0.3}
              emissive="#64ffda"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Float>
        
        {/* Reduced particle effects */}
        <Sparkles
          count={40} // Reduced from 100
          scale={15}
          size={1.5}
          speed={0.2}
          color="#64ffda"
        />
      </group>
      
      {/* Simplified reflective floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2.5, 0]}
        receiveShadow
        ref={floorRef}
      >
        <planeGeometry args={[80, 80]} />
        <MeshReflectorMaterial
          blur={[200, 50]}
          resolution={256} // Reduced resolution
          mixBlur={0.8}
          mixStrength={10}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#050505"
          metalness={0.6}
          roughness={1}
          mirror={0.5} // Reduced reflection
        />
      </mesh>
      
      {/* Simplified background sphere */}
      <mesh position={[0, 0, -30]} scale={40}>
        <sphereGeometry args={[1, 32, 32]} /> {/* Reduced segments */}
        <meshStandardMaterial 
          color="#020c1b" 
          side={THREE.BackSide}
          metalness={0.7}
          roughness={0.6}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={['#020c1b', '#0a192f', '#020c1b']}
            size={512} // Reduced texture size
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* Simplified post-processing */}
      <EffectComposer multisampling={0}> {/* Disabled multisampling */}
        <Bloom 
          luminanceThreshold={0.2}
          intensity={0.3}
        />
      </EffectComposer>
      
      {/* Environment lighting */}
      <Environment preset="night" />
      
      {/* Simplified controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        enableDamping
        dampingFactor={0.03}
      />
    </>
  );
};

export default ThreeScene;
