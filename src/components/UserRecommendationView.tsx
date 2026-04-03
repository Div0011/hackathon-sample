import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, User, Target, ArrowLeft, Camera, QrCode, Check, Plus, UserPlus, Repeat } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { createPortal } from 'react-dom';
import { useAuth, ScanectUser } from '../context/AuthContext';

interface UserRecommendationViewProps {
  onNavigate?: (view: any) => void;
}

interface MatchUser {
  name: string;
  role: string;
  id: string;
  domains: string[];
  techStack: string[];
  mbti: string;
  personality: string;
  score: number;
  bio: string;
}

/* ─── Animated Score Ring ──────────────────────────────────────────── */
const ScoreRing: React.FC<{ score: number }> = ({ score }) => {
  const [count, setCount] = useState(0);
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (count / 100) * circ;
  const color = score >= 80 ? '#185FA5' : score >= 60 ? '#ffb703' : '#e63946';

  useEffect(() => {
    setCount(0);
    let current = 0;
    const step = Math.max(1, Math.ceil(score / 50));
    const id = setInterval(() => {
      current += step;
      if (current >= score) { setCount(score); clearInterval(id); }
      else setCount(current);
    }, 25);
    return () => clearInterval(id);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Ring */}
      <div className="relative" style={{ width: 148, height: 148 }}>
        <svg width="148" height="148" viewBox="0 0 148 148" className="rotate-[-90deg]">
          <circle cx="74" cy="74" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
          <motion.circle
            cx="74" cy="74" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-black text-5xl leading-none" style={{ color }}>{count}</span>
          <span className="font-black text-[9px] tracking-[0.35em] opacity-50 uppercase mt-0.5">%</span>
        </div>
      </div>
      {/* Tier label */}
      <div
        className="px-5 py-1.5 border-4 border-black font-black text-xs uppercase tracking-widest text-white shadow-[4px_4px_0px_#000]"
        style={{ background: color }}
      >
        {score >= 80 ? 'EXCELLENT MATCH' : score >= 60 ? 'GOOD MATCH' : 'EXPLORE TOGETHER'}
      </div>
    </div>
  );
};

