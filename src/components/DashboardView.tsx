import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Tag, Heart, Users, Zap, Ticket, Star } from 'lucide-react';

const events = [
  {
    name: "AURA DREAM FESTIVAL",
    type: "EPIC GATHERING",
    time: "LIVE NOW",
    image: "/festival.png",
    description: "THE ULTIMATE NEURAL MUSIC EXPERIENCE. JOIN THE COLLECTIVE VIBRATION UNDER PASTEL SKIES.",
    location: "NEO-KYOTO",
    attendees: "12.4K",
    price: "$299",
    category: "MUSIC",
    color: "#ff7eb9",
    tagline: "VIBE!"
  },
  {
    name: "PASTEL SYNC EXPO",
    type: "TECH SUMMIT",
    time: "IN 2 DAYS",
    image: "/tech.png",
    description: "ARCHITECT THE FUTURE. DISCOVER THE NEXT GEN OF ATMOSPHERIC NETWORKING CLUSTERS.",
    location: "HUB-B",
    attendees: "5.0K",
    price: "$149",
    category: "TECH",
    color: "#7afcff",
    tagline: "SYNC!"
  },
  {
    name: "SERENE NEURAL RETREAT",
    type: "WELLNESS",
    time: "NEXT MONTH",
    image: "/wellness.png",
    description: "SYNCHRONIZE YOUR BIOLOGY. A TRANQUIL JOURNEY INTO THE NEURAL DREAMSCAPE.",
    location: "ECHO VALLEY",
    attendees: "200",
    price: "$899",
    category: "WELLNESS",
    color: "#e0c3fc",
    tagline: "PURE!"
  }
];

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [index, setIndex] = useState(0);
  const currentEvent = events[index];
  const containerRef = useRef<HTMLDivElement>(null);

  const nextEvent = () => setIndex((prev) => (prev + 1) % events.length);
  const prevEvent = () => setIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-background font-display uppercase tracking-tight">
      
      {/* Cinematic Perspective Section */}
      <div className="relative h-screen w-full flex items-center justify-center">
        
        {/* Shutter Bars (Top/Bottom Black Bars) */}
        <div className="absolute top-0 inset-x-0 h-32 bg-black z-20 pointer-events-none flex items-end justify-center pb-6">
           <span className="text-white text-[10px] font-black tracking-[1em] opacity-40">CINEMATIC MODE // APERTURE O7</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-black z-20 pointer-events-none flex items-start justify-center pt-6">
           <span className="text-white text-[10px] font-black tracking-[1em] opacity-40">PASTEL SYNC // RUNTIME 3.0.4</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px) grayscale(1)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px) grayscale(0)' }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0"
          >
            <motion.img 
              animate={{ 
                 x: [0, 20, 0],
                 y: [0, -20, 0],
                 scale: [1, 1.05, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              src={currentEvent.image} 
              alt={currentEvent.name}
              className="w-full h-full object-cover"
            />
            {/* Halftone / Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:12px_12px] opacity-10" />
          </motion.div>
        </AnimatePresence>

        {/* Comic Panel Layout (Information Section) */}
        <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col md:flex-row items-end gap-12">
           
           {/* Detailed Ticket Info Card */}
           <motion.div 
             key={`card-${index}`}
             initial={{ opacity: 0, rotate: -3, x: -100 }}
             animate={{ opacity: 1, rotate: 0, x: 0 }}
             className="flex-1 bg-white border-4 border-black shadow-[25px_25px_0px_#000] relative group"
           >
              {/* Comic Action Sticker */}
              <motion.div 
                 initial={{ scale: 0, rotate: 45 }}
                 animate={{ scale: 1.1, rotate: -15 }}
                 className="absolute -top-16 -left-16 bg-[#feff9c] border-4 border-black px-8 py-4 font-black text-3xl shadow-[8px_8px_0px_#000] z-30"
              >
                 {currentEvent.tagline}
              </motion.div>

              <div className="p-10 md:p-14">
                 <div className="flex justify-between items-start mb-12">
                    <div className="bg-black text-white px-6 py-2 text-[10px] font-black tracking-widest">{currentEvent.time}</div>
                    <div className="flex gap-2">
                       <Star className="text-primary" fill="currentColor" />
                       <Star className="text-secondary" fill="currentColor" />
                       <Star className="text-tertiary" fill="currentColor" />
                    </div>
                 </div>

                 <h1 className="text-6xl md:text-9xl font-black mb-12 leading-[0.8] tracking-tighter italic drop-shadow-lg text-stroke">
                    {currentEvent.name}
                 </h1>

                 {/* Tabular Layout (Ticket Style) */}
                 <div className="grid grid-cols-2 md:grid-cols-4 border-4 border-black mb-12 bg-[#f8f9fa]">
                    {[
                       { label: 'REGION', val: currentEvent.location, icon: <MapPin className="w-5 h-5" /> },
                       { label: 'HOSTS', val: currentEvent.attendees, icon: <Users className="w-5 h-5" /> },
                       { label: 'COST', val: currentEvent.price, icon: <Ticket className="w-5 h-5" /> },
                       { label: 'CORE', val: currentEvent.category, icon: <Zap className="w-5 h-5" /> }
                    ].map((item, i) => (
                       <div key={i} className={`p-8 border-black font-black ${i < 3 ? 'md:border-r-4' : ''} ${i % 2 === 0 ? 'border-r-4 md:border-r-4' : ''} ${i < 2 ? 'border-b-4 md:border-b-0' : ''}`}>
                          <div className="flex items-center gap-3 opacity-30 text-[10px] mb-3">
                             {item.icon}
                             <span>{item.label} //</span>
                          </div>
                          <p className="text-2xl italic">{item.val}</p>
                       </div>
                    ))}
                 </div>

                 <p className="text-black font-bold text-xl mb-12 leading-none max-w-2xl lowercase border-l-8 border-black pl-8 italic">
                    {currentEvent.description}
                 </p>

                 <div className="flex flex-col sm:flex-row gap-8">
                    <button className="btn-premium flex-1 py-6 text-3xl italic shadow-[15px_15px_0px_#000] hover:shadow-[25px_25px_0px_#000] hover:translate-x-[-10px] hover:translate-y-[-10px] transition-all">
                       STRIKE TICKET!
                    </button>
                    <div className="flex gap-4">
                       <button title="PREV" onClick={prevEvent} className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">
                          <ArrowLeft size={32} strokeWidth={4} />
                       </button>
                       <button title="NEXT" onClick={nextEvent} className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_#000]">
                          <ArrowRight size={32} strokeWidth={4} />
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Perspective Sidebar (Action Statistics) */}
           <motion.div 
              key={`stats-${index}`}
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              className="hidden lg:flex flex-col gap-8 w-64"
           >
              <div className="bg-[#7afcff] border-4 border-black p-8 shadow-[12px_12px_0px_#000] -rotate-3">
                 <p className="font-black text-4xl mb-2">99%</p>
                 <p className="text-[10px] font-black opacity-40">SYNC GAIN!</p>
              </div>
              <div className="bg-[#ff7eb9] border-4 border-black p-8 shadow-[12px_12px_0px_#000] rotate-3 text-white">
                 <p className="font-black text-2xl leading-none italic mb-4">LIVE FEED ACTIVE!</p>
                 <div className="w-full h-1 bg-white" />
              </div>
           </motion.div>
        </div>

        {/* Event Progress Dots (Comic Strip Style) */}
        <div className="absolute bottom-40 z-30 flex gap-4">
           {events.map((_, i) => (
              <div key={i} className={`h-6 border-4 border-black transition-all duration-300 ${i === index ? 'w-24 bg-primary' : 'w-6 bg-white'}`} />
           ))}
        </div>
      </div>

      {/* Profile Intersection (Comic Splatter) */}
      <div className="py-60 px-12 bg-[#fff9fc] border-t-8 border-black relative">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary rotate-12 translate-x-1/2 opacity-10 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
            <div className="flex-1">
               <div className="inline-block px-8 py-2 bg-black text-white text-[10px] font-black tracking-[0.6em] mb-12">IDENTITY HUB //</div>
               <h3 className="text-7xl md:text-[11rem] font-black italic tracking-tighter text-stroke leading-none mb-12">INITIATE <span className="bg-[#feff9c] text-black px-8 not-italic">SYNC!</span></h3>
               <p className="text-2xl font-black max-w-xl mb-16 leading-tight lowercase border-r-8 border-black pr-12 text-right italic">"join the next-gen neural collective in high-contrast cinematic glory."</p>
               <button 
                 onClick={() => onNavigate('profile-creation')}
                 className="btn-premium px-24 py-8 text-3xl italic"
               >
                 ENTER PORTAL!
               </button>
            </div>
            <div className="relative group">
               <motion.div 
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  className="w-full md:w-[600px] h-[800px] bg-white border-8 border-black shadow-[40px_40px_0px_#000] overflow-hidden"
               >
                  <img src="/wellness.png" alt="Identity Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-black/80 backdrop-blur-md border-t-4 border-black text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                     <p className="font-black text-2xl tracking-widest italic">NEURAL IDENTITY ARCHITECT // READY</p>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};
