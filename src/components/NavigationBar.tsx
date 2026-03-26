import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface NavigationBarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ currentView, onNavigate }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const navItems = [
    { id: 'entry', label: 'Home' },
    { id: 'dashboard', label: 'Events' },
    { id: 'profile-creation', label: 'Profile' },
    { id: 'recommendations', label: 'Discovery' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'policy', label: 'Policy' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] w-auto hidden md:block">
      <motion.div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative flex items-center gap-2 p-2 glass-blue rounded-2xl overflow-hidden border border-white/10"
      >
        {/* Spotlight Effect Layer */}
        <motion.div
           className="absolute pointer-events-none z-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
           style={{
             x: spotlightX,
             y: spotlightY,
             translateX: '-50%',
             translateY: '-50%',
             opacity: hoveredIndex !== null ? 1 : 0
           }}
        />

        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative z-10 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              currentView === item.id ? 'text-primary' : 'text-muted hover:text-white'
            }`}
          >
             {item.label}
             {currentView === item.id && (
               <motion.div 
                 layoutId="nav-active"
                 className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
               />
             )}
          </button>
        ))}
      </motion.div>
    </nav>
  );
};
