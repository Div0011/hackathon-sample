import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { EntryView } from './components/EntryView';
import { DashboardView } from './components/DashboardView';
import { ProfileCreationView } from './components/ProfileCreationView';
import { ProfileDisplayView } from './components/ProfileDisplayView';
import { UserRecommendationView } from './components/UserRecommendationView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { PlatformPolicyView } from './components/PlatformPolicyView';
import { TheLounge } from './components/TheLounge';
import { LoginView } from './components/LoginView';
import { EventCreationView } from './components/EventCreationView';
import { OrganiserRegistrationView } from './components/OrganiserRegistrationView';
import { SettingsView } from './components/SettingsView';

import { NeuralBackground } from './components/NeuralBackground';
import { FullscreenMenu } from './components/FullscreenMenu';
import { CustomCursor } from './components/CustomCursor';
import { useAuth } from './context/AuthContext';
import { useRole } from './context/RoleContext';

gsap.registerPlugin(ScrollTrigger);

export type ViewState =
  | 'entry'
  | 'login'
  | 'profile-creation'
  | 'profile-display'
  | 'dashboard'
  | 'recommendations'
  | 'analytics'
  | 'policy'
  | 'event-creation'
  | 'organiser-register'
  | 'settings'
  | 'lounge';

function App() {
  const { currentUser, logout } = useAuth();
  const { roles } = useRole();
  const [view, setView] = useState<ViewState>('entry');
  const lenisRef = useRef<Lenis | null>(null);

  const navigateTo = (newView: ViewState) => {
    if (newView !== view) {
      window.history.pushState({ view: newView }, '', '');
      setView(newView);
    }
  };

  const handleLogout = () => {
    logout();
    navigateTo('entry');
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView('entry');
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (!window.history.state) {
      window.history.replaceState({ view: 'entry' }, '', '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

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

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [view]);

  const pageVariants: any = {
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
      transition: { duration: 0.6, ease: "circOut" }
    },
    exit: {
      opacity: 0,
      x: 0,
      scale: 0.8,
      filter: 'brightness(0.5) blur(10px)',
      transition: { duration: 0.4, ease: "circIn" }
    }
  };

  // Determine which views show the nav/footer (hide on entry and login)
  const showChrome = view !== 'entry' && view !== 'login';

  const isAdmin = roles.isAdmin;
  const isOrganiser = roles.isOrganizer;
  const hasProfile = !!currentUser?.profile;

  return (
    <div className="relative w-full bg-background selection:bg-primary/30 min-h-screen text-black overflow-x-hidden font-display uppercase font-black">
      <CustomCursor />
      <NeuralBackground />

      {showChrome && (
        <FullscreenMenu currentView={view} onNavigate={navigateTo} onLogout={handleLogout} />
      )}

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
            {view === 'entry' && (
              <EntryView
                onInitialize={() => navigateTo('login')}
              />
            )}
            {view === 'login' && (
              <LoginView
                onLoginSuccess={(role) => {
                  // If user has no profile, send to profile creation
                  if (!currentUser?.profile && role === 'user') {
                    navigateTo('profile-creation');
                  } else {
                    navigateTo('dashboard');
                  }
                }}
                onNewUser={() => navigateTo('profile-creation')}
              />
            )}
            {view === 'profile-creation' && (
              <ProfileCreationView
                onComplete={() => navigateTo('profile-display')}
              />
            )}
            {view === 'profile-display' && (
              <ProfileDisplayView
                onGoToEvents={() => navigateTo('dashboard')}
                onCreateNewProfile={() => navigateTo('profile-creation')}
              />
            )}
            {view === 'dashboard' && (
              <DashboardView onNavigate={(v: any) => navigateTo(v as any)} />
            )}
            {view === 'recommendations' && (
              <UserRecommendationView onNavigate={navigateTo} />
            )}
            {view === 'analytics' && <AnalyticsDashboardView />}
            {view === 'policy' && <PlatformPolicyView onNavigate={navigateTo} />}
            {view === 'lounge' && <TheLounge />}
            {view === 'event-creation' && (
              <EventCreationView onComplete={() => navigateTo('dashboard')} />
            )}
            {view === 'organiser-register' && (
              <OrganiserRegistrationView
                onComplete={() => navigateTo('dashboard')}
                onBack={() => navigateTo('dashboard')}
              />
            )}
            {view === 'settings' && <SettingsView onNavigate={navigateTo} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer – shown only when chrome is visible */}
      {showChrome && (
        <footer className="relative z-10 w-full py-16 md:py-24 px-6 md:px-12 border-t-4 md:border-t-8 border-black bg-white flex flex-col items-center justify-center">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 border-2 md:border-4 border-black shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000] flex items-center justify-center font-black text-2xl md:text-3xl text-white shrink-0 ${isAdmin ? 'bg-[#ffb703]' : isOrganiser ? 'bg-secondary' : 'bg-primary'}`}>S</div>
                <div>
                  <span className="text-3xl md:text-4xl tracking-tighter italic">SCANECT</span>
                  {currentUser && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-[#ffb703]' : isOrganiser ? 'bg-secondary' : 'bg-primary'}`} />
                      <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] opacity-60 uppercase">
                        {currentUser.role} ACCESS // {currentUser.uniqueId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-black text-lg md:text-xl font-black italic max-w-lg mb-8 md:mb-10 leading-none border-l-4 md:border-l-8 border-black pl-6 md:pl-8 lowercase">
                your networking ecosystem, optimized for {currentUser?.role === 'admin' ? 'unlimited control' : currentUser?.role === 'organiser' ? 'event orchestrating' : 'high-performance connections'}.
              </p>
              <div className="flex gap-4">
                <div className="px-4 md:px-6 py-2 bg-black text-white text-[8px] md:text-[10px] tracking-widest uppercase">PASTEL CORE v3.0</div>
                <div className="px-4 md:px-6 py-2 border-2 border-black text-[8px] md:text-[10px] tracking-widest uppercase">{currentUser?.role.toUpperCase()} PROTOCOL</div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h4 className="text-primary text-lg md:text-xl mb-6 md:mb-8 underline decoration-2 md:decoration-4 uppercase">NAVIGATION</h4>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-black italic">
                  <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigateTo('dashboard')}>EVENTS //</li>
                  
                  {hasProfile && (
                    <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigateTo('profile-display')}>PROFILE //</li>
                  )}
                  
                  {!hasProfile && (
                    <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigateTo('profile-creation')}>CREATE PROFILE //</li>
                  )}

                  {(isAdmin || !isOrganiser) && (
                    <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigateTo('recommendations')}>MATCHED //</li>
                  )}

                  {(isAdmin || isOrganiser) && (
                    <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigateTo('event-creation')}>CREATE EVENT //</li>
                  )}
                  
                  {hasProfile && (
                    <li className="hover:text-primary cursor-pointer transition-colors text-[10px] mt-4 opacity-50 underline decoration-1 uppercase" onClick={() => { if(confirm('RESET YOUR PROFILE? THIS CANNOT BE UNDONE.')) { navigateTo('profile-creation'); } }}>RESET PROFILE</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-secondary text-lg md:text-xl mb-6 md:mb-8 underline decoration-2 md:decoration-4 uppercase">SYNC DATA</h4>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-black italic">
                  {(isAdmin || isOrganiser) && (
                    <li className="hover:text-secondary cursor-pointer transition-colors" onClick={() => navigateTo('analytics')}>ANALYTICS //</li>
                  )}
                  
                  {isAdmin && (
                    <li className="hover:text-secondary cursor-pointer transition-colors" onClick={() => navigateTo('lounge')}>THE LOUNGE //</li>
                  )}
                  
                  {isAdmin && (
                    <li className="hover:text-secondary cursor-pointer transition-colors" onClick={() => navigateTo('settings')}>SETTINGS //</li>
                  )}
                  
                  <li className="hover:text-secondary cursor-pointer transition-colors" onClick={() => navigateTo('policy')}>PROTOCOL O7 //</li>
                </ul>
              </div>
              <div className="hidden lg:block">
                <h4 className="text-[#ffb703] text-lg md:text-xl mb-6 md:mb-8 underline decoration-2 md:decoration-4 uppercase">NETWORK</h4>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-black italic">
                  <li className="hover:text-[#ffb703] cursor-pointer transition-colors">X (TWITTER)</li>
                  <li className="hover:text-[#ffb703] cursor-pointer transition-colors">DISCORD</li>
                  <li className="hover:text-[#ffb703] cursor-pointer transition-colors">NEURAL LINK</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t-2 md:border-t-4 border-black w-full text-center">
            <p className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] opacity-40 uppercase">
              &copy; 2026 SCANECT // POWERED BY NEURAL APERTURE V3.0.4. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
