import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, MessageCircle, MoreHorizontal, Zap } from 'lucide-react';

interface TheLoungeProps {
  onNavigate?: (view: any) => void;
}

export const TheLounge: React.FC<TheLoungeProps> = () => {
  const messages = [
     { user: "ALPHA_LOG", msg: "JOIN THE NEXT NEURAL CLUSTER AT 12:00." },
     { user: "SYMMETRY_CORE", msg: "VELOCITY SYNC COMPLETED." },
     { user: "FLUX_V3", msg: "SYNC NOW!" }
  ];

  return (
    <section className="relative min-h-screen w-full pt-48 pb-32 px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
         
         <div className="flex-1">
            <h1 className="text-8xl md:text-[11rem] font-black italic tracking-tighter text-stroke mb-20 leading-none">THE <span className="bg-[#e63946] px-6 text-white not-italic shadow-[15px_15px_0px_#000]">LOUNGE//</span></h1>
            <p className="text-2xl font-black italic max-w-lg mb-20 lowercase border-l-8 border-black pl-8 leading-none">
               the high-performance biological social synchronization cluster.
            </p>

            <div className="space-y-10">
               {messages.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_#000] relative group overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageCircle size={100} />
                     </div>
                     <p className="text-primary font-black text-xs tracking-[0.4em] mb-4 uppercase">IDENTITY: {m.user} //</p>
                     <p className="text-4xl font-black italic tracking-tighter lowercase leading-none">{m.msg}</p>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="w-full md:w-[450px] space-y-12">
            <div className="bg-white border-8 border-black p-12 shadow-[25px_25px_0px_#000] rotate-[2deg]">
               <div className="flex items-center gap-4 mb-8">
                  <Coffee className="text-primary" size={40} />
                  <h3 className="text-4xl font-black tracking-tighter">BREW SYNC</h3>
               </div>
               <p className="font-bold text-lg mb-10 italic">"AUTOMATIC BIOLOGICAL CAFFEINATION PROTOCOL ACTIVE."</p>
               <button className="btn-premium w-full py-6 text-2xl italic">INITIATE BREW!</button>
            </div>

            <div className="bg-[#ffb703] border-4 border-black p-10 shadow-[15px_15px_0px_#000] -rotate-[3deg]">
               <h3 className="text-3xl font-black italic mb-6 uppercase">CLUSTER STATUS //</h3>
               <div className="flex justify-between items-center bg-black/5 p-4 border-2 border-black">
                  <span className="font-black">POPULATION</span>
                  <span className="text-white bg-black px-4 py-1 font-black">1.4K</span>
               </div>
               <div className="flex justify-between items-center bg-black/5 p-4 border-x-2 border-b-2 border-black">
                  <span className="font-black">MODE</span>
                  <span className="text-white bg-black px-4 py-1 font-black">CHILL</span>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
