'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import TiltCard from '@/components/TiltCard';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  CheckCircle2,
  Clock,
  Lock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'all' | 'website' | 'uisystem' | 'mobile';
  tag: string;
  badge: string;
  badgeType: 'live' | 'stealth';
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  link: string;
  linkLabel: string;
  isExternal: boolean;
  statusText: string;
  technologies: string[];
  features: string[];
  stats: { label: string; value: string }[];
  marketNotice?: string;
}

const projects: Project[] = [
  {
    id: 'uipirate-web',
    title: 'UI Pirate',
    category: 'website',
    tag: 'Web Platform & SaaS',
    badge: 'Live Platform',
    badgeType: 'live',
    subtitle: 'Modern High-Converting SaaS & Template Web Platform',
    description:
      'A modern portfolio/SaaS product template and web platform built with Next.js, Tailwind CSS, and Framer Motion.',
    longDescription:
      'UI Pirate is engineered for creators and product founders who demand conversion-optimized architecture with unapologetically sleek dark aesthetics. Featuring fluid micro-interactions, responsive grid layouts, and high-performance rendering.',
    image:
      'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://uipirate.com/',
    linkLabel: 'Visit Website',
    isExternal: true,
    statusText: 'Live in Production',
    technologies: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Core Web Vitals'],
    features: [
      'High-converting modern landing page architecture',
      'Fluid 60FPS Framer Motion animations & buttery micro-interactions',
      'Curated dark theme with golden amber accent lighting',
      'Ultra-responsive typography with Plus Jakarta Sans & Space Grotesk',
    ],
    stats: [
      { label: 'Performance', value: '99/100' },
      { label: 'Design System', value: 'Custom Dark' },
      { label: 'Architecture', value: 'Next.js 14' },
    ],
  },
  {
    id: 'uipirate-ui-system',
    title: 'UI Pirate UI System',
    category: 'uisystem',
    tag: 'UI System & Tokens',
    badge: 'Component Lab',
    badgeType: 'live',
    subtitle: 'Tactile Pill Button & Physics-Based Micro-Component Suite',
    description:
      'A comprehensive, accessible UI system and component library engineered for modern web apps with dark mode and micro-interactions.',
    longDescription:
      'Engineered for tactile satisfaction and uncompromising accessibility. The UI Pirate component lab includes the signature tactile pill button, glassmorphic cards, custom form controls, and modular design tokens that elevate frontend experiences.',
    image: '/uipirate_ui_system.jpg',
    link: 'https://uipirate.com/componentlab/tactile-pill-button',
    linkLabel: 'Explore Component Lab',
    isExternal: true,
    statusText: 'Interactive Lab Live',
    technologies: ['React 18', 'Tailwind CSS', 'Framer Motion', 'Design Tokens', 'Radix Primitives'],
    features: [
      'Signature Tactile Pill Button with spring physics & haptic-feel feedback',
      'Curated dark-mode token system with precise contrast hierarchy',
      'WCAG AAA accessible keyboard navigation and screen reader support',
      'Drop-in modular components ready for enterprise production',
    ],
    stats: [
      { label: 'Micro-Interactions', value: 'Spring Physics' },
      { label: 'Accessibility', value: 'WCAG AAA' },
      { label: 'Tokens', value: '100% Modular' },
    ],
  },
  {
    id: 'camporaone',
    title: 'Camporaone',
    category: 'mobile',
    tag: 'EdTech Mobile Ecosystem',
    badge: 'In Stealth • Market Launch Soon',
    badgeType: 'stealth',
    subtitle: 'Next-Generation Smart School Management & Mobile App Ecosystem',
    description:
      'Next-generation smart school management & learning mobile app connecting teachers, students, and parents seamlessly.',
    longDescription:
      'Camporaone redefines school management by unifying administration, real-time teacher-parent synergy, student grade tracking, digital attendance, and fee management into an intuitive, high-speed mobile application.',
    image: '/evoskool_mobile.jpg',
    link: '/contact?subject=Camporaone%20Private%20Demo%20Inquiry',
    linkLabel: 'Request Private Demo',
    isExternal: false,
    statusText: 'Private Beta • Commercial Launch Q4 2026',
    technologies: ['React Native', 'Expo', 'Android & iOS'],
    features: [
      'Synchronized multi-role portals for teachers, students, parents & administrators',
      'Real-time automated attendance logging & instant absent alerts',
      'Interactive grading analytics, homework dispatch, and report card generation',
      'End-to-end encrypted school communication & fee installment tracking',
    ],
    stats: [
      { label: 'Market Status', value: 'Private Beta' },
      { label: 'Platform', value: 'Android & iOS' },
      { label: 'Expected Launch', value: 'Q4 2026' },
    ],
    marketNotice:
      'Commercial Status: Camporaone is currently under active private stealth development and has not yet made its public market debut. Currently undergoing private beta trials with select academic institutions. Architecture walkthroughs and private prototype demonstrations are available upon request.',
  },
];

