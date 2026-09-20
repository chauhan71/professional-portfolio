'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Partner Love', href: '#testimonials' },
];

interface NavbarProps {
  isRevealed?: boolean;
}

export default function Navbar({ isRevealed = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={isRevealed ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Avatar + name */}
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-md">
            <span className="font-display text-sm font-bold text-amber-500">RC</span>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-white">Ritik Chauhan</span>
            <span className="text-xs text-neutral-500">Developer</span>
          </div>
        </a>

        {/* Center: Floating pill nav */}
        <nav
          className={`flex items-center gap-1 rounded-full border border-neutral-800 px-2 py-2 backdrop-blur-md transition-colors duration-300 ${
            scrolled ? 'bg-neutral-900/80' : 'bg-neutral-900/40'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white md:px-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <a
          href="#contact"
          className="group flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] md:px-5"
        >
          Let&apos;s Talk
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
