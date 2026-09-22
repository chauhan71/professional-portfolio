'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import SelectedWorks from '@/components/sections/SelectedWorks';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Testimonials from '@/components/sections/Testimonials';
import CalloutBanner from '@/components/sections/CalloutBanner';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  // Check if user has already experienced the preloader in this session or coming via section hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyDone = sessionStorage.getItem('portfolio_preloader_done') === 'true';
      const hasHash = Boolean(window.location.hash);

      if (alreadyDone || hasHash) {
        setLoaded(true);
        setIsExiting(true);
        setIsReturning(true);
        document.body.style.overflow = 'auto';

        if (hasHash) {
          setTimeout(() => {
            if (window.location.hash === '#hero') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const target = document.querySelector(window.location.hash);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 200);
        }
      }
    }
  }, []);

  // Listen to hash changes on the current page for smooth navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lock scroll only while the initial preloader is active
  useEffect(() => {
    if (!isReturning) {
      document.body.style.overflow = loaded ? 'auto' : 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loaded, isReturning]);

  const handleExitStart = () => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_preloader_done', 'true');
    }
  };

  const handleDone = () => {
    setLoaded(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_preloader_done', 'true');
    }
  };

  const isRevealed = isExiting || loaded || isReturning;

  return (
    <>
      <CustomCursor />
      {!loaded && !isReturning && (
        <Preloader
          onExitStart={handleExitStart}
          onDone={handleDone}
        />
      )}
      {/* Fixed Ambient Orange Lighting Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-amber-500/30 via-orange-600/15 to-transparent rounded-full blur-[110px]" />
      </div>

      <Navbar isRevealed={isRevealed} />
      <motion.main
        className="relative"
        initial={isReturning ? { y: '0vh' } : { y: '100vh' }}
        animate={{ y: isRevealed ? '0vh' : '100vh' }}
        transition={
          isReturning
            ? { duration: 0 }
            : { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
        }
      >
        <Hero isRevealed={isRevealed} />
        <SelectedWorks />
        <About />
        <TechStack />
        <Testimonials />
        <CalloutBanner />
        <Footer />
      </motion.main>
    </>
  );
}
