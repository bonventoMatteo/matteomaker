"use client";

import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import {
  ArrowUpRight,
  Monitor,
  Video,
  Layers,
  Instagram,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utilitários ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inter = Inter({ subsets: ["latin"] });

// --- Componente: Cursor Customizado ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border border-[#00FF41] rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
    >
      <div className="w-1 h-1 bg-[#00FF41] rounded-full" />
    </div>
  );
};

// --- Componente Principal ---
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const whatsappUrl = "https://wa.me/5519997882182?text=Olá! Gostaria de um orçamento para produção de vídeo.";

  useEffect(() => {
    // Inicialização do Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Registro GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animação Hero
    const tl = gsap.timeline();
    tl.from(".hero-text", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Animação Reveal de Texto (Seção Branca)
    gsap.to(".reveal-content", {
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top 80%",
        end: "bottom 80%",
        scrub: true,
      },
      color: "#00FF41",
      stagger: 0.1
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Trava scroll quando menu está aberto
  useEffect(() => {
    if (menuOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [menuOpen]);

  return (
    <main className={cn(inter.className, "bg-[#080808] text-white selection:bg-[#00FF41] selection:text-black overflow-x-hidden")}>
      <CustomCursor />

      {/* Textura de ruído cinematográfico */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-4 py-6 md:px-12 md:py-10 backdrop-blur-md bg-black/20">
        <div className="z-[110]">
          <Image src="/logo.svg" width={60} height={60} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
          <a href="#portfolio" className="hover:text-[#00FF41] transition-colors">Produções</a>
          <a href="#processo" className="hover:text-[#00FF41] transition-colors">Processo</a>
          <a href="#contato" className="hover:text-[#00FF41] transition-colors">Direção</a>
        </div>

        <div className="flex items-center gap-4 z-[110]">
          <a href={whatsappUrl} target="_blank" className="hidden sm:block">
            <button className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF41] transition-all">
              Proposta
            </button>
          </a>
          <button 
            className="text-white hover:text-[#00FF41] transition-colors p-2" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY (FULL SCREEN) --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 w-full h-screen bg-[#080808] z-[105] flex flex-col items-center justify-center px-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] pointer-events-none uppercase select-none">
              Menu
            </div>

            <div className="flex flex-col items-center gap-6 md:gap-8 text-center relative z-10">
              {[
                { label: "Produções", href: "#portfolio" },
                { label: "Processo", href: "#processo" },
                { label: "Direção", href: "#contato" },
              ].map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#00FF41] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-col items-center gap-6"
              >
                <a href={whatsappUrl} target="_blank">
                  <button className="bg-[#00FF41] text-black px-12 py-5 font-black uppercase tracking-widest text-sm active:scale-95 transition-transform">
                    Solicitar Orçamento
                  </button>
                </a>
                <div className="flex gap-8 text-zinc-500">
                   <a href="https://www.instagram.com/obonvento/" target="_blank" className="hover:text-white transition-colors">
                    <Instagram size={28} />
                   </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#080808] z-10" />
          <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale opacity-30 brightness-[0.4]">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-above-in-a-rocky-landscape-44456-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto z-20 pt-20">
          <div className="max-w-6xl text-center md:text-left">
            <h1 className="hero-text text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] md:leading-[0.8] tracking-tighter mb-8 md:mb-10 uppercase">
              CONSTRUINDO <br />
              <span className="text-[#00FF41]">VISÃO.</span>
            </h1>
            <div className="hero-text max-w-2xl border-l border-[#00FF41] pl-4 md:pl-8 py-2 mx-auto md:mx-0">
              <p className="text-base md:text-2xl text-zinc-400 font-light mb-8 uppercase tracking-tight leading-snug">
                Produção de vídeo profissional: Comerciais, aftermovies e reels com direção estratégica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href={whatsappUrl} target="_blank" className="w-full sm:w-auto">
                  <button className="w-full bg-[#00FF41] text-black px-8 py-4 md:px-10 md:py-5 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    Iniciar Projeto <ArrowUpRight size={20} />
                  </button>
                </a>
                <a href="#portfolio" className="w-full sm:w-auto">
                  <button className="w-full border border-zinc-800 text-white px-8 py-4 md:px-10 md:py-5 font-black uppercase tracking-widest hover:border-white transition-all text-center">
                    Portfolio
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="portfolio" className="py-20 md:py-32 px-4 md:px-12 bg-black border-y border-zinc-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Projetos<br />
              <span className="text-zinc-800">Selecionados</span>
            </h2>
            <div className="text-zinc-500 font-mono text-xs md:text-sm tracking-widest uppercase md:mb-4">
              // Excelência Visual
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                title: "Aftermovie",
                tag: "MIZA DJ",
                link: "https://www.instagram.com/p/DVRaqz4kc1l/",
                thumb: "/perfil-miza.png"
              },
              {
                title: "Filmagem Evento",
                tag: "MIZA DJ",
                link: "https://www.instagram.com/p/DVRZ0OPDsrK/",
                thumb: "/Miza.png"
              }
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-[400px] md:h-[650px] overflow-hidden p-6 md:p-12 flex flex-col justify-between bg-zinc-950 transition-all"
              >
                <div
                  className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  style={{
                    backgroundImage: `url(${item.thumb})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="text-[#00FF41] p-2 border border-[#00FF41]/20 rounded-full backdrop-blur-sm group-hover:bg-[#00FF41] group-hover:text-black transition-all duration-500">
                    <Video size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] text-zinc-500 group-hover:text-[#00FF41]">
                    {item.tag}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-none transition-all group-hover:tracking-wider">
                    {item.title}
                  </h3>
                  <div className="h-1 w-0 bg-[#00FF41] group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVEAL SECTION --- */}
      <section className="reveal-section py-32 md:py-60 bg-white text-black overflow-hidden px-4">
        <div className="container mx-auto text-center">
          <h2 className="reveal-content text-3xl sm:text-5xl md:text-[7.5rem] font-black tracking-tighter leading-tight md:leading-[0.85] uppercase">
            Imagem é posicionamento. <br className="hidden md:block" />
            O vídeo não é apenas registro. <br className="hidden md:block" />
            É construção de percepção.
          </h2>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="processo" className="py-20 md:py-40 px-4 md:px-12 bg-[#080808]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 md:mb-16 uppercase underline decoration-[#00FF41]">
                Processo <br />Estruturado.
              </h2>
              <div className="space-y-8 md:space-y-12">
                {[
                  { id: "01", t: "Briefing Estratégico", d: "Entendimento da marca e público-alvo." },
                  { id: "02", t: "Direção Visual", d: "Planejamento de narrativa e estética cinematográfica." },
                  { id: "03", t: "Captura High-End", d: "Qualidade Visual Avançada e Técnica apurada." },
                  { id: "04", t: "Pós-Produção", d: "Edição, color grading e sound design imersivo." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 md:gap-8 group">
                    <span className="text-[#00FF41] font-black text-xl md:text-2xl group-hover:scale-125 transition-transform">{step.id}</span>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold uppercase mb-2">{step.t}</h4>
                      <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="w-full aspect-square md:h-[600px] rounded-3xl md:rounded-4xl border border-zinc-900 overflow-hidden relative">
                <Image src="/matteo.png" alt="Matteo Bonvento" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL (MARQUEE) --- */}
      <section className="py-24 md:py-40 px-4 bg-[#00FF41] text-black text-center relative overflow-hidden group">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 whitespace-nowrap text-[8rem] md:text-[15rem] font-black opacity-10 pointer-events-none select-none"
        >
          DIRECTED BY MATTEO • DIRECTED BY MATTEO • DIRECTED BY MATTEO •
        </motion.div>

        <div className="relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-[10rem] font-black tracking-tighter mb-8 md:mb-12 uppercase leading-none">
            Bora Gerar <br /> Impacto.
          </h2>
          <a href={whatsappUrl} target="_blank">
            <button className="bg-black text-[#00FF41] px-10 py-6 md:px-20 md:py-10 text-lg md:text-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl active:scale-95">
              Solicitar Orçamento
            </button>
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contato" className="py-12 md:py-20 px-4 md:px-12 bg-black border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl md:text-3xl font-black tracking-tighter text-[#00FF41]">
              <a href="https://www.instagram.com/obonvento/" target="_blank" rel="noopener noreferrer">@obonvento</a>
            </div>
            <p className="text-zinc-600 text-[10px] mt-2 font-bold tracking-[0.2em] uppercase">Clica e Me Segue!</p>
          </div>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/obonvento/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram size={28} />
            </a>
          </div>
          <div className="text-zinc-600 font-mono text-[9px] md:text-[10px] uppercase tracking-tighter">
            © {new Date().getFullYear()} — Todos os direitos reservados — Matteo Bonvento
          </div>
        </div>
      </footer>
    </main>
  );
}