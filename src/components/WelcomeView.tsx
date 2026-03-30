import React from 'react';
import { motion } from 'framer-motion';
import { Zap, PlusSquare, ArrowRight, Star } from 'lucide-react';
import { useRole } from '../context/RoleContext';

interface WelcomeViewProps {
  onSelectOption: (option: 'take-part' | 'register-event') => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onSelectOption }) => {
  const { roles } = useRole();
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#fffdf2] px-6 md:px-12 overflow-hidden">
      {/* Background Cinematic Textures */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
         
         <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="text-left"
         >
            <h1 className="text-6xl md:text-[10rem] font-black italic tracking-tighter text-stroke leading-none uppercase mb-8 md:mb-12">
               GET STARTED <span className="bg-black text-[#ffb703] not-italic px-4">NOW//</span>

            </h1>
            <p className="text-xl md:text-3xl font-black italic max-w-lg mb-12 md:mb-16 lowercase border-l-8 border-black pl-8">
               "discover events to join or host your own networking hub."

            </p>
         </motion.div>

         <div className="grid grid-cols-1 gap-8 md:gap-12">
            {/* Option 1: Take Part */}
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => onSelectOption('take-part')}
              className="group relative bg-white border-4 md:border-8 border-black p-8 md:p-14 shadow-[15px_15px_0px_#000] md:shadow-[25px_25px_0px_#000] hover:shadow-[35px_35px_0px_#000] transition-all text-left flex items-center gap-8 md:gap-12"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 bg-primary border-4 border-black flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                  <Zap size={60} strokeWidth={3} />
               </div>
               <div>
                  <h3 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-2 md:mb-4">ATTEND EVENT</h3>

                  <p className="text-lg md:text-2xl font-bold lowercase opacity-60 italic">"join existing networking events."</p>

               </div>
               <ArrowRight size={40} className="absolute bottom-8 right-8 text-black opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
            </motion.button>

            {/* Option 2: Register Event */}
            {(roles.isAdmin || roles.isOrganizer) && (
              <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => onSelectOption('register-event')}
                className="group relative bg-[#ffb703] border-4 md:border-8 border-black p-8 md:p-14 shadow-[15px_15px_0px_#000] md:shadow-[25px_25px_0px_#000] hover:shadow-[35px_35px_0px_#000] transition-all text-left flex items-center gap-8 md:gap-12"
              >
                 <div className="w-20 h-20 md:w-32 md:h-32 bg-black border-4 border-black flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <PlusSquare size={60} strokeWidth={3} />
                 </div>
                 <div>
                    <h3 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-2 md:mb-4">HOST EVENT</h3>

                    <p className="text-lg md:text-2xl font-bold lowercase opacity-60 italic text-black">"organize and grow your own networking event."</p>

                 </div>
                 <ArrowRight size={40} className="absolute bottom-8 right-8 text-black opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
              </motion.button>
            )}
         </div>
      </div>

       {/* Floating Comic Stickers */}
       <div className="absolute top-1/2 left-0 h-1 bg-black w-32 opacity-10" />
       <div className="absolute top-1/2 right-0 h-1 bg-black w-32 opacity-10" />
    </section>
  );
};