/* ─── Expanded Modal ───────────────────────────────────────────────── */
const ExpandedCard: React.FC<{
  user: MatchUser;
  currentUserSkills: string[];
  onClose: () => void;
}> = ({ user, currentUserSkills, onClose }) => {
  const [showScore, setShowScore] = useState(false);

  const matchedSkills = [...user.domains, ...user.techStack].filter(s =>
    currentUserSkills.map(u => u.toLowerCase()).includes(s.toLowerCase())
  );
  const theirOthers = [...user.domains, ...user.techStack].filter(
    s => !matchedSkills.includes(s)
  );

  const scoreColor = user.score >= 80 ? '#185FA5' : user.score >= 60 ? '#ffb703' : '#e63946';

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 overflow-y-auto"
      style={{ background: 'rgba(255,253,242,0.96)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl"
        style={{ margin: 'auto' }}
      >
        <AnimatePresence mode="wait">

          {/* ──────── FRONT PANEL ──────────────────────────────────── */}
          {!showScore && (
            <motion.div
              key="front"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-4 md:border-8 border-black shadow-[16px_16px_0px_#000]"
            >
              {/* Close row */}
              <div className="flex items-center justify-between px-6 pt-5 pb-0">
                <span className="text-[9px] font-black uppercase tracking-[0.45em] opacity-30">// USER PROFILE</span>
                <button
                  onClick={onClose}
                  title="Close"
                  className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-primary transition-colors border-2 border-black"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>

              {/* Header */}
              <div className="bg-primary border-b-4 md:border-b-8 border-black px-6 md:px-10 py-7 md:py-10 mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tight leading-tight uppercase text-white break-words">
                      {user.name}
                    </h2>
                    <p className="text-white/70 font-black italic lowercase text-base md:text-lg mt-1 leading-snug">
                      {user.role}
                    </p>
                  </div>
                  {/* Score badge */}
                  <div
                    className="shrink-0 border-4 border-white px-4 py-2 text-center shadow-[4px_4px_0px_rgba(0,0,0,0.4)]"
                    style={{ background: 'rgba(0,0,0,0.25)' }}
                  >
                    <p className="font-black text-white text-2xl leading-none">{user.score}</p>
                    <p className="font-black text-white/70 text-[8px] tracking-widest uppercase">%MATCH</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 md:px-10 py-7 space-y-6">
                {/* Bio */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.45em] opacity-40 mb-2">BIO</p>
                  <p className="font-black italic lowercase text-base leading-snug border-l-4 border-[#ffb703] pl-4">
                    "{user.bio}"
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {user.mbti && (
                    <span className="bg-secondary border-2 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider text-white">
                      {user.mbti}
                    </span>
                  )}
                  {user.personality && (
                    <span className="bg-[#ffb703] border-2 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider text-black">
                      {user.personality}
                    </span>
                  )}
                  <span className="bg-black border-2 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider text-white">
                    VERIFIED
                  </span>
                </div>

                {/* Domains */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.45em] opacity-40 mb-2">DOMAINS</p>
                  <div className="flex flex-wrap gap-2">
                    {user.domains.map(d => (
                      <span key={d} className="bg-primary/10 border-2 border-black px-3 py-1 font-black text-xs uppercase">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.45em] opacity-40 mb-2">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {user.techStack.map(t => (
                      <span key={t} className="bg-black text-white border-2 border-black px-3 py-1 font-black text-xs uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="border-t-4 border-black px-6 md:px-10 py-5">
                <button
                  onClick={() => setShowScore(true)}
                  className="w-full flex items-center justify-between px-6 py-4 border-4 border-black font-black text-base uppercase tracking-wider hover:text-white transition-all shadow-[6px_6px_0px_#000] group"
                  style={{ background: scoreColor, color: '#fff' }}
                >
                  <div className="flex items-center gap-3">
                    <Target size={20} strokeWidth={3} />
                    <span>VIEW COMPATIBILITY SCORE</span>
                  </div>
                  <span className="font-black text-2xl opacity-80">→</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ──────── SCORE PANEL ──────────────────────────────────── */}
          {showScore && (
            <motion.div
              key="score"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              className="bg-[#fffdf2] border-4 md:border-8 border-black shadow-[16px_16px_0px_#000]"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b-4 border-black bg-black">
                <button
                  onClick={() => setShowScore(false)}
                  className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest hover:text-[#ffb703] transition-colors"
                >
                  <ArrowLeft size={16} strokeWidth={3} />
                  BACK TO PROFILE
                </button>
                <button
                  onClick={onClose}
                  title="Close"
                  className="w-9 h-9 bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors border-2 border-white"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>

              {/* Title */}
              <div className="px-6 md:px-10 pt-8 pb-4">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 mb-1">COMPATIBILITY</p>
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-wide leading-tight">
                  YOUR MATCH WITH
                </h2>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-wide leading-tight text-primary">
                  {user.name.split(' ')[0]}
                </h3>
              </div>

              {/* Score Ring — centred block */}
              <div className="flex justify-center px-6 py-6">
                <ScoreRing score={user.score} />
              </div>

              {/* Divider */}
              <div className="mx-6 border-t-4 border-black" />

              {/* Matched Skills */}
              <div className="px-6 md:px-10 py-6 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-primary border-2 border-black shrink-0" />
                    <p className="font-black text-sm uppercase tracking-widest">
                      SKILLS IN COMMON ({matchedSkills.length})
                    </p>
                  </div>
                  {matchedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 300 }}
                          className="bg-primary text-white border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <p className="font-black italic lowercase text-sm opacity-40">
                      no direct overlap — you're complementary!
                    </p>
                  )}
                </div>

                {theirOthers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-[#ffb703] border-2 border-black shrink-0" />
                      <p className="font-black text-sm uppercase tracking-widest">
                        THEIR OTHER SKILLS ({theirOthers.length})
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {theirOthers.map(s => (
                        <span
                          key={s}
                          className="bg-white border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_#000] opacity-70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t-4 border-black px-6 md:px-10 py-5">
                <button
                  onClick={() => setShowScore(false)}
                  className="w-full bg-black text-white border-4 border-black py-4 font-black text-base uppercase tracking-wider hover:bg-primary transition-colors shadow-[6px_6px_0px_#000] flex items-center justify-center gap-3"
                >
                  <ArrowLeft size={18} strokeWidth={3} />
                  BACK TO PROFILE
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ─── Grid (Mini) Card ─────────────────────────────────────────────── */
const MiniCard: React.FC<{ user: MatchUser; onOpen: () => void }> = ({ user, onOpen }) => {
  const scoreColor = user.score >= 80 ? '#185FA5' : user.score >= 60 ? '#ffb703' : '#e63946';
  return (
    <motion.div
      layoutId={`card-${user.id}`}
      onClick={onOpen}
      whileHover={{ y: -8 }}
      className="relative w-full h-[340px] md:h-[420px] cursor-pointer bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[16px_16px_0px_#000] transition-shadow overflow-hidden"
    >
      {/* Big background icon */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <User className="w-32 h-32 text-black" />
      </div>
      {/* Dot hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:8px_8px]" />

      {/* Score badge — top right corner */}
      <div
        className="absolute top-4 right-4 w-14 h-14 border-4 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_#000]"
        style={{ background: scoreColor }}
      >
        <span className="font-black text-white text-xl leading-none">{user.score}</span>
        <span className="text-white text-[7px] font-black tracking-widest uppercase">%</span>
      </div>

      {/* Card content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        <div className="w-12 h-12 bg-[#ffb703] border-4 border-black flex items-center justify-center mb-5 shadow-[4px_4px_0px_#000]">
          <User className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black italic tracking-tight mb-2 leading-tight uppercase">
          {user.name}
        </h3>
        <p className="inline-block px-3 py-1 bg-black text-white text-[9px] font-black tracking-widest uppercase mb-4">
          {user.role}
        </p>

        {/* Domain tags preview */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {user.domains.slice(0, 3).map(d => (
            <span key={d} className="bg-primary/10 border border-black px-2 py-0.5 text-[8px] font-black uppercase">
              {d}
            </span>
          ))}
          {user.domains.length > 3 && (
            <span className="border border-black px-2 py-0.5 text-[8px] font-black uppercase opacity-40">
              +{user.domains.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Scanned User Profile Card (Summarized) ────────────────────── */
const ScannedUserCard: React.FC<{ 
  user: ScanectUser, 
  onClose: () => void,
  onConnect: () => void 
}> = ({ user, onClose, onConnect }) => {
  const [connected, setConnected] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const profile = user.profile;

  if (!profile) return null;

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="w-full max-w-xl [perspective:1000px]" onClick={e => e.stopPropagation()}>
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full cursor-pointer"
          onClick={toggleFlip}
        >
          {/* --- FRONT SIDE --- */}
          <div 
            className="w-full h-full [backface-visibility:hidden]"
            style={{ position: isFlipped ? 'absolute' : 'relative' }}
          >
            <div className="bg-white border-4 md:border-8 border-black shadow-[20px_20px_0px_#ffb703] relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                title="Close"
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-primary transition-colors"
              >
                <X size={18} strokeWidth={3} />
              </button>

              {/* Card Header */}
              <div className="bg-primary p-6 md:p-8 border-b-4 md:border-b-8 border-black relative">
                <div className="absolute top-4 right-16 bg-[#feff9c] border-2 border-black px-3 py-1 font-black text-[8px] tracking-widest uppercase rotate-[10deg] shadow-[3px_3px_0px_#000]">
                  {profile.experience}
                </div>
                <p className="font-black text-[9px] tracking-[0.4em] text-white/50 uppercase mb-2">ID: {user.uniqueId}</p>
                <h2 className="text-3xl md:text-5xl font-black italic text-white leading-none tracking-tighter uppercase">
                  {profile.fullName}
                </h2>
                <p className="text-white/70 font-black italic lowercase text-base mt-2">
                  {profile.branch} · {profile.yearOfStudy}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8">
                <div className="flex gap-3 mb-6">
                  <span className="bg-secondary border-2 border-black px-4 py-1.5 font-black text-xs uppercase text-white">{profile.mbtiTrait}</span>
                  <span className="bg-[#ffb703] border-2 border-black px-4 py-1.5 font-black text-xs uppercase">{profile.personalityType}</span>
                </div>

                <p className="font-black italic lowercase text-base leading-tight mb-6 border-l-4 border-black pl-4 opacity-80">
                  "{profile.profileSummary}"
                </p>

                <div className="mb-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">DOMAINS</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains.slice(0, 4).map(d => (
                      <span key={d} className="bg-primary/10 border-2 border-black px-3 py-1 font-black text-[10px] uppercase">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConnected(true);
                    onConnect();
                  }}
                  disabled={connected}
                  className={`w-full py-5 font-black text-xl italic uppercase transition-all shadow-[8px_8px_0px_#000] active:translate-y-1 flex items-center justify-center gap-3 ${
                    connected ? 'bg-black text-[#57ff57]' : 'bg-primary text-white hover:bg-black'
                  }`}
                >
                  {connected ? (
                    <><Check size={24} /> CONNECT REQUEST SENT</>
                  ) : (
                    <><UserPlus size={24} /> ADD AS FRIEND</>
                  )}
                </button>
              </div>

              <div className="bg-black px-6 py-3 flex justify-between items-center text-white/50 text-[8px] font-black uppercase tracking-[0.4em]">
                 <span className="flex items-center gap-2"><Repeat size={10} /> TAP CARD TO FLIP</span>
                 <span className="text-[#feff9c]">SCANECT NETWORK</span>
              </div>
            </div>
          </div>

          {/* --- BACK SIDE (QR) --- */}
          <div 
            className="w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{ position: isFlipped ? 'relative' : 'absolute', top: 0, left: 0 }}
          >
            <div className="bg-black border-4 md:border-8 border-white p-8 md:p-12 shadow-[20px_20px_0px_#ffb703] flex flex-col items-center justify-center text-center h-full min-h-[500px]">
              {/* Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                title="Close"
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-white hover:bg-primary transition-colors"
              >
                <X size={18} strokeWidth={3} />
              </button>

              <div className="mb-8">
                 <h3 className="text-3xl md:text-5xl font-black italic text-[#ffb703] uppercase leading-none tracking-tighter mb-2">NEURAL SYNC//</h3>
                 <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">SHARE PROFILE FREQUENCY</p>
              </div>

              <div 
                className="relative bg-white p-6 md:p-8 border-4 border-[#ffb703] shadow-[10px_10px_0px_#fff] flex items-center justify-center cursor-zoom-in"
                onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                title="Expand QR"
              >
                <QRCodeSVG 
                  value={user.uniqueId} 
                  size={180}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                    x: undefined,
                    y: undefined,
                    height: 45,
                    width: 45,
                    excavate: true,
                  }}
                />
                {/* ID Overlay */}
                <div className="absolute bg-[#ffb703] border-2 border-black px-2 py-1 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <span className="font-black text-[9px] tracking-tighter text-black uppercase leading-none">{user.uniqueId}</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-primary text-white border-2 border-white px-6 py-2 font-black text-xl italic tracking-widest inline-block mb-4 uppercase">
                  {user.uniqueId}
                </div>
              </div>

              <div className="absolute bottom-6 w-full px-8 flex justify-between items-center text-white/40 text-[8px] font-black uppercase tracking-[0.4em]">
                 <span className="flex items-center gap-2 text-[#ffb703]"><Repeat size={10} /> TAP TO REVERT</span>
                 <span>SCANECT SYNC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── QR EXPANSION MODAL (Z-INTERCEPT) ────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 md:border-8 border-black p-4 md:p-8 shadow-[12px_12px_0px_#ffb703] relative max-w-sm w-fit text-center mx-auto"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-12 right-0 bg-white text-black px-4 py-2 border-2 border-black font-black text-xs uppercase italic hover:bg-primary transition-colors"
                title="Close Expand"
              >
                CLOSE [X]
              </button>

              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-3xl font-black italic text-black uppercase leading-none tracking-tighter mb-1">NEURAL SYNC//</h3>
                <p className="text-black/40 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">SCAN TO CONNECT</p>
              </div>

              <div className="relative bg-white p-2 md:p-6 border-2 md:border-4 border-black shadow-[6px_6px_0px_#000] mx-auto inline-block">
                <QRCodeSVG 
                  value={user.uniqueId} 
                  size={220}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                    height: 50,
                    width: 50,
                    excavate: true,
                  }}
                />
                {/* ID Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-[#ffb703] border border-black px-2 py-1 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                    <span className="font-black text-[10px] tracking-tighter text-black uppercase leading-none">{user.uniqueId}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12 space-y-4">
                <div className="bg-black text-white px-8 py-4 font-black text-4xl italic tracking-widest inline-block uppercase">
                  {user.uniqueId}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Scanner Implementation ────────────────────────────────────── */
const QRScannerOverlay: React.FC<{ onResult: (uid: string) => void, onClose: () => void }> = ({ onResult, onClose }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
          const qrboxSize = Math.floor(minEdgeSize * 0.7);
          return { width: qrboxSize, height: qrboxSize };
        },
        aspectRatio: 1.0 
      },
      /* verbose= */ false
    );
    
    scannerRef.current.render(onResult, (err) => {
      // ignore scan errors
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(e => console.error("Failed to clear scanner", e));
      }
    };
  }, [onResult]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3000] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-lg"
    >
      <div className="w-full max-w-lg bg-white border-8 border-black shadow-[20px_20px_0px_#ffb703] relative p-6">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white text-black px-6 py-2 border-4 border-black font-black text-sm uppercase italic mb-4 hover:bg-primary transition-colors"
        >
          CLOSE SCANNER [X]
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase italic tracking-tighter text-stroke-sm leading-none mb-3">
             CAMERA <span className="bg-black text-[#ffb703] not-italic px-4">SYNC//</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">
             "pointing camera at member neural tag..."
          </p>
        </div>

        {/* Scanner Target Area */}
        <div id="reader" className="w-full overflow-hidden border-4 border-black bg-gray-50" />
        
        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black italic opacity-40 uppercase tracking-widest text-center">
           <Zap size={12} className="text-secondary" /> USE NEURAL LINK TO PROTOCOL O7 <Zap size={12} className="text-primary" />
        </div>
      </div>
    </motion.div>
  );
};
export const UserRecommendationView: React.FC<UserRecommendationViewProps> = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUser, setScannedUser] = useState<ScanectUser | null>(null);
  
  const { currentUser, allUsers } = useAuth();

  const currentUserSkills: string[] = [
    ...(currentUser?.profile?.domains ?? []),
    ...(currentUser?.profile?.techStack ?? []),
  ];

  const users: MatchUser[] = [
    {
      name: 'ALEX SMITH',
      role: 'SOFTWARE ENGINEER',
      id: 'u1',
      domains: ['AI/ML', 'Cloud', 'Web Dev'],
      techStack: ['Python', 'AWS', 'React', 'Docker'],
      mbti: 'INTJ',
      personality: 'Analyst',
      score: 87,
      bio: 'building scalable ml pipelines and open-source tooling. looking for collaborators.',
    },
    {
      name: 'SARA JANE',
      role: 'PRODUCT DESIGNER',
      id: 'u2',
      domains: ['UI/UX', 'Web Dev', 'AR/VR'],
      techStack: ['Figma', 'React', 'Next.js', 'Typescript'],
      mbti: 'ENFJ',
      personality: 'Diplomat',
      score: 74,
      bio: 'designing systems that put humans first. love hackathons + design sprints.',
    },
    {
      name: 'MIKE ROSS',
      role: 'DATA SCIENTIST',
      id: 'u3',
      domains: ['Data Science', 'AI/ML', 'Blockchain'],
      techStack: ['Python', 'Node.js', 'Firebase', 'Docker'],
      mbti: 'INTP',
      personality: 'Analyst',
      score: 91,
      bio: 'turning raw data into actionable insight. ex-kaggle top 5%. open to research partnerships.',
    },
    {
      name: 'LISA WONG',
      role: 'WEB DEVELOPER',
      id: 'u4',
      domains: ['Web Dev', 'App Dev', 'IoT'],
      techStack: ['React', 'Next.js', 'Golang', 'Firebase'],
      mbti: 'ENTP',
      personality: 'Explorer',
      score: 65,
      bio: 'full-stack dev passionate about iot and real-time apps. always shipping.',
    },
  ];

  const handleScan = (decodedText: string) => {
    // Find user in allUsers by uniqueId
    const found = allUsers.find(u => u.uniqueId === decodedText);
    if (found) {
      setScannedUser(found);
      setIsScanning(false);
    }
  };

  const selectedUser = users.find(u => u.id === selectedId) ?? null;

  if (!currentUser) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-48 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full relative z-10 text-center"
        >
          <div className="bg-white border-4 md:border-8 border-black p-12 md:p-24 shadow-[20px_20px_0px_#000] md:shadow-[40px_40px_0px_#000] rotate-[-1deg]">
            <div className="w-24 h-24 bg-[#ffb703] border-4 border-black flex items-center justify-center text-black mx-auto mb-10 shadow-[8px_8px_0px_#000] rotate-[5deg]">
              <Target size={48} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">
              IDENTITY SYNC<br />REQUIRED//
            </h1>
            
            <p className="font-black italic lowercase opacity-70 text-xl md:text-2xl mb-12 border-y-4 border-black py-8 max-w-2xl mx-auto">
              "we can't find your matches without knowing who you are. sync your profile to reveal your ecosystem connections."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => window.location.href = '/'} 
                className="btn-premium px-12 py-6 text-2xl italic flex items-center justify-center gap-4 shadow-[8px_8px_0px_#000]"
              >
                LOGIN NOW <Zap size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-24 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          animate={{ opacity: selectedId || isScanning || scannedUser ? 0 : 1 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black italic tracking-tight leading-none lowercase">
                member{' '}
                <span className="bg-[#ffb703] px-4 md:px-6 text-black not-italic">
                  discovery//
                </span>
              </h1>
              <p className="text-lg md:text-2xl font-black mt-8 md:mt-12 lowercase italic border-l-4 md:border-l-8 border-black pl-6 md:pl-8 leading-snug">
                "connect with peer members across the scanect ecosystem. open a card then tap{' '}
                <span className="text-primary not-italic uppercase">VIEW COMPATIBILITY</span> to see your match score."
              </p>
            </div>

            {/* NEURAL SCAN ACTION */}
            <div className="shrink-0 mb-4">
               <button 
                 onClick={() => setIsScanning(true)}
                 className="flex flex-col items-center gap-4 group"
               >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-black text-[#ffb703] flex items-center justify-center border-4 border-black shadow-[10px_10px_0px_#ffb703] group-hover:shadow-[15px_15px_0px_#ffb703] group-hover:-translate-y-2 transition-all">
                    <Camera size={48} strokeWidth={2.5} />
                  </div>
                  <span className="font-black text-sm uppercase italic tracking-widest text-[#ffb703] bg-black px-4 py-1">OPEN SCANNER</span>
               </button>
            </div>
          </div>

          {/* Tier legend */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { color: '#185FA5', label: '80–100% Excellent' },
              { color: '#ffb703', label: '60–79% Good' },
              { color: '#e63946', label: 'Below 60% Explore' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black" style={{ background: t.color }} />
                <span className="font-black text-[10px] uppercase tracking-widest opacity-60">{t.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-20">
          {users.map(user => (
            <MiniCard
              key={user.id}
              user={user}
              onOpen={() => setSelectedId(user.id)}
            />
          ))}
        </div>
      </div>

      {/* OVERLAYS (PORTALED) */}
      {createPortal(
        <AnimatePresence>
          {/* Recommendation Detail */}
          {selectedUser && (
            <ExpandedCard
              user={selectedUser}
              currentUserSkills={currentUserSkills}
              onClose={() => setSelectedId(null)}
            />
          )}

          {/* Neural Scanner */}
          {isScanning && (
            <QRScannerOverlay 
              onResult={handleScan} 
              onClose={() => setIsScanning(false)} 
            />
          )}

          {/* Scanned Result Card */}
          {scannedUser && (
            <ScannedUserCard 
              user={scannedUser} 
              onClose={() => setScannedUser(null)} 
              onConnect={() => {
                console.log("Connecting with", scannedUser.uniqueId);
              }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
