'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODES } from '@/app/constants';
import { GlassesSVG } from '@/app/components/glasses/GlassesSVG';
import { focusRing } from '@/app/components/focusRing';

type Lang = 'en' | 'ru';

export function VisionConfigurator({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const mode = MODES[active];

  return (
    <section data-layer="true" className="relative max-w-7xl mx-auto px-6 py-24" aria-labelledby="vision-mode-title">
      <div className="mb-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.55em] text-orange-500 mb-4">
          {lang === 'ru' ? 'Интерактивный конфигуратор' : 'Interactive Configurator'}
        </p>
        <h2 id="vision-mode-title" className="blur-reveal text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter text-white leading-none">
          Vision Mode.
        </h2>
        <p className="mt-5 text-sm text-white/65 max-w-sm mx-auto leading-relaxed">
          {lang === 'ru' ? 'Выбери режим — линзы адаптируются мгновенно.' : 'Pick your mode — lenses adapt in real time.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_220px] gap-8 items-center">
        <div className="flex flex-row md:flex-col gap-2.5" role="group" aria-label={lang === 'ru' ? 'Режим линз' : 'Lens mode'}>
          {MODES.map((m, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={m.id}
                type="button"
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isActive}
                aria-label={lang === 'ru' ? `Режим ${m.label}` : `${m.label} mode`}
                className={`relative flex-1 md:flex-none text-left rounded-2xl border overflow-hidden cursor-pointer ${focusRing}`}
                style={{
                  padding: '14px 18px',
                  borderColor: isActive ? m.accent : 'rgba(255,255,255,0.1)',
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
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
                  <span style={{ color: isActive ? m.accent : 'rgba(255,255,255,0.52)', transition: 'color 0.2s' }} aria-hidden>
                    {m.icon}
                  </span>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-[0.35em] text-white">{m.label}</span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="block text-[11px] mt-0.5 font-mono uppercase tracking-[0.25em]"
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

        <div className="relative flex flex-col items-center justify-center py-10 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id + '-badge'}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-[0.4em]"
              style={{ borderColor: `${mode.accent}45`, color: mode.accent, background: `${mode.accent}10` }}
            >
              <span style={{ color: mode.accent }} aria-hidden>
                {mode.icon}
              </span>
              {mode.label} Mode
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
            style={{
              width: '380px',
              height: '180px',
              background: `radial-gradient(ellipse at center, ${mode.accent}28 0%, transparent 70%)`,
              filter: 'blur(24px)',
            }}
            aria-hidden
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 18px 40px ${mode.accent}35) drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }}
            aria-hidden
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

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12]"
            style={{ background: 'rgba(12,12,12,0.75)' }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: mode.accent }}
              aria-hidden
            />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/62 font-mono">{lang === 'ru' ? mode.statRu : mode.stat}</span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
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
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse 110% 90% at 50% 40%, ${mode.accent}22 0%, ${mode.accent}08 50%, transparent 80%)` }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%)' }} />
              <div className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${mode.accent}, transparent)` }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-40" aria-hidden>
                <GlassesSVG accent={mode.accent} modeId={`card-${mode.id}`} />
              </div>
              <div className="absolute inset-x-6 top-1/2 h-px" style={{ background: `linear-gradient(90deg, transparent, ${mode.accent}50, transparent)` }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.45em] font-mono mb-0.5" style={{ color: mode.accent }}>
                    {lang === 'ru' ? 'Режим' : 'Lens Mode'}
                  </p>
                  <p className="text-sm font-display font-black italic uppercase tracking-tight text-white">{mode.label}</p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border"
                  style={{ borderColor: `${mode.accent}45`, color: mode.accent, background: `${mode.accent}12` }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-1 h-1 rounded-full"
                    style={{ background: mode.accent }}
                    aria-hidden
                  />
                  {lang === 'ru' ? 'Активен' : 'Active'}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id + '-d'}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.07 }}
              className="rounded-2xl border border-white/[0.09] p-5"
              style={{ background: 'rgba(255,255,255,0.018)' }}
            >
              <p className="text-xs text-white/65 leading-relaxed mb-4">{lang === 'ru' ? mode.descRu : mode.desc}</p>
              <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${mode.accent}35, transparent)` }} />
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: mode.accent }}
                  aria-hidden
                />
                <span className="text-[11px] uppercase tracking-[0.35em] text-white/58 font-mono">{lang === 'ru' ? mode.statRu : mode.stat}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
