import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Zap, Star, Ticket } from 'lucide-react';

const events = [
  {
    id: 'e1',
    name: "AURA DREAM",
    desc: "THE ULTIMATE NEURAL MUSIC EXPERIENCE UNDER PASTEL SKIES.",
    image: "festival.png",

    location: "NEO-KYOTO",
    tag: "LIVE NOW",
    color: "#e63946"
  },
  {
    id: 'e2',
    name: "TECH SYNC",
    desc: "ARCHITECT THE FUTURE OF ATMOSPHERIC NETWORKING CLUSTERS.",
    image: "tech.png",

    location: "HUB-B",
    tag: "IN 2 DAYS",
    color: "#ffb703"
  },
  {
    id: 'e3',
    name: "PURE RETREAT",
    desc: "SYNCHRONIZE YOUR BIOLOGY IN THE NEURAL DREAMSCAPE.",
    image: "wellness.png",

    location: "ECHO VALLEY",
    tag: "NEXT MONTH",
    color: "#219ebc"
  }
];

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [index, setIndex] = useState(0);
  const current = events[index];

  const next = () => setIndex((i) => (i + 1) % events.length);
  const prev = () => setIndex((i) => (i - 1 + events.length) % events.length);

  return (
    <section className="relative min-h-screen w-full bg-[#fffdf2] flex flex-col font-display uppercase overflow-hidden">
      
      {/* SHUTTER BARS (Cinematic Letterboxing) */}
      <div className="absolute top-0 inset-x-0 h-16 md:h-24 bg-black z-30 pointer-events-none flex items-end justify-center pb-4 md:pb-6">
         <span className="text-white text-[8px] md:text-[10px] font-black tracking-[1em] opacity-40 italic">APERTURE LOG // EVENT GRID V3</span>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-16 md:h-24 bg-black z-30 pointer-events-none flex items-start justify-center pt-4 md:pt-6">
         <span className="text-white text-[8px] md:text-[10px] font-black tracking-[1em] opacity-40 italic">PASTEL SYNC // RUNTIME 3.0.4</span>
      </div>

      {/* BACKGROUND DEPTH (Halftone dots) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:16px_16px] z-0" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-24 md:pt-32 pb-32 md:pb-44">
         
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* LEFT: EVENT PREVIEW PANEL (Focused Comic Frame) */}
            <div className="lg:col-span-7 relative group">
               <div className="absolute -top-6 md:-top-12 -left-6 md:-left-12 bg-[#ffb703] border-4 border-black px-4 md:px-8 py-2 md:py-3 font-black text-lg md:text-2xl rotate-[-10deg] shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] z-20">
                  {current.tag}
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, x: 50 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="relative aspect-[16/10] bg-white border-4 md:border-8 border-black shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000] overflow-hidden"
                  >
                     <img src={current.image} alt={current.name} className="w-full h-full object-cover vintage-image" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     
                     <div className="absolute bottom-8 left-8 flex items-center gap-4 text-white">
                        <MapPin size={24} className="text-secondary" />
                        <span className="font-black text-2xl tracking-widest">{current.location}</span>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Panel Decorative Stickers */}
               <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-black border-2 md:border-4 border-black p-2 md:p-4 text-white rotate-[5deg] shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000]">
                  <Zap size={24} className="md:hidden" />
                  <Zap size={40} className="hidden md:block" />
               </div>
            </div>

            {/* RIGHT: CONTENT PANEL (Clean Action Typography) */}
            <div className="lg:col-span-5 flex flex-col items-start min-h-[350px] md:min-h-[450px]">
               <div className="flex-1 w-full relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="w-full"
                    >
                       <p className="text-primary font-black text-lg md:text-xl tracking-[0.4em] mb-4 italic leading-none border-l-4 md:border-l-8 border-black pl-4 md:pl-6 lowercase">
                          atmospheric syncing cluster //
                       </p>
                       <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-none mb-6 md:mb-8 text-stroke">
                          {current.name}
                       </h2>
                       <p className="text-base md:text-xl font-bold leading-tight mb-8 md:mb-10 italic lowercase max-w-lg">
                          {current.desc}
                       </p>
                    </motion.div>
                 </AnimatePresence>
               </div>

               <div className="flex flex-col gap-4 md:gap-6 w-full mt-auto">
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
                     <button 
                       onClick={() => onNavigate('profile-creation')}
                       className="flex-1 btn-premium py-5 md:py-8 text-xl md:text-3xl italic shadow-[8px_8px_0px_#000] md:shadow-[15px_15px_0px_#000] hover:shadow-[20px_20px_0px_#000] flex items-center justify-center gap-4 group"
                     >
                        {current.tag === 'LIVE NOW' ? 'TAKE PART!' : 'REGISTER!'} 
                        <Ticket size={24} className="md:w-8 md:h-8 group-hover:rotate-12 transition-transform" strokeWidth={3} />
                     </button>
                     
                     <div className="flex gap-4 w-full sm:w-auto">
                        <button title="Previous Event" onClick={prev} className="flex-1 sm:w-20 bg-white border-2 md:border-4 border-black h-16 md:h-24 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] active:scale-95">
                           <ArrowLeft size={24} className="md:w-8 md:h-8" strokeWidth={4} />
                        </button>
                        <button title="Next Event" onClick={next} className="flex-1 sm:w-20 bg-white border-2 md:border-4 border-black h-16 md:h-24 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] active:scale-95">
                           <ArrowRight size={24} className="md:w-8 md:h-8" strokeWidth={4} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* BOTTOM: MINI PREVIEW GRID (Clean Comic Strips) */}
         <div className="absolute bottom-20 md:bottom-32 left-0 right-0 flex justify-center gap-4 md:gap-8 pointer-events-none">
            {events.map((ev, i) => (
               <div key={ev.id} className={`h-1 md:h-1.5 border md:border-2 border-black transition-all duration-500 ${i === index ? 'w-16 md:w-24 bg-primary' : 'w-8 md:w-12 bg-black/10'}`} />
            ))}
         </div>
      </div>

      {/* SCROLLABLE UPCOMING SECTION */}
      <div className="relative z-10 w-full bg-white border-t-8 border-black py-20 px-6 md:px-12">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div>
                  <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase">UPCOMING <span className="bg-primary text-white not-italic px-4">SYNCS//</span></h2>
                  <p className="text-lg md:text-2xl font-black mt-6 md:mt-8 italic opacity-60 lowercase max-w-xl border-l-8 border-black pl-8">"register for the next biological clusters in the high-performance pipeline."</p>
               </div>
               <div className="bg-black text-[#ffb703] px-6 py-3 font-black text-xl italic shadow-[8px_8px_0px_#000]">V3.0.4 CORE</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
               {events.map((ev, i) => (
                  <motion.div 
                    key={ev.id}
                    whileHover={{ y: -10 }}
                    className="bg-[#fffdf2] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] hover:shadow-[15px_15px_0px_#000] transition-all relative overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">{ev.tag}</div>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center font-black text-xl">0{i+1}</div>
                        <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">{ev.name}</h3>
                     </div>
                     <p className="text-sm md:text-base font-bold italic lowercase opacity-70 mb-8 mb-10 h-12 overflow-hidden leading-tight border-l-4 border-black pl-4">
                        {ev.desc}
                     </p>
                     <button 
                        onClick={() => onNavigate('profile-creation')}
                        className="w-full py-4 bg-black text-white font-black italic text-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                     >
                        REGISTER NOW! <Zap size={18} />
                     </button>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};
