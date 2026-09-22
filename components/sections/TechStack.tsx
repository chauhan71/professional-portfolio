'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stack = [
  {
    category: 'Frontend',
    tools: ['Angular', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML5/CSS3'],
    badgeColor: 'text-sky-400 border-sky-500/20 bg-sky-500/5',
  },
  {
    category: 'Motion & Animation',
    tools: ['GSAP', 'Framer Motion', 'Three.js', 'SVG Animation', 'Canvas APIs'],
    badgeColor: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  },
  {
    category: 'Mobile App',
    tools: ['React-native', 'Expo', 'Android', 'IOS'],
    badgeColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  },
  {
    category: 'Other',
    tools: ['Git/GitHub', 'Vercel', 'Figma', 'Canvas Confetti'],
    badgeColor: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
  },
];

// Stacked deck initial tucked offsets inside the wallet sleeve
const tuckedOffsets = [
  { rotate: -3.5, x: -8, y: 32, zIndex: 11 },
  { rotate: -1.2, x: -3, y: 26, zIndex: 12 },
  { rotate: 1.5, x: 3, y: 22, zIndex: 13 },
  { rotate: 3.5, x: 8, y: 16, zIndex: 14 },
];

export default function TechStack() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="skills" className="relative px-6 py-24 md:px-8 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
            TECHNICAL STACK
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            The tools I use to <span className="underline decoration-amber-500 decoration-2 underline-offset-4">build</span> the future.
          </h2>
        </motion.div>

        {/* Interactive Wallet & Card Deck Stage */}
        <div
          className="relative mx-auto flex min-h-[580px] sm:min-h-[460px] md:min-h-[480px] w-full max-w-5xl items-center justify-center py-6 cursor-pointer"
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsOpen(false);
              setHoveredCard(null);
            }
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="relative flex items-center justify-center w-full h-full">

            {/* -------------------------------------------------------- */}
            {/* 1. Wallet Back Sleeve (Behind the cards, z-0)            */}
            {/* -------------------------------------------------------- */}
            <motion.div
              className="absolute w-60 sm:w-72 h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#1c1c1c] via-[#121212] to-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-0 pointer-events-none"
              animate={{
                y: isOpen ? (isMobile ? 180 : 110) : 38,
                scale: isOpen ? 0.98 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 480,
                damping: 30,
                mass: 0.4,
              }}
            >
              {/* Subtle interior lining stitch */}
              <div className="absolute inset-2 rounded-xl border border-dashed border-white/5 pointer-events-none" />
            </motion.div>

            {/* -------------------------------------------------------- */}
            {/* 2. The 4 Cards (Tucked inside when closed, fanned out)   */}
            {/* -------------------------------------------------------- */}
            {stack.map((s, i) => {
              // Row offset calculation on desktop vs mobile
              let targetX = tuckedOffsets[i].x;
              let targetY = isMobile ? tuckedOffsets[i].y + 15 : tuckedOffsets[i].y;
              let targetRotate = tuckedOffsets[i].rotate;
              let targetScale = 1;

              if (isOpen) {
                if (isMobile) {
                  // Non-overlapping 2x2 grid cleanly spaced above the wallet
                  targetX = i % 2 === 0 ? -80 : 80;
                  targetY = i < 2 ? -185 : -10;
                  targetScale = hoveredCard === i ? 1.03 : 0.96;
                  targetRotate = 0;
                } else {
                  // Full single horizontal row fanned above the wallet
                  targetX = (i - 1.5) * 235;
                  targetY = hoveredCard === i ? -125 : -110;
                  targetScale = hoveredCard === i ? 1.05 : 1;
                  targetRotate = 0;
                }
              }

              // Layering: when inside wallet, cards stay below front pocket (z < 30)
              // When fanned out, cards sit above everything (z > 40)
              const targetZIndex = isOpen
                ? hoveredCard === i
                  ? 60
                  : 40 + i
                : tuckedOffsets[i].zIndex;

              return (
                <motion.div
                  key={s.category}
                  className={`absolute w-[154px] sm:w-56 h-[162px] sm:h-auto sm:aspect-square rounded-2xl border ${
                    hoveredCard === i
                      ? 'border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                      : 'border-white/10'
                  } bg-[#111] p-3 sm:p-5 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 select-none`}
                  style={{
                    zIndex: targetZIndex,
                  }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    rotate: targetRotate,
                    scale: targetScale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 30,
                    mass: 0.4,
                  }}
                  onClick={(e) => {
                    if (isMobile && isOpen) {
                      e.stopPropagation();
                      setHoveredCard((prev) => (prev === i ? null : i));
                    }
                  }}
                  onMouseEnter={() => !isMobile && isOpen && setHoveredCard(i)}
                  onMouseLeave={() => !isMobile && isOpen && setHoveredCard(null)}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xs sm:text-base font-bold text-amber-400 tracking-tight">
                      {s.category}
                    </h3>
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                  </div>

                  {/* Compact Skill Badges */}
                  <div className="my-auto flex flex-wrap gap-1 sm:gap-1.5 py-1">
                    {s.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-medium text-neutral-300 transition-colors hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Counter */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
                    <span>{s.tools.length} Skills</span>
                    <span>0{i + 1}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* -------------------------------------------------------- */}
            {/* 3. Wallet Front Pocket with Thumb Notch Cutout (z-30)    */}
            {/* -------------------------------------------------------- */}
            <motion.div
              className="absolute w-60 sm:w-72 h-40 sm:h-48 z-30 pointer-events-none"
              animate={{
                y: isOpen ? (isMobile ? 190 : 122) : 54,
                scale: isOpen ? 0.98 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 480,
                damping: 30,
                mass: 0.4,
              }}
            >
              {/* SVG Front Pocket with smooth curved thumb cutout matching reference */}
              <svg
                viewBox="0 0 280 180"
                className="w-full h-full drop-shadow-[0_-8px_20px_rgba(0,0,0,0.85)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pocketBg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="35%" stopColor="#141414" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                  <linearGradient id="pocketBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.22)" />
                    <stop offset="40%" stopColor="rgba(245, 158, 11, 0.35)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
                  </linearGradient>
                </defs>

                {/* Semicircular thumb notch: curves smoothly from x=105 to x=175 with center at x=140 */}
                <path
                  d="M 0,0 L 102,0 C 114,0 120,28 140,28 C 160,28 166,0 178,0 L 280,0 L 280,164 C 280,173 273,180 264,180 L 16,180 C 7,180 0,173 0,164 Z"
                  fill="url(#pocketBg)"
                  stroke="url(#pocketBorder)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Wallet Front Details & Embossed Foil Branding */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-500/70 mb-1">
                  <div className="h-1 w-1 rounded-full bg-amber-400" />
                  <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-amber-400/90 font-semibold">
                    TECH WALLET
                  </span>
                  <div className="h-1 w-1 rounded-full bg-amber-400" />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-neutral-500">
                  RITIK CHAUHAN · STACK SLEEVE
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
