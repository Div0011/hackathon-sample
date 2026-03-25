import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Users, Zap, Ticket, Star } from 'lucide-react';

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
    color: "#e63946",
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
    color: "#ffb703",
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
    color: "#219ebc",
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
      <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center">
        
        {/* Shutter Bars (Top/Bottom Black Bars) - Responsive height */}
        <div className="absolute top-0 inset-x-0 h-20 md:h-32 bg-black z-20 pointer-events-none flex items-end justify-center pb-4 md:pb-6">
           <span className="text-white text-[8px] md:text-[10px] font-black tracking-[1em] opacity-40">CINEMATIC MODE // APERTURE O7</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 md:h-32 bg-black z-20 pointer-events-none flex items-start justify-center pt-4 md:pt-6">
           <span className="text-white text-[8px] md:text-[10px] font-black tracking-[1em] opacity-40">PASTEL SYNC // RUNTIME 3.0.4</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={currentEvent.image} 
              alt={currentEvent.name}
              className="w-full h-full object-cover vintage-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </motion.div>
        </AnimatePresence>

        {/* Action Controls (Mobile friendly placement) */}
        <div className="absolute bottom-28 md:bottom-auto md:right-12 z-30 flex md:flex-col gap-4">
           <button title="PREV" onClick={prevEvent} className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000]">
              <ArrowLeft size={24} strokeWidth={4} />
           </button>
           <button title="NEXT" onClick={nextEvent} className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000]">
              <ArrowRight size={24} strokeWidth={4} />
           </button>
        </div>

        {/* Comic Panel Layout (Information Section) */}
        <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 pt-20 flex flex-col items-center">
           
           <motion.div 
             key={`card-${index}`}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-full bg-white border-4 border-black shadow-[15px_15px_0px_#000] md:shadow-[25px_25px_0px_#000] relative group overflow-hidden"
           >
              {/* Comic Action Sticker - Smaller on Mobile */}
              <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="absolute -top-4 -right-4 md:-top-12 md:-left-12 bg-[#ffb703] border-4 border-black px-4 py-2 md:px-8 md:py-4 font-black text-xl md:text-3xl shadow-[4px_4px_0px_#000] z-30 rotate-12 md:-rotate-15"
              >
                 {currentEvent.tagline}
              </motion.div>

              <div className="p-6 md:p-14">
                 <div className="flex justify-between items-center mb-6 md:mb-12">
                    <div className="bg-black text-white px-4 py-1 text-[8px] md:text-[10px] font-black tracking-widest">{currentEvent.time}</div>
                    <div className="flex gap-1 md:gap-2">
                       <Star className="w-4 h-4 md:w-6 md:h-6 text-primary" fill="currentColor" />
                       <Star className="w-4 h-4 md:w-6 md:h-6 text-secondary" fill="currentColor" />
                    </div>
                 </div>

                 <h1 className="text-4xl md:text-9xl font-black mb-6 md:mb-12 leading-none tracking-tighter italic text-stroke">
                    {currentEvent.name}
                 </h1>

                 {/* Tabular Layout (Responsive grid) */}
                 <div className="grid grid-cols-2 md:grid-cols-4 border-4 border-black mb-8 md:mb-12 bg-[#f8f9fa]">
                    {[
                       { label: 'REGION', val: currentEvent.location, icon: <MapPin className="w-4 h-4" /> },
                       { label: 'HOSTS', val: currentEvent.attendees, icon: <Users className="w-4 h-4" /> },
                       { label: 'COST', val: currentEvent.price, icon: <Ticket className="w-4 h-4" /> },
                       { label: 'CORE', val: currentEvent.category, icon: <Zap className="w-4 h-4" /> }
                    ].map((item, i) => (
                       <div key={i} className={`p-4 md:p-8 border-black font-black ${i % 2 === 0 ? 'border-r-4' : ''} ${i < 2 ? 'border-b-4 md:border-b-0' : ''} ${i === 2 ? 'md:border-r-4' : ''}`}>
                          <div className="flex items-center gap-2 md:gap-3 opacity-30 text-[8px] md:text-[10px] mb-1 md:mb-3">
                             {item.icon}
                             <span>{item.label}</span>
                          </div>
                          <p className="text-sm md:text-2xl italic truncate">{item.val}</p>
                       </div>
                    ))}
                 </div>

                 <p className="text-black font-bold text-sm md:text-xl mb-8 md:mb-12 leading-tight max-w-2xl lowercase border-l-4 md:border-l-8 border-black pl-4 md:pl-8 italic">
                    {currentEvent.description}
                 </p>

                 <button 
                  onClick={() => onNavigate('profile-creation')}
                  className="w-full btn-premium py-4 md:py-6 text-xl md:text-3xl italic shadow-[10px_10px_0px_#000] active:translate-y-1 transition-all"
                 >
                    STRIKE TICKET!
                 </button>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Profile Section - Responsive Split */}
      <div className="py-20 md:py-40 px-6 md:px-12 bg-[#fffdf2] border-t-8 border-black relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-32 items-center">
            <div className="w-full md:flex-1 text-center md:text-left">
               <div className="inline-block px-4 py-1 bg-black text-white text-[8px] md:text-[10px] font-black tracking-[0.4em] mb-6">IDENTITY HUB //</div>
               <h3 className="text-5xl md:text-[11rem] font-black italic tracking-tighter text-stroke leading-none mb-8">INITIATE <span className="bg-[#ffb703] text-black px-4 md:px-8 not-italic">SYNC!</span></h3>
               <button 
                 onClick={() => onNavigate('profile-creation')}
                 className="w-full md:w-auto btn-premium px-12 md:px-24 py-6 md:py-8 text-2xl md:text-3xl italic"
               >
                 ENTER PORTAL!
               </button>
            </div>
            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
               <motion.div 
                  whileInView={{ rotate: -2, scale: 1 }}
                  initial={{ rotate: 0, scale: 0.95 }}
                  className="w-full h-full md:h-[600px] bg-white border-4 md:border-8 border-black shadow-[20px_20px_0px_#000] overflow-hidden"
               >
                  <img src="/wellness.png" alt="Identity Preview" className="w-full h-full object-cover vintage-image" />
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};
