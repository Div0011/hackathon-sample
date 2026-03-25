import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface EntryViewProps {
  onSelect: () => void;
}

export const EntryView: React.FC<EntryViewProps> = ({ onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      {/* Soft Pastel Orbs reacting to mouse */}
      <motion.div 
        animate={{ 
          x: mousePos.x * 3, 
          y: mousePos.y * 3,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: -mousePos.x * 2, 
          y: -mousePos.y * 4,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-20"
        >
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center font-black text-6xl text-gradient relative z-10 border-white/50 border">
              S
            </div>
          </div>
          <h1 className="mt-12 text-[#1e272e] font-black tracking-[0.6em] text-sm uppercase opacity-40">
            Scanect <span className="text-primary opacity-100 ml-3">Dreamscape</span>
          </h1>
          <p className="mt-4 text-muted-foreground font-medium text-lg max-w-xs text-center leading-relaxed">
            Atmospheric networking clusters for the next generation of neural visionaries.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 w-full max-w-[350px]">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="group relative h-20 rounded-3xl overflow-hidden btn-premium flex items-center justify-center text-lg shadow-[0_20px_60px_rgba(255,126,185,0.4)]"
          >
            <span className="relative z-10">INITIALIZE EXPERIENCE</span>
          </motion.button>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2 }}
             className="text-center"
          >
            <p className="text-[10px] text-muted font-black uppercase tracking-[0.5em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
              Sync Neural Profile
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 text-center w-full">
         <p className="text-[10px] text-muted font-black uppercase tracking-[0.6em] opacity-20">
           Designed for High-Performance Vibration
         </p>
      </div>

    </section>
  );
};
