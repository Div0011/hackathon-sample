import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Zap, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRole } from '../context/RoleContext';

interface RoleSelectionViewProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({ onBack, onNavigate }) => {
  const { setRoles } = useRole();
  const [selectedRole, setSelectedRole] = useState<'user' | 'organizer' | 'vip' | null>(null);

  const handleRoleSelection = (role: 'user' | 'organizer' | 'vip') => {
    setSelectedRole(role);
    setRoles(prev => ({
      ...prev,
      isOrganizer: role === 'organizer',
      isVIP: role === 'vip'
    }));
  };

  const handleNextStep = (path: 'profile' | 'login') => {
    if (path === 'profile') {
      onNavigate('profile-creation');
    } else {
      onNavigate('login');
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-start md:items-center justify-center bg-[#fffdf2] px-4 md:px-12 pt-24 pb-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-6xl w-full relative z-30">
        
        <button 
          onClick={selectedRole ? () => setSelectedRole(null) : onBack}
          className="mb-8 flex items-center gap-2 font-black italic uppercase tracking-wider hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          {selectedRole ? 'CHANGE ROLE' : 'BACK TO ENTRY'}
        </button>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-3 md:mb-4">
                  SELECT YOUR PATH //
                </h1>
                <p className="text-base md:text-2xl font-black italic lowercase opacity-60 max-w-2xl border-l-4 md:border-l-8 border-black pl-4">
                  "identify yourself to the network to customize your experience."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-12">
                
                {/* Normal User */}
                <button 
                  onClick={() => handleRoleSelection('user')}
                  className="group bg-white border-4 border-black p-5 sm:p-8 md:p-12 text-left hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#185FA5] flex sm:flex-col flex-row items-center sm:justify-between gap-5 sm:gap-0 min-h-[90px] sm:min-h-[260px]"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary border-4 border-black flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                    <User size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase leading-none mb-1 sm:mb-2">Networker</h3>
                    <p className="font-bold lowercase opacity-80 decoration-2 italic text-sm sm:text-base leading-tight">
                      join events, find connections, and build your digital self.
                    </p>
                  </div>
                </button>

                {/* Event Organizer */}
                <button 
                  onClick={() => handleRoleSelection('organizer')}
                  className="group bg-[#ffb703] border-4 border-black p-5 sm:p-8 md:p-12 text-left hover:bg-black hover:text-[#ffb703] transition-all shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#ffb703] flex sm:flex-col flex-row items-center sm:justify-between gap-5 sm:gap-0 min-h-[90px] sm:min-h-[260px]"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black border-4 border-black flex items-center justify-center text-[#ffb703] shrink-0 group-hover:-rotate-12 transition-transform">
                    <Zap size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase leading-none mb-1 sm:mb-2">Organizer</h3>
                    <p className="font-bold lowercase opacity-80 text-black group-hover:text-[#ffb703] decoration-2 italic text-sm sm:text-base leading-tight">
                      host events, access dashboards, and manage participants.
                    </p>
                  </div>
                </button>

                {/* VIP */}
                <button 
                  onClick={() => handleRoleSelection('vip')}
                  className="group bg-secondary border-4 border-black p-5 sm:p-8 md:p-12 text-left hover:bg-black hover:text-secondary transition-all shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#e539f5] flex sm:flex-col flex-row items-center sm:justify-between gap-5 sm:gap-0 min-h-[90px] sm:min-h-[260px]"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center text-black shrink-0 group-hover:scale-110 transition-transform">
                    <Star size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black italic uppercase leading-none mb-1 sm:mb-2">VIP Member</h3>
                    <p className="font-bold lowercase opacity-80 text-black group-hover:text-secondary decoration-2 italic text-sm sm:text-base leading-tight">
                      get premium matches, compatibility tracking, and exclusive access.
                    </p>
                  </div>
                </button>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="action-select"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl mx-auto"
            >
              <div className="bg-white border-4 md:border-8 border-black p-8 md:p-16 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000]">
                 <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-12 border-b-4 border-black pb-8">
                    <div className="w-20 h-20 bg-black text-white border-4 border-black flex items-center justify-center font-black text-3xl shrink-0 rotate-3 shadow-[6px_6px_0px_#185fa5]">
                       {selectedRole === 'user' ? <User size={40} /> : selectedRole === 'organizer' ? <Zap size={40} /> : <Star size={40} />}
                    </div>
                    <div>
                       <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none mb-2 text-stroke">HOW TO PROCEED?</h2>
                       <p className="text-xl font-bold lowercase opacity-60 italic">you're acting as: {selectedRole.toUpperCase()}</p>
                    </div>
                 </div>

                 <div className="flex flex-col gap-6">
                    <button 
                      onClick={() => handleNextStep('profile')}
                      className="group w-full bg-primary border-4 border-black p-6 md:p-8 flex items-center justify-between text-white hover:bg-black transition-colors shadow-[8px_8px_0px_#000]"
                    >
                       <div className="text-left">
                          <h3 className="text-2xl md:text-3xl font-black italic uppercase leading-none mb-1">Fill Profile First</h3>
                          <p className="font-bold italic opacity-80 lowercase text-sm md:text-base">set up your networking bio before logging in.</p>
                       </div>
                       <ArrowRight size={32} className="group-hover:translate-x-4 transition-transform opacity-50 group-hover:opacity-100 shrink-0" />
                    </button>

                    <button 
                      onClick={() => handleNextStep('login')}
                      className="group w-full bg-white border-4 border-black p-6 md:p-8 flex items-center justify-between text-black hover:bg-black hover:text-white transition-colors shadow-[8px_8px_0px_#000]"
                    >
                       <div className="text-left">
                          <h3 className="text-2xl md:text-3xl font-black italic uppercase leading-none mb-1">Login Early</h3>
                          <p className="font-bold italic opacity-60 lowercase text-sm md:text-base">already have an account? authenticate now.</p>
                       </div>
                       <ArrowRight size={32} className="group-hover:translate-x-4 transition-transform opacity-50 group-hover:opacity-100 shrink-0" />
                    </button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
