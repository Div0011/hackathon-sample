import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Calendar, User, Zap, Shield, BarChart2, LogOut, ArrowLeft, Settings, CreditCard, PlusCircle, ClipboardList } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { ViewState } from '../App';

interface FullscreenMenuProps {
  currentView: string;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ currentView, onNavigate, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const { roles } = useRole();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsNear(true);
      } else if (!isOpen) {
        setIsNear(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Role-based nav items
  // Admin   → all
  // Organiser → events, profile, profile-card, analytics, event-creation, organiser-register, policy
  // User    → events, profile, profile-card, recommendations, policy
  const isAdmin = roles.isAdmin;
  const isOrganiser = roles.isOrganizer;

  const navItems = [
    {
      id: 'dashboard',
      label: 'EVENTS',
      desc: 'EVENTS HUB',
      icon: <Calendar />,
      color: 'bg-[#e63946]',
      show: true,
    },
    {
      id: 'profile-display',
      label: 'MY PROFILE',
      desc: 'IDENTITY HUB',
      icon: <User />,
      color: 'bg-black',
      show: true,
    },
    {
      id: 'recommendations',
      label: 'MATCHED',
      desc: 'CONNECTIONS',
      icon: <Zap />,
      color: 'bg-[#ffb703]',
      show: isAdmin || (!isOrganiser),  // admin or normal user
    },
    {
      id: 'event-creation',
      label: 'CREATE EVENT',
      desc: 'HOST AN EVENT',
      icon: <PlusCircle />,
      color: 'bg-[#ffb703]',
      show: isAdmin || isOrganiser,
    },
    {
      id: 'analytics',
      label: 'ANALYTICS',
      desc: 'INSIGHTS',
      icon: <BarChart2 />,
      color: 'bg-secondary',
      show: isAdmin || isOrganiser,
    },
    {
      id: 'lounge',
      label: 'THE LOUNGE',
      desc: 'SOCIAL HUB',
      icon: <Home />,
      color: 'bg-[#ffb703]',
      show: isAdmin,
    },
    {
      id: 'policy',
      label: 'POLICY',
      desc: 'PROTOCOL O7',
      icon: <Shield />,
      color: 'bg-[#219ebc]',
      show: true,
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      desc: 'ADMIN CONTROL',
      icon: <Settings />,
      color: 'bg-gray-800',
      show: isAdmin,
    },
  ].filter(item => item.show);

  const navigate = (id: string) => {
    onNavigate(id as ViewState);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Trigger Bar */}
      <AnimatePresence>
        {(isNear || isOpen || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 h-20 md:h-24 z-[3000] flex justify-between items-center px-6 md:px-12 pointer-events-none"
          >
            {/* Back Button */}
            <motion.button
              onClick={() => { window.history.back(); setIsOpen(false); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto h-12 md:h-16 w-12 md:w-16 bg-black text-white border-2 md:border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center transition-all"
              title="Go back"
            >
              <ArrowLeft size={24} className="md:w-8 md:h-8" />
            </motion.button>

            {/* Current User UID Badge */}
            {currentUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pointer-events-none hidden md:flex items-center gap-3 bg-black text-white border-4 border-black px-5 py-2 shadow-[4px_4px_0px_#185FA5]"
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white ${isAdmin ? 'bg-[#ffb703]' : isOrganiser ? 'bg-secondary' : 'bg-primary'}`} />
                <span className="font-black text-[10px] tracking-[0.3em] uppercase">
                  {currentUser.uniqueId} · {currentUser.role.toUpperCase()}
                </span>
              </motion.div>
            )}

            {/* Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ y: 5 }}
              className="pointer-events-auto w-14 md:w-16 h-14 md:h-16 bg-white border-2 md:border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] flex flex-col items-center justify-center gap-1.5 group transition-all"
            >
              <div className="w-6 md:w-8 h-1 md:h-1.5 bg-black" />
              <div className="w-6 md:w-8 h-1 md:h-1.5 bg-black" />
              <div className={`w-4 md:w-6 h-1 md:h-1.5 bg-black transition-all ${isOpen ? 'bg-primary' : ''}`} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2900] bg-[#fffdf2]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden h-screen"
          >
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: '100%' }}
              transition={{ duration: 1.2 }}
              className="absolute inset-x-0 top-0 h-40 bg-primary opacity-5 skew-y-3 pointer-events-none"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: '-100%' }}
              transition={{ duration: 1.2 }}
              className="absolute inset-x-0 bottom-0 h-40 bg-secondary opacity-5 -skew-y-3 pointer-events-none"
            />

            <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 md:mb-12"
              >
                {/* Current user badge in menu */}
                {currentUser && (
                  <div className="inline-flex items-center gap-3 bg-black text-white border-4 border-black px-5 py-2 mb-6 shadow-[6px_6px_0px_#185FA5]">
                    <div className={`w-3 h-3 rounded-full border border-white ${isAdmin ? 'bg-[#ffb703]' : isOrganiser ? 'bg-secondary' : 'bg-primary'}`} />
                    <span className="font-black text-[10px] tracking-[0.4em] uppercase">
                      {currentUser.uniqueId} · {currentUser.role.toUpperCase()}
                    </span>
                  </div>
                )}
                <h3 className="text-primary font-black text-lg md:text-xl tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4">NAVIGATION //</h3>
                <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter text-stroke">SELECT DESTINATION!</h2>
              </motion.div>

              {/* Nav Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-h-[55vh] md:max-h-none overflow-y-auto md:overflow-y-visible pr-2 md:pr-0">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: -6, y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                    onClick={() => navigate(item.id)}
                    className="relative group h-28 md:h-48 p-4 md:p-6 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[12px_12px_0px_#000] flex flex-col justify-end transition-all bg-white overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />
                    <div className="absolute top-2 right-2 text-black opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 80 } as any)}
                    </div>
                    <div className="relative z-10 text-left">
                      <div className={`inline-block px-2 py-0.5 mb-2 text-[7px] font-black tracking-widest text-white ${item.color} border-2 border-black`}>
                        {item.desc}
                      </div>
                      <h2 className={`text-xl md:text-4xl font-black italic tracking-tighter ${currentView === item.id ? 'text-primary' : 'text-black'}`}>
                        {item.label}
                      </h2>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 pointer-events-none">
                      <div className="bg-[#ffb703] border-4 border-black px-4 py-2 font-black text-base rotate-[-15deg] shadow-[6px_6px_0px_#000] text-black">GOTO!</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <motion.button
                  onClick={() => { navigate('entry'); onLogout(); }}
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-4 px-8 py-4 bg-black text-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all"
                >
                  <LogOut size={24} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-black italic text-xl tracking-widest">LOGOUT!</span>
                </motion.button>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="group relative"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-black flex items-center justify-center text-black scale-100 group-hover:scale-110 transition-transform shadow-[6px_6px_0px_#000]">
                    <X size={24} className="md:w-10 md:h-10" strokeWidth={4} />
                  </div>
                  <div className="absolute top-1/2 left-full ml-4 translate-y-[-50%] px-4 py-2 border-2 border-black font-black text-[8px] tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all bg-white">
                    CLOSE MENU
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
