import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Zap, Shield, Sparkles, Binary } from 'lucide-react';

interface ProfileCreationViewProps {
  onNavigate: (view: any) => void;
}

export const ProfileCreationView = ({ onNavigate }: ProfileCreationViewProps) => {
  const hubOptions = [
    {
      title: "Recommendations",
      desc: "Neural-matched peer discovery",
      icon: <Sparkles className="w-6 h-6" />,
      target: "recommendations",
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Neural Analytics",
      desc: "Deep-dive into performance clusters",
      icon: <Binary className="w-6 h-6" />,
      target: "analytics",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "The Lounge",
      desc: "Unstructured social synchronization",
      icon: <Users className="w-6 h-6" />,
      target: "lounge",
      color: "from-amber-500/20 to-orange-500/20"
    },

    {
      title: "Protocol Policy",
      desc: "Governance & aperture guidelines",
      icon: <Shield className="w-6 h-6" />,
      target: "policy",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <section className="relative min-h-screen w-full py-32 px-12 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        
        {/* Left: Identity Creation Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group h-full"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-[48px] blur-2xl opacity-50 transition duration-1000 group-hover:opacity-75" />
          <div className="relative glass p-12 rounded-[48px] border border-white/10 h-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-black text-background">P</div>
              <h1 className="text-4xl font-bold tracking-tighter">Profile Hub</h1>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white/90">Identity Matrix</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Aperture Handle</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 focus:border-primary/50 focus:bg-primary/5 transition-all outline-none text-white font-medium" 
                    placeholder="e.g. neuron_alpha" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Neural Bio</label>
                  <textarea 
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 h-40 focus:border-primary/50 focus:bg-primary/5 transition-all outline-none text-white font-medium resize-none" 
                    placeholder="Describe your biological focus and aperture goals..." 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Aperture Tier</label>
                    <select className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 appearance-none focus:border-primary/50 outline-none text-muted-foreground">
                      <option>Level 1 (Host)</option>
                      <option>Level 2 (Architect)</option>
                      <option>Level 3 (Observer)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Cluster</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 focus:border-primary/50 outline-none" placeholder="Default Alpha" />
                  </div>
                </div>

                <button className="btn-premium w-full py-6 rounded-2xl text-lg font-bold mt-4">
                  Initialize Neural Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Options to Other Pages */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-sm font-black text-primary tracking-[0.5em] uppercase mb-4">Neural Gateways</h2>
            <p className="text-muted text-lg max-w-md">
              Navigate through the different layers of the SCANECT ecosystem from your central identity hub.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {hubOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                onClick={() => onNavigate(option.target)}
                className={`group relative p-8 rounded-[32px] border border-white/5 bg-gradient-to-br ${option.color} hover:border-primary/30 cursor-pointer transition-all duration-500 hover:-translate-y-2 h-64 flex flex-col justify-between`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-muted text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    {option.desc}
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-8 glass rounded-[32px] border border-white/5 flex items-center gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
               <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Advanced Orchestration Enabled</p>
              <p className="text-xs text-muted">Your identity is secured by neural encryption.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
