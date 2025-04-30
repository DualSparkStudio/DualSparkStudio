import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Html, 
  Float, 
  Environment, 
  MeshDistortMaterial,
  Sphere,
  RoundedBox
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiLayers, FiCpu, FiGlobe, FiArrowRight } from 'react-icons/fi';
import { Button } from './ui/button';
import { useAudio } from '@/lib/stores/useAudio';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Service item data
const serviceItems = [
  {
    id: 1,
    title: 'Custom Web Development',
    description: 'Tailored solutions with cutting-edge technology',
    icon: FiCode,
    color: '#64ffda',
    position: [-3, 1, 0],
  },
  {
    id: 2,
    title: 'Custom Software Solutions',
    description: 'Scalable applications for your business needs',
    icon: FiLayers,
    color: '#ff4d5a',
    position: [3, 1, 0],
  },
  {
    id: 3,
    title: 'Advanced Web Applications',
    description: 'Powerful solutions for complex business needs',
    icon: FiCpu,
    color: '#64ffda',
    position: [-3, -1, 0],
  },
  {
    id: 4,
    title: 'Global Reach',
    description: 'Solutions for businesses worldwide',
    icon: FiGlobe,
    color: '#ff4d5a',
    position: [3, -1, 0],
  },
];

// 3D Service Item component - optimized
const Service3DItem = ({ item, onClick, active, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create a wave animation effect with optimization
  useFrame(({ clock }) => {
    // Only update animation every other frame
    if (Math.round(clock.getElapsedTime() * 10) % 2 !== 0) return;
    
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      // Apply a subtle wave animation with reduced complexity
      meshRef.current.position.y = item.position[1] + Math.sin(time * 0.3 + index * 0.5) * 0.15;
      
      // Simplified rotation
      if (hovered || active) {
        meshRef.current.rotation.y += 0.008;
      } else {
        meshRef.current.rotation.y += 0.001;
      }
    }
  });
  
  // Scale animation when item becomes active or hovered
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: active || hovered ? 1.1 : 1, // Reduced scale factor
        y: active || hovered ? 1.1 : 1,
        z: active || hovered ? 1.1 : 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [active, hovered]);
  
  // Map icons to components
  const IconComponent = item.icon;
  
  return (
    <group position={item.position}>
      <Float 
        speed={1.5} // Reduced speed
        rotationIntensity={0.2} // Reduced intensity
        floatIntensity={0.2}
      >
        <RoundedBox
          ref={meshRef}
          args={[2, 2, 0.2]}
          radius={0.1}
          smoothness={2} // Reduced smoothness
          onClick={() => onClick(item.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={item.color}
            speed={1.5}
            distort={active ? 0.3 : 0.1} // Reduced distortion
            radius={1}
            metalness={0.6}
            roughness={0.3}
            clearcoat={0.5} // Reduced clearcoat
          />
          
          <Html
            center
            className="pointer-events-none"
            scale={0.4}
            transform
            occlude
          >
            <div className={`flex flex-col items-center w-32 h-32 ${hovered || active ? 'scale-105' : 'scale-100'} transition-transform`}>
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground mb-3">
                <IconComponent size={30} color={item.color} />
              </div>
              <h3 className="text-center text-foreground text-xl font-semibold">{item.title}</h3>
            </div>
          </Html>
        </RoundedBox>
      </Float>
    </group>
  );
};

// Scene component that manages all 3D elements - optimized
const ServicesScene = ({ onServiceSelect }) => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const { playHit } = useAudio();
  
  // Position camera
  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Handle service selection with optimized animation
  const handleServiceClick = (id: number) => {
    playHit();
    setActiveService(id);
    onServiceSelect(id);
    
    // Animate camera to focus on selected service with reduced complexity
    const selectedService = serviceItems.find(item => item.id === id);
    if (selectedService) {
      gsap.to(camera.position, {
        x: selectedService.position[0] * 0.3, // Reduced camera movement
        y: selectedService.position[1] * 0.3,
        duration: 0.7, // Reduced duration
        ease: 'power2.out'
      });
    }
  };
  
  return (
    <>
      {/* Reduced lighting for better performance */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={0.7} />
      
      {/* Services group */}
      <group ref={groupRef}>
        {serviceItems.map((item, index) => (
          <Service3DItem
            key={item.id}
            item={item}
            index={index}
            onClick={handleServiceClick}
            active={activeService === item.id}
          />
        ))}
        
        {/* Simplified center sphere */}
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatingRange={[0, 0.3]}
        >
          <Sphere args={[0.6, 16, 16]} position={[0, 0, -1]}>
            <MeshDistortMaterial
              color="#0a192f"
              speed={2}
              distort={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </Sphere>
        </Float>
      </group>
      
      {/* Reduced post-processing */}
      <Environment preset="city" />
      <EffectComposer enabled multisampling={0}>
        <Bloom luminanceThreshold={0.3} intensity={0.3} />
      </EffectComposer>
    </>
  );
};

// Main component that renders the 3D services section - optimized
const Services3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedService, setSelectedService] = useState<number>(1);
  const { playHit } = useAudio();
  
  // Handle service selection from 3D scene
  const handleServiceSelect = (id: number) => {
    setSelectedService(id);
  };
  
  // Set up scroll trigger with reduced complexity
  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        }
      });
      
      tl.fromTo(
        canvasRef.current,
        { opacity: 0, y: 40 }, // Reduced movement
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, // Reduced duration
        0
      );
      
      return () => {
        // Clean up
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  // Get the current service details
  const currentService = serviceItems.find(s => s.id === selectedService) || serviceItems[0];
  
  return (
    <section id="services" className="py-20 min-h-screen relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} // Reduced duration
          viewport={{ once: true, margin: "-10%" }} // Reduced margin
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive solutions to meet all your digital needs. 
            Click on a service to learn more.
          </p>
        </motion.div>
        
        {/* 3D Services Display with optimized rendering */}
        <div 
          className="relative aspect-video max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden border border-primary/20 shadow-lg shadow-primary/5"
          ref={canvasRef}
        >
          <Canvas 
            dpr={[0.8, 1.2]} // Reduced DPR
            frameloop="demand" // Only render when needed
            performance={{ min: 0.2 }} // Lower minimum performance threshold
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{ 
              antialias: false, // Disable antialiasing
              powerPreference: 'high-performance'
            }}
          >
            <ServicesScene onServiceSelect={handleServiceSelect} />
          </Canvas>
        </div>
        
        {/* Service Details - simplified animation */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 15 }} // Reduced movement
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} // Reduced duration
          className="max-w-3xl mx-auto bg-background/70 backdrop-blur-md p-8 rounded-lg border border-primary/20 shadow-lg shadow-primary/5"
        >
          <div className="flex items-center mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: `${currentService.color}20` }}
            >
              <currentService.icon size={24} color={currentService.color} />
            </div>
            <h3 className="text-2xl font-bold">{currentService.title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {currentService.description}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nunc euismod, nisl eget consectetur sagittis, nisl nunc
            consectetur nisi, euismod consectetur nisl nisi eget consectetur.
          </p>
          
          <div className="flex justify-end">
            <Button
              variant="default"
              className="group"
              onClick={() => {
                playHit();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in touch
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services3D; 