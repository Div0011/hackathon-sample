import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag, Users, Music, Lightbulb, Heart } from 'lucide-react';

const events = [
  {
    name: "Aura Dream Festival 2026",
    type: "FESTIVAL",
    time: "LIVE NOW",
    image: "pastel_dream_festival_1774469067573.png", // Corrected path in component usage
    description: "Experience the ultimate neural-enhanced music festival in the heart of the pastel dreamscape.",
    location: "Neo-Kyoto Cluster",
    attendees: "12,400+",
    price: "$299",
    category: "Music & Art",
    color: "#ff7eb9"
  },
  {
    name: "Pastel Sync Innovation Expo",
    type: "TECH EXPO",
    time: "IN 2 DAYS",
    image: "tech_innovation_expo_1774469088618.png",
    description: "Discover the next wave of atmospheric networking and building tools at the global tech pavilion.",
    location: "Aperture Hub B",
    attendees: "5,000+",
    price: "$149",
    category: "Technology",
    color: "#7afcff"
  },
  {
    name: "Serene Neural Retreat",
    type: "WELLNESS",
    time: "NEXT MONTH",
    image: "serene_yoga_retreat_1774469111688.png",
    description: "Synchronize your biological identity with deep-meditation frequencies in a tranquil pastel sanctuary.",
    location: "Echo Valley Reservoir",
    attendees: "200 (Exclusive)",
    price: "$899",
    category: "Wellness",
    color: "#e0c3fc"
  }
];

// Helper to get image path
const getImagePath = (name: string) => `/Users/divyansh/.gemini/antigravity/brain/7e519905-557e-4445-99a4-ead5d27c1d6d/${name}`;

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [index, setIndex] = useState(0);
  const currentEvent = events[index];

  const nextEvent = () => setIndex((prev) => (prev + 1) % events.length);
  const prevEvent = () => setIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      
      {/* Huge Event Section with Background Image */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={getImagePath(currentEvent.image)} 
              alt={currentEvent.name}
              className="w-full h-full object-cover"
            />
            {/* Soft overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Card with Tabular Data */}
        <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col md:flex-row items-end justify-between gap-12">
           
           <motion.div 
             key={`info-${index}`}
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="max-w-2xl text-left"
           >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/40 shadow-sm border border-white/60 text-primary text-xs font-black tracking-[0.3em] uppercase mb-8"
              >
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 {currentEvent.time}
              </motion.div>
              
              <h1 className="text-7xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8 drop-shadow-2xl">
                {currentEvent.name.split(' ').map((word, i) => (
                  <span key={i}>{i === 1 ? <span className="text-gradient italic">{word} </span> : word + ' '}</span>
                ))}
              </h1>

              <div className="glass p-10 rounded-[3rem] border-white/40 shadow-2xl space-y-8">
                 <p className="text-muted-foreground text-lg leading-relaxed font-medium italic">
                   "{currentEvent.description}"
                 </p>
                 
                 {/* Tabular Data Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-black/5">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-primary">
                          <MapPin className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Location</span>
                       </div>
                       <p className="font-bold text-sm">{currentEvent.location}</p>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-primary">
                          <Users className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Attendees</span>
                       </div>
                       <p className="font-bold text-sm">{currentEvent.attendees}</p>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-primary">
                          <Tag className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Price</span>
                       </div>
                       <p className="font-bold text-sm">{currentEvent.price}</p>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-primary">
                          <Heart className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Category</span>
                       </div>
                       <p className="font-bold text-sm">{currentEvent.category}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button className="btn-premium flex-1 py-5 rounded-2xl text-base shadow-[0_20px_50px_rgba(255,126,185,0.4)]">
                      Sync To Gateway & Register
                    </button>
                    <div className="flex gap-2">
                       <button onClick={prevEvent} className="w-16 h-16 rounded-2xl glass-interactive flex items-center justify-center border-white/60 hover:bg-white/60 shadow-lg">
                          <ArrowLeft className="w-6 h-6 text-primary" />
                       </button>
                       <button onClick={nextEvent} className="w-16 h-16 rounded-2xl glass-interactive flex items-center justify-center border-white/60 hover:bg-white/60 shadow-lg">
                          <ArrowRight className="w-6 h-6 text-primary" />
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Event Quick Statistics (Floating) */}
           <motion.div 
             key={`stats-${index}`}
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="hidden lg:flex flex-col gap-6"
           >
              <div className="glass p-8 rounded-[2rem] border-white/50 text-center w-48 shadow-xl">
                 <p className="text-primary font-black text-3xl mb-1">98%</p>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Aura Sync</p>
              </div>
              <div className="glass p-8 rounded-[2rem] border-white/50 text-center w-48 shadow-xl">
                 <p className="text-secondary font-black text-3xl mb-1">Tier 1</p>
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Protocol</p>
              </div>
           </motion.div>
        </div>

        {/* Global Nav Indicator */}
        <div className="absolute bottom-12 flex gap-4">
           {events.map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 width: i === index ? 48 : 12,
                 backgroundColor: i === index ? currentEvent.color : 'rgba(0,0,0,0.1)'
               }}
               className="h-1.5 rounded-full transition-all duration-500"
             />
           ))}
        </div>
      </div>

      {/* Profile Section Preview */}
      <div className="py-32 px-12 bg-white relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
               <h2 className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-6">Identity Hub</h2>
               <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">Ready to Initialize Your Neural <span className="text-gradient">Pastel Identity?</span></h3>
               <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">Design your biological fingerprint and synchronize with the atmospheric networking layer in high-fidelity pastel.</p>
               <button 
                 onClick={() => onNavigate('profile-creation')}
                 className="btn-premium px-12 py-5 rounded-2xl text-sm"
               >
                 ENTER PROFILE HUB
               </button>
            </div>
            <div className="relative group perspective-2000">
               <motion.div 
                 whileHover={{ rotateY: 15, rotateX: -5 }}
                 className="w-full md:w-[500px] h-[600px] glass p-4 rounded-[4rem] group-hover:shadow-[0_40px_100px_rgba(0,227,253,0.3)] transition-all duration-700"
               >
                  <img 
                    src={getImagePath("serene_yoga_retreat_1774469111688.png")} 
                    className="w-full h-full object-cover rounded-[3.5rem]"
                    alt="Nexus View"
                  />
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};
