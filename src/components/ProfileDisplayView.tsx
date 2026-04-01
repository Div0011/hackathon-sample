import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCw, AlertTriangle, X, Copy, Check, ExternalLink, Zap, Globe, Code, User, Target, Heart, Briefcase, Brain, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileDisplayViewProps {
  onGoToEvents: () => void;
  onCreateNewProfile: () => void;
}

export const ProfileDisplayView: React.FC<ProfileDisplayViewProps> = ({ onGoToEvents, onCreateNewProfile }) => {
  const { currentUser, resetCurrentUserProfile } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [copied, setCopied] = useState(false);

  const profile = currentUser?.profile;
  const uid = currentUser?.uniqueId ?? '';

  const handleCopyUID = () => {
    navigator.clipboard.writeText(uid).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmNewProfile = () => {
    resetCurrentUserProfile();
    setShowDisclaimer(false);
    onCreateNewProfile();
  };

  if (!currentUser) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#fffdf2] px-6 py-20 pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full relative z-10 text-center"
        >
          <div className="bg-white border-4 md:border-8 border-black p-12 md:p-24 shadow-[20px_20px_0px_#000] md:shadow-[40px_40px_0px_#000] rotate-[-1deg]">
            <div className="w-24 h-24 bg-black text-white border-4 border-black flex items-center justify-center mx-auto mb-10 shadow-[8px_8px_0px_#000] rotate-[-5deg]">
              <User size={48} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">
              IDENTITY<br />MISSING//
            </h1>
            
            <p className="font-black italic lowercase opacity-70 text-xl md:text-2xl mb-12 border-y-4 border-black py-8 max-w-2xl mx-auto">
              "to view your profile and managed identity, you must first verify your account within the scanect ecosystem."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => window.location.href = '/'} 
                className="btn-premium px-12 py-6 text-2xl italic flex items-center justify-center gap-4 shadow-[8px_8px_0px_#000]"
              >
                JOIN SCANECT <Zap size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#fffdf2] px-6 py-20">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-black text-[#feff9c] border-4 border-black p-4 mb-8 rotate-[-2deg] shadow-[8px_8px_0px_#185FA5]">
              <p className="font-black text-xl tracking-widest uppercase italic">NO PROFILE DATA FOUND</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-stroke leading-none mb-6">
              WELCOME BACK<span className="text-primary">.</span>
            </h2>
            <p className="font-black text-lg md:text-xl italic lowercase opacity-50 max-w-2xl mx-auto">
              your profile hasn't been initialized yet. choose your next move to start your journey in the ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Go to Events */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onGoToEvents}
              className="group bg-white border-4 border-black p-8 text-black text-left hover:bg-black hover:text-white transition-all shadow-[10px_10px_0px_#000] flex items-center justify-between"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-3 group-hover:text-white/60">EXPLORE</div>
                <h4 className="text-3xl font-black italic uppercase leading-none mb-2">GO TO EVENTS</h4>
                <p className="font-bold lowercase italic opacity-60 text-sm group-hover:text-white/60">browse upcoming networking sessions and meet others.</p>
              </div>
              <ArrowRight size={36} className="group-hover:translate-x-3 transition-transform shrink-0 ml-4" />
            </motion.button>

            {/* Create Profile */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onCreateNewProfile}
              className="group bg-primary border-4 border-black p-8 text-white text-left hover:bg-black transition-all shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#185FA5] flex items-center justify-between"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-3">INITIALIZE</div>
                <h4 className="text-3xl font-black italic uppercase leading-none mb-2">CREATE PROFILE</h4>
                <p className="font-bold lowercase italic opacity-70 text-sm">tell us who you are and build your professional card.</p>
              </div>
              <Plus size={36} className="group-hover:rotate-90 transition-transform duration-500 shrink-0 ml-4" />
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-[#fffdf2] pt-24 pb-32 px-6 md:px-12 overflow-x-hidden">
      {/* Background dot grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER: UID Badge ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 pb-10 border-b-8 border-black"
        >
          <div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-2">// YOUR PROFILE</p>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase">
              {profile.fullName.split(' ')[0]}
              <span className="text-primary">.</span>
            </h1>
          </div>

          {/* UID Card */}
          <div className="bg-black text-[#feff9c] border-4 border-black p-5 md:p-6 shadow-[12px_12px_0px_#185FA5] relative shrink-0">
            <div className="absolute -top-4 left-4 bg-primary border-2 border-black px-4 py-0.5 font-black text-[8px] tracking-widest text-white uppercase">
              YOUR UNIQUE ID
            </div>
            <p className="font-black text-2xl md:text-3xl italic tracking-widest mb-3 mt-1">{uid}</p>
            <button
              onClick={handleCopyUID}
              title="Copy your unique ID to clipboard"
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              {copied ? <><Check size={10} /> COPIED!</> : <><Copy size={10} /> COPY ID</>}
            </button>
            <p className="text-[8px] font-black opacity-40 tracking-widest mt-2 uppercase">
              use this ID + your password to login next time
            </p>
          </div>
        </motion.div>

        {/* ── FULL PROFILE PAGE ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10 mt-6 md:mt-0">
            <div className="w-2 h-10 md:h-16 bg-primary" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-stroke">PROFILE PAGE//</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Basic Info */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <User size={20} className="text-primary" />
                <span className="font-black text-sm uppercase tracking-widest text-primary">// Identity</span>
              </div>
              <InfoRow label="Name" value={profile.fullName} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Year" value={profile.yearOfStudy} />
              <InfoRow label="Branch" value={profile.branch} />
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-primary font-black text-sm mt-4 hover:underline">
                  <ExternalLink size={14} /> LinkedIn Profile
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-black font-black text-sm mt-2 hover:underline">
                  <Code size={14} /> GitHub Profile
                </a>
              )}
            </div>

            {/* Tech & Domains */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <Zap size={20} className="text-[#ffb703]" />
                <span className="font-black text-sm uppercase tracking-widest text-[#ffb703]">// Technical</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">DOMAINS</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.domains.map(d => (
                  <span key={d} className="bg-primary text-white border-2 border-black px-3 py-1 font-black text-xs uppercase">{d}</span>
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">TECH STACK</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.techStack.map(t => (
                  <span key={t} className="bg-black text-white border-2 border-black px-3 py-1 font-black text-xs uppercase">{t}</span>
                ))}
              </div>
              <InfoRow label="Experience" value={profile.experience} />
              <InfoRow label="Currently on" value={profile.workingOn} />
            </div>

            {/* Goals & Summary */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <Target size={20} className="text-secondary" />
                <span className="font-black text-sm uppercase tracking-widest text-secondary">// Goals</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">PROFILE BIO</p>
              <p className="font-black italic lowercase text-sm leading-tight mb-4 border-l-4 border-primary pl-4">"{profile.profileSummary}"</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">DREAM ROLE</p>
              <p className="font-black italic lowercase text-sm leading-tight mb-4 border-l-4 border-[#ffb703] pl-4">"{profile.dreamRole}"</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">GOAL</p>
              <p className="font-black italic lowercase text-sm leading-tight border-l-4 border-secondary pl-4">"{profile.goalSummary}"</p>
            </div>

            {/* Networking */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={20} className="text-primary" />
                <span className="font-black text-sm uppercase tracking-widest text-primary">// Networking</span>
              </div>
              <InfoRow label="Reason" value={profile.networkingReason} />
              <InfoRow label="Style" value={profile.interactionStyle} />
              <InfoRow label="Comm Pref" value={profile.communicationPreference} />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 mt-4">LOOKING FOR</p>
              <div className="flex flex-wrap gap-2">
                {profile.lookingFor.map(l => (
                  <span key={l} className="bg-[#185FA5]/10 border-2 border-black px-3 py-1 font-black text-xs uppercase">{l}</span>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <Brain size={20} className="text-[#ffb703]" />
                <span className="font-black text-sm uppercase tracking-widest text-[#ffb703]">// Personality</span>
              </div>
              <InfoRow label="MBTI" value={profile.mbtiTrait} />
              <InfoRow label="Type" value={profile.personalityType} />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 mt-4">OPEN TO</p>
              <div className="flex flex-wrap gap-2">
                {profile.openTo.map(o => (
                  <span key={o} className="bg-secondary/20 border-2 border-black px-3 py-1 font-black text-xs uppercase">{o}</span>
                ))}
              </div>
            </div>

            {/* Value */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-3 mb-6">
                <Heart size={20} className="text-secondary" />
                <span className="font-black text-sm uppercase tracking-widest text-secondary">// Value</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">PROBLEMS I SOLVE</p>
              <p className="font-black italic lowercase text-sm leading-tight mb-4 border-l-4 border-primary pl-4">"{profile.problemsToSolve}"</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">VALUE I OFFER</p>
              <p className="font-black italic lowercase text-sm leading-tight border-l-4 border-[#ffb703] pl-4">"{profile.valueToOffer}"</p>
            </div>

          </div>
        </motion.div>

        {/* ── PROFILE CARD ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-16 bg-[#ffb703]" />
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-stroke">YOUR PROFILE CARD//</h2>
          </div>
          <p className="font-black lowercase italic opacity-50 mb-10 text-lg -mt-4 ml-6">
            "this is how others will see you on the platform."
          </p>

          {/* The Card */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white border-4 md:border-8 border-black shadow-[20px_20px_0px_#000] md:shadow-[30px_30px_0px_#000] relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-primary p-6 md:p-8 border-b-4 md:border-b-8 border-black relative">
                <div className="absolute top-4 right-4 bg-[#feff9c] border-2 border-black px-3 py-1 font-black text-[8px] tracking-widest uppercase rotate-[10deg] shadow-[3px_3px_0px_#000]">
                  {profile.experience}
                </div>
                {/* UID at top of card */}
                <p className="font-black text-[9px] tracking-[0.4em] text-white/50 uppercase mb-2">ID: {uid}</p>
                <h2 className="text-4xl md:text-6xl font-black italic text-white leading-none tracking-tighter uppercase">
                  {profile.fullName}
                </h2>
                <p className="text-white/70 font-black italic lowercase text-lg mt-2">
                  {profile.branch} · {profile.yearOfStudy}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8">
                {/* MBTI + Personality */}
                <div className="flex gap-3 mb-6">
                  <span className="bg-secondary border-2 border-black px-4 py-1.5 font-black text-sm uppercase">{profile.mbtiTrait}</span>
                  <span className="bg-[#ffb703] border-2 border-black px-4 py-1.5 font-black text-sm uppercase">{profile.personalityType}</span>
                </div>

                {/* Bio */}
                <p className="font-black italic lowercase text-base leading-tight mb-6 border-l-4 border-black pl-4 opacity-80">
                  "{profile.profileSummary}"
                </p>

                {/* Domains */}
                <div className="mb-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">DOMAINS</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains.slice(0, 4).map(d => (
                      <span key={d} className="bg-primary/10 border-2 border-black px-3 py-1 font-black text-xs uppercase">{d}</span>
                    ))}
                    {profile.domains.length > 4 && (
                      <span className="border-2 border-black px-3 py-1 font-black text-xs uppercase opacity-50">+{profile.domains.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Tech */}
                <div className="mb-6">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.techStack.slice(0, 5).map(t => (
                      <span key={t} className="bg-black text-white border-2 border-black px-3 py-1 font-black text-xs uppercase">{t}</span>
                    ))}
                    {profile.techStack.length > 5 && (
                      <span className="border-2 border-black px-3 py-1 font-black text-xs uppercase opacity-50">+{profile.techStack.length - 5}</span>
                    )}
                  </div>
                </div>

                {/* Looking For + Dream */}
                <div className="border-t-4 border-black pt-4 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">LOOKING FOR</p>
                    <p className="font-black italic text-sm">{profile.lookingFor.slice(0, 2).join(', ')}{profile.lookingFor.length > 2 ? '...' : ''}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">DREAM ROLE</p>
                    <p className="font-black italic text-sm max-w-[180px] leading-tight">{profile.dreamRole}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-black px-6 py-3 flex justify-between items-center">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">SCANECT · NETWORKING CARD</span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#feff9c]">v3.0</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── DECISION BUTTONS ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t-8 border-black pt-16"
        >
          <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-wide leading-tight mb-4">WHAT'S NEXT?</h3>
          <div className="w-24 h-2 bg-primary mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Go to Events */}
            <button
              onClick={onGoToEvents}
              className="group bg-primary border-4 border-black p-8 text-white text-left hover:bg-black transition-all shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#185FA5] flex items-center justify-between"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-3">RECOMMENDED</div>
                <h4 className="text-3xl font-black italic uppercase leading-none mb-2">GO TO EVENTS!</h4>
                <p className="font-bold lowercase italic opacity-70 text-sm">browse events, connect with attendees, and start networking.</p>
              </div>
              <ArrowRight size={36} className="group-hover:translate-x-3 transition-transform shrink-0 ml-4" />
            </button>

            {/* Create New Profile */}
            <button
              onClick={() => setShowDisclaimer(true)}
              className="group bg-white border-4 border-black p-8 text-black text-left hover:bg-black hover:text-white transition-all shadow-[10px_10px_0px_#000] flex items-center justify-between"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-3">WANT CHANGES?</div>
                <h4 className="text-3xl font-black italic uppercase leading-none mb-2">CREATE NEW PROFILE</h4>
                <p className="font-bold lowercase italic opacity-60 text-sm">start fresh — re-answer all questions and regenerate your profile.</p>
              </div>
              <RefreshCw size={36} className="group-hover:rotate-180 transition-transform duration-500 shrink-0 ml-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── DISCLAIMER MODAL — pinned to visible viewport ────────── */}
      <AnimatePresence>
        {showDisclaimer && (
          <>
            {/* Dark overlay — covers whole page but doesn't scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDisclaimer(false)}
              className="fixed inset-0 z-[9000] bg-black/60"
            />

            {/* Modal — fixed to bottom-half of current viewport */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9100] w-full max-w-lg px-4"
            >
              <div className="bg-white border-4 md:border-8 border-black p-7 md:p-10 shadow-[12px_12px_0px_#000] relative">
                <button
                  onClick={() => setShowDisclaimer(false)}
                  title="Close disclaimer"
                  className="absolute top-4 right-4 w-9 h-9 bg-black text-white flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#ffb703] border-4 border-black flex items-center justify-center shrink-0 shadow-[5px_5px_0px_#000] rotate-[-5deg]">
                    <AlertTriangle size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase leading-tight tracking-wide">WAIT!</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">THIS ACTION IS IRREVERSIBLE</p>
                  </div>
                </div>

                <p className="font-black italic lowercase text-base leading-relaxed mb-6 border-l-8 border-[#ffb703] pl-5">
                  "creating a new profile will{' '}
                  <span className="text-primary not-italic uppercase">permanently delete</span>
                  {' '}all your current profile answers and profile card. are you sure?"
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleConfirmNewProfile}
                    className="w-full bg-primary border-4 border-black py-4 font-black text-lg italic text-white hover:bg-black transition-colors shadow-[5px_5px_0px_#000] flex items-center justify-center gap-3"
                  >
                    YES, RESET & START OVER
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => setShowDisclaimer(false)}
                    className="w-full bg-white border-4 border-black py-4 font-black text-lg italic hover:bg-black hover:text-white transition-colors shadow-[5px_5px_0px_#000]"
                  >
                    NO, KEEP MY PROFILE
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

// Small reusable row component
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-3 mb-3 items-start">
    <span className="text-[8px] font-black uppercase tracking-widest opacity-40 shrink-0 pt-1 w-20">{label}</span>
    <span className="font-black italic lowercase text-sm leading-tight">{value || '—'}</span>
  </div>
);
