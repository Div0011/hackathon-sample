import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Zap, Cpu, Activity } from 'lucide-react';

export const AIAlchemyCore = () => {
  return (
    <section id="alchemy" className="section bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-full bg-primary/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
        
        <div className="order-2 lg:order-1 flex justify-center items-center">
            {/* Neural Map Visual */}
            <div className="w-[450px] aspect-square relative rounded-full border border-primary/10 overflow-hidden glass p-4 group">
               <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: [0, 0.4, 0.2] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,227,253,0.1),transparent_70%)]"
               />

               <div className="w-full h-full relative rounded-full border border-primary/20 p-20 flex items-center justify-center">
                  <div className="w-[120px] h-[120px] rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_80px_rgba(0,227,253,0.3)] anim-pulse">
                     <Cpu size={56} className="text-primary text-glow-blue" />
                  </div>
                  
                  {/* Floating particles/nodes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ 
                        rotate: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3 + i, repeat: Infinity },
                        opacity: { duration: 4 + i, repeat: Infinity }
                      }}
                      className="absolute p-2 rounded-lg glass border border-primary/30"
                      style={{
                        top: '50%',
                        left: '50%',
                        marginLeft: '-20px',
                        marginTop: '-20px',
                        transform: `rotate(${i * 45}deg) translateX(150px) rotate(-${i * 45}deg)`
                      }}
                    >
                      <Activity size={16} className="text-primary" />
                    </motion.div>
                  ))}
               </div>
            </div>
        </div>

        <div className="order-1 lg:order-2 text-left space-y-8">
          <motion.div 
             whileInView={{ opacity: [0, 1], x: [20, 0] }}
             transition={{ duration: 0.8 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium uppercase tracking-widest"
          >
            Neural Synthesis
          </motion.div>
          
          <h2 className="text-display text-white text-5xl md:text-7xl font-bold leading-tight">
            AI ALCHEMY <br/> 
            <span className="text-primary text-glow-blue/10">CORE</span>
          </h2>
          
          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl">
             Mapping the unseen connections. Our neural synthesis engine analyzes 44,000 biological and behavioral variables to match potential elite collaborators instantly.
          </p>

          <div className="space-y-4 pt-4">
            <div className="p-6 rounded-2xl glass border border-white/5 flex items-center gap-6 hover:translate-x-4 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Network size={28} />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Synaptic Matching</h3>
                <p className="text-muted text-sm leading-relaxed">Predictive networking based on behavioral velocity.</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass border border-white/5 flex items-center gap-6 hover:translate-x-4 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#bc00ff]/10 flex items-center justify-center text-[#bc00ff] group-hover:bg-[#bc00ff] group-hover:text-white transition-all">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Instant Alchemy</h3>
                <p className="text-muted text-sm leading-relaxed">0.02ms latency for high-frequency value delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
