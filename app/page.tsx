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
      if (progress < 1) { frameId = requestAnimationFrame(animate); } else { setCount(end); }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end]);
  return count;
};

const AnimatedText = ({ text, color, delay, visible }: {
  text: string; color: string; delay: number; visible: boolean
}) => (
  <span className="inline-block">
    {text.split('').map((char, i) => (
      <span key={i} className={`inline-block transition-all duration-300 ${color}`} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) skewX(-3deg)' : 'translateY(40px)',
        transitionDelay: visible ? `${delay + i * 40}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const useInView = (threshold = 0.15) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

const t = {
  en: {
    nav: { how: 'How it works', modules: 'Modules', reviews: 'Reviews', cta: 'Start now' },
    hero: { tag: 'Vision Sync: Active', sub: 'Premium virtual running glasses for athletes. Live telemetry, route overlays, and immersive feedback — built for the future of training.' },
    hud: {
      bpm: 'BPM', bpmAnnot: 'Annot: biometric pulse stream · high fidelity',
      kmh: 'Km/h', kmhAnnot: 'Annot: aerodynamic pace control · velocity locked',
      charge: 'Charge', chargeAnnot: 'Annot: energy reserve online · ready for surge',
    },
    how: {
      tag: 'How it works', title: 'Smart running, simplified.',
      sub: 'Vision Run brings together real-time metrics, adaptive guidance and recovery signals in one clear interface — so every session is sharp and productive.',
      features: [
        { title: 'Live Metrics', text: 'Instant heart rate, pace and energy data in a clear HUD overlay.' },
        { title: 'Adaptive Guidance', text: 'Training cues that adjust to your effort, terrain and goals.' },
        { title: 'Recovery Signals', text: 'Recovery status that tells you when to push and when to rest.' },
      ],
    },
    modules: {
      title: 'Gear Up', sub: 'Subscription', access: 'Monthly access · cancel anytime', btn: 'Unlock Access',
      items: [
        { id: 'NK-01', title: 'Air Zoom Tech', price: '299', desc: 'Footstrike analytics that returns power to every step.' },
        { id: 'NK-02', title: 'Pace Ghost', price: '150', desc: 'A virtual pace coach to lock in your targeted tempo.' },
        { id: 'NK-03', title: 'Oxygen Flux', price: '199', desc: 'Breathing rhythm and oxygen saturation telemetry.' },
        { id: 'NK-04', title: 'Vapor HUD', price: '99', desc: 'Minimalist display inspired by limited-edition drops.' },
        { id: 'NK-05', title: 'Stamina Core', price: '120', desc: 'Endurance forecasting from heart-load algorithms.' },
        { id: 'NK-06', title: 'Track Master', price: '250', desc: 'Route optimization for stadium and street sessions.' },
      ],
    },
    included: {
      tag: "What's included",
      title: 'A subscription for the future of running optics.',
      sub: 'Become part of the VR runner ecosystem with live metrics, adaptive coaching, and premium visual features.',
      items: [
        { title: 'LIVE METRICS', sub: 'Immersive training', text: 'Live VR overlays keep your run aligned, focused, and fully visual.' },
        { title: 'ADAPTIVE GUIDANCE', sub: 'Adaptive coaching', text: 'Every stride is analyzed, every session tuned to your rise.' },
        { title: 'RECOVERY SIGNALS', sub: 'Recovery insights', text: 'Smart recovery cues that help you train harder and recover faster.' },
      ],
      footnote: 'Start your first month in the VR Running Lab.',
      btn: 'Get Started Now',
    },
    reviews: {
      tag: 'Trusted by runners', title: 'From the road to the run lab.',
      sub: 'Elite athletes and everyday runners use Vision Run to train smarter, visualize every session, and stay ahead of the pack.',
      tags: ['Live route overlay', 'Adaptive coaching', 'Recovery insights'],
      items: [
        { text: '"The VR lenses turned every run into a pro-level session. Data, route guidance and focus all in one."', author: '— Mila West, endurance athlete' },
        { text: '"Finally a headset that understands running. Every mile feels guided and intentionally built."', author: '— Alex Reed, coach' },
      ],
    },
    footer: {
      tag: 'Vision Run', title: 'Designed for runners who want every run to count.',
      sub: 'Real-time data, adaptive training and body awareness — without the noise.',
      contact: 'Contact', follow: 'Follow', copy: '© 2026 Vision Run', tagline: 'Faster. Stronger. No limits.',
    },
  },
  ru: {
    nav: { how: 'Как это работает', modules: 'Модули', reviews: 'Отзывы', cta: 'Начать' },
    hero: { tag: 'Vision Sync: Активен', sub: 'Премиальные VR-очки для бегунов. Живая телеметрия, наложение маршрутов и иммерсивная обратная связь — для тренировок будущего.' },
    hud: {
      bpm: 'УД/МИН', bpmAnnot: 'Биометрический поток пульса · высокая точность',
      kmh: 'КМ/Ч', kmhAnnot: 'Аэродинамический контроль темпа · скорость зафиксирована',
      charge: 'Заряд', chargeAnnot: 'Энергорезерв онлайн · готов к рывку',
    },
    how: {
      tag: 'Как это работает', title: 'Умный бег, просто.',
      sub: 'Vision Run объединяет метрики в реальном времени, адаптивные подсказки и восстановительные сигналы в одном удобном интерфейсе, чтобы тренировки были ясными и продуктивными.',
      features: [
        { title: 'Живые метрики', text: 'Мгновенные данные о пульсе, темпе и энергии прямо в HUD-оверлее.' },
        { title: 'Адаптивные подсказки', text: 'Тренировочные сигналы, которые подстраиваются под усилие, рельеф и цели.' },
        { title: 'Сигналы восстановления', text: 'Статус восстановления — знай когда давить, а когда отдыхать.' },
      ],
    },
    modules: {
      title: 'Снаряжение', sub: 'Подписка', access: 'Ежемесячный доступ · отмена в любое время', btn: 'Получить доступ',
      items: [
        { id: 'NK-01', title: 'Air Zoom Tech', price: '299', desc: 'Аналитика постановки стопы, возвращающая мощь каждому шагу.' },
        { id: 'NK-02', title: 'Pace Ghost', price: '150', desc: 'Виртуальный тренер по темпу для удержания нужного ритма.' },
        { id: 'NK-03', title: 'Oxygen Flux', price: '199', desc: 'Телеметрия ритма дыхания и насыщения крови кислородом.' },
        { id: 'NK-04', title: 'Vapor HUD', price: '99', desc: 'Минималистичный дисплей в стиле лимитированных дропов.' },
        { id: 'NK-05', title: 'Stamina Core', price: '120', desc: 'Прогнозирование выносливости на основе алгоритмов нагрузки.' },
        { id: 'NK-06', title: 'Track Master', price: '250', desc: 'Оптимизация маршрута для стадиона и улицы.' },
      ],
    },
    included: {
      tag: 'Что включено',
      title: 'Подписка на будущее беговой оптики.',
      sub: 'Стань частью экосистемы VR-бегунов с живыми метриками, адаптивным коучингом и премиальными визуальными функциями.',
      items: [
        { title: 'ЖИВЫЕ МЕТРИКИ', sub: 'Иммерсивные тренировки', text: 'VR-оверлеи держат твой бег чётким, сфокусированным и визуальным.' },
        { title: 'АДАПТИВНЫЙ КОУЧИНГ', sub: 'Умный коучинг', text: 'Каждый шаг анализируется, каждая сессия настраивается под твой рост.' },
        { title: 'СИГНАЛЫ ВОССТАНОВЛЕНИЯ', sub: 'Аналитика восстановления', text: 'Умные сигналы восстановления помогают тренироваться сильнее и быстрее восстанавливаться.' },
      ],
      footnote: 'Начни свой первый месяц в VR Running Lab.',
      btn: 'Начать сейчас',
    },
    reviews: {
      tag: 'Доверяют бегуны', title: 'С дороги — в лабораторию бега.',
      sub: 'Элитные спортсмены и обычные бегуны используют Vision Run чтобы тренироваться умнее и всегда быть впереди.',
      tags: ['Живой оверлей маршрута', 'Адаптивный коучинг', 'Аналитика восстановления'],
      items: [
        { text: '"VR-линзы превратили каждую пробежку в сессию про-уровня. Данные, маршрут и фокус — всё в одном."', author: '— Мила Вест, атлет на выносливость' },
        { text: '"Наконец гарнитура, которая понимает бег. Каждая миля ощущается осознанной и выверенной."', author: '— Алекс Рид, тренер' },
      ],
    },
    footer: {
      tag: 'Vision Run', title: 'Создано для бегунов, которым важна каждая пробежка.',
      sub: 'Собираем данные в реальном времени, подстраиваем тренировки и помогаем лучше чувствовать своё тело без лишнего шума.',
      contact: 'Контакты', follow: 'Соцсети', copy: '© 2026 Vision Run', tagline: 'Быстрее. Сильнее. Без тормозов.',
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const l = t[lang];

  const bgFilter = 'brightness(1.08) saturate(1.15) contrast(1.05)';
  const [titleVisible, setTitleVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const { ref: howRef, inView: howInView } = useInView();
  const { ref: modulesRef, inView: modulesInView } = useInView();
  const { ref: includedRef, inView: includedInView } = useInView();
  const { ref: reviewsRef, inView: reviewsInView } = useInView();
  const { ref: footerRef, inView: footerInView } = useInView();

  const bpm = useCountUp(168);
  const speed = useCountUp(18.5);
  const energy = useCountUp(74);
  const batteryLevel = `${Math.max(12, Math.min(energy, 100))}%`;
  const speedNeedleAngle = ((Math.min(speed, 20) / 20) * 180 - 90).toFixed(1);

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-orange-600 overflow-x-hidden relative scroll-smooth text-white">

      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-20 bg-black/50 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-white font-black transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-default">Vision Run</p>
          <nav className="hidden gap-8 md:flex text-sm uppercase tracking-[0.35em] text-white/80">
            <a href="#how-it-works" className="text-sm font-semibold leading-6 text-white/60 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{l.nav.how}</a>
            <a href="#modules" className="text-sm font-semibold leading-6 text-white/60 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{l.nav.modules}</a>
            <a href="#testimonials" className="text-sm font-semibold leading-6 text-white/60 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{l.nav.reviews}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-all duration-300 border border-white/10 rounded-full px-3 py-1.5 hover:border-white/40"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>
            <a href="#modules" className="inline-block rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:scale-105">{l.nav.cta}</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center px-4 pt-24">
        <div className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop')", filter: bgFilter }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 z-[1]" />
        <div className="relative z-10 w-full max-w-5xl">
          <div className="border-l-4 border-orange-600 pl-8 md:pl-12 animate-[fadeIn_1s_ease-out]">
            <div className="mb-12">
              <div className="mb-4">
                <p className="text-orange-500 font-mono text-xs tracking-[0.6em] uppercase font-bold animate-pulse">{l.hero.tag}</p>
              </div>
              <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-4">
                <AnimatedText text="Run Beyond " color="text-white" delay={0} visible={titleVisible} />
                <br />
                <AnimatedText text="Reality" color="text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]" delay={600} visible={titleVisible} />
              </h1>
              <p className="max-w-2xl text-sm text-white/60 mb-6 leading-relaxed">{l.hero.sub}</p>
              <div className="h-2 w-32 bg-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* BPM */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-[inset_0_0_45px_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-red-400/50 hover:bg-red-950/20">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500/70 via-transparent to-red-500/70 opacity-80 animate-[pulseLine_2.4s_linear_infinite]" />
                <p className="relative text-[10px] font-black text-red-300 uppercase tracking-widest mb-3">{l.hud.bpm}</p>
                <div className="relative flex items-baseline gap-3">
                  <span className="text-8xl font-black italic tracking-tighter text-red-400 animate-[heartbeat_1.2s_ease-in-out_infinite]">{bpm.toFixed(0)}</span>
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)] animate-ping" />
                </div>
                <p className="text-[10px] font-mono text-white/40 mt-4 uppercase tracking-[0.3em]">{l.hud.bpmAnnot}</p>
              </div>
              {/* KMH */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-8 shadow-[inset_0_0_30px_rgba(56,189,248,0.08),0_24px_80px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-cyan-400/60 hover:bg-cyan-950/15">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/60 via-transparent to-cyan-400/60 opacity-70 animate-[flowLine_3s_linear_infinite]" />
                <p className="relative text-[10px] font-black text-cyan-300 uppercase tracking-widest mb-3">{l.hud.kmh}</p>
                <div className="relative flex items-baseline gap-3">
                  <span className="text-6xl font-black italic tracking-tighter text-cyan-300">{speed.toFixed(1)}</span>
                  <span className="text-sm text-cyan-200 uppercase tracking-[0.35em] mt-3">{l.hud.kmh}</span>
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative w-16 h-16 rounded-full bg-white/5 border border-cyan-300/20">
                    <div className="absolute inset-0 rounded-full bg-black/70 border border-white/10" />
                    <div className="absolute left-1/2 bottom-1/2 h-8 w-1.5 bg-cyan-300 rounded-full" style={{ transform: `translateX(-50%) rotate(${speedNeedleAngle}deg)`, transformOrigin: 'bottom center', animation: 'speedNeedleSpin 3s linear infinite' }} />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.45)]" />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-white/40 mt-4 uppercase tracking-[0.3em]">{l.hud.kmhAnnot}</p>
              </div>
              {/* ENERGY */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-[inset_0_0_30px_rgba(16,185,129,0.08),0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-emerald-400/60 hover:bg-emerald-950/15">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400/60 via-transparent to-emerald-400/60 opacity-70 animate-[flowLine_3.4s_linear_infinite]" />
                <p className="relative text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-3">{l.hud.charge}</p>
                <div className="relative flex items-center gap-4">
                  <span className="text-7xl font-black italic tracking-tighter text-white">{energy.toFixed(0)}%</span>
                  <div className="relative w-20 h-8 rounded-[0.85rem] border border-emerald-400/50 bg-white/5 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-emerald-400/70 animate-pulse" style={{ width: batteryLevel }} />
                    <div className="absolute right-0 top-1/2 h-3 w-1 rounded-r-sm bg-emerald-300/80 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-white/40 mt-4 uppercase tracking-[0.3em]">{l.hud.chargeAnnot}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" ref={howRef as React.RefObject<HTMLElement>} className={`max-w-7xl mx-auto px-6 py-24 text-white transition-all duration-700 ${howInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-400 mb-3">{l.how.tag}</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">{l.how.title}</h2>
          <p className="text-sm text-white/70 leading-relaxed">{l.how.sub}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {l.how.features.map((item, i) => (
            <div key={i} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-cyan-400/50 hover:bg-white/10">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200 mb-4">{item.title}</p>
              <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" ref={modulesRef as React.RefObject<HTMLElement>} className={`max-w-7xl mx-auto px-6 py-32 relative z-10 bg-black/90 transition-all duration-700 ${modulesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="flex items-center gap-6 mb-20">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">{l.modules.title}</h2>
          <div className="h-[2px] flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {l.modules.items.map((mod) => (
            <div key={mod.id} className="group relative">
              <div className="relative h-full bg-[#111] border border-white/5 border-t-4 border-t-transparent p-10 rounded-xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-cyan-400/60 hover:bg-white/10 hover:shadow-[0_24px_60px_rgba(34,211,238,0.18)]">
                <div className="flex justify-between items-start mb-12 gap-6">
                  <span className="font-mono text-xs text-white/30 uppercase tracking-[0.35em]">{mod.id}</span>
                  <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">{l.modules.sub}</span>
                </div>
                <h3 className="text-3xl font-black uppercase italic mb-4 leading-none tracking-tight text-white">{mod.title}</h3>
                <p className="text-white/60 text-sm font-medium uppercase leading-relaxed mb-8 group-hover:text-white transition-colors">{mod.desc}</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-8">{l.modules.access}</p>
                <button className="w-full py-5 bg-cyan-400 text-black font-black uppercase italic text-xs tracking-widest hover:bg-cyan-300 transition-all transform active:scale-95 shadow-xl">{l.modules.btn}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDED */}
      <section ref={includedRef as React.RefObject<HTMLElement>} className={`max-w-7xl mx-auto px-6 pb-24 relative z-10 transition-all duration-700 ${includedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="rounded-[3rem] border border-white/10 bg-[#050b15]/80 p-10 md:p-14 shadow-[0_0_80px_rgba(0,0,0,0.28)] transition-all duration-500">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-4">{l.included.tag}</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">{l.included.title}</h2>
              <p className="max-w-xl text-sm text-white/70 leading-relaxed">{l.included.sub}</p>
            </div>
            <div className="grid gap-4">
              {l.included.items.map((item, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer">
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-2">{item.title}</p>
                    <p className="text-sm font-bold text-white mb-1">{item.sub}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:w-full" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">{l.included.footnote}</p>
            <button className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-white hover:scale-105 active:scale-95">{l.included.btn}</button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="testimonials" ref={reviewsRef as React.RefObject<HTMLElement>} className={`max-w-7xl mx-auto px-6 pb-24 pt-12 relative z-10 transition-all duration-700 ${reviewsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="rounded-[3rem] border border-white/10 bg-[#050b15]/80 p-10 md:p-14 shadow-[0_0_90px_rgba(0,0,0,0.28)] transition-all duration-500 hover:shadow-[0_0_110px_rgba(34,211,238,0.18)]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80 mb-4">{l.reviews.tag}</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">{l.reviews.title}</h2>
              <p className="max-w-xl text-sm text-white/70 leading-relaxed">{l.reviews.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {l.reviews.tags.map((tag, i) => (
                  <span key={i} className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] border ${i === 0 ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' : i === 2 ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/70'}`}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {l.reviews.items.map((item, i) => (
                <blockquote key={i} className="group rounded-3xl border border-white/10 bg-[#08131e]/90 p-8 text-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 transform cursor-pointer hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)] hover:bg-white/10">
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-200">{item.text}</p>
                  <footer className="mt-6 text-sm uppercase tracking-[0.35em] text-white/50 group-hover:text-white/70">{item.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer ref={footerRef as React.RefObject<HTMLElement>} className={`max-w-7xl mx-auto px-6 py-20 text-white transition-all duration-700 ${footerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] border-t border-white/10 pt-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-400 mb-4">{l.footer.tag}</p>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{l.footer.title}</h2>
            <p className="max-w-xl text-sm text-white/70 leading-relaxed">{l.footer.sub}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">{l.footer.contact}</p>
              <p className="text-sm text-white/70">hello@visionrun.com</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">{l.footer.follow}</p>
              <p className="text-sm text-white/70">Instagram · Telegram · VK</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.35em] text-white/40 sm:flex-row sm:justify-between">
          <span>{l.footer.copy}</span>
          <span>{l.footer.tagline}</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes pulseLine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes flowLine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes speedNeedleSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
        body { background-color: #000000; background-image: none; margin: 0; padding: 0; overflow-x: hidden; }
      `}</style>
    </main>
  );
}