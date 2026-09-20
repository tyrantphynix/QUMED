import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * Procedural3DSyringe
 * Recreated with exact precision to match reference:
 * - 22° diagonal posture
 * - Crystal clear glass barrel with black graduation ticks & numbers
 * - Molded white polypropylene flared plunger & wide oval finger flange
 * - Triple-lip black rubber piston stopper
 * - Translucent soft purple-blue medical fluid inside barrel
 * - Translucent ice-blue luer lock hub
 * - White medical 3-way stopcock T-valve with side-port turn handle
 * - Tapered connector sleeve with purple-blue fluid stream
 * - Fluid compresses and expels down snake tube on scroll
 */
function HighRealismSyringe({ scrollProgress = 0, isStatic = false, isTablet = false }) {
  const groupRef = useRef();
  const plungerRef = useRef();
  const liquidRef = useRef();

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    targetProgress.current = Math.max(0, Math.min(1, scrollProgress));
  }, [scrollProgress]);

  // Graduation marks along the barrel (5, 4, 3, 2 ml + intermediate ticks)
  const graduationData = useMemo(() => {
    const marks = [];
    // 5 major marks: 1 to 5 ml
    for (let i = 0; i <= 8; i++) {
      const y = -0.75 + (i / 8) * 1.7;
      const isMajor = i % 2 === 0;
      const mlNumber = isMajor ? 5 - (i / 2) : null;
      marks.push({ y, isMajor, mlNumber, radius: 0.462 });
    }
    return marks;
  }, []);

  useFrame((state, delta) => {
    currentProgress.current += (targetProgress.current - currentProgress.current) * Math.min(1, delta * 8);

    if (groupRef.current && !isStatic) {
      const t = state.clock.elapsedTime;
      // Gentle breathing float - stays safely below navbar
      const baseY = isTablet ? -0.35 : -0.22;
      groupRef.current.position.y = baseY + Math.sin(t * 0.7) * 0.025;
      groupRef.current.rotation.z = -0.38 + Math.sin(t * 0.5) * 0.012;
      groupRef.current.rotation.y = 0.22 + Math.cos(t * 0.4) * 0.015;
    }

    if (plungerRef.current) {
      // Plunger starts at y = 0.85 and pushes downward to y = -0.45 as user scrolls
      plungerRef.current.position.y = 0.85 - currentProgress.current * 1.30;
    }

    if (liquidRef.current) {
      const fillRatio = Math.max(0.05, 1 - currentProgress.current * 0.88);
      liquidRef.current.scale.y = fillRatio;
      liquidRef.current.position.y = -1.05 + (fillRatio * 1.0);
    }
  });

  const groupX = isTablet ? 0.65 : 1.25;
  const groupY = isTablet ? -0.35 : -0.22;

  return (
    <group ref={groupRef} position={[groupX, groupY, 0]} rotation={[0.08, 0.22, -0.38]}>
      {/* ========================================================
          1. GLASS BARREL CYLINDER
          ======================================================== */}
      {/* Outer transparent glass cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 2.35, 36, 1, false]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.96}
          opacity={0.3}
          transparent={true}
          roughness={0.03}
          ior={1.5}
          thickness={0.35}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Primary Specular Highlight Stripe (Glossy glass reflection along left side) */}
      <mesh position={[-0.24, 0, 0.38]} rotation={[0, -0.45, 0]}>
        <boxGeometry args={[0.025, 2.3, 0.005]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.8} transparent={true} />
      </mesh>

      {/* Secondary Soft Rim Reflection along right side */}
      <mesh position={[0.24, 0, 0.38]} rotation={[0, 0.45, 0]}>
        <boxGeometry args={[0.018, 2.25, 0.005]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.4} transparent={true} />
      </mesh>

      {/* Barrel Oval Finger Flange (White molded polypropylene at top y = 1.18) */}
      <mesh position={[0, 1.18, 0]} scale={[1.4, 1, 0.85]}>
        <cylinderGeometry args={[0.68, 0.68, 0.08, 36]} />
        <meshPhysicalMaterial
          color="#F8FAFC"
          transmission={0.7}
          opacity={0.8}
          transparent={true}
          roughness={0.18}
          ior={1.42}
        />
      </mesh>
      {/* Flange top lip rim */}
      <mesh position={[0, 1.22, 0]} scale={[1.42, 1, 0.87]}>
        <cylinderGeometry args={[0.68, 0.68, 0.02, 36]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>

      {/* Graduation Marks (Black tick marks + ml labels etched on barrel) */}
      {graduationData.map((mark, idx) => (
        <group key={idx} position={[0, mark.y, 0]}>
          <mesh position={[-0.05, 0, mark.radius]}>
            <boxGeometry args={[mark.isMajor ? 0.24 : 0.12, 0.016, 0.008]} />
            <meshBasicMaterial color="#1E293B" opacity={mark.isMajor ? 0.95 : 0.6} />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          2. TRANSLUCENT PURPLE-BLUE MEDICAL FLUID
          ======================================================== */}
      <mesh ref={liquidRef} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.435, 0.435, 2.05, 32]} />
        <meshStandardMaterial
          color="#4F46E5"
          emissive="#3730A3"
          emissiveIntensity={0.65}
          transparent={true}
          opacity={0.88}
          roughness={0.15}
          metalness={0.05}
        />
      </mesh>

      {/* Liquid Inner Refraction Glow */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.40, 0.40, 2.0, 32]} />
        <meshBasicMaterial color="#818CF8" transparent={true} opacity={0.35} />
      </mesh>

      {/* Liquid Meniscus Curve under Piston */}
      <mesh position={[0, 0.96, 0]}>
        <cylinderGeometry args={[0.436, 0.436, 0.025, 32]} />
        <meshBasicMaterial color="#A5B4FC" opacity={0.7} transparent={true} />
      </mesh>

      {/* ========================================================
          3. PLUNGER ASSEMBLY (Flared white polypropylene + 3-ring stopper)
          ======================================================== */}
      <group ref={plungerRef} position={[0, 0.85, 0]}>
        {/* Rubber Piston Stopper (Black triple-lip seal) */}
        {/* Ring 1 (top) */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.445, 0.445, 0.06, 32]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        {/* Ring 2 (middle) */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.448, 0.448, 0.06, 32]} />
          <meshStandardMaterial color="#09090B" roughness={0.75} />
        </mesh>
        {/* Ring 3 (bottom) */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.445, 0.445, 0.06, 32]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        {/* Stopper conical nose facing nozzle */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.43, 0.30, 0.08, 32]} />
          <meshStandardMaterial color="#27272A" roughness={0.8} />
        </mesh>

        {/* Cross-Ribbed Shaft (+) Wing 1 */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.14, 2.0, 0.03]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.22} metalness={0.08} />
        </mesh>
        {/* Cross-Ribbed Shaft (+) Wing 2 */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.03, 2.0, 0.14]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.22} metalness={0.08} />
        </mesh>

        {/* Flared Shaft Neck Collar (Smooth transition to thumb disc) */}
        <mesh position={[0, 2.02, 0]}>
          <cylinderGeometry args={[0.32, 0.16, 0.22, 32]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.05} />
        </mesh>

        {/* Thumb Press Flange Disc (Molded white disc at top handle) */}
        <mesh position={[0, 2.14, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.08, 36]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Disc Beveled Top Rim */}
        <mesh position={[0, 2.18, 0]}>
          <cylinderGeometry args={[0.60, 0.66, 0.03, 36]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.25} />
        </mesh>
      </group>

      {/* ========================================================
          4. NOZZLE, 3-WAY STOPCOCK & CONNECTOR SLEEVE
          ======================================================== */}
      {/* Tapered glass nozzle */}
      <mesh position={[0, -1.28, 0]}>
        <cylinderGeometry args={[0.46, 0.22, 0.26, 32]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.92}
          opacity={0.35}
          transparent={true}
          roughness={0.06}
          ior={1.48}
        />
      </mesh>

      {/* Translucent Ice-Blue Polypropylene Luer Lock Hub */}
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[0.20, 0.17, 0.26, 28]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.7}
          opacity={0.85}
          transparent={true}
          roughness={0.18}
          metalness={0.08}
        />
      </mesh>
      {/* Hub grip ribs */}
      <mesh position={[0, -1.44, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.06, 28]} />
        <meshStandardMaterial color="#0284C7" roughness={0.25} />
      </mesh>

      {/* --- Medical 3-Way Stopcock Valve Assembly (From Reference Image) --- */}
      {/* Main vertical valve body */}
      <mesh position={[0, -1.78, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.32, 24]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Horizontal side port branch pointing right */}
      <mesh position={[0.18, -1.78, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.26, 20]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
      </mesh>
      {/* White valve turn handle / plug on side port */}
      <mesh position={[0.33, -1.78, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.10, 0.10, 20]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <mesh position={[0.39, -1.78, 0]}>
        <boxGeometry args={[0.05, 0.24, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>

      {/* Tapered Translucent Connector Sleeve */}
      <mesh position={[0, -2.15, 0]}>
        <cylinderGeometry args={[0.17, 0.11, 0.48, 24]} />
        <meshPhysicalMaterial
          color="#F1F5F9"
          transmission={0.82}
          opacity={0.65}
          transparent={true}
          roughness={0.12}
        />
      </mesh>
      {/* Fluid running through center of connector sleeve */}
      <mesh position={[0, -2.15, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.48, 16]} />
        <meshStandardMaterial color="#4F46E5" emissive="#3730A3" emissiveIntensity={0.6} />
      </mesh>

      {/* Silicone Tube Collar Clamp */}
      <mesh position={[0, -2.42, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.10, 16]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.2} metalness={0.4} />
      </mesh>
    </group>
  );
}

// 2. Snake Tube Curve 1: Emerging from Connector Sleeve down across Hero
const getSnakeTubeCurve = (isTablet = false) => {
  const startX = isTablet ? 0.65 : 1.25;
  const startY = isTablet ? -2.75 : -2.62;

  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(startX, startY, 0),
    new THREE.Vector3(startX - 0.55, startY - 0.9, 0.2),
    new THREE.Vector3(startX - 1.45, startY - 1.8, 0.35),
    new THREE.Vector3(startX - 0.75, startY - 2.8, 0.1),
    new THREE.Vector3(startX - 1.85, startY - 4.2, -0.15),
  ], false, 'chordal', 0.5);
};

