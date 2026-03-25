import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

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
      {/* Grid Card (Small) */}
      {!isSelected && (
        <motion.div 
          layoutId={`card-${id}`}
          onClick={onSelect}
          className="relative w-full h-[400px] cursor-pointer perspective-1000 z-10"
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="w-full h-full glass rounded-3xl p-8 flex flex-col justify-end border border-white/10 snow-cap relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" />
             <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                  <div className="w-6 h-6 rounded-full bg-primary" />
               </div>
               <h3 className="text-xl font-bold">{name}</h3>
               <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-black">{role}</p>
             </div>
          </div>
        </motion.div>
      )}

      {/* Expanded Focused Card */}
      <AnimatePresence>
        {isSelected && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onSelect}
              className="absolute inset-0 bg-background/90 backdrop-blur-3xl"
            />
            
            <motion.div
              layoutId={`card-${id}`}
              className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[4/3] cursor-pointer perspective-2000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-1000"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden glass rounded-[48px] p-16 flex flex-col justify-between border border-primary/30 shadow-[0_0_100px_rgba(0,227,253,0.1)]">
                   <div className="flex justify-between items-start">
                     <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <div className="w-12 h-12 rounded-full bg-primary animate-pulse shadow-[0_0_30px_#00e3fd]" />
                     </div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); onSelect(); }}
                       className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                       aria-label="Close focused view"
                     >
                       <X className="w-6 h-6" />
                     </button>
                   </div>

                   <div>
                     <span className="text-xs font-black text-primary tracking-[0.3em] uppercase mb-4 block">Atmospheric Identity</span>
                     <h3 className="text-7xl font-bold mb-4 tracking-tighter">{name}</h3>
                     <p className="text-xl text-muted font-medium mb-8">{role}</p>
                     
                     <div className="flex gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 text-xs font-black uppercase tracking-widest text-primary">Neural Level 4</div>
                        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">Verified Host</div>
                     </div>
                   </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 backface-hidden bg-background rounded-[48px] p-16 flex flex-col items-center justify-center border-2 border-primary/40 shadow-[0_0_150px_rgba(0,227,253,0.2)]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                   <div className="relative group">
                     <div className="absolute -inset-8 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                     <div className="relative bg-white p-8 rounded-[40px] mb-8">
                        <QRCodeSVG value={`https://scanect.io/user/${id}`} size={240} fgColor="#0e0e0e" />
                     </div>
                   </div>
                   <h4 className="text-3xl font-bold mb-2">Neural QR Scan</h4>
                   <p className="text-muted text-center max-w-sm mb-8">Scanning this code synchronizes your biological presence with {name}'s neural network.</p>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-primary/10 px-6 py-2 rounded-full">Secure Aperture Handshake</span>
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
    { name: "Alpha Neuron", role: "AI ARCHITECT", id: "u1" },
    { name: "Symmetry Lab", role: "UX VISIONS", id: "u2" },
    { name: "Flux Core", role: "MOTION DESIGN", id: "u3" },
    { name: "Delta Signal", role: "DATA SCIENTIST", id: "u4" },
  ];

  return (
    <section className="relative min-h-screen w-full pt-40 p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          className="text-6xl font-bold mb-12"
          animate={{ opacity: selectedId ? 0 : 1 }}
        >
          Neural Connections
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
