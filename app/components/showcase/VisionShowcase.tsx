'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOWCASE_MODELS, FRAME_STROKES, TINT_OPS, slideVariants } from '@/app/constants';
import { GlassesSVG } from '@/app/components/glasses/GlassesSVG';
import { focusRing } from '@/app/components/focusRing';

type Lang = 'en' | 'ru';

export function VisionShowcase({ lang }: { lang: Lang }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [hud, setHud] = useState<'minimal' | 'sport' | 'tech'>('minimal');
  const [tint, setTint] = useState('Dark');
  const [frame, setFrame] = useState('Carbon');

  const model = SHOWCASE_MODELS[idx];
  const accent = frame === 'Vision Orange' ? '#f97316' : frame === 'Ghost White' ? model.accent : model.accent;
  const fStroke = FRAME_STROKES[frame];
  const lOp = TINT_OPS[tint];

  const go = (step: number) => {
    setDir(step);
    setIdx((i) => (i + step + SHOWCASE_MODELS.length) % SHOWCASE_MODELS.length);
  };

  const ConfigTag = ({
    label,
    active,
    onClick,
    pressedLabel,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    pressedLabel: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={pressedLabel}
      className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-200 cursor-pointer ${focusRing}`}
      style={{
        borderColor: active ? accent : 'rgba(255,255,255,0.14)',
        background: active ? `${accent}20` : 'transparent',
        color: active ? accent : 'rgba(255,255,255,0.62)',
        boxShadow: active ? `0 0 12px ${accent}30` : 'none',
      }}
    >
      {label}
    </button>
  );

  const hudLabel = (opt: string) =>
    lang === 'ru'
      ? ({ minimal: 'минимальный', sport: 'спорт', tech: 'техно' } as const)[opt as 'minimal' | 'sport' | 'tech']
      : opt;

  const tintPressed = (opt: string) =>
    lang === 'ru' ? `Тонировка: ${opt}` : `Lens tint: ${opt}`;

  const frameKeys = Object.keys(FRAME_STROKES) as (keyof typeof FRAME_STROKES)[];

  return (
    <section
      data-layer="true"
      className="relative py-24 overflow-hidden"
      aria-labelledby="vision-showcase-title"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 38% 50%, ${accent}0a 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:pl-16">
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.55em] text-orange-500 mb-4">
            {lang === 'ru' ? 'Флагманский продукт' : 'Flagship Product'}
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
            <h2
              id="vision-showcase-title"
              className="blur-reveal text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter text-white leading-none"
            >
              Vision Showcase.
            </h2>
            <p className="text-sm text-white/65 max-w-xs leading-relaxed md:pb-1">
              {lang === 'ru'
                ? 'Выбери модель, настрой линзу, оправу и HUD-интерфейс.'
                : 'Select your model, configure lens, frame and HUD interface.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div className="flex flex-col items-center">
            <div
              className="flex flex-wrap justify-center gap-2 mb-10"
              role="group"
              aria-label={lang === 'ru' ? 'Модель очков' : 'Glasses model'}
            >
              {SHOWCASE_MODELS.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setDir(i > idx ? 1 : -1);
                    setIdx(i);
                  }}
                  aria-pressed={i === idx}
                  aria-label={lang === 'ru' ? `Модель ${m.name}` : `Model ${m.name}`}
                  className={`relative px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-200 ${focusRing}`}
                  style={{
                    borderColor: i === idx ? m.accent : 'rgba(255,255,255,0.12)',
                    color: i === idx ? m.accent : 'rgba(255,255,255,0.55)',
                    background: i === idx ? `${m.accent}14` : 'transparent',
                    boxShadow: i === idx ? `0 0 14px ${m.accent}28` : 'none',
                  }}
                >
                  {m.tag}
                </button>
              ))}
            </div>

            <div
              className="relative w-full flex items-center justify-center"
              style={{ height: '240px' }}
              aria-label={lang === 'ru' ? 'Предпросмотр очков' : 'Glasses preview'}
            >
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  left: '2%',
                  top: '50%',
                  transform: 'translate(-50%,-50%) rotate(-22deg) scale(0.58)',
                  filter: 'blur(16px)',
                  opacity: 0.09,
                }}
                aria-hidden
              >
                <div style={{ width: '300px' }}>
                  <GlassesSVG accent={model.accent} modeId="bk-fl" frameStroke={fStroke} lensOpacity={0.6} />
                </div>
              </div>
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  left: '12%',
                  top: '50%',
                  transform: 'translate(-50%,-50%) rotate(-11deg) scale(0.74)',
                  filter: 'blur(7px)',
                  opacity: 0.17,
                }}
                aria-hidden
              >
                <div style={{ width: '300px' }}>
                  <GlassesSVG accent={model.accent} modeId="bk-nl" frameStroke={fStroke} lensOpacity={0.7} />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    filter: `drop-shadow(0 18px 42px ${accent}45) drop-shadow(0 4px 14px rgba(0,0,0,0.55))`,
                    width: '100%',
                    maxWidth: '460px',
                  }}
                >
                  <AnimatePresence custom={dir} mode="wait">
                    <motion.div
                      key={model.id}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    >
                      <GlassesSVG accent={accent} modeId={`sc-${model.id}`} frameStroke={fStroke} lensOpacity={lOp} hud={hud} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              <div
                className="absolute pointer-events-none select-none"
                style={{
                  right: '12%',
                  top: '50%',
                  transform: 'translate(50%,-50%) rotate(11deg) scale(0.74)',
                  filter: 'blur(7px)',
                  opacity: 0.17,
                }}
                aria-hidden
              >
                <div style={{ width: '300px' }}>
                  <GlassesSVG accent={model.accent} modeId="bk-nr" frameStroke={fStroke} lensOpacity={0.7} />
                </div>
              </div>
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  right: '2%',
                  top: '50%',
                  transform: 'translate(50%,-50%) rotate(22deg) scale(0.58)',
                  filter: 'blur(16px)',
                  opacity: 0.09,
                }}
                aria-hidden
              >
                <div style={{ width: '300px' }}>
                  <GlassesSVG accent={model.accent} modeId="bk-fr" frameStroke={fStroke} lensOpacity={0.6} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={lang === 'ru' ? 'Предыдущая модель' : 'Previous model'}
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.14] text-white/60 hover:border-white/35 hover:text-white hover:bg-white/[0.06] transition-all duration-200 z-10 ${focusRing}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={lang === 'ru' ? 'Следующая модель' : 'Next model'}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.14] text-white/60 hover:border-white/35 hover:text-white hover:bg-white/[0.06] transition-all duration-200 z-10 ${focusRing}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                className="mt-8 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.5em]" style={{ color: accent }}>
                    {model.tag}
                  </span>
                  <span className="w-px h-3 bg-white/25" aria-hidden />
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/62">${model.price} / mo</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black italic uppercase tracking-tight text-white mb-2">{model.name}</h3>
                <p className="text-sm text-white/65 max-w-sm mx-auto leading-relaxed">{lang === 'ru' ? model.descRu : model.desc}</p>
              </motion.div>
            </AnimatePresence>

            <div
              className="flex gap-2 mt-6"
              role="group"
              aria-label={lang === 'ru' ? 'Слайды моделей' : 'Model slides'}
            >
              {SHOWCASE_MODELS.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setDir(i > idx ? 1 : -1);
                    setIdx(i);
                  }}
                  aria-label={lang === 'ru' ? `Показать модель ${m.name}` : `Show model ${m.name}`}
                  aria-current={i === idx ? 'true' : undefined}
                  className={`rounded-full transition-all duration-300 ${focusRing}`}
                  style={{
                    width: i === idx ? 24 : 6,
                    height: 6,
                    background: i === idx ? accent : 'rgba(255,255,255,0.22)',
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className="rounded-[1.75rem] border border-white/[0.1] p-6 flex flex-col gap-6"
            style={{
              background: 'rgba(255,255,255,0.028)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/65">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-black text-white">{lang === 'ru' ? 'Настроить' : 'Customize'}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/65">{lang === 'ru' ? 'Параметры очков' : 'Lens parameters'}</p>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div role="group" aria-label={lang === 'ru' ? 'HUD-интерфейс' : 'HUD interface'}>
              <p className="text-[11px] uppercase tracking-[0.45em] text-white/65 mb-3">{lang === 'ru' ? 'HUD-интерфейс' : 'HUD Interface'}</p>
              <div className="flex flex-wrap gap-2">
                {(['minimal', 'sport', 'tech'] as const).map((opt) => (
                  <ConfigTag
                    key={opt}
                    label={opt}
                    active={hud === opt}
                    onClick={() => setHud(opt)}
                    pressedLabel={lang === 'ru' ? `HUD: ${hudLabel(opt)}` : `HUD: ${opt}`}
                  />
                ))}
              </div>
            </div>

            <div role="group" aria-label={lang === 'ru' ? 'Тонировка линз' : 'Lens tint'}>
              <p className="text-[11px] uppercase tracking-[0.45em] text-white/65 mb-3">{lang === 'ru' ? 'Тонировка линз' : 'Lens Tint'}</p>
              <div className="flex flex-wrap gap-2">
                {(['Clear', 'Dark', 'Photochromic'] as const).map((opt) => (
                  <ConfigTag
                    key={opt}
                    label={opt}
                    active={tint === opt}
                    onClick={() => setTint(opt)}
                    pressedLabel={tintPressed(opt)}
                  />
                ))}
              </div>
            </div>

            <div role="group" aria-label={lang === 'ru' ? 'Цвет оправы' : 'Frame color'}>
              <p className="text-[11px] uppercase tracking-[0.45em] text-white/65 mb-3">{lang === 'ru' ? 'Цвет оправы' : 'Frame Color'}</p>
              <div className="flex flex-col gap-2">
                {frameKeys.map((opt) => {
                  const swatch =
                    opt === 'Carbon' ? 'rgba(80,80,80,0.9)' : opt === 'Ghost White' ? 'rgba(220,220,220,0.9)' : '#f97316';
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFrame(opt)}
                      aria-pressed={frame === opt}
                      aria-label={lang === 'ru' ? `Оправа: ${opt}` : `Frame: ${opt}`}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 text-left ${focusRing}`}
                      style={{
                        borderColor: frame === opt ? accent : 'rgba(255,255,255,0.1)',
                        background: frame === opt ? `${accent}10` : 'transparent',
                      }}
                    >
                      <span className="w-4 h-4 rounded-full shrink-0 border border-white/25" style={{ background: swatch }} aria-hidden />
                      <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: frame === opt ? accent : 'rgba(255,255,255,0.62)' }}>
                        {opt}
                      </span>
                      {frame === opt && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: accent }} aria-hidden />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className={`w-full py-3.5 rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${focusRing}`}
                style={{ background: accent, color: '#000' }}
              >
                {lang === 'ru' ? 'Заказать модель' : 'Order This Model'}
              </button>
              <button
                type="button"
                className={`w-full py-3 rounded-2xl font-black uppercase text-xs tracking-[0.4em] border border-white/[0.14] text-white/62 hover:border-white/30 hover:text-white/85 transition-all duration-200 ${focusRing}`}
              >
                {lang === 'ru' ? 'Подробнее' : 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
