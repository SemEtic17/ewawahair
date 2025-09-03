import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingHair = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simplified floating hair strands */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 1,
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
          >
            <boxGeometry args={[0.01, 1, 0.01]} />
            <meshStandardMaterial
              color="#2D1810"
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Golden particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float
          key={`particle-${i}`}
          speed={2 + Math.random()}
          rotationIntensity={0.8}
          floatIntensity={0.8}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2,
            ]}
          >
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#B8860B"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export default FloatingHair;