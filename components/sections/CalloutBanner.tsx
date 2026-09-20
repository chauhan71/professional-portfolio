'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const marqueeItems = ['WILD IDEAS!', 'WILD IDEAS!', "LET'S DIVE IN!"];

export default function CalloutBanner() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-20 md:py-28 bg-[#0a0a0a]">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-10 text-center"
      >
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
          WILD IDEAS!
        </span>
      </motion.div>

      {/* Watermark Marquee (Subtle, Ghosted, and Slow) */}
      <div className="relative flex overflow-hidden py-4 opacity-35 transition-opacity duration-500 hover:opacity-55 select-none">
        {/* Track 1 */}
        <div
          className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee 55s linear infinite',
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`font-display text-6xl font-extrabold tracking-tight md:text-8xl ${
                i % 3 === 2
                  ? 'text-amber-500/40'
                  : 'text-stroke-white opacity-40'
              }`}
            >
              {item}
              <span className="mx-6 text-white/15">—</span>
            </span>
          ))}
        </div>

        {/* Track 2 (Duplicate for infinite seamless wrap) */}
        <div
          className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 will-change-transform hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee 55s linear infinite',
          }}
          aria-hidden
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`b-${i}`}
              className={`font-display text-6xl font-extrabold tracking-tight md:text-8xl ${
                i % 3 === 2
                  ? 'text-amber-500/40'
                  : 'text-stroke-white opacity-40'
              }`}
            >
              {item}
              <span className="mx-6 text-white/15">—</span>
            </span>
          ))}
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
        <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-neutral-400">
          Like a lion&apos;s roar echoing through the jungle, a hint of our
          creative minds emerges.
        </p>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-colors hover:text-amber-400"
        >
          View Dribbble
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
