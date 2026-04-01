import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Download, Share2, ArrowLeft, CheckCircle2, QrCode, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EventPassViewProps {
  event: {
    id: string;
    name: string;
    location: string;
    tag: string;
    color: string;
    desc: string;
  };
  onBack: () => void;
}

export const EventPassView: React.FC<EventPassViewProps> = ({ event, onBack }) => {
  const { currentUser } = useAuth();

  const handleDownload = () => {
    alert("Downloading your digital pass... (Simulated)");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Pass for ${event.name}`,
        text: `Check out my pass for ${event.name} on Scanect!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert("Sharing is not supported on this browser. Link copied to clipboard! (Simulated)");
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#fffdf2] flex flex-col font-display uppercase overflow-hidden py-24 px-6 md:px-12">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-secondary text-white px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000] rotate-[-2deg] mb-8">
            <CheckCircle2 size={24} />
            <span className="font-black text-xl italic italic">REGISTRATION SUCCESSFUL!</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-6">
            YOUR EVENT <span className="bg-primary text-white not-italic px-4">PASS//</span>
          </h1>
          <p className="text-lg md:text-2xl font-black italic opacity-60 lowercase max-w-2xl mx-auto border-l-8 border-black pl-8">
            "your digital entry permit has been dispatched to {currentUser?.registeredEmail || 'your registered email'}. show the qr code at the venue."
          </p>
        </motion.div>

        {/* THE PASS (Comic style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white border-8 border-black shadow-[30px_30px_0px_#000] overflow-hidden mb-16"
        >
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-black flex items-center justify-center px-4">
             <span className="text-[10px] text-white font-black tracking-[0.5em]">SCANECT v3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: QR & Meta */}
            <div className="md:col-span-4 bg-black p-8 flex flex-col items-center justify-center border-b-8 md:border-b-0 md:border-r-8 border-black">
               <div className="bg-white p-4 border-4 border-primary shadow-[8px_8px_0px_var(--primary)] mb-8">
                  <QrCode size={140} strokeWidth={1.5} className="text-black" />
               </div>
               <div className="text-white text-center">
                  <p className="text-[10px] opacity-40 font-black tracking-widest mb-2">// UNIQUE PASS ID</p>
                  <p className="font-black text-xl text-primary italic leading-none">{currentUser?.uniqueId || 'SCN-GUEST'}</p>
               </div>
            </div>

            {/* Right: Event Info */}
            <div className="md:col-span-8 p-8 md:p-12 relative">
               <div className="absolute top-8 right-8 bg-[#ffb703] border-4 border-black px-4 py-1 font-black text-sm rotate-12 shadow-[4px_4px_0px_#000]">
                  {event.tag}
               </div>

               <p className="text-primary font-black text-lg tracking-[0.3em] mb-4 italic lowercase">// event credential</p>
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none mb-8 uppercase text-stroke">
                  {event.name}
               </h2>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <div>
                    <label className="text-[10px] opacity-40 font-black tracking-widest mb-2 block">// ATTENDEE</label>
                    <p className="font-black text-xl italic uppercase leading-none">{currentUser?.profile?.fullName || 'ANONYMOUS USER'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] opacity-40 font-black tracking-widest mb-2 block">// LOCATION</label>
                    <p className="font-black text-xl italic uppercase leading-none">{event.location}</p>
                  </div>
               </div>

               <div className="border-t-4 border-black pt-8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black tracking-widest opacity-40">// SYSTEM STATUS</p>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-xs font-black">VALIDATED</span>
                    </div>
                  </div>
                  <Ticket size={48} className="opacity-10 -rotate-12" />
               </div>
            </div>
          </div>

          {/* Perforation Effect */}
          <div className="absolute top-1/2 left-0 w-8 h-16 bg-[#fffdf2] border-r-8 border-y-8 border-black rounded-r-full -translate-y-1/2 hidden md:block" />
          <div className="absolute top-1/2 right-0 w-8 h-16 bg-[#fffdf2] border-l-8 border-y-8 border-black rounded-l-full -translate-y-1/2 hidden md:block" />
        </motion.div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-6 justify-center">
          <button
            onClick={handleDownload}
            className="btn-premium px-8 py-5 text-xl italic flex items-center gap-3 shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000]"
          >
            <Download size={24} /> DOWNLOAD PASS
          </button>
          
          <button
            onClick={handleShare}
            className="bg-white border-4 border-black px-8 py-5 text-xl font-black italic flex items-center gap-3 shadow-[10px_10px_0px_#000] hover:shadow-[15px_15px_0px_#000] hover:bg-black hover:text-white transition-all"
          >
            <Share2 size={24} /> SHARE PASS
          </button>

          <button
            onClick={onBack}
            className="w-full md:w-auto bg-black text-[#ffb703] px-10 py-5 text-xl font-black italic flex items-center justify-center gap-3 shadow-[10px_10px_0px_#000] hover:bg-white hover:text-black transition-all"
          >
            <ArrowLeft size={24} /> GO BACK TO EVENTS
          </button>
        </div>

        <div className="mt-16 text-center">
           <div className="inline-flex items-center gap-3 opacity-30">
              <Mail size={16} />
              <p className="text-[10px] font-black tracking-widest">A CONFIRMATION COPY HAS BEEN SENT TO YOUR INBOX</p>
           </div>
        </div>
      </div>
    </section>
  );
};
