import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useAudio } from '@/lib/stores/useAudio';

// Simplified 3D background component for transitions
const TransitionBackground = ({ progress }: { progress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  // Optimized animation with reduced calculations
  useFrame((state) => {
    if (meshRef.current) {
      // Simplified rotation based on progress
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      
      // Simplified scaling
      const scale = 0.5 + progress;
      meshRef.current.scale.x = scale;
      meshRef.current.scale.y = scale;
      
      // Simple material update
      if (meshRef.current.material instanceof THREE.ShaderMaterial) {
        meshRef.current.material.uniforms.uProgress.value = progress;
      }
    }
  });
  
  // Simplified shader for better performance
  const shaderMaterial = {
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: progress },
      uColor1: { value: new THREE.Color('#64ffda') },
      uColor2: { value: new THREE.Color('#0a192f') }
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uProgress;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      
      void main() {
        // Simplified radial gradient
        float dist = length(vUv - vec2(0.5));
        
        // Simplified color mixing
        vec3 color = mix(uColor1, uColor2, dist);
        
        // Simplified alpha calculation
        float alpha = uProgress * (1.0 - dist);
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true
  };
  
  // Update time uniform less frequently
  useFrame(({ clock }) => {
    // Update only every other frame
    if (Math.round(clock.getElapsedTime() * 10) % 2 !== 0) return;
    
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} /> {/* Reduced segments */}
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
  );
};

interface PageTransitionProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const PageTransition = ({
  isVisible,
  onAnimationComplete,
  direction = 'up',
  duration = 0.8, // Reduced duration
}: PageTransitionProps) => {
  const controls = useAnimation();
  const { playHit } = useAudio();
  const [progress, setProgress] = useState(0);
  
  // Get the appropriate variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'down':
        return {
          hidden: { y: '-100%' },
          visible: { y: 0 },
          exit: { y: '100%' }
        };
      case 'left':
        return {
          hidden: { x: '100%' },
          visible: { x: 0 },
          exit: { x: '-100%' }
        };
      case 'right':
        return {
          hidden: { x: '-100%' },
          visible: { x: 0 },
          exit: { x: '100%' }
        };
      case 'up':
      default:
        return {
          hidden: { y: '100%' },
          visible: { y: 0 },
          exit: { y: '-100%' }
        };
    }
  };
  
  // Control animation state based on visibility
  useEffect(() => {
    if (isVisible) {
      playHit();
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [isVisible, controls, playHit]);
  
  // Track animation progress to update the 3D effect
  const updateProgress = (value: number) => {
    setProgress(value);
  };
  
  // Optimize render with conditional 3D content
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
          variants={getVariants()}
          initial="hidden"
          animate={controls}
          exit="exit"
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: duration
          }}
          onUpdate={(latest) => {
            // Calculate progress for x or y based on direction
            const key = direction === 'left' || direction === 'right' ? 'x' : 'y';
            const value = typeof latest[key] === 'string' 
              ? parseFloat(latest[key] as string) / 100 
              : latest[key] as number;
            
            // Throttle updates to reduce CPU impact
            const roundedValue = Math.round(Math.abs(value) * 5) / 5;
            if (Math.abs(roundedValue - progress) > 0.15) {
              updateProgress(Math.abs(value));
            }
          }}
          onAnimationComplete={() => {
            if (onAnimationComplete) onAnimationComplete();
          }}
        >
          <div className="w-full h-full">
            <Canvas 
              dpr={[0.75, 1]} // Lower resolution for transitions
              frameloop="demand" // Only render when needed
              gl={{ 
                antialias: false, 
                powerPreference: 'high-performance',
                stencil: false,
                depth: false
              }}
            >
              <TransitionBackground progress={progress} />
              <EffectComposer enabled multisampling={0}>
                <Bloom luminanceThreshold={0.2} intensity={0.8} levels={3} />
              </EffectComposer>
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition; 