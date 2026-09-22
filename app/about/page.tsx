'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import TiltCard from '@/components/TiltCard';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Compass,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const principles = [
  {
    icon: Code2,
    title: 'Technical Rigor',
    description:
      'Writing clean, modular, and type-safe code using modern React, Next.js, and TypeScript that is built to scale seamlessly.',
  },
  {
    icon: Sparkles,
    title: 'Animation & Motion',
    description:
      'Choreographing purposeful 60FPS physics-based micro-interactions that make software feel tactile, alive, and responsive.',
  },
  {
    icon: Layers,
    title: 'Design System Architecture',
    description:
      'Crafting scalable design tokens, accessible components, and consistent visual hierarchies across web and mobile platforms.',
  },
];

const highlights = [
  { metric: '3+', label: 'Years of Experience' },
  { metric: '20+', label: 'Shipped Projects' },
  { metric: '100k+', label: 'Lines of Code Written' },
  { metric: '99%', label: 'Performance & SEO Scores' },
];

function FlipPortraitCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState('/mypic.jpg');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] aspect-square relative cursor-pointer select-none group"
      style={{ perspective: 1400 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Interactive 3D card: Hover to flip and reveal portrait"
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: mouseTilt.x,
          rotateZ: mouseTilt.y * 0.08,
        }}
        transition={{
          rotateY: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          rotateX: { duration: 0.15, ease: 'easeOut' },
          rotateZ: { duration: 0.15, ease: 'easeOut' },
        }}
      >
        {/* ================= FRONT FACE (Watermark Card) ================= */}
        <div
          className="absolute inset-0 rounded-[36px] overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Multi-tone Deep Ambient Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle 380px at 15% 15%, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.15) 45%, transparent 75%),
                radial-gradient(circle 420px at 85% 85%, rgba(147, 51, 234, 0.28) 0%, rgba(88, 28, 135, 0.12) 50%, transparent 80%),
                linear-gradient(145deg, #3d240d 0%, #1f1614 35%, #1e1329 70%, #120e1a 100%)
              `,
            }}
          />

          {/* Subtle Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top Bar on Front */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono tracking-widest text-amber-400/80 uppercase font-semibold">
              Ritik Chauhan
            </span>
            <span className="text-[10px] font-mono text-white/40 tracking-wider">
              EST. 2023
            </span>
          </div>

          {/* Centered Large RITIK Watermark Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-sans font-black text-6xl sm:text-7xl md:text-8xl tracking-[0.12em] uppercase transition-all duration-700 group-hover:tracking-[0.18em] group-hover:scale-105"
              style={{
                color: 'rgba(217, 119, 6, 0.25)',
                textShadow: '0 0 40px rgba(245, 158, 11, 0.15)',
              }}
            >
              RITIK
            </span>
          </div>

          {/* Glass edge highlight */}
          <div className="absolute inset-0 rounded-[36px] border border-white/10 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* ================= BACK FACE (PORTRAIT) ================= */}
        <div
          className="absolute inset-0 rounded-[36px] overflow-hidden border border-amber-500/30 shadow-[0_25px_80px_rgba(245,158,11,0.25)] bg-[#0c0c0e]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Portrait Image with crisp fit */}
          <div className="relative w-full h-full">
            <img
              src={imgSrc}
              onError={() => setImgSrc('/my pic.jpeg')}
              alt="Ritik Chauhan - Creative Developer Portrait"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-at-t from-amber-500/15 via-transparent to-transparent pointer-events-none" />

            {/* Top Floating Glass Bar */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-xs font-mono text-white/95 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold tracking-wide">Ritik Chauhan</span>
              </div>
            </div>

            {/* Glass Edge Highlights */}
            <div className="absolute inset-0 rounded-[36px] border border-amber-400/20 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <Navbar isRevealed={true} />

      {/* Fixed Ambient Orange Lighting Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-amber-500/30 via-orange-600/15 to-transparent rounded-full blur-[110px]" />
      </div>

      <main className="relative z-10 min-h-screen bg-[#030303] text-white pt-32 pb-24 px-6 md:px-12 selection:bg-amber-500/20 selection:text-amber-300">
        {/* ============================================================== */}
        {/* HERO SECTION (MATCHES SCREENSHOT)                              */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl pt-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Typography & Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase font-mono">
                  WHO I AM
                </span>
              </div>

              {/* Main Two-Tone Headline */}
              <h1 className="mt-6 font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight leading-[1.08] text-white">
                <span className="text-white block">A creative</span>
                <span className="text-white block">developer</span>
                <span className="text-white/40 block">bridging the gap</span>
                <span className="text-white/40 block">between design and</span>
                <span className="text-white/40 block">code.</span>
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-400 font-normal">
                I thrive on turning complex problems into elegant, motion-rich
                digital solutions. My approach combines technical precision with a
                deep eye for aesthetics, ensuring every project is as functional as
                it is stunning.
              </p>

              {/* Quick Actions */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Explore work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D Flip Card (RITIK Watermark <-> Portrait Picture) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <FlipPortraitCard />
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* STATS SECTION                                                  */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl mt-12 pt-12 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-white/5 bg-[#0e0e0e] p-4 sm:p-6 text-center"
              >
                <div className="font-display text-3xl sm:text-5xl font-extrabold text-white">
                  {item.metric}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-neutral-400">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* CORE PRINCIPLES                                                */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase font-mono">
              HOW I WORK
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
              Principles that guide my craft.
            </h2>
            <p className="mt-4 text-neutral-400 text-sm sm:text-base">
              Great software is an intersection of ruthless technical efficiency
              and emotive, tactile design.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group rounded-3xl border border-white/10 bg-[#0e0e0e] p-8 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#121212]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* CALL TO ACTION                                                 */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.18),transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-500 font-semibold">
                READY TO ROAR?
              </span>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Let&apos;s create something extraordinary together.
              </h3>

              <p className="mt-4 text-sm sm:text-base text-neutral-400">
                Have a new project or looking to scale your engineering team?
                I&apos;m currently available for select freelance and full-time opportunities.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-6 py-3.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
