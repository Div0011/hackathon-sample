import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Tag, Heart, Users, Zap } from 'lucide-react';

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
    color: "#ff7eb9"
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
    color: "#7afcff"
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
    color: "#e0c3fc"
  }
];

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [index, setIndex] = useState(0);
  const currentEvent = events[index];

  const nextEvent = () => setIndex((prev) => (prev + 1) % events.length);
  const prevEvent = () => setIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background font-display uppercase tracking-tight">
      
      {/* Cinematic Background Section */}
      <div className="relative h-screen w-full flex items-center justify-center">
        
        {/* Letterboxing (Cinematic) */}
        <div className="absolute top-0 inset-x-0 h-20 bg-black z-20 pointer-events-none opacity-90 shadow-2xl" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-black z-20 pointer-events-none opacity-90 shadow-2xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1, filter: 'grayscale(1) contrast(1.2)' }}
            animate={{ opacity: 1, scale: 1, filter: 'grayscale(0) contrast(1)' }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0"
          >
            <img 
              src={currentEvent.image} 
              alt={currentEvent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
          </motion.div>
        </AnimatePresence>

        {/* Comic Panel Layout */}
        <div className="relative z-10 w-full max-w-7xl px-8 grid lg:grid-cols-12 gap-6 items-end">
           
           {/* Info Panel (Comic Style) */}
           <motion.div 
             key={`info-${index}`}
             initial={{ opacity: 0, rotate: -2, y: 50 }}
             animate={{ opacity: 1, rotate: 0, y: 0 }}
             className="lg:col-span-8 glass p-10 md:p-14 bg-white"
           >
              <div className="flex items-center gap-4 mb-8">
                 <div className="px-5 py-2 bg-black text-white text-[10px] font-black tracking-[0.4em]">
                    {currentEvent.time}
                 </div>
                 <div className="px-5 py-2 border-2 border-black font-black text-[10px] tracking-[0.4em] text-primary">
                    {currentEvent.type}
                 </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter">
                {currentEvent.name}
              </h1>

              {/* Tabular Data Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black">
                 {[
                    { label: 'LOC', val: currentEvent.location, icon: <MapPin className="w-4 h-4" /> },
                    { label: 'POP', val: currentEvent.attendees, icon: <Users className="w-4 h-4" /> },
                    { label: 'TICKET', val: currentEvent.price, icon: <Tag className="w-4 h-4" /> },
                    { label: 'MODE', val: currentEvent.category, icon: <Heart className="w-4 h-4" /> }
                 ].map((stat, i) => (
                    <div key={i} className={`p-6 border-black ${i < 3 ? 'md:border-r-2' : ''} ${i % 2 === 0 ? 'border-r-2 md:border-r-2' : ''} ${i < 2 ? 'border-b-2 md:border-b-0' : ''} hover:bg-primary/5 transition-colors`}>
                       <div className="flex items-center gap-2 mb-2 opacity-40">
                          {stat.icon}
                          <span className="text-[10px] font-black">{stat.label}</span>
                       </div>
                       <p className="font-black text-lg">{stat.val}</p>
                    </div>
                 ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                 <button className="btn-premium flex-1 py-6 text-xl">
                    BOOK TICKET NOW!
                 </button>
                 <div className="flex gap-4">
                    <button title="Previous" onClick={prevEvent} className="w-20 h-20 glass-interactive flex items-center justify-center">
                       <ArrowLeft className="w-8 h-8" />
                    </button>
                    <button title="Next" onClick={nextEvent} className="w-20 h-20 glass-interactive flex items-center justify-center">
                       <ArrowRight className="w-8 h-8" />
                    </button>
                 </div>
              </div>
           </motion.div>

           {/* Sidebar Panel */}
           <motion.div
             initial={{ opacity: 0, x: 50, rotate: 2 }}
             animate={{ opacity: 1, x: 0, rotate: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-4 hidden lg:flex flex-col gap-6"
           >
              <div className="glass p-10 bg-[#feff9c] -rotate-2">
                 <Zap className="w-10 h-10 mb-4 text-black" />
                 <p className="font-black text-3xl leading-none mb-4">NEURAL PEAK!</p>
                 <p className="text-xs font-bold opacity-60">OPTIMIZED FOR ATMOSPHERIC SYNC V3.0</p>
              </div>
              <div className="glass p-10 bg-white rotate-1">
                 <p className="font-black text-xl mb-4 italic">"{currentEvent.description}"</p>
                 <div className="w-full h-1 bg-black" />
              </div>
           </motion.div>
        </div>

        {/* Comic Scroll Tip */}
        <div className="absolute bottom-24 flex gap-3 z-30">
           {events.map((_, i) => (
             <div 
               key={i} 
               className={`h-4 border-2 border-black transition-all duration-300 ${i === index ? 'w-12 bg-primary' : 'w-4 bg-white'}`}
             />
           ))}
        </div>
      </div>

      {/* Identity Reveal Section (Comic Style) */}
      <div className="py-40 px-12 bg-[#fff9fc] border-t-4 border-black relative overflow-hidden">
         {/* Decorative Comic Stripes */}
         <div className="absolute top-0 left-0 w-full h-20 bg-secondary skew-y-3 -translate-y-10 opacity-20" />
         
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
               <h2 className="text-primary font-black text-2xl mb-8 tracking-[0.4em]">IDENTITY HUB //</h2>
               <h3 className="text-6xl md:text-8xl font-black mb-12 leading-[0.8] tracking-tighter italic">READY TO JOIN THE <span className="bg-primary text-black px-4 not-italic">SYNC?</span></h3>
               <button 
                 onClick={() => onNavigate('profile-creation')}
                 className="btn-premium px-16 py-6 text-xl"
               >
                 ENTER PROFILE HUB!
               </button>
            </div>
            <div className="w-full lg:w-[450px] aspect-[3/4] glass shadow-[20px_20px_0px_#000] rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
               <img src="/wellness.png" alt="Profile Hub" className="w-full h-full object-cover" />
            </div>
         </div>
      </div>
    </section>
  );
};
