"use client";

import React, { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import {
  ArrowUpRight,
  Monitor,
  Video,
  Layers,
  CheckCircle2,
  Instagram,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utilitário para classes Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inter = Inter({ subsets: ["latin"] });

// --- Cursor Customizado Cinematográfico ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border border-[#00FF41] rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
    >
      <div className="w-1 h-1 bg-[#00FF41] rounded-full" />
    </div>
  );
};

export default function LandingPage() {
  useEffect(() => {
    // 1. Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Animações GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Fade in inicial (Hero)
    const tl = gsap.timeline();
    tl.from(".hero-text", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Revelação de texto no Scroll
    gsap.to(".reveal-content", {
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top 60%",
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

  return (
    <main className={cn(inter.className, "bg-[#080808] text-white selection:bg-[#00FF41] selection:text-black")}>
      <CustomCursor />

      {/* --- TEXTURA DE RUÍDO (Overlay Cinematográfico) --- */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-10 md:px-12 backdrop-blur-md bg-black/10">
        <div className="text-white font-black tracking-tighter text-2xl flex items-center gap-2">
          <div className="animate-pulse" />
          <Image src={"/logo.svg"} width={70} height={70} alt="Logo" />
        </div>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
          <a href="#portfolio" className="hover:text-[#00FF41] transition-colors underline-offset-8 hover:underline">Produções</a>
          <a href="#processo" className="hover:text-[#00FF41] transition-colors underline-offset-8 hover:underline">Processo</a>
          <a href="#contato" className="hover:text-[#00FF41] transition-colors underline-offset-8 hover:underline">Direção</a>
        </div>
        <a href="https://wa.me/5519997882182?text=Ol%C3%A1!%20Vim%20pela%20sua%20p%C3%A1gina%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"><button className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF41] transition-all">
          Solicitar Proposta
        </button></a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#080808] z-10" />
          <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale opacity-30 brightness-[0.4]">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-above-in-a-rocky-landscape-44456-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-6 z-20">
          <div className="max-w-6xl">
            <h1 className="hero-text text-5xl md:text-[9rem] font-black leading-[0.8] tracking-tighter mb-10">
              CONSTRUINDO <br />
              <span className="text-[#00FF41]">VISÃO.</span>
            </h1>
            <div className="hero-text max-w-2xl border-l border-[#00FF41] pl-8 py-2">
              <p className="text-xl md:text-2xl text-zinc-400 font-light mb-6 uppercase tracking-tight leading-snug">
                Produção de vídeo profissional: Comerciais, aftermovies e reels com direção estratégica.
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/5519997882182?text=Ol%C3%A1!%20Vim%20pela%20sua%20p%C3%A1gina%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"><button className="bg-[#00FF41] text-black px-10 py-5 font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
                  Iniciar Projeto <ArrowUpRight size={20} />
                </button></a>
                <a href="/#portfolio"><button className="border border-zinc-800 text-white px-10 py-5 font-black uppercase tracking-widest hover:border-white transition-all">
                  Portfolio
                </button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO (GRID BRUTALISTA) --- */}
      <section id="portfolio" className="py-32 px-6 md:px-12 bg-black border-y border-zinc-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Projetos<br />
              <span className="text-zinc-800">Selecionados</span>
            </h2>
            <div className="text-zinc-500 font-mono text-sm hidden md:block tracking-widest uppercase mb-4">
        // Excelência Visual
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-zinc-900">
            {[
              {
                title: "Aftermovie",
                tag: "MIZA DJ",
                link: "https://www.instagram.com/p/DVRaqz4kc1l/s", // Link do vídeo no Insta
                thumb: "/perfil-miza.png" // Foto de fundo
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
                className="group relative h-[650px] overflow-hidden p-12 flex flex-col justify-between bg-black"
              >
                {/* Imagem de Fundo com Efeito */}
                <div
                  className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  style={{
                    backgroundImage: `url(${item.thumb})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                {/* Overlay de Gradiente para leitura */}
                <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Ícone e Tag */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="text-[#00FF41] p-3 border border-[#00FF41]/20 rounded-full backdrop-blur-sm group-hover:bg-[#00FF41] group-hover:text-black transition-all duration-500">
                    <Video size={24} />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 group-hover:text-[#00FF41] transition-colors">
                    {item.tag}
                  </span>
                </div>

                {/* Título e Link Indicador */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[#00FF41] text-xs font-bold tracking-widest uppercase">Watch Video</span>
                    <div className="h-[1px] w-12 bg-[#00FF41]" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  {/* Barra de progresso visual no hover */}
                  <div className="h-1 w-0 bg-[#00FF41] group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* Efeito de brilho sutil ao passar o mouse */}
                <div className="absolute inset-0 z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF41]/10 via-transparent to-transparent" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVEAL SECTION --- */}
      <section className="reveal-section py-60 bg-white text-black overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="reveal-content text-5xl md:text-[7.5rem] font-black tracking-tighter leading-[0.85] uppercase">
            Imagem é posicionamento. <br />
            <br />
            O vídeo não é apenas registro. <br />
            <br />
            É construção de percepção.
          </h2>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="processo" className="py-40 px-6 md:px-12 bg-[#080808]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl font-black tracking-tighter mb-10 uppercase underline decoration-[#00FF41]">Processo <br />Estruturado.</h2>
              <div className="space-y-12">
                {[
                  { id: "01", t: "Briefing Estratégico", d: "Entendimento da marca e público-alvo." },
                  { id: "02", t: "Direção Visual", d: "Planejamento de narrativa e estética cinematográfica." },
                  { id: "03", t: "Captura High-End", d: "Qualidade Visual Avançada e Técnica apurada." },
                  { id: "04", t: "Pós-Produção", d: "Edição, color grading e sound design imersivo." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-[#00FF41] font-black text-2xl group-hover:scale-125 transition-transform">{step.id}</span>
                    <div>
                      <h4 className="text-xl font-bold uppercase mb-2">{step.t}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[600px] rounded-4xl border border-zinc-900 relative overflow-hidden flex items-center justify-center">
                <div className="text-[#00FF41] font-mono text-xs"><Image src={"/matteo.png"} alt="Matteo-Bonvento" width={1000} height={1000} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL (MARQUEE) --- */}
      <section className="py-40 px-6 bg-[#00FF41] text-black text-center relative overflow-hidden group">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 whitespace-nowrap text-[15rem] font-black opacity-10 pointer-events-none select-none"
        >
          DIRECTED BY MATTEO • DIRECTED BY MATTEO • DIRECTED BY MATTEO •
        </motion.div>

        <a href="https://wa.me/5519997882182?text=Ol%C3%A1!%20Vim%20pela%20sua%20p%C3%A1gina%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"><div className="relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-12 uppercase leading-none">
            Bora Gerar <br /> Impacto.
          </h2>
          <button className="bg-black text-[#00FF41] px-20 py-10 text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl active:scale-95">
            Solicitar Orçamento
          </button>
        </div></a>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contato" className="py-20 px-6 md:px-12 bg-black border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <div className="text-3xl font-black tracking-tighter text-[#00FF41]"><a href="https://www.instagram.com/obonvento/">@obonvento</a></div>
            <p className="text-zinc-600 text-[10px] mt-2 font-bold tracking-[0.2em] text-center uppercase">Clica e Me Segue!</p>
          </div>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/obonvento/" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={24} /></a>
          </div>
          <div className="text-white-800 font-mono text-[9px] uppercase tracking-tighter">
            Todos os direitos reservados - Matteo Bonvento
          </div>
        </div>
      </footer>
    </main>
  );
}