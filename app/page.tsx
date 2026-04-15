"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { t, COVER_IMAGES, MODES, SHOWCASE_MODELS, FRAME_STROKES, TINT_OPS, slideVariants } from './constants';

const useCountUp = (end: number) => {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  // Fire only once when the element enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frameId = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased * 10) / 10);
      if (progress < 1) { frameId = requestAnimationFrame(animate); } else { setCount(end); }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, end]);

  return { count, ref };
};

// ── Glasses SVG ──────────────────────────────────────────────────────────────
function GlassesSVG({
  accent, modeId,
  frameStroke = 'rgba(200,200,200,0.38)',
  lensOpacity = 1,
  hud = 'minimal',
  className = '',
}: {
  accent: string; modeId: string;
  frameStroke?: string; lensOpacity?: number;
  hud?: 'minimal' | 'sport' | 'tech'; className?: string;
}) {
  const lg = `lg-${modeId}`; const rg = `rg-${modeId}`; const sh = `sh-${modeId}`;
  const lo = lensOpacity;
  const lensL = 'M 8,14 C 6,14 4,28 4,42 C 4,64 9,84 38,89 C 68,94 124,93 146,82 C 157,75 158,58 157,44 C 156,28 150,12 140,12 L 20,12 Z';
  const lensR = 'M 312,14 C 314,14 316,28 316,42 C 316,64 311,84 282,89 C 252,94 196,93 174,82 C 163,75 162,58 163,44 C 164,28 170,12 180,12 L 300,12 Z';
  return (
    <svg className={className} width="100%" viewBox="-10 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={lg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={accent} stopOpacity={0.65 * lo} />
          <stop offset="55%"  stopColor={accent} stopOpacity={0.38 * lo} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.1  * lo} />
        </linearGradient>
        <linearGradient id={rg} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={accent} stopOpacity={0.65 * lo} />
          <stop offset="55%"  stopColor={accent} stopOpacity={0.38 * lo} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.1  * lo} />
        </linearGradient>
        <linearGradient id={sh} x1="0.08" y1="0" x2="0.75" y2="0.7" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity={0.55 * lo} />
          <stop offset="55%"  stopColor="white" stopOpacity={0.08 * lo} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="8" y="9" width="304" height="3.5" rx="1.75" fill={frameStroke} opacity="0.9" />
      <path d={lensL} fill={`url(#${lg})`} />
      <path d={lensL} fill={`url(#${sh})`} />
      <path d={lensL} stroke={accent} strokeWidth="1.5" strokeOpacity={0.8 * lo} fill="none" />
      <path d="M 22,20 Q 74,13 142,19" stroke="white" strokeOpacity={0.5 * lo} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d={lensR} fill={`url(#${rg})`} />
      <path d={lensR} fill={`url(#${sh})`} />
      <path d={lensR} stroke={accent} strokeWidth="1.5" strokeOpacity={0.8 * lo} fill="none" />
      <path d="M 298,20 Q 246,13 178,19" stroke="white" strokeOpacity={0.5 * lo} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 157,46 Q 157,36 160,33 Q 163,36 163,46" stroke={frameStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 6,58 L -8,68 L -8,78"   stroke={frameStroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 314,58 L 328,68 L 328,78" stroke={frameStroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {hud === 'sport' && <>
        <line x1="30" y1="51" x2="148" y2="51" stroke="white" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 4" />
        <line x1="172" y1="51" x2="310" y2="51" stroke="white" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 4" />
        <circle cx="83" cy="51" r="2.5" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="237" cy="51" r="2.5" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
      </>}
      {hud === 'tech' && <g>
        {[30,50,70,90,110,130].map(x => <line key={`vl${x}`} x1={x} y1="20" x2={x} y2="85" stroke="white" strokeOpacity="0.06" strokeWidth="0.6"/>)}
        {[30,50,70,90,110,130].map(x => <line key={`vr${x}`} x1={x+160} y1="20" x2={x+160} y2="85" stroke="white" strokeOpacity="0.06" strokeWidth="0.6"/>)}
        {[25,45,65,85].map(y => <g key={`h${y}`}><line x1="8" y1={y} x2="155" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.6"/><line x1="165" y1={y} x2="312" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.6"/></g>)}
        <rect x="14" y="18" width="10" height="6"  fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="133" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="177" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="296" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
      </g>}
    </svg>
  );
}

