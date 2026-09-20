'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  faceX: number;
  faceY: number;
  scatterX: number;
  scatterY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export type IntroPhase =
  | 'forming'
  | 'ready'
  | 'scatter'
  | 'landscape'
  | 'nameIn'
  | 'nameFill'
  | 'nameHold'
  | 'exiting';

const PORTRAIT_URL = '/ritik_portrait.png?v=2';
const ICEBERG_BG_URL = '/arctic_open_lagoon.jpg';
const ICEBERG_FRAME_URL = '/iceberg_frame.png';

const PARTICLE_GAP = 3.2;
const FORMATION_DURATION = 3000; // 3.0 seconds snappy & fluid formation

interface PreloaderProps {
  onDone: () => void;
  onExitStart?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                 Geometric Bauhaus Typography Glyphs for "RITIK"            */
/* -------------------------------------------------------------------------- */

function GlyphR({ isFilled, delay }: { isFilled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1 max-w-[130px] aspect-[76/100]"
    >
      <svg
        viewBox="0 0 76 100"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        {/* Wireframe outline (Photos 2 & 3) */}
        <motion.path
          d="M 10,5 L 10,95 M 10,5 L 46,5 C 64,5 72,16 72,29 C 72,42 64,52 46,52 L 10,52 M 40,52 L 72,95"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: isFilled ? 0.25 : 0.95,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        {/* Solid geometric glyph (Photo 4) with transparent inner loop */}
        <motion.path
          d="M 6,5 H 48 C 64,5 74,16 74,29 C 74,42 64,52 48,52 H 22 V 95 H 6 Z M 22,18 H 46 C 52,18 58,23 58,29 C 58,35 52,40 46,40 H 22 Z M 34,49 H 54 L 74,95 H 54 Z"
          fillRule="evenodd"
          fill="rgba(255,255,255,0.98)"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: isFilled ? 1 : 0,
            scale: isFilled ? 1 : 0.96,
          }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
        />
      </svg>
    </motion.div>
  );
}

