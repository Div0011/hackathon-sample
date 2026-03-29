import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Tag, FileText, ArrowRight, CheckCircle } from 'lucide-react';

interface EventCreationViewProps {
  onComplete: () => void;
}

export const EventCreationView: React.FC<EventCreationViewProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    domains: [] as string[],
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const domains = ['Tech', 'Design', 'Business', 'Health', 'Education', 'Arts & Culture', 'Science', 'Social Impact', 'Gaming', 'Other'];

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.includes(domain) 
        ? prev.domains.filter(d => d !== domain) 
        : [...prev.domains, domain]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.domains.length === 0) newErrors.domains = 'Select at least one domain';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleSendPrompt = () => {
    const prompt = `An event organiser just submitted their event details. Use the submitted event name: ${formData.name}, date: ${formData.date}, location: ${formData.location}, domain: ${formData.domains.join(', ')}, and description: ${formData.description} to write a polished event announcement post they can share on LinkedIn and WhatsApp.`;
    if ((window as any).sendPrompt) {
      (window as any).sendPrompt(prompt);
    } else {
      console.log('Prompt:', prompt);
      alert('Prompt sent to AI: ' + prompt.slice(0, 100) + '...');
    }
    onComplete();
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
          <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">EVENT <span className="bg-black text-[#ffb703] not-italic px-4">CREATED//</span></h1>
          <p className="text-xl md:text-2xl font-black italic lowercase max-w-2xl mx-auto border-y-4 md:border-y-8 border-black py-6 md:py-10 mb-16 md:mb-24 scale-x-110">
             "your event has been created. attendees can now join."


          </p>

          <button 
            onClick={handleSendPrompt}
            className="btn-premium px-12 py-6 text-2xl md:text-4xl shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000] transition-all flex items-center gap-4 mx-auto"
          >
            Generate event announcement ↗️
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 bg-[#fffdf2] overflow-x-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        <header className="mb-12 md:mb-20 text-center md:text-left">
           <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
              <span className="bg-[#185FA5] text-white px-4 py-1 font-black text-xs tracking-widest uppercase rotate-[-2deg]">Event Registration</span>
           </div>
           <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-4">
              Tell us about your event.
           </h1>
           <p className="text-lg md:text-2xl font-bold italic opacity-40 lowercase">
              "share your event with the networking platform."

           </p>
        </header>

        <form onSubmit={handleSubmit} className="relative bg-white border-2 md:border-8 border-black p-6 md:p-16 shadow-[10px_10px_0px_#000] md:shadow-[30px_30px_0px_#000] space-y-10 md:space-y-16">
          
          {/* Event Name - Large */}
          <div className="space-y-3">
            <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// EVENT NAME</label>
            <input 
              title="Event Name"
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white border-2 md:border-4 border-black p-4 md:p-8 font-black text-xl md:text-3xl outline-none focus:bg-[#185FA5]/10 focus:ring-4 focus:ring-[#185FA5]/20 transition-all placeholder:opacity-20" 
              placeholder="e.g. Networking Mixer" 


            />

            {errors.name && <p className="text-[#e63946] font-black italic lowercase text-sm mt-2">!! {errors.name}</p>}
          </div>

          {/* Date & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-3">
              <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// DATE</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
                <input 
                  title="Event Date"
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white border-2 md:border-4 border-black p-4 pl-12 md:p-6 md:pl-16 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all" 
                />

              </div>
              {errors.date && <p className="text-[#e63946] font-black italic lowercase text-sm mt-2">!! {errors.date}</p>}
            </div>
            <div className="space-y-3">
              <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-tertiary">// LOCATION</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
                <input 
                  title="Event Location"
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white border-2 md:border-4 border-black p-4 pl-12 md:p-6 md:pl-16 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all placeholder:opacity-20" 
                  placeholder="e.g. IIT Delhi or Virtual"
                />

              </div>
              {errors.location && <p className="text-[#e63946] font-black italic lowercase text-sm mt-2">!! {errors.location}</p>}
            </div>
          </div>

          {/* Domain Chips */}
          <div className="space-y-6">
            <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">// DOMAIN SELECTION</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {domains.map(domain => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => toggleDomain(domain)}
                  className={`p-4 md:p-6 border-2 md:border-4 border-black font-black text-xs md:text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none ${
                    formData.domains.includes(domain) 
                      ? 'bg-[#185FA5] text-white -translate-y-1 shadow-[8px_8px_0px_#000]' 
                      : 'bg-white text-black hover:bg-surface-low'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
            {errors.domains && <p className="text-[#e63946] font-black italic lowercase text-sm mt-2">!! {errors.domains}</p>}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-secondary">// DESCRIPTION</label>
            <div className="relative">
              <FileText className="absolute left-4 top-6 opacity-30 pointer-events-none" />
              <textarea 
                title="Event Description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border-2 md:border-4 border-black p-4 pl-12 md:p-8 md:pl-16 h-40 md:h-64 font-black text-lg md:text-2xl outline-none focus:bg-[#185FA5]/10 transition-all resize-none placeholder:opacity-20" 
                placeholder="Describe your event — what's it about, who should attend, what will they gain?"
              />

            </div>
            {errors.description && <p className="text-[#e63946] font-black italic lowercase text-sm mt-2">!! {errors.description}</p>}
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="btn-premium w-full py-6 md:py-10 text-2xl md:text-5xl shadow-[6px_6px_0px_#000] md:shadow-[15px_15px_0px_#000] hover:shadow-[12px_12px_0px_#000] md:hover:shadow-[25px_25px_0px_#000] transition-all flex items-center justify-center gap-6"
          >
             CREATE EVENT →
          </button>
        </form>

      </div>
    </section>
  );
};
