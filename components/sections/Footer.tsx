'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, MapPin, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden px-6 pt-24 md:px-8 md:pt-32">
      {/* Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-display text-[30vw] font-bold leading-none tracking-tighter text-white/[0.03]">
          RITIK
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-amber-500">
            LET&apos;S BUILD SOMETHING TOGETHER
          </span>

          {/* Layered echo heading */}
          <div className="relative mt-6">
            <span
              aria-hidden
              className="text-stroke-white pointer-events-none absolute inset-0 font-display text-4xl font-bold tracking-tight md:text-6xl"
              style={{ transform: 'translate(-4px, 4px)' }}
            >
              Ready to bring your ideas to life?
            </span>
            <h2 className="relative font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              Ready to bring your ideas to life?
            </h2>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400">
            I&apos;m currently available for freelance projects and full-time
            opportunities. Let&apos;s talk about your next project!
          </p>
        </motion.div>

        {/* Contact pill card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md md:p-8"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <a
              href="mailto:ritikchauhan@gmail.com"
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/60 transition-colors group-hover:border-amber-500/40 group-hover:bg-amber-500/10">
                <Mail className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-500">Email</span>
              <span className="text-sm font-medium text-white">ritikchauhan@gmail.com</span>
            </a>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/60">
                <Linkedin className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-500">LinkedIn</span>
              <span className="text-sm font-medium text-white">Ritik Chauhan</span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/60">
                <MapPin className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-xs text-neutral-500">Location</span>
              <span className="text-sm font-medium text-white">India</span>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Instagram, label: 'Instagram' },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-all hover:border-amber-500/40 hover:text-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 py-8 md:flex-row">
          <p className="text-xs text-neutral-500">
            RC © 2026 Ritik Chauhan. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <a href="mailto:ritikchauhan@gmail.com" className="transition-colors hover:text-amber-500">
              ritikchauhan@gmail.com
            </a>
            <span className="text-neutral-700">|</span>
            <a href="tel:+910000000000" className="transition-colors hover:text-amber-500">
              +91 000 000 0000
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
