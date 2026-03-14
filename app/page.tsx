"use client";
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// ── ICONS ────────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#FF6A00] flex-shrink-0 drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">
    <circle cx="10" cy="10" r="9" stroke="#FF6A00" strokeWidth="1.5" />
    <path d="M6 10l3 3 5-5" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
    <circle cx="10" cy="10" r="9" stroke="#444" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#666" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { number: '+340%', label: 'aumento médio em conversão' },
  { number: '72h', label: 'entrega garantida' },
  { number: '98%', label: 'clientes satisfeitos' },
  { number: '5+', label: 'páginas entregues' },
];

const PROBLEMS = [
  { bad: 'Página bonita que não vende nada', good: 'Copy estratégico que converte visitas em clientes' },
  { bad: 'Template genérico igual ao concorrente', good: 'Identidade visual única e memorável' },
  { bad: 'Carregamento lento = cliente perdido', good: 'Performance 95+ no PageSpeed — nada trava' },
  { bad: 'Sem estratégia de CTA — o lead some', good: 'Funil visual que guia e converte' },
];

const SERVICES = [
  {
    icon: '⚡',
    title: 'Landing Page Express',
    desc: 'Para quem precisa vender rápido. Uma página focada, objetiva e que converte.',
    tags: ['1 página', 'Copy incluso', '72h entrega'],
  },
  {
    icon: '🔥',
    title: 'Landing Page Premium',
    desc: 'Estrutura completa com seções estratégicas, animações e integrações.',
    tags: ['Multi-section', 'Animações', 'Pixel + CRM'],
    highlight: true,
  },
  {
    icon: '🚀',
    title: 'Funil Completo',
    desc: 'Da captura ao checkout — páginas conectadas em funil de alta conversão.',
    tags: ['3–5 páginas', 'Thank you page', 'Upsell incluso'],
  },
];

const PLANS = [
  {
    name: 'Express',
    price: 'R$ 497',
    desc: 'Ideal para validar oferta rápido',
    features: ['1 landing page', 'Copy estratégico', 'Responsivo mobile', 'Entrega em 72h', '1 revisão'],
    cta: 'Quero o Express',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'R$ 997',
    desc: 'O mais escolhido — máxima conversão',
    features: ['Landing page completa', 'Copy + estrutura visual', 'Animações premium', '3 revisões', 'Suporte 30 dias'],
    cta: 'Quero o Premium',
    highlight: true,
  },
  {
    name: 'Funil',
    price: 'R$ 1.997',
    desc: 'Para quem quer escalar de verdade',
    features: ['Até 5 páginas', 'Funil completo', 'Automação de e-mail', 'Revisões ilimitadas', 'Suporte 60 dias'],
    cta: 'Quero o Funil',
    highlight: false,
  },
];

