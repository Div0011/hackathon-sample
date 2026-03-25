import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { EntryView } from './components/EntryView';
import { DashboardView } from './components/DashboardView';
import { ProfileCreationView } from './components/ProfileCreationView';
import { UserRecommendationView } from './components/UserRecommendationView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { PlatformPolicyView } from './components/PlatformPolicyView';
import { TheLounge } from './components/TheLounge';


import { NeuralBackground } from './components/NeuralBackground';
import { FullscreenMenu } from './components/FullscreenMenu';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

type ViewState = 'entry' | 'dashboard' | 'profile-creation' | 'recommendations' | 'analytics' | 'policy' | 'lounge';


function App() {
  const [view, setView] = useState<ViewState>('entry');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: 0, 
      scale: 1.2,
      filter: 'brightness(1.5) blur(10px)'
    },
    enter: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      filter: 'brightness(1) blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: "circOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 0, 
      scale: 0.8,
      filter: 'brightness(0.5) blur(10px)',
      transition: { 
        duration: 0.4, 
        ease: "circIn"
      }
    }
  };


  return (
    <div className="relative w-full bg-background selection:bg-primary/30 min-h-screen text-black overflow-x-hidden font-display uppercase font-black">
      <CustomCursor />
      <NeuralBackground />


      <FullscreenMenu currentView={view} onNavigate={setView} />

      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="w-full flex-1"
          >
            {view === 'entry' && <EntryView onSelect={() => setView('dashboard')} />}
            {view === 'dashboard' && <DashboardView onNavigate={setView} />}
            {view === 'profile-creation' && <ProfileCreationView onNavigate={setView} />}
            {view === 'recommendations' && <UserRecommendationView onNavigate={setView} />}

            {view === 'analytics' && <AnalyticsDashboardView />}
            {view === 'policy' && <PlatformPolicyView />}
            {view === 'lounge' && <TheLounge />}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Comic Styled Footer */}
      <footer className="relative z-10 w-full py-32 px-12 border-t-8 border-black bg-white flex flex-col items-center justify-center">
         <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20">
            <div>
               <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-primary border-4 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center font-black text-4xl text-white">S</div>
                  <span className="text-5xl tracking-tighter italic">SCANECT // SYNC!</span>
               </div>
               <p className="text-black text-2xl font-black italic max-w-lg mb-12 leading-none border-l-8 border-black pl-8 lowercase">
                 THE FUTURE OF ATMOSPHERIC NETWORKING IN HIGH-CONTRAST NEURAL PASTEL.
               </p>
               <div className="flex gap-4">
                  <div className="px-6 py-2 bg-black text-white text-[10px] tracking-widest">PASTEL CORE v3.0</div>
                  <div className="px-6 py-2 border-2 border-black text-[10px] tracking-widest">TIER 1 PROTOCOL</div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
               <div>
                  <h4 className="text-primary text-xl mb-8 underline decoration-4">IDENTITY</h4>
                  <ul className="space-y-4 text-lg">
                     <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => setView('policy')}>POLICY</li>
                     <li className="hover:text-primary cursor-pointer transition-colors">SYNC! HUB</li>
                     <li className="hover:text-primary cursor-pointer transition-colors">DREAM LOG</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-secondary text-xl mb-8 underline decoration-4">APERTURE</h4>
                  <ul className="space-y-4 text-lg">
                     <li className="hover:text-primary cursor-pointer transition-colors">X (TWITTER)</li>
                     <li className="hover:text-primary cursor-pointer transition-colors">DISCORD</li>
                     <li className="hover:text-primary cursor-pointer transition-colors">NEURAL LINK</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="mt-32 pt-12 border-t-4 border-black w-full text-center">
            <p className="text-[10px] tracking-[0.8em] opacity-40"> &copy; 2026 SCANECT // POWERED BY NEURAL APERTURE V3.0.4. ALL RIGHTS RESERVED. </p>
         </div>
      </footer>
    </div>
  );
}

export default App;
