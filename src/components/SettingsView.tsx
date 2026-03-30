import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Star, ArrowLeft } from 'lucide-react';
import { useRole } from '../context/RoleContext';

interface SettingsViewProps {
  onNavigate: (view: any) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const { roles, setRoles } = useRole();

  const toggleRole = (roleKey: keyof typeof roles) => {
    setRoles(prev => ({ ...prev, [roleKey]: !prev[roleKey] }));
  };

  return (
    <section className="relative min-h-screen w-full flex items-start md:items-center justify-center bg-[#fffdf2] px-4 md:px-12 pt-24 pb-12 md:py-20 overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-x-0 h-40 bg-black pointer-events-none z-20 opacity-5 shadow-2xl skew-y-3 top-20" />
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-4xl w-full relative z-30">
        
        <button 
          onClick={() => onNavigate('dashboard')}
          className="mb-8 flex items-center gap-2 font-black italic uppercase tracking-wider hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          BACK TO HUB
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 md:border-8 border-black p-8 md:p-12 shadow-[15px_15px_0px_#000] md:shadow-[20px_20px_0px_#000]"
        >
          <div className="flex items-center gap-6 mb-10 border-b-4 border-black pb-8">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-[#ffb703] border-4 border-black transform -rotate-6 shadow-[4px_4px_0px_#185fa5]">
               <SettingsIcon />
            </div>
            <div>
          <div className="text-3xl md:text-5xl font-black italic tracking-tighter text-stroke leading-none uppercase">
                SYSTEM SETTINGS //
              </div>
              <p className="font-bold opacity-60 italic lowercase">feature flags & access controls</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            {/* Admin Toggle */}
             <div className="flex items-center justify-between w-full p-4 md:p-6 border-4 border-black hover:bg-[#ffb703]/10 transition-colors">
                <div className="flex items-start gap-3 md:gap-4">
                   <div className="mt-1 shrink-0">
                      <Shield size={24} className={roles.isAdmin ? 'text-primary' : 'text-black/30'} />
                   </div>
                   <div>
                     <h3 className="text-base md:text-2xl font-black uppercase italic leading-none mb-1">Administrator Access</h3>
                     <p className="text-xs md:text-sm font-bold opacity-60 max-w-xs lowercase">grants complete override access to all application features and pages.</p>
                   </div>
                </div>
                <button 
                  aria-label="Toggle Administrator Access"
                  onClick={() => toggleRole('isAdmin')}
                  className={`w-14 md:w-24 h-8 md:h-10 border-4 border-black relative transition-all ${roles.isAdmin ? 'bg-[#185FA5]' : 'bg-gray-200'} shrink-0 ml-4`}
                >
                   <div className={`absolute top-0 bottom-0 w-5 md:w-10 bg-white border-x-4 border-black transition-all ${roles.isAdmin ? 'right-0' : 'left-0'}`} />
                </button>
             </div>

            {/* Event Organizer Toggle */}
             <div className="flex items-center justify-between w-full p-4 md:p-6 border-4 border-black hover:bg-[#ffb703]/10 transition-colors">
                <div className="flex items-start gap-3 md:gap-4">
                   <div className="mt-1 shrink-0">
                      <Zap size={24} className={roles.isOrganizer ? 'text-[#ffb703]' : 'text-black/30'} />
                   </div>
                   <div>
                     <h3 className="text-base md:text-2xl font-black uppercase italic leading-none mb-1">Event Organizer Mode</h3>
                     <p className="text-xs md:text-sm font-bold opacity-60 max-w-xs lowercase">unlocks event creation features and detailed analytics dashboard.</p>
                   </div>
                </div>
                <button 
                  aria-label="Toggle Event Organizer Mode"
                  onClick={() => toggleRole('isOrganizer')}
                  className={`w-14 md:w-24 h-8 md:h-10 border-4 border-black relative transition-all ${roles.isOrganizer ? 'bg-[#ffb703]' : 'bg-gray-200'} shrink-0 ml-4`}
                >
                   <div className={`absolute top-0 bottom-0 w-5 md:w-10 bg-white border-x-4 border-black transition-all ${roles.isOrganizer ? 'right-0' : 'left-0'}`} />
                </button>
             </div>

            {/* VIP Toggle */}
             <div className="flex items-center justify-between w-full p-4 md:p-6 border-4 border-black hover:bg-[#ffb703]/10 transition-colors">
                <div className="flex items-start gap-3 md:gap-4">
                   <div className="mt-1 shrink-0">
                      <Star size={24} className={roles.isVIP ? 'text-secondary' : 'text-black/30'} />
                   </div>
                   <div>
                     <h3 className="text-base md:text-2xl font-black uppercase italic leading-none mb-1">VIP Member</h3>
                     <p className="text-xs md:text-sm font-bold opacity-60 max-w-xs lowercase">access premium networking cards, compatibility scores and priority recommendations.</p>
                   </div>
                </div>
                <button 
                  aria-label="Toggle VIP Member Mode"
                  onClick={() => toggleRole('isVIP')}
                  className={`w-14 md:w-24 h-8 md:h-10 border-4 border-black relative transition-all ${roles.isVIP ? 'bg-secondary' : 'bg-gray-200'} shrink-0 ml-4`}
                >
                   <div className={`absolute top-0 bottom-0 w-5 md:w-10 bg-white border-x-4 border-black transition-all ${roles.isVIP ? 'right-0' : 'left-0'}`} />
                </button>
             </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
