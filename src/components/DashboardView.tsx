import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Zap, Shield, Sparkles, Binary, ArrowRight } from 'lucide-react';

const OngoingEvents = () => {
  const events = [
    { name: "Code Sprint 2026", type: "HACKATHON", time: "LIVE", color: "from-cyan-500/10 to-blue-500/10" },
    { name: "Global AI Summit", type: "CONFERENCE", time: "IN 2H", color: "from-purple-500/10 to-pink-500/10" },
    { name: "Design Jam v4", type: "WORKSHOP", time: "IN 5H", color: "from-amber-500/10 to-orange-500/10" },
    { name: "Cloud Native Days", type: "CONFERENCE", time: "TOMORROW", color: "from-emerald-500/10 to-teal-500/10" },
    { name: "Product Vision", type: "MEETING", time: "IN 1H", color: "from-blue-500/10 to-indigo-500/10" },
  ];

  return (
    <div className="w-full relative py-32 mt-24">
      <div className="flex items-end justify-between mb-16 px-4">
        <div>
           <h2 className="text-sm font-black text-primary tracking-[0.5em] mb-4 uppercase">Neural Clusters</h2>
           <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">Ongoing Events</h3>
        </div>
        <button className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity">View Historical Log</button>
      </div>
      
      <div className="flex gap-8 overflow-hidden relative pb-12">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap py-10"
        >
          {[...events, ...events].map((event, i) => (
            <motion.div 
               key={i} 
               whileHover={{ y: -10 }}
               className={`min-w-[450px] h-64 glass-interactive rounded-[2.5rem] p-12 flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-gradient-to-br ${event.color}`}
            >
               <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <div className="w-32 h-32 bg-primary rounded-full blur-3xl shadow-[0_0_100px_rgba(0,227,253,1)]"></div>
               </div>
               <div>
                  <span className="text-[10px] font-black tracking-[0.4em] text-primary/60 uppercase">{event.type}</span>
                  <h3 className="text-3xl font-bold text-white mt-4">{event.name}</h3>
               </div>
               <div className="flex justify-between items-center mt-6 relative z-10">
                  <span className="text-muted text-xs font-black flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#00e3fd] animate-pulse" />
                    {event.time}
                  </span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-[10px] font-black tracking-widest uppercase">Sync Portal</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const DashboardView = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden py-32 px-12 lg:px-24">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="w-10 h-10 rounded-xl bg-primary font-black text-xl text-background flex items-center justify-center">S</div>
             <span className="text-muted font-black tracking-[0.5em] uppercase text-[10px]">Neural Synchronicity Console</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-tight mb-8">
            The <span className="text-primary italic">Aperture</span> Opens
          </h1>
          <p className="text-muted text-xl leading-relaxed">
            Welcome to the tier-1 orchestration layer. Seamlessly manage neural identities and atmospheric networking clusters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-32">
          {/* Register for Event (Participant) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onNavigate('profile-creation')}
            className="group relative h-[500px] rounded-[3.5rem] overflow-hidden cursor-pointer glass-interactive border border-white/5 bg-gradient-to-tr from-cyan-500/10 to-transparent"
          >
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-background to-transparent opacity-90" />
            
            <div className="absolute inset-0 p-16 flex flex-col justify-end relative z-10">
              <span className="text-[10px] font-black text-primary tracking-[0.5em] mb-6 uppercase">Participant Cluster</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.9] tracking-tighter">Explore<br />Active Gateways</h2>
              <p className="text-muted text-lg mt-8 max-w-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                Join the highest-performance networking clusters in the neural ecosystem.
              </p>
              <div className="mt-12 overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                <div className="flex items-center gap-4 text-primary font-black text-xs tracking-widest uppercase">
                  INITIALIZE PROFILE HUB <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Register an Event (Organiser) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative h-[500px] rounded-[3.5rem] overflow-hidden cursor-pointer glass-interactive border border-white/5 bg-gradient-to-tl from-purple-500/10 to-transparent"
          >
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-background to-transparent opacity-90" />

            <div className="absolute inset-0 p-16 flex flex-col justify-end relative z-10">
              <span className="text-[10px] font-black text-secondary tracking-[0.5em] mb-6 uppercase">Aperture Orchestration</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.9] tracking-tighter">Initialize New<br />Neural Event</h2>
              <p className="text-muted text-lg mt-8 max-w-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                Architect clusters and lead the next wave of atmospheric networking.
              </p>
              <div className="mt-12 overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                <div className="flex items-center gap-4 text-secondary font-black text-xs tracking-widest uppercase">
                  DOWNLOAD APERTURE CLI <ArrowRight className="w-5 h-5" />
                </div>
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
