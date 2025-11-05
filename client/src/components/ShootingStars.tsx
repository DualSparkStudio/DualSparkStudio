import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShootingStarProps {
  count?: number;
  speed?: number;
  frequency?: number;
}

const ShootingStars = ({ 
  count = 20, 
  speed = 30, 
  frequency = 0.2 
}: ShootingStarProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Mesh[]>([]);
  
  // Create a mesh for each shooting star
  useEffect(() => {
    if (!groupRef.current) return;
    
    // Create a material for the shooting stars with trail effect
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    });
    
    // Remove any existing stars
    starsRef.current.forEach(star => {
      groupRef.current?.remove(star);
    });
    
    // Create new stars
    starsRef.current = [];
    for (let i = 0; i < count; i++) {
      // Create a shooting star geometry - long and thin for a streak effect
      const length = 2 + Math.random() * 5;
      const width = 0.1 + Math.random() * 0.3;
      
      const geometry = new THREE.PlaneGeometry(length, width);
      
      // Create a mesh for the shooting star
      const star = new THREE.Mesh(geometry, material.clone());
      star.material.color.set(
        Math.random() > 0.6 ? 0xffffff : 
        Math.random() > 0.5 ? 0xaaddff : 0xffffaa
      );
      
      // Position star outside the view (at the top)
      star.position.set(
        (Math.random() - 0.5) * 100,  // Random X position across the screen
        50 + Math.random() * 30,      // Above the visible area
        -40 + Math.random() * 80      // Varying Z depths
      );
      
      // Orient the star to point downward
      star.rotation.z = Math.PI / 4 + (Math.random() - 0.5) * 0.5; // Angled direction
      
      // Add to the scene
      groupRef.current.add(star);
      
      // Store velocities and properties
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5; // Angle of descent
      const magnitude = speed * (0.7 + Math.random() * 0.6);
      
      star.userData.velocity = new THREE.Vector3(
        Math.sin(angle) * magnitude,  // X component (slight sideways motion)
        Math.cos(angle) * -magnitude, // Y component (downward)
        0                             // Z stays constant
      );
      
      star.userData.active = false;
      star.userData.lifetime = 0;
      star.userData.maxLifetime = 2 + Math.random() * 2;
      star.visible = false;
      
      starsRef.current.push(star);
    }
    
    // Cleanup
    return () => {
      if (groupRef.current) {
        starsRef.current.forEach(star => {
          star.geometry.dispose();
          if (star.material instanceof THREE.Material) {
            star.material.dispose();
          }
          groupRef.current?.remove(star);
        });
      }
    };
  }, [count]);
  
  // Animate the shooting stars
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    starsRef.current.forEach(star => {
      // If the star is active, update its position
      if (star.userData.active) {
        // Update position
        star.position.add(star.userData.velocity.clone().multiplyScalar(delta));
        
        // Update lifetime
        star.userData.lifetime += delta;
        
        // Update opacity based on lifetime
        const progress = star.userData.lifetime / star.userData.maxLifetime;
        if (star.material instanceof THREE.MeshBasicMaterial) {
          // Fade in at start and out at end
          star.material.opacity = Math.sin(progress * Math.PI);
        }
        
        // Stretch the star slightly as it moves to create a trail effect
        if (progress < 0.5) {
          star.scale.x = 1 + progress * 2;  // Extend the trail as it moves
        }
        
        // If the star has fallen below the visible area or finished its lifetime
        if (star.position.y < -50 || star.userData.lifetime >= star.userData.maxLifetime) {
          star.userData.active = false;
          star.visible = false;
        }
      } 
      // Otherwise, randomly activate stars
      else if (Math.random() < frequency * delta) {
        // Reset position at the top with a random X position
        star.position.set(
          (Math.random() - 0.5) * 100,  // Random X position across the screen
          50 + Math.random() * 30,      // Above the visible area
          -40 + Math.random() * 80      // Varying Z depths
        );
        
        // Reset rotation for streak orientation
        star.rotation.z = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        
        // Reset scale
        star.scale.set(1, 1, 1);
        
        // Set new random angle of descent
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        const magnitude = speed * (0.7 + Math.random() * 0.6);
        
        star.userData.velocity = new THREE.Vector3(
          Math.sin(angle) * magnitude,  // X component
          Math.cos(angle) * -magnitude, // Y component (negative for downward)
          0                             // Z stays constant
        );
        
        // Reset lifetime
        star.userData.lifetime = 0;
        star.userData.maxLifetime = 2 + Math.random() * 2;
        
        // Activate the star
        star.userData.active = true;
        star.visible = true;
        
        // Set bright color
        if (star.material instanceof THREE.MeshBasicMaterial) {
          const colorChoice = Math.random();
          if (colorChoice < 0.6) {
            star.material.color.set(0xffffff); // White (most common)
          } else if (colorChoice < 0.8) {
            star.material.color.set(0xaaddff); // Blue
          } else {
            star.material.color.set(0xffffaa); // Yellow
          }
          star.material.opacity = 0.1; // Start dim and get brighter
        }
      }
    });
  });
  
  return <group ref={groupRef} />;
};

export default ShootingStars; 