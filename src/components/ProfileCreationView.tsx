import React from 'react';
import { motion } from 'framer-motion';

export const ProfileCreationView = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center p-12">
      <div className="max-w-4xl w-full glass p-12 rounded-[48px] border border-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-8">Create Your Identity</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted">Aperture Handle</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary focus:bg-primary/5 transition-all outline-none" placeholder="e.g. neuron_alpha" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted">Neural Bio</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-32 focus:border-primary focus:bg-primary/5 transition-all outline-none" placeholder="Describe your biological focus..." />
            </div>
            <button className="btn-premium w-full py-6 rounded-2xl">Initialize Profile</button>
          </div>
        </div>
      </div>
    </section>
  );
};
