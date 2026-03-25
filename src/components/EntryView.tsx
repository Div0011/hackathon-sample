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
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      {/* Central Interactive Aperture Blur */}
      <motion.div 
        animate={{ 
          x: mousePos.x * 2, 
          y: mousePos.y * 2,
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-5xl text-white relative z-10 group-hover:border-primary/50 transition-colors">
              S
            </div>
          </div>
          <h1 className="mt-8 text-white font-bold tracking-[0.5em] text-sm uppercase opacity-60">
            Scanect <span className="text-primary opacity-100 ml-2">Obsidian</span>
          </h1>
        </motion.div>

        <div className="flex flex-col gap-6 w-full max-w-[320px]">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="group relative h-16 rounded-2xl overflow-hidden glass-interactive flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-white font-black tracking-[0.3em] text-xs uppercase relative z-10 transition-colors group-hover:text-primary">
              Initialize Portal
            </span>
          </motion.button>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="text-center"
          >
            <p className="text-[10px] text-muted uppercase tracking-[0.4em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
              Create Neural Identity
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="text-[10px] text-muted font-black uppercase tracking-[0.4em] opacity-20">
          Neural Architecture V2.0
        </div>
        <div className="flex gap-4">
           <div className="w-1 h-1 rounded-full bg-primary/40" />
           <div className="w-1 h-1 rounded-full bg-white/10" />
           <div className="w-1 h-1 rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
};