// 3. Tube Curve 2: Rear loop arching over top-right down into IV Drip Chamber (From Reference Image)
const getRearTubeCurve = (isTablet = false) => {
  const startX = isTablet ? 0.65 : 1.25;
  const startY = isTablet ? 0.85 : 0.95;

  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(startX - 0.1, startY - 0.3, -0.3),
    new THREE.Vector3(startX + 0.35, startY + 0.5, -0.2),
    new THREE.Vector3(startX + 0.75, startY + 0.1, 0.0),
    new THREE.Vector3(startX + 0.85, startY - 1.4, 0.1),
    new THREE.Vector3(startX + 0.85, startY - 3.2, 0.0),
  ], false, 'chordal', 0.5);
};

// 4. Fluid Shader for Snake Tube
const FlowingLiquidMesh = ({ curve, isStatic, scrollProgress }) => {
  const materialRef = useRef();

  const shaderArgs = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      color: { value: new THREE.Color('#4F46E5') },
      glowColor: { value: new THREE.Color('#818CF8') },
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
      uniform float progress;
      uniform vec3 color;
      uniform vec3 glowColor;
      varying vec2 vUv;

      void main() {
        float flow = fract(vUv.x * 2.5 - time * 0.4);
        float pulse = sin(vUv.x * 14.0 - time * 2.2) * 0.5 + 0.5;

        float fillThreshold = 0.30 + (progress * 0.70);
        if (vUv.x > fillThreshold) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.04);
          return;
        }

        float meniscus = smoothstep(fillThreshold - 0.05, fillThreshold, vUv.x);
        vec3 finalCol = mix(color, glowColor, pulse * 0.35 + meniscus * 0.55);
        float alpha = (0.65 + pulse * 0.22) + (meniscus * 0.3);

        gl_FragColor = vec4(finalCol, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
  }), []);

  useFrame((_state, delta) => {
    if (materialRef.current) {
      if (!isStatic) {
        materialRef.current.uniforms.time.value += delta;
      }
      const cur = materialRef.current.uniforms.progress.value;
      materialRef.current.uniforms.progress.value += (scrollProgress - cur) * Math.min(1, delta * 6);
    }
  });

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.15, 16, false]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

