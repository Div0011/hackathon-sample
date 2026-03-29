import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, ArrowLeft, CheckCircle, Info, Link, Code, Globe, User, Star, MessageSquare, Target, Settings, Brain, Sparkles, Send } from 'lucide-react';



interface ProfileCreationViewProps {
  onNavigate: (view: any) => void;
}

export const ProfileCreationView: React.FC<ProfileCreationViewProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    yearOfStudy: '',
    branch: '',
    // Step 2
    linkedin: '',
    github: '',
    portfolio: '',
    // Step 3
    domains: [] as string[],
    techStack: [] as string[],
    experience: '',
    workingOn: '',
    // Step 4
    profileSummary: '',
    goalSummary: '',
    interestSummary: '',
    projects: '',
    // Step 5
    networkingReason: '',
    lookingFor: [] as string[],
    interactionStyle: '',
    communicationPreference: '',
    // Step 6
    availability: '',
    personalityType: '',
    openTo: [] as string[],
    dreamRole: '',
    // Step 7
    problemsToSolve: '',
    valueToOffer: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const domainsList = ['AI/ML', 'Web Dev', 'App Dev', 'UI/UX', 'Cloud', 'Cybersecurity', 'Blockchain', 'Data Science', 'IoT', 'AR/VR'];
  const techStackList = ['React', 'Next.js', 'Typescript', 'Python', 'Node.js', 'Golang', 'Rust', 'Swift', 'Kotlin', 'AWS', 'Docker', 'Firebase', 'Figma', 'Solidity'];
  const lookingForList = ['Mentors', 'Mentees', 'Collaborators', 'Founders', 'Investors', 'Hiring Managers', 'Peers'];
  const openToList = ['Internships', 'Full-time', 'Freelance', 'Hackathons', 'Open Source', 'Partnerships'];

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Required';
      if (!formData.email) newErrors.email = 'Required';
      if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Required';
      if (!formData.branch) newErrors.branch = 'Required';
    } else if (currentStep === 2) {
      if (!formData.linkedin) newErrors.linkedin = 'LinkedIn URL is required';
    } else if (currentStep === 3) {
      if (formData.domains.length === 0) newErrors.domains = 'Select at least one domain';
      if (!formData.experience) newErrors.experience = 'Select experience level';
      if (!formData.workingOn) newErrors.workingOn = 'Required';
    } else if (currentStep === 4) {
      if (!formData.profileSummary) newErrors.profileSummary = 'Required';
      if (!formData.goalSummary) newErrors.goalSummary = 'Required';
      if (!formData.interestSummary) newErrors.interestSummary = 'Required';
    } else if (currentStep === 5) {
      if (!formData.networkingReason) newErrors.networkingReason = 'Required';
    } else if (currentStep === 7) {
      if (!formData.problemsToSolve) newErrors.problemsToSolve = 'Required';
      if (!formData.valueToOffer) newErrors.valueToOffer = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleArrayItem = (listName: 'domains' | 'techStack' | 'lookingFor' | 'openTo', item: string) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].includes(item) 
        ? prev[listName].filter(i => i !== item) 
        : [...prev[listName], item]
    }));
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    if (validateStep(step)) {
      setIsSubmitted(true);
    }
  };

  const handleSendPrompt = () => {
    const prompt = 'My networking profile form is complete. Based on what I filled in, help me write a polished AI-generated profile bio I can use for networking.';
    if ((window as any).sendPrompt) {
      (window as any).sendPrompt(prompt);
    } else {
      console.log('Prompt:', prompt);
    }
    onNavigate('recommendations');
  };

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
          <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">PROFILE <span className="bg-black text-[#185FA5] not-italic px-4">CREATED!</span></h1>

          <p className="text-xl md:text-2xl font-black italic lowercase max-w-2xl mx-auto border-y-4 md:border-y-8 border-black py-6 md:py-10 mb-16 md:mb-24 scale-x-110">
             "your profile is now active. you can now generate your networking bio."
          </p>


          <button 
            onClick={handleSendPrompt}
            className="btn-premium px-12 py-6 text-2xl md:text-4xl shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000] transition-all flex items-center gap-4 mx-auto font-black italic"
          >
            Generate my profile bio
            <Send size={32} />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-20 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-x-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Progress Tracker */}
        <div className="mb-16 md:mb-24">
           <div className="flex justify-between items-end mb-6 font-black italic text-sm md:text-xl uppercase scale-x-105">
              <span>Step 0{step} // 07</span>
              <span className="text-primary tracking-widest">Completion Status: {Math.round((step/7)*100)}%</span>

           </div>
           <div className="h-6 md:h-12 w-full bg-white border-2 md:border-4 border-black shadow-[10px_10px_0px_#000] p-1 md:p-2">
              <motion.div 
                className="h-full bg-[#185FA5] flex items-center justify-end px-4" 
                initial={{ width: '14.28%' }}
                animate={{ width: `${(step/7)*100}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
              >
                 <Zap className="text-white hidden md:block" size={24} />
              </motion.div>
           </div>
        </div>

        <div className="relative bg-white border-2 md:border-8 border-black p-6 md:p-20 shadow-[10px_10px_0px_#000] md:shadow-[35px_35px_0px_#000]">
          
          <div className="absolute -top-6 md:-top-16 -left-6 md:-left-12 bg-black text-[#ffb703] border-2 md:border-4 border-black px-6 md:px-12 py-3 md:py-6 font-black text-2xl md:text-5xl italic shadow-[6px_6px_0px_#185FA5] rotate-[-3deg] z-20">
             STEP 0{step}//
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-12 md:space-y-16"
            >
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// FULL NAME</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-6 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                      placeholder="e.g. Alex Smith" 

                    />
                    {errors.fullName && <p className="text-primary font-black italic lowercase text-xs">!! {errors.fullName}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// EMAIL</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-6 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                      placeholder="alex@example.com" 

                    />
                    {errors.email && <p className="text-primary font-black italic lowercase text-xs">!! {errors.email}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// YEAR OF STUDY</label>
                    <select 
                      title="Year of Study"
                      value={formData.yearOfStudy}
                      onChange={e => setFormData({...formData, yearOfStudy: e.target.value})}
                      className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-6 font-black text-lg md:text-3xl outline-none"
                    >

                      <option value="">Select Year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduate</option>
                    </select>
                    {errors.yearOfStudy && <p className="text-primary font-black italic lowercase text-xs">!! {errors.yearOfStudy}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// BRANCH / STREAM</label>
                    <input 
                      type="text" 
                      value={formData.branch}
                      onChange={e => setFormData({...formData, branch: e.target.value})}
                      className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-6 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                      placeholder="e.g. Computer Science" 
                    />
                    {errors.branch && <p className="text-primary font-black italic lowercase text-xs">!! {errors.branch}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-12">
                  <div className="bg-surface-low border-2 md:border-4 border-black p-8 flex items-center gap-6 shadow-[8px_8px_0px_#000]">
                    <div className="p-4 bg-white border-2 border-black rotate-3">
                       <Globe className="text-[#185FA5]" size={40} />
                    </div>
                    <p className="text-sm md:text-xl font-black italic lowercase opacity-80 decoration-primary underline underline-offset-4 decoration-2">
                       "keep your professional profiles public for better networking opportunities."
                    </p>

                  </div>
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// LINKEDIN URL</label>
                      <input 
                        type="text" 
                        value={formData.linkedin}
                        onChange={e => setFormData({...formData, linkedin: e.target.value})}
                        className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                        placeholder="https://linkedin.com/in/yourhandle" 
                      />
                      {errors.linkedin && <p className="text-primary font-black italic lowercase text-xs">!! {errors.linkedin}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// GITHUB URL (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={formData.github}
                        onChange={e => setFormData({...formData, github: e.target.value})}
                        className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                        placeholder="https://github.com/yourhandle" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// PORTFOLIO (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={formData.portfolio}
                        onChange={e => setFormData({...formData, portfolio: e.target.value})}
                        className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                        placeholder="https://yourportfolio.com" 

                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12">
                   <div className="space-y-6">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// DOMAINS</label>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                         {domainsList.map(item => (
                           <button
                             key={item}
                             onClick={() => toggleArrayItem('domains', item)}
                             className={`p-4 border-2 md:border-4 border-black font-black text-xs uppercase transition-all shadow-[4px_4px_0px_#000] ${formData.domains.includes(item) ? 'bg-[#185FA5] text-white -translate-y-1 shadow-[8px_8px_0px_#000]' : 'bg-white hover:bg-surface-low'}`}
                           >
                             {item}
                           </button>
                         ))}
                      </div>
                      {errors.domains && <p className="text-primary font-black italic lowercase text-xs">!! {errors.domains}</p>}
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// TECH STACK</label>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                         {techStackList.map(item => (
                           <button
                             key={item}
                             onClick={() => toggleArrayItem('techStack', item)}
                             className={`p-4 border-2 md:border-4 border-black font-black text-xs uppercase transition-all shadow-[4px_4px_0px_#000] ${formData.techStack.includes(item) ? 'bg-[#185FA5] text-white -translate-y-1 shadow-[8px_8px_0px_#000]' : 'bg-white hover:bg-surface-low'}`}
                           >
                             {item}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// EXPERIENCE LEVEL</label>
                         <div className="flex flex-col gap-4">
                            {['Beginner', 'Intermediate', 'Advanced', 'Wizard'].map(lvl => (
                              <button
                                key={lvl}
                                onClick={() => setFormData({...formData, experience: lvl})}
                                className={`p-4 border-2 md:border-4 border-black text-left font-black text-lg md:text-2xl italic flex items-center gap-4 transition-all ${formData.experience === lvl ? 'bg-[#185FA5]/10 border-[#185FA5] shadow-[6px_6px_0px_#185FA5]' : 'bg-white shadow-[4px_4px_0px_#000]'}`}
                              >
                                <div className={`w-6 h-6 border-2 border-black ${formData.experience === lvl ? 'bg-[#185FA5]' : 'bg-white'}`} />
                                {lvl}
                              </button>
                            ))}
                         </div>
                         {errors.experience && <p className="text-primary font-black italic lowercase text-xs">!! {errors.experience}</p>}
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// CURRENTLY WORKING ON</label>
                         <textarea 
                           className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 h-40 md:h-full font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none" 
                           placeholder="What are you currently working on?"

                           value={formData.workingOn}
                           onChange={e => setFormData({...formData, workingOn: e.target.value})}
                         />
                         {errors.workingOn && <p className="text-primary font-black italic lowercase text-xs">!! {errors.workingOn}</p>}
                      </div>
                   </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// PROFILE SUMMARY</label>
                         <textarea 
                           className="w-full bg-white border-2 md:border-4 border-black p-4 h-48 font-black text-lg md:text-xl outline-none focus:bg-[#185FA5]/10" 
                           placeholder="Who are you in 3 sentences?"
                           value={formData.profileSummary}
                           onChange={e => setFormData({...formData, profileSummary: e.target.value})}
                         />
                         {errors.profileSummary && <p className="text-primary font-black italic lowercase text-xs">!! {errors.profileSummary}</p>}
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// GOAL SUMMARY</label>
                         <textarea 
                           className="w-full bg-white border-2 md:border-4 border-black p-4 h-48 font-black text-lg md:text-xl outline-none focus:bg-[#185FA5]/10" 
                           placeholder="What is your ultimate objective?"
                           value={formData.goalSummary}
                           onChange={e => setFormData({...formData, goalSummary: e.target.value})}
                         />
                         {errors.goalSummary && <p className="text-primary font-black italic lowercase text-xs">!! {errors.goalSummary}</p>}
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// INTEREST SUMMARY</label>
                         <textarea 
                           className="w-full bg-white border-2 md:border-4 border-black p-4 h-48 font-black text-lg md:text-xl outline-none focus:bg-[#185FA5]/10" 
                           placeholder="What are your main interests?"

                           value={formData.interestSummary}
                           onChange={e => setFormData({...formData, interestSummary: e.target.value})}
                         />
                         {errors.interestSummary && <p className="text-primary font-black italic lowercase text-xs">!! {errors.interestSummary}</p>}
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// PROJECTS / EXPERIENCE (OPTIONAL)</label>
                      <textarea 
                        className="w-full bg-white border-2 md:border-4 border-black p-6 md:p-10 h-40 md:h-64 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                        placeholder="List your key projects and experience..."

                        value={formData.projects}
                        onChange={e => setFormData({...formData, projects: e.target.value})}
                      />
                   </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-8">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// MAIN NETWORKING REASON</label>
                         <div className="space-y-4">
                            {['Learning', 'Building', 'Hiring', 'Finding a Job', 'General Networking'].map(reason => (

                              <button
                                key={reason}
                                onClick={() => setFormData({...formData, networkingReason: reason})}
                                className={`w-full p-4 border-2 md:border-4 border-black text-left font-black text-lg transition-all ${formData.networkingReason === reason ? 'bg-[#185FA5] text-white' : 'bg-white'}`}
                              >
                                {reason}
                              </button>
                            ))}
                         </div>
                         {errors.networkingReason && <p className="text-primary font-black italic lowercase text-xs">!! {errors.networkingReason}</p>}
                      </div>
                      <div className="space-y-8">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// WHO ARE YOU LOOKING FOR?</label>
                         <div className="grid grid-cols-2 gap-4">
                            {lookingForList.map(item => (
                              <button
                                key={item}
                                onClick={() => toggleArrayItem('lookingFor', item)}
                                className={`p-4 border-2 md:border-4 border-black font-black text-xs uppercase transition-all ${formData.lookingFor.includes(item) ? 'bg-[#185FA5] text-white' : 'bg-white hover:bg-surface-low'}`}
                              >
                                {item}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t-4 border-black pt-12">
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// INTERACTION STYLE</label>
                         <select 
                           title="Interaction Style"
                           className="w-full bg-white border-4 border-black p-6 font-black text-lg md:text-2xl"
                           value={formData.interactionStyle}
                           onChange={e => setFormData({...formData, interactionStyle: e.target.value})}
                         >

                            <option value="">Select Style</option>
                            <option>Introvert (Digital Only)</option>
                            <option>Ambivert</option>
                            <option>Extrovert</option>

                         </select>
                      </div>
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// COMMUNICATION PREFERENCE</label>
                         <select 
                           title="Communication Preference"
                           className="w-full bg-white border-4 border-black p-6 font-black text-lg md:text-2xl"
                           value={formData.communicationPreference}
                           onChange={e => setFormData({...formData, communicationPreference: e.target.value})}
                         >

                            <option value="">Select Pref</option>
                            <option>Async (Text/Mail)</option>
                            <option>Real-time (Video/Call)</option>
                            <option>Physical (IRL Only)</option>
                         </select>
                      </div>
                   </div>
                </div>
              )}

              {step === 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4">
                   <div className="space-y-12">
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// AVAILABILITY</label>

                         <div className="space-y-4">
                            {['High (10+ hrs/wk)', 'Medium (5-10 hrs/wk)', 'Low (<5 hrs/wk)'].map(lvl => (
                              <button
                                key={lvl}
                                onClick={() => setFormData({...formData, availability: lvl})}
                                className={`w-full p-4 border-4 border-black text-left font-black text-xl transition-all ${formData.availability === lvl ? 'bg-[#185FA5] text-white shadow-[8px_8px_0px_#000]' : 'bg-white shadow-[4px_4px_0px_#000]'}`}
                              >
                                {lvl}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// PERSONALITY TYPE</label>
                         <div className="space-y-4">
                            {['Analyst', 'Diplomat', 'Sentinel', 'Explorer'].map(type => (
                              <button
                                key={type}
                                onClick={() => setFormData({...formData, personalityType: type})}
                                className={`w-full p-4 border-4 border-black text-left font-black text-xl transition-all ${formData.personalityType === type ? 'bg-secondary text-black shadow-[8px_8px_0px_#000]' : 'bg-white shadow-[4px_4px_0px_#000]'}`}
                              >
                                {type}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// OPEN-TO OPPORTUNITIES</label>
                         <div className="grid grid-cols-2 gap-4">
                            {openToList.map(item => (
                              <button
                                key={item}
                                onClick={() => toggleArrayItem('openTo', item)}
                                className={`p-4 border-4 border-black font-black text-xs uppercase tracking-tighter transition-all ${formData.openTo.includes(item) ? 'bg-[#185FA5] text-white shadow-[6px_6px_0px_#000]' : 'bg-white hover:bg-surface-low shadow-[3px_3px_0px_#000]'}`}
                              >
                                {item}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// DREAM ROLE</label>
                         <input 
                           type="text" 
                           value={formData.dreamRole}
                           onChange={e => setFormData({...formData, dreamRole: e.target.value})}
                           className="w-full bg-white border-4 border-black p-8 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10" 
                           placeholder="e.g. Software Engineer at OpenAI" 

                         />
                      </div>
                   </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-12">
                   <div className="bg-[#ffb703]/20 border-4 border-black p-8 flex items-start gap-6 shadow-[10px_10px_0px_#000] rotate-1">
                      <Brain className="text-secondary shrink-0" size={48} />
                      <p className="text-sm md:text-xl font-black italic lowercase leading-tight">
                         "the more detailed your input, the better matches we can provide. be specific."
                      </p>

                   </div>
                   <div className="grid grid-cols-1 gap-12">
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// PROBLEMS YOU WANT TO SOLVE</label>
                         <textarea 
                           className="w-full bg-white border-4 border-black p-8 md:p-12 h-56 md:h-72 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none" 
                           placeholder="What problems or challenges are you looking to solve?"

                           value={formData.problemsToSolve}
                           onChange={e => setFormData({...formData, problemsToSolve: e.target.value})}
                         />
                         {errors.problemsToSolve && <p className="text-primary font-black italic lowercase text-xs">!! {errors.problemsToSolve}</p>}
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// VALUE YOU CAN OFFER OTHERS</label>
                         <textarea 
                           className="w-full bg-white border-4 border-black p-8 md:p-12 h-56 md:h-72 font-black text-lg md:text-3xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none" 
                           placeholder="What value or skills can you offer to others?"

                           value={formData.valueToOffer}
                           onChange={e => setFormData({...formData, valueToOffer: e.target.value})}
                         />
                         {errors.valueToOffer && <p className="text-primary font-black italic lowercase text-xs">!! {errors.valueToOffer}</p>}
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-8 mt-20 md:mt-32">
            {step > 1 && (
              <button 
                onClick={handleBack}
                className="btn-outline flex-1 py-6 md:py-10 text-2xl md:text-4xl flex items-center justify-center gap-6 group"
              >
                <ArrowLeft className="group-hover:-translate-x-4 transition-transform" strokeWidth={5} />
                BACK

              </button>
            )}
            {step < 7 ? (
              <button 
                onClick={handleNext}
                className="btn-premium flex-1 py-6 md:py-10 text-2xl md:text-4xl flex items-center justify-center gap-6 group"
              >
                CONTINUE

                <ArrowRight className="group-hover:translate-x-4 transition-transform" strokeWidth={5} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="btn-premium flex-1 py-6 md:py-10 text-2xl md:text-4xl flex items-center justify-center gap-6 group !bg-[#185FA5]"
              >
                FINISH PROFILE

                <Zap className="group-hover:rotate-12 transition-transform" strokeWidth={5} />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
