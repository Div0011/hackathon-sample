import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden font-display uppercase tracking-tight"
    >
      {/* Comic Halftone Overlay (Selective) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-black pointer-events-none z-20 opacity-90 shadow-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-black pointer-events-none z-20 opacity-90 shadow-2xl" />

      {/* Decorative Panels (Comic Background) */}
      <div className="absolute w-full h-[120%] bg-[#ff7eb9] rotate-12 -translate-y-20 opacity-10 pointer-events-none" />
      <div className="absolute w-full h-[120%] bg-[#7afcff] -rotate-12 translate-y-20 opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 50 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="flex flex-col items-center mb-24"
        >
          <div className="relative group perspective-1000">
             {/* Dynamic Comic Hover */}
             <motion.div 
               whileHover={{ x: -10, y: -10 }}
               className="w-40 h-40 bg-white border-4 border-black shadow-[15px_15px_0px_#000] flex items-center justify-center font-black text-7xl text-[#1e272e] font-display relative z-10"
             >
                S
             </motion.div>
             <div className="absolute top-4 left-4 w-40 h-40 bg-primary border-4 border-black -z-0" />
          </div>
          
          <h1 className="mt-16 text-black font-black tracking-[0.6em] text-sm italic">
            SCANECT // <span className="bg-primary px-3 not-italic">PASTEL SYNC</span>
          </h1>
          <p className="mt-6 text-black font-black text-lg max-w-xs text-center border-b-4 border-black pb-4">
             ATMOSPHERIC NETWORKING HUB V3.0
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 w-full max-w-[400px]">
          <motion.button 
            whileHover={{ x: -6, y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="group relative h-24 btn-premium text-2xl flex items-center justify-center shadow-[12px_12px_0px_#000] hover:shadow-[20px_20px_0px_#000]"
          >
            <span className="relative z-10">INITIALIZE!</span>
          </motion.button>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="text-center"
          >
            <p className="text-xs text-black font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity underline decoration-primary decoration-4">
              SYNC NEURAL CORE
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Metadata Props */}
      <div className="absolute bottom-12 flex justify-between items-center w-full px-12 z-30">
         <div className="text-[10px] text-white font-black uppercase tracking-[0.6em]">
            ASPECT: CINEMAPOD V3
         </div>
         <div className="flex gap-4">
            <div className="w-3 h-3 bg-primary border-2 border-black" />
            <div className="w-3 h-3 bg-secondary border-2 border-black" />
            <div className="w-3 h-3 bg-tertiary border-2 border-black" />
         </div>
      </div>
    </section>
  );
};
