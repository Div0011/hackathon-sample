import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryViewProps {
  onSelect: () => void;
}

export const EntryView: React.FC<EntryViewProps> = ({ onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOpening, setIsOpening] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
      className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden font-display uppercase tracking-tight"
    >
      {/* SHUTTER INTRO EFFECT (Cinematic) */}
      <AnimatePresence>
        {isOpening && (
          <>
            <motion.div 
               exit={{ y: '-100%' }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               className="fixed inset-x-0 top-0 h-1/2 bg-black z-[100] flex items-end justify-center pb-12"
            >
               <span className="text-white font-black tracking-[1em] text-[10px] opacity-40">INITIALIZING APERTURE //</span>
            </motion.div>
            <motion.div 
               exit={{ y: '100%' }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               className="fixed inset-x-0 bottom-0 h-1/2 bg-black z-[100] flex items-start justify-center pt-12"
            >
               <span className="text-white font-black tracking-[1em] text-[10px] opacity-40">PROTOCOL V3.0.4</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PARALLAX COMIC BACKGROUND */}
      <motion.div 
        animate={{ 
          rotate: mousePos.x * 0.1,
          scale: 1.1 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
         <div className="absolute top-1/4 -left-20 w-full h-[600px] bg-primary/10 -rotate-12 blur-[100px]" />
         <div className="absolute bottom-1/4 -right-20 w-full h-[600px] bg-secondary/10 rotate-12 blur-[100px]" />
         {/* Vertical Comic Dividers */}
         <div className="absolute inset-0 flex justify-between px-32 opacity-5">
            <div className="w-1 h-full bg-black" />
            <div className="w-1 h-full bg-black" />
            <div className="w-1 h-full bg-black" />
         </div>
      </motion.div>

      <div className="relative z-[200] flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex flex-col items-center mb-24"
        >
          <div className="relative group perspective-2000">
             <motion.div 
               animate={{ 
                  x: mousePos.x,
                  y: mousePos.y
               }}
               className="w-48 h-48 bg-white border-8 border-black shadow-[30px_30px_0px_#000] flex items-center justify-center font-black text-9xl text-[#1e272e] font-display relative z-10 skew-x-[-2deg]"
             >
                S
             </motion.div>
             {/* Offset Comic Stickers */}
             <div className="absolute -top-12 -right-12 bg-[#feff9c] border-4 border-black px-6 py-2 font-black text-xs rotate-[15deg] shadow-[8px_8px_0px_#000] z-20">LIVE!</div>
             <div className="absolute -bottom-8 -left-16 bg-secondary border-4 border-black px-8 py-2 font-black text-xs rotate-[-10deg] shadow-[8px_8px_0px_#000] z-20">SYNC!</div>
          </div>
          
          <h1 className="mt-20 text-black font-black text-8xl md:text-[10rem] tracking-tighter italic leading-none text-stroke">
            SCANECT!
          </h1>
          <p className="mt-6 text-black font-black text-2xl max-w-lg text-center lowercase border-b-8 border-black pb-8 leading-[0.8]">
             the high-performance <span className="text-primary italic">neural dreamscape</span> for visionaries.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 w-full max-w-[450px] relative z-[300]">

          <motion.button 
            whileHover={{ x: -10, y: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="group relative h-28 btn-premium text-4xl flex items-center justify-center shadow-[20px_20px_0px_#000] hover:shadow-[35px_35px_0px_#000] transition-all"
          >
            <span className="relative z-10 italic">OPEN PORTAL!</span>
          </motion.button>
          
          <div className="text-center group cursor-pointer">
            <span className="text-sm text-black/40 font-black uppercase tracking-[0.5em] group-hover:text-primary group-hover:tracking-[0.8em] transition-all duration-500 underline decoration-black decoration-8 underline-offset-8">
              INITIALIZE SYNC CORE
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Borders / Metadata */}
      <div className="absolute inset-x-0 top-0 h-40 bg-black pointer-events-none z-20 opacity-5 shadow-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-black pointer-events-none z-20 opacity-5 shadow-2xl" />

      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end z-30">
         <div className="max-w-xs">
            <div className="w-16 h-2 bg-black mb-4" />
            <p className="text-[10px] font-black text-black opacity-40 tracking-widest leading-loose">PROTOCOL: APERTURE V3.0<br />LOCATION: NEO-KYOTO CLUSTER 4<br />MODE: HIGH-CONTRAST DYNAMIC</p>
         </div>
         <div className="flex items-center gap-6">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse border-2 border-black" />
            <span className="text-xs font-black tracking-widest">SYSTEM: LIVE</span>
         </div>
      </div>
    </section>
  );
};
