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
      <div className="absolute top-0 inset-x-0 h-24 bg-black z-30 pointer-events-none flex items-end justify-center pb-6">
         <span className="text-white text-[10px] font-black tracking-[1em] opacity-40 italic">APERTURE LOG // EVENT GRID V3</span>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-24 bg-black z-30 pointer-events-none flex items-start justify-center pt-6">
         <span className="text-white text-[10px] font-black tracking-[1em] opacity-40 italic">PASTEL SYNC // RUNTIME 3.0.4</span>
      </div>

      {/* BACKGROUND DEPTH (Halftone dots) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:16px_16px] z-0" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-32 pb-44">
         
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: EVENT PREVIEW PANEL (Focused Comic Frame) */}
            <div className="lg:col-span-7 relative group">
               <div className="absolute -top-12 -left-12 bg-[#ffb703] border-4 border-black px-8 py-3 font-black text-2xl rotate-[-10deg] shadow-[10px_10px_0px_#000] z-20">
                  {current.tag}
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, x: 50 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="relative aspect-[16/10] bg-white border-8 border-black shadow-[30px_30px_0px_#000] overflow-hidden"
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
               <div className="absolute -bottom-8 -right-8 bg-black border-4 border-black p-4 text-white rotate-[5deg] shadow-[8px_8px_0px_#000]">
                  <Zap size={40} />
               </div>
            </div>

            {/* RIGHT: CONTENT PANEL (Clean Action Typography) */}
            <div className="lg:col-span-5 flex flex-col items-start">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                     <p className="text-primary font-black text-2xl tracking-[0.4em] mb-4 italic leading-none border-l-8 border-black pl-6 lowercase">
                        atmospheric syncing cluster //
                     </p>
                     <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mb-8 text-stroke">
                        {current.name}
                     </h2>
                     <p className="text-xl md:text-2xl font-bold leading-tight mb-12 italic lowercase max-w-lg">
                        {current.desc}
                     </p>

                     <div className="flex flex-col gap-6 w-full">
                        <button 
                          onClick={() => onNavigate('profile-creation')}
                          className="btn-premium py-8 text-3xl italic shadow-[15px_15px_0px_#000] hover:shadow-[25px_25px_0px_#000] flex items-center justify-center gap-4"
                        >
                           STRIKE TICKET! <Ticket size={32} strokeWidth={3} />
                        </button>
                        
                        <div className="flex gap-4 w-full">
                           <button title="Previous Event" onClick={prev} className="flex-1 bg-white border-4 border-black h-20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">

                              <ArrowLeft size={32} strokeWidth={4} />
                           </button>
                           <button title="Next Event" onClick={next} className="flex-1 bg-white border-4 border-black h-20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">

                              <ArrowRight size={32} strokeWidth={4} />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>

         {/* BOTTOM: MINI PREVIEW GRID (Clean Comic Strips) */}
         <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-8 pointer-events-none">
            {events.map((ev, i) => (
               <div key={ev.id} className={`h-1.5 border-2 border-black transition-all duration-500 ${i === index ? 'w-24 bg-primary' : 'w-12 bg-black/10'}`} />
            ))}
         </div>
      </div>

      {/* SYNC PROFILE PROMPT (Splatter Panel) */}
      <div className="py-44 px-8 md:px-16 bg-white border-t-8 border-black flex flex-col items-center">
         <h3 className="text-6xl md:text-9xl font-black italic tracking-tighter text-stroke text-center mb-12 lowercase">
            ready to <span className="bg-[#ffb703] not-italic px-4 text-black">sync?</span>
         </h3>
         <button onClick={() => onNavigate('profile-creation')} className="btn-premium px-16 py-6 text-2xl italic">
            INITIATE BIOLOGICAL HANDSHAKE
         </button>
      </div>
    </section>
  );
};
