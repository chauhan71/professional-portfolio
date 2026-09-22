'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface HeroProps {
  isRevealed?: boolean;
}

export default function Hero({ isRevealed = true }: HeroProps) {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.setProperty('--btn-x', `${x}px`);
      glowRef.current.style.setProperty('--btn-y', `${y}px`);
    }

    if (torchRef.current) {
      torchRef.current.style.left = `${x}px`;
      torchRef.current.style.top = `${y}px`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsBtnHovered(true);
    if (glowRef.current) glowRef.current.style.opacity = '1';
    if (torchRef.current) torchRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsBtnHovered(false);
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (torchRef.current) torchRef.current.style.opacity = '0';
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 md:py-40 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* ATMOSPHERIC ORANGE LIT BACKGROUND                              */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
        {/* 1. Precise Left-Focused Orange Lit Radial Lighting */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle 1850px at 0% 0%, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.22) 15%, rgba(180, 83, 9, 0.06) 60%, transparent 75%),
              radial-gradient(ellipse 1% 1% at 0% 1%, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.28) 32%, rgba(146, 64, 14, 0.08) 55%, transparent 70%)
            `,
          }}
        />

        {/* 2. Focused Warm Amber & Orange Luminous Glow Orbs */}
        <div className="hero-orb-1 absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-amber-500/35 via-orange-600/20 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -left-[8%] w-[480px] h-[580px] bg-gradient-to-r from-orange-600/25 via-amber-500/15 to-transparent rounded-full blur-[90px]" />

        {/* 3. Subtle Cool Contrast on Bottom Right */}
        <div className="hero-orb-2 absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/12 via-blue-600/8 to-transparent rounded-full blur-[100px]" />

        {/* 4. Fine Grain Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* HERO MAIN CONTENT CONTAINER (LEFT-ALIGNED)                     */}
      {/* ============================================================== */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Main Headline */}
        <div className="mb-6 md:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.35rem,8.8vw,7.8rem)] font-medium leading-[1.04] md:leading-[0.94] tracking-[-0.025em] text-white"
          >
            <span className="block overflow-hidden">
              <span className="inline-block text-amber-400">Ritik</span>{' '}
              <span className="inline-block text-white">Chauhan.</span>
            </span>
            <span className="block overflow-hidden mt-1 md:mt-2">
              <span className="inline-block text-amber-400">Creative</span>{' '}
              <span className="inline-block text-white">Developer.</span>
            </span>
          </motion.h1>
        </div>

        {/* Subparagraph */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-base sm:text-lg text-white/70 leading-relaxed mb-8 md:mb-10 font-normal"
        >
          I craft premium, animation-rich web experiences that feel tactile, intentional, and effortless — from initial concept to production-ready code.
        </motion.p>

        {/* Button Group (Left-Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 md:gap-4"
        >
          {/* 1. Explore Work (With Interactive Torch & Amber Glow) */}
          <div className="relative inline-block">
            <button
              ref={btnRef}
              onClick={() => router.push('/work')}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-medium rounded-full text-xs md:text-sm tracking-wide overflow-visible transition-all duration-300 hover:scale-105"
              style={{
                background: isBtnHovered
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
                  : '#1a1a1a',
                border: isBtnHovered
                  ? '1px solid rgba(251, 191, 36, 0.6)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                color: isBtnHovered ? '#fbbf24' : 'white',
                boxShadow: isBtnHovered
                  ? '0 0 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.15)'
                  : 'none',
              }}
            >
              <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300"
                style={{
                  opacity: 0,
                  '--btn-x': '50%',
                  '--btn-y': '50%',
                  background:
                    'radial-gradient(circle 100px at var(--btn-x) var(--btn-y), rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0.2) 40%, transparent 80%)',
                } as React.CSSProperties}
              />
              <span className="relative z-10">Explore work</span>
            </button>

            {/* Hover Torch Assembly */}
            <div
              ref={torchRef}
              className="absolute pointer-events-none z-30 transition-opacity duration-200"
              style={{ opacity: 0, transform: 'translate(-50%, -100%)' }}
            >
              <svg width="24" height="36" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="25" width="10" height="30" rx="2" fill="url(#heroBtnTorchHandle)" />
                <path d="M8 25 L32 25 L28 10 L12 10 Z" fill="url(#heroBtnTorchHead)" />
                <ellipse cx="20" cy="8" rx="8" ry="6" fill="url(#heroBtnFlameGlow)" />
                <path d="M20 0 C20 0 26 6 26 10 C26 14 23 16 20 16 C17 16 14 14 14 10 C14 6 20 0 20 0Z" fill="url(#heroBtnFlame)" />
                <defs>
                  <linearGradient id="heroBtnTorchHandle" x1="20" y1="25" x2="20" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B4513" />
                    <stop offset="1" stopColor="#5D3A1A" />
                  </linearGradient>
                  <linearGradient id="heroBtnTorchHead" x1="20" y1="10" x2="20" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#CD853F" />
                    <stop offset="1" stopColor="#8B4513" />
                  </linearGradient>
                  <radialGradient id="heroBtnFlameGlow" cx="20" cy="8" r="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="rgba(255, 200, 100, 0.8)" />
                    <stop offset="1" stopColor="rgba(255, 150, 50, 0)" />
                  </radialGradient>
                  <linearGradient id="heroBtnFlame" x1="20" y1="0" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF4E0" />
                    <stop offset="0.3" stopColor="#FFD700" />
                    <stop offset="0.7" stopColor="#FF8C00" />
                    <stop offset="1" stopColor="#FF4500" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* 2. Services Button */}
          <button
            onClick={() => router.push('/#skills')}
            className="px-6 py-3 md:px-8 md:py-4 border border-white/30 text-white font-medium rounded-full text-xs md:text-sm tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Services
          </button>

          {/* 3. Get In Touch Button */}
          <button
            onClick={() => router.push('/contact')}
            className="px-4 py-3 md:px-6 md:py-4 text-white/60 text-xs md:text-sm tracking-wide hover:text-white transition-colors duration-300"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* SCROLL INDICATOR: EXACT CIRCULAR RING WITH CENTER DOT          */}
      {/* ============================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
