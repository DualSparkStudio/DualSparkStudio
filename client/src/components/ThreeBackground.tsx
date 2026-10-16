import {
  AdaptiveDpr,
  Environment,
  OrbitControls,
  Preload,
  Stars,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import ShootingStars from './ShootingStars';

// Performance-optimized 3D scene component
const Scene = memo(({ isMobile }: { isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

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

  // Mobile optimization: dramatically reduce particle count to save CPU/GPU cycles
  const particleCount = isMobile ? 250 : 800;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      sz[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, sz];
  }, [particleCount]);

  const particleShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 0.3 },
      uColor: { value: new THREE.Color('#64ffda') },
      uColor2: { value: new THREE.Color('#ff4d5a') },
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
    blending: THREE.AdditiveBlending,
  }), []);

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

      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 500 : 1500}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />

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
    </group>
  );
});

Scene.displayName = 'Scene';

const ThreeBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 opacity-100">
      <Canvas
        dpr={isMobile ? [1.0, 1.2] : [1.0, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          logarithmicDepthBuffer: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ position: [0, 0, 20], fov: 70, near: 0.1, far: 200 }}
        shadows={false}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
          <ShootingStars count={isMobile ? 12 : 30} area={100} speed={isMobile ? 25 : 40} frequency={0.1} />
          <Preload all />
        </Suspense>

        {/* Bloom post-processing only on desktop to save mobile GPUs */}
        {!isMobile && (
          <EffectComposer enabled multisampling={0}>
            <Bloom luminanceThreshold={0.1} intensity={0.8} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
