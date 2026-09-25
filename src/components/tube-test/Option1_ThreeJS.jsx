import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Tube({ progress }) {
  const tubeRef = useRef();
  const fluidRef = useRef();

  // Create the S-curve path for 3D
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.8, 0),
      new THREE.Vector3(1.5, 1.8, 0),
      new THREE.Vector3(1.5, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1.8, 0)
    ], false, 'chordal', 0.5);
  }, []);

  return (
    <group position={[-0.7, 0, 0]}>
      {/* Outer Tube (Glass/Silicone) */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 64, 0.15, 16, false]} />
        <meshPhysicalMaterial 
          color="#d0e0ff" 
          transparent={true} 
          opacity={0.3}
          roughness={0.05} 
          metalness={0.1}
          transmission={0.9} 
          ior={1.46}
          thickness={0.5}
        />
      </mesh>

      {/* Inner Fluid */}
      <mesh ref={fluidRef}>
        <tubeGeometry args={[curve, 64, 0.11, 16, false]} />
        <meshPhysicalMaterial 
          color="#33ccff"
          transparent={true}
          opacity={0.8}
          roughness={0.1}
          transmission={0.5}
        />
      </mesh>
    </group>
  );
}

export default function Option1ThreeJS({ progress }) {
  // Simple full-canvas overlay
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, -2]} intensity={0.5} />
        <Tube progress={progress} />
      </Canvas>
    </div>
  );
}
