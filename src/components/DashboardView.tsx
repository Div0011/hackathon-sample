import React from 'react';
import { motion } from 'framer-motion';
import { OrbBackground } from './Orb';

const OngoingEvents = () => {
  const events = [
    { name: "Code Sprint 2026", type: "HACKATHON", time: "LIVE" },
    { name: "Global AI Summit", type: "CONFERENCE", time: "IN 2H" },
    { name: "Design Jam v4", type: "WORKSHOP", time: "IN 5H" },
    { name: "Cloud Native Days", type: "CONFERENCE", time: "TOMORROW" },
    { name: "Product Vision", type: "MEETING", time: "IN 1H" },
  ];

  return (
    <div className="w-full relative py-20 px-12 glass mt-24">
      <h2 className="text-3xl font-bold mb-10 text-primary">Ongoing Events</h2>
      
      <div className="flex gap-8 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap py-10"
        >
          {[...events, ...events].map((event, i) => (
            <div key={i} className="min-w-[400px] h-48 glass rounded-3xl p-10 flex flex-col justify-between hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <div className="w-24 h-24 bg-primary rounded-full blur-3xl"></div>
               </div>
               <div>
                 <span className="text-xs font-black tracking-widest text-primary/60 uppercase">{event.type}</span>
                 <h3 className="text-2xl font-bold text-white mt-1">{event.name}</h3>
               </div>
               <div className="flex justify-between items-center mt-6">
                 <span className="text-muted text-sm font-black flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   {event.time}
                 </span>
                 <button className="btn-outline px-6 py-2 rounded-xl text-xs">JOIN EVENT</button>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const DashboardView = () => {
  return (
    <section className="relative min-h-screen w-full bg-background overflow-hidden p-12">
      <OrbBackground />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="w-8 h-8 rounded-lg bg-primary font-black text-xs text-background flex items-center justify-center">S</div>
             <span className="text-white font-bold tracking-widest uppercase text-sm">Dashboard</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">Your Journey</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Register for Event (Participant) */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative h-[450px] rounded-[40px] overflow-hidden cursor-pointer snow-cap border border-white/10"
          >
            <div className="absolute inset-0">
              <img 
                src="/Users/divyansh/.gemini/antigravity/brain/e83a9734-1475-4e91-a72a-4315679ae427/event_participant_card_bg_1774466018060.png" 
                alt="Participant Gateway"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end relative z-10">
              <span className="text-[10px] font-black text-primary tracking-[0.4em] mb-4 uppercase">Participant Discovery</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tighter">Register For<br />An Event</h2>
              <p className="text-muted text-sm mt-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Join thousands of neural hosts in the most advanced networking clusters.
              </p>
              <div className="mt-8 overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                <button className="btn-premium px-8 py-3 rounded-xl text-sm">EXPLORE GATEWAYS</button>
              </div>
            </div>
          </motion.div>

          {/* Register an Event (Organiser) */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative h-[450px] rounded-[40px] overflow-hidden cursor-pointer snow-cap border border-white/10"
          >
            <div className="absolute inset-0">
              <img 
                src="/Users/divyansh/.gemini/antigravity/brain/e83a9734-1475-4e91-a72a-4315679ae427/event_organizer_card_bg_1774466036104.png" 
                alt="Organiser Command"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            <div className="absolute inset-0 p-12 flex flex-col justify-end relative z-10">
              <span className="text-[10px] font-black text-primary tracking-[0.4em] mb-4 uppercase">Aperture Orchestration</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tighter">Register An<br />Event</h2>
              <p className="text-muted text-sm mt-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Architect high-performance clusters and lead the next wave of neural synchronization.
              </p>
              <div className="mt-8 overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                <button className="btn-outline px-8 py-3 rounded-xl text-sm border-white/20 text-white">INITIALIZE APERTURE</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ongoing Events Scroll Section */}
        <OngoingEvents />
      </div>
    </section>
  );
};
