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
import { Snowfall } from './components/Snowfall';
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
      x: 100, 
      filter: 'blur(20px)',
      scale: 1.1
    },
    enter: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as any,
        filter: { duration: 0.4 }
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      filter: 'blur(20px)',
      scale: 0.9,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] as any,
        filter: { duration: 0.3 }
      }
    }

  };


  return (
    <div className="relative w-full bg-background selection:bg-primary/30 min-h-screen text-white overflow-x-hidden">
      <CustomCursor />
      <NeuralBackground />
      <Snowfall />

      <FullscreenMenu currentView={view} onNavigate={setView} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="w-full"
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

      <footer className="relative z-10 w-full py-20 px-12 border-t border-white/5 bg-[#050505]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-background">S</div>
               <span className="text-2xl font-bold tracking-tighter">SCANECT</span>
            </div>
            <p className="text-muted max-w-sm text-sm leading-relaxed">
              The future of atmospheric networking. Where biological identity meets neural precision through advanced aperture orchestration.
            </p>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-primary">Protocol</h4>
            <ul className="space-y-4 text-sm text-muted">
               <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('policy')}>Policy</li>
               <li className="hover:text-white cursor-pointer transition-colors">Neural Security</li>
               <li className="hover:text-white cursor-pointer transition-colors">Aperture Dev</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-primary">Connect</h4>
            <ul className="space-y-4 text-sm text-muted">
               <li className="hover:text-white cursor-pointer transition-colors">X / Twitter</li>
               <li className="hover:text-white cursor-pointer transition-colors">Discord</li>
               <li className="hover:text-white cursor-pointer transition-colors">Neural Link</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-muted text-[10px] uppercase tracking-[0.5em] opacity-40">&copy; 2026 SCANECT OBSIDIAN. POWERED BY NEURAL APERTURE V2.0.4</p>
        </div>
      </footer>
    </div>
  );
}

export default App;