function GlyphI({ isFilled, delay }: { isFilled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[4vw] max-w-[32px] min-w-[12px] aspect-[20/100]"
    >
      <svg
        viewBox="0 0 20 100"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        {/* Wireframe outline */}
        <motion.line
          x1="10"
          y1="5"
          x2="10"
          y2="95"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{
            opacity: isFilled ? 0.25 : 0.95,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        {/* Solid geometric pillar */}
        <motion.rect
          x="2"
          y="5"
          width="16"
          height="90"
          rx="1"
          fill="rgba(255,255,255,0.98)"
          initial={{ opacity: 0, scaleY: 0.96 }}
          animate={{
            opacity: isFilled ? 1 : 0,
            scaleY: isFilled ? 1 : 0.96,
          }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
        />
      </svg>
    </motion.div>
  );
}

function GlyphT({ isFilled, delay }: { isFilled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1 max-w-[125px] aspect-[72/100]"
    >
      <svg
        viewBox="0 0 72 100"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        {/* Wireframe outline */}
        <motion.path
          d="M 2,12 H 70 M 36,12 V 95"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{
            opacity: isFilled ? 0.25 : 0.95,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        {/* Solid geometric T block */}
        <motion.path
          d="M 2,5 H 70 V 21 H 45 V 95 H 27 V 21 H 2 Z"
          fill="rgba(255,255,255,0.98)"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: isFilled ? 1 : 0,
            scale: isFilled ? 1 : 0.96,
          }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
        />
      </svg>
    </motion.div>
  );
}

function GlyphK({ isFilled, delay }: { isFilled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1 max-w-[130px] aspect-[76/100]"
    >
      <svg
        viewBox="0 0 76 100"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        {/* Wireframe outline */}
        <motion.path
          d="M 10,5 V 95 M 10,52 L 68,5 M 24,39 L 70,95"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: isFilled ? 0.25 : 0.95,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        {/* Solid geometric K */}
        <motion.path
          d="M 6,5 H 22 V 95 H 6 Z M 18,52 L 52,5 H 74 L 32,56 Z M 26,46 L 72,95 H 52 L 18,55 Z"
          fill="rgba(255,255,255,0.98)"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: isFilled ? 1 : 0,
            scale: isFilled ? 1 : 0.96,
          }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
        />
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Preloader Component                         */
/* -------------------------------------------------------------------------- */

export default function Preloader({ onDone, onExitStart }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const phaseRef = useRef<IntroPhase>('forming');
  const [phase, setPhase] = useState<IntroPhase>('forming');
  const [isScattered, setIsScattered] = useState(false);
  const isScatteredRef = useRef(false);
  const reassembleStartedAtRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const setIntroPhase = useCallback((nextPhase: IntroPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // Exit transition to hero section
  const handleExit = useCallback(() => {
    if (phaseRef.current === 'exiting') return;
    clearAllTimeouts();
    setIntroPhase('exiting');
    onExitStart?.();

    const exitTimer = setTimeout(() => {
      onDone();
    }, 920);
    timeoutsRef.current.push(exitTimer);
  }, [clearAllTimeouts, onDone, onExitStart, setIntroPhase]);

  // Stage A: Radial Shockwave on "Click to Enter"
  const handleEnter = useCallback(() => {
    if (phaseRef.current !== 'ready') return;
    clearAllTimeouts();
    setIntroPhase('scatter');

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (const particle of particlesRef.current) {
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = 24 + Math.random() * 20;
      particle.vx += (dx / distance) * force;
      particle.vy += (dy / distance) * force;
    }

    // Stage A (0ms - 400ms) -> Stage B: Iceberg Cave Entry & Camera Fly-Through
    const tLandscape = setTimeout(() => {
      if (phaseRef.current === 'scatter') {
        setIntroPhase('landscape');
      }
    }, 400);

    // Stage B (400ms - 1700ms) -> Stage C Part 1: Wireframe Name Appears
    const tNameIn = setTimeout(() => {
      if (phaseRef.current === 'landscape') {
        setIntroPhase('nameIn');
      }
    }, 1700);

    // Stage C Part 2 (3000ms): Foreground Iceberg Cave Vanishes, Letters Fill to Solid White
    const tNameFill = setTimeout(() => {
      if (phaseRef.current === 'nameIn') {
        setIntroPhase('nameFill');
      }
    }, 3000);

    // Stage D (3700ms): Name Hold with interactive hint
    const tHold = setTimeout(() => {
      if (phaseRef.current === 'nameFill') {
        setIntroPhase('nameHold');
      }
    }, 3700);

    timeoutsRef.current.push(tLandscape, tNameIn, tNameFill, tHold);
  }, [clearAllTimeouts, setIntroPhase]);

  // Toggle Scatter / Reassemble on background click (does not advance stage)
  const handleToggleScatter = useCallback((clickX?: number, clickY?: number) => {
    if (phaseRef.current !== 'ready') return;
    const nextScattered = !isScatteredRef.current;
    isScatteredRef.current = nextScattered;
    setIsScattered(nextScattered);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const originX = clickX ?? w / 2;
    const originY = clickY ?? h / 2;

    if (nextScattered) {
      // Scatter throughout the entire screen
      for (const particle of particlesRef.current) {
        particle.scatterX = 40 + Math.random() * (w - 100);
        particle.scatterY = 40 + Math.random() * (h - 100);

        const dx = particle.x - originX;
        const dy = particle.y - originY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = 12 + Math.random() * 22;
        particle.vx = (dx / distance) * speed + (Math.random() - 0.5) * 8;
        particle.vy = (dy / distance) * speed + (Math.random() - 0.5) * 8;
      }
    } else {
      // Reassemble: mark start timestamp so it uses identical smooth formation curve
      reassembleStartedAtRef.current = performance.now();
    }
  }, []);

  // Click anywhere handler
  const handleScreenClick = (event: React.MouseEvent) => {
    if (phase === 'ready') {
      handleToggleScatter(event.clientX, event.clientY);
    } else if (
      phase === 'landscape' ||
      phase === 'nameIn' ||
      phase === 'nameFill' ||
      phase === 'nameHold'
    ) {
      handleExit();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let startedAt = performance.now();
    let portraitReady = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const mask = document.createElement('canvas');
    const maskCtx = mask.getContext('2d');
    if (!maskCtx) return;

    const portrait = new Image();
    portrait.src = PORTRAIT_URL;

    // Preload both background and foreground frame images
    const bgImg = new Image();
    bgImg.src = ICEBERG_BG_URL;
    const frameImg = new Image();
    frameImg.src = ICEBERG_FRAME_URL;

    const buildParticles = () => {
      if (!portrait.naturalWidth || !portrait.naturalHeight) return;

      // Compact ~220px square portrait centered in the upper-mid screen
      const portraitSize = Math.min(Math.min(width, height) * 0.48, 225);
      const portraitWidth = portraitSize;
      const portraitHeight = portraitSize;

      mask.width = portraitWidth;
      mask.height = portraitHeight;
      maskCtx.clearRect(0, 0, portraitWidth, portraitHeight);

      const cx = width / 2;
      const cy = height / 2 - 45; // Elevated above center so the button has room
      const portraitX = cx - portraitWidth / 2;
      const portraitY = cy - portraitHeight / 2;

      maskCtx.drawImage(portrait, 0, 0, portraitWidth, portraitHeight);
      const pixels = maskCtx.getImageData(0, 0, portraitWidth, portraitHeight).data;
      const particles: Particle[] = [];

      // Sample corner pixels to auto-detect whether image has a white or dark background
      const c1 = (pixels[0] * 0.299 + pixels[1] * 0.587 + pixels[2] * 0.114);
      const c2 = (pixels[(portraitWidth - 1) * 4] * 0.299 + pixels[(portraitWidth - 1) * 4 + 1] * 0.587 + pixels[(portraitWidth - 1) * 4 + 2] * 0.114);
      const isLightBg = ((c1 + c2) / 2) > 120;

      for (let y = 0; y < portraitHeight; y += PARTICLE_GAP) {
        for (let x = 0; x < portraitWidth; x += PARTICLE_GAP) {
          const pixelIndex = (Math.floor(y) * Math.floor(portraitWidth) + Math.floor(x)) * 4;
          const red = pixels[pixelIndex] ?? 0;
          const green = pixels[pixelIndex + 1] ?? 0;
          const blue = pixels[pixelIndex + 2] ?? 0;
          const alphaVal = pixels[pixelIndex + 3] ?? 0;
          const luminance = red * 0.299 + green * 0.587 + blue * 0.114;

          if (alphaVal < 20) continue;

          // For light backgrounds (like Figma cutout with dark lines), sample dark pixels (< 130)
          // For dark backgrounds (white highlights on black), sample bright pixels (> 18)
          if (isLightBg) {
            if (luminance > 130) continue;
          } else {
            if (luminance < 18) continue;
          }

          const angle = Math.random() * Math.PI * 2;
          const radius = Math.max(width, height) * (0.35 + Math.random() * 0.7);
          const faceX = portraitX + x;
          const faceY = portraitY + y;
          const particleAlpha = isLightBg
            ? Math.min(0.95, 0.55 + (1 - luminance / 130) * 0.4)
            : Math.min(0.95, 0.4 + luminance / 255);

          particles.push({
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            homeX: faceX,
            homeY: faceY,
            faceX,
            faceY,
            scatterX: 40 + Math.random() * (width - 80),
            scatterY: 40 + Math.random() * (height - 80),
            vx: 0,
            vy: 0,
            size: 2.2,
            alpha: particleAlpha,
          });
        }
      }

      particlesRef.current = particles;
      portraitReady = true;
      startedAt = performance.now();
    };

    const animate = (now: number) => {
      const currentPhase = phaseRef.current;
      if (currentPhase === 'exiting') return;

      if (!portraitReady) {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(10, 10, 10, 0.24)';
      ctx.fillRect(0, 0, width, height);

      // Compute identical assembly progress for both initial page load and reassembly
      let currentEased = 1;
      let isAssembling = false;

      if (currentPhase === 'forming') {
        isAssembling = true;
        const formationProgress = Math.min(1, (now - startedAt) / FORMATION_DURATION);
        currentEased = 1 - Math.pow(1 - formationProgress, 3);
        if (formationProgress >= 1) {
          setIntroPhase('ready');
        }
      } else if (currentPhase === 'ready' && !isScatteredRef.current) {
        isAssembling = true;
        const reassembleProgress = Math.min(1, (now - reassembleStartedAtRef.current) / FORMATION_DURATION);
        currentEased = 1 - Math.pow(1 - reassembleProgress, 3);
      }

      const mouse = mouseRef.current;
      const repulsionRadius = 38; // Compact cursor ripple (reduced from 90 to prevent giant hollow hole)
      const repulsionRadiusSq = repulsionRadius * repulsionRadius;

      const isScattering = currentPhase === 'scatter';

      for (const particle of particlesRef.current) {
        if (isAssembling) {
          // Identical, consistent fluid pull for both initial refresh and scatter reassembly
          const pull = 0.010 + currentEased * 0.045;
          particle.vx += (particle.faceX - particle.x) * pull;
          particle.vy += (particle.faceY - particle.y) * pull;

          // Identical speed ceiling
          const currentSpeed = Math.hypot(particle.vx, particle.vy);
          const maxSpeed = 7.5 + currentEased * 4.5;
          if (currentSpeed > maxSpeed) {
            particle.vx = (particle.vx / currentSpeed) * maxSpeed;
            particle.vy = (particle.vy / currentSpeed) * maxSpeed;
          }
        } else if (currentPhase === 'ready' && isScatteredRef.current) {
          // Scattered: drift towards wide-screen coordinates
          particle.vx += (particle.scatterX - particle.x) * 0.006;
          particle.vy += (particle.scatterY - particle.y) * 0.006;
        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < repulsionRadiusSq && distanceSq > 0 && currentPhase === 'ready' && !isScattering) {
          const distance = Math.sqrt(distanceSq);
          const force = (repulsionRadius - distance) / repulsionRadius;
          particle.vx += (dx / distance) * force * 2.8;
          particle.vy += (dy / distance) * force * 2.8;
        }

        // Identical 0.86 friction for consistent feeling
        const friction = isScattering
          ? 0.985
          : isScatteredRef.current
            ? 0.94
            : 0.86;
        particle.vx *= friction;
        particle.vy *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    portrait.onload = buildParticles;
    if (portrait.complete) buildParticles();
    rafRef.current = requestAnimationFrame(animate);

    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      portrait.onload = null;
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, setIntroPhase]);

  const showLandscape =
    phase === 'landscape' ||
    phase === 'nameIn' ||
    phase === 'nameFill' ||
    phase === 'nameHold' ||
    phase === 'exiting';

  const showName =
    phase === 'nameIn' ||
    phase === 'nameFill' ||
    phase === 'nameHold' ||
    phase === 'exiting';

  const isFilled =
    phase === 'nameFill' || phase === 'nameHold' || phase === 'exiting';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0a0a0a] cursor-pointer select-none"
      animate={phase === 'exiting' ? { y: '-100%' } : { y: '0%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onClick={handleScreenClick}
    >
      {/* Canvas for Particle System */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: phase === 'forming' || phase === 'ready' ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: 'easeOut',
        }}
      />

      {/* Subtle radial glow during forming/ready */}
      {(phase === 'forming' || phase === 'ready') && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_38%)]" />
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 3D Dolly-In / Cave Parallax Effect (Danish bgZoomIn & bgZoomOut)       */}
      {/* -------------------------------------------------------------------- */}
      {showLandscape && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Layer 1: Background Open Arctic Lagoon (Zooms gently from 1.25 -> 1.0) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${ICEBERG_BG_URL})`,
            }}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{
              opacity: 1,
              scale: 1.0,
            }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeOut' },
              scale: { duration: 4.4, ease: [0.22, 1, 0.36, 1] },
            }}
          />

          {/* Layer 2: Foreground Iceberg Cave Frame (Danish's bgZoomOut: 1.0 -> 2.35 and vanishing off edges) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${ICEBERG_FRAME_URL})`,
            }}
            initial={{ scale: 1.0, opacity: 1 }}
            animate={{
              scale: [1.0, 1.04, 2.35],
              opacity: [1.0, 1.0, 0],
            }}
            transition={{
              duration: 9.8,
              times: [0, 0.3, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Subtle natural icy vignette around outer edges */}
          <AnimatePresence>
            {showName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(5,15,30,0.55)_100%)]"
              />
            )}
          </AnimatePresence>

          {/* ---------------------------------------------------------------- */}
          {/* Stage C: Wireframe Outline -> Solid Morph for "R I T I K"        */}
          {/* ---------------------------------------------------------------- */}
          {showName && (
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
              <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 w-[90vw] max-w-[650px] mx-auto">
                <GlyphR isFilled={isFilled} delay={0} />
                <GlyphI isFilled={isFilled} delay={0.12} />
                <GlyphT isFilled={isFilled} delay={0.24} />
                <GlyphI isFilled={isFilled} delay={0.36} />
                <GlyphK isFilled={isFilled} delay={0.48} />
              </div>

              {/* Subtitle matching Photo 3 & 4 */}
              <motion.p
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 0.92, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.9,
                  delay: 0.68,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-6 text-center text-xs font-light tracking-[0.45em] text-white/95 sm:text-sm md:text-base select-none uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] pl-[0.45em]"
                style={{ fontWeight: 300 }}
              >
                A JOURNEY INTO THE WILDERNESS
              </motion.p>
            </div>
          )}
        </div>
      )}

      {/* Stage D: Hold Prompt ("Click anywhere to continue") */}
      {phase === 'nameHold' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0.4, 0.9, 0.4], y: 0 }}
          transition={{
            opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 0.6, ease: 'easeOut' },
          }}
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-20 text-center"
        >
          <span className="text-[10px] sm:text-xs font-light tracking-[0.35em] text-white/80 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Click anywhere to continue
          </span>
        </motion.div>
      )}

      {/* Discreet Skip Button available throughout landscape/name sequence */}
      {(phase === 'landscape' ||
        phase === 'nameIn' ||
        phase === 'nameFill' ||
        phase === 'nameHold') && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              handleExit();
            }}
            className="absolute right-6 top-6 z-40 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-[11px] font-light tracking-[0.25em] text-white/90 backdrop-blur-md transition-colors hover:border-white/60 hover:bg-black/60 hover:text-white"
          >
            SKIP
          </motion.button>
        )}

      {/* -------------------------------------------------------------------- */}
      {/* Compact Portrait + Bottom Pill "Click to Enter" (Matches Reference) */}
      {/* -------------------------------------------------------------------- */}
      {phase === 'ready' && (
        <motion.div
          className="absolute bottom-10 sm:bottom-14 md:bottom-16 left-1/3.5 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
        >
          <motion.button
            onClick={(event) => {
              event.stopPropagation();
              handleEnter();
            }}
            className="group relative overflow-hidden px-10 py-3.5 md:px-12 md:py-4 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/40 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer sweep: strictly contained inside button and only visible on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-transform duration-1000 ease-out group-hover:translate-x-full group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10 text-base md:text-lg font-bold text-white tracking-wide">
              Click to Enter
            </span>
          </motion.button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleToggleScatter();
            }}
            className="mt-3.5 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white/80 transition-colors font-medium select-none cursor-pointer"
          >
            {isScattered ? 'CLICK ANYWHERE TO REASSEMBLE' : 'OR CLICK ANYWHERE TO SCATTER'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
