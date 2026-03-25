import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface FullscreenMenuProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const rayX = useSpring(mouseX, springConfig);
  const rayY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Proximity detection (near top edge or menu trigger area)
      if (e.clientY < 100) {
        setIsNear(true);
      } else if (!isOpen) {
        setIsNear(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, mouseX, mouseY]);

  const navItems = [
    { id: 'entry', label: 'Home', desc: 'The Orbital Gateway' },
    { id: 'dashboard', label: 'Events', desc: 'Aperture Orchestration' },
    { id: 'profile-creation', label: 'Profile', desc: 'Neural Identity' },
    { id: 'recommendations', label: 'Discovery', desc: 'Biological Sync' },
    { id: 'analytics', label: 'Analytics', desc: 'Velocity Mapping' },
    { id: 'policy', label: 'Policy', desc: 'Atmospheric Protocol' },
  ];

  return (
    <>
      {/* Proximity Trigger */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-2 z-[2500]"
        onMouseEnter={() => setIsNear(true)}
      />

      <AnimatePresence>
        {(isNear || isOpen) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[3000] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="glass-blue px-8 py-3 rounded-full border border-primary/30 flex items-center gap-4 group">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-xs font-black uppercase tracking-[0.4em]">Aperture Menu</span>
               <div className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2900] bg-background/95 backdrop-blur-3xl overflow-hidden"
          >
            {/* Volumetric Spotlight Ray */}
            <motion.div 
               className="absolute pointer-events-none z-10 w-[600px] h-[600px] rounded-full"
               style={{
                 x: rayX,
                 y: rayY,
                 translateX: '-50%',
                 translateY: '-50%',
                 background: 'radial-gradient(circle, rgba(0,227,253,0.15) 0%, rgba(0,227,253,0.05) 50%, transparent 100%)',
                 filter: 'blur(40px)',
                 mixBlendMode: 'screen'
               }}
            >
               {/* Vertical Beam Element */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-[100vh] bg-gradient-to-t from-primary/40 to-transparent blur-sm" />
            </motion.div>

            {/* 3D Floor Grid */}
            <div className="absolute inset-0 floor-grid opacity-30" />

            {/* Floor Options */}
            <div className="relative h-full flex items-center justify-center perspective-2000">
               <motion.div 
                 className="flex flex-wrap justify-center gap-12 max-w-6xl px-12 pb-40"
                 style={{ rotateX: 45 }}
                 animate={{ rotateX: isOpen ? 45 : 0 }}
               >
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 50, translateZ: -100 }}
                      animate={{ opacity: 1, y: 0, translateZ: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, translateZ: 50, color: '#00e3fd' }}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }}
                      className={`relative group text-left p-8 rounded-3xl border border-white/5 transition-all duration-500 overflow-hidden ${
                        currentView === item.id ? 'bg-primary/10 border-primary/20' : 'bg-white/5'
                      }`}
                    >
                       <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted group-hover:text-primary transition-colors">{item.desc}</span>
                       <h2 className="text-4xl font-bold mt-2 tracking-tighter">{item.label}</h2>
                       
                       {/* Floating Particle on Hover */}
                       <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_#00e3fd]" />
                    </motion.button>
                  ))}
               </motion.div>
            </div>

            {/* Close Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted text-[10px] uppercase tracking-[0.6em] animate-pulse">
               Click anywhere or press Esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
