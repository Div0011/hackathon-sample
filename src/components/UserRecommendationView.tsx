import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Zap, User, Fingerprint, Star } from 'lucide-react';

interface UserRecommendationViewProps {
  onNavigate?: (view: any) => void;
}

const UserCard = ({ name, role, id, isSelected, onSelect }: { 
  name: string, 
  role: string, 
  id: string, 
  isSelected: boolean,
  onSelect: () => void 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      {/* Grid Card (Small Comic Panel) */}
      {!isSelected && (
        <motion.div 
          layoutId={`card-${id}`}
          onClick={onSelect}
          className="relative w-full h-[350px] md:h-[450px] cursor-pointer group"
          whileHover={{ y: -8 }}
        >
          <div className="w-full h-full bg-white border-2 md:border-4 border-black p-6 md:p-8 flex flex-col justify-end relative overflow-hidden transition-all shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] hover:shadow-[15px_15px_0px_#000] md:hover:shadow-[20px_20px_0px_#000]">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Fingerprint className="w-32 h-32 text-black" />
             </div>
             
             {/* Halftone Pattern */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#ffb703] border-2 md:border-4 border-black flex items-center justify-center mb-6 md:mb-8 shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000]">
                   <User className="w-6 h-6 md:w-10 md:h-10 text-black" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-2 md:mb-4 leading-none uppercase">{name}</h3>
                <p className="inline-block px-3 py-1 bg-black text-white text-[8px] md:text-[10px] font-black tracking-widest">{role}</p>
              </div>
          </div>
        </motion.div>
      )}

      {/* Expanded Focused Card (Cinematic Flip) */}
      <AnimatePresence>
        {isSelected && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onSelect}
              className="absolute inset-0 bg-[#fffdf2]/98 backdrop-blur-2xl"
            />
            
            <motion.div
              layoutId={`card-${id}`}
              className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[4/3] perspective-2000 z-20"
            >
              {/* Top Right Action Button (QR/Close) */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 flex gap-4">
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
                   className="w-14 h-14 md:w-20 md:h-20 border-4 border-black flex items-center justify-center bg-white text-black hover:bg-primary hover:text-white transition-all shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] active:translate-y-1"
                   title={isFlipped ? "Cancel" : "Show QR"}
                 >
                   {isFlipped ? <X size={32} className="md:w-10 md:h-10" strokeWidth={4} /> : <span className="text-3xl md:text-5xl">QR</span>}
                 </button>
                 
                 {!isFlipped && (
                   <button 
                     onClick={(e) => { e.stopPropagation(); onSelect(); }}
                     className="w-14 h-14 md:w-20 md:h-20 border-4 border-black flex items-center justify-center bg-black text-white hover:bg-primary transition-all shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] active:translate-y-1"
                     title="Close"
                   >
                     <X size={32} className="md:w-10 md:h-10" strokeWidth={4} />
                   </button>
                 )}
              </div>

              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-white p-8 md:p-20 flex flex-col justify-between border-4 md:border-8 border-black shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000]">
                   <div className="flex justify-between items-start">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-primary border-2 md:border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000]">
                         <Zap className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                   </div>

                   <div>
                      <span className="text-[10px] md:text-sm font-black text-primary tracking-[0.2em] md:tracking-[0.4em] mb-4 md:mb-6 block">// NEURAL CLUSTER IDENTITY</span>
                      <h3 className="text-4xl md:text-8xl font-black mb-4 md:mb-6 tracking-tighter italic text-stroke leading-none uppercase">{name}</h3>
                      <p className="text-lg md:text-2xl font-black opacity-60 mb-6 md:mb-12 lowercase border-l-4 md:border-l-8 border-black pl-4 md:pl-8 italic">{role}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                         <div className="px-6 md:px-10 py-2 md:py-3 bg-[#ffb703] border-2 md:border-4 border-black text-[8px] md:text-xs font-black tracking-widest italic text-black shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] text-center uppercase">HOST TIER 1</div>
                         <div className="px-6 md:px-10 py-2 md:py-3 border-2 md:border-4 border-black text-[8px] md:text-xs font-black tracking-widest bg-black text-white italic shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] text-center uppercase">VERIFIED!</div>
                      </div>
                   </div>
                </div>

                {/* Back Face (QR Code Content) */}
                <div 
                   className="absolute inset-0 backface-hidden bg-white p-8 md:p-20 flex flex-col items-center justify-center border-4 md:border-8 border-black shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000]"
                   style={{ transform: 'rotateY(180deg)' }}
                >
                   <div className="relative mb-8 md:mb-12 scale-75 md:scale-90">
                      <div className="absolute -top-10 md:-top-12 -left-10 md:-left-12 bg-[#ffb703] border-2 md:border-4 border-black px-6 md:px-10 py-2 md:py-4 font-black text-xl md:text-2xl rotate-[-15deg] shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] z-20 uppercase">SCAN ME!</div>
                      <div className="absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 bg-black border-2 md:border-4 border-black px-6 md:px-8 py-1 md:py-2 font-black text-[8px] md:text-xs rotate-[10deg] shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] z-20 text-white italic uppercase">SYNC CORE </div>
                      
                      <div className="bg-white p-6 md:p-8 border-4 md:border-8 border-black shadow-[15px_15px_0px_#000] md:shadow-[20px_20px_0px_#000]">
                         <QRCodeSVG value={`https://scanect.io/user/${id}`} size={180} className="md:w-[220px] md:h-[220px]" fgColor="#000" />
                      </div>
                   </div>
                   <h4 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter italic uppercase underline decoration-4 md:decoration-8 decoration-[#e63946] underline-offset-4 md:underline-offset-8 text-center">BIOLOGICAL HANDSHAKE</h4>
                   <p className="text-base md:text-2xl font-black text-center max-w-xs md:max-w-md italic lowercase opacity-60">"synchronize your biological signature with this identity cluster."</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export const UserRecommendationView: React.FC<UserRecommendationViewProps> = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const users = [
    { name: "ALPHA NEURON", role: "AI ARCHITECT", id: "u1" },
    { name: "SYMMETRY LAB", role: "UX VISIONS", id: "u2" },
    { name: "FLUX CORE", role: "MOTION DESIGN", id: "u3" },
    { name: "DELTA SIGNAL", role: "DATA SCIENCE", id: "u4" },
  ];

  return (
    <section className="relative min-h-screen w-full pt-24 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
           className="mb-16 md:mb-24"
           animate={{ opacity: selectedId ? 0 : 1 }}
        >
           <h1 className="text-6xl md:text-[11rem] font-black italic tracking-tighter text-stroke leading-none lowercase">neural <span className="bg-[#ffb703] px-4 md:px-6 text-black not-italic">discovery//</span></h1>
           <p className="text-lg md:text-2xl font-black mt-8 md:mt-12 lowercase italic border-l-4 md:border-l-8 border-black pl-6 md:pl-8 max-w-2xl">
              "synchronize with peer clusters across the high-performance cinematic ecosystem."
           </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-20">
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              {...user} 
              isSelected={selectedId === user.id}
              onSelect={() => setSelectedId(selectedId === user.id ? null : user.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
