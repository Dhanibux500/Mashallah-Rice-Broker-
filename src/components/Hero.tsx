import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const [hasVideoError, setHasVideoError] = useState(false);
  const [mobileVideoFailed, setMobileVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 767px)').matches;
    }
    return false;
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Responsive video source selection:
  // Use vertical 9:16 video on mobile screens; if not available, fall back to desktop 16:9 video
  const activeVideoSrc =
    isMobile && !mobileVideoFailed
      ? '/videos/rice-village-mobile.mp4'
      : '/videos/rice-village.mp4';

  useEffect(() => {
    // Detect mobile viewport changes to optimize data and prevent loading unnecessary assets
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleMobileChange);
    } else {
      mobileQuery.addListener(handleMobileChange);
    }

    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handleMobileChange);
      } else {
        mobileQuery.removeListener(handleMobileChange);
      }
    };
  }, []);

  useEffect(() => {
    // Detect system reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    // Reload and autoplay when source switches
    if (videoRef.current && !prefersReducedMotion && !hasVideoError) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled
        });
      }
    }
  }, [activeVideoSrc, prefersReducedMotion, hasVideoError]);

  const handleVideoError = () => {
    if (isMobile && !mobileVideoFailed) {
      // If mobile video is not found or fails to load, gracefully fallback to the desktop video
      setMobileVideoFailed(true);
    } else {
      setHasVideoError(true);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background Video - Crisp, bright, and completely unblurred without heavy overlays */}
      {!prefersReducedMotion && !hasVideoError && (
        <video
          ref={videoRef}
          key={activeVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[1.03] contrast-[1.05] saturate-[1.05] ${
            isMobile ? 'object-[center_35%]' : 'object-center'
          }`}
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      )}

      {/* Hero Content with enhanced text drop-shadow to keep white text readable over clear video */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
        >
          {settings.heroHeading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 font-light max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        >
          {settings.heroSubheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-secondary text-gray-900 font-bold px-8 py-4 rounded-full text-lg hover:bg-secondary-hover shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <span>View Our Products</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
