import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Type, FileText, Zap, ArrowRight, Star } from 'lucide-react';

interface EventRegistrationViewProps {
  onComplete: () => void;
}

export const EventRegistrationView: React.FC<EventRegistrationViewProps> = ({ onComplete }) => {
  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
         
         <motion.div 
           initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
           animate={{ scale: 1, opacity: 1, rotate: 0 }}
           className="w-full bg-white border-4 md:border-8 border-black p-8 md:p-14 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000] mb-12 relative overflow-hidden"
         >
            {/* Comic Sticker */}
            <div className="absolute top-4 right-4 bg-[#ffb703] border-4 border-black px-4 py-2 font-black text-xl rotate-[15deg] shadow-[6px_6px_0px_#000] z-20 uppercase">ARCHITECT V3.0</div>

            <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-stroke mb-10 md:mb-16 text-center leading-none uppercase">
               REGISTER <span className="bg-black text-white not-italic px-4">EVENT//</span>
            </h1>

            <div className="space-y-8 md:space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// EVENT NAME</label>
                     <div className="relative group">
                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                        <input title="Event Name" className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-xl outline-none focus:bg-[#feff9c] transition-all" placeholder="e.g. AURA DREAM" />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// CLUSTER LOCATION</label>
                     <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                        <input title="Location" className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-xl outline-none focus:bg-[#feff9c] transition-all" placeholder="NEO-KYOTO" />
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// SYNC DATE / TIME</label>
                  <div className="relative group">
                     <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                     <input title="Date" type="datetime-local" className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-xl outline-none focus:bg-[#feff9c] transition-all" />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// MISSION STATEMENT</label>
                  <div className="relative group">
                     <FileText className="absolute left-4 top-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                     <textarea title="Mission Statement" className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-xl h-32 md:h-48 outline-none focus:bg-[#feff9c] transition-all resize-none" placeholder="Describe the biological impact of this synchronization..." />
                  </div>
               </div>

               <button 
                 onClick={onComplete}
                 className="btn-premium w-full py-6 md:py-8 text-2xl md:text-4xl italic flex items-center justify-center gap-6 group"
               >
                  INITIALIZE EVENT SYNC!
                  <ArrowRight className="group-hover:translate-x-4 transition-transform text-white" strokeWidth={4} />
               </button>
            </div>
         </motion.div>

         <div className="flex items-center gap-6 opacity-30 font-black italic lowercase text-lg md:text-xl">
            <Zap /> all synced events are subject to aperture v3.0 core protocols.
         </div>
      </div>
    </section>
  );
};
