import { useState, useEffect } from 'react';
import { FiDollarSign, FiBookOpen, FiHome, FiGlobe, FiAlertCircle, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

const CareersPage = () => {
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
    <div className="min-h-screen bg-slate-50 pt-36 pb-20 font-sans relative overflow-hidden">
      {/* Visual ambient layers */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none opacity-5" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20 space-y-4">
          <span className="px-3.5 py-1 bg-white border border-slate-200 text-brand-blue text-xs font-bold uppercase tracking-wider inline-block rounded-full shadow-2xs">
            Join Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Build Your Career With Us
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Join a dynamic consulting team that values operational innovation, continuous upskilling, and collaborative growth.
          </p>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Job Alerts Details Box */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-md">
              <div className="p-6 sm:p-10 space-y-8">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-brand-blue">
                    <FiBriefcase size={20} />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 font-heading">Current Opportunities</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 font-sans">No active vacancies at this time</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      We do not have any open positions today, but we are always scouting for top-tier operations experts and graphic designers.
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      Sign up for our career updates below to be informed of new openings instantly.
                    </p>
                  </div>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">
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
                          className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-colors"
                          placeholder="name@company.com"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 text-red-800 border border-red-200/60 rounded-xl text-xs flex items-center gap-2">
                          <FiAlertCircle className="flex-shrink-0" />
                          <span className="font-semibold">{error}</span>
                        </div>
                      )}

                      {timeLeft > 0 && (
                        <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-xl text-xs">
                          Cooldown period active. Please wait {timeLeft} seconds before next attempt.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || timeLeft > 0}
                        className={`w-full py-3.5 px-6 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-xl shadow-xs active:scale-98 ${
                          isLoading || timeLeft > 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand-green hover:bg-brand-blue'
                        }`}
                      >
                        {isLoading ? 'Submitting...' : 'Subscribe to Vacancy Alerts'}
                      </button>
                    </form>
                  ) : (
                    <div className="p-5 bg-emerald-50 border border-emerald-150 text-center rounded-xl animate-fade-in shadow-inner">
                      <FiCheckCircle className="text-brand-green mx-auto mb-2" size={24} />
                      <p className="text-xs font-bold text-emerald-800 tracking-wide">
                        ✓ Subscription Saved
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                        Thank you for subscribing! We will notify you when matching career opportunities arise.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Benefits sidebar columns */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Why Join Us card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-md space-y-6">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-brand-blue" />
                <h2 className="text-sm font-extrabold text-slate-900 font-heading uppercase tracking-wide">Why Join Us?</h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    name: 'Competitive Rewards',
                    description: 'Market-competitive salaries, performance bonuses, and annual appraisals.',
                    icon: <FiDollarSign className="text-brand-blue" />,
                  },
                  {
                    name: 'Growth & Training',
                    description: 'Paid certifications, continuous learning resources, and mentorship.',
                    icon: <FiBookOpen className="text-brand-blue" />,
                  },
                  {
                    name: 'Flexible Work',
                    description: 'Support for hybrid workplace options and flexible hours.',
                    icon: <FiHome className="text-brand-blue" />,
                  },
                  {
                    name: 'Global Culture',
                    description: 'Collaborate with teams across digital and physical consulting hubs.',
                    icon: <FiGlobe className="text-brand-blue" />,
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-xs">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 leading-tight">{benefit.name}</h3>
                      <p className="mt-1 text-[11px] text-slate-500 leading-relaxed font-normal">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-md space-y-6">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-brand-blue" />
                <h2 className="text-sm font-extrabold text-slate-900 font-heading uppercase tracking-wide">Our Values</h2>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-500 font-semibold">
                {[
                  'Innovation through collaboration',
                  'Client-first advisory mapping',
                  'Strict data-driven decisions',
                  'Ethical corporate compliance'
                ].map((val, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0"></span>
                    <span className="leading-snug">{val}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CareersPage;