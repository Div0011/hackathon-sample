import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Zap, Shield, User, Fingerprint } from 'lucide-react';

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
          className="relative w-full h-[400px] cursor-pointer perspective-1000 z-10"
          whileHover={{ y: -10 }}
        >
          <div className="w-full h-full glass bg-white p-8 flex flex-col justify-end relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Fingerprint className="w-24 h-24 text-black" />
             </div>
             <div className="relative z-10">
               <div className="w-14 h-14 bg-primary border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000]">
                  <User className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-2xl font-black mb-2">{name}</h3>
               <p className="text-primary font-black text-xs tracking-widest italic">{role}</p>
             </div>
          </div>
        </motion.div>
      )}

      {/* Expanded Focused Card (Cinematic Flip) */}
      <AnimatePresence>
        {isSelected && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onSelect}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            {/* Shutter Animation Overlay */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              className="absolute inset-x-0 top-0 h-20 bg-black z-10 origin-top"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              className="absolute inset-x-0 bottom-0 h-20 bg-black z-10 origin-bottom"
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
                <div className="absolute inset-0 backface-hidden glass bg-white p-12 md:p-20 flex flex-col justify-between border-4 border-black shadow-[20px_20px_0px_#000]">
                   <div className="flex justify-between items-start">
                     <div className="w-24 h-24 bg-primary border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_#000]">
                        <Zap className="w-12 h-12 text-white" />
                     </div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); onSelect(); }}
                       className="w-16 h-16 border-4 border-black flex items-center justify-center hover:bg-primary transition-colors"
                       title="Close"
                     >
                       <X className="w-8 h-8" />
                     </button>
                   </div>

                   <div>
                     <span className="text-sm font-black text-primary tracking-[0.4em] mb-6 block">// NEURAL IDENTITY</span>
                     <h3 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">{name}</h3>
                     <p className="text-2xl font-black opacity-60 mb-10 lowercase border-l-8 border-black pl-6">{role}</p>
                     
                     <div className="flex gap-6">
                        <div className="px-8 py-3 bg-black text-white text-xs font-black tracking-widest italic">TIER 1 HOST</div>
                        <div className="px-8 py-3 border-4 border-black text-xs font-black tracking-widest">VERIFIED</div>
                     </div>
                   </div>
                </div>

                {/* Back Face (QR Code) */}
                <div 
                  className="absolute inset-0 backface-hidden bg-white p-12 md:p-20 flex flex-col items-center justify-center border-4 border-black shadow-[20px_20px_0px_#000]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                   <div className="relative mb-10">
                      {/* Decorative Comic Stickers */}
                      <div className="absolute -top-10 -left-10 bg-[#feff9c] border-2 border-black px-4 py-1 font-black text-[10px] rotate-[-15deg] shadow-[4px_4px_0px_#000]">SCAN NOW!</div>
                      <div className="absolute -bottom-6 -right-6 bg-secondary border-2 border-black px-4 py-1 font-black text-[10px] rotate-[10deg] shadow-[4px_4px_0px_#000]">SYNC CORE</div>
                      
                      <div className="bg-black p-4 border-4 border-black shadow-[10px_10px_0px_#000]">
                         <div className="bg-white p-6">
                            <QRCodeSVG value={`https://scanect.io/user/${id}`} size={220} fgColor="#000" />
                         </div>
                      </div>
                   </div>
                   <h4 className="text-4xl font-black mb-4 tracking-tighter">NEURAL HANDSHAKE</h4>
                   <p className="text-black font-bold text-center max-w-md mb-10 italic">"SCAN TO SYNCHRONIZE YOUR BIOLOGICAL SIGNATURE WITH THIS IDENTITY CLUSTER."</p>
                   <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-xs font-black tracking-[0.4em]">ENCRYPTED APERTURE SYNC</span>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export const UserRecommendationView = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const users = [
    { name: "ALPHA NEURON", role: "AI ARCHITECT", id: "u1" },
    { name: "SYMMETRY LAB", role: "UX VISIONS", id: "u2" },
    { name: "FLUX CORE", role: "MOTION DESIGN", id: "u3" },
    { name: "DELTA SIGNAL", role: "DATA SCIENCE", id: "u4" },
  ];

  return (
    <section className="relative min-h-screen w-full pt-48 pb-32 px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
           className="mb-20"
           animate={{ opacity: selectedId ? 0 : 1 }}
        >
           <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic">NEURAL <span className="text-gradient">CONNECTIONS //</span></h1>
           <div className="w-40 h-4 bg-black mt-4" />
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