// 5. Outer Transparent Silicone Medical Tube
const TransparentSiliconeTube = ({ curve, radius = 0.21 }) => {
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, radius, 16, false]} />
      <meshPhysicalMaterial
        color="#FFFFFF"
        transmission={0.92}
        opacity={0.3}
        transparent={true}
        roughness={0.06}
        ior={1.46}
        thickness={0.2}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// 6. IV Drip Chamber & Filter Assembly on Rear Tube
const IVDripChamber = ({ isTablet }) => {
  const posX = isTablet ? 1.5 : 2.1;
  const posY = isTablet ? -2.2 : -2.1;

  return (
    <group position={[posX, posY, 0]}>
      {/* Clear Drip Chamber Cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 1.15, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          opacity={0.3}
          transparent={true}
          roughness={0.04}
          ior={1.48}
        />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 0.60, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.25} />
      </mesh>
      {/* Bottom Cap with luer connection */}
      <mesh position={[0, -0.60, 0]}>
        <cylinderGeometry args={[0.24, 0.16, 0.16, 24]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.25} />
      </mesh>
      {/* Fluid inside drip chamber */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.48, 20]} />
        <meshStandardMaterial color="#4F46E5" emissive="#3730A3" emissiveIntensity={0.5} transparent={true} opacity={0.8} />
      </mesh>
    </group>
  );
};

