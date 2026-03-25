import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { OrbBackground } from './Orb';

export const ApertureHero = () => {
  return (
    <section id="hero" className="section bg-background overflow-hidden">
      {/* 3D Orb Background */}
      <OrbBackground />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wider uppercase">
            System Initialization
          </span>
        </motion.div>
        
        <h1 className="text-display text-white text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 relative">
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              SCANECT
            </motion.span>
          </span>
          <span className="block overflow-hidden text-primary text-glow-blue">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              APERTURE
            </motion.span>
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-muted text-lg md:text-xl leading-relaxed mb-10"
        >
          Where biological identity meets neural precision. Step into the future of atmospheric networking and cinematic discovery.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-4"
        >
          <button className="px-8 py-4 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,227,253,0.3)]">
            Begin Journey
          </button>
          <button className="px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all backdrop-blur-sm">
            Watch Aperture
          </button>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>
    </section>
  );
};
