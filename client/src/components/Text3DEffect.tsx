import { useState, useRef, useEffect } from 'react';
import { Text3D, Float, MeshTransmissionMaterial, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

type TextEffectStyle = 'glowing' | 'glass' | 'metallic' | 'holographic';

interface Text3DEffectProps {
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  fontSize?: number;
  color?: string;
  effectStyle?: TextEffectStyle;
  floatIntensity?: number;
  interactive?: boolean;
  depth?: number;
  bevelSize?: number;
  fontPath?: string;
  letterSpacing?: number;
  onClick?: () => void;
}

const Text3DEffect = ({
  text,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  fontSize = 1,
  color = '#ffffff',
  effectStyle = 'glowing',
  floatIntensity = 0.5,
  interactive = false,
  depth = 0.1,
  bevelSize = 0.01,
  fontPath = '/fonts/inter.json',
  letterSpacing = 0,
  onClick
}: Text3DEffectProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [randomValues] = useState(
    Array.from({ length: Math.min(text.length, 10) }, () => Math.random() * 2 - 1)
  );
  
  // Optimized material based on chosen effect style
  const getMaterial = () => {
    switch (effectStyle) {
      case 'glass':
        return (
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.3}
            chromaticAberration={0.3}
            anisotropy={0.2}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.1}
            iridescence={0.5}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1000]}
          />
        );
      case 'metallic':
        return (
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        );
      case 'holographic':
        return (
          <meshPhysicalMaterial
            color={color}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            metalness={0.7}
            roughness={0.3}
            iridescence={0.7}
            iridescenceIOR={1.5}
            reflectivity={0.7}
            transmission={0.3}
            opacity={0.8}
            transparent
          />
        );
      case 'glowing':
      default:
        return (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 1}
            toneMapped={false}
          />
        );
    }
  };
  
  // Optimize animation by reducing updates
  useFrame((state) => {
    if (!textRef.current || !interactive) return;
    
    // Skip animation frames for performance
    if (Math.round(state.clock.getElapsedTime() * 10) % 3 !== 0) return;
    
    const time = state.clock.getElapsedTime();

    // Animate individual characters in interactive mode with reduced complexity
    textRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh && i < randomValues.length) {
        if (hovered) {
          child.position.y = Math.sin(time * 3 + randomValues[i % randomValues.length] * 8) * 0.08;
          child.rotation.z = Math.sin(time * 3 + randomValues[i % randomValues.length] * 8) * 0.03;
        } else {
          // Simplified animation reset
          if (Math.abs(child.position.y) > 0.01 || Math.abs(child.rotation.z) > 0.01) {
            gsap.to(child.position, { y: 0, duration: 0.2, ease: 'power1.out' });
            gsap.to(child.rotation, { z: 0, duration: 0.2, ease: 'power1.out' });
          }
        }
      }
    });
  });
  
  // Simplified config with reduced quality
  const textConfig = {
    font: fontPath,
    size: fontSize,
    height: depth,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: bevelSize,
    bevelOffset: 0,
    bevelSegments: 2,
    letterSpacing: letterSpacing
  };
  
  // Render limited number of individual letters for better performance
  const renderIndividualLetters = () => {
    // Limit the number of characters we process for performance
    const maxChars = 15;
    const processText = text.length > maxChars ? text.substring(0, maxChars) : text;
    
    return Array.from(processText).map((char, i) => {
      // Calculate position of each character with letter spacing
      const xPos = i * (fontSize + letterSpacing) - (processText.length * (fontSize + letterSpacing)) / 2 + fontSize / 2;
      
      return (
        <group key={i} position={[xPos, 0, 0]}>
          <Text3D {...textConfig}>
            {char}
            {getMaterial()}
          </Text3D>
        </group>
      );
    });
  };
  
  return (
    <Float 
      floatIntensity={floatIntensity}
      rotationIntensity={0.1}
      speed={1.5}
    >
      <group 
        position={position}
        rotation={rotation}
        ref={textRef}
        onClick={onClick}
        onPointerOver={() => interactive && setHovered(true)}
        onPointerOut={() => interactive && setHovered(false)}
      >
        {interactive ? (
          renderIndividualLetters()
        ) : (
          <Center>
            <Text3D {...textConfig}>
              {text}
              {getMaterial()}
            </Text3D>
          </Center>
        )}
      </group>
    </Float>
  );
};

export default Text3DEffect; 