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

const t = {
  en: {
    nav: { how: 'How it works', modules: 'Gear Up', reviews: 'Reviews', cta: 'Start Training' },
    hero: { tag: 'Vision Sync: Active', sub: 'Premium AR running glasses for athletes. Live telemetry, route overlays, and immersive feedback — built for the future of training.' },
    hud: {
      bpm: 'BPM', bpmAnnot: 'Biometric pulse stream · high fidelity',
      kmh: 'Km/h', kmhAnnot: 'Aerodynamic pace control · velocity locked',
      charge: 'Charge', chargeAnnot: 'Energy reserve online · ready for surge',
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
        { title: 'LIVE METRICS', sub: 'Immersive training', text: 'Live overlays keep your run aligned, focused, and fully visual.' },
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
    stats: { ms: 'Response latency', sensors: 'Biometric sensors', battery: 'Battery life' },
  },
  ru: {
    nav: { how: 'Как это работает', modules: 'Снаряжение', reviews: 'Отзывы', cta: 'Начать' },
    hero: { tag: 'Vision Sync: Активен', sub: 'Премиальные AR-очки для бегунов. Живая телеметрия, наложение маршрутов и иммерсивная обратная связь — для тренировок будущего.' },
    hud: {
      bpm: 'УД/МИН', bpmAnnot: 'Биометрический поток пульса · точность',
      kmh: 'КМ/Ч', kmhAnnot: 'Аэродинамический контроль темпа · зафиксирован',
      charge: 'Заряд', chargeAnnot: 'Энергорезерв онлайн · готов к рывку',
    },
    how: {
      tag: 'Как это работает', title: 'Умный бег, просто.',
      sub: 'Vision Run объединяет метрики в реальном времени, адаптивные подсказки и сигналы восстановления в одном интерфейсе, чтобы тренировки были ясными и продуктивными.',
      features: [
        { title: 'Живые метрики', text: 'Мгновенные данные о пульсе, темпе и энергии прямо в HUD-оверлее.' },
        { title: 'Адаптивные подсказки', text: 'Сигналы, которые подстраиваются под усилие, рельеф и цели.' },
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
        { title: 'ЖИВЫЕ МЕТРИКИ', sub: 'Иммерсивные тренировки', text: 'Оверлеи держат твой бег чётким, сфокусированным и визуальным.' },
        { title: 'АДАПТИВНЫЙ КОУЧИНГ', sub: 'Умный коучинг', text: 'Каждый шаг анализируется, каждая сессия настраивается под твой рост.' },
        { title: 'СИГНАЛЫ ВОССТАНОВЛЕНИЯ', sub: 'Аналитика восстановления', text: 'Умные сигналы восстановления помогают тренироваться сильнее.' },
      ],
      footnote: 'Начни свой первый месяц в VR Running Lab.',
      btn: 'Начать сейчас',
    },
    reviews: {
      tag: 'Доверяют бегуны', title: 'С дороги — в лабораторию бега.',
      sub: 'Элитные спортсмены и обычные бегуны используют Vision Run чтобы тренироваться умнее и всегда быть впереди.',
      tags: ['Живой оверлей маршрута', 'Адаптивный коучинг', 'Аналитика восстановления'],
      items: [
        { text: '"VR-линзы превратили каждую пробежку в сессию про-уровня. Данные, маршрут и фокус — всё в одном."', author: '— Мила Вест, атлет' },
        { text: '"Наконец гарнитура, которая понимает бег. Каждая миля ощущается осознанной и выверенной."', author: '— Алекс Рид, тренер' },
      ],
    },
    footer: {
      tag: 'Vision Run', title: 'Создано для бегунов, которым важна каждая пробежка.',
      sub: 'Данные в реальном времени, адаптивные тренировки и осознанность тела — без лишнего шума.',
      contact: 'Контакты', follow: 'Соцсети', copy: '© 2026 Vision Run', tagline: 'Быстрее. Сильнее. Без тормозов.',
    },
    stats: { ms: 'Время отклика', sensors: 'Датчиков биометрии', battery: 'Время работы' },
  },
};

// ─── Swap these URLs for your own cover images ──────────────────────────────
const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
];
// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ru'>('ru');
  const l = t[lang];

  // ── HUD live values ──────────────────────────────────────────────────────
  const bpm    = useCountUp(168);
  const speed  = useCountUp(18.5);
  const energy = useCountUp(74);

  const [bpmHovering,     setBpmHovering]     = useState(false);
  const [speedHovering,   setSpeedHovering]   = useState(false);
  const [batteryHovering, setBatteryHovering] = useState(false);
  const [bpmLive,     setBpmLive]     = useState(168);
  const [speedLive,   setSpeedLive]   = useState(18.5);
  const [batteryLive, setBatteryLive] = useState(74);
  const [speedBars, setSpeedBars] = useState([0.45, 0.72, 0.55, 0.88, 0.63, 0.78, 0.70, 0.60]);

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
      const GAP = () => window.innerWidth < 640 ? 150 : window.innerWidth < 1024 ? 190 : 235;

      const qX   = cfCards.map(c => gsap.quickSetter(c, 'x',       'px'));
      const qRY  = cfCards.map(c => gsap.quickSetter(c, 'rotateY', 'deg'));
      const qScl = cfCards.map(c => gsap.quickSetter(c, 'scale'));
      const qAlp = cfCards.map(c => gsap.quickSetter(c, 'autoAlpha'));
      const qDim = cfDims.map(d  => gsap.quickSetter(d, 'opacity'));
      let lastSnapped = 0;

      const updateCF = (val: number) => {
        const snapped = Math.round(Math.max(0, Math.min(N - 1, val)));
        const g = GAP();
        cfCards.forEach((_c, i) => {
          const off  = i - val;
          const aOff = Math.abs(off);
          qX[i](off * g);
          qRY[i](-off * 50);
          qScl[i](Math.max(0.65, 1 - aOff * 0.14));
          qAlp[i](aOff > 2.7 ? 0 : 1);
          if (qDim[i]) qDim[i](Math.min(0.72, aOff * 0.32));
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
          cf.val = Math.max(0, Math.min(N - 1, cf.val - this.deltaX / GAP()));
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

      // ── Testimonials ──────────────────────────────────────────────────────
      gsap.fromTo('#review-left',  { x: -50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '#testimonials', start: 'top 80%', end: 'top 50%', scrub: 0.6 } });
      gsap.fromTo('#review-right', { x:  50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '#testimonials', start: 'top 75%', end: 'top 40%', scrub: 0.7 } });

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

  const batteryLevel = `${Math.max(12, Math.min(batteryHovering ? batteryLive : energy, 100))}%`;

  return (
    <main className="bg-black text-white overflow-x-hidden">

      <style jsx global>{`
        @keyframes heartbeat  { 0%, 100% { transform: scale(1); }    50% { transform: scale(1.08); } }
        @keyframes pulseLine  { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes flowLine   { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes ekgScroll  { from { transform: translateX(0%); }  to   { transform: translateX(-50%); } }
        @keyframes blink      { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        html { scroll-behavior: smooth; }
        body { background: #000; margin: 0; padding: 0; overflow-x: hidden; }
        .hero-panel { will-change: transform, opacity; }
      `}</style>

      {/* Scroll progress */}
      <div id="scroll-progress" className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-orange-500" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <p className="text-[11px] uppercase tracking-[0.5em] text-white font-black cursor-default">Vision Run</p>
          <nav className="hidden gap-10 md:flex">
            {[
              { href: '#how-it-works', label: l.nav.how },
              { href: '#modules-section', label: l.nav.modules },
              { href: '#testimonials', label: l.nav.reviews },
            ].map(link => (
              <a key={link.href} href={link.href} className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <button onClick={() => setLang(lang === 'en' ? 'ru' : 'en')} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              {lang === 'en' ? 'RU' : 'EN'}
            </button>
            <a href="#modules-section" className="px-6 py-2.5 bg-orange-500 text-black font-black uppercase text-[10px] tracking-[0.35em] hover:bg-white transition-colors">
              {l.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO WRAPPER — scroll distance for pinned panels ────────────────── */}
      <div id="hero-wrapper" style={{ height: 'calc(100vh + 1600px)' }}>
        <section id="hero-section" className="sticky top-0 h-screen w-full overflow-hidden bg-black">

          {/* Shared atmospheric background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_20%,rgba(255,90,0,0.07)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_15%_80%,rgba(255,255,255,0.025)_0%,transparent_70%)]" />
          </div>

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
                <a href="#modules-section" className="px-10 py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.35em] hover:bg-white transition-colors">
                  {l.nav.cta}
                </a>
                <a href="#how-it-works" className="px-10 py-4 border border-white/15 text-white/60 font-black uppercase text-[11px] tracking-[0.35em] hover:border-white/40 hover:text-white transition-colors">
                  {l.nav.how} →
                </a>
              </div>

              {/* Tech specs strip */}
              <div className="mt-14 flex items-center gap-5">
                <div className="h-px w-10 bg-white/15" />
                <span className="text-[9px] uppercase tracking-[0.45em] text-white/20">&lt;12ms · 6 sensors · 8h battery</span>
              </div>
            </div>

            {/* Right — atmospheric runner photo */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[46%] pointer-events-none">
              <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-[0.12]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
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
                    {bpmHovering ? bpmLive : bpm.toFixed(0)}
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
                    {speedHovering ? speedLive.toFixed(1) : speed.toFixed(1)}
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
                    {batteryHovering ? batteryLive : energy.toFixed(0)}%
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

            <a href="#modules-section" className="px-12 py-5 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.4em] hover:bg-white transition-colors">
              {l.nav.cta} →
            </a>

            <div className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.4em] text-white/15">03 / 03</div>
          </div>

        </section>
      </div>

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

        <div id="cf-stage" className="relative w-full select-none" style={{ height: '470px', perspective: '1200px' }}>
          {l.modules.items.map((mod, i) => (
            <div key={mod.id} className="cf-card absolute left-1/2 flex flex-col cursor-pointer" style={{ top: '60px' }}>
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.6)]" style={{ width: '210px', height: '280px' }}>
                <div className="cf-dim absolute inset-0 z-10 bg-black rounded-2xl pointer-events-none" style={{ opacity: 0 }} />
                <img src={COVER_IMAGES[i % COVER_IMAGES.length]} alt={mod.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="font-mono text-[9px] text-orange-400/50 uppercase tracking-[0.4em] mb-1">{mod.id}</p>
                  <h3 className="text-[15px] font-black italic uppercase leading-tight text-white">{mod.title}</h3>
                  <p className="text-[11px] text-white/30 font-mono mt-0.5">${mod.price} / mo</p>
                </div>
              </div>
              <div className="relative pointer-events-none overflow-hidden" style={{ width: '210px', height: '75px' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${COVER_IMAGES[i % COVER_IMAGES.length]})`, backgroundSize: 'cover', backgroundPosition: 'bottom center', transform: 'scaleY(-1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.97) 100%)' }} />
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

      {/* ── INCLUDED ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24 pt-12">
        <div className="rounded-[2.5rem] border border-white/[0.06] bg-white/[0.02] p-10 md:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.included.tag}</p>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.92]">{l.included.title}</h2>
              <p className="max-w-xl text-sm text-white/40 leading-relaxed">{l.included.sub}</p>
            </div>
            <div className="grid gap-3">
              {l.included.items.map((item, i) => (
                <div key={i} className="included-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-orange-500/25 hover:bg-white/[0.05] cursor-pointer">
                  <p className="text-[9px] font-black uppercase tracking-[0.45em] text-orange-500 mb-2">{item.title}</p>
                  <p className="text-sm font-bold text-white mb-1">{item.sub}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.text}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/[0.05] pt-8">
            <p className="text-[9px] uppercase tracking-[0.45em] text-white/25">{l.included.footnote}</p>
            <button className="inline-flex items-center justify-center bg-orange-500 px-8 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-black hover:bg-white transition-colors">
              {l.included.btn}
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <div className="rounded-[2.5rem] border border-white/[0.06] bg-white/[0.02] p-10 md:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div id="review-left">
              <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.reviews.tag}</p>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.92]">{l.reviews.title}</h2>
              <p className="max-w-xl text-sm text-white/40 leading-relaxed">{l.reviews.sub}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {l.reviews.tags.map((tag, i) => (
                  <span key={i} className="rounded-full px-4 py-2 text-[9px] uppercase tracking-[0.35em] border border-white/[0.08] text-white/30">{tag}</span>
                ))}
              </div>
            </div>
            <div id="review-right" className="space-y-4">
              {[
                { text: l.reviews.items[0].text, author: lang === 'en' ? 'Mila West' : 'Мила Вест', role: lang === 'en' ? 'Endurance Athlete' : 'Атлет на выносливость', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
                { text: l.reviews.items[1].text, author: lang === 'en' ? 'Alex Reed' : 'Алекс Рид', role: lang === 'en' ? 'Running Coach' : 'Тренер по бегу', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
              ].map((item, i) => (
                <blockquote key={i} className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/25 cursor-pointer">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-orange-500 text-sm">★</span>)}
                  </div>
                  <p className="text-sm text-white/60 mb-5 leading-relaxed">{item.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.author} className="w-10 h-10 rounded-full object-cover border border-white/[0.08]" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.author}</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">{item.role}</p>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] border-t border-white/[0.06] pt-10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-orange-500 mb-5">{l.footer.tag}</p>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-4 leading-tight text-white">{l.footer.title}</h2>
            <p className="max-w-xl text-sm text-white/35 leading-relaxed">{l.footer.sub}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 content-start">
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/25 mb-3">{l.footer.contact}</p>
              <p className="text-sm text-white/50">hello@visionrun.com</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/25 mb-3">{l.footer.follow}</p>
              <p className="text-sm text-white/50">Instagram · Telegram</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.05] pt-6 text-[9px] uppercase tracking-[0.45em] text-white/20 sm:flex-row sm:justify-between">
          <span>{l.footer.copy}</span>
          <span>{l.footer.tagline}</span>
        </div>
      </footer>

    </main>
  );
}
