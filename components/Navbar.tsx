'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Reviews', href: '/#reviews' },
];

interface NavbarProps {
  isRevealed?: boolean;
}

export default function Navbar({ isRevealed = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/#contact');
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[60] backdrop-blur-md bg-black/10 border-b border-white/5">
      <div className="px-6 md:px-12 lg:px-20 py-4 max-w-[1400px] mx-auto">
        <motion.nav
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left: Avatar + Name (Single line) -> Scrolls / Routes back to Hero */}
          <Link
            href="/#hero"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/#hero');
              }
            }}
            className="flex items-center gap-3 group"
          >
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-110 transition-transform">
              RC
            </span>
            <span className="text-white text-sm font-medium tracking-wide hidden md:block group-hover:text-amber-400 transition-colors">
              Ritik Chauhan · Developer
            </span>
          </Link>

          {/* Center: Clean nav links with amber animated bottom underline */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 text-sm hover:text-white transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right: Solid white pill button 'Let's talk' */}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="hidden md:inline-flex px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]"
          >
            Let&apos;s talk
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </motion.nav>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-6 border-t border-white/10 flex flex-col gap-5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="w-full py-3 bg-white hover:bg-amber-400 text-black text-center font-bold rounded-full text-sm transition-all"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleContactClick(e);
                }}
              >
                Let&apos;s talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
