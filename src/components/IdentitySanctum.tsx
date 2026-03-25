import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Share2, Globe } from 'lucide-react';

export const IdentitySanctum = () => {
  return (
    <section id="identity" className="section bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-left space-y-8">
          <motion.div 
             whileInView={{ opacity: [0, 1], x: [-20, 0] }}
             transition={{ duration: 0.8 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-sm font-medium uppercase tracking-widest"
          >
            Digital Soul
          </motion.div>
          
          <h2 className="text-display text-white text-5xl md:text-7xl font-bold leading-tight">
            IDENTITY <br/> 
            <span className="text-secondary text-glow-blue/10">SANCTUM</span>
          </h2>
          
          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl">
            A biological fingerprint transformed into a high-fidelity digital asset. Your identity is a sanctuary, protected by obsidian-grade encryption and synchronized across the global neural web.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl glass border border-white/5 space-y-4 hover:border-secondary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="font-bold text-white text-xl">Privacy Core</h3>
              <p className="text-muted text-sm leading-relaxed">End-to-end zero-knowledge proof for your private metadata.</p>
            </div>
            <div className="p-6 rounded-2xl glass border border-white/5 space-y-4 hover:border-secondary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-white text-xl">Global Reach</h3>
              <p className="text-muted text-sm leading-relaxed">Instant connectivity to elite networking tiers worldwide.</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
           {/* Card Visual */}
           <motion.div 
             whileInView={{ y: [40, 0], opacity: [0, 1], rotate: [-2, 0] }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="w-full max-w-[440px] aspect-[1/1.4] rounded-[2rem] glass p-1 relative z-20 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
           >
             <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none" />
             
             <div className="h-full w-full bg-[#0e0e0e] rounded-[1.8rem] p-10 flex flex-col items-center text-center relative z-10">
               <div className="w-32 h-32 rounded-full border-2 border-dashed border-secondary/40 p-2 mb-8 animate-spin-slow">
                 <div className="w-full h-full rounded-full bg-gradient-to-tr from-secondary to-primary/50 flex items-center justify-center">
                   <User size={48} className="text-white" />
                 </div>
               </div>
               
               <h3 className="text-3xl font-bold mb-2">NEURAL_ENTITY_01</h3>
               <p className="text-secondary text-sm font-mono mb-8 tracking-widest uppercase">Syncing to Obsidian Network...</p>
               
               <div className="w-full space-y-6 pt-6 border-t border-white/5">
                 <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-muted text-xs uppercase tracking-widest font-medium">Network Rank</span>
                    <span className="text-white font-bold">#4,221</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-muted text-xs uppercase tracking-widest font-medium">Connectivity</span>
                    <span className="text-white font-bold">ALPHA+</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-muted text-xs uppercase tracking-widest font-medium">Sync Status</span>
                    <span className="text-primary text-glow-blue animate-pulse">OPTIMIZED</span>
                 </div>
               </div>
             </div>
           </motion.div>

           {/* Glow background for card */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />
        </div>
      </div>
    </section>
  );
};
