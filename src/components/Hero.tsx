import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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

  // High-performance poster images matching the first frame of the village video
  const mobilePoster = '/videos/rice-village-mobile-poster.webp';
  const desktopPoster = '/videos/rice-village-poster.webp';
  const activePoster = isMobile ? mobilePoster : desktopPoster;

  // Responsive video selection
  const activeVideoSrc =
    isMobile && !mobileVideoFailed
      ? '/videos/rice-village-mobile.mp4'
      : '/videos/rice-village.mp4';

  useEffect(() => {
    // Detect mobile viewport
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
    // Ensure video autoplays safely on mobile & desktop without blocking or flickering
    if (videoRef.current && !prefersReducedMotion && !hasVideoError) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch(() => {
            // Autoplay restricted: seamlessly retain the crisp rice-village poster fallback
            setIsVideoPlaying(false);
          });
      }
    }
  }, [activeVideoSrc, prefersReducedMotion, hasVideoError]);

  const handleVideoError = () => {
    if (isMobile && !mobileVideoFailed) {
      setMobileVideoFailed(true);
      setIsVideoPlaying(false);
    } else {
      setHasVideoError(true);
      setIsVideoPlaying(false);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a3829]">
      {/* 
        1. Immediate Zero-Delay Poster Image Layer 
        Guarantees that from the very first paint, users see the rice village landscape.
        Eliminates the black screen completely, even on slow 3G or initial buffering.
      */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          srcSet="/videos/rice-village-mobile-poster.webp"
          media="(max-width: 767px)"
          type="image/webp"
        />
        <source
          srcSet="/videos/rice-village-mobile-poster.jpg"
          media="(max-width: 767px)"
          type="image/jpeg"
        />
        <source
          srcSet="/videos/rice-village-poster.webp"
          media="(min-width: 768px)"
          type="image/webp"
        />
        <source
          srcSet="/videos/rice-village-poster.jpg"
          media="(min-width: 768px)"
          type="image/jpeg"
        />
        <img
          src={activePoster}
          alt="Rural Pakistani rice harvesting village"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className={`w-full h-full object-cover brightness-[1.03] contrast-[1.05] saturate-[1.05] ${
            isMobile ? 'object-[center_35%]' : 'object-center'
          }`}
        />
      </picture>

      {/* 
        2. Smoothly Streaming Cinematic Village Video Layer 
        Crossfades smoothly over the matching poster image when ready, avoiding blank frames.
      */}
      {!prefersReducedMotion && !hasVideoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={activePoster}
          onPlaying={() => setIsVideoPlaying(true)}
          onCanPlayThrough={() => setIsVideoPlaying(true)}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[1.03] contrast-[1.05] saturate-[1.05] transition-opacity duration-700 ease-out ${
            isMobile ? 'object-[center_35%]' : 'object-center'
          } ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      )}

      {/* 
        3. Hero Content 
        Readable with drop shadows over clear video & poster imagery.
      */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white mb-6 leading-[1.08] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        >
          {settings.heroHeading || "Mashallah Rice Broker – Trusted Rice Broker in Pakistan"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl md:text-2xl text-slate-100 mb-8 font-normal max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] leading-relaxed"
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
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg shadow-[0_10px_25px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_16px_32px_-5px_rgba(245,158,11,0.65)] hover:-translate-y-0.5 transition-all cursor-pointer border border-amber-300/40 font-display"
          >
            <span>View Our Products</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
