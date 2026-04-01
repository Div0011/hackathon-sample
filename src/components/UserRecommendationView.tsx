import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, User, Target, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

/* ─── Main View ────────────────────────────────────────────────────── */
export const UserRecommendationView: React.FC<UserRecommendationViewProps> = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { currentUser } = useAuth();

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
                onClick={() => window.location.href = '/'} // Redirect to entry or handle in App
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
          animate={{ opacity: selectedId ? 0 : 1 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black italic tracking-tight leading-none lowercase">
            member{' '}
            <span className="bg-[#ffb703] px-4 md:px-6 text-black not-italic">
              discovery//
            </span>
          </h1>
          <p className="text-lg md:text-2xl font-black mt-8 md:mt-12 lowercase italic border-l-4 md:border-l-8 border-black pl-6 md:pl-8 max-w-2xl leading-snug">
            "connect with peer members across the scanect ecosystem. open a card then tap{' '}
            <span className="text-primary not-italic uppercase">VIEW COMPATIBILITY</span> to see your match score."
          </p>

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

      {/* Expanded modal — outside grid flow */}
      <AnimatePresence>
        {selectedUser && (
          <ExpandedCard
            user={selectedUser}
            currentUserSkills={currentUserSkills}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
