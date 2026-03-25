import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Fingerprint } from 'lucide-react';

interface PlatformPolicyViewProps {
  onNavigate?: (view: any) => void;
}

export const PlatformPolicyView: React.FC<PlatformPolicyViewProps> = () => {
  return (
    <section className="relative min-h-screen w-full pt-48 pb-32 px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
         
         <motion.div 
           initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
           animate={{ scale: 1, rotate: 0, opacity: 1 }}
           className="w-full bg-white border-8 border-black p-12 md:p-24 shadow-[30px_30px_0px_#000] mb-20 relative overflow-hidden"
         >
            {/* Comic Background Textures */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#e63946] -translate-y-1/2 translate-x-1/2 rotate-45 opacity-10" />
            <div className="absolute bottom-0 left-0 h-80 w-80 bg-[#ffb703] translate-y-1/2 -translate-x-1/2 rotate-45 opacity-10" />

            <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter text-stroke mb-12 text-center leading-none">
               POLICY <span className="bg-black text-[#ffb703] not-italic px-4">CORE//</span>
            </h1>

            <div className="space-y-16 mt-16 text-xl md:text-2xl font-bold leading-[1.1] italic lowercase max-w-2xl mx-auto border-l-8 border-black pl-12">
               <div className="relative">
                  <div className="flex items-center gap-4 mb-6 text-primary">
                     <ShieldAlert size={32} />
                     <h3 className="text-3xl font-black uppercase tracking-widest italic">NEURAL IDENTITY PROTECTION</h3>
                  </div>
                  <p className="opacity-70">
                     "EVERY BIOLOGICAL SIGNATURE IS ENCRYPTED VIA APERTURE O7 PROTOCOLS. YOUR IDENTITY IS YOUR ARCHITECTURE."
                  </p>
               </div>

               <div className="relative">
                  <div className="flex items-center gap-4 mb-6 text-secondary">
                     <Fingerprint size={32} />
                     <h3 className="text-3xl font-black uppercase tracking-widest italic">BIOMETRIC SYNC GUIDELINES</h3>
                  </div>
                  <p className="opacity-70">
                     "SYNCHRONIZATION REQUIRES A CLEAR NEURAL FIELD. ALL DATA IS VOLUNTEER-DRIVEN AND NON-PERSISTENT."
                  </p>
               </div>

               <div className="relative">
                  <div className="flex items-center gap-4 mb-6 text-tertiary">
                     <BookOpen size={32} />
                     <h3 className="text-3xl font-black uppercase tracking-widest italic">THE APERTURE CODE</h3>
                  </div>
                  <p className="opacity-70">
                     "NETWORK WITH PURPOSE. ALL SYNCED EVENTS ARE SUBJECT TO HIGH-LEVEL GOVERNANCE."
                  </p>
               </div>
            </div>
         </motion.div>

         <button className="btn-premium px-24 py-8 text-4xl italic shadow-[20px_20px_0px_#000] hover:shadow-[35px_35px_0px_#000] transition-all">
            I AGREE TO SYNC!
         </button>
      </div>
    </section>
  );
};
