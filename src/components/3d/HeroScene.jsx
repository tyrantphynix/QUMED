import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ErrorBoundary } from './ErrorBoundary';

// 1. Define the procedural S-curve for the cannula/tube
const getCurve = () => {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, -4, -2),
    new THREE.Vector3(1.5, -1, 0),
    new THREE.Vector3(0.5, 1, 1),
    new THREE.Vector3(-0.5, 3, 0.5),
    new THREE.Vector3(-1.5, 4.5, -1),
  ], false, 'chordal', 0.5);
};

// 2. Inner Fluid Mesh (Custom Shader for flowing liquid)
const FluidFlow = ({ curve, isStatic }) => {
  const materialRef = useRef();

  const shaderArgs = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#0067FF') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
        // vUv.x goes along the tube
        float flow = fract(vUv.x - time * 0.2);
        
        // Smooth continuous pulse instead of repeating stripes
        float liquid = smoothstep(0.3, 0.5, flow) - smoothstep(0.5, 0.7, flow);
        
        // Subtle secondary pulse for realism
        float pulse = sin(vUv.x * 10.0 - time * 1.5) * 0.5 + 0.5;
        float finalIntensity = (liquid * 0.6) + (pulse * 0.2) + 0.1;

        // Clinical transparency (lower alpha/saturation)
        float alpha = finalIntensity * 0.45;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.NormalBlending,
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current && !isStatic) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <mesh>
      {/* Slightly smaller radius than outer tube to fit inside */}
      <tubeGeometry args={[curve, 48, 0.28, 12, false]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

// 3. Outer Medical Plastic Tube
const MedicalTube = ({ curve }) => {
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, 0.35, 12, false]} />
      <meshStandardMaterial 
        color="#F4F7FD"
        transparent={true}
        opacity={0.15}
        roughness={0.1}
        metalness={0.1}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// 4. Procedural Prototype Group wrapping to handle slow idle rotation
const TubePrototype = ({ isStatic }) => {
  const groupRef = useRef();
  const curve = useMemo(() => getCurve(), []);

  useFrame((state, delta) => {
    if (groupRef.current && !isStatic) {
      // Gentle floating/breathing motion
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, -1, 0]} rotation={[0, -0.2, 0]}>
      <MedicalTube curve={curve} />
      <FluidFlow curve={curve} isStatic={isStatic} />
    </group>
  );
};

// 5. Main Canvas Scene
export default function HeroScene({ fallback }) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial breakpoints and motion preferences
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    checkViewport();
    setReducedMotion(mediaQuery.matches);
    setMounted(true);

    // Listeners
    window.addEventListener('resize', checkViewport);
    const motionListener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkViewport);
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // Do not render canvas on mobile or before mount
  if (!mounted || isMobile) return fallback || null;

  return (
    <ErrorBoundary fallback={fallback}>
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, alpha: true }} // alpha true allows CSS gradient behind
        style={{ pointerEvents: 'none' }} // Ensure it doesn't block DOM clicks
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0067FF" />
        
        <TubePrototype isStatic={reducedMotion} />
      </Canvas>
    </ErrorBoundary>
  );
}
