import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Shield, Sparkles, Binary, Fingerprint, Star } from 'lucide-react';

interface ProfileCreationViewProps {
  onNavigate: (view: any) => void;
}

export const ProfileCreationView = ({ onNavigate }: ProfileCreationViewProps) => {
  const hubOptions = [
    {
      title: "Discovery",
      desc: "Neural-matched peer clusters",
      icon: <Sparkles className="w-8 h-8" />,
      target: "recommendations",
      color: "bg-white",
      tag: "SYNC!"
    },
    {
      title: "Analytics",
      desc: "Performance & Growth maps",
      icon: <Binary className="w-8 h-8" />,
      target: "analytics",
      color: "bg-[#ffb703]",
      tag: "CORE!"
    },
    {
      title: "The Lounge",
      desc: "Social synchronization bay",
      icon: <Users className="w-8 h-8" />,
      target: "lounge",
      color: "bg-white",
      tag: "CHILL!"
    },
    {
      title: "Security",
      desc: "Aperture governance sync",
      icon: <Shield className="w-8 h-8" />,
      target: "policy",
      color: "bg-[#e63946]",
      tag: "ALERT!"
    }
  ];

  return (
    <section className="relative min-h-screen w-full py-48 md:py-60 px-8 md:px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start relative z-10">
        
        {/* Left: Identity Creation Form (Comic Style) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -top-12 -left-12 bg-[#e63946] border-4 border-black px-10 py-4 font-black text-4xl italic text-white shadow-[10px_10px_0px_#000] rotate-[-5deg] z-20">
             IDENTITY//
          </div>

          <div className="relative bg-white border-8 border-black p-10 md:p-14 shadow-[30px_30px_0px_#000]">
            <div className="flex items-center gap-6 mb-16">
               <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center text-white">
                  <Fingerprint size={48} />
               </div>
               <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-stroke leading-none uppercase">CREATE CLUSTER IDENTITY!</h1>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-[0.4em] mb-2 block">// APERTURE HANDLE</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-4 border-black p-6 font-black text-2xl outline-none focus:bg-[#ffb703] transition-all placeholder:opacity-30" 
                  placeholder="e.g. neuron_alpha" 
                  title="Aperture Handle"
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-[0.4em] mb-2 block">// NEURAL BIO</label>
                <textarea 
                  className="w-full bg-white border-4 border-black p-6 h-48 font-black text-2xl outline-none focus:bg-[#ffb703] transition-all resize-none placeholder:opacity-30" 
                  placeholder="Describe your biological focus..." 
                  title="Neural Bio"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-black uppercase tracking-[0.4em] mb-2 block">// TIER</label>
                  <select className="w-full bg-white border-4 border-black p-6 font-black text-2xl outline-none" title="Aperture Tier">
                    <option>LEVEL 1 (HOST)</option>
                    <option>LEVEL 2 (ARCHITECT)</option>
                    <option>LEVEL 3 (OBSERVER)</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-black uppercase tracking-[0.4em] mb-2 block">// HUB</label>
                  <input type="text" className="w-full bg-white border-4 border-black p-6 font-black text-2xl outline-none" placeholder="ALPHA" title="Cluster" />
                </div>
              </div>

              <button className="btn-premium w-full py-8 text-4xl shadow-[15px_15px_0px_#000] hover:shadow-[25px_25px_0px_#000] transition-all active:translate-y-2">
                 INITIALIZE SYNC!
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Options to Other Pages (Comic Grid) */}
        <div className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">NEURAL <span className="bg-[#219ebc] px-6 text-white not-italic">GATEWAYS//</span></h2>
            <p className="text-2xl font-black italic max-w-md border-r-8 border-black pr-8 text-right lowercase opacity-60">
              "navigate through the high-performance cinematic clusters of the ecosystem."
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {hubOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                onClick={() => onNavigate(option.target)}
                className={`group relative p-10 border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[25px_25px_0px_#000] cursor-pointer transition-all duration-300 hover:-translate-y-4 flex flex-col justify-end h-72 ${option.color} overflow-hidden`}
              >
                {/* Halftone Pattern (Inner) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />
                
                {/* Sticker */}
                <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 text-xs font-black rotate-[-5deg]">{option.tag}</div>

                <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center text-black group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 shadow-[6px_6px_0px_#000]">
                   {option.icon}
                </div>
                <div>
                   <h3 className="text-4xl font-black tracking-tighter italic mb-2 uppercase">{option.title}</h3>
                   <p className="font-bold text-sm leading-none italic lowercase opacity-60">
                      {option.desc}
                   </p>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Star size={32} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-10 bg-white border-4 border-black shadow-[15px_15px_0px_#000] flex items-center gap-10"
          >
            <div className="w-16 h-16 bg-[#219ebc] border-4 border-black flex items-center justify-center animate-pulse">
               <Zap className="text-white" size={32} />
            </div>
            <div>
              <p className="text-xl font-black italic tracking-widest leading-none mb-2">NEURAL ENCRYPTION ACTIVE!</p>
              <p className="text-sm font-bold lowercase opacity-40">"identity hub secured by aperture v3.0 protocols."</p>
            </div>
          </motion.div>
        </div>

      </div>
      
      {/* Background Decorative Frame */}
      <div className="absolute inset-0 border-[32px] border-black opacity-5 pointer-events-none z-0" />
    </section>
  );
};
