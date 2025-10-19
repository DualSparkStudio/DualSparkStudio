# Hero Background Implementation Guide

This guide contains all the code needed to implement the animated 3D hero background used in DualSparkStudio website.

## 📦 Dependencies Required

```json
{
  "dependencies": {
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "@react-three/postprocessing": "^2.15.0",
    "three": "^0.158.0",
    "framer-motion": "^10.16.0"
  }
}
```

Install with:
```bash
npm install @react-three/fiber @react-three/drei @react-three/postprocessing three framer-motion
```

## 🎨 CSS Styles (Add to your main CSS file)

```css
/* Global body background gradient */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  background: linear-gradient(to bottom, #020C1B, #0A192F, #090E1A);
  font-family: 'Inter', sans-serif;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  background-color: #020C1B;
}

/* Text gradient utility */
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(90deg, #64ffda, #ff4d5a);
}

/* Glassmorphism utility */
.bg-glass {
  background: rgba(10, 25, 47, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Button hover effect */
.btn-hover-effect {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.btn-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Gradient border animation */
.gradient-border {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  transform: translateZ(0);
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  background: linear-gradient(90deg, #64ffda, #ff4d5a, #64ffda);
  background-size: 200% 200%;
  animation: borderGradient 3s ease infinite;
  pointer-events: none;
}

@keyframes borderGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## 🌠 ShootingStars Component

Create a file: `components/ShootingStars.tsx`

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShootingStarsProps {
  count?: number;
  area?: number;
  speed?: number;
  frequency?: number;
}

const ShootingStars = ({ 
  count = 30, 
  area = 100, 
  speed = 40,
  frequency = 0.1 
}: ShootingStarsProps) => {
  const starsRef = useRef<THREE.Points>(null);
  
  const starData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const lifetimes = new Float32Array(count);
    const delays = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random starting position
      positions[i3] = (Math.random() - 0.5) * area;
      positions[i3 + 1] = (Math.random() - 0.5) * area;
      positions[i3 + 2] = (Math.random() - 0.5) * area;
      
      // Random velocity
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = -Math.random() * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
      
      sizes[i] = Math.random() * 2 + 1;
      lifetimes[i] = 0;
      delays[i] = Math.random() / frequency;
    }
    
    return { positions, velocities, sizes, lifetimes, delays };
  }, [count, area, speed, frequency]);
  
  useFrame((state, delta) => {
    if (!starsRef.current) return;
    
    const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
    const lifetimes = starData.lifetimes;
    const delays = starData.delays;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      delays[i] -= delta;
      
      if (delays[i] <= 0) {
        lifetimes[i] += delta;
        
        if (lifetimes[i] < 1.0) {
          positions[i3] += starData.velocities[i3] * delta;
          positions[i3 + 1] += starData.velocities[i3 + 1] * delta;
          positions[i3 + 2] += starData.velocities[i3 + 2] * delta;
        } else {
          // Reset star
          positions[i3] = (Math.random() - 0.5) * area;
          positions[i3 + 1] = (Math.random() - 0.5) * area;
          positions[i3 + 2] = (Math.random() - 0.5) * area;
          lifetimes[i] = 0;
          delays[i] = Math.random() / frequency;
        }
      }
    }
    
    starsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={starData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={starData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#64ffda"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ShootingStars;
```

## 🎆 3D Scene Component

Create a file: `components/Scene3D.tsx`

```tsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Environment, AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';
import ShootingStars from './ShootingStars';

const Scene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  
  // Move camera to better position
  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.1) * 0.2;
    }
    
    if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
      particlesRef.current.material.uniforms.uTime.value = time;
    }
  });
  
  // Particle system
  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 10 + Math.random() * 10;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    sizes[i] = Math.random() * 1.5 + 0.5;
  }
  
  // Particle shader
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
        vec3 pos = position;
        pos.y += sin(uTime * 0.1 + position.x * 0.02) * 0.8;
        pos.x += cos(uTime * 0.1 + position.z * 0.02) * 0.8;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
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
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float colorMix = sin(vPosition.x * 0.05 + vPosition.y * 0.05 + uTime * 0.1) * 0.5 + 0.5;
        vec3 color = mix(uColor, uColor2, colorMix);
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
      <ambientLight intensity={0.2} />
      
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1.0} 
        color="#ffffff"
      />
      
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
      
      {/* Stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1500}
        factor={4} 
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Shooting Stars */}
      <ShootingStars count={30} area={100} speed={40} frequency={0.1} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
      />
      
      <Environment preset="night" />
      <AdaptiveDpr pixelated />
      <Preload all />
    </group>
  );
};

export default Scene3D;
```

