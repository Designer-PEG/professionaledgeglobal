import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";

const Contact = () => {
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
      // Append fields. Format message to include selected service details
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
    <section id="contact" className="py-36 bg-slate-50 text-slate-800 font-sans relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none opacity-5" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="mb-20 space-y-4">
          <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Request an Advisory Consultation
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
            Have a financial, tax compliance, or corporate training inquiry? Use our smart questionnaire to details your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-10">
            <h3 className="text-lg font-extrabold text-slate-900 font-heading border-b border-slate-200 pb-4 tracking-wide uppercase">
              Corporate Contacts
            </h3>

            <div className="space-y-6">
              {/* Mail */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue shadow-3xs">
                  <FiMail size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">professionaledgeglobal@gmail.com</p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue shadow-3xs">
                  <FiPhone size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone Support</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-relaxed">
                    +977 (98) 61171768 <br />
                    +977 (98) 51135421
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue shadow-3xs">
                  <FiMapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Headquarters Office</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-relaxed">
                    Tinkune, Kathmandu <br />
                    Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-lg">
            
            {/* Stepper Status Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === s 
                      ? 'bg-brand-blue text-white shadow-sm ring-4 ring-brand-blue/15' 
                      : step > s 
                      ? 'bg-brand-green text-white' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s ? <FiCheck size={14} /> : s}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold hidden sm:block ${
                    step === s ? 'text-brand-blue' : 'text-slate-400'
                  }`}>
                    {s === 1 ? 'Services' : s === 2 ? 'Details' : 'Confirm'}
                  </span>
                </div>
              ))}
            </div>

            {submitSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold mb-6 flex items-center gap-2">
                <FiCheck className="text-brand-green flex-shrink-0" />
                <span>Thank you! Your consultation request has been submitted successfully.</span>
              </div>
            )}

            {errors.form && (
              <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs mb-6">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Service Category */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-sm font-extrabold text-slate-800 font-heading">Which service category does your request align with?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'accounting-consulting', label: 'Accounting & Consultation' },
                      { id: 'tax-advisory', label: 'Expert Tax Advisory' },
                      { id: 'startup-diagnostic', label: 'Startup Health check-up' },
                      { id: 'bpo-kpo-services', label: 'BPO / KPO Offshoring' },
                      { id: 'corporate-legal-support', label: 'Corporate Legal Support' },
                      { id: 'market-research', label: 'Creative & Digital SEO' },
                      { id: 'erp-implementation', label: 'ERP Support & Odoo' },
                      { id: 'hr-outsourcing', label: 'HR Outsourcing & coaching' }
                    ].map((svc) => (
                      <label 
                        key={svc.id}
                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-all ${
                          formData.serviceType === svc.id 
                            ? 'border-brand-blue bg-slate-50/50 ring-2 ring-brand-blue/10' 
                            : 'border-slate-200/80 bg-white'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="serviceType" 
                          value={svc.id} 
                          checked={formData.serviceType === svc.id}
                          onChange={handleChange}
                          className="text-brand-blue focus:ring-brand-blue w-4 h-4"
                        />
                        <span className="text-xs font-bold text-slate-700">{svc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: User and Company Details */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h4 className="text-sm font-extrabold text-slate-800 font-heading">Tell us about yourself</h4>
                  
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-blue'} text-xs sm:text-sm`} 
                      placeholder="John Doe" 
                      required 
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Company Name (Optional)</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 ${errors.company ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-blue'} text-xs sm:text-sm`} 
                      placeholder="e.g. Acme Tech" 
                    />
                    {errors.company && <p className="text-[10px] text-red-500 font-semibold">{errors.company}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Message Submissions */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h4 className="text-sm font-extrabold text-slate-800 font-heading">Inquiry & Details</h4>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-blue'} text-xs sm:text-sm`} 
                      placeholder="name@company.com" 
                      required 
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Message details *</label>
                    <textarea 
                      name="message" 
                      rows={4} 
                      value={formData.message} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-blue'} text-xs sm:text-sm`} 
                      placeholder="Describe your goals..." 
                      required 
                    />
                    {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <FiArrowLeft />
                    Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="px-5 py-2.5 bg-brand-blue hover:bg-brand-green text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5"
                  >
                    Next
                    <FiArrowRight />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={isSubmitting || timerActive}
                    className={`px-6 py-2.5 bg-brand-blue hover:bg-brand-green text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                      isSubmitting || timerActive ? 'opacity-55 cursor-not-allowed' : 'active:scale-98'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : timerActive ? `Wait ${formatTime(timeLeft)}` : 'Submit Consultation'}
                  </button>
                )}
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;