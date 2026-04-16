'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ visible }: { visible: boolean }) {
  const r = 38;
  const circ = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(18px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-none"
          style={{
            background: 'linear-gradient(165deg, #03050a 0%, #020208 48%, #010101 100%)',
          }}
          aria-busy="true"
          aria-live="polite"
          aria-label="Loading"
        >
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
          />

          <div className="relative" style={{ width: 88, height: 88 }}>
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" style={{ display: 'block' }} aria-hidden>
              <circle cx="44" cy="44" r={r} stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" fill="none" />
              <motion.circle
                cx="44"
                cy="44"
                r={r}
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
              <motion.circle
                cx="44"
                cy="44"
                r={r - 5}
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

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#f97316',
                  boxShadow: '0 0 12px 4px rgba(249,115,22,0.6)',
                }}
                aria-hidden
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="mt-9 text-center"
          >
            <p className="text-xs font-black uppercase tracking-[0.7em] text-white mb-2">Vision Run</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-[11px] uppercase tracking-[0.5em] text-white/60"
            >
              AR Running
            </motion.p>
          </motion.div>

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
