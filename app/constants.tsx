import React from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

export interface NavLink   { label: string; href: string }
export interface FooterCol { heading: string; links: NavLink[] }

export interface PricingPlan {
  id: string; name: string;
  monthlyPrice: string; yearlyPrice: string; unit: string;
  label: string; badge: string;
  features: string[];
  cta: string; ctaStyle: 'primary' | 'secondary';
}

export interface ReviewItem {
  text: string; author: string; role: string; img: string;
}

export interface WayItem {
  icon: string; title: string; text: string; cta: string; href: string;
}

export interface ModuleItem {
  id: string; title: string; price: string; desc: string;
}

export interface SocialItem {
  id: string; platform: string; title: string; desc: string; cta: string; href: string;
}

export interface FaqItem { q: string; a: string }

export interface Lang {
  nav:     { how: string; modules: string; reviews: string; cta: string };
  hero:    { tag: string; sub: string };
  hud:     { bpm: string; bpmAnnot: string; kmh: string; kmhAnnot: string; charge: string; chargeAnnot: string };
  how:     { tag: string; title: string; sub: string; features: { title: string; text: string }[] };
  modules: { title: string; sub: string; access: string; btn: string; items: ModuleItem[] };
  ways:    { tag: string; title: string; items: WayItem[] };
  reviews: { tag: string; title: string; sub: string; tags: string[]; items: ReviewItem[] };
  faq:     { tag: string; bannerTitle: string; bannerSub: string; items: FaqItem[] };
  cta:     { tag: string; title: string; sub: string; btn1: string; btn2: string };
  social:  { tag: string; title: string; items: SocialItem[] };
  footer:  { brand: string; sub: string; cols: FooterCol[]; write: string; email: string; follow: string; legal: string[]; copy: string; tagline: string };
  stats:   { ms: string; sensors: string; battery: string };
  pricing: { tag: string; title: string; sub: string; monthly: string; yearly: string; plans: PricingPlan[] };
}

// ── Translations ─────────────────────────────────────────────────────────────

