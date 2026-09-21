'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  isRevealed?: boolean;
}

export default function Hero({ isRevealed = true }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Atmospheric background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.8) 60%, #0a0a0a 100%), url(/arctic_open_lagoon.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 z-10" />

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Main heading */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={
              isRevealed
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 40, filter: 'blur(10px)' }
            }
            transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative font-display text-[14vw] font-bold leading-[0.9] tracking-tighter text-white md:text-[10vw]"
          >
            <span className="text-amber-200">Ritik Chauhan.</span>
          </motion.h1>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 30, filter: 'blur(8px)' }
          }
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 font-display text-[10vw] font-bold leading-[0.9] tracking-tighter text-white md:text-[7vw]"
        >
          Creative Developer.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-base text-neutral-400 md:text-lg"
        >
          I craft premium, animation-rich web experiences that feel tactile,
          intentional, and effortless — from initial concept to production-ready
          code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/work"
            className="group flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
          >
            Explore work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#skills"
            className="rounded-full border border-neutral-800 px-6 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:text-white"
          >
            Services
          </a>
          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-neutral-700 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-amber-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
