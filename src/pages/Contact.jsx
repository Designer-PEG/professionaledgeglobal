import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, Check, Clock } from "lucide-react";
import useSEO from '../hooks/useSEO';

const Contact = () => {
  useSEO(
    "Contact Us | Get Started",
    "Get in touch with Professional Edge Global. Schedule a free corporate consultation or request pricing details for accounting, compliance, and marketing advisory."
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "accounting-consulting",
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const DISPOSABLE_EMAIL_DOMAINS = [
    'yopmail.com', 'mailinator.com', 'tempmail.com', 'guerrillamail.com',
    '10minutemail.com', 'trashmail.com', 'fakeinbox.com', 'temp-mail.org', 'test.com', 'admin.com',
    'example.com', 'demo.com', 'fakemail.com', 'maildrop.cc', 'getnada.com', 'throwawaymail.com',
    'mytemp.email', 'mailnesia.com', 'spambox.us', 'spamgourmet.com', 'spambog.com', 'spambox.me', 'mailcatch.com', 'temp-mail.io', 'mail-temp.com'
  ];
  
  const BLOCKED_KEYWORDS = ['test', 'admin', 'temp', 'example', 'demo', 'fake'];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const storedTimer = localStorage.getItem('contactFormTimer');
    if (storedTimer) {
      const remainingTime = calculateRemainingTime(storedTimer);
      if (remainingTime > 0) {
        setTimerActive(true);
        setTimeLeft(remainingTime);
        startCountdown(remainingTime);
      } else {
        localStorage.removeItem('contactFormTimer');
      }
    }
  }, []);

  const calculateRemainingTime = (storedTime) => {
    const now = new Date().getTime();
    const endTime = parseInt(storedTime, 10);
    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  const startCountdown = (initialTime) => {
    let time = initialTime;
    const timer = setInterval(() => {
      time -= 1;
      setTimeLeft(time);
      
      if (time <= 0) {
        clearInterval(timer);
        setTimerActive(false);
        localStorage.removeItem('contactFormTimer');
      }
    }, 1000);
    
    return () => clearInterval(timer);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (currentStep === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service category';
      }
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      if (formData.company.trim()) {
        const companyLower = formData.company.toLowerCase();
        if (BLOCKED_KEYWORDS.some(keyword => companyLower.includes(keyword))) {
          newErrors.company = 'Please provide a valid company name';
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        const domain = formData.email.split('@')[1].toLowerCase();
        if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
          newErrors.email = 'Disposable email addresses are not allowed';
        }
      }
      if (!formData.message.trim()) {
        newErrors.message = 'Inquiry details are required';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }
      if (timerActive) {
        newErrors.form = `Please wait ${formatTime(timeLeft)} before submitting another message.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxPingtSPIPmWQnzicm3MTKNEKJkAcxbY3z-ytPYm15319ZP1pAu_kh_5YvqG35CxoP/exec';
      
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('name', formData.name);
      formDataEncoded.append('email', formData.email);
      formDataEncoded.append('company', formData.company || 'Individual');
      formDataEncoded.append('message', `[Selected Service: ${formData.serviceType}] - ${formData.message}`);

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataEncoded,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const result = await response.json();

      if (result.result === 'success') {
        setSubmitSuccess(true);
        setFormData({ serviceType: "accounting-consulting", name: "", company: "", email: "", message: "" });
        setStep(1);
        
        const now = new Date();
        const oneHourLater = now.getTime() + 60 * 60 * 1000;
        localStorage.setItem('contactFormTimer', oneHourLater.toString());
        setTimerActive(true);
        setTimeLeft(3600);
        startCountdown(3600);
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({
        ...prev,
        form: `Submission error: ${error.message}. Please try again or email us directly.`
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-white font-sans">
      
      {/* Page Header */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Connect With Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
              Request an Advisory Consultation
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Have a financial audit, tax compliance, ERP implementation, or digital strategy inquiry? Complete our brief intake form to connect with a managing partner.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Corporate Contacts Directory */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2 pb-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  Corporate Office &amp; Direct Lines
                </h2>
                <p className="text-sm text-slate-500">
                  Reach our Kathmandu headquarters directly during standard business hours.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {/* Email */}
                <div className="py-5 first:pt-0 flex gap-4 items-start">
                  <div className="text-brand-blue mt-0.5 flex-shrink-0">
                    <Mail size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email Address
                    </p>
                    <a 
                      href="mailto:professionaledgeglobal@gmail.com"
                      className="text-sm font-medium text-slate-900 hover:text-brand-blue transition-colors mt-1 block"
                    >
                      professionaledgeglobal@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="py-5 flex gap-4 items-start">
                  <div className="text-brand-blue mt-0.5 flex-shrink-0">
                    <Phone size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Advisory Desk
                    </p>
                    <div className="text-sm font-medium text-slate-900 mt-1 space-y-1">
                      <p>+977 (98) 61171768</p>
                      <p>+977 (98) 51135421</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="py-5 flex gap-4 items-start">
                  <div className="text-brand-blue mt-0.5 flex-shrink-0">
                    <MapPin size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Headquarters
                    </p>
                    <p className="text-sm font-medium text-slate-900 mt-1 leading-relaxed">
                      Tinkune, Kathmandu 44600<br />
                      Bagmati Province, Nepal
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="py-5 last:pb-0 flex gap-4 items-start">
                  <div className="text-brand-blue mt-0.5 flex-shrink-0">
                    <Clock size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Consultation Hours
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Sunday – Friday: 9:30 AM – 6:00 PM (NPT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Step Consultation Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-md p-6 sm:p-10 shadow-2xs">
              
              {/* Stepper Header */}
              <div className="grid grid-cols-3 gap-2 pb-6 border-b border-slate-200 mb-8">
                {[
                  { num: 1, label: 'Practice Area' },
                  { num: 2, label: 'Organization' },
                  { num: 3, label: 'Inquiry Scope' }
                ].map((s) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <div 
                      key={s.num} 
                      className={`pt-2.5 border-t-2 transition-colors ${
                        isActive 
                          ? 'border-brand-blue' 
                          : isDone 
                          ? 'border-brand-green' 
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-mono font-semibold ${
                          isActive ? 'text-brand-blue' : isDone ? 'text-brand-green' : 'text-slate-400'
                        }`}>
                          {isDone ? <Check size={13} /> : `0${s.num}`}
                        </span>
                        <span className={`text-xs font-semibold truncate ${
                          isActive ? 'text-slate-900' : 'text-slate-500'
                        }`}>
                          {s.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {submitSuccess && (
                <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-sm font-medium mb-6 flex items-center gap-2.5">
                  <Check className="text-brand-green flex-shrink-0" size={18} />
                  <span>Thank you. Your consultation request has been submitted and assigned to our advisory desk.</span>
                </div>
              )}

              {errors.form && (
                <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-md text-xs font-medium mb-6">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Select Service Category */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Which practice area does your inquiry align with?
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Select the primary discipline for your consultation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {[
                        { id: 'accounting-consulting', label: 'Accounting & Consultation' },
                        { id: 'tax-advisory', label: 'Expert Tax Advisory' },
                        { id: 'startup-diagnostic', label: 'Startup Health Check-up' },
                        { id: 'bpo-kpo-services', label: 'BPO / KPO Offshoring' },
                        { id: 'corporate-legal-support', label: 'Corporate Legal Support' },
                        { id: 'market-research', label: 'Creative & Digital SEO' },
                        { id: 'erp-implementation', label: 'ERP Support & Odoo' },
                        { id: 'hr-outsourcing', label: 'HR Outsourcing & Coaching' }
                      ].map((svc) => {
                        const isSelected = formData.serviceType === svc.id;
                        return (
                          <label 
                            key={svc.id}
                            className={`flex items-center gap-3 p-3.5 border rounded-md cursor-pointer transition-colors ${
                              isSelected 
                                ? 'border-brand-blue bg-slate-50 text-slate-900' 
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="serviceType" 
                              value={svc.id} 
                              checked={isSelected}
                              onChange={handleChange}
                              className="text-brand-blue focus:ring-brand-blue w-4 h-4"
                            />
                            <span className="text-sm font-medium">{svc.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: User and Company Details */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Your Contact &amp; Organization Details
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Provide your name and organization so we can prepare for your call.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className={`w-full px-3.5 py-2.5 border rounded-md focus:outline-none focus:ring-2 text-sm text-slate-900 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500/15' 
                            : 'border-slate-300 focus:border-brand-blue focus:ring-brand-blue/15'
                        }`} 
                        placeholder="e.g. Rajesh Shrestha" 
                        required 
                      />
                      {errors.name && <p className="text-xs text-red-600 font-medium mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Company / Organization Name (Optional)
                      </label>
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        className={`w-full px-3.5 py-2.5 border rounded-md focus:outline-none focus:ring-2 text-sm text-slate-900 ${
                          errors.company 
                            ? 'border-red-500 focus:ring-red-500/15' 
                            : 'border-slate-300 focus:border-brand-blue focus:ring-brand-blue/15'
                        }`} 
                        placeholder="e.g. Himalayan Enterprises Pvt. Ltd." 
                      />
                      {errors.company && <p className="text-xs text-red-600 font-medium mt-1">{errors.company}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Message Submissions */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Inquiry Scope &amp; Objectives
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Share your work email and a brief summary of your requirements.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Work Email Address *
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`w-full px-3.5 py-2.5 border rounded-md focus:outline-none focus:ring-2 text-sm text-slate-900 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500/15' 
                            : 'border-slate-300 focus:border-brand-blue focus:ring-brand-blue/15'
                        }`} 
                        placeholder="name@company.com" 
                        required 
                      />
                      {errors.email && <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Project or Advisory Requirements *
                      </label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleChange} 
                        className={`w-full px-3.5 py-2.5 border rounded-md focus:outline-none focus:ring-2 text-sm text-slate-900 ${
                          errors.message 
                            ? 'border-red-500 focus:ring-red-500/15' 
                            : 'border-slate-300 focus:border-brand-blue focus:ring-brand-blue/15'
                        }`} 
                        placeholder="Outline your timeline, current operational challenges, or compliance questions..." 
                        required 
                      />
                      {errors.message && <p className="text-xs text-red-600 font-medium mt-1">{errors.message}</p>}
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={handleBack} 
                      className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1.5"
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="px-5 py-2.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting || timerActive}
                      className={`px-6 py-2.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium rounded-md transition-colors ${
                        isSubmitting || timerActive ? 'opacity-55 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : timerActive ? `Wait ${formatTime(timeLeft)}` : 'Submit Consultation Request'}
                    </button>
                  )}
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
