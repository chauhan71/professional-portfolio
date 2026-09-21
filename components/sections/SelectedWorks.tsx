'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const projects = [
  {
    title: 'UI Pirate',
    description:
      'A modern portfolio/SaaS product template built with Next.js, Tailwind CSS, and Framer Motion.',
    tag: 'Template',
    image:
      'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://uipirate.com/',
    isExternal: true,
  },
  {
    title: 'UI Pirate',
    description:
      'A comprehensive, accessible UI system and component library engineered for modern web apps with dark mode and micro-interactions.',
    tag: 'UI System',
    image: '/uipirate_ui_system.jpg',
    link: 'https://uipirate.com/componentlab/tactile-pill-button',
    isExternal: true,
  },
  {
    title: 'Camporaone',
    description:
      'Next-generation smart school management & learning mobile app connecting teachers, students, and parents seamlessly.',
    tag: 'EdTech App',
    image: '/evoskool_mobile.jpg',
    link: '/work#camporaone',
    isExternal: false,
  },
];

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

export default function SelectedWorks() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-500">
              RECENT WORK
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Selected works, crafted with precision.
            </h2>
          </div>
          <Link
            href="/work"
            className="group flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-amber-500"
          >
            Explore work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <TiltCard className="group h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
                {/* Preview */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs font-medium text-amber-500 backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                  {project.isExternal ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-colors hover:text-amber-400"
                    >
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-colors hover:text-amber-400"
                    >
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            View all work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
