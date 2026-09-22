'use client';

import { motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import { Mail, Linkedin, MapPin, Github, Twitter, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <CustomCursor />
      <Navbar isRevealed={true} />

      {/* Fixed Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-amber-500/15 via-orange-600/5 to-transparent rounded-full blur-[130px]" />
      </div>

      <main className="relative z-10 min-h-[90vh] bg-[#080808] text-white pt-36 sm:pt-44 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-4xl w-full text-center">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-500 font-mono">
              LET&apos;S BUILD SOMETHING TOGETHER
            </span>

            {/* Main Headline */}
            <h1 className="mt-5 font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Ready to bring your ideas<br className="hidden sm:inline" /> to life?
            </h1>

            {/* Subtext */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed">
              I&apos;m currently available for freelance projects and full-time opportunities.
              <br className="hidden sm:inline" />
              Let&apos;s talk about your next project!
            </p>
          </motion.div>

          {/* Contact 3-Column Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-12 w-full rounded-[28px] border border-white/10 bg-[#111111]/90 p-8 md:p-10 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Email */}
              <a
                href="mailto:ritikchauhan@gmail.com"
                className="group flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 group-hover:scale-105">
                  <Mail className="h-6 w-6 text-amber-500" />
                </div>
                <span className="text-xs text-neutral-400 font-medium mt-3">Email</span>
                <span className="text-sm sm:text-base font-semibold text-white mt-1 group-hover:text-amber-400 transition-colors">
                  ritikchauhan@gmail.com
                </span>
              </a>

              {/* LinkedIn */}
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

              {/* Location */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-6 w-6 text-amber-500" />
                </div>
                <span className="text-xs text-neutral-400 font-medium mt-3">Location</span>
                <span className="text-sm sm:text-base font-semibold text-white mt-1">India</span>
              </div>
            </div>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
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
      </main>

      <Footer />
    </>
  );
}
