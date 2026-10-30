import { useState, useEffect } from 'react';
import { DollarSign, BookOpen, Home, Globe, AlertCircle, Briefcase, CheckCircle2, Check } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const CareersPage = () => {
  useSEO(
    "Careers & Opportunities",
    "Join the team at Professional Edge Global. Explore internship roles, expert accounting positions, and creative design job opportunities."
  );
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const disposableDomains = [
    'yopmail.com', 'mailinator.com', 'temp-mail.org', 'guerrillamail.com',
    '10minutemail.com', 'tempmail.com', 'fakeinbox.com', 'trashmail.com',
    'throwawaymail.com', 'maildrop.cc', 'getnada.com', 'tempmailaddress.com'
  ];

  const testPatterns = [
    'test@test.com', 'example@example.com', 'demo@demo.com', 'user@user.com',
    'admin@admin.com', 'temp@temp.com', 'guest@guest.com', '123@123.com'
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const storedCooldown = localStorage.getItem('emailCooldown');
    const storedEmail = localStorage.getItem('lastSubmittedEmail');
    
    if (storedCooldown && storedEmail) {
      const cooldownEnd = parseInt(storedCooldown);
      const now = new Date().getTime();
      
      if (now < cooldownEnd) {
        setCooldown(cooldownEnd);
        setTimeLeft(Math.floor((cooldownEnd - now) / 1000));
      } else {
        localStorage.removeItem('emailCooldown');
        localStorage.removeItem('lastSubmittedEmail');
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (cooldown) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.floor((cooldown - now) / 1000);
        
        if (remaining <= 0) {
          clearInterval(interval);
          setCooldown(null);
          setTimeLeft(0);
          localStorage.removeItem('emailCooldown');
          localStorage.removeItem('lastSubmittedEmail');
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [cooldown]);

  const validateEmail = (emailVal) => {
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      return 'Please enter a valid email address';
    }
    if (testPatterns.includes(emailVal.toLowerCase())) {
      return 'Please use a valid email address';
    }
    const domain = emailVal.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
      return 'Disposable email addresses are not allowed';
    }
    if (/^(test|temp|demo|example)/i.test(emailVal.split('@')[0])) {
      return 'Please use a valid email address';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    const storedEmail = localStorage.getItem('lastSubmittedEmail');
    if (storedEmail === email) {
      setError('This email has already been submitted recently');
      return;
    }

    if (cooldown) {
      setError('Please wait before submitting another email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby4kMORYTPDmHJr3iaFK05KP4CBNvDGFHub5Xr2xSiOM4BWB0GRZlIFtryUYs3395AT/exec';
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      if (result.result === 'success') {
        setIsSubscribed(true);
        setEmail('');
        
        const cooldownPeriod = 24*60*60*1000;
        const cooldownEnd = new Date().getTime() + cooldownPeriod;
        
        setCooldown(cooldownEnd);
        setTimeLeft(cooldownPeriod);
        localStorage.setItem('emailCooldown', cooldownEnd.toString());
        localStorage.setItem('lastSubmittedEmail', email);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      } 
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Page Header */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                Careers &amp; Talent Network
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-heading leading-tight">
              Build Your Career With Us
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Join an advisory practice that values analytical rigor, continuous professional upskilling, and long-term client stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Current Opportunities & Talent Alert Form */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2.5 text-brand-blue">
                  <Briefcase size={18} strokeWidth={1.75} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Open Roles</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Current Opportunities
                </h2>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  No active vacancies at this time
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  While we do not have open roles listed today, we continuously evaluate chartered accountancy candidates, audit officers, and digital specialists for upcoming client mandates.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Register your email below to receive immediate notification when new positions open.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8">
                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  Talent Network Alerts
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Be notified directly when audit, advisory, or creative roles open.
                </p>

                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 rounded-md text-sm text-slate-900 placeholder-slate-400 transition-colors"
                        placeholder="name@company.com"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-md text-xs flex items-center gap-2">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        <span className="font-medium">{error}</span>
                      </div>
                    )}

                    {timeLeft > 0 && (
                      <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs">
                        Cooldown period active. Please wait {timeLeft} seconds before next attempt.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || timeLeft > 0}
                      className={`w-full sm:w-auto py-2.5 px-6 text-white font-medium text-sm transition-colors rounded-md ${
                        isLoading || timeLeft > 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand-blue hover:bg-primary-hover'
                      }`}
                    >
                      {isLoading ? 'Submitting...' : 'Subscribe to Vacancy Alerts'}
                    </button>
                  </form>
                ) : (
                  <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-md flex items-start gap-3">
                    <CheckCircle2 className="text-brand-green flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Subscription Confirmed
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Thank you for registering. We will notify you when matching career opportunities arise.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Editorial Benefits & Values (No Nested Cards) */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Why Join Us */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 font-heading pb-4 border-b border-slate-200">
                  Why Join Professional Edge?
                </h2>

                <div className="divide-y divide-slate-200">
                  {[
                    {
                      name: 'Competitive Compensation',
                      description: 'Market-competitive salaries, performance incentives, and structured annual appraisals.',
                      icon: DollarSign,
                    },
                    {
                      name: 'Professional Certifications',
                      description: 'Sponsored training, continuous audit and ERP learning resources, and direct partner mentorship.',
                      icon: BookOpen,
                    },
                    {
                      name: 'Flexible Work Structure',
                      description: 'Support for hybrid workplace arrangements and balanced project scheduling.',
                      icon: Home,
                    },
                    {
                      name: 'Cross-Border Exposure',
                      description: 'Collaborate on international BPO/KPO mandates and multi-jurisdiction advisory projects.',
                      icon: Globe,
                    },
                  ].map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 items-start">
                        <div className="text-brand-blue mt-0.5 flex-shrink-0">
                          <Icon size={18} strokeWidth={1.75} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{benefit.name}</h3>
                          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-5 pt-4">
                <h2 className="text-xl font-bold text-slate-900 font-heading pb-4 border-b border-slate-200">
                  Our Core Values
                </h2>

                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    'Innovation through cross-functional collaboration',
                    'Client-first advisory and transparent reporting',
                    'Rigorous data-driven financial decisions',
                    'Uncompromising ethical and regulatory compliance'
                  ].map((val, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Check size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
