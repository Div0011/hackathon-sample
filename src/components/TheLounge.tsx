import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, MessageCircle, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TheLoungeProps {
  onNavigate?: (view: any) => void;
}

export const TheLounge: React.FC<TheLoungeProps> = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-48 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full relative z-10 text-center"
        >
          <div className="bg-white border-4 md:border-8 border-black p-12 md:p-24 shadow-[20px_20px_0px_#000] md:shadow-[40px_40px_0px_#000] rotate-[-1deg]">
            <div className="w-24 h-24 bg-[#e63946] border-4 border-black flex items-center justify-center text-white mx-auto mb-10 shadow-[8px_8px_0px_#000] rotate-[5deg]">
              <MessageCircle size={48} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">
              MEMBERS<br />ONLY//
            </h1>
            
            <p className="font-black italic lowercase opacity-70 text-xl md:text-2xl mb-12 border-y-4 border-black py-8 max-w-2xl mx-auto">
              "to join the ecosystem chat and access the high-performance social lounge, you must be a verified scanect member."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => window.location.href = '/'} 
                className="btn-premium px-12 py-6 text-2xl italic flex items-center justify-center gap-4 shadow-[8px_8px_0px_#000]"
              >
                JOIN SCANECT <Zap size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  const messages = [
     { user: "ALPHA_LOG", msg: "JOIN THE NEXT NETWORKING EVENT AT 12:00." },
     { user: "SYMMETRY_CORE", msg: "EVENT PREPARATION COMPLETED." },
     { user: "FLUX_V3", msg: "JOIN NOW!" }
  ];


  return (
    <section className="relative min-h-screen w-full pt-20 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
         
         <div className="flex-1">
             <h1 className="text-4xl md:text-[11rem] font-black italic tracking-tighter text-stroke mb-8 md:mb-20 leading-none">THE <span className="bg-[#e63946] px-4 md:px-6 text-white not-italic shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000]">LOUNGE//</span></h1>
             <p className="text-base md:text-2xl font-black italic max-w-lg mb-8 md:mb-20 lowercase border-l-4 md:border-l-8 border-black pl-5 md:pl-8 leading-none">
                the high-performance social networking space.
             </p>


            <div className="space-y-6 md:space-y-10">
               {messages.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border-2 md:border-4 border-black p-5 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] relative group overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageCircle size={40} className="md:w-[100px] md:h-[100px]" />
                     </div>
                     <p className="text-primary font-black text-[8px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-4 uppercase">USER: {m.user} //</p>

                     <p className="text-xl md:text-4xl font-black italic tracking-tighter lowercase leading-tight">{m.msg}</p>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="w-full lg:w-[450px] space-y-10 md:space-y-12">
            <div className="bg-white border-4 md:border-8 border-black p-8 md:p-12 shadow-[15px_15px_0px_#000] md:shadow-[25px_25px_0px_#000] rotate-[1deg] md:rotate-[2deg]">
               <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <Coffee size={24} className="text-primary md:w-10 md:h-10" />
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter">COFFEE BREAK</h3>

               </div>
               <p className="font-bold text-base md:text-lg mb-8 md:mb-10 italic lowercase">"AUTOMATIC CAFFEINATION PROTOCOL ACTIVE."</p>
               <button className="btn-premium w-full py-4 md:py-6 text-xl md:text-2xl italic shadow-[8px_8px_0px_#000] md:shadow-[15px_15px_0px_#000]">GRAB COFFEE!</button>

            </div>

            <div className="bg-[#ffb703] border-2 md:border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#000] md:shadow-[15px_15px_0px_#000] -rotate-[1deg] md:-rotate-[3deg]">
               <h3 className="text-2xl md:text-3xl font-black italic mb-4 md:mb-6 uppercase">COMMUNITY STATUS //</h3>

               <div className="flex justify-between items-center bg-black/5 p-3 md:p-4 border-2 border-black">
                  <span className="font-black text-xs md:text-base">POPULATION</span>
                  <span className="text-white bg-black px-3 md:px-4 py-1 font-black text-xs md:text-base">1.4K</span>
               </div>
               <div className="flex justify-between items-center bg-black/5 p-3 md:p-4 border-x-2 border-b-2 border-black">
                  <span className="font-black text-xs md:text-base">MODE</span>
                  <span className="text-white bg-black px-3 md:px-4 py-1 font-black text-xs md:text-base">CHILL</span>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