export const t: Record<'en' | 'ru', Lang> = {
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
        { title: 'Live Metrics',       text: 'Instant heart rate, pace and energy data in a clear HUD overlay.' },
        { title: 'Adaptive Guidance',  text: 'Training cues that adjust to your effort, terrain and goals.' },
        { title: 'Recovery Signals',   text: 'Recovery status that tells you when to push and when to rest.' },
      ],
    },
    modules: {
      title: 'Gear Up', sub: 'Subscription', access: 'Monthly access · cancel anytime', btn: 'Unlock Access',
      items: [
        { id: 'VR-01', title: 'Vision Lens Pro',  price: '299', desc: 'Full AR overlay with live BPM, pace and route projected into your field of view.' },
        { id: 'VR-02', title: 'Pace Ghost',        price: '150', desc: 'A virtual AR pacer runs beside you — match its stride to hit your target time.' },
        { id: 'VR-03', title: 'HUD Night Mode',   price: '199', desc: 'High-contrast dark display optimised for low-light and pre-dawn training runs.' },
        { id: 'VR-04', title: 'Biometric Scan',   price: '99',  desc: 'Real-time heart rate, oxygen saturation and stress index — all inside your glasses.' },
        { id: 'VR-05', title: 'Route Vision',     price: '120', desc: 'Turn-by-turn AR navigation overlaid directly on the road ahead of you.' },
        { id: 'VR-06', title: 'Coach Lens',       price: '250', desc: 'Your coach sees exactly what you see — remote real-time feedback via lens stream.' },
      ],
    },
    ways: {
      tag: 'Ways to train', title: 'Your ecosystem.',
      items: [
        { icon: 'app',     title: 'Vision App',  text: 'Plan routes, review sessions and sync all your biometric data. Your complete running dashboard — anywhere you go.', cta: 'Open App',          href: '#modules-section' },
        { icon: 'glasses', title: 'AR Glasses',  text: 'See live BPM, pace and route cues projected into your field of view. No phone needed — just run faster.',          cta: 'Explore Hardware',  href: '#how-it-works' },
        { icon: 'coach',   title: 'Coach Hub',   text: 'Connect your coach, share real-time metrics and let adaptive AI fine-tune every training session automatically.',   cta: 'Start Training',    href: '#modules-section' },
      ],
    },
    reviews: {
      tag: 'Trusted by runners', title: 'From the road to the run lab.',
      sub: 'Elite athletes and everyday runners use Vision Run to train smarter, visualize every session, and stay ahead of the pack.',
      tags: ['Live route overlay', 'Adaptive coaching', 'Recovery insights'],
      items: [
        { text: '"The VR lenses turned every run into a pro-level session. Data, route guidance and focus all in one."',                                   author: 'Mila West',     role: 'Endurance Athlete',   img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
        { text: '"Finally a headset that understands running. Every mile feels guided and intentionally built."',                                          author: 'Alex Reed',     role: 'Running Coach',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
        { text: '"Knocked 4 minutes off my marathon PR in just 8 weeks. The pace ghost feature is unreal."',                                              author: 'Jordan Park',   role: 'Marathon Runner',     img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
        { text: '"Switched from a chest strap and a watch to Vision Run. I will never go back — this is the future."',                                    author: 'Sam Torres',    role: 'Triathlete',          img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
        { text: '"Trail running in complete darkness and still knowing my exact pace and heart-load. Mind-blowing."',                                      author: 'Casey Morgan',  role: 'Trail Runner',        img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=80&h=80&fit=crop&crop=face' },
        { text: '"I coach 12 athletes and every one of them uses Vision Run now. The shared data alone is worth it."',                                    author: 'Taylor Brooks', role: 'Performance Coach',   img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
        { text: '"100 miles at altitude and the oxygen telemetry kept me safe the entire way. Absolute game changer."',                                   author: 'Riley Chen',    role: 'Ultramarathoner',     img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&crop=face' },
        { text: '"The HUD is so clean that it took me one run to forget it is even there — it just becomes instinct."',                                   author: 'Drew Kim',      role: 'Fitness Coach',       img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face' },
      ],
    },
    faq: {
      tag: 'FAQ', bannerTitle: 'Got questions?\nWe\'ve got answers.',
      bannerSub: 'Find out everything about Vision Run — hardware, subscriptions, data privacy and how it fits into your training workflow.',
      items: [
        { q: 'Do the AR glasses work without a smartphone?',         a: 'Yes — the glasses operate fully standalone. BPM, pace and route data are processed on-device in real time. Your phone is only needed for session sync and route planning via the Vision App.' },
        { q: 'What is the battery life during an active session?',   a: 'Up to 8 hours in standard HUD mode. With all six sensors active and the full route overlay enabled, expect around 5–6 hours per session. The charge level is always visible in your HUD.' },
        { q: 'Can I use Vision Run for sports other than running?',  a: 'Vision Run is optimised for running but works great for cycling, trail hiking and triathlon. Custom modules for additional sports are currently in development and will roll out to all Athlete and Elite subscribers first.' },
        { q: 'Is there a free plan and what does it include?',       a: 'Yes. The Starter plan is free forever — no credit card required. It includes live BPM and pace overlay, basic route tracking and access to one module. Upgrade to Athlete or Elite when you\'re ready for the full suite.' },
        { q: 'How do I connect my coach to my training data?',       a: 'Upgrade to the Elite plan, then invite your coach via the Coach Hub. They get real-time read access to all your biometric sessions and can push adaptive training cues directly to your HUD during a live run.' },
        { q: 'How is my biometric data stored and protected?',       a: 'All data is encrypted end-to-end and stored in your personal cloud. Vision Run never sells or shares your biometrics with third parties. You can export or permanently delete everything from your account at any time.' },
      ],
    },
    cta: {
      tag: 'Get started today',
      title: 'Ready to run\nbeyond reality?',
      sub: 'Our team is here to help you unlock the full potential of Vision Run AR training. Reach out or start your free session now.',
      btn1: 'Contact Sales', btn2: 'Start Free',
    },
    social: {
      tag: 'Connect with us', title: 'Join the movement.',
      items: [
        { id: 'TG', platform: 'Telegram',  title: 'Community',     desc: 'Real-time updates, training tips and exclusive drops — straight to your pocket.',                    cta: 'Join Channel', href: 'https://t.me/' },
        { id: 'IG', platform: 'Instagram', title: 'Follow the Run', desc: 'Daily motivation, athlete highlights and behind-the-scenes footage from the track.',                  cta: 'Follow Us',    href: 'https://instagram.com/' },
        { id: 'DC', platform: 'Discord',   title: 'Runner Hub',    desc: 'Connect with athletes worldwide, share sessions and get coached by the community.',                    cta: 'Join Server',  href: 'https://discord.com/' },
      ],
    },
    footer: {
      brand: 'Vision Run',
      sub: 'Real-time data, adaptive training and body awareness — without the noise.',
      cols: [
        { heading: 'Training', links: [{ label: 'How it works', href: '#how-it-works' }, { label: 'Gear Up', href: '#modules-section' }, { label: 'Reviews', href: '#testimonials' }, { label: 'Pricing', href: '#pricing-section' }] },
        { heading: 'Product',  links: [{ label: 'AR Glasses',   href: '#how-it-works' }, { label: 'Vision App', href: '#ways-section' }, { label: 'Coach Hub', href: '#ways-section' }, { label: 'Modules', href: '#modules-section' }] },
        { heading: 'Company',  links: [{ label: 'About',        href: '#how-it-works' }, { label: 'FAQ', href: '#faq-section' }, { label: 'Contact', href: 'mailto:hello@visionrun.com' }, { label: 'Blog', href: '#' }] },
      ],
      write: 'Write to us', email: 'hello@visionrun.com', follow: 'Follow us',
      legal: ['Privacy Policy', 'Terms of Service'],
      copy: '© 2026 Vision Run', tagline: 'Faster. Stronger. No limits.',
    },
    stats: { ms: 'Response latency', sensors: 'Biometric sensors', battery: 'Battery life' },
    pricing: {
      tag: 'Pricing', title: 'Choose your level.', sub: 'Start free. Upgrade when you\'re ready — no lock-in.',
      monthly: 'Monthly', yearly: 'Yearly · save 20%',
      plans: [
        { id: 'STARTER', name: 'Starter', monthlyPrice: '0',  yearlyPrice: '0',  unit: '/mo', label: 'Free forever',           badge: '',        features: ['Live BPM + pace overlay', 'Basic route tracking', '1 module access', 'Community support'],                                               cta: 'Download Free', ctaStyle: 'secondary' },
        { id: 'ATHLETE', name: 'Athlete', monthlyPrice: '29', yearlyPrice: '23', unit: '/mo', label: 'Most popular',           badge: 'Popular', features: ['Full HUD suite', 'Adaptive coaching engine', 'All 6 modules unlocked', 'Recovery signals', 'Priority cloud sync'],                      cta: 'Get Started',   ctaStyle: 'primary'   },
        { id: 'ELITE',   name: 'Elite',   monthlyPrice: '59', yearlyPrice: '47', unit: '/mo', label: 'Maximum performance',    badge: '',        features: ['Everything in Athlete', 'AI pace coach', 'Unlimited profiles', 'Team sharing', 'Early beta access'],                                     cta: 'Get Started',   ctaStyle: 'secondary' },
      ],
    },
  },

  ru: {
    nav: { how: 'Как это работает', modules: 'Снаряжение', reviews: 'Отзывы', cta: 'Начать' },
    hero: { tag: 'Vision Sync: Активен', sub: 'Премиальные AR-очки для бегунов. Живая телеметрия, наложение маршрутов и иммерсивная обратная связь — для тренировок будущего.' },
    hud: {
      bpm: 'УД/МИН', bpmAnnot: 'Биометрический поток пульса · точность',
      kmh: 'КМ/Ч',   kmhAnnot: 'Аэродинамический контроль темпа · зафиксирован',
      charge: 'Заряд', chargeAnnot: 'Энергорезерв онлайн · готов к рывку',
    },
    how: {
      tag: 'Как это работает', title: 'Умный бег, просто.',
      sub: 'Vision Run объединяет метрики в реальном времени, адаптивные подсказки и сигналы восстановления в одном интерфейсе, чтобы тренировки были ясными и продуктивными.',
      features: [
        { title: 'Живые метрики',        text: 'Мгновенные данные о пульсе, темпе и энергии прямо в HUD-оверлее.' },
        { title: 'Адаптивные подсказки', text: 'Сигналы, которые подстраиваются под усилие, рельеф и цели.' },
        { title: 'Сигналы восстановления', text: 'Статус восстановления — знай когда давить, а когда отдыхать.' },
      ],
    },
    modules: {
      title: 'Снаряжение', sub: 'Подписка', access: 'Ежемесячный доступ · отмена в любое время', btn: 'Получить доступ',
      items: [
        { id: 'VR-01', title: 'Vision Lens Pro', price: '299', desc: 'Полный AR-оверлей: ЧСС, темп и маршрут прямо в поле зрения.' },
        { id: 'VR-02', title: 'Pace Ghost',       price: '150', desc: 'Виртуальный пейсмейкер в AR — бежит рядом, задаёт твой ритм.' },
        { id: 'VR-03', title: 'HUD Night Mode',  price: '199', desc: 'Высококонтрастный дисплей для тренировок в темноте и на рассвете.' },
        { id: 'VR-04', title: 'Biometric Scan',  price: '99',  desc: 'Пульс, сатурация и уровень стресса в реальном времени — в очках.' },
        { id: 'VR-05', title: 'Route Vision',    price: '120', desc: 'Навигация с AR-стрелками прямо поверх дороги перед тобой.' },
        { id: 'VR-06', title: 'Coach Lens',      price: '250', desc: 'Тренер видит всё, что видишь ты — удалённый разбор прямо в линзе.' },
      ],
    },
    ways: {
      tag: 'Как использовать', title: 'Твоя экосистема.',
      items: [
        { icon: 'app',     title: 'Vision App', text: 'Планируй маршруты, смотри аналитику и синхронизируй биометрику. Полный беговой дашборд — всегда с тобой.',                      cta: 'Открыть приложение',  href: '#modules-section' },
        { icon: 'glasses', title: 'AR-очки',    text: 'Видь пульс, темп и маршрут прямо в поле зрения. Без телефона — просто надень и беги быстрее.',                                  cta: 'О железе',            href: '#how-it-works' },
        { icon: 'coach',   title: 'Coach Hub',  text: 'Подключи тренера, делись данными в реальном времени и доверь AI настройку каждой сессии.',                                      cta: 'Начать тренировки',   href: '#modules-section' },
      ],
    },
    reviews: {
      tag: 'Доверяют бегуны', title: 'С дороги — в лабораторию бега.',
      sub: 'Элитные спортсмены и обычные бегуны используют Vision Run чтобы тренироваться умнее и всегда быть впереди.',
      tags: ['Живой оверлей маршрута', 'Адаптивный коучинг', 'Аналитика восстановления'],
      items: [
        { text: '"VR-линзы превратили каждую пробежку в сессию про-уровня. Данные, маршрут и фокус — всё в одном."',                                author: 'Мила Вест',     role: 'Атлет на выносливость',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
        { text: '"Наконец гарнитура, которая понимает бег. Каждая миля ощущается осознанной и выверенной."',                                       author: 'Алекс Рид',     role: 'Тренер по бегу',         img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
        { text: '"Сбросил 4 минуты с личника на марафоне всего за 8 недель. Функция Pace Ghost — просто нереальная."',                             author: 'Джордан Пак',   role: 'Марафонец',              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
        { text: '"Я заменил нагрудный датчик и часы на Vision Run. Назад не вернусь — это и есть будущее."',                                       author: 'Сэм Торрес',    role: 'Триатлет',               img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
        { text: '"Трейлы в полной темноте и полное понимание темпа и нагрузки на сердце. Это просто поражает."',                                   author: 'Кейси Морган',  role: 'Трейлраннер',            img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=80&h=80&fit=crop&crop=face' },
        { text: '"Я тренирую 12 атлетов, и все они теперь на Vision Run. Только синхронизация данных уже окупает всё."',                          author: 'Тейлор Брукс',  role: 'Перформанс-тренер',      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
        { text: '"100 миль на высотных трассах — и телеметрия кислорода держала меня в безопасности весь путь."',                                  author: 'Райли Чен',     role: 'Ультрамарафонец',        img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&crop=face' },
        { text: '"HUD настолько чистый, что уже после первой пробежки я забыл, что он есть — он просто становится инстинктом."',                   author: 'Дрю Ким',       role: 'Фитнес-тренер',          img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face' },
      ],
    },
    faq: {
      tag: 'FAQ', bannerTitle: 'Остались\nвопросы?',
      bannerSub: 'Всё о Vision Run — железо, подписки, конфиденциальность данных и как система вписывается в твой тренировочный процесс.',
      items: [
        { q: 'AR-очки работают без смартфона?',                          a: 'Да — очки работают полностью автономно. Пульс, темп и маршрут обрабатываются прямо на устройстве в реальном времени. Телефон нужен только для синхронизации сессий и планирования маршрутов в Vision App.' },
        { q: 'Сколько держит батарея во время тренировки?',              a: 'До 8 часов в стандартном HUD-режиме. При активных шести датчиках и включённом оверлее маршрута — около 5–6 часов на сессию. Уровень заряда всегда виден в HUD.' },
        { q: 'Можно ли использовать Vision Run не только для бега?',     a: 'Vision Run оптимизирован под бег, но отлично работает для велоспорта, трейлхайкинга и триатлона. Кастомные модули для дополнительных видов спорта сейчас в разработке — они выйдут первыми для подписчиков Athlete и Elite.' },
        { q: 'Есть ли бесплатный план и что в него входит?',             a: 'Да. Тариф Starter — бесплатно навсегда, без привязки карты. Включает живой оверлей пульса и темпа, базовую запись маршрута и доступ к одному модулю. Прокачай до Athlete или Elite когда будешь готов.' },
        { q: 'Как подключить тренера к моим тренировочным данным?',      a: 'Перейди на тариф Elite и пригласи тренера через Coach Hub. Он получит доступ ко всем биометрическим сессиям в реальном времени и сможет отправлять адаптивные подсказки прямо в твой HUD во время пробежки.' },
        { q: 'Как хранятся и защищаются мои биометрические данные?',     a: 'Все данные шифруются end-to-end и хранятся в твоём персональном облаке. Vision Run никогда не продаёт и не передаёт биометрику третьим лицам. Ты можешь экспортировать или полностью удалить данные из аккаунта в любой момент.' },
      ],
    },
    cta: {
      tag: 'Начни сегодня',
      title: 'Готов бежать\nза горизонт?',
      sub: 'Наша команда поможет раскрыть весь потенциал AR-тренировок Vision Run. Свяжись с нами или начни бесплатно прямо сейчас.',
      btn1: 'Связаться', btn2: 'Начать бесплатно',
    },
    social: {
      tag: 'Свяжись с нами', title: 'Присоединяйся.',
      items: [
        { id: 'TG', platform: 'Telegram',  title: 'Сообщество',    desc: 'Новости, советы по тренировкам и эксклюзивные анонсы — прямо в кармане.',              cta: 'Вступить',         href: 'https://t.me/' },
        { id: 'IG', platform: 'Instagram', title: 'Следи за бегом', desc: 'Ежедневная мотивация, истории атлетов и закулисье с беговых трасс.',                  cta: 'Подписаться',      href: 'https://instagram.com/' },
        { id: 'DC', platform: 'Discord',   title: 'Runner Hub',    desc: 'Общайся с атлетами со всего мира, делись сессиями и получай советы от комьюнити.',      cta: 'Войти на сервер',  href: 'https://discord.com/' },
      ],
    },
    footer: {
      brand: 'Vision Run',
      sub: 'Данные в реальном времени, адаптивные тренировки и осознанность тела — без лишнего шума.',
      cols: [
        { heading: 'Тренировки', links: [{ label: 'Как это работает', href: '#how-it-works' }, { label: 'Снаряжение', href: '#modules-section' }, { label: 'Отзывы', href: '#testimonials' }, { label: 'Тарифы', href: '#pricing-section' }] },
        { heading: 'Продукт',   links: [{ label: 'AR-очки',          href: '#how-it-works' }, { label: 'Vision App', href: '#ways-section' }, { label: 'Coach Hub', href: '#ways-section' }, { label: 'Модули', href: '#modules-section' }] },
        { heading: 'Компания',  links: [{ label: 'О нас',             href: '#how-it-works' }, { label: 'FAQ', href: '#faq-section' }, { label: 'Контакты', href: 'mailto:hello@visionrun.com' }, { label: 'Блог', href: '#' }] },
      ],
      write: 'Написать нам', email: 'hello@visionrun.com', follow: 'Соцсети',
      legal: ['Политика конфиденциальности', 'Условия использования'],
      copy: '© 2026 Vision Run', tagline: 'Быстрее. Сильнее. Без тормозов.',
    },
    stats: { ms: 'Время отклика', sensors: 'Датчиков биометрии', battery: 'Время работы' },
    pricing: {
      tag: 'Тарифы', title: 'Выбери свой уровень.', sub: 'Начни бесплатно. Прокачайся когда будешь готов — без привязки.',
      monthly: 'Помесячно', yearly: 'Ежегодно · скидка 20%',
      plans: [
        { id: 'STARTER', name: 'Starter', monthlyPrice: '0',  yearlyPrice: '0',  unit: '/мес', label: 'Бесплатно',                    badge: '',         features: ['Живой пульс и темп оверлей', 'Базовая запись маршрута', 'Доступ к 1 модулю', 'Поддержка сообщества'],                                    cta: 'Скачать бесплатно', ctaStyle: 'secondary' },
        { id: 'ATHLETE', name: 'Athlete', monthlyPrice: '29', yearlyPrice: '23', unit: '/мес', label: 'Самый популярный',             badge: 'Популярно', features: ['Полный HUD-комплект', 'Адаптивный коучинг', 'Все 6 модулей', 'Сигналы восстановления', 'Приоритетная синхронизация'],           cta: 'Начать',            ctaStyle: 'primary'   },
        { id: 'ELITE',   name: 'Elite',   monthlyPrice: '59', yearlyPrice: '47', unit: '/мес', label: 'Максимальная производительность', badge: '',        features: ['Всё из Athlete', 'ИИ-тренер темпа', 'Безлимитные профили', 'Командный доступ', 'Ранний бета-доступ'],                             cta: 'Начать',            ctaStyle: 'secondary' },
      ],
    },
  },
};

// ── Cover images ─────────────────────────────────────────────────────────────

export const COVER_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop',
];

// ── Configurator modes ────────────────────────────────────────────────────────

export interface Mode {
  id:     string;
  label:  string;
  stat:   string;
  statRu: string;
  desc:   string;
  descRu: string;
  accent: string;
  icon:   React.ReactNode;
}

export const MODES: Mode[] = [
  {
    id: 'trail', label: 'Trail', stat: '98% terrain read', statRu: '98% рельеф',
    desc:   'Adaptive contrast for uneven terrain, forest paths and elevation shifts.',
    descRu: 'Адаптивный контраст для пересечённой местности, лесных троп и перепадов высот.',
    accent: '#10b981',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 4 4-6 4 6" /><path d="M3 20h18" />
      </svg>
    ),
  },
  {
    id: 'city', label: 'City', stat: '< 8 ms nav lag', statRu: '< 8 мс навигация',
    desc:   'Real-time AR turn-by-turn overlay with traffic data synced to your pace.',
    descRu: 'AR-навигация в реальном времени с данными о трафике, синхронизированными с темпом.',
    accent: '#3b82f6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="4" height="11" /><rect x="10" y="6" width="4" height="15" /><rect x="17" y="3" width="4" height="18" /><path d="M1 21h22" />
      </svg>
    ),
  },
  {
    id: 'night', label: 'Night', stat: '+40% contrast', statRu: '+40% контраст',
    desc:   '+40% contrast boost with infrared edge detection for zero-light visibility.',
    descRu: '+40% усиление контраста и инфракрасное определение границ для видимости в темноте.',
    accent: '#8b5cf6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: 'sprint', label: 'Sprint', stat: '100 ms splits', statRu: '100 мс сплиты',
    desc:   'Minimal HUD, maximum pace — live split times refreshed every 100 milliseconds.',
    descRu: 'Минимальный HUD, максимальный темп — сплиты в реальном времени каждые 100 мс.',
    accent: '#f97316',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

// ── Showcase models ───────────────────────────────────────────────────────────

export interface ShowcaseModel {
  id:     string;
  tag:    string;
  name:   string;
  nameRu: string;
  desc:   string;
  descRu: string;
  accent: string;
  price:  string;
}

export const SHOWCASE_MODELS: ShowcaseModel[] = [
  { id: 'vr01', tag: 'VR-01', name: 'Vision Lens Pro',  nameRu: 'Vision Lens Pro',  desc: 'Flagship AR overlay — live BPM, pace and route projected into your field of view.',          descRu: 'Флагманский AR-оверлей — пульс, темп и маршрут прямо в поле зрения.',           accent: '#f97316', price: '299' },
  { id: 'vr02', tag: 'VR-02', name: 'Pace Ghost',        nameRu: 'Pace Ghost',        desc: 'Ultralight frame with a virtual AR pacer running stride-for-stride beside you.',             descRu: 'Сверхлёгкая оправа с виртуальным AR-пейсмейкером рядом.',                       accent: '#06b6d4', price: '199' },
  { id: 'vr03', tag: 'VR-03', name: 'HUD Night',         nameRu: 'HUD Night',         desc: 'Infrared-enhanced contrast mode — +40% visibility for pre-dawn and evening runs.',          descRu: 'Инфракрасный контраст — +40% видимости для ранних и вечерних пробежек.',         accent: '#8b5cf6', price: '249' },
  { id: 'vr04', tag: 'VR-04', name: 'Sprint Edition',    nameRu: 'Sprint Edition',    desc: 'Aero-optimised minimal HUD — split times refreshed every 100 milliseconds.',                descRu: 'Аэро-оптимизированный минимальный HUD — сплиты каждые 100 мс.',                  accent: '#3b82f6', price: '219' },
  { id: 'vr05', tag: 'VR-05', name: 'Alpine Pro',        nameRu: 'Alpine Pro',        desc: 'Terrain-adaptive display calibrated for trail, mountain and off-road sessions.',            descRu: 'Адаптивный дисплей для трейла, гор и бездорожья.',                               accent: '#10b981', price: '279' },
];

// ── Showcase config options ───────────────────────────────────────────────────

export const FRAME_STROKES: Record<string, string> = {
  'Carbon':        'rgba(80,80,80,0.65)',
  'Ghost White':   'rgba(225,225,225,0.80)',
  'Vision Orange': '#f97316',
};

export const TINT_OPS: Record<string, number> = {
  'Clear':       0.22,
  'Dark':        0.72,
  'Photochromic':0.45,
};

// ── Slide animation variants (shared by VisionShowcase) ──────────────────────

export const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? 180 : -180, opacity: 0, scale: 0.88 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -180 : 180, opacity: 0, scale: 0.88 }),
};
