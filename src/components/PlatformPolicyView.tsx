import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Fingerprint, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PlatformPolicyViewProps {
  onNavigate?: (view: any) => void;
}

export const PlatformPolicyView: React.FC<PlatformPolicyViewProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const hasProfile = !!currentUser?.profile;

  const handleAgree = () => {
    if (!onNavigate) return;
    
    if (hasProfile) {
      onNavigate('profile-display');
    } else {
      onNavigate('profile-creation');
    }
  };

  return (
    <section className="relative min-h-screen w-full pt-28 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
         
         <motion.div 
           initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
           animate={{ scale: 1, rotate: 0, opacity: 1 }}
           className="w-full bg-white border-4 md:border-8 border-black p-6 md:p-24 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000] mb-8 md:mb-20 relative overflow-hidden"
         >
            {/* Comic Background Textures */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#e63946] -translate-y-1/2 translate-x-1/2 rotate-45 opacity-10" />
            <div className="absolute bottom-0 left-0 h-80 w-80 bg-[#ffb703] translate-y-1/2 -translate-x-1/2 rotate-45 opacity-10" />

            <h1 className="text-4xl md:text-8xl lg:text-[10rem] font-black italic tracking-tighter text-stroke mb-6 md:mb-12 text-center leading-none uppercase">
               POLICY <span className="bg-black text-[#ffb703] not-italic px-4 md:px-4">CORE//</span>
            </h1>

            <div className="space-y-8 md:space-y-16 mt-8 md:mt-16 text-sm md:text-2xl font-bold leading-tight italic lowercase max-w-2xl mx-auto border-l-4 md:border-l-8 border-black pl-5 md:pl-12">
               <div className="relative">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6 text-primary">
                     <ShieldAlert size={20} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-3xl font-black uppercase tracking-widest italic leading-none">NEURAL PROTECTION</h3>
                  </div>
                  <p className="opacity-70 leading-tight">
                     "EVERY BIOLOGICAL SIGNATURE IS ENCRYPTED VIA APERTURE O7 PROTOCOLS. YOUR IDENTITY IS YOUR ARCHITECTURE."
                  </p>
               </div>

               <div className="relative">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6 text-secondary">
                     <Fingerprint size={20} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-3xl font-black uppercase tracking-widest italic leading-none">BIOMETRIC SYNC</h3>
                  </div>
                  <p className="opacity-70 leading-tight">
                     "SYNCHRONIZATION REQUIRES A CLEAR NEURAL FIELD. ALL DATA IS VOLUNTEER-DRIVEN AND NON-PERSISTENT."
                  </p>
               </div>

               <div className="relative">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6 text-[#ffb703]">
                     <BookOpen size={20} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-3xl font-black uppercase tracking-widest italic leading-none">THE APERTURE CODE</h3>
                  </div>
                  <p className="opacity-70 leading-tight">
                     "NETWORK WITH PURPOSE. ALL SYNCED EVENTS ARE SUBJECT TO HIGH-LEVEL GOVERNANCE."
                  </p>
               </div>
            </div>
         </motion.div>

         <button 
           onClick={handleAgree}
           className="group relative btn-premium px-10 md:px-24 py-4 md:py-8 text-xl md:text-4xl italic shadow-[8px_8px_0px_#000] md:shadow-[20px_20px_0px_#000] hover:shadow-[15px_15px_0px_#000] md:hover:shadow-[35px_35px_0px_#000] transition-all active:translate-y-1 flex items-center justify-center gap-4"
         >
            I AGREE TO SYNC!
            <Zap size={24} className="md:w-10 md:h-10 group-hover:rotate-12 transition-transform" />
         </button>
      </div>
    </section>
  );
};