function VisionShowcase({ lang }: { lang: 'en' | 'ru' }) {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(1);
  const [hud, setHud]       = useState<'minimal'|'sport'|'tech'>('minimal');
  const [tint, setTint]     = useState('Dark');
  const [frame, setFrame]   = useState('Carbon');

  const model  = SHOWCASE_MODELS[idx];
  const accent = frame === 'Vision Orange' ? '#f97316' : frame === 'Ghost White' ? model.accent : model.accent;
  const fStroke = FRAME_STROKES[frame];
  const lOp    = TINT_OPS[tint];

  const go = (step: number) => {
    setDir(step);
    setIdx(i => (i + step + SHOWCASE_MODELS.length) % SHOWCASE_MODELS.length);
  };

  const ConfigTag = ({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) => (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border transition-all duration-200 cursor-pointer"
      style={{
        borderColor: active ? accent : 'rgba(255,255,255,0.1)',
        background:  active ? `${accent}20` : 'transparent',
        color:       active ? accent : 'rgba(255,255,255,0.4)',
        boxShadow:   active ? `0 0 12px ${accent}30` : 'none',
      }}>
      {label}
    </button>
  );

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse 70% 60% at 38% 50%, ${accent}0a 0%, transparent 70%)`, transition:'background 0.6s ease' }} />

      <div className="max-w-7xl mx-auto px-6 lg:pl-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-4">{lang==='ru'?'Флагманский продукт':'Flagship Product'}</p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">{lang==='ru'?'Vision Showcase.':'Vision Showcase.'}</h2>
            <p className="text-sm text-white/35 max-w-xs leading-relaxed md:pb-1">{lang==='ru'?'Выбери модель, настрой линзу, оправу и HUD-интерфейс.':'Select your model, configure lens, frame and HUD interface.'}</p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">

          {/* ── STAGE ── */}
          <div className="flex flex-col items-center">

            {/* Model strip (mini thumbnails) */}
            <div className="flex gap-2 mb-10">
              {SHOWCASE_MODELS.map((m,i) => (
                <button key={m.id} onClick={() => { setDir(i>idx?1:-1); setIdx(i); }}
                  className="relative px-3 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-200"
                  style={{
                    borderColor: i===idx ? m.accent : 'rgba(255,255,255,0.08)',
                    color:       i===idx ? m.accent : 'rgba(255,255,255,0.28)',
                    background:  i===idx ? `${m.accent}14` : 'transparent',
                    boxShadow:   i===idx ? `0 0 14px ${m.accent}28` : 'none',
                  }}>
                  {m.tag}
                </button>
              ))}
            </div>

            {/* Glasses stage */}
            <div className="relative w-full flex items-center justify-center" style={{ height:'240px' }}>

              {/* Bokeh — far left */}
              <div className="absolute pointer-events-none select-none" style={{ left:'2%', top:'50%', transform:'translate(-50%,-50%) rotate(-22deg) scale(0.58)', filter:'blur(16px)', opacity:0.09 }}>
                <div style={{ width:'300px' }}><GlassesSVG accent={model.accent} modeId="bk-fl" frameStroke={fStroke} lensOpacity={0.6} /></div>
              </div>
              {/* Bokeh — near left */}
              <div className="absolute pointer-events-none select-none" style={{ left:'12%', top:'50%', transform:'translate(-50%,-50%) rotate(-11deg) scale(0.74)', filter:'blur(7px)', opacity:0.17 }}>
                <div style={{ width:'300px' }}><GlassesSVG accent={model.accent} modeId="bk-nl" frameStroke={fStroke} lensOpacity={0.7} /></div>
              </div>

              {/* Centre — animated */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y:[0,-10,0] }}
                  transition={{ duration:3.8, repeat:Infinity, ease:'easeInOut' }}
                  style={{ filter:`drop-shadow(0 18px 42px ${accent}45) drop-shadow(0 4px 14px rgba(0,0,0,0.55))`, width:'100%', maxWidth:'460px' }}
                >
                  <AnimatePresence custom={dir} mode="wait">
                    <motion.div key={model.id} custom={dir} variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ type:'spring', stiffness:300, damping:28 }}>
                      <GlassesSVG accent={accent} modeId={`sc-${model.id}`} frameStroke={fStroke} lensOpacity={lOp} hud={hud} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Bokeh — near right */}
              <div className="absolute pointer-events-none select-none" style={{ right:'12%', top:'50%', transform:'translate(50%,-50%) rotate(11deg) scale(0.74)', filter:'blur(7px)', opacity:0.17 }}>
                <div style={{ width:'300px' }}><GlassesSVG accent={model.accent} modeId="bk-nr" frameStroke={fStroke} lensOpacity={0.7} /></div>
              </div>
              {/* Bokeh — far right */}
              <div className="absolute pointer-events-none select-none" style={{ right:'2%', top:'50%', transform:'translate(50%,-50%) rotate(22deg) scale(0.58)', filter:'blur(16px)', opacity:0.09 }}>
                <div style={{ width:'300px' }}><GlassesSVG accent={model.accent} modeId="bk-fr" frameStroke={fStroke} lensOpacity={0.6} /></div>
              </div>

              {/* Nav arrows */}
              <button onClick={()=>go(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.1] text-white/40 hover:border-white/30 hover:text-white hover:bg-white/[0.04] transition-all duration-200 z-10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={()=>go(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.1] text-white/40 hover:border-white/30 hover:text-white hover:bg-white/[0.04] transition-all duration-200 z-10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Model info */}
            <AnimatePresence mode="wait">
              <motion.div key={model.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                transition={{ type:'spring', stiffness:340, damping:28 }}
                className="mt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-[8px] font-mono uppercase tracking-[0.5em]" style={{ color:accent }}>{model.tag}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/30">${model.price} / mo</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white mb-2">{model.name}</h3>
                <p className="text-sm text-white/35 max-w-sm mx-auto leading-relaxed">{lang==='ru'?model.descRu:model.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-6">
              {SHOWCASE_MODELS.map((_,i) => (
                <button key={i} onClick={()=>{ setDir(i>idx?1:-1); setIdx(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{ width:i===idx?24:6, height:6, background:i===idx?accent:'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>

          {/* ── CONFIG PANEL ── */}
          <div className="rounded-[1.75rem] border border-white/[0.1] p-6 flex flex-col gap-6"
            style={{ background:'rgba(255,255,255,0.028)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', boxShadow:'0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' }}>

            {/* Panel header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
              </div>
              <div>
                <p className="text-sm font-black text-white">{lang==='ru'?'Настроить':'Customize'}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">{lang==='ru'?'Параметры очков':'Lens parameters'}</p>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* HUD Interface */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/30 mb-3">{lang==='ru'?'HUD-интерфейс':'HUD Interface'}</p>
              <div className="flex flex-wrap gap-2">
                {(['minimal','sport','tech'] as const).map(opt => (
                  <ConfigTag key={opt} label={opt} active={hud===opt} onClick={()=>setHud(opt)} />
                ))}
              </div>
            </div>

            {/* Lens Tint */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/30 mb-3">{lang==='ru'?'Тонировка линз':'Lens Tint'}</p>
              <div className="flex flex-wrap gap-2">
                {['Clear','Dark','Photochromic'].map(opt => (
                  <ConfigTag key={opt} label={opt} active={tint===opt} onClick={()=>setTint(opt)} />
                ))}
              </div>
            </div>

            {/* Frame Color */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/30 mb-3">{lang==='ru'?'Цвет оправы':'Frame Color'}</p>
              <div className="flex flex-col gap-2">
                {Object.keys(FRAME_STROKES).map(opt => {
                  const swatch = opt==='Carbon'?'rgba(80,80,80,0.9)': opt==='Ghost White'?'rgba(220,220,220,0.9)':'#f97316';
                  return (
                    <button key={opt} onClick={()=>setFrame(opt)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 text-left"
                      style={{ borderColor: frame===opt?accent:'rgba(255,255,255,0.07)', background: frame===opt?`${accent}10`:'transparent' }}>
                      <span className="w-4 h-4 rounded-full shrink-0 border border-white/20" style={{ background:swatch }} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: frame===opt?accent:'rgba(255,255,255,0.45)' }}>{opt}</span>
                      {frame===opt && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background:accent }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <button className="w-full py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background:accent, color: frame==='Ghost White'?'#000':'#000' }}>
                {lang==='ru'?'Заказать модель':'Order This Model'}
              </button>
              <button className="w-full py-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] border border-white/[0.1] text-white/40 hover:border-white/25 hover:text-white/70 transition-all duration-200">
                {lang==='ru'?'Подробнее':'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function VisionConfigurator({ lang }: { lang: 'en' | 'ru' }) {
  const [active, setActive] = useState(0);
  const mode = MODES[active];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-4">
          {lang === 'ru' ? 'Интерактивный конфигуратор' : 'Interactive Configurator'}
        </p>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
          Vision Mode.
        </h2>
        <p className="mt-5 text-sm text-white/35 max-w-sm mx-auto leading-relaxed">
          {lang === 'ru' ? 'Выбери режим — линзы адаптируются мгновенно.' : 'Pick your mode — lenses adapt in real time.'}
        </p>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_220px] gap-8 items-center">

        {/* ── LEFT: Mode selector ─────────────────────────────── */}
        <div className="flex flex-row md:flex-col gap-2.5">
          {MODES.map((m, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={m.id}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.97 }}
                className="relative flex-1 md:flex-none text-left rounded-2xl border overflow-hidden cursor-pointer"
                style={{
                  padding: '14px 18px',
                  borderColor: isActive ? m.accent : 'rgba(255,255,255,0.07)',
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
                  boxShadow: isActive ? `0 0 24px ${m.accent}22, 0 4px 18px rgba(0,0,0,0.35)` : '0 2px 12px rgba(0,0,0,0.25)',
                  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="mode-bg"
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 130% 100% at 0% 60%, ${m.accent}14, transparent)` }}
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-3 relative">
                  <span style={{ color: isActive ? m.accent : 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}>
                    {m.icon}
                  </span>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.35em] text-white">{m.label}</span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="block text-[9px] mt-0.5 font-mono uppercase tracking-[0.25em]"
                        style={{ color: m.accent }}
                      >
                        {lang === 'ru' ? 'Активен' : 'Active'}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── CENTER: Glasses SVG ──────────────────────────────── */}
        <div className="relative flex flex-col items-center justify-center py-10 gap-8">
          {/* Mode badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id + '-badge'}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ borderColor: `${mode.accent}45`, color: mode.accent, background: `${mode.accent}10` }}
            >
              <span style={{ color: mode.accent }}>{mode.icon}</span>
              {mode.label} Mode
            </motion.div>
          </AnimatePresence>

          {/* Ambient glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
            style={{
              width: '380px', height: '180px',
              background: `radial-gradient(ellipse at center, ${mode.accent}28 0%, transparent 70%)`,
              filter: 'blur(24px)',
            }}
          />

          {/* Glasses levitate */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 18px 40px ${mode.accent}35) drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <GlassesSVG accent={mode.accent} modeId={mode.id} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Floating stat pill */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1]"
            style={{ background: 'rgba(12,12,12,0.75)' }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: mode.accent }}
            />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono">
              {lang === 'ru' ? mode.statRu : mode.stat}
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT: Lens card + description ──────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Lens preview card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative overflow-hidden rounded-[1.5rem] border"
              style={{
                height: '190px',
                borderColor: `${mode.accent}30`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 28px ${mode.accent}15`,
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              {/* Tinted lens preview — gradient background representing the lens color */}
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 110% 90% at 50% 40%, ${mode.accent}22 0%, ${mode.accent}08 50%, transparent 80%)` }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%)' }} />
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${mode.accent}, transparent)` }} />
              {/* Mini glasses SVG inside card */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <GlassesSVG accent={mode.accent} modeId={`card-${mode.id}`} />
              </div>
              {/* HUD line */}
              <div className="absolute inset-x-6 top-1/2 h-px" style={{ background: `linear-gradient(90deg, transparent, ${mode.accent}50, transparent)` }} />
              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.45em] font-mono mb-0.5" style={{ color: mode.accent }}>{lang === 'ru' ? 'Режим' : 'Lens Mode'}</p>
                  <p className="text-sm font-black italic uppercase tracking-tight text-white">{mode.label}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-mono border"
                  style={{ borderColor: `${mode.accent}45`, color: mode.accent, background: `${mode.accent}12` }}>
                  <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1 h-1 rounded-full" style={{ background: mode.accent }} />
                  {lang === 'ru' ? 'Активен' : 'Active'}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id + '-d'}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.07 }}
              className="rounded-2xl border border-white/[0.07] p-5"
              style={{ background: 'rgba(255,255,255,0.018)' }}
            >
              <p className="text-[10px] text-white/35 leading-relaxed mb-4">
                {lang === 'ru' ? mode.descRu : mode.desc}
              </p>
              <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${mode.accent}35, transparent)` }} />
              <div className="flex items-center gap-2">
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: mode.accent }} />
                <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 font-mono">
                  {lang === 'ru' ? mode.statRu : mode.stat}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── PRELOADER ────────────────────────────────────────────────────────────────

