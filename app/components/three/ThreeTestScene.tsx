'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Group } from 'three';

const GLASSES_MODEL_CANDIDATES = [
  '/models/glasses.glb',
  '/models/Glasses.glb',
  '/models/vision-run.glb',
  '/models/glasses-vr.glb',
] as const;

async function modelPathExists(path: string): Promise<boolean> {
  try {
    const head = await fetch(path, { method: 'HEAD' });
    if (head.ok) return true;
    if (head.status === 405) {
      const r = await fetch(path, { method: 'GET', headers: { Range: 'bytes=0-0' } });
      return r.ok;
    }
  } catch {
    return false;
  }
  return false;
}

async function resolveGlassesModelPath(): Promise<string | null> {
  for (const path of GLASSES_MODEL_CANDIDATES) {
    if (await modelPathExists(path)) return path;
  }
  return null;
}

function GlassesLoaded({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clone} />;
}

function GlassesRig({ url }: { url: string }) {
  const pivot = useRef<Group>(null);
  useFrame((_, delta) => {
    const g = pivot.current;
    if (!g) return;
    g.rotation.y += delta * 0.38;
    g.rotation.x = Math.sin(performance.now() * 0.00035) * 0.08;
  });
  return (
    <group ref={pivot}>
      <Suspense fallback={null}>
        <Center>
          <GlassesLoaded url={url} />
        </Center>
      </Suspense>
    </group>
  );
}

const shellClass =
  'relative h-[min(42vh,400px)] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#080808] shadow-[0_24px_80px_rgba(0,0,0,0.45)]';

export function ThreeTestScene() {
  const [glbUrl, setGlbUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const path = await resolveGlassesModelPath();
      if (cancelled) return;
      if (path) {
        try {
          useGLTF.preload(path);
        } catch {
          /* ignore */
        }
      }
      setGlbUrl(path);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (glbUrl === undefined || glbUrl === null) {
    return null;
  }

  return (
    <div className={shellClass}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" aria-hidden />
      <p className="pointer-events-none absolute left-5 top-4 z-10 text-[10px] font-black uppercase tracking-[0.45em] text-white/35">
        AR · preview
      </p>
      <Canvas
        className="h-full w-full touch-none"
        camera={{ position: [0, 0.2, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#010101']} />
        <ambientLight intensity={0.32} />
        <directionalLight position={[6, 8, 6]} intensity={0.8} />
        <directionalLight position={[-4, -2, -5]} intensity={0.22} color="#b4c8ff" />
        <GlassesRig url={glbUrl} />
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={1.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
