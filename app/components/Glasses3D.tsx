"use client";
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Rounded-rect Shape builder (with optional inner hole) ──────────────────
function rrShape(
  ow: number, oh: number, or_: number,
  iw?: number, ih?: number, ir?: number,
) {
  const s = new THREE.Shape();
  const hw = ow / 2, hh = oh / 2;
  s.moveTo(-hw + or_, -hh);
  s.lineTo(hw - or_, -hh);   s.quadraticCurveTo(hw, -hh, hw, -hh + or_);
  s.lineTo(hw, hh - or_);    s.quadraticCurveTo(hw, hh, hw - or_, hh);
  s.lineTo(-hw + or_, hh);   s.quadraticCurveTo(-hw, hh, -hw, hh - or_);
  s.lineTo(-hw, -hh + or_);  s.quadraticCurveTo(-hw, -hh, -hw + or_, -hh);
  if (iw !== undefined && ih !== undefined && ir !== undefined) {
    const hole = new THREE.Path();
    const hiw = iw / 2, hih = ih / 2;
    hole.moveTo(-hiw + ir, -hih);
    hole.lineTo(hiw - ir, -hih);   hole.quadraticCurveTo(hiw, -hih, hiw, -hih + ir);
    hole.lineTo(hiw, hih - ir);    hole.quadraticCurveTo(hiw, hih, hiw - ir, hih);
    hole.lineTo(-hiw + ir, hih);   hole.quadraticCurveTo(-hiw, hih, -hiw, hih - ir);
    hole.lineTo(-hiw, -hih + ir);  hole.quadraticCurveTo(-hiw, -hih, -hiw + ir, -hih);
    s.holes.push(hole);
  }
  return s;
}

const EXT_FRAME: THREE.ExtrudeGeometryOptions  = { depth: 0.14, bevelEnabled: true, bevelSize: 0.022, bevelThickness: 0.022, bevelSegments: 4 };
const EXT_ACCENT: THREE.ExtrudeGeometryOptions = { depth: 0.004, bevelEnabled: false };
const MAX_ANGLE = 0.38; // radians ≈ 22°

// ── Frame-color mapping ────────────────────────────────────────────────────
const FRAME_HEX: Record<string, string> = {
  'Carbon':        '#2e2e2e',
  'Ghost White':   '#cacaca',
  'Vision Orange': '#f97316',
};

