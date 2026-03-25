import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Heart, Star } from 'lucide-react';

export const TheLounge = () => {
  return (
    <section id="lounge" className="section bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center space-y-12">
        
        <div className="space-y-4">
          <motion.div 
             whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
             transition={{ duration: 0.8 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-tertiary/20 bg-tertiary/10 text-tertiary text-sm font-medium uppercase tracking-widest"
          >
            Sanctum Collective
          </motion.div>
          
          <h2 className="text-display text-white text-6xl md:text-8xl font-bold leading-tight">
            THE <span className="text-tertiary">LOUNGE</span>
          </h2>
          
          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Where networking becomes a lived reality. The Lounge is our high-performance community interface for the bold, the bright, and the connected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl py-8">
           <div className="glass p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-background transition-all">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Elite Peers</h3>
              <p className="text-muted leading-relaxed">Access a curated network of over 10,000 top-tier founders and visionaries.</p>
           </div>
           <div className="glass p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 hover:-translate-y-4 transition-all duration-500 group border-tertiary/30 bg-tertiary/[0.03]">
              <div className="w-20 h-20 rounded-[1.5rem] bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-background transition-all">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Neural Chat</h3>
              <p className="text-muted leading-relaxed">Real-time intelligent discussion layers that filter signal from noise automatically.</p>
           </div>
           <div className="glass p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-20 h-20 rounded-[1.5rem] bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-background transition-all">
                <Star size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Curated Perks</h3>
              <p className="text-muted leading-relaxed">Exclusive alpha-tier rewards and early access to the neural network ecosystem.</p>
           </div>
        </div>

        <div className="pt-12">
           <button className="px-12 py-5 bg-tertiary text-background font-black text-xl rounded-2xl hover:bg-tertiary/90 transition-all transform hover:scale-110 active:scale-95 shadow-[0_20px_60px_rgba(0,255,65,0.4)]">
             ENTER THE COLLECTIVE
           </button>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
    </section>
  );
};
