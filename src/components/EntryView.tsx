import React from 'react';
import { motion } from 'framer-motion';
import { OrbBackground } from './Orb';

interface EntryViewProps {
  onSelect: () => void;
}

export const EntryView: React.FC<EntryViewProps> = ({ onSelect }) => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden">
      <OrbBackground />
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center font-black text-4xl text-background shadow-[0_0_40px_rgba(0,227,253,0.4)]">S</div>
          <h1 className="mt-4 text-white font-bold tracking-tighter text-2xl uppercase">Scanect</h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            className="btn-premium px-20 py-6 rounded-2xl text-xl snow-cap"
          >
            LOGIN
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            className="btn-outline px-20 py-6 rounded-2xl text-xl font-black tracking-widest uppercase shadow-[0_0_20px_rgba(0,227,253,0.1)] snow-cap"
          >
            REGISTER
          </motion.button>
        </div>

      </div>

      <div className="absolute bottom-12 text-muted text-xs uppercase tracking-widest opacity-30 select-none">
        Obsidian Intelligence · Powered by Aperture
      </div>
    </section>
  );
};