// ── Inner 3D model ─────────────────────────────────────────────────────────
function GlassesModel({
  accent, frameName, lensOp,
}: { accent: string; frameName: string; lensOp: number }) {
  const group     = useRef<THREE.Group>(null);
  const dragging  = useRef(false);
  const lastX     = useRef(0);
  const vel       = useRef(0);
  const phase     = useRef(0);

  // ── Geometry (stable, no deps) ──────────────────────────────────────────
  const frameGeo = useMemo(() => {
    const s = rrShape(1.90, 0.87, 0.15, 1.68, 0.65, 0.10);
    return new THREE.ExtrudeGeometry(s, EXT_FRAME);
  }, []);

  const accentRimGeo = useMemo(() => {
    const s = rrShape(1.98, 0.95, 0.17, 1.80, 0.77, 0.13);
    return new THREE.ExtrudeGeometry(s, EXT_ACCENT);
  }, []);

  const lensGeo = useMemo(() => new THREE.PlaneGeometry(1.64, 0.61), []);

  // ── Materials (update when accent / frame / opacity changes) ────────────
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(FRAME_HEX[frameName] ?? '#2e2e2e'),
    metalness: 0.90,
    roughness: 0.12,
    envMapIntensity: 1.4,
  }), [frameName]);

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accent),
    emissive: new THREE.Color(accent),
    emissiveIntensity: 0.8,
  }), [accent]);

  const lensMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(accent),
    transparent: true,
    opacity: lensOp,
    roughness: 0.03,
    metalness: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [accent, lensOp]);

  // Cleanup on unmount
  useEffect(() => () => {
    frameGeo.dispose(); accentRimGeo.dispose(); lensGeo.dispose();
    frameMat.dispose(); accentMat.dispose(); lensMat.dispose();
  }, [frameGeo, accentRimGeo, lensGeo, frameMat, accentMat, lensMat]);

  // ── Animation loop ──────────────────────────────────────────────────────
  useFrame((_, delta) => {
    if (!group.current) return;
    phase.current += delta * 0.46;
    const autoTarget = Math.sin(phase.current) * MAX_ANGLE;

    if (!dragging.current) {
      group.current.rotation.y += (autoTarget - group.current.rotation.y) * 0.038;
      group.current.rotation.y += vel.current;
      vel.current *= 0.88;
    }
    // Gentle levitation
    group.current.position.y = Math.sin(Date.now() / 1700) * 0.075;
  });

  // ── One lens (left = side -1, right = side +1) ──────────────────────────
  const Lens = ({ side }: { side: -1 | 1 }) => (
    <group position={[side * 1.1, 0, 0]}>
      {/* Accent rim behind frame */}
      <mesh geometry={accentRimGeo} position={[0, 0, -0.02]} material={accentMat} />
      {/* Main frame (hollow via shape hole) */}
      <mesh geometry={frameGeo} material={frameMat} />
      {/* Glass lens */}
      <mesh geometry={lensGeo} position={[0, 0, 0.09]} material={lensMat} />
      {/* Specular highlight strip */}
      <mesh position={[-0.38, 0.22, 0.10]}>
        <planeGeometry args={[0.72, 0.055]} />
        <meshBasicMaterial color="white" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );

  return (
    <group
      ref={group}
      onPointerDown={e => {
        dragging.current = true;
        lastX.current = e.nativeEvent.clientX;
        e.stopPropagation();
      }}
      onPointerMove={e => {
        if (!dragging.current) return;
        const dx = (e.nativeEvent.clientX - lastX.current) / 170;
        const next = Math.max(-1.35, Math.min(1.35, group.current!.rotation.y + dx));
        group.current!.rotation.y = next;
        vel.current = dx;
        // Re-sync phase so resume is smooth
        const ratio = Math.max(-1, Math.min(1, next / MAX_ANGLE));
        phase.current = Math.asin(ratio);
        lastX.current = e.nativeEvent.clientX;
      }}
      onPointerUp={()    => { dragging.current = false; }}
      onPointerLeave={() => { dragging.current = false; }}
    >
      <Lens side={-1} />
      <Lens side={1} />

      {/* Nose bridge */}
      <mesh position={[0, 0.04, 0]} material={frameMat}>
        <boxGeometry args={[0.26, 0.14, 0.14]} />
      </mesh>

      {/* Top bar */}
      <mesh position={[0, 0.455, 0.01]} material={frameMat}>
        <boxGeometry args={[4.52, 0.064, 0.075]} />
      </mesh>

      {/* Left temple */}
      <group position={[-2.27, 0.11, -0.02]}>
        <mesh rotation={[0, -0.18, 0.05]} position={[0, 0, -0.48]} material={frameMat}>
          <boxGeometry args={[0.068, 0.058, 0.98]} />
        </mesh>
      </group>

      {/* Right temple */}
      <group position={[2.27, 0.11, -0.02]}>
        <mesh rotation={[0, 0.18, -0.05]} position={[0, 0, -0.48]} material={frameMat}>
          <boxGeometry args={[0.068, 0.058, 0.98]} />
        </mesh>
      </group>
    </group>
  );
}

// ── Public canvas component ────────────────────────────────────────────────
export default function Glasses3DCanvas({
  accent,
  frameName = 'Carbon',
  lensOp    = 0.65,
  height    = 260,
  className = '',
}: {
  accent:     string;
  frameName?: string;
  lensOp?:    number;
  height?:    number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ width: '100%', height, cursor: 'grab', userSelect: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 4]}   intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-4, 2, 3]}  intensity={0.6} color={accent} />
        <directionalLight position={[0, -3, 2]}  intensity={0.3} color="#ffffff" />
        <pointLight       position={[0, 0, 5]}   intensity={0.9} color="#ffffff" />
        <pointLight       position={[0, 2, -2]}  intensity={0.4} color={accent} />

        <GlassesModel accent={accent} frameName={frameName} lensOp={lensOp} />
      </Canvas>
    </div>
  );
}