const MARQUEE_ITEMS = [
  'ALTA CONVERSÃO', '•', 'AUTORIDADE', '•', 'DESIGN CINEMATOGRÁFICO', '•',
  'POSICIONAMENTO', '•', 'RESULTADOS REAIS', '•', 'SEU NEGÓCIO', '•',
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      }, 100);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── STYLES ──
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    :root {
      --brand: #FF6A00;
      --brand-dark: #cc5500;
      --bg: #050505;
    }
    body {
      background-color: var(--bg);
      color: #F4F4F5;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
    
    /* CURSOR SURREAL */
    .cursor-dot, .cursor-ring {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      will-change: transform;
    }
    .cursor-dot {
      width: 8px; height: 8px;
      background: var(--brand);
      border-radius: 50%;
      margin: -4px 0 0 -4px;
      box-shadow: 0 0 10px var(--brand);
    }
    .cursor-ring {
      width: 44px; height: 44px;
      border: 1px solid rgba(255,106,0,0.5);
      border-radius: 50%;
      margin: -22px 0 0 -22px;
      transition: width 0.2s, height 0.2s;
    }
    
    /* GRIDS & BLOBS */
    .bg-grid {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    }
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.2;
      animation: float 12s infinite alternate ease-in-out;
      pointer-events: none;
    }
    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(50px, -50px) scale(1.2); }
    }

    /* TYPOGRAPHY */
    .gradient-text {
      background: linear-gradient(135deg, #FFFFFF 0%, #FFDDBA 50%, var(--brand) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% auto;
      animation: shine 5s linear infinite;
    }
    @keyframes shine {
      to { background-position: 200% center; }
    }
    .text-glow {
      text-shadow: 0 0 40px rgba(255, 106, 0, 0.6);
    }
    
    /* EXTREME GLASSMORPHISM */
    .glass-card {
      background: rgba(15, 15, 15, 0.4);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.7), inset 0 0 32px rgba(255, 106, 0, 0.02);
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .glass-card:hover {
      background: rgba(20, 20, 20, 0.6);
      border-color: rgba(255, 106, 0, 0.4);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8), 
                  0 0 30px rgba(255, 106, 0, 0.2),
                  inset 0 0 20px rgba(255, 106, 0, 0.1);
      transform: translateY(-8px);
    }
    
    /* ANIMATIONS */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* MARQUEE */
    .marquee-wrapper { display: flex; overflow: hidden; white-space: nowrap; }
    .marquee-track { display: flex; animation: marquee 20s linear infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  `}} />
);

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>MATTEO | Posicionamento & Conversão</title>
        <meta name="description" content="Design cinematográfico que vende." />
      </Head>

      <GlobalStyles />
      <Cursor />

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${scrolled ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between w-full">
          {/* LOGO */}
          <div className="text-xl md:text-2xl font-black tracking-tighter text-white flex-shrink-0">
            BONVENTO<span className="text-[#FF6A00]">.</span>
          </div>

          {/* BOTÃO */}
          <a href="#planos" className="relative group overflow-hidden bg-transparent border border-[#FF6A00] text-white font-bold text-[10px] md:text-xs tracking-widest uppercase px-4 md:px-6 py-2 md:py-3 rounded-sm backdrop-blur-md flex-shrink-0">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 whitespace-nowrap">
              INICIAR PROJETO
            </span>
            <div className="absolute inset-0 bg-[#FF6A00] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          </a>
        </div>
      </nav>
      {/* ── HERO CENTRALIZADO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 border-b border-white/5 bg-[#020202]">

        {/* IMAGEM DE FUNDO SUPER VISÍVEL */}
        {/* IMAGEM DE FUNDO SUPER VISÍVEL E ENCAIXADA */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/MATTEO.webp"
            alt="Matteo Posicionamento"
            /* O segredo do enquadramento mobile: object-[center_15%] foca no terço superior da foto. 
               No desktop (md:), volta a centralizar perfeitamente. */
            className="absolute inset-0 h-full w-full object-cover object-[center_15%] md:object-center opacity-100"
          />

          {/* Sombras inteligentes: Mais forte no topo (menu) e na base (textos) no mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/10 to-[#050505] md:via-[#050505]/20 md:to-[#050505]/90" />

          {/* Vinheta radial: formato elíptico no mobile para não engolir a foto nas laterais */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] md:bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] opacity-80 md:opacity-60" />
        </div>

        {/* BLOBS DE LUZ */}
        <div className="blob bg-[#FF6A00] w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-10" />

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 w-full flex flex-col items-center text-center mt-10 md:mt-0">

          {/* TÍTULO MENOR E RESPONSIVO */}
          <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.9] tracking-tighter mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-2xl">
            <br /><br />
            <span className="block text-white reveal" style={{ transitionDelay: '0.1s' }}>
              AUTORIDADE
            </span>
            <span className="block gradient-text text-glow reveal" style={{ transitionDelay: '0.2s' }}>
              INQUESTIONÁVEL.
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8 md:mb-12 reveal glass-card p-5 md:p-6 rounded-lg border-t-4 border-t-[#FF6A00] mx-auto shadow-2xl" style={{ transitionDelay: '0.4s' }}>
            Elevamos a percepção de valor da sua marca com design cinematográfico e copy agressivo. Não é apenas uma página. <strong className="text-white">É o seu novo patamar.</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 reveal" style={{ transitionDelay: '0.5s' }}>
            <a href="#planos" className="group relative flex items-center justify-center gap-3 bg-[#FF6A00] text-black font-black text-xs md:text-sm tracking-widest uppercase px-8 md:px-10 py-4 md:py-5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] rounded-sm">
              VER PLANOS
              <IconArrow />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 max-w-4xl w-full reveal" style={{ transitionDelay: '0.6s' }}>
            {STATS.map((s) => (
              <div key={s.number} className="group cursor-default flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-black text-white group-hover:text-[#FF6A00] transition-colors duration-300 text-glow drop-shadow-lg">{s.number}</div>
                <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/60 mt-2 text-center drop-shadow-md">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#FF6A00] py-4 overflow-hidden border-y border-[#FF6A00] relative z-10 shadow-[0_0_50px_rgba(255,106,0,0.2)]">
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className={`text-xl font-black tracking-widest mx-6 ${item === '•' ? 'text-black/30' : 'text-black'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEMAS / SOLUÇÕES ── */}
      <section id="Resultados" className="py-24 md:py-32 px-6 relative bg-[#050505]">
        <div className="absolute inset-0 bg-grid z-0" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6A00]/5 blur-[100px] pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:mb-20 reveal text-center md:text-left">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] text-white tracking-tighter">
              A MAIORIA DAS LPs<br />
              <span className="text-white/20">SÓ GASTA SEU DINHEIRO.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="reveal glass-card p-1 relative overflow-hidden group rounded-xl" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-px bg-white/5 rounded-lg overflow-hidden">
                  <div className="bg-[#080808] p-6 md:p-8 flex flex-col gap-4">
                    <IconX />
                    <p className="text-sm text-white/40 leading-relaxed font-medium">{p.bad}</p>
                  </div>
                  <div className="bg-[#0c0c0c] p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <IconCheck />
                    <p className="text-sm text-white/90 leading-relaxed font-medium relative z-10">{p.good}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="expertise" className="py-24 md:py-32 px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6A00]/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:mb-20 reveal text-center md:text-left">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] text-white tracking-tighter">
              NÓS ENTREGAMOS<br />
              <span className="gradient-text">MÁQUINAS DE VENDA.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className={`reveal glass-card p-8 md:p-10 flex flex-col gap-6 relative rounded-2xl ${s.highlight ? 'border-[#FF6A00]/50 shadow-[0_0_40px_rgba(255,106,0,0.15)] bg-[#0A0A0A]' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                {s.highlight && (
                  <div className="absolute top-0 right-8 md:right-10 -translate-y-1/2 bg-[#FF6A00] px-4 py-1.5 shadow-[0_0_20px_rgba(255,106,0,0.5)] rounded-sm">
                    <span className="font-bold text-[10px] tracking-widest uppercase text-black">MAIS POPULAR</span>
                  </div>
                )}
                <div className="text-4xl">{s.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 bg-white/5 text-white/70 border border-white/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="planos" className="py-24 md:py-32 px-6 relative bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-30 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:mb-24 reveal text-center">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.9] text-white tracking-tighter">
              O PREÇO DO<br />
              <span className="gradient-text">POSICIONAMENTO.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i} className={`reveal glass-card flex flex-col p-8 md:p-10 relative rounded-2xl ${plan.highlight ? 'border-[#FF6A00]/50 shadow-[0_0_60px_rgba(255,106,0,0.15)] md:scale-105 z-10 bg-[#0c0c0c]' : 'bg-[#080808]'}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6A00] px-6 py-1.5 shadow-[0_0_20px_rgba(255,106,0,0.5)] rounded-sm whitespace-nowrap">
                    <span className="font-bold text-[10px] tracking-widest uppercase text-black">A ESCOLHA DOS GRANDES</span>
                  </div>
                )}

                <p className="font-bold text-[10px] tracking-widest uppercase text-[#FF6A00] mb-4">{plan.name}</p>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{plan.price}</div>
                <p className="text-xs text-white/40 mb-10 pb-10 border-b border-white/10">{plan.desc}</p>

                <ul className="flex flex-col gap-5 mb-12 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-4">
                      <IconCheck />
                      <span className="text-sm font-medium text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contato" className={`w-full text-center font-bold text-xs tracking-widest uppercase px-6 py-5 transition-all duration-300 rounded-sm ${plan.highlight ? 'bg-[#FF6A00] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'bg-transparent text-white hover:bg-white hover:text-black border border-white/20'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="contato" className="relative py-32 md:py-40 px-6 bg-[#FF6A00] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 mix-blend-multiply" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] text-[#050505] tracking-tighter mb-8 reveal">
            VAMOS ESCALAR<br />SEU NEGÓCIO.
          </h2>
          <p className="text-base md:text-xl text-black/80 font-bold max-w-xl mx-auto mb-12 reveal" style={{ transitionDelay: '0.1s' }}>
            Me chame no WhatsApp agora. Em 72 horas o seu novo posicionamento estará no ar.
          </p>
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <a href="https://wa.me/5519997882182?text=Quero+elevar+meu+posicionamento" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#050505] text-[#FF6A00] font-black text-xs tracking-widest uppercase px-8 md:px-10 py-5 md:py-6 hover:bg-white hover:text-black hover:shadow-2xl transition-all duration-300 group rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              💬 INICIAR ATENDIMENTO
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#020202] py-12 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-xl font-black tracking-tighter text-white">
            BONVENTO<span className="text-[#FF6A00]">.</span>
          </div>
          <p className="font-bold text-[9px] tracking-widest uppercase text-white/30">
            © {new Date().getFullYear()} — MATTEO BONVENTO - TODOS OS DIREITOS RESERVADOS
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {['Instagram'].map((item) => (
              <a key={item} href="https://www.instagram.com/obonvento" className="font-bold text-[9px] tracking-widest uppercase text-white/30 hover:text-[#FF6A00] transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
