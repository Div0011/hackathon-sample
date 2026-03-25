import React from 'react';
import { motion } from 'framer-motion';

export const PlatformPolicyView = () => {
  return (
    <section className="relative min-h-screen w-full pt-40 p-12 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 glass p-16 rounded-[64px] border border-white/5 snow-cap">
        <h1 className="text-5xl font-bold mb-12">Atmospheric Protocol</h1>
        <div className="prose prose-invert max-w-none space-y-8 text-muted leading-relaxed">
          <p className="text-xl text-white font-medium">1. Neural Sovereignty</p>
          <p>Every biological identity processed within the Aperture remains the exclusive property of the host. We do not store neural patterns; we only synchronize them.</p>
          
          <p className="text-xl text-white font-medium">2. Atmospheric Discovery</p>
          <p>Recommendations are generated via real-time proximity and interest-alignment. The "User Recognition" system is opt-in and respects visual privacy protocols.</p>
          
          <p className="text-xl text-white font-medium">3. Data Transparency</p>
          <p>Your analytics dashboard provides a live window into how your presence affects the community ecosystem. Metadata is encrypted at the edge.</p>
        </div>
      </div>
    </section>
  );
};
