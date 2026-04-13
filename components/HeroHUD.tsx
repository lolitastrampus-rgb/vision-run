"use client";
import React, { useEffect, useState } from 'react';

const useCountUp = (end: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frameId = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(end * progress * 10) / 10);
      if (progress < 1) frameId = requestAnimationFrame(animate);
      else setCount(end);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end]);
  return count;
};

export const HeroHUD = () => {
  const bpm = useCountUp(168);
  const speed = useCountUp(18.5);
  const energy = useCountUp(74);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Pulse */}
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 transition-all hover:-translate-y-3 hover:border-red-400/50 hover:bg-red-950/20">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500/70 via-transparent to-red-500/70 opacity-80 animate-[pulseLine_2.4s_linear_infinite]" />
        <p className="text-[10px] font-black text-red-300 uppercase tracking-widest mb-3">BPM</p>
        <div className="flex items-baseline gap-3">
          <span className="text-8xl font-black italic tracking-tighter text-red-400 animate-[heartbeat_1.2s_ease-in-out_infinite]">{bpm.toFixed(0)}</span>
          <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>

      {/* Velocity */}
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-8 transition-all hover:-translate-y-3 hover:border-cyan-400/60 hover:bg-cyan-950/15">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/60 via-transparent to-cyan-400/60 opacity-70 animate-[flowLine_3s_linear_infinite]" />
        <p className="text-[10px] font-black text-cyan-300 uppercase tracking-widest mb-3">Km/h</p>
        <div className="flex items-baseline gap-3">
          <span className="text-6xl font-black italic tracking-tighter text-cyan-300">{speed.toFixed(1)}</span>
          <span className="text-sm text-cyan-200 uppercase tracking-[0.35em]">KM/H</span>
        </div>
      </div>

      {/* Energy */}
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-8 transition-all hover:-translate-y-3 hover:border-emerald-400/60 hover:bg-emerald-950/15">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400/60 via-transparent to-emerald-400/60 opacity-70 animate-[flowLine_3.4s_linear_infinite]" />
        <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-3">Charge</p>
        <div className="flex items-center gap-4">
          <span className="text-7xl font-black italic tracking-tighter text-white">{energy.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};