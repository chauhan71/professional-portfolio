'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import { Mail, Linkedin, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `*New Portfolio Inquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${formData.subject || 'General Inquiry'}\n\n` +
      `*Message:*\n${formData.message}`
    );

    // Open WhatsApp directly to your number +91 6202923295
    window.open(`https://wa.me/916202923295?text=${text}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <CustomCursor />
      <Navbar isRevealed={true} />

      <main className="min-h-screen bg-[#080808] text-white pt-32 pb-20 px-6 md:px-12 flex items-center">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: HERO HEADINGS & CONTACT CARDS                     */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* Badge */}
              <span className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase font-mono">
                GET IN TOUCH
              </span>

              {/* Main Headline */}
              <h1 className="mt-4 font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Time to roar!
              </h1>
              <h2 className="mt-2 font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-400 leading-[1.12]">
                Let&apos;s create something extraordinary together.
              </h2>

              {/* Subtext */}
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400 max-w-lg">
                I&apos;m currently available for freelance projects and full-time
                opportunities. Reach out and let&apos;s discuss how I can help your
                project thrive in the digital wilderness.
              </p>
            </div>

            {/* Vertical Stack Contact Cards */}
            <div className="mt-10 flex flex-col gap-3.5 max-w-md">
              {/* 1. Email Card */}
              <a
                href="mailto:chouhanritik80@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-[#121212] p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#181818]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800/70 text-amber-400 transition-colors group-hover:bg-amber-500/15">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    EMAIL
                  </span>
                  <span className="truncate text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    chouhanritik80@gmail.com
                  </span>
                </div>
              </a>

              {/* 2. LinkedIn Card */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-[#121212] p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#181818]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800/70 text-amber-400 transition-colors group-hover:bg-amber-500/15">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    LINKEDIN
                  </span>
                  <span className="truncate text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    Ritik Chauhan
                  </span>
                </div>
              </a>

              {/* 3. Phone Card */}
              <a
                href="tel:+916202923295"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-[#121212] p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#181818]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800/70 text-amber-400 transition-colors group-hover:bg-amber-500/15">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    PHONE
                  </span>
                  <span className="truncate text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    +91 6202923295
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: INTERACTIVE MESSAGE FORM                         */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-white/10 bg-[#121212] p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <h3 className="text-2xl font-bold tracking-wide text-white mb-8">
                Send me a message
              </h3>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-14 w-14 text-amber-400 mb-4 animate-bounce" />
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-sm text-neutral-400 mt-2 max-w-sm">
                    Thank you for reaching out, Ritik will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono font-semibold tracking-widest uppercase text-neutral-400">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/5 bg-[#1a1a1a] px-4 py-3.5 text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono font-semibold tracking-widest uppercase text-neutral-400">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/5 bg-[#1a1a1a] px-4 py-3.5 text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-semibold tracking-widest uppercase text-neutral-400">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/5 bg-[#1a1a1a] px-4 py-3.5 text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>

                  {/* Row 3: Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-semibold tracking-widest uppercase text-neutral-400">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-white/5 bg-[#1a1a1a] px-4 py-3.5 text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-amber-500 py-4 text-center text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
