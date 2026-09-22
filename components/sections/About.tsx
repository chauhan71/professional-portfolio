'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MetricItem {
  target: number;
  suffix: string;
  label: string;
}

const metrics: MetricItem[] = [
  { target: 20, suffix: '+', label: 'Projects Shipped' },
  { target: 100, suffix: 'k+', label: 'Lines of Code' },
  { target: 10, suffix: '+', label: 'Happy Clients' },
  { target: 3, suffix: '+', label: 'Years Experience' },
];

function StatCounter({
  target,
  suffix = '+',
  delay = 0,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let rafId: number;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1600; // 1.6s smooth count-up

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease out cubic: brisk launch, smooth landing at exact target
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          rafId = requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };

      rafId = requestAnimationFrame(update);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [isInView, target, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-500">
              WHO I AM
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              I am a Front-end creative and animation developer focused on
              creating immersive digital experiences.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
              I specialize in building performant, accessible, and visually
              stunning web applications. With a deep passion for motion design
              and interaction, I bridge the gap between design and code to bring
              wild ideas to life.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
            >
              About me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right column: metrics bento */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-4"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={item}
                className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 sm:p-6 transition-colors hover:border-amber-500/30 ${
                  i === 0 ? 'md:translate-y-0' : ''
                } ${i === 1 ? 'md:translate-y-8' : ''} ${i === 2 ? 'md:-translate-y-4' : ''} ${i === 3 ? 'md:translate-y-4' : ''}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-amber-500/5 group-hover:to-transparent" />
                <div className="relative">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    <StatCounter
                      target={m.target}
                      suffix={m.suffix}
                      delay={0.15 + i * 0.1}
                    />
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{m.label}</p>
                </div>
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-amber-500/30 transition-all duration-500 group-hover:bg-amber-500 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