const categories = [
  { id: 'all', label: 'All Works', count: 3 },
  { id: 'website', label: 'Websites & SaaS', count: 1 },
  { id: 'uisystem', label: 'UI Systems', count: 1 },
  { id: 'mobile', label: 'Mobile Apps', count: 1 },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'website' | 'uisystem' | 'mobile'>('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <CustomCursor />
      <Navbar isRevealed={true} />

      {/* Fixed Ambient Orange Lighting Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] max-w-[950px] max-h-[950px] bg-gradient-to-br from-amber-500/40 via-orange-600/25 to-transparent rounded-full blur-[130px]" />
      </div>

      <main className="relative z-10 min-h-screen bg-[#080808]/90 text-white pt-32 pb-24 px-6 md:px-12 selection:bg-amber-500/20 selection:text-amber-300">
        {/* ============================================================== */}
        {/* HERO SECTION                                                  */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl pt-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Breadcrumb / Badge */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-400 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-neutral-600" />
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold tracking-[0.2em] text-amber-400 uppercase">
                Explore Work
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Selected works, <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                crafted with precision.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-400">
              An archive of live web platforms, tactile UI systems, and stealth mobile applications
              engineered with obsessively refined aesthetics, performance, and interaction design.
            </p>

            {/* Filter Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${isActive
                        ? 'bg-amber-500 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                        : 'border border-white/10 bg-[#121212] text-neutral-400 hover:border-amber-500/40 hover:text-white'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono ${isActive
                          ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                          : 'bg-white/10 text-neutral-400'
                        }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ============================================================== */}
        {/* PROJECTS SHOWCASE LIST                                         */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl space-y-16 sm:space-y-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16 sm:space-y-24"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  id={project.id}
                  className="group relative rounded-3xl border border-white/10 bg-[#0e0e0e]/90 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-amber-500/40"
                >
                  {/* Subtle Background Accent Gradient */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Col: Project Details (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Tags Header */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-amber-400">
                            {project.tag}
                          </span>

                          {project.badgeType === 'live' ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {project.badge}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                              {project.badge}
                            </span>
                          )}
                        </div>

                        {/* Project Title */}
                        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300">
                          {project.title}
                        </h2>

                        <p className="mt-2 text-base sm:text-lg font-medium text-neutral-300">
                          {project.subtitle}
                        </p>

                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
                          {project.longDescription}
                        </p>

                        {/* Stealth / Market Notice Callout for Camporaone */}
                        {project.marketNotice && (
                          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                                <Clock className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                                  Market Launch Status
                                </h4>
                                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-neutral-300">
                                  {project.marketNotice}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Feature Highlights */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.features.map((feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-[#141414] p-3 text-xs sm:text-sm text-neutral-300"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mr-1">
                            Stack:
                          </span>
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-white/10 bg-[#161616] px-2.5 py-1 text-xs font-medium text-neutral-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs & External Links */}
                      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
                        {project.isExternal ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                          >
                            <span>{project.linkLabel}</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        ) : (
                          <Link
                            href={project.link}
                            className="group/btn inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                          >
                            <span>{project.linkLabel}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        )}

                        <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
                          {project.statusText}
                        </span>
                      </div>
                    </div>

                    {/* Right Col: Image Preview with Tilt Effect (5 cols) */}
                    <div className="lg:col-span-5">
                      <TiltCard className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-950">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80" />

                          {/* Top floating pill */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                            <span className="rounded-full border border-neutral-700 bg-neutral-900/90 px-3 py-1 text-xs font-medium text-amber-400 backdrop-blur-md">
                              {project.title}
                            </span>
                            {project.isExternal && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Stats Grid */}
                        <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-[#121212] p-4 text-center">
                          {project.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="px-2">
                              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                                {stat.label}
                              </p>
                              <p className="mt-1 truncate text-xs sm:text-sm font-bold text-white">
                                {stat.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TiltCard>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ============================================================== */}
        {/* BOTTOM CALL TO ACTION                                          */}
        {/* ============================================================== */}
        <section className="mx-auto max-w-7xl mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-8 sm:p-12 lg:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-500 font-semibold">
                HAVE A PROJECT IN MIND?
              </span>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Let&apos;s build your next digital landmark.
              </h3>

              <p className="mt-4 text-sm sm:text-base text-neutral-400">
                Whether you need a high-converting web presence, a scalable design system, or a
                full-stack mobile app, I can help you bring it to life.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                >
                  Start a Conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-6 py-3.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
