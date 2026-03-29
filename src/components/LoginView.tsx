import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Mail, Lock, ArrowRight, Globe } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#fffdf2] px-6 md:px-12 overflow-hidden">
      {/* Background Cinematic Textures */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-12deg] translate-x-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        className="relative w-full max-w-xl z-10"
      >
        {/* Comic Sticker */}
        <div className="absolute -top-8 -right-8 bg-[#ffb703] border-4 border-black px-6 py-2 font-black text-xl rotate-[15deg] shadow-[8px_8px_0px_#000] z-20">
           {isRegister ? 'JOIN NOW!' : 'WELCOME BACK!'}

        </div>

        <div className="bg-white border-4 md:border-8 border-black p-8 md:p-12 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000]">
           <div className="flex items-center gap-6 mb-10 md:mb-12">
              <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center text-white shrink-0">
                 <Fingerprint size={40} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-stroke leading-none uppercase">
                 {isRegister ? 'SIGN UP//' : 'LOGIN//'}

              </h1>
           </div>

           <div className="space-y-8">
              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// EMAIL ADDRESS</label>

                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                    <input 
                      type="email" 
                      className="w-full bg-white border-4 border-black p-5 pl-14 font-black text-xl outline-none focus:bg-[#feff9c] transition-all" 
                      placeholder="yourname@example.com"

                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-[0.4em] opacity-40 ml-1">// PASSWORD</label>

                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                    <input 
                      type="password" 
                      className="w-full bg-white border-4 border-black p-5 pl-14 font-black text-xl outline-none focus:bg-[#feff9c] transition-all" 
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              <button 
                onClick={onLogin}
                className="btn-premium w-full py-6 md:py-8 text-2xl md:text-3xl italic flex items-center justify-center gap-4 group"
              >
                 {isRegister ? 'CREATE ACCOUNT!' : 'LOG IN!'}

                 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="flex items-center gap-4 py-4">
                 <div className="flex-1 h-1 bg-black/10" />
                 <span className="text-[10px] font-black opacity-30 tracking-[0.4em]">EXTERNAL AUTH</span>
                 <div className="flex-1 h-1 bg-black/10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button title="Login with GitHub" className="h-16 border-4 border-black flex items-center justify-center font-black italic hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000]">
                    GITHUB
                 </button>
                 <button title="Login with Google" className="h-16 border-4 border-black flex items-center justify-center font-black italic hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_#000]">
                    GOOGLE
                 </button>
              </div>

              <p className="text-center font-black mt-8 md:mt-10 lowercase italic opacity-60">
                 {isRegister ? 'Already part of the network?' : 'First time on the platform?'} 
 
                 <span 
                   onClick={() => setIsRegister(!isRegister)}
                   className="text-primary cursor-pointer underline ml-2 not-italic uppercase"
                 >
                   {isRegister ? 'Login here!' : 'Register now!'}
                 </span>
              </p>
           </div>
        </div>
      </motion.div>
    </section>
  );
};
