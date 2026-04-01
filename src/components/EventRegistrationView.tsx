import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, ArrowLeft, CheckCircle, Info, Sparkles, User, Database, Target, Mail, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EventRegistrationViewProps {
  event: {
    id: string;
    name: string;
    location: string;
    tag: string;
    color: string;
    desc: string;
  };
  onComplete: () => void;
}

export const EventRegistrationView: React.FC<EventRegistrationViewProps> = ({ event, onComplete }) => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(true);
  
  const [formData, setFormData] = useState({
    eventId: event.id,
    userId: currentUser?.uniqueId || '',
    fullName: currentUser?.profile?.fullName || '',
    email: currentUser?.registeredEmail || '',
    connectWith: '',
    whyAttend: '',
    useCase: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (step === 3 && mode === 'ai') {
      setIsAIAnalyzing(true);
      const timer = setTimeout(() => setIsAIAnalyzing(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [step, mode]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.eventId) newErrors.eventId = 'Event ID is required';
      if (!formData.userId) newErrors.userId = 'User ID is required';
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
    } else if (step === 2) {
      if (!formData.connectWith) newErrors.connectWith = 'Please describe who you want to connect with';
      if (!formData.whyAttend) newErrors.whyAttend = 'Please describe why you want to attend';
    } else if (step === 3) {
      if (!formData.useCase) newErrors.useCase = 'Please select a use case';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  const handleSendPrompt = () => {
    const prompt = `A user just registered for an event. Their intent was to connect with: ${formData.connectWith} and their reason for attending: ${formData.whyAttend}. Selected use case: ${formData.useCase}. Based on their registration answers, suggest what kind of attendee matches they are likely to get and how they should approach networking at this event.`;
    if ((window as any).sendPrompt) {
      (window as any).sendPrompt(prompt);
    } else {
      console.log('Prompt:', prompt);
    }
    onComplete();
  };

  const recommendations = [
    { id: 'collaborator', title: 'Project Collaborator', desc: 'Find teammates for your ongoing builds and projects.' },
    { id: 'seeker', title: 'Knowledge Seeker', desc: 'Connect with seniors, domain experts, and industry leaders.' },
    { id: 'hunter', title: 'Opportunity Hunter', desc: 'Find internships, freelance, or startup leads at the event.' }
  ];

  const chips = ['Project Collaborator', 'Knowledge Seeker', 'Opportunity Hunter', 'Mentor', 'Mentee', 'Hackathon Teammate', 'Startup Co-founder', 'Just Exploring'];

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen w-full pt-32 pb-20 px-6 md:px-12 bg-[#fffdf2] flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full text-center relative z-10"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-primary border-4 md:border-8 border-black flex items-center justify-center text-white mx-auto shadow-[10px_10px_0px_#000] md:shadow-[20px_20px_0px_#000] mb-12 rotate-[-5deg]">
             <CheckCircle size={60} strokeWidth={3} />
          </div>
          <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">CONFIRMED <span className="bg-black text-[#185FA5] not-italic px-4">JOINED!</span></h1>
          <p className="text-xl md:text-2xl font-black italic lowercase max-w-2xl mx-auto border-y-4 md:border-y-8 border-black py-6 md:py-10 mb-16 md:mb-24 scale-x-110">
             "your registration is locked. the event ticket will be shared to you at {formData.email} in a few seconds."
          </p>

          <button 
            onClick={onComplete}
            className="btn-premium px-12 py-6 text-2xl md:text-4xl shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000] transition-all flex items-center gap-4 mx-auto"
          >
            GET MY EVENT PASS ↗️
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-20 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-x-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-12 md:mb-16">
          <div className="flex justify-between items-end mb-4 font-black italic text-xs md:text-lg uppercase">
            <span>Step {step} of 3</span>
            <span className="text-primary">{Math.round((step/3)*100)}% Complete</span>
          </div>
          <div className="h-4 md:h-8 w-full bg-white border-2 md:border-4 border-black shadow-[4px_4px_0px_#000]">
            <motion.div 
              className="h-full bg-[#185FA5]" 
              initial={{ width: '33.33%' }}
              animate={{ width: `${(step/3)*100}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            />
          </div>
        </div>

        <header className="mb-12 md:mb-16 text-center md:text-left">
           <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
              <span className="bg-[#185FA5] text-white px-4 py-1 font-black text-xs tracking-widest uppercase rotate-[-2deg]">Event Hub</span>
              <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">// JOINING: {event.name}</span>
           </div>
           <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-4">
              {step === 1 ? 'Verify Your Info' : step === 2 ? 'Networking Intent' : 'Neural Matching'}
           </h1>
           <p className="text-lg md:text-2xl font-bold italic opacity-40 lowercase">
              "we've auto-filled what we know about you. just confirm and head to the next step."
           </p>
        </header>

        <div className="relative bg-white border-2 md:border-8 border-black p-6 md:p-14 shadow-[8px_8px_0px_#000] md:shadow-[25px_25px_0px_#000]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {step === 1 && (
                <div className="space-y-10">
                  <div className="bg-[#feff9c] border-2 md:border-4 border-black p-6 flex items-start gap-4 shadow-[5px_5px_0px_#000] rotate-[-1deg]">
                    <BadgeCheck className="text-black shrink-0" size={32} />
                    <p className="text-sm md:text-lg font-black lowercase opacity-70 italic leading-tight">
                      "scanect has recognized you. please verify these details to link your ticket."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// YOUR UNIQUE ID</label>
                      <div className="relative">
                        <Database className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                        <input 
                          type="text" 
                          value={formData.userId}
                          readOnly
                          className="w-full bg-surface-low border-2 md:border-4 border-black p-4 pl-12 md:p-6 md:pl-16 font-black text-lg md:text-2xl outline-none opacity-60" 
                          placeholder="Your ID" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// EVENT ID</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                        <input 
                          type="text" 
                          value={formData.eventId}
                          readOnly
                          className="w-full bg-surface-low border-2 md:border-4 border-black p-4 pl-12 md:p-6 md:pl-16 font-black text-lg md:text-2xl outline-none opacity-60" 
                          placeholder="Event ID" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// FULL NAME</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={e => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-6 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10" 
                          placeholder="Enter your name" 
                        />
                      </div>
                      {errors.fullName && <p className="text-primary font-black italic lowercase text-sm">!! {errors.fullName}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// EMAIL FOR TICKET</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white border-2 md:border-4 border-black p-4 pl-12 md:p-6 md:pl-16 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10" 
                          placeholder="your@email.com" 
                        />
                      </div>
                      {errors.email && <p className="text-primary font-black italic lowercase text-sm">!! {errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div className="bg-surface-low border-2 md:border-4 border-black p-6 flex items-start gap-4 shadow-[5px_5px_0px_#000]">
                    <Sparkles className="text-[#185FA5] shrink-0" size={32} />
                    <p className="text-sm md:text-lg font-black lowercase opacity-70 italic">
                      "your answers help our ai connect you with the most relevant attendees at the event."
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// WHO DO YOU WANT TO CONNECT WITH?</label>
                      <textarea 
                        value={formData.connectWith}
                        onChange={e => setFormData({...formData, connectWith: e.target.value})}
                        className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 h-40 md:h-56 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none" 
                        placeholder="Describe the kind of people you're hoping to meet — their domain, experience level, goals, or mindset."
                      />
                      {errors.connectWith && <p className="text-primary font-black italic lowercase text-sm">!! {errors.connectWith}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// WHY DO YOU WANT TO ATTEND THIS EVENT?</label>
                      <textarea 
                        value={formData.whyAttend}
                        onChange={e => setFormData({...formData, whyAttend: e.target.value})}
                        className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 h-40 md:h-56 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none" 
                        placeholder="What draws you to this event? What do you hope to learn, experience, or walk away with?"
                      />
                      {errors.whyAttend && <p className="text-primary font-black italic lowercase text-sm">!! {errors.whyAttend}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="flex justify-center p-2 bg-white border-4 border-black max-w-md mx-auto rounded-full shadow-[5px_5px_0px_#000]">
                    <button 
                      onClick={() => setMode('ai')}
                      className={`flex-1 py-3 px-6 rounded-full font-black text-xs md:text-sm transition-all ${mode === 'ai' ? 'bg-[#185FA5] text-white' : 'text-black hover:bg-surface-low'}`}
                    >
                      AI RECOMMEND
                    </button>
                    <button 
                      onClick={() => setMode('manual')}
                      className={`flex-1 py-3 px-6 rounded-full font-black text-xs md:text-sm transition-all ${mode === 'manual' ? 'bg-[#185FA5] text-white' : 'text-black hover:bg-surface-low'}`}
                    >
                      CHOOSE MYSELF
                    </button>
                  </div>

                  {mode === 'ai' ? (
                    <div className="space-y-6">
                      {isAIAnalyzing ? (
                        <div className="relative overflow-hidden bg-white border-4 border-black p-12 md:p-20 text-center shadow-[10px_10px_0px_#000]">
                          <div className="inline-block p-4 bg-primary/20 border-2 border-primary mb-8 animate-pulse text-primary">
                            <Sparkles size={48} />
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black italic text-stroke uppercase mb-4">AI Is Matching...</h3>
                          <div className="w-full max-w-sm mx-auto h-4 bg-surface-low border-2 border-black overflow-hidden mt-8">
                             <motion.div 
                               className="h-full bg-[#185FA5]"
                               initial={{ x: '-100%' }}
                               animate={{ x: '100%' }}
                               transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                             />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {recommendations.map(rec => (
                            <button
                              key={rec.id}
                              onClick={() => setFormData({...formData, useCase: rec.title})}
                              className={`text-left p-6 md:p-8 border-4 border-black transition-all shadow-[6px_6px_0px_#000] hover:-translate-y-2 ${formData.useCase === rec.title ? 'bg-[#185FA5]/10 border-[#185FA5] shadow-[12px_12px_0px_#185FA5]' : 'bg-white'}`}
                            >
                              <Target className={formData.useCase === rec.title ? 'text-[#185FA5]' : 'text-black'} size={32} />
                              <h4 className="text-xl font-black italic uppercase mt-6 mb-2">{rec.title}</h4>
                              <p className="text-xs font-bold lowercase opacity-60 leading-tight">{rec.desc}</p>
                              <div className={`mt-8 py-2 text-center font-black text-xs border-2 border-black ${formData.useCase === rec.title ? 'bg-[#185FA5] text-white' : 'bg-white text-black'}`}>
                                {formData.useCase === rec.title ? 'SELECTED' : 'SELECT'}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      {chips.map(chip => (
                        <button
                          key={chip}
                          onClick={() => setFormData({...formData, useCase: chip})}
                          className={`p-4 border-2 md:border-4 border-black font-black text-[10px] md:text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_#000] ${formData.useCase === chip ? 'bg-[#185FA5] text-white -translate-y-1 shadow-[8px_8px_0px_#000]' : 'bg-white hover:bg-surface-low'}`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.useCase && <p className="text-primary font-black italic lowercase text-sm text-center">!! {errors.useCase}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col md:flex-row gap-6 mt-16 md:mt-24">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="btn-outline flex-1 py-5 md:py-8 text-xl md:text-3xl flex items-center justify-center gap-4 group"
              >
                <ArrowLeft className="group-hover:-translate-x-2 transition-transform" strokeWidth={4} />
                BACK
              </button>
            )}
            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="btn-premium flex-1 py-5 md:py-8 text-xl md:text-3xl flex items-center justify-center gap-4 group"
              >
                VERIFY & CONTINUE
                <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={4} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="btn-premium flex-1 py-5 md:py-8 text-xl md:text-3xl flex items-center justify-center gap-4 group"
              >
                GENERATE TICKET →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