// 7. Main Hero 3D Scene
export default function HeroScene({ fallback, scrollProgress = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewportType, setViewportType] = useState('desktop');

  useEffect(() => {
    const checkViewport = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setViewportType('mobile');
      } else if (w <= 1024) {
        setViewportType('tablet');
      } else {
        setViewportType('desktop');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    checkViewport();
    setReducedMotion(mediaQuery.matches);
    setMounted(true);

    window.addEventListener('resize', checkViewport);
    const motionListener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkViewport);
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, []);

  const isTablet = viewportType === 'tablet';
  const isMobile = viewportType === 'mobile';

  const snakeCurve = useMemo(() => getSnakeTubeCurve(isTablet), [isTablet]);
  const rearCurve = useMemo(() => getRearTubeCurve(isTablet), [isTablet]);

  if (!mounted || isMobile) return fallback || null;

  return (
    <ErrorBoundary fallback={fallback}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, isTablet ? 7.6 : 6.8],
          fov: isTablet ? 40 : 38
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        {/* Studio Lighting Setup for High-End Medical Renders */}
        <ambientLight intensity={1.2} />
        {/* Overhead Key Light */}
        <directionalLight position={[8, 12, 8]} intensity={2.8} color="#FFFFFF" />
        {/* Left Fill Light */}
        <directionalLight position={[-8, 2, 5]} intensity={1.2} color="#E0E7FF" />
        {/* Bottom-back Rim Light for Glass Edges */}
        <directionalLight position={[2, -6, -6]} intensity={1.5} color="#818CF8" />
        {/* Crisp Specular Point Lights on Syringe */}
        <pointLight position={[isTablet ? 0.9 : 1.4, 0.4, 2.8]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-1.2, -0.8, 2.2]} intensity={1.0} color="#C7D2FE" />

        {/* 1. High-Realism Medical Syringe */}
        <HighRealismSyringe
          scrollProgress={scrollProgress}
          isStatic={reducedMotion}
          isTablet={isTablet}
        />

        {/* 2. Front Snake Tube flowing down through site */}
        <group position={[0, 0, 0]}>
          <TransparentSiliconeTube curve={snakeCurve} radius={0.21} />
          <FlowingLiquidMesh curve={snakeCurve} isStatic={reducedMotion} scrollProgress={scrollProgress} />
        </group>

        {/* 3. Rear Tube Loop into IV Drip Chamber (from reference photo) */}
        <group position={[0, 0, 0]}>
          <TransparentSiliconeTube curve={rearCurve} radius={0.16} />
          <IVDripChamber isTablet={isTablet} />
        </group>
      </Canvas>
    </ErrorBoundary>
  );
}