function Preloader({ visible }: { visible: boolean }) {
  const r    = 38;
  const circ = 2 * Math.PI * r; // ≈ 238.76

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(18px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-none"
          style={{ background: '#0c0c0c' }}
        >
          {/* Ambient orange glow behind ring */}
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{ width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }}
          />

          {/* Ring + center dot */}
          <div className="relative" style={{ width: 88, height: 88 }}>
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" style={{ display:'block' }}>
              {/* Track */}
              <circle cx="44" cy="44" r={r} stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none" />
              {/* Animated progress arc — rotated so it starts at 12 o'clock */}
              <motion.circle
                cx="44" cy="44" r={r}
                fill="none"
                stroke="rgba(255,255,255,0.80)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.75, ease: [0.35, 0, 0.25, 1] }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px' }}
              />
              {/* Subtle orange accent arc (thin, shorter, offset slightly) */}
              <motion.circle
                cx="44" cy="44" r={r - 5}
                fill="none"
                stroke="#f97316"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: circ * 0.72 }}
                transition={{ duration: 1.75, ease: [0.35, 0, 0.25, 1], delay: 0.1 }}
                strokeOpacity="0.55"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px' }}
              />
            </svg>

            {/* Centre — pulsing orange dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 12px 4px rgba(249,115,22,0.6)' }}
              />
            </div>
          </div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="mt-9 text-center"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.7em] text-white mb-2">Vision Run</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-[8px] uppercase tracking-[0.5em] text-white/25"
            >
              AR Running
            </motion.p>
          </motion.div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-10 inset-x-0 flex justify-center">
            <div className="w-32 h-px bg-white/[0.06] overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-white/40 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.75, ease: [0.35, 0, 0.25, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ru'>('ru');
  const l = t[lang];
  const [openNav, setOpenNav] = useState<string | null>(null);

  // Sync <html lang="…"> with language toggle
  useEffect(() => {
    document.getElementById('html-root')?.setAttribute('lang', lang);
  }, [lang]);

  // ── Preloader ─────────────────────────────────────────────────────────────
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const minDelay  = new Promise<void>(res => setTimeout(res, 2400));
    const pageReady = new Promise<void>(res => {
      if (document.readyState === 'complete') { res(); return; }
      window.addEventListener('load', () => res(), { once: true });
    });
    Promise.all([minDelay, pageReady]).then(() => setIsLoaded(true));
  }, []);

  // ── HUD live values ──────────────────────────────────────────────────────
  const bpm    = useCountUp(168);
  const speed  = useCountUp(18.5);
  const energy = useCountUp(74);
  // destructure for convenience
  const { count: bpmVal, ref: bpmRef }       = bpm;
  const { count: speedVal, ref: speedRef }   = speed;
  const { count: energyVal, ref: energyRef } = energy;

  const [bpmHovering,     setBpmHovering]     = useState(false);
  const [speedHovering,   setSpeedHovering]   = useState(false);
  const [batteryHovering, setBatteryHovering] = useState(false);
  const [bpmLive,     setBpmLive]     = useState(168);
  const [speedLive,   setSpeedLive]   = useState(18.5);
  const [batteryLive, setBatteryLive] = useState(74);
  const [speedBars, setSpeedBars] = useState([0.45, 0.72, 0.55, 0.88, 0.63, 0.78, 0.70, 0.60]);
  const [pricingYearly, setPricingYearly] = useState(false);
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [chatOpen,  setChatOpen]  = useState(false);
  const [chatTab,   setChatTab]   = useState<'home' | 'chat'>('home');
  const [chatHover, setChatHover] = useState(false);
  const [chatMsg,   setChatMsg]   = useState('');

  type PlanType = typeof t.en.pricing.plans[number];
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [modalYearly, setModalYearly] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState<'plan' | 'checkout'>('plan');

  const openModal = (plan: PlanType) => {
    setSelectedPlan(plan);
    setModalYearly(pricingYearly);
    setModalStep('plan');
    requestAnimationFrame(() => setModalVisible(true));
    // Lock scroll without layout shift: compensate scrollbar width
    const sbWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${sbWidth}px`;
  };
  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedPlan(null);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }, 320);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!bpmHovering) { setBpmLive(168); return; }
    const id = setInterval(() => setBpmLive(v => Math.round(Math.max(155, Math.min(183, v + (Math.random() - 0.5) * 9)))), 170);
    return () => clearInterval(id);
  }, [bpmHovering]);

  useEffect(() => {
    if (!speedHovering) { setSpeedLive(18.5); setSpeedBars([0.45, 0.72, 0.55, 0.88, 0.63, 0.78, 0.70, 0.60]); return; }
    const id = setInterval(() => {
      setSpeedLive(v => +Math.max(16.2, Math.min(21.8, v + (Math.random() - 0.5) * 1.3)).toFixed(1));
      setSpeedBars(bars => bars.map(b => +Math.max(0.18, Math.min(1, b + (Math.random() - 0.5) * 0.45)).toFixed(2)));
    }, 150);
    return () => clearInterval(id);
  }, [speedHovering]);

  useEffect(() => {
    if (!batteryHovering) { setBatteryLive(74); return; }
    const id = setInterval(() => setBatteryLive(v => Math.round(Math.max(65, Math.min(89, v + (Math.random() - 0.35) * 3)))), 240);
    return () => clearInterval(id);
  }, [batteryHovering]);

  // ── GSAP ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    let stRef: { getAll(): { kill(): void }[] } | undefined;
    let cfProxy: HTMLElement | null = null;
    let cfDraggable: { kill(): void }[] = [];

    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { Draggable } = await import('gsap/Draggable');
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger, Draggable);
      stRef = ScrollTrigger;

      // Scroll progress bar
      gsap.to('#scroll-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0 },
      });

      // ── Hero — pinned panels ─────────────────────────────────────────────
      const heroWrapper = document.querySelector('#hero-wrapper') as HTMLElement;
      const heroSection = document.querySelector('#hero-section') as HTMLElement;
      const heroPanels  = gsap.utils.toArray<HTMLElement>('.hero-panel');

      if (heroWrapper && heroSection && heroPanels.length > 0) {
        gsap.set(heroPanels, { autoAlpha: 0, y: 52 });
        gsap.set(heroPanels[0], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapper,
            pin: heroSection,
            start: 'top top',
            end: `+=${(heroPanels.length - 1) * 800}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        heroPanels.forEach((panel, i) => {
          const next = heroPanels[i + 1];
          if (!next) return;
          const at = i * 2;
          tl
            .to(panel,
              { autoAlpha: 0, y: -52, scale: 0.95, ease: 'power1.in', duration: 1 },
              at,
            )
            .fromTo(next,
              { autoAlpha: 0, y: 56, scale: 0.97 },
              { autoAlpha: 1, y: 0, scale: 1, ease: 'power2.out', duration: 1.2 },
              at + 0.55,
            );
        });
      }

      // ── How it works ─────────────────────────────────────────────────────
      gsap.fromTo('#how-title',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'power1.inOut',
          scrollTrigger: { trigger: '#how-it-works', start: 'top 70%', end: 'top 20%', scrub: 1 } },
      );
      gsap.fromTo('#how-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out',
          scrollTrigger: { trigger: '#how-it-works', start: 'top 60%', end: 'top 30%', scrub: 0.8 } },
      );
      gsap.utils.toArray<Element>('.how-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, x: i % 2 === 0 ? -20 : 20 },
          { opacity: 1, y: 0, x: 0, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 52%', scrub: 0.7 } },
        );
      });

      // ── Cover Flow (Gear Up) ─────────────────────────────────────────────
      const cfSection = document.querySelector('#modules-section') as HTMLElement;
      const cfCards   = gsap.utils.toArray<HTMLElement>('.cf-card');
      const cfDots    = gsap.utils.toArray<HTMLElement>('.cf-dot');
      const cfInfos   = gsap.utils.toArray<HTMLElement>('.cf-info');
      if (!cfSection || cfCards.length === 0) return;

      const cfDims = gsap.utils.toArray<HTMLElement>('.cf-dim');
      const N  = cfCards.length;
      const cf = { val: 0 };
      // iTunes Cover Flow spacing: wider gap to centre card, tighter side stacking
      const GAP_C = () => window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 210 : 260;
      const GAP_S = () => window.innerWidth < 640 ? 115 : window.innerWidth < 1024 ? 145 : 175;

      const qX   = cfCards.map(c => gsap.quickSetter(c, 'x',       'px'));
      const qRY  = cfCards.map(c => gsap.quickSetter(c, 'rotateY', 'deg'));
      const qScl = cfCards.map(c => gsap.quickSetter(c, 'scale'));
      const qAlp = cfCards.map(c => gsap.quickSetter(c, 'autoAlpha'));
      const qDim = cfDims.map(d  => gsap.quickSetter(d, 'opacity'));
      let lastSnapped = 0;

      const updateCF = (val: number) => {
        const snapped = Math.round(Math.max(0, Math.min(N - 1, val)));
        const gc = GAP_C();
        const gs = GAP_S();
        cfCards.forEach((_c, i) => {
          const off  = i - val;
          const aOff = Math.abs(off);
          const sign = off >= 0 ? 1 : -1;

          // iTunes-style x: generous gap to first side, then tighter stacking
          const x = aOff <= 1
            ? off * gc
            : sign * (gc + (aOff - 1) * gs);

          // iTunes rotation: snap to ±75° for all non-centre cards
          const rotY = Math.max(-75, Math.min(75, -off * 75));

          // Scale: centre card full, first side noticeably smaller, rest capped
          const scl = Math.max(0.60, 1 - Math.min(aOff, 1) * 0.22);

          qX[i](x);
          qRY[i](rotY);
          qScl[i](scl);
          qAlp[i](aOff > 3.2 ? 0 : 1);
          if (qDim[i]) qDim[i](Math.min(0.68, aOff * 0.30));
        });
        if (snapped !== lastSnapped) {
          lastSnapped = snapped;
          cfDots.forEach((d, i) => {
            d.style.width   = i === snapped ? '28px' : '8px';
            d.style.opacity = i === snapped ? '0.8'  : '0.22';
          });
          cfInfos.forEach((el, i) => {
            el.style.opacity   = i === snapped ? '1'              : '0';
            el.style.transform = i === snapped ? 'translateY(0px)' : 'translateY(10px)';
          });
        }
      };

      gsap.set('.cf-card', { xPercent: -50, transformPerspective: 950, willChange: 'transform, opacity' });
      updateCF(0);

      gsap.to(cf, {
        val: N - 1, ease: 'none',
        scrollTrigger: {
          trigger: cfSection, pin: true, anticipatePin: 1,
          start: 'top top', end: `+=${N * 500}`,
          scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: () => updateCF(cf.val),
        },
      });

      cfProxy = document.createElement('div');
      document.body.appendChild(cfProxy);
      cfDraggable = Draggable.create(cfProxy, {
        type: 'x', trigger: '#cf-stage', cursor: 'grab', activeCursor: 'grabbing',
        onDrag: function(this: { deltaX: number }) {
          cf.val = Math.max(0, Math.min(N - 1, cf.val - this.deltaX / GAP_C()));
          updateCF(cf.val);
        },
        onDragEnd: function() {
          const snap = Math.round(cf.val);
          gsap.to(cf, { val: snap, duration: 0.5, ease: 'power2.out', onUpdate: () => updateCF(cf.val) });
        },
      }) as unknown as { kill(): void }[];

      cfCards.forEach((card, i) => {
        card.addEventListener('click', () => {
          gsap.to(cf, { val: i, duration: 0.65, ease: 'power2.inOut', onUpdate: () => updateCF(cf.val) });
        });
      });

      // ── Included ─────────────────────────────────────────────────────────
      gsap.utils.toArray<Element>('.included-card').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 55%', scrub: 0.6 } },
        );
      });

      // ── Pricing ───────────────────────────────────────────────────────────
      gsap.fromTo('#pricing-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out',
          scrollTrigger: { trigger: '#pricing-section', start: 'top 75%', end: 'top 40%', scrub: 0.7 } },
      );
      gsap.utils.toArray<Element>('.pricing-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 70, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#pricing-section', start: `top ${72 - i * 4}%`, end: `top ${38 - i * 4}%`, scrub: 0.65 } },
        );
      });

      // ── Testimonials ──────────────────────────────────────────────────────
      gsap.fromTo('#reviews-header', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: '#testimonials', start: 'top 80%', end: 'top 50%', scrub: 0.6 } });

      // ── CTA banner ────────────────────────────────────────────────────────
      gsap.fromTo('#cta-banner',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, ease: 'power3.out',
          scrollTrigger: { trigger: '#cta-banner', start: 'top 85%', end: 'top 50%', scrub: 0.7 } },
      );
      gsap.fromTo('#cta-img',
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '#cta-banner', start: 'top 80%', end: 'top 40%', scrub: 0.9 } },
      );

      // ── Social ────────────────────────────────────────────────────────────
      gsap.utils.toArray<Element>('.social-card').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 55, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 55%', scrub: 0.65 } });
      });

      // ── FAQ ───────────────────────────────────────────────────────────────
      gsap.fromTo('#faq-banner', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: '#faq-section', start: 'top 80%', end: 'top 48%', scrub: 0.65 } });
      gsap.utils.toArray<Element>('.faq-row').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -30 }, { opacity: 1, x: 0, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 62%', scrub: 0.6 } });
      });

      // ── Footer ────────────────────────────────────────────────────────────
      gsap.fromTo('footer', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: 'footer', start: 'top 90%', end: 'top 60%', scrub: 0.6 } });
    };

    loadGSAP();
    return () => {
      mounted = false;
      if (stRef) stRef.getAll().forEach(trigger => trigger.kill());
      cfDraggable.forEach(d => d.kill());
      if (cfProxy) { cfProxy.remove(); cfProxy = null; }
    };
  }, []);

  const batteryLevel = `${Math.max(12, Math.min(batteryHovering ? batteryLive : energyVal, 100))}%`;

  return (
    <main className="text-white" style={{ background: 'transparent' }}>
      <Preloader visible={!isLoaded} />

      <style jsx global>{`
        @keyframes heartbeat  { 0%, 100% { transform: scale(1); }    50% { transform: scale(1.08); } }
        @keyframes pulseLine  { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes flowLine   { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes ekgScroll  { from { transform: translateX(0%); }  to   { transform: translateX(-50%); } }
        @keyframes blink      { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes chatBounce { 0%,100%{transform:scale(1)} 30%{transform:scale(1.18)} 60%{transform:scale(0.93)} }
        .chat-btn-idle { animation: chatBounce 3.6s ease-in-out infinite; }
        .chat-btn-idle:hover { animation: none; }
        @keyframes marquee         { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-track         { animation: marquee 38s linear infinite; }
        .marquee-track-reverse { animation: marquee-reverse 42s linear infinite; }
        .marquee-row:hover .marquee-track,
        .marquee-row:hover .marquee-track-reverse { animation-play-state: paused; }
        @keyframes blob-drift-1 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          30%     { transform: translate(60px,-80px) scale(1.08); }
          60%     { transform: translate(-40px,50px) scale(0.94); }
        }
        @keyframes blob-drift-2 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          25%     { transform: translate(-70px,60px) scale(1.06); }
          65%     { transform: translate(50px,-40px) scale(1.1); }
        }
        @keyframes blob-drift-3 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          40%     { transform: translate(30px,70px) scale(1.05); }
          75%     { transform: translate(-55px,-30px) scale(0.96); }
        }
        @keyframes grain-shift {
          0%,100% { transform: translate(0,0); }
          20%     { transform: translate(-2%,-3%); }
          40%     { transform: translate(3%,2%); }
          60%     { transform: translate(-1%,4%); }
          80%     { transform: translate(2%,-2%); }
        }
        .bg-blob { will-change: transform; }
        html { scroll-behavior: smooth; background: #0c0c0c; overflow-x: hidden; }
        body { background: #0c0c0c; margin: 0; padding: 0; overflow-x: hidden; overflow-y: scroll; scrollbar-width: none; -ms-overflow-style: none; }
        body::-webkit-scrollbar { display: none; }
        main { background: transparent !important; }
        .pin-spacer { background: transparent !important; }
        .hero-panel { will-change: transform, opacity; }
      `}</style>

      {/* ── ANIMATED BACKGROUND ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="bg-blob absolute rounded-full" style={{ width:'900px',height:'900px',top:'-320px',right:'-280px',background:'radial-gradient(circle at center,rgba(249,115,22,0.055) 0%,rgba(249,115,22,0.018) 45%,transparent 72%)',animation:'blob-drift-1 28s ease-in-out infinite',filter:'blur(1px)' }} />
        <div className="bg-blob absolute rounded-full" style={{ width:'700px',height:'700px',bottom:'-250px',left:'-180px',background:'radial-gradient(circle at center,rgba(249,115,22,0.04) 0%,rgba(180,80,10,0.015) 50%,transparent 72%)',animation:'blob-drift-2 36s ease-in-out infinite',filter:'blur(1px)' }} />
        <div className="bg-blob absolute rounded-full" style={{ width:'480px',height:'480px',top:'42%',right:'8%',background:'radial-gradient(circle at center,rgba(249,115,22,0.032) 0%,transparent 68%)',animation:'blob-drift-3 22s ease-in-out infinite' }} />
        <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.055) 1px,transparent 1px)',backgroundSize:'40px 40px',maskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%)',WebkitMaskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%)' }} />
        <div style={{ position:'absolute',inset:'-50%',width:'200%',height:'200%',opacity:0.028,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,backgroundRepeat:'repeat',backgroundSize:'180px 180px',animation:'grain-shift 0.9s steps(1) infinite' }} />
      </div>

      {/* Scroll progress */}
      <div id="scroll-progress" className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-orange-500" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      {(() => {
        const navItems = [
          {
            href: '#how-it-works', label: l.nav.how,
            links: lang === 'ru'
              ? [['AR-очки', '#how-it-works'], ['Vision App', '#ways-section'], ['Coach Hub', '#ways-section'], ['Технология HUD', '#how-it-works']]
              : [['AR Glasses', '#how-it-works'], ['Vision App', '#ways-section'], ['Coach Hub', '#ways-section'], ['HUD Technology', '#how-it-works']],
          },
          {
            href: '#modules-section', label: l.nav.modules,
            links: lang === 'ru'
              ? [['Vision Lens Pro', '#modules-section'], ['Pace Ghost', '#modules-section'], ['HUD Night', '#modules-section'], ['Цены', '#pricing-section']]
              : [['Vision Lens Pro', '#modules-section'], ['Pace Ghost', '#modules-section'], ['HUD Night', '#modules-section'], ['Pricing', '#pricing-section']],
          },
          {
            href: '#testimonials', label: l.nav.reviews,
            links: lang === 'ru'
              ? [['Отзывы', '#testimonials'], ['FAQ', '#faq-section'], ['О нас', '#connect-section'], ['Контакты', 'mailto:hello@visionrun.com']]
              : [['Reviews', '#testimonials'], ['FAQ', '#faq-section'], ['About', '#connect-section'], ['Contact', 'mailto:hello@visionrun.com']],
          },
        ];
        return (
          <header className="fixed inset-x-0 top-0 z-40">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
              <a href="/" onClick={() => window.location.reload()} className="text-[11px] uppercase tracking-[0.5em] text-white font-black cursor-pointer select-none">Vision Run</a>

              {/* Desktop nav */}
              <nav className="hidden gap-8 md:flex items-center">
                {navItems.map(item => (
                  <div key={item.href} className="relative"
                    onMouseEnter={() => setOpenNav(item.href)}
                    onMouseLeave={() => setOpenNav(null)}>
                    {/* Nav trigger */}
                    <a href={item.href}
                      className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-200"
                      style={{ color: openNav === item.href ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)' }}>
                      {item.label}
                      <motion.svg
                        width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.8"
                        animate={{ rotate: openNav === item.href ? 180 : 0 }}
                        transition={{ duration: 0.2 }}>
                        <path d="M1 2l3 3 3-3"/>
                      </motion.svg>
                    </a>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openNav === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl border border-white/[0.09] overflow-hidden"
                          style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                          {/* Accent top line */}
                          <div className="h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
                          {/* Header */}
                          <div className="px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-[8px] uppercase tracking-[0.55em] text-white/25 font-black">{item.label}</p>
                          </div>
                          {/* Links */}
                          {item.links.map(([label, href], i) => (
                            <motion.a key={label} href={href}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 26 }}
                              className="group flex items-center justify-between px-4 py-3 border-b border-white/[0.04] last:border-0 transition-colors duration-150 hover:bg-white/[0.04]">
                              <span className="text-[11px] text-white/55 group-hover:text-white transition-colors duration-150">{label}</span>
                              <svg className="opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-4">
                <button onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                  className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                  {lang === 'en' ? 'RU' : 'EN'}
                </button>
                <motion.a href="#modules-section"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.18] text-[9px] font-black uppercase tracking-[0.4em] text-white/65 transition-colors duration-250 hover:border-white/50 hover:text-white">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.06] transition-opacity duration-250" />
                  {l.nav.cta}
                  <svg className="-translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.a>
              </div>
            </div>
          </header>
        );
      })()}

      {/* ── HERO WRAPPER — scroll distance for pinned panels ────────────────── */}
      <div id="hero-wrapper" style={{ height: 'calc(100vh + 1600px)' }}>
        <section id="hero-section" className="sticky top-0 h-screen w-full overflow-hidden bg-[#0c0c0c]">

          {/* Mirror of global background inside hero (overflow-hidden clips fixed elements) */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <div className="bg-blob absolute rounded-full" style={{ width:'900px',height:'900px',top:'-320px',right:'-280px',background:'radial-gradient(circle at center,rgba(249,115,22,0.055) 0%,rgba(249,115,22,0.018) 45%,transparent 72%)',animation:'blob-drift-1 28s ease-in-out infinite',filter:'blur(1px)' }} />
            <div className="bg-blob absolute rounded-full" style={{ width:'700px',height:'700px',bottom:'-250px',left:'-180px',background:'radial-gradient(circle at center,rgba(249,115,22,0.04) 0%,rgba(180,80,10,0.015) 50%,transparent 72%)',animation:'blob-drift-2 36s ease-in-out infinite',filter:'blur(1px)' }} />
            <div className="bg-blob absolute rounded-full" style={{ width:'480px',height:'480px',top:'42%',right:'8%',background:'radial-gradient(circle at center,rgba(249,115,22,0.032) 0%,transparent 68%)',animation:'blob-drift-3 22s ease-in-out infinite' }} />
            <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.055) 1px,transparent 1px)',backgroundSize:'40px 40px',maskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%)',WebkitMaskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%)' }} />
            <div style={{ position:'absolute',inset:'-50%',width:'200%',height:'200%',opacity:0.028,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,backgroundRepeat:'repeat',backgroundSize:'180px 180px',animation:'grain-shift 0.9s steps(1) infinite' }} />
          </div>

          {/* Vignette for depth */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_120%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

          {/* ── PANEL 1: Brand intro ──────────────────────────────────────── */}
          <div className="hero-panel absolute inset-0 flex">

            {/* Left content */}
            <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 xl:px-24 pt-20 w-full md:w-[58%]">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" style={{ animation: 'blink 1.4s ease-in-out infinite' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.55em] text-orange-500">{l.hero.tag}</span>
              </div>

              {/* Giant headline */}
              <h1 className="font-black italic uppercase leading-[0.86] tracking-tighter text-white mb-8" style={{ fontSize: 'clamp(4rem, 10.5vw, 10.5rem)' }}>
                RUN<br />
                <span className="text-orange-500">BEYOND</span><br />
                REALITY.
              </h1>

              <p className="max-w-md text-sm md:text-[15px] text-white/40 leading-relaxed mb-12">
                {l.hero.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Primary CTA */}
                <motion.a href="#modules-section"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden flex items-center gap-3 px-9 py-4 rounded-full font-black uppercase text-[11px] tracking-[0.35em]"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: '#000', boxShadow: '0 0 0 0 rgba(249,115,22,0)' }}
                  onHoverStart={e => (e.target as HTMLElement).style.boxShadow = '0 8px 32px rgba(249,115,22,0.45)'}
                  onHoverEnd={e => (e.target as HTMLElement).style.boxShadow = '0 0 0 0 rgba(249,115,22,0)'}>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300 rounded-full" />
                  {l.nav.cta}
                  <motion.svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </motion.svg>
                </motion.a>

                {/* Secondary */}
                <motion.a href="#how-it-works"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center gap-3 px-9 py-4 rounded-full border border-white/[0.18] font-black uppercase text-[11px] tracking-[0.35em] text-white/55 overflow-hidden transition-colors duration-250 hover:border-white/40 hover:text-white/90">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.04] transition-opacity duration-250 rounded-full" />
                  {l.nav.how}
                  <svg className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.a>
              </div>

              {/* Tech specs strip */}
              <div className="mt-14 flex items-center gap-5">
                <div className="h-px w-10 bg-white/15" />
                <span className="text-[9px] uppercase tracking-[0.45em] text-white/20">&lt;12ms · 6 sensors · 8h battery</span>
              </div>
            </div>

            {/* Right — atmospheric glow */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none overflow-hidden">
              <div className="absolute rounded-full" style={{ width:'520px',height:'520px',top:'50%',left:'50%',transform:'translate(-30%,-50%)',background:'radial-gradient(circle at center,rgba(249,115,22,0.13) 0%,rgba(249,115,22,0.05) 40%,transparent 70%)',borderRadius:'50%' }} />
              <div className="absolute rounded-full" style={{ width:'280px',height:'280px',top:'18%',right:'12%',background:'radial-gradient(circle at center,rgba(249,115,22,0.07) 0%,transparent 70%)',borderRadius:'50%' }} />
              <div className="absolute" style={{ width:'340px',height:'200px',bottom:0,right:0,background:'radial-gradient(ellipse at bottom right,rgba(249,115,22,0.06) 0%,transparent 70%)' }} />
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0c0c0c] to-transparent" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0c0c0c] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent" />
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 600" fill="none" preserveAspectRatio="xMidYMid slice">
                <line x1="0" y1="150" x2="400" y2="0" stroke="white" strokeWidth="0.5"/><line x1="0" y1="320" x2="400" y2="180" stroke="white" strokeWidth="0.5"/><line x1="0" y1="490" x2="400" y2="350" stroke="white" strokeWidth="0.5"/>
              </svg>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-8 md:left-16 xl:left-24 flex items-center gap-4 z-10">
              <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="text-[9px] uppercase tracking-[0.45em] text-white/20">Scroll</span>
            </div>

            {/* Panel index */}
            <div className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.4em] text-white/15 z-10">01 / 03</div>
          </div>

          {/* ── PANEL 2: HUD Interface ────────────────────────────────────── */}
          <div className="hero-panel absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 pt-20 pb-8">

            {/* Eyebrow */}
            <div className="flex items-center gap-5 mb-8">
              <div className="h-px w-10 bg-orange-500/40" />
              <span className="text-[9px] font-black uppercase tracking-[0.55em] text-orange-500/70">02 / Live HUD Interface</span>
              <div className="h-px w-10 bg-orange-500/40" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-white text-center mb-10 leading-none">
              Every metric.<br />Every moment.
            </h2>

            {/* HUD cards */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* BPM */}
              <div
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/50 p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-red-400/40 hover:bg-red-950/20 cursor-default"
                onMouseEnter={() => setBpmHovering(true)}
                onMouseLeave={() => setBpmHovering(false)}
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-red-500/60 via-transparent to-red-500/60 animate-[pulseLine_2.4s_linear_infinite]" />
                <p className="text-[9px] font-black text-red-300/70 uppercase tracking-widest mb-3">{l.hud.bpm}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black italic tracking-tighter text-red-400 tabular-nums" style={{ animation: bpmHovering ? 'none' : 'heartbeat 1.2s ease-in-out infinite' }}>
                    <span ref={bpmRef}>{bpmHovering ? bpmLive : bpmVal.toFixed(0)}</span>
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full bg-red-500 animate-ping`} style={{ animationDuration: bpmHovering ? '0.4s' : '1s' }} />
                </div>
                <div className="mt-3 h-7 overflow-hidden opacity-20 group-hover:opacity-50 transition-opacity">
                  <svg viewBox="0 0 220 36" className="w-full h-full animate-[ekgScroll_1.6s_linear_infinite]" preserveAspectRatio="none">
                    <path d="M0,18 L28,18 L36,6 L44,30 L50,18 L68,18 L74,12 L80,24 L86,18 L110,18 L118,6 L126,30 L132,18 L150,18 L156,12 L162,24 L168,18 L196,18 L204,6 L212,30 L218,18 L220,18" stroke="#f87171" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[8px] font-mono text-white/25 mt-2 uppercase tracking-[0.3em] leading-relaxed">{l.hud.bpmAnnot}</p>
              </div>

              {/* Speed */}
              <div
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/50 p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-orange-950/15 cursor-default"
                onMouseEnter={() => setSpeedHovering(true)}
                onMouseLeave={() => setSpeedHovering(false)}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-400/60 via-transparent to-orange-400/60 animate-[flowLine_3s_linear_infinite]" />
                <p className="text-[9px] font-black text-orange-300/70 uppercase tracking-widest mb-3">{l.hud.kmh}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black italic tracking-tighter text-orange-300 tabular-nums">
                    <span ref={speedRef}>{speedHovering ? speedLive.toFixed(1) : speedVal.toFixed(1)}</span>
                  </span>
                  <span className="text-[10px] text-orange-200/60 uppercase tracking-[0.3em]">{l.hud.kmh}</span>
                </div>
                <div className="mt-4 flex items-end gap-[3px] h-9">
                  {speedBars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-orange-400/40 group-hover:bg-orange-400/70 transition-all" style={{ height: `${h * 100}%`, transitionDuration: speedHovering ? '120ms' : '400ms' }} />
                  ))}
                </div>
                <p className="text-[8px] font-mono text-white/25 mt-3 uppercase tracking-[0.3em] leading-relaxed">{l.hud.kmhAnnot}</p>
              </div>

              {/* Battery */}
              <div
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/50 p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-emerald-950/15 cursor-default"
                onMouseEnter={() => setBatteryHovering(true)}
                onMouseLeave={() => setBatteryHovering(false)}
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-emerald-400/60 via-transparent to-emerald-400/60 animate-[flowLine_3.4s_linear_infinite]" />
                <p className="text-[9px] font-black text-emerald-300/70 uppercase tracking-widest mb-3">{l.hud.charge}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black italic tracking-tighter text-white tabular-nums">
                    <span ref={energyRef}>{batteryHovering ? batteryLive : energyVal.toFixed(0)}%</span>
                  </span>
                </div>
                <div className="mt-4 relative h-3 rounded-full border border-emerald-400/30 bg-white/[0.04] overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/60 transition-all" style={{ width: batteryLevel, transitionDuration: batteryHovering ? '200ms' : '1000ms' }} />
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.3em]">0%</span>
                  <span className="text-[8px] font-mono text-emerald-400/40 uppercase tracking-[0.3em]">{batteryLevel}</span>
                  <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.3em]">100%</span>
                </div>
                <p className="text-[8px] font-mono text-white/25 mt-2 uppercase tracking-[0.3em] leading-relaxed">{l.hud.chargeAnnot}</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.4em] text-white/15">02 / 03</div>
          </div>

          {/* ── PANEL 3: Stats + CTA ─────────────────────────────────────── */}
          <div className="hero-panel absolute inset-0 flex flex-col items-center justify-center px-6 pt-20">

            <div className="flex items-center gap-5 mb-14">
              <div className="h-px w-10 bg-orange-500/40" />
              <span className="text-[9px] font-black uppercase tracking-[0.55em] text-orange-500/70">03 / The Edge</span>
              <div className="h-px w-10 bg-orange-500/40" />
            </div>

            {/* Big stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-20 mb-14 max-w-3xl w-full text-center">
              {[
                { val: '<12', unit: 'ms', label: l.stats.ms },
                { val: '6',   unit: '',   label: l.stats.sensors },
                { val: '8',   unit: 'h',  label: l.stats.battery },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-center gap-1 leading-none mb-3">
                    <span className="font-black italic tracking-tighter text-white" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>{s.val}</span>
                    {s.unit && <span className="text-orange-500 font-black italic" style={{ fontSize: 'clamp(1.2rem, 3vw, 2.8rem)' }}>{s.unit}</span>}
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.45em] text-white/30">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-white/10 mb-14" />

            <motion.a href="#modules-section"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex items-center gap-3 px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.4em]"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: '#000' }}>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300 rounded-full" />
              {l.nav.cta}
              <svg className="group-hover:translate-x-1 transition-transform duration-200" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>

            <div className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.4em] text-white/15">03 / 03</div>
          </div>

        </section>
      </div>

      {/* ── VISION SHOWCASE ───────────────────────────────────────────────────── */}
      <VisionShowcase lang={lang} />

      {/* ── VISION CONFIGURATOR ───────────────────────────────────────────────── */}
      <VisionConfigurator lang={lang} />

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="mb-16 max-w-3xl">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.how.tag}</p>
          <h2 id="how-title" className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none text-white">{l.how.title}</h2>
          <p id="how-sub" className="text-[15px] text-white/40 leading-relaxed max-w-xl">{l.how.sub}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {l.how.features.map((item, i) => (
            <div key={i} className="how-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 hover:border-orange-500/25 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
              <div className="w-8 h-[2px] bg-orange-500 mb-8 group-hover:w-14 transition-all duration-300" />
              <p className="text-[10px] uppercase tracking-[0.45em] text-orange-400/70 mb-4">{item.title}</p>
              <p className="text-sm text-white/45 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GEAR UP / COVER FLOW ─────────────────────────────────────────────── */}
      <section id="modules-section" className="relative w-full overflow-hidden pt-16 md:pt-24">

        <div className="flex items-center gap-4 md:gap-6 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white shrink-0">
            {l.modules.title}
          </h2>
          <div className="h-[2px] flex-1 bg-white/[0.06]" />
          <span className="hidden md:block text-[9px] uppercase tracking-[0.4em] text-white/20">← drag or scroll →</span>
        </div>

        <div id="cf-stage" className="relative w-full select-none" style={{ height: '400px', perspective: '1200px' }}>
          {l.modules.items.map((mod, i) => (
            <div
              key={mod.id}
              className="cf-card group absolute left-1/2 cursor-pointer"
              style={{ top: '60px' }}
            >
              {/* Card face */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_12px_50px_rgba(0,0,0,0.65)] transition-[border-color,box-shadow] duration-300 group-hover:border-orange-500/55 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.22),0_12px_50px_rgba(0,0,0,0.65)]"
                style={{ width: '210px', height: '280px' }}
              >
                {/* Dim overlay — GSAP sets opacity */}
                <div className="cf-dim absolute inset-0 z-10 bg-black rounded-2xl pointer-events-none" style={{ opacity: 0 }} />

                <img
                  src={COVER_IMAGES[i % COVER_IMAGES.length]}
                  alt={mod.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/10 to-transparent" />

                {/* Hover inner glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-orange-500/[0.08] to-transparent" />

                {/* Top accent line — orange on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/70 transition-all duration-300 z-30" />

                {/* Card info */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-20">
                  <p className="font-mono text-[9px] text-orange-400/50 uppercase tracking-[0.4em] mb-1">{mod.id}</p>
                  <h3 className="text-[15px] font-black italic uppercase leading-tight text-white group-hover:text-white transition-colors">{mod.title}</h3>
                  <p className="text-[11px] text-white/30 font-mono mt-0.5">${mod.price} / mo</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-1" style={{ height: '110px' }}>
          {l.modules.items.map((mod, i) => (
            <div key={mod.id} className="cf-info absolute inset-x-0 top-0 flex flex-col items-center text-center px-6"
              style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'translateY(0px)' : 'translateY(10px)', transition: 'opacity 0.3s ease, transform 0.3s ease', pointerEvents: i === 0 ? 'auto' : 'none' }}>
              <p className="text-[11px] text-white/35 uppercase tracking-[0.3em] max-w-xs leading-relaxed mb-4">{mod.desc}</p>
              <button className="px-8 py-3 bg-orange-500 text-black font-black uppercase italic text-[11px] tracking-widest hover:bg-white transition-colors duration-200 active:scale-95 rounded-sm">
                {l.modules.btn}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 py-6">
          {l.modules.items.map((_, i) => (
            <div key={i} className="cf-dot rounded-full bg-white/20 transition-all duration-300" style={{ height: '2px', width: i === 0 ? '28px' : '8px', opacity: i === 0 ? 0.8 : 0.22 }} />
          ))}
        </div>
      </section>

      {/* ── WAYS TO TRAIN ─────────────────────────────────────────────────────── */}
      <section id="ways-section" className="max-w-7xl mx-auto px-6 pb-24 pt-4">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-4">{l.ways.tag}</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">{l.ways.title}</h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {l.ways.items.map((item, i) => (
            <div
              key={i}
              className="included-card group relative flex flex-col rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:border-orange-500/25 hover:bg-white/[0.04] overflow-hidden cursor-default"
            >
              {/* Orange corner glow on hover */}
              <div className="absolute inset-0 pointer-events-none rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(249,115,22,0.07),transparent)]" />

              {/* Icon */}
              <div className="mb-10 w-12 h-12 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.08] transition-all duration-300">
                {item.icon === 'app' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                )}
                {item.icon === 'glasses' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300">
                    <path d="M2 12h2m16 0h2M4 12a4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0 4 4 4 4 0 0 0 4-4" />
                    <path d="M8 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4" />
                  </svg>
                )}
                {item.icon === 'coach' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    <path d="M17 11l2 2 4-4" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Bottom divider */}
              <div className="mt-8 mb-6 h-px bg-white/[0.05] group-hover:bg-orange-500/15 transition-colors duration-300" />

              {/* Dual button row — like the reference */}
              <div className="flex items-center gap-3">
                <a
                  href={item.href}
                  className="flex-1 flex items-center justify-center py-3.5 px-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.35em] rounded-xl hover:bg-orange-500 transition-colors duration-200 active:scale-[0.98]"
                >
                  {item.cta}
                </a>
                <a
                  href={item.href}
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-white/[0.1] text-white/40 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/[0.08] transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <section id="pricing-section" className="max-w-7xl mx-auto px-6 pb-24 pt-4">

        {/* Header */}
        <div id="pricing-title" className="mb-14 max-w-3xl">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.pricing.tag}</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-5 leading-none text-white">{l.pricing.title}</h2>
          <p className="text-sm text-white/40 leading-relaxed max-w-lg">{l.pricing.sub}</p>
        </div>

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center gap-1 mb-12 p-1 rounded-full border border-white/[0.08] bg-white/[0.03] w-fit">
          {[false, true].map((isYearly) => (
            <button
              key={String(isYearly)}
              onClick={() => setPricingYearly(isYearly)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.35em] transition-all duration-200 ${
                pricingYearly === isYearly
                  ? 'bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {isYearly ? l.pricing.yearly : l.pricing.monthly}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {l.pricing.plans.map((plan) => {
            const isHighlighted = plan.ctaStyle === 'primary';
            const price = pricingYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`pricing-card relative flex flex-col rounded-[2rem] border p-8 md:p-10 transition-all duration-300 group cursor-default ${
                  isHighlighted
                    ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/[0.07] to-transparent shadow-[0_0_60px_rgba(249,115,22,0.12),inset_0_0_0_1px_rgba(249,115,22,0.12)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-orange-500 text-black font-black uppercase text-[9px] tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name + label */}
                <div className="mb-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/25 mb-2">{plan.id}</p>
                  <h3 className={`text-2xl font-black italic uppercase tracking-tight mb-1 ${isHighlighted ? 'text-white' : 'text-white/80'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">{plan.label}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8">
                  {price === '0' ? (
                    <span className="text-6xl font-black italic tracking-tighter text-white">Free</span>
                  ) : (
                    <>
                      <span className={`text-[2rem] font-black italic mt-1 ${isHighlighted ? 'text-orange-400' : 'text-white/50'}`}>$</span>
                      <span className={`text-6xl font-black italic tracking-tighter leading-none ${isHighlighted ? 'text-white' : 'text-white'}`}>
                        {price}
                      </span>
                      <span className="text-[11px] text-white/30 uppercase tracking-[0.3em] mb-1 self-end">{plan.unit}</span>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${isHighlighted ? 'bg-orange-500/20' : 'bg-white/[0.05]'}`} />

                {/* Features */}
                <ul className="space-y-3.5 mb-10 flex-1">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <span className={`mt-0.5 shrink-0 text-sm leading-none ${isHighlighted ? 'text-orange-500' : 'text-white/30'}`}>✓</span>
                      <span className="text-[12px] text-white/55 leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => openModal(plan)}
                  className={`w-full py-4 font-black uppercase text-[11px] tracking-[0.35em] transition-all duration-200 active:scale-[0.98] ${
                    isHighlighted
                      ? 'bg-orange-500 text-black hover:bg-white shadow-[0_0_30px_rgba(249,115,22,0.35)]'
                      : 'border border-white/[0.12] text-white/50 hover:border-white/30 hover:text-white bg-transparent'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom footnote */}
        <p className="mt-8 text-center text-[9px] uppercase tracking-[0.45em] text-white/20">
          No credit card required · Cancel anytime · Secure payments
        </p>

      </section>

      {/* ── TESTIMONIALS — MARQUEE ────────────────────────────────────────────── */}
      <section id="testimonials" className="pb-24 pt-4 overflow-hidden">
        <div id="reviews-header" className="max-w-7xl mx-auto px-6 mb-14">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.reviews.tag}</p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.92] shrink-0">{l.reviews.title}</h2>
            <div className="md:pb-1">
              <p className="text-sm text-white/40 leading-relaxed max-w-lg mb-6">{l.reviews.sub}</p>
              <div className="flex flex-wrap gap-2">
                {l.reviews.tags.map((tag, i) => (<span key={i} className="rounded-full px-4 py-2 text-[9px] uppercase tracking-[0.35em] border border-white/[0.08] text-white/30">{tag}</span>))}
              </div>
            </div>
          </div>
        </div>
        <div className="marquee-row relative mb-4">
          <div className="flex gap-4 marquee-track" style={{ width:'max-content' }}>
            {[...l.reviews.items,...l.reviews.items].map((item,i) => (
              <blockquote key={i} className="group relative w-[320px] shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/25 hover:bg-white/[0.04] cursor-default overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all duration-300" />
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_,j) => <span key={j} className="text-orange-500 text-xs">★</span>)}</div>
                <p className="text-sm text-white/55 leading-relaxed mb-6">{item.text}</p>
                <div className="flex items-center gap-3">
                  <Image src={item.img} alt={item.author} width={36} height={36} className="rounded-full object-cover border border-white/[0.1]" />
                  <div><p className="text-xs font-bold text-white">{item.author}</p><p className="text-[9px] uppercase tracking-[0.3em] text-white/30">{item.role}</p></div>
                </div>
              </blockquote>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10" />
        </div>
        <div className="marquee-row relative">
          <div className="flex gap-4 marquee-track-reverse" style={{ width:'max-content' }}>
            {[...[...l.reviews.items].reverse(),...[...l.reviews.items].reverse()].map((item,i) => (
              <blockquote key={i} className="group relative w-[320px] shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/25 hover:bg-white/[0.04] cursor-default overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all duration-300" />
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_,j) => <span key={j} className="text-orange-500 text-xs">★</span>)}</div>
                <p className="text-sm text-white/55 leading-relaxed mb-6">{item.text}</p>
                <div className="flex items-center gap-3">
                  <Image src={item.img} alt={item.author} width={36} height={36} className="rounded-full object-cover border border-white/[0.1]" />
                  <div><p className="text-xs font-bold text-white">{item.author}</p><p className="text-[9px] uppercase tracking-[0.3em] text-white/30">{item.role}</p></div>
                </div>
              </blockquote>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10" />
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <div
          id="cta-banner"
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/[0.02]"
        >
          {/* Subtle orange glow bottom-left */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_70%_at_0%_100%,rgba(249,115,22,0.09),transparent)]" />
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          <div className="relative grid md:grid-cols-[1fr_auto] items-stretch">

            {/* Left — text + buttons */}
            <div className="px-10 py-14 md:px-16 md:py-20 flex flex-col justify-center">
              <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-6">{l.cta.tag}</p>

              <h2
                className="font-black italic uppercase tracking-tighter text-white leading-[0.88] mb-7"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
              >
                {l.cta.title.split('\n').map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{i === 1 ? <span className="text-orange-500">{line}</span> : line}</span>
                ))}
              </h2>

              <p className="max-w-md text-sm text-white/40 leading-relaxed mb-10">
                {l.cta.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => { setChatOpen(true); setChatTab('home'); }} className="px-9 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-full hover:bg-orange-500 hover:text-white transition-all duration-200 active:scale-[0.97]">
                  {l.cta.btn1}
                </button>
                <a href="#modules-section" className="px-9 py-4 border border-white/[0.15] text-white/60 font-black uppercase text-[10px] tracking-[0.4em] rounded-full hover:border-white/40 hover:text-white transition-all duration-200">
                  {l.cta.btn2} →
                </a>
              </div>
            </div>

            {/* Right — runner photo with orange overlay */}
            <div
              id="cta-img"
              className="hidden md:block relative w-[340px] lg:w-[420px] shrink-0 overflow-hidden"
            >
              {/* Orange tint block behind image */}
              <div className="absolute inset-0 bg-orange-500/90" />
              <img
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800&auto=format&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
                draggable={false}
              />
              {/* Left fade into card body */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#111]/80 via-transparent to-transparent" />
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating stat badge */}
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-black/50 backdrop-blur-sm px-5 py-4">
                <p className="text-[8px] uppercase tracking-[0.45em] text-white/40 mb-1">Current session</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black italic text-white">18.5</span>
                  <span className="text-[10px] text-orange-400 uppercase tracking-[0.3em]">km/h</span>
                  <span className="ml-auto text-[10px] font-mono text-emerald-400">● LIVE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SOCIAL / CONNECT ──────────────────────────────────────────────────── */}
      <section id="connect-section" className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <div className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-4">{l.social.tag}</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">{l.social.title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {l.social.items.map((item) => {
            const isTg = item.id==='TG', isIg = item.id==='IG', isDc = item.id==='DC';
            return (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                className="social-card group relative flex flex-col rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:border-orange-500/25 hover:bg-white/[0.04] overflow-hidden cursor-pointer">
                <div className="absolute inset-0 pointer-events-none rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(249,115,22,0.07),transparent)]" />
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all duration-500 rounded-t-[2rem]" />
                <div className="mb-10 w-12 h-12 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.08] transition-all duration-300">
                  {isTg && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300"><path d="M21.93 3.24L2.46 10.96c-1.3.52-1.29 1.25-.24 1.57l4.9 1.53 11.35-7.16c.54-.33 1.03-.15.63.21L8.45 16.5l-.38 4.98c.56 0 .81-.26 1.12-.56l2.69-2.61 4.97 3.67c.91.5 1.57.24 1.8-.85l3.25-15.3c.33-1.32-.5-1.92-1.07-1.59z"/></svg>}
                  {isIg && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0"/></svg>}
                  {isDc && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/50 group-hover:text-orange-400 transition-colors duration-300"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>}
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/25 mb-2">{item.id}</p>
                  <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-8 mb-6 h-px bg-white/[0.05] group-hover:bg-orange-500/15 transition-colors duration-300" />
                <div className="flex items-center gap-3">
                  <span className="flex-1 flex items-center justify-center py-3.5 px-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.35em] rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">{item.cta}</span>
                  <span className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-white/[0.1] text-white/40 group-hover:border-orange-500/50 group-hover:text-orange-400 group-hover:bg-orange-500/[0.08] transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section id="faq-section" className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <div id="faq-banner" className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] px-10 py-12 md:px-16 md:py-14 mb-3">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,rgba(249,115,22,0.08),transparent)]" />
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.faq.tag}</p>
              <h2 className="font-black italic uppercase tracking-tighter text-white leading-[0.9]" style={{ fontSize:'clamp(2.4rem,5vw,4.5rem)' }}>
                {l.faq.bannerTitle.split('\n').map((line,i) => (<span key={i}>{i>0&&<br/>}{i===1?<span className="text-orange-500">{line}</span>:line}</span>))}
              </h2>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs hidden md:block">{l.faq.bannerSub}</p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/[0.07] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.05]">
          {l.faq.items.map((item,i) => {
            const isOpen = openFaq===i;
            return (
              <div key={i} className="faq-row group">
                <button onClick={() => setOpenFaq(isOpen?null:i)} className="w-full flex items-start gap-6 md:gap-10 px-8 md:px-12 py-7 text-left transition-colors duration-200 hover:bg-white/[0.02]">
                  <span className="shrink-0 font-mono text-[11px] text-white/20 mt-0.5 w-5 text-right">{String(i+1).padStart(2,'0')}</span>
                  <span className={`flex-1 text-base md:text-lg font-black italic uppercase tracking-tight leading-snug transition-colors duration-200 ${isOpen?'text-white':'text-white/70 group-hover:text-white'}`}>{item.q}</span>
                  <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 mt-0.5" style={{ borderColor:isOpen?'rgba(249,115,22,0.5)':'rgba(255,255,255,0.1)', background:isOpen?'rgba(249,115,22,0.1)':'transparent', color:isOpen?'rgb(251,146,60)':'rgba(255,255,255,0.3)', transform:isOpen?'rotate(45deg)':'rotate(0deg)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/></svg>
                  </span>
                </button>
                <div className="overflow-hidden" style={{ maxHeight:isOpen?'200px':'0px', opacity:isOpen?1:0, transition:'max-height 0.38s ease,opacity 0.3s ease' }}>
                  <p className="pb-8 px-8 md:px-12 pl-[4.25rem] md:pl-[6.5rem] text-sm text-white/45 leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)_1.2fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" /><p className="text-[11px] font-black uppercase tracking-[0.5em] text-white">{l.footer.brand}</p></div>
              <p className="text-sm text-white/30 leading-relaxed max-w-[220px]">{l.footer.sub}</p>
            </div>
            {l.footer.cols.map((col) => (
              <div key={col.heading}>
                <p className="text-[9px] uppercase tracking-[0.45em] text-white/25 mb-4">{col.heading}</p>
                <ul className="space-y-3">{col.links.map((link) => (<li key={link.label}><a href={link.href} className="text-sm text-white/45 hover:text-white transition-colors duration-200">{link.label}</a></li>))}</ul>
              </div>
            ))}
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/25 mb-4">{l.footer.write}</p>
              <a href="mailto:hello@visionrun.com" className="text-sm text-white/45 hover:text-orange-400 transition-colors duration-200 block mb-8">{l.footer.email}</a>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/25 mb-4">{l.footer.follow}</p>
              <div className="flex items-center gap-3">
                {[{href:'https://instagram.com/',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" strokeWidth="0"/></svg>},
                  {href:'https://t.me/',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21.93 3.24L2.46 10.96c-1.3.52-1.29 1.25-.24 1.57l4.9 1.53 11.35-7.16c.54-.33 1.03-.15.63.21L8.45 16.5l-.38 4.98c.56 0 .81-.26 1.12-.56l2.69-2.61 4.97 3.67c.91.5 1.57.24 1.8-.85l3.25-15.3c.33-1.32-.5-1.92-1.07-1.59z"/></svg>},
                  {href:'https://discord.com/',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>}
                ].map((s,i) => (<a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.1] text-white/35 hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/[0.07] transition-all duration-200">{s.icon}</a>))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/[0.05]" />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] uppercase tracking-[0.45em] text-white/20">{l.footer.copy} · {l.footer.tagline}</p>
            <div className="flex items-center gap-6">{l.footer.legal.map((item) => (<a key={item} href="#" className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white/50 transition-colors duration-200">{item}</a>))}</div>
          </div>
        </div>
      </footer>

      {/* ── CHAT WIDGET ───────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">

        {/* Panel */}
        <motion.div
          initial={false}
          animate={chatOpen ? { y: 0, scale: 1, opacity: 1 } : { y: 20, scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          style={{ pointerEvents: chatOpen ? 'auto' : 'none', transformOrigin: 'bottom right' }}
          className="w-[340px] rounded-[1.75rem] border border-white/[0.1] bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.75)] overflow-hidden relative"
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent pointer-events-none z-10" />

          {/* Fixed tab bar — always visible at bottom */}
          {(() => {
            const tabs = [
              { id: 'home' as const, label: lang==='ru'?'Главная':'Home', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { id: 'chat' as const, label: lang==='ru'?'Чат':'Chat',    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            ];
            return (
              <div className="absolute bottom-0 inset-x-0 flex border-t border-white/[0.07] bg-[#111] z-10">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setChatTab(tab.id)}
                    className="flex-1 flex flex-col items-center gap-1 py-3 text-[9px] uppercase tracking-[0.35em] relative transition-colors duration-200"
                    style={{ color: chatTab===tab.id ? '#fb923c' : 'rgba(255,255,255,0.25)' }}
                  >
                    {tab.icon}
                    {tab.label}
                    {chatTab===tab.id && (
                      <motion.div layoutId="chat-tab-indicator" className="absolute top-0 inset-x-4 h-[1.5px] rounded-full bg-orange-500" transition={{ type:'spring', stiffness:400, damping:30 }} />
                    )}
                  </button>
                ))}
              </div>
            );
          })()}

          {/* Sliding content area — clip overflow */}
          <div className="overflow-hidden" style={{ paddingBottom: '52px' }}>
            <AnimatePresence mode="wait" initial={false}>
              {chatTab === 'home' ? (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                >
                  {/* Hero header */}
                  <div className="relative px-6 pt-7 pb-7 bg-gradient-to-b from-orange-500/[0.07] to-transparent">
                    <button onClick={()=>setChatOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.1] text-white/30 hover:text-white hover:border-white/30 transition-all text-lg leading-none">×</button>
                    <div className="flex items-center mb-5">
                      {['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face','https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=48&h=48&fit=crop&crop=face'].map((src,i)=>(
                        <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.06, type:'spring', stiffness:300, damping:24 }}
                          className="rounded-full border-2 border-[#111] overflow-hidden" style={{marginLeft:i>0?'-10px':'0', width:36, height:36, flexShrink:0}}>
                          <Image src={src} alt="" width={36} height={36} className="object-cover" />
                        </motion.div>
                      ))}
                      <span className="ml-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                        <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">{lang==='ru'?'Онлайн':'Online'}</span>
                      </span>
                    </div>
                    <motion.h3 initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }} className="text-2xl font-black italic uppercase tracking-tight text-white mb-1">
                      {lang==='ru'?'Привет 👋':'Hi there 👋'}
                    </motion.h3>
                    <motion.p initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.13 }} className="text-sm text-white/45 leading-snug">
                      {lang==='ru'?'Как Vision Run может помочь тебе сегодня?':'How can Vision Run support you today?'}
                    </motion.p>
                  </div>

                  {/* Chat CTA */}
                  <div className="px-4 pb-3 pt-1">
                    <motion.button initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.16 }}
                      onClick={()=>setChatTab('chat')}
                      className="group w-full flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-orange-500/30 hover:bg-orange-500/[0.05] transition-all duration-200 px-5 py-4">
                      <div className="text-left">
                        <p className="text-sm font-bold text-white mb-0.5">{lang==='ru'?'Написать нам':'Chat with us'}</p>
                        <p className="text-[10px] text-white/35 uppercase tracking-[0.3em]">{lang==='ru'?'Ответим быстро':'We reply shortly'}</p>
                      </div>
                      <span className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500/15 text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-all duration-200 shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </motion.button>
                  </div>

                  {/* FAQ quick links */}
                  <div className="px-4 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 px-1 mb-1">{lang==='ru'?'Частые вопросы':'Quick answers'}</p>
                    {(lang==='ru'?['Как работают AR-очки?','Что входит в бесплатный план?','Как подключить тренера?']:['How do the AR glasses work?',"What's in the free plan?",'How do I connect my coach?']).map((q,i)=>(
                      <motion.button key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay: 0.18+i*0.06 }}
                        onClick={()=>setChatTab('chat')}
                        className="w-full text-left px-1 py-2.5 text-sm text-white/45 hover:text-orange-400 transition-colors duration-150 border-b border-white/[0.05] last:border-0">
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 28 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="flex flex-col"
                  style={{ height: '368px' }}
                >
                  {/* Chat header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07] shrink-0">
                    <button onClick={()=>setChatTab('home')} className="w-7 h-7 flex items-center justify-center rounded-full border border-white/[0.1] text-white/30 hover:text-white hover:border-white/30 transition-colors text-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Vision Run Support</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-400/70">{lang==='ru'?'● Онлайн':'● Online'}</p>
                    </div>
                    <button onClick={()=>setChatOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full border border-white/[0.1] text-white/30 hover:text-white hover:border-white/30 transition-colors text-lg leading-none">×</button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="flex items-end gap-2">
                      <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="" width={28} height={28} className="rounded-full border border-white/[0.1] shrink-0" />
                      <div className="max-w-[220px] rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/[0.06] px-4 py-3">
                        <p className="text-sm text-white/70 leading-relaxed">{lang==='ru'?'Привет! Я здесь, чтобы помочь тебе с Vision Run. Задай любой вопрос 🏃':'Hey! I\'m here to help you with Vision Run. Ask me anything 🏃'}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input */}
                  <div className="shrink-0 px-4 pb-4">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 focus-within:border-orange-500/40 transition-colors">
                      <input type="text" value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')setChatMsg('');}}
                        placeholder={lang==='ru'?'Написать сообщение...':'Type a message...'}
                        className="flex-1 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none"/>
                      <button onClick={()=>setChatMsg('')} className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-500 text-black hover:bg-white transition-colors duration-200 shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trigger button row */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ x:(chatHover&&!chatOpen)?0:10, opacity:(chatHover&&!chatOpen)?1:0, scale:(chatHover&&!chatOpen)?1:0.94 }}
            transition={{ type:'spring', stiffness:340, damping:26 }}
            style={{ pointerEvents:'none' }}
          >
            <span className="px-4 py-2.5 rounded-full border border-white/[0.1] bg-[#111] text-xs font-bold text-white whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {lang==='ru'?'Написать нам 👋':'Chat with us 👋'}
            </span>
          </motion.div>
          <button
            onClick={()=>{setChatOpen(v=>!v);setChatTab('home');}}
            onMouseEnter={()=>setChatHover(true)}
            onMouseLeave={()=>setChatHover(false)}
            className={`relative w-14 h-14 rounded-full bg-orange-500 text-black shadow-[0_8px_32px_rgba(249,115,22,0.45)] hover:bg-white hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center ${!chatOpen?'chat-btn-idle':''}`}
          >
            <motion.span animate={{ rotate: chatOpen?90:0, scale: chatOpen?0.7:1, opacity: chatOpen?0:1 }} transition={{ type:'spring', stiffness:320, damping:24 }} style={{ position:'absolute' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </motion.span>
            <motion.span animate={{ rotate: chatOpen?0:-90, scale: chatOpen?1:0.7, opacity: chatOpen?1:0 }} transition={{ type:'spring', stiffness:320, damping:24 }} style={{ position:'absolute', fontSize:'22px', lineHeight:1, fontWeight:900 }}>×</motion.span>
          </button>
        </div>
      </div>

      {/* ── PLAN MODAL ────────────────────────────────────────────────────────── */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            transition: 'opacity 0.32s ease, backdrop-filter 0.32s ease',
            opacity: modalVisible ? 1 : 0,
            backdropFilter: modalVisible ? 'blur(18px) saturate(0.6)' : 'blur(0px)',
            background: modalVisible ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0)',
            pointerEvents: modalVisible ? 'auto' : 'none',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="relative w-full max-w-lg"
            style={{
              transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.32s ease',
              transform: modalVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
              opacity: modalVisible ? 1 : 0,
            }}
          >
            {/* Modal card */}
            <div className={`relative overflow-hidden rounded-[2rem] border bg-[#0e0e0e] ${selectedPlan.ctaStyle === 'primary' ? 'border-orange-500/30 shadow-[0_0_80px_rgba(249,115,22,0.15)]' : 'border-white/[0.1]'}`}>

              {/* Top accent */}
              {selectedPlan.ctaStyle === 'primary' && (
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              )}

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white hover:border-white/30 transition-all z-10 text-lg leading-none"
              >×</button>

              {modalStep === 'plan' ? (
                <div className="p-8 md:p-10">

                  {/* Plan header */}
                  <div className="mb-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/25 mb-2">{selectedPlan.id}</p>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-3xl font-black italic uppercase tracking-tight text-white">{selectedPlan.name}</h3>
                      {selectedPlan.badge && (
                        <span className="px-3 py-1 bg-orange-500 text-black font-black uppercase text-[8px] tracking-[0.4em] rounded-full">
                          {selectedPlan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/25">{selectedPlan.label}</p>
                  </div>

                  {/* Billing toggle */}
                  <div className="flex items-center gap-1 mb-6 p-1 rounded-full border border-white/[0.07] bg-white/[0.03] w-fit">
                    {[false, true].map((isY) => (
                      <button
                        key={String(isY)}
                        onClick={() => setModalYearly(isY)}
                        className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.35em] transition-all duration-200 ${
                          modalYearly === isY
                            ? 'bg-orange-500 text-black'
                            : 'text-white/35 hover:text-white/60'
                        }`}
                      >
                        {isY ? l.pricing.yearly : l.pricing.monthly}
                      </button>
                    ))}
                  </div>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    {(modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice) === '0' ? (
                      <span className="text-7xl font-black italic tracking-tighter text-white">Free</span>
                    ) : (
                      <>
                        <span className="text-2xl font-black italic text-orange-400 mt-2">$</span>
                        <span className="text-7xl font-black italic tracking-tighter leading-none text-white">
                          {modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}
                        </span>
                        <div className="self-end mb-2">
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">{selectedPlan.unit}</p>
                          {modalYearly && selectedPlan.yearlyPrice !== '0' && (
                            <p className="text-[9px] text-orange-400/70 uppercase tracking-[0.2em]">billed yearly</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className={`h-px mb-7 ${selectedPlan.ctaStyle === 'primary' ? 'bg-orange-500/15' : 'bg-white/[0.05]'}`} />

                  {/* Features */}
                  <ul className="space-y-3 mb-9">
                    {selectedPlan.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <span className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-full text-[10px] font-black ${selectedPlan.ctaStyle === 'primary' ? 'bg-orange-500/15 text-orange-400' : 'bg-white/[0.06] text-white/40'}`}>✓</span>
                        <span className="text-[13px] text-white/65">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {(modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice) === '0' ? (
                    <button
                      onClick={closeModal}
                      className="w-full py-4 font-black uppercase text-[11px] tracking-[0.35em] border border-white/[0.12] text-white/60 hover:border-white/30 hover:text-white bg-transparent transition-all duration-200"
                    >
                      {selectedPlan.cta}
                    </button>
                  ) : (
                    <button
                      onClick={() => setModalStep('checkout')}
                      className={`w-full py-4 font-black uppercase text-[11px] tracking-[0.35em] transition-all duration-200 active:scale-[0.98] ${
                        selectedPlan.ctaStyle === 'primary'
                          ? 'bg-orange-500 text-black hover:bg-white shadow-[0_0_30px_rgba(249,115,22,0.4)]'
                          : 'bg-white text-black hover:bg-orange-500'
                      }`}
                    >
                      Continue →
                    </button>
                  )}

                  <p className="mt-4 text-center text-[9px] uppercase tracking-[0.4em] text-white/20">
                    Secure checkout · Cancel anytime
                  </p>
                </div>
              ) : (
                /* ── CHECKOUT STEP ── */
                <div className="p-8 md:p-10">
                  <button
                    onClick={() => setModalStep('plan')}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white mb-8 transition-colors"
                  >
                    ← {selectedPlan.name} · ${modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}{selectedPlan.unit}
                  </button>

                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-7">Complete order</h3>

                  {/* Form */}
                  <div className="space-y-3 mb-7">
                    {[
                      { label: 'Full name', type: 'text', placeholder: 'Alex Runner' },
                      { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1.5">{field.label}</p>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all"
                        />
                      </div>
                    ))}

                    {/* Card number */}
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1.5">Card number</p>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all pr-16"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-xs tracking-wider">VISA</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1.5">Expires</p>
                        <input type="text" placeholder="MM / YY" maxLength={7} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-all" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1.5">CVC</p>
                        <input type="text" placeholder="•••" maxLength={3} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className={`rounded-xl p-4 mb-6 border ${selectedPlan.ctaStyle === 'primary' ? 'bg-orange-500/[0.06] border-orange-500/15' : 'bg-white/[0.03] border-white/[0.06]'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white">{selectedPlan.name} Plan</p>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">{modalYearly ? 'Billed annually' : 'Billed monthly'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black italic text-white">${modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}<span className="text-sm text-white/40">{selectedPlan.unit}</span></p>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`w-full py-4 font-black uppercase text-[11px] tracking-[0.4em] transition-all duration-200 active:scale-[0.98] ${
                      selectedPlan.ctaStyle === 'primary'
                        ? 'bg-orange-500 text-black hover:bg-white shadow-[0_0_30px_rgba(249,115,22,0.35)]'
                        : 'bg-white text-black hover:bg-orange-500'
                    }`}
                  >
                    Pay ${modalYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}{selectedPlan.unit}
                  </button>

                  <p className="mt-4 text-center text-[9px] uppercase tracking-[0.4em] text-white/20">
                    🔒 256-bit SSL · Cancel anytime
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}