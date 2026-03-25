import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Calendar, User, Zap, Shield, BarChart2 } from 'lucide-react';

interface FullscreenMenuProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsNear(true);
      } else if (!isOpen) {
        setIsNear(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  const navItems = [
    { id: 'entry', label: 'HOME', desc: 'PORTAL EXIT', icon: <Home />, color: 'bg-primary' },
    { id: 'dashboard', label: 'EVENTS', desc: 'APERTURE LOG', icon: <Calendar />, color: 'bg-secondary' },
    { id: 'profile-creation', label: 'PROFILE', desc: 'IDENTITY HUB', icon: <User />, color: 'bg-[#ffb703]' },
    { id: 'recommendations', label: 'SYNC!', desc: 'NEURAL CLUSTER', icon: <Zap />, color: 'bg-primary' },
    { id: 'analytics', label: 'STATS', desc: 'VELOCITY MAP', icon: <BarChart2 />, color: 'bg-secondary' },
    { id: 'policy', label: 'RULES', desc: 'PROTOCOL O7', icon: <Shield />, color: 'bg-[#219ebc]' },
  ];

  return (
    <>
      {/* Top Trigger Plate (Comic Style) */}
      <AnimatePresence>
        {(isNear || isOpen) && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 h-24 z-[3000] flex justify-center items-center pointer-events-none"
          >
             <motion.button
               onClick={() => setIsOpen(!isOpen)}
               whileHover={{ y: 5 }}
               className="pointer-events-auto w-64 h-20 bg-white border-b-8 border-x-4 border-black shadow-[10px_10px_0px_#000] flex items-center justify-between px-8 group transition-all"
             >
                <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full border-2 border-black ${isOpen ? 'bg-primary' : 'bg-secondary animate-pulse'}`} />
                   <span className="font-black tracking-[0.4em] text-[10px] italic">APERTURE MENU //</span>
                </div>
                <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                   <div className="w-6 h-1 bg-black mb-1" />
                   <div className="w-4 h-1 bg-black" />
                </div>
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2900] bg-[#fffdf2]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden h-screen"
          >
            {/* Cinematic Shutter (Vintage Texture) */}
            <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.2 }} className="absolute inset-x-0 top-0 h-40 bg-primary opacity-5 skew-y-3 pointer-events-none" />
            <motion.div initial={{ x: '100%' }} animate={{ x: '-100%' }} transition={{ duration: 1.2 }} className="absolute inset-x-0 bottom-0 h-40 bg-secondary opacity-5 -skew-y-3 pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-center mb-12"
               >
                  <h3 className="text-primary font-black text-xl tracking-[0.5em] mb-4">COMMAND CENTRE //</h3>
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-stroke">SELECT DESTINATION!</h2>
               </motion.div>

               {/* Comic Panel Grid - Adjusted for single frame */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: -6, y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }}
                      className={`relative group h-40 md:h-56 p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[20px_20px_0px_#000] flex flex-col justify-end transition-all bg-white overflow-hidden`}
                    >
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />
                       
                       <div className="absolute top-2 right-2 text-black opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700">
                          {React.cloneElement(item.icon as React.ReactElement, { size: 120 })}
                       </div>

                       <div className="relative z-10 text-left">
                          <div className={`inline-block px-3 py-1 mb-4 text-[8px] font-black tracking-widest text-white ${item.color} border-2 border-black`}>
                             {item.desc}
                          </div>
                          <h2 className={`text-4xl md:text-5xl font-black italic tracking-tighter ${currentView === item.id ? 'text-primary' : 'text-black'}`}>
                             {item.label}
                          </h2>
                       </div>

                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 pointer-events-none">
                          <div className="bg-[#ffb703] border-4 border-black px-4 py-2 font-black text-xl rotate-[-15deg] shadow-[6px_6px_0px_#000] text-black">GOTO!</div>
                       </div>
                    </motion.button>
                  ))}
               </div>

               <motion.button
                 onClick={() => setIsOpen(false)}
                 className="mt-12 group relative"
               >
                  <div className="w-14 h-14 bg-black border-4 border-black flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                     <X size={32} strokeWidth={4} />
                  </div>
                  <div className="absolute top-1/2 left-full ml-6 translate-y-[-50%] px-4 py-2 border-2 border-black font-black text-[10px] tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
                     CLOSE COMMAND
                  </div>
               </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