## 🎬 Main App Component with 3D Background

Create/Update your `App.tsx`:

```tsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={[1.0, 1.5]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            physicallyCorrectLights: false,
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
          camera={{ position: [0, 0, 20], fov: 70, near: 0.1, far: 200 }}
          shadows={false}
          frameloop="always"
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
          
          {/* Post-processing effects */}
          <EffectComposer enabled multisampling={0}>
            <Bloom luminanceThreshold={0.1} intensity={0.8} />
          </EffectComposer>
        </Canvas>
        <Loader />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        {/* Add your other sections here */}
      </div>
    </div>
  );
}

export default App;
```

## 🦸 Hero Component Example

Create a file: `components/Hero.tsx`

```tsx
import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-24 pb-36 flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      
      {/* Content */}
      <div className="container relative z-10 px-6 mx-auto text-center" ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#64ffda] bg-[#64ffda]/10 rounded-full">
            Web Development + Software Solutions
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
          Where <span className="text-gradient">Development</span>
          <br />
          Meets <span style={{ color: '#ff4d5a' }}>Design</span>
        </h1>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 bg-black/30 backdrop-blur-sm py-2 px-4 rounded-md inline-block"
        >
          <span className="text-lg md:text-xl font-medium tracking-wider text-[#64ffda]">
            CUSTOM WEBSITE & SOFTWARE, CRAFTED ON DEMAND
          </span>
        </motion.div>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10">
          We build professional digital experiences and cutting-edge web applications
          with a focus on performance, usability and business growth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="px-8 py-3 bg-[#64ffda] text-black font-semibold rounded-lg btn-hover-effect"
          >
            View Our Work
          </motion.button>
          
          <motion.button
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] font-semibold rounded-lg gradient-border bg-transparent"
          >
            Contact Us
          </motion.button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center hover:border-[#64ffda] transition-colors">
          <motion.div 
            className="w-1.5 h-3 bg-[#64ffda] rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
```

## 🎨 Color Palette Reference

```javascript
const COLORS = {
  primary: '#64ffda',      // Cyan
  accent: '#ff4d5a',       // Coral Pink
  darkNavy: '#0A192F',     // Dark Navy
  deepNavy: '#020C1B',     // Deep Navy
  lightNavy: '#090E1A',    // Light Navy
  white: '#F8FAFC',        // Off-white
  slate: '#1C2A3E'         // Dark Slate
};
```

## 📝 Usage Notes

1. **Performance**: The 3D background is GPU-intensive. Adjust particle counts and effects based on your target devices.

2. **Customization**: 
   - Change colors in the shader uniforms (`uColor`, `uColor2`)
   - Adjust particle count in `Scene3D.tsx`
   - Modify shooting star parameters (count, speed, frequency)

3. **Optimization Tips**:
   - Reduce `particleCount` for mobile devices
   - Lower `Stars` count for better performance
   - Disable `OrbitControls` autoRotate if not needed
   - Adjust `dpr` (device pixel ratio) for quality vs performance

4. **Browser Compatibility**: 
   - Requires WebGL support
   - Best in modern browsers (Chrome, Firefox, Edge, Safari)

## 🚀 Quick Start

1. Install dependencies
2. Copy CSS styles to your main stylesheet
3. Create `ShootingStars.tsx` component
4. Create `Scene3D.tsx` component
5. Update your `App.tsx` with the Canvas setup
6. Create your `Hero.tsx` component
7. Adjust colors and styles to match your brand

## 🎯 Result

You'll get:
- ✅ Animated 3D particle system with gradient colors
- ✅ Shooting stars effect
- ✅ Starfield background
- ✅ Smooth animations and transitions
- ✅ Glassmorphism effects
- ✅ Gradient text and borders
- ✅ Performance-optimized rendering

Enjoy your stunning 3D hero background! 🌌✨


