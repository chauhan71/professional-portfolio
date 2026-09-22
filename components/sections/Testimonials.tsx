'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Albert Misano',
    role: 'Founder of The Misano',
    text: 'We had a fantastic experience partnering with Ritik for our website. The communication and collaboration were excellent, and the final product exceeded all our expectations. His attention to detail and creative approach truly set him apart.',
  },
  {
    name: 'Stephen Dash',
    role: 'Founder & CEO of Credible',
    text: 'Ritik is extremely reliable, professional and talented. It has been a great pleasure collaborating with him on multiple projects. His ability to translate design vision into flawless code is remarkable.',
  },
  {
    name: 'Zoltan Csereko',
    role: 'Founder & CEO of Ventigence',
    text: "Ritik's creative vision and technical expertise helped us transform our digital presence. The animations and interactions he built gave our product a truly premium feel that our users love.",
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Product at Horizon AI',
    text: 'Working with Ritik was an absolute game changer. His attention to detail, performance optimization, and creative motion design took our digital product to a whole new level.',
  },
  {
    name: 'Marcus Vance',
    role: 'Design Director at Atelier',
    text: 'Ritik has a rare talent for bridging high-concept interaction design with clean, production-ready code. Delivered ahead of schedule with immaculate craftsmanship.',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ startX: -260, endX: 20 });
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calcBounds = () => {
      if (!containerRef.current) return;
      setIsMobile(window.innerWidth < 768);
      const containerW = containerRef.current.offsetWidth;
      // 5 cards of w-[420px] on desktop / w-[360px] on mobile + 24px gap
      const cardWidth = window.innerWidth < 640 ? 320 : window.innerWidth < 1024 ? 380 : 420;
      const cardTrackW = 5 * cardWidth + 4 * 24;

      if (cardTrackW > containerW) {
        // Sweep across all 5 cards from left to right, then reverse
        const overflow = cardTrackW - containerW + 48;
        setBounds({ startX: -overflow, endX: 24 });
      } else {
        const maxRange = Math.min((containerW - cardTrackW) * 0.75 + 40, 220);
        setBounds({ startX: -maxRange, endX: maxRange });
      }
    };

    calcBounds();
    window.addEventListener('resize', calcBounds);
    return () => window.removeEventListener('resize', calcBounds);
  }, []);

  return (
    <section id="reviews" className="relative px-0 py-24 md:py-32 overflow-hidden">
      <div id="testimonials" className="absolute -top-24" />
      <style jsx>{`
        @keyframes pingPongMotion {
          0% {
            transform: translate3d(var(--start-x, -260px), 0, 0);
          }
          100% {
            transform: translate3d(var(--end-x, 20px), 0, 0);
          }
        }
        .ping-pong-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center md:text-left"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-amber-500 uppercase">
            REVIEWS
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Take heed, as the lion&apos;s roar in my client reviews resounds.
          </h2>
        </motion.div>
      </div>

      {/* Testimonials Stage */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 flex justify-center"
      >
        {/* Left and Right Vignette Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        {/* 5 Wide Review Cards Track: moves right first, then reverses when end is reached */}
        <div
          className="ping-pong-track flex w-max flex-nowrap gap-6 will-change-transform"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            ['--start-x' as any]: `${bounds.startX}px`,
            ['--end-x' as any]: `${bounds.endX}px`,
            animation: `pingPongMotion ${isMobile ? '38s' : '14s'} ease-in-out infinite alternate`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative w-[290px] sm:w-[380px] md:w-[420px] min-h-[270px] flex flex-col justify-between shrink-0 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-500/40 hover:bg-[#161616] hover:shadow-[0_15px_35px_rgba(245,158,11,0.12)] select-none"
            >
              {/* Card Top: Clean Quote Pill without stars */}
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-colors group-hover:border-amber-500/40 group-hover:bg-amber-500/15">
                  <Quote className="h-4 w-4 fill-amber-400/20" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  VERIFIED REVIEW
                </span>
              </div>

              {/* Card Body: Review Quote */}
              <p className="my-5 text-sm sm:text-base leading-relaxed text-neutral-300 transition-colors group-hover:text-white">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Card Bottom: Author Info */}
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900 font-display text-xs font-bold text-amber-400 shadow-inner group-hover:border-amber-500/30">
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white tracking-tight">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-neutral-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mt-12 text-center">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-2.5 text-xs sm:text-sm font-medium text-neutral-300 transition-all hover:border-amber-500/50 hover:text-white hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
        >
          Work with me
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-amber-400" />
        </a>
      </div>
    </section>
  );
}
