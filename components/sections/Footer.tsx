'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Linkedin, MapPin, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = watermarkRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--torch-x', `${x}px`);
      el.style.setProperty('--torch-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden px-6 pt-24 md:px-8 md:pt-32 bg-[#0a0a0a]">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Top "Let's talk" pill button (Matches Image 1) */}


        {/* CTA (Matches Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-500 font-mono">
            LET&apos;S BUILD SOMETHING TOGETHER
          </span>

          {/* Clean Crisp Heading */}
          <h2 className="mt-5 font-sans text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-[1.05]">
            Ready to bring your ideas<br className="hidden sm:inline" /> to life?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
            I&apos;m currently available for freelance projects and full-time opportunities.
            <br className="hidden sm:inline" />
            Let&apos;s talk about your next project!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-5 mt-5"
        >
          <a
            href="mailto:ritikchauhan@gmail.com"
            className="group inline-flex items-center px-8 py-3 rounded-full bg-white text-black font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-amber-400 hover:scale-105 hover:shadow-[0_0_35px_rgba(251,191,36,0.7)] active:scale-95 select-none cursor-pointer"
          >
            Let&apos;s talk
          </a>
        </motion.div>

        {/* Contact pill card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-white/10 bg-[#111111]/90 p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <a
              href="mailto:ritikchauhan@gmail.com"
              className="group flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 group-hover:scale-105">
                <Mail className="h-6 w-6 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-400 font-medium mt-3">Email</span>
              <span className="text-sm sm:text-base font-semibold text-white mt-1 group-hover:text-amber-400 transition-colors break-all sm:break-normal">
                ritikchauhan@gmail.com
              </span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 group-hover:scale-105">
                <Linkedin className="h-6 w-6 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-400 font-medium mt-3">LinkedIn</span>
              <span className="text-sm sm:text-base font-semibold text-white mt-1 group-hover:text-amber-400 transition-colors">
                Ritik Chauhan
              </span>
            </a>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <MapPin className="h-6 w-6 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-400 font-medium mt-3">Location</span>
              <span className="text-sm sm:text-base font-semibold text-white mt-1">India</span>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, label: 'GitHub', href: 'https://github.com' },
            { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
            { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-all hover:border-amber-500/40 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE SCANLINE WATERMARK SECTION (Slow motion in X)       */}
      {/* ============================================================== */}
      <div
        ref={watermarkRef}
        data-torch-zone="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mt-8 md:mt-12 min-h-[300px] sm:min-h-[360px] md:min-h-[440px] flex items-center justify-center overflow-hidden md:cursor-none select-none"
      >
        {/* Up & Down Motion (Dynamic & Lively) */}
        <div
          className="relative flex items-center justify-center w-full will-change-transform group-hover:[animation-play-state:paused]"
          style={{
            animation: 'float-y 4s ease-in-out infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {/* Base Layer: Dark Striped Horizontal Scanlines */}
          <span
            className="font-display text-[26vw] md:text-[20vw] font-black tracking-widest leading-none select-none watermark-scanlines"
            style={{ color: 'rgba(255, 255, 255, 0.12)' }}
          >
            RITIK
          </span>

          {/* Illuminated Layer: Glowing Scanlines Revealed by Torch */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[26vw] md:text-[20vw] font-black tracking-widest leading-none select-none watermark-scanlines transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              color: '#ffffff',
              filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.8))',
              WebkitMaskImage:
                'radial-gradient(circle 240px at var(--torch-x, -999px) var(--torch-y, -999px), black 30%, rgba(0,0,0,0.5) 60%, transparent 100%)',
              maskImage:
                'radial-gradient(circle 240px at var(--torch-x, -999px) var(--torch-y, -999px), black 30%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            }}
          >
            RITIK
          </span>
        </div>

        {/* Downward Light Cone Beam (from Torch to Floor) */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            clipPath:
              'polygon(var(--torch-x, -999px) var(--torch-y, -999px), calc(var(--torch-x, -999px) - 170px) 100%, calc(var(--torch-x, -999px) + 170px) 100%)',
            background:
              'linear-gradient(to bottom, rgba(245, 158, 11, 0.42) 0%, rgba(217, 119, 6, 0.2) 45%, rgba(245, 158, 11, 0.02) 100%)',
          }}
          aria-hidden
        />

        {/* Radial Ambient Torch Halo */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            background:
              'radial-gradient(circle 240px at var(--torch-x, -999px) var(--torch-y, -999px), rgba(245, 158, 11, 0.38) 0%, rgba(217, 119, 6, 0.16) 40%, rgba(245, 158, 11, 0.03) 70%, transparent 100%)',
          }}
          aria-hidden
        />

        {/* The Torch Graphic Attached to Cursor */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-40 transition-opacity duration-150 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            transform:
              'translate3d(var(--torch-x, -999px), var(--torch-y, -999px), 0) translate(-50%, -50%)',
            willChange: 'transform',
          }}
          aria-hidden
        >
          <div className="relative flex flex-col items-center">
            {/* 1. Glowing Flame Head (Pointing Upward) */}
            <div className="relative z-10 -mb-1 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-amber-500/30 blur-md animate-pulse pointer-events-none" />
              <div
                className="w-4 h-6 rounded-t-full rounded-b-sm bg-gradient-to-t from-amber-500 via-amber-200 to-white"
                style={{
                  boxShadow:
                    '0 0 12px 3px #ffffff, 0 0 24px 8px #f59e0b, 0 -12px 32px 10px rgba(251, 191, 36, 0.65)',
                }}
              />
            </div>

            {/* 2. Metal Collar */}
            <div className="z-10 w-3.5 h-1.5 rounded-xs bg-gradient-to-r from-[#d97706] via-[#fef08a] to-[#b45309]" />

            {/* 3. Wooden Handle */}
            <div className="z-10 w-2.5 h-7 rounded-b-xs bg-gradient-to-b from-[#8B5A2B] via-[#6e411b] to-[#42230c] shadow-[0_2px_8px_rgba(0,0,0,0.8)] border-x border-amber-950/50" />

            {/* 4. Attached Cursor Base Ring with Center Dot */}
            <div className="relative -mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/[0.04] shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto max-w-7xl border-t border-neutral-800/80 py-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs text-neutral-500">
          RC © 2026 Ritik Chauhan. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-neutral-500">
          <a href="mailto:ritikchauhan@gmail.com" className="transition-colors hover:text-amber-500">
            ritikchauhan@gmail.com
          </a>
          <span className="text-neutral-700">|</span>
          <a href="tel:+910000000000" className="transition-colors hover:text-amber-500">
            +91 6202923295
          </a>
        </div>
      </div>
    </footer>
  );
}
