import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, ArrowRight, ChevronDown, Key, UserPlus, LogIn, AlertCircle, BadgeCheck } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

interface LoginViewProps {
  onLoginSuccess: (role: UserRole) => void;
  onNewUser: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNewUser }) => {
  const { login, currentUser } = useAuth();

  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showKeyField, setShowKeyField] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!uniqueId.trim()) { setError('Please enter your Unique ID.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600)); // Brief loading animation

    const result = login(uniqueId.trim(), password, showKeyField && accessKey ? accessKey.trim() : undefined);
    setIsLoading(false);

    if (result.success) {
      // Role is now set in auth context; read it
      const role = showKeyField && accessKey.trim().endsWith('_admin')
        ? 'admin'
        : showKeyField && accessKey.trim().endsWith('_orgr')
          ? 'organiser'
          : 'user';
      onLoginSuccess(role as UserRole);
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  // If already logged in, show a quick state
  if (currentUser) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center bg-[#fffdf2] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-4 border-black p-12 shadow-[20px_20px_0px_#000] text-center max-w-md"
        >
          <div className="w-20 h-20 bg-primary border-4 border-black flex items-center justify-center text-white mx-auto mb-8 shadow-[8px_8px_0px_#000]">
            <BadgeCheck size={48} />
          </div>
          <h2 className="text-4xl font-black italic uppercase mb-4">ALREADY IN!</h2>
          <p className="font-black lowercase italic opacity-60 mb-8">
            Logged in as <span className="text-primary not-italic">{currentUser.uniqueId}</span>
          </p>
          <button
            onClick={() => onLoginSuccess(currentUser.role)}
            className="btn-premium w-full py-5 text-xl italic flex items-center justify-center gap-3"
          >
            CONTINUE TO PLATFORM <ArrowRight size={20} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#fffdf2] px-6 md:px-12 py-12 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-12deg] translate-x-1/2" />

      <div className="relative w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* LEFT: LOGIN PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -1 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Comic sticker */}
          <div className="absolute -top-6 -right-4 bg-[#ffb703] border-4 border-black px-5 py-2 font-black text-lg rotate-[12deg] shadow-[6px_6px_0px_#000] z-20 hidden sm:block">
            WELCOME BACK!
          </div>

          <div className="bg-white border-4 md:border-8 border-black p-8 md:p-10 shadow-[12px_12px_0px_#000] md:shadow-[20px_20px_0px_#000]">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-black border-4 border-black flex items-center justify-center text-white shrink-0">
                <LogIn size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-stroke leading-none uppercase">
                LOGIN//
              </h1>
            </div>

            <div className="space-y-6" onKeyDown={handleKeyDown}>
              {/* Unique ID */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-1">
                  // UNIQUE ID
                </label>
                <div className="relative group">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={20} />
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={e => setUniqueId(e.target.value)}
                    className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-lg outline-none focus:bg-[#feff9c] transition-all"
                    placeholder="e.g. SCN-USR-2847"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-1">
                  // PASSWORD
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-white border-4 border-black p-4 pl-12 font-black text-lg outline-none focus:bg-[#feff9c] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Access Key Toggle */}
              <button
                onClick={() => setShowKeyField(!showKeyField)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
              >
                <Key size={12} />
                I have an access key (admin / organiser)
                <ChevronDown size={12} className={`transition-transform ${showKeyField ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showKeyField && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-1">
                        // ACCESS KEY
                      </label>
                      <div className="relative group">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={20} />
                        <input
                          type="text"
                          value={accessKey}
                          onChange={e => setAccessKey(e.target.value)}
                          className="w-full bg-white border-4 border-primary p-4 pl-12 font-black text-lg outline-none focus:bg-[#feff9c] transition-all"
                          placeholder="SCN2026_admin or SCN2026_orgr"
                        />
                      </div>
                      <p className="text-[9px] font-black opacity-30 tracking-widest lowercase">
                        keys end with _admin or _orgr
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 bg-red-50 border-4 border-red-500 p-4"
                  >
                    <AlertCircle size={20} className="text-red-500 shrink-0" />
                    <p className="font-black text-sm text-red-600 lowercase italic">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="btn-premium w-full py-5 text-xl italic flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-pulse">AUTHENTICATING...</span>
                ) : (
                  <>
                    LOG IN!
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: NEW USER / REGISTER PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 1 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* New User CTA */}
          <div className="bg-[#ffb703] border-4 border-black p-8 shadow-[12px_12px_0px_#000] relative">
            <div className="absolute -top-5 -left-5 bg-black text-[#ffb703] border-4 border-black px-4 py-1 font-black text-xs rotate-[-5deg] shadow-[4px_4px_0px_#185FA5]">
              FIRST TIME?
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center text-[#ffb703] shrink-0">
                <UserPlus size={24} />
              </div>
              <h2 className="text-3xl font-black italic uppercase leading-none">
                NEW TO<br />SCANECT?
              </h2>
            </div>
            <p className="font-black lowercase italic opacity-70 mb-8 text-sm leading-tight">
              "create your profile to join the network. you'll get a unique ID and password to log in from next time."
            </p>
            <button
              onClick={onNewUser}
              className="w-full bg-black text-[#ffb703] border-4 border-black py-4 font-black text-xl italic flex items-center justify-center gap-3 group hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_#000]"
            >
              CREATE PROFILE
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </button>
          </div>

          {/* Info box: what the access key is for */}
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
            <h3 className="text-lg font-black italic uppercase mb-4 border-b-4 border-black pb-3">
              ACCESS KEYS?
            </h3>
            <div className="space-y-3 text-sm font-black lowercase italic opacity-70">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-primary border-2 border-black shrink-0 mt-1" />
                <p><span className="not-italic opacity-100 text-black uppercase">admin key</span> — unlocks all pages including settings &amp; analytics.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#ffb703] border-2 border-black shrink-0 mt-1" />
                <p><span className="not-italic opacity-100 text-black uppercase">organiser key</span> — unlocks event creation, registration &amp; analytics.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-secondary border-2 border-black shrink-0 mt-1" />
                <p><span className="not-italic opacity-100 text-black uppercase">no key</span> — normal user access: events, profile, matched profiles &amp; policy.</p>
              </div>
            </div>
          </div>

          {/* Platform status badge */}
          <div className="flex items-center gap-4 px-6 py-4 border-4 border-black bg-[#fffdf2] shadow-[6px_6px_0px_#000]">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse border-2 border-black shrink-0" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">SCANECT v3 · SYSTEM LIVE · DELHI CLUSTER</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
