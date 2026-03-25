import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Zap, Star } from 'lucide-react';

const events = [
  {
    id: 'e1',
    name: "AURA DREAM",
    desc: "THE ULTIMATE NEURAL MUSIC EXPERIENCE UNDER PASTEL SKIES.",
    image: "/festival.png",
    location: "NEO-KYOTO",
    tag: "LIVE NOW",
    color: "#e63946"
  },
  {
    id: 'e2',
    name: "TECH SYNC",
    desc: "ARCHITECT THE FUTURE OF ATMOSPHERIC NETWORKING CLUSTERS.",
    image: "/tech.png",
    location: "HUB-B",
    tag: "IN 2 DAYS",
    color: "#ffb703"
  },
  {
    id: 'e3',
    name: "PURE RETREAT",
    desc: "SYNCHRONIZE YOUR BIOLOGY IN THE NEURAL DREAMSCAPE.",
    image: "/wellness.png",
    location: "ECHO VALLEY",
    tag: "NEXT MONTH",
    color: "#219ebc"
  }
];

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative min-h-screen w-full bg-[#f8fbff] flex flex-col font-display uppercase overflow-hidden pb-32 pt-16">
      
      {/* SHARP COMIC HEADER */}
      <div className="z-10 px-8 md:px-16 mb-12 flex justify-between items-end">
         <div className="max-w-2xl">
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-stroke leading-none">
               EPIC <span className="bg-[#ffb703] px-6 not-italic">LOGS //</span>
            </h1>
            <p className="mt-4 text-black font-bold text-xl md:text-2xl border-l-8 border-black pl-6 opacity-60 italic lowercase">
               select a neural cluster to synchronize with the collective.
            </p>
         </div>
         <div className="hidden md:flex gap-4">
            <button onClick={() => setActive((a) => (a - 1 + events.length) % events.length)} className="w-20 h-20 border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">
               <ArrowLeft size={32} strokeWidth={4} />
            </button>
            <button onClick={() => setActive((a) => (a + 1) % events.length)} className="w-20 h-20 border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">
               <ArrowRight size={32} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* COMIC STRIP SLIDER */}
      <div className="relative flex-1 px-8 md:px-16 flex gap-8 items-center overflow-x-hidden">
         <AnimatePresence mode="popLayout" initial={false}>
            {events.map((event, i) => {
               const isActive = i === active;
               const offset = i - active;
               
               return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: 200, scale: 0.8 }}
                    animate={{ 
                       opacity: 1, 
                       x: offset * 450, // Stagger panels
                       scale: isActive ? 1 : 0.9,
                       zIndex: isActive ? 20 : 10,
                       rotate: offset * 2
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: -500 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className={`absolute inset-y-0 w-full max-w-[400px] md:max-w-[500px] cursor-pointer group`}
                    onClick={() => setActive(i)}
                  >
                     <div className={`relative h-full w-full bg-white border-[6px] border-black shadow-[15px_15px_0px_#000] overflow-hidden transition-all group-hover:shadow-[30px_30px_0px_#000]`}>
                        {/* Event Image with Vintage Filter */}
                        <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover vintage-image" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        
                        {/* Action Sticker */}
                        <div className={`absolute top-8 left-8 border-4 border-black px-6 py-2 bg-white font-black text-xl italic shadow-[6px_6px_0px_#000] z-20`}>
                           {event.tag}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
                           <div className="flex items-center gap-3 mb-4">
                              <MapPin size={24} className="text-secondary" />
                              <span className="font-black tracking-widest text-sm">{event.location}</span>
                           </div>
                           <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-6 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
                              {event.name}
                           </h2>
                           <p className="font-bold text-lg leading-tight mb-8 lowercase opacity-80 line-clamp-2 italic">
                              {event.desc}
                           </p>

                           <button 
                             onClick={(e) => { e.stopPropagation(); onNavigate('profile-creation'); }}
                             className="w-full bg-white text-black border-4 border-black py-5 text-2xl font-black italic shadow-[8px_8px_0px_#000] active:translate-y-1 transition-all group-hover:bg-[#ffb703]"
                           >
                             BOOK TICKET!
                           </button>
                        </div>

                        {/* Hover Halftone Pattern */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:8px_8px]" />
                     </div>
                  </motion.div>
               );
            })}
         </AnimatePresence>
      </div>

      {/* FOOTER INTERSECTION */}
      <div className="px-8 md:px-16 mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
         <div className="flex gap-4">
            {events.map((_, i) => (
               <div key={i} className={`h-4 border-2 border-black transition-all ${i === active ? 'w-16 bg-primary' : 'w-4 bg-white'}`} />
            ))}
         </div>
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
               <Zap className="text-white" size={24} />
            </div>
            <span className="font-black text-lg tracking-widest italic opacity-40">PROTOCOL: APERTURE_SYNC V3</span>
         </div>
      </div>
    </section>
  );
};
