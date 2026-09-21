'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const row1Items = ['WILD IDEAS!', 'WILD IDEAS!', 'WILD IDEAS!', 'WILD IDEAS!'];
const row2Items = ["LET'S DIVE IN!", "LET'S DIVE IN!", "LET'S DIVE IN!", "LET'S DIVE IN!"];

export default function CalloutBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty('--torch-x', `${x}px`);
      section.style.setProperty('--torch-y', `${y}px`);
    };

    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-torch-zone="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden border-y border-white/5 py-16 md:py-24 bg-[#0a0a0a] select-none cursor-none"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8 text-center pointer-events-none"
      >
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          WILD IDEAS!
        </span>
      </motion.div>

      {/* Marquee Wrapper with Spotlight Effect */}
      <div className="relative py-2 overflow-hidden">
        {/* ============================================================== */}
        {/* LAYER 1: BASE TEXT (Crisp amber row 1, crisp white row 2)     */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4 md:gap-7 opacity-75 md:opacity-85 transition-opacity duration-300">
          {/* Row 1: Moving Left in Golden Amber Outline */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row1Items, ...row1Items].map((item, i) => (
                <span
                  key={`base-1-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-amber"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-amber-500 rounded-xs align-middle" />
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
              aria-hidden
            >
              {[...row1Items, ...row1Items].map((item, i) => (
                <span
                  key={`base-1-dup-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-amber"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-amber-500 rounded-xs align-middle" />
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Moving Right in Crisp White Outline */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee-reverse 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row2Items, ...row2Items].map((item, i) => (
                <span
                  key={`base-2-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-white"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-white/85 rounded-xs align-middle" />
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee-reverse 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
              aria-hidden
            >
              {[...row2Items, ...row2Items].map((item, i) => (
                <span
                  key={`base-2-dup-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-white"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-white/85 rounded-xs align-middle" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 2: ILLUMINATED GLOWING TEXT (Revealed by Torch)          */}
        {/* ============================================================== */}
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col gap-4 md:gap-7 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 280px 200px at var(--torch-x, -999px) calc(var(--torch-y, -999px) - 30px), black 30%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 280px 200px at var(--torch-x, -999px) calc(var(--torch-y, -999px) - 30px), black 30%, rgba(0,0,0,0.5) 60%, transparent 100%)',
          }}
          aria-hidden
        >
          {/* Row 1: Golden Amber with Intense Warm Glow */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row1Items, ...row1Items].map((item, i) => (
                <span
                  key={`amber-1-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-amber filter drop-shadow-[0_0_20px_rgba(245,158,11,0.95)]"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)] rounded-xs align-middle" />
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row1Items, ...row1Items].map((item, i) => (
                <span
                  key={`amber-1-dup-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-amber filter drop-shadow-[0_0_20px_rgba(245,158,11,0.95)]"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)] rounded-xs align-middle" />
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Pure White with Intense Clean Glow */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee-reverse 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row2Items, ...row2Items].map((item, i) => (
                <span
                  key={`amber-2-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.95)]"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.9)] rounded-xs align-middle" />
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'marquee-reverse 45s linear infinite',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {[...row2Items, ...row2Items].map((item, i) => (
                <span
                  key={`amber-2-dup-${i}`}
                  className="font-display text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-stroke-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.95)]"
                >
                  {item}
                  <span className="inline-block w-12 sm:w-16 md:w-24 h-2 sm:h-3 md:h-3.5 mx-6 border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.9)] rounded-xs align-middle" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: AMBIENT TORCHLIGHT SPOTLIGHT GLOW                     */}
        {/* ============================================================== */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle 280px at var(--torch-x, -999px) calc(var(--torch-y, -999px) - 35px), rgba(245, 158, 11, 0.32) 0%, rgba(217, 119, 6, 0.16) 40%, rgba(245, 158, 11, 0.03) 70%, transparent 100%), radial-gradient(ellipse 360px 220px at var(--torch-x, -999px) calc(var(--torch-y, -999px) - 60px), rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.07) 50%, transparent 80%)',
          }}
          aria-hidden
        />

        {/* ============================================================== */}
        {/* LAYER 4: THE TORCH CURSOR GRAPHIC                              */}
        {/* ============================================================== */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-40 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform:
              'translate3d(var(--torch-x, -999px), var(--torch-y, -999px), 0) translate(-50%, -50%)',
            willChange: 'transform',
          }}
          aria-hidden
        >
          {/* Torch Assembly (Centered horizontally on cursor) */}
          <div className="relative flex flex-col items-center">
            {/* 1. Glowing Flame Head (Points Upward) */}
            <div className="relative z-10 -mb-1 flex items-center justify-center">
              {/* Flame Outer Halo */}
              <div className="absolute -inset-3 rounded-full bg-amber-500/30 blur-md animate-pulse pointer-events-none" />
              {/* Teardrop Flame Body */}
              <div
                className="w-4 h-6 rounded-t-full rounded-b-sm bg-gradient-to-t from-amber-500 via-amber-200 to-white"
                style={{
                  boxShadow:
                    '0 0 12px 3px #ffffff, 0 0 24px 8px #f59e0b, 0 -12px 32px 10px rgba(251, 191, 36, 0.65)',
                }}
              />
            </div>

            {/* 2. Metal Collar Bracket */}
            <div className="z-10 w-3.5 h-1.5 rounded-xs bg-gradient-to-r from-[#d97706] via-[#fef08a] to-[#b45309] shadow-xs" />

            {/* 3. Wooden Torch Handle */}
            <div className="z-10 w-2.5 h-7 rounded-b-xs bg-gradient-to-b from-[#8B5A2B] via-[#6e411b] to-[#42230c] shadow-[0_2px_8px_rgba(0,0,0,0.8)] border-x border-amber-950/50" />

            {/* 4. Attached Cursor Base Ring with Center Dot */}
            <div className="relative -mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/[0.04] shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-text + link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 mt-10 text-center"
      >
        <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-neutral-400 pointer-events-auto">
          Like a lion&apos;s roar echoing through the jungle, a hint of our
          creative minds emerges.
        </p>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-colors hover:text-amber-400 pointer-events-auto"
        >
          View Dribbble
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
