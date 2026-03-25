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
          className="relative w-full h-[450px] cursor-pointer group"
          whileHover={{ y: -8 }}
        >
          <div className="w-full h-full bg-white border-4 border-black p-8 flex flex-col justify-end relative overflow-hidden transition-all shadow-[8px_8px_0px_#000] hover:shadow-[20px_20px_0px_#000]">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Fingerprint className="w-32 h-32 text-black" />
             </div>
             
             {/* Halftone Pattern */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />

             <div className="relative z-10">
               <div className="w-16 h-16 bg-[#ffb703] border-4 border-black flex items-center justify-center mb-8 shadow-[6px_6px_0px_#000]">
                  <User className="w-10 h-10 text-black" />
               </div>
               <h3 className="text-4xl font-black italic tracking-tighter mb-4 leading-none uppercase">{name}</h3>
               <p className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black tracking-widest">{role}</p>
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
              className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[4/3] cursor-pointer perspective-2000 z-20"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-white p-12 md:p-20 flex flex-col justify-between border-8 border-black shadow-[30px_30px_0px_#000]">
                   <div className="flex justify-between items-start">
                      <div className="w-24 h-24 bg-primary border-4 border-black flex items-center justify-center shadow-[10px_10px_0px_#000]">
                         <Zap className="w-12 h-12 text-white" />
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onSelect(); }}
                        className="w-16 h-16 border-4 border-black flex items-center justify-center bg-black text-white hover:bg-primary transition-colors"
                        title="Close"
                      >
                        <X size={32} />
                      </button>
                   </div>

                   <div>
                      <span className="text-sm font-black text-primary tracking-[0.4em] mb-6 block">// NEURAL CLUSTER IDENTITY</span>
                      <h3 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter italic text-stroke leading-none uppercase">{name}</h3>
                      <p className="text-3xl font-black opacity-60 mb-12 lowercase border-l-8 border-black pl-8 italic">{role}</p>
                      
                      <div className="flex gap-6">
                         <div className="px-10 py-3 bg-[#ffb703] border-4 border-black text-xs font-black tracking-widest italic text-black shadow-[6px_6px_0px_#000]">HOST TIER 1</div>
                         <div className="px-10 py-3 border-4 border-black text-xs font-black tracking-widest bg-black text-white italic shadow-[6px_6px_0px_#000]">VERIFIED!</div>
                      </div>
                   </div>
                </div>

                {/* Back Face (QR Code Content) */}
                <div 
                  className="absolute inset-0 backface-hidden bg-white p-12 md:p-20 flex flex-col items-center justify-center border-8 border-black shadow-[30px_30px_0px_#000]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                   <div className="relative mb-12">
                      <div className="absolute -top-12 -left-12 bg-[#ffb703] border-4 border-black px-10 py-4 font-black text-2xl rotate-[-15deg] shadow-[8px_8px_0px_#000] z-20">SCAN ME!</div>
                      <div className="absolute -bottom-8 -right-8 bg-black border-4 border-black px-8 py-2 font-black text-xs rotate-[10deg] shadow-[8px_8px_0px_#000] z-20 text-white italic">SYNC CORE </div>
                      
                      <div className="bg-white p-10 border-8 border-black shadow-[20px_20px_0px_#000]">
                         <QRCodeSVG value={`https://scanect.io/user/${id}`} size={250} fgColor="#000" />
                      </div>
                   </div>
                   <h4 className="text-5xl font-black mb-6 tracking-tighter italic uppercase underline decoration-8 decoration-[#e63946] underline-offset-8">BIOLOGICAL HANDSHAKE</h4>
                   <p className="text-2xl font-black text-center max-w-md italic lowercase opacity-60">"synchronize your biological signature with this identity cluster."</p>
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
    <section className="relative min-h-screen w-full pt-48 pb-32 px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
           className="mb-24"
           animate={{ opacity: selectedId ? 0 : 1 }}
        >
           <h1 className="text-8xl md:text-[11rem] font-black italic tracking-tighter text-stroke leading-none lowercase">neural <span className="bg-[#ffb703] px-6 text-black not-italic">discovery//</span></h1>
           <p className="text-2xl font-black mt-12 lowercase italic border-l-8 border-black pl-8 max-w-2xl">
              "synchronize with peer clusters across the high-performance cinematic ecosystem."
           </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
