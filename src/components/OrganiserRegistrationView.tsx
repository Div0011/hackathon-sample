import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Mail, Phone, Building, Calendar, Users, MapPin, Lock, CheckCircle, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OrganiserRegistrationViewProps {
  onComplete: () => void;
  onBack: () => void;
}

export const OrganiserRegistrationView: React.FC<OrganiserRegistrationViewProps> = ({ onComplete, onBack }) => {
  const { submitOrganiserApplication, currentUser } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedToken, setSubmittedToken] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: currentUser?.profile?.fullName ?? '',
    email: currentUser?.profile?.email ?? '',
    phone: '',
    organisation: '',
    eventType: '',
    expectedAttendees: '',
    venue: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName) e.fullName = 'Required';
    if (!form.email) e.email = 'Required';
    if (!form.phone) e.phone = 'Required';
    if (!form.organisation) e.organisation = 'Required';
    if (!form.eventType) e.eventType = 'Required';
    if (!form.expectedAttendees) e.expectedAttendees = 'Required';
    if (!form.venue) e.venue = 'Required';
    if (!form.password) e.password = 'Required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.agreed) e.agreed = 'You must agree to the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const token = submitOrganiserApplication({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      organisation: form.organisation,
      eventType: form.eventType,
      expectedAttendees: form.expectedAttendees,
      venue: form.venue,
      password: form.password,
    });
    setSubmittedToken(token);
    setIsSubmitted(true);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(submittedToken).catch(() => {});
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // ── SUCCESS STATE ────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center bg-[#fffdf2] px-6 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          className="max-w-2xl w-full relative z-10"
        >
          <div className="bg-white border-4 md:border-8 border-black p-10 md:p-16 shadow-[20px_20px_0px_#000] md:shadow-[30px_30px_0px_#000]">
            <div className="w-20 h-20 bg-primary border-4 border-black flex items-center justify-center text-white mx-auto mb-10 shadow-[8px_8px_0px_#000] rotate-[-5deg]">
              <CheckCircle size={48} strokeWidth={2.5} />
            </div>

            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-stroke leading-none uppercase text-center mb-6">
              APPLICATION<br />SUBMITTED!
            </h1>

            <p className="font-black italic lowercase text-center opacity-60 mb-12 text-lg border-y-4 border-black py-6">
              "your organiser application has been received. once verified, your unique organiser ID will be sent to{' '}
              <span className="text-primary not-italic">{form.email}</span>."
            </p>

            {/* Pending Token */}
            <div className="bg-black text-[#feff9c] border-4 border-black p-6 mb-8 shadow-[8px_8px_0px_#185FA5]">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-50 mb-2">YOUR PENDING APPLICATION TOKEN</p>
              <p className="font-black text-2xl italic tracking-widest mb-3">{submittedToken}</p>
              <button onClick={handleCopyToken} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                {copiedToken ? <><Check size={10} /> COPIED!</> : <><Copy size={10} /> COPY TOKEN</>}
              </button>
            </div>

            <div className="bg-[#ffb703]/20 border-4 border-black p-6 mb-10">
              <p className="font-black text-sm uppercase tracking-widest mb-2">⚠ IMPORTANT: REMEMBER YOUR PASSWORD</p>
              <p className="font-black italic lowercase opacity-70 text-sm">
                "once you receive your organiser ID via email, use it together with the password you just set to log into scanect as an organiser."
              </p>
            </div>

            <button
              onClick={onComplete}
              className="btn-premium w-full py-6 text-2xl italic flex items-center justify-center gap-4 shadow-[8px_8px_0px_#000]"
            >
              BACK TO EVENTS
              <Zap size={24} />
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  // ── FORM STATE ───────────────────────────────────────────────────
  return (
    <section className="relative min-h-screen w-full bg-[#fffdf2] pt-24 pb-32 px-6 md:px-12 overflow-x-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <button
          onClick={onBack}
          className="mb-10 flex items-center gap-2 font-black italic uppercase tracking-wider hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          BACK TO EVENTS
        </button>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-block bg-[#ffb703] border-4 border-black px-6 py-2 font-black text-xs tracking-widest uppercase rotate-[-1deg] shadow-[6px_6px_0px_#000] mb-6">
            EVENT ORGANISER APPLICATION
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-4">
            BECOME AN<br />ORGANISER//
          </h1>
          <p className="font-black italic lowercase opacity-60 text-xl border-l-8 border-black pl-6 max-w-2xl">
            "fill in your details. once verified, your unique organiser ID will be emailed to you. use it with the password below to access organiser features."
          </p>
        </div>

        <div className="bg-white border-4 md:border-8 border-black p-8 md:p-16 shadow-[15px_15px_0px_#000] md:shadow-[30px_30px_0px_#000]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Full Name */}
            <Field label="// FULL NAME" icon={<Zap size={18} />} error={errors.fullName}>
              <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)}
                className="field-input" placeholder="Your full name" />
            </Field>

            {/* Email */}
            <Field label="// REGISTERED EMAIL" icon={<Mail size={18} />} error={errors.email}>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className="field-input" placeholder="your@email.com" />
            </Field>

            {/* Phone */}
            <Field label="// PHONE NUMBER" icon={<Phone size={18} />} error={errors.phone}>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                className="field-input" placeholder="+91 XXXXX XXXXX" />
            </Field>

            {/* Organisation */}
            <Field label="// ORGANISATION / COLLEGE" icon={<Building size={18} />} error={errors.organisation}>
              <input type="text" value={form.organisation} onChange={e => update('organisation', e.target.value)}
                className="field-input" placeholder="e.g. IIT Delhi Tech Society" />
            </Field>

            {/* Event Type */}
            <Field label="// EVENT TYPE" icon={<Calendar size={18} />} error={errors.eventType}>
              <select title="Event type" value={form.eventType} onChange={e => update('eventType', e.target.value)}
                className="field-input">
                <option value="">Select event type</option>
                <option>Hackathon</option>
                <option>Conference</option>
                <option>Workshop</option>
                <option>Networking Meetup</option>
                <option>Startup Pitch</option>
                <option>Tech Talk</option>
                <option>Other</option>
              </select>
            </Field>

            {/* Expected Attendees */}
            <Field label="// EXPECTED ATTENDEES" icon={<Users size={18} />} error={errors.expectedAttendees}>
              <select title="Expected attendees" value={form.expectedAttendees} onChange={e => update('expectedAttendees', e.target.value)}
                className="field-input">
                <option value="">Select range</option>
                <option>Under 50</option>
                <option>50–200</option>
                <option>200–500</option>
                <option>500–1000</option>
                <option>1000+</option>
              </select>
            </Field>

            {/* Venue */}
            <Field label="// VENUE / FORMAT" icon={<MapPin size={18} />} error={errors.venue} className="md:col-span-2">
              <input type="text" value={form.venue} onChange={e => update('venue', e.target.value)}
                className="field-input" placeholder="e.g. IIT Delhi Campus / Online / Hybrid" />
            </Field>

          </div>

          {/* Password Section */}
          <div className="mt-12 pt-10 border-t-4 border-black">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase mb-1">SET YOUR ORGANISER PASSWORD</h3>
                <p className="font-black italic lowercase opacity-50 text-sm">
                  "this password will be used with your organiser ID once it's issued. save it carefully!"
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label="// PASSWORD" error={errors.password}>
                <input type="password" value={form.password} onChange={e => update('password', e.target.value)}
                  className="field-input" placeholder="min. 6 characters" />
              </Field>
              <Field label="// CONFIRM PASSWORD" error={errors.confirmPassword}>
                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                  className="field-input" placeholder="repeat password" />
              </Field>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-10 border-t-4 border-black pt-8">
            <button
              onClick={() => update('agreed', !form.agreed)}
              className={`flex items-start gap-4 text-left transition-all ${form.agreed ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className={`w-8 h-8 border-4 border-black shrink-0 mt-1 transition-colors ${form.agreed ? 'bg-primary' : 'bg-white'}`} />
              <p className="font-black italic lowercase text-base">
                "i confirm that the information provided is accurate. i understand that my organiser id will be issued via email after verification and my password will be used for future logins."
              </p>
            </button>
            {errors.agreed && <p className="text-primary font-black italic text-xs mt-3">!! {errors.agreed}</p>}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="btn-premium w-full mt-12 py-7 text-2xl md:text-3xl italic flex items-center justify-center gap-4 group shadow-[10px_10px_0px_#000]"
          >
            SUBMIT APPLICATION
            <Zap className="group-hover:rotate-12 transition-transform" size={28} />
          </button>
        </div>
      </div>

      <style>{`.field-input { width: 100%; background: white; border: 4px solid black; padding: 16px 20px; font-weight: 900; font-size: 18px; font-style: italic; outline: none; font-family: inherit; text-transform: uppercase; transition: background 0.2s; } .field-input:focus { background: #feff9c; }`}</style>
    </section>
  );
};

const Field: React.FC<{ label?: string; icon?: React.ReactNode; error?: string; children: React.ReactNode; className?: string }> = ({ label, icon, error, children, className }) => (
  <div className={`space-y-3 ${className ?? ''}`}>
    {label && (
      <label className="flex items-center gap-2 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] opacity-50">
        {icon} {label}
      </label>
    )}
    {children}
    {error && <p className="text-primary font-black italic lowercase text-xs">!! {error}</p>}
  </div>
);
