import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Fingerprint, Zap, Lock, Eye, Database, Trash2 } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
         
         <motion.div 
           initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
           animate={{ scale: 1, rotate: 0, opacity: 1 }}
           className="w-full bg-white border-4 md:border-8 border-black p-6 md:p-16 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000] mb-8 md:mb-20 relative overflow-hidden"
         >
            {/* Comic Background Textures */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#e63946] -translate-y-1/2 translate-x-1/2 rotate-45 opacity-10" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#ffb703] translate-y-1/2 -translate-x-1/2 rotate-45 opacity-10" />

            <div className="text-center mb-12 md:mb-20">
              <h1 className="text-4xl md:text-7xl lg:text-9xl font-black italic tracking-tighter text-stroke mb-4 text-center leading-none uppercase">
                 PRIVACY <span className="bg-black text-[#ffb703] not-italic px-4">PROTOCOL//</span>
              </h1>
              <p className="text-xs md:text-sm font-black tracking-widest opacity-40 uppercase">Effective: April 2, 2026 | Vector Minds x Scanect</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-8 md:mt-16 text-sm md:text-xl font-bold leading-tight italic lowercase">
               
               <div className="relative p-6 border-2 border-black/10 hover:border-black transition-colors group">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                     <Fingerprint size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest italic leading-none">NEURAL SIGNALS</h3>
                  </div>
                  <p className="opacity-70 leading-snug">
                     "We collect name, email, and event preferences. With authorization, we sync public GitHub/LinkedIn signals (skills, repos, headline). <span className="text-black not-italic font-black">Private data remains untouched.</span>"
                  </p>
               </div>

               <div className="relative p-6 border-2 border-black/10 hover:border-black transition-colors group">
                  <div className="flex items-center gap-3 mb-4 text-secondary">
                     <Zap size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest italic leading-none">AI ARCHITECTURE</h3>
                  </div>
                  <p className="opacity-70 leading-snug">
                     "Scanect extracts professional signals to generate Profile Cards and compute Recommendation Scores. We suggest connections based on <span className="text-black not-italic font-black">professional alignment and shared goals.</span>"
                  </p>
               </div>

               <div className="relative p-6 border-2 border-black/10 hover:border-black transition-colors group">
                  <div className="flex items-center gap-3 mb-4 text-[#ffb703]">
                     <Eye size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest italic leading-none">VISIBILITY SCALE</h3>
                  </div>
                  <p className="opacity-70 leading-snug">
                     "Your full dataset is for you only. Profile Cards are visible <span className="text-black not-italic font-black">ONLY to mutual matches</span> or via mutual QR scans. Scores remain internal and confidential."
                  </p>
               </div>

               <div className="relative p-6 border-2 border-black/10 hover:border-black transition-colors group">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                     <Lock size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                     <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest italic leading-none">THE SHIELD</h3>
                  </div>
                  <p className="opacity-70 leading-snug">
                     "Encrypted via AES-256 (Rest) and TLS 1.3 (Transit). You maintain absolute control: <span className="text-black not-italic font-black">access, update, or permanently delete</span> your neural blueprint at any time."
                  </p>
               </div>

            </div>

            <div className="mt-16 pt-8 border-t-2 border-black/10 flex flex-wrap gap-4 justify-center mb-12">
               <div className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
                  <Database size={12} /> ENCRYPTED STORAGE
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
                  <ShieldAlert size={12} /> ZERO THIRD-PARTY AD DATA
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
                  <Trash2 size={12} /> INSTANT PERMANENT DELETION
               </div>
            </div>

            {/* Team Credits */}
            <div className="pt-12 border-t-4 border-black border-dashed flex flex-col items-center text-center">
               <div className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-6 rotate-1">
                  OFFICIAL DEVELOPMENT UNIT
               </div>
               
               <div className="mb-8">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40 mb-2">Made by</p>
                  <h4 className="text-xl md:text-3xl font-black italic uppercase leading-none mb-2">Team Vector Minds..</h4>
                  <p className="text-xs md:text-sm font-bold opacity-70 uppercase tracking-[0.2em]">Aryan, Shruti, Harshit</p>
               </div>

               <div className="relative">
                  <div className="absolute -left-4 -top-3 w-8 h-[2px] bg-black/20" />
                  <div className="absolute -right-4 -top-3 w-8 h-[2px] bg-black/20" />
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40 mb-3">Under the guidance of</p>
               </div>
               <p className="text-xs md:text-lg font-black italic uppercase text-primary">
                  Dr. Vasuda, Dr. Akanksha and Shraddha ma'am
               </p>
            </div>
         </motion.div>

         <button 
           onClick={handleAgree}
           className="group relative btn-premium px-10 md:px-24 py-4 md:py-8 text-xl md:text-4xl italic shadow-[8px_8px_0px_#000] md:shadow-[20px_20px_0px_#000] hover:shadow-[15px_15px_0px_#000] md:hover:shadow-[35px_35px_0px_#000] transition-all active:translate-y-1 flex items-center justify-center gap-4"
         >
            I AGREE TO SYNC!
            <Zap size={24} className="md:w-10 md:h-10 group-hover:rotate-12 transition-transform" />
         </button>
         
         <div className="mt-8 text-[10px] md:text-xs font-black opacity-30 uppercase tracking-[0.3em] text-center">
            By proceeding, you authorize Vector Minds to process your signals as defined in the Protocol O7.
         </div>
      </div>
    </section>
  );
};
