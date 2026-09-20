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

  // Lock scroll during preloader
  useEffect(() => {
    document.body.style.overflow = loaded ? 'auto' : 'hidden';
  }, [loaded]);

  const isRevealed = isExiting || loaded;

  return (
    <>
      <CustomCursor />
      {!loaded && (
        <Preloader
          onExitStart={() => setIsExiting(true)}
          onDone={() => setLoaded(true)}
        />
      )}
      <Navbar isRevealed={isRevealed} />
      <motion.main
        className="relative"
        initial={{ y: '100vh' }}
        animate={{ y: isRevealed ? '0vh' : '100vh' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
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
