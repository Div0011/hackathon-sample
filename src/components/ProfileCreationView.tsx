import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, Shield, Sparkles, Binary, Fingerprint, Star, ArrowRight, CheckCircle } from 'lucide-react';

interface ProfileCreationViewProps {
  onNavigate: (view: any) => void;
}

export const ProfileCreationView = ({ onNavigate }: ProfileCreationViewProps) => {
  const [isCreated, setIsCreated] = useState(false);

  const hubOptions = [
    {
      title: "Matched Profiles",
      desc: "Neural-matched peer clusters sync",
      icon: <Sparkles className="w-8 h-8" />,
      target: "recommendations",
      color: "bg-white",
      tag: "SYNC!"
    },
    {
      title: "See Analytics",
      desc: "Performance & Growth velocity maps",
      icon: <Binary className="w-8 h-8" />,
      target: "analytics",
      color: "bg-[#ffb703]",
      tag: "STATS!"
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
      title: "Sync Security",
      desc: "Aperture governance sync protocols",
      icon: <Shield className="w-8 h-8" />,
      target: "policy",
      color: "bg-[#e63946]",
      tag: "ALERT!"
    }
  ];

  if (isCreated) {
    return (
      <section className="relative min-h-screen w-full pt-32 pb-20 px-6 md:px-12 bg-[#fffdf2] flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full text-center relative z-10"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-primary border-4 md:border-8 border-black flex items-center justify-center text-white mx-auto shadow-[10px_10px_0px_#000] md:shadow-[20px_20px_0px_#000] mb-12 rotate-[-5deg]">
             <CheckCircle size={60} strokeWidth={3} />
          </div>
          <h1 className="text-5xl md:text-[10rem] font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">IDENTITY <span className="bg-black text-[#ffb703] not-italic px-4">SYNCED//</span></h1>
          <p className="text-xl md:text-3xl font-black italic lowercase max-w-2xl mx-auto border-y-4 md:border-y-8 border-black py-6 md:py-10 mb-16 md:mb-24 scale-x-110">
             "your biological signature has been recognized. synchronized clusters are now available for discovery."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {hubOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                onClick={() => onNavigate(option.target)}
                className={`group relative p-8 md:p-12 border-4 md:border-8 border-black shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000] hover:shadow-[20px_20px_0px_#000] md:hover:shadow-[30px_30px_0px_#000] cursor-pointer transition-all bg-white hover:-translate-y-4`}
              >
                 <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 font-black text-[10px] rotate-12">{option.tag}</div>
                 <div className="flex items-center gap-6 mb-8">
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${option.color} border-4 border-black flex items-center justify-center text-black group-hover:bg-primary group-hover:text-white transition-all`}>
                       {option.icon}
                    </div>
                    <div className="text-left">
                       <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">{option.title}</h3>
                       <p className="text-[10px] md:text-sm font-bold lowercase opacity-60 mt-1 italic">{option.desc}</p>
                    </div>
                 </div>
                 <div className="flex justify-end pr-4">
                    <ArrowRight size={32} className="group-hover:translate-x-4 transition-transform text-primary" />
                 </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => setIsCreated(false)}
            className="mt-20 text-sm font-black underline underline-offset-8 decoration-4 decoration-primary hover:text-primary transition-colors uppercase tracking-widest"
          >
             EDTI IDENTITY PARAMETERS //
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-20 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-start relative z-10">
        
        {/* Left: Identity Creation Form (Comic Style) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -top-6 md:-top-12 -left-6 md:-left-12 bg-[#e63946] border-2 md:border-4 border-black px-6 md:px-10 py-2 md:py-4 font-black text-2xl md:text-4xl italic text-white shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] rotate-[-5deg] z-20">
             IDENTITY//
          </div>

          <div className="relative bg-white border-2 md:border-8 border-black p-5 md:p-14 shadow-[8px_8px_0px_#000] md:shadow-[30px_30px_0px_#000]">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-16">
               <div className="w-12 h-12 md:w-20 md:h-20 bg-black border-2 md:border-4 border-black flex items-center justify-center text-white shrink-0">
                  <Fingerprint size={24} className="md:w-12 md:h-12" />
               </div>
               <h1 className="text-3xl md:text-7xl font-black italic tracking-tighter text-stroke leading-none uppercase text-center sm:text-left">CREATE CLUSTER IDENTITY!</h1>
            </div>

            <div className="space-y-6 md:space-y-10">
              <div className="space-y-3">
                <label className="text-[8px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1 block">// APERTURE HANDLE</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-2 md:border-4 border-black p-3 md:p-6 font-black text-lg md:text-2xl outline-none focus:bg-[#ffb703] transition-all placeholder:opacity-30" 
                  placeholder="e.g. neuron_alpha" 
                  title="Aperture Handle"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[8px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1 block">// NEURAL BIO</label>
                <textarea 
                  className="w-full bg-white border-2 md:border-4 border-black p-3 md:p-6 h-24 md:h-48 font-black text-lg md:text-2xl outline-none focus:bg-[#ffb703] transition-all resize-none placeholder:opacity-30" 
                  placeholder="Describe your biological focus..." 
                  title="Neural Bio"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3">
                  <label className="text-[8px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1 block">// TIER</label>
                  <select className="w-full bg-white border-2 md:border-4 border-black p-3 md:p-6 font-black text-lg md:text-2xl outline-none" title="Aperture Tier">
                    <option>LEVEL 1 (HOST)</option>
                    <option>LEVEL 2 (ARCHITECT)</option>
                    <option>LEVEL 3 (OBSERVER)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[8px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1 block">// HUB</label>
                  <input type="text" className="w-full bg-white border-2 md:border-4 border-black p-3 md:p-6 font-black text-lg md:text-2xl outline-none" placeholder="ALPHA" title="Cluster" />
                </div>
              </div>

              <button 
                onClick={() => setIsCreated(true)}
                className="btn-premium w-full py-5 md:py-8 text-xl md:text-4xl shadow-[6px_6px_0px_#000] md:shadow-[15px_15px_0px_#000] hover:shadow-[12px_12px_0px_#000] md:hover:shadow-[20px_20px_0px_#000] transition-all active:translate-y-1"
              >
                 INITIALIZE SYNC!
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Info/Gateways Preview */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-none mb-4 md:mb-6 uppercase">SYNC <span className="bg-[#219ebc] px-4 md:px-6 text-white not-italic">GATEWAYS//</span></h2>
            <p className="text-base md:text-2xl font-black italic max-w-md border-r-4 md:border-r-8 border-black pr-4 md:pr-8 mx-auto md:ml-auto md:mr-0 text-right lowercase opacity-60">
              "build your profile to unlock matched recommendations and high-performance analytics."
            </p>
          </motion.div>

          {/* Mini Preview of Locked Gateways */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-8 opacity-40 grayscale pointer-events-none">
            {hubOptions.slice(0, 4).map((option, i) => (
              <div key={i} className={`p-5 md:p-8 border-2 md:border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-end h-40 md:h-56 ${option.color}`}>
                 <div className="w-10 h-10 md:w-16 md:h-16 bg-white border-2 border-black flex items-center justify-center text-black mb-4">
                    {option.icon}
                 </div>
                 <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">{option.title}</h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
