import { useState, useEffect } from 'react';
import { FiDollarSign, FiBookOpen, FiHome, FiGlobe } from 'react-icons/fi';

const CareersPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // List of disposable email domains and test patterns
  const disposableDomains = [
    'yopmail.com', 'mailinator.com', 'temp-mail.org', 'guerrillamail.com',
    '10minutemail.com', 'tempmail.com', 'fakeinbox.com', 'trashmail.com',
    'throwawaymail.com', 'maildrop.cc', 'getnada.com', 'tempmailaddress.com'
  ];

  const testPatterns = [
    'test@test.com', 'example@example.com', 'demo@demo.com', 'user@user.com',
    'admin@admin.com', 'temp@temp.com', 'guest@guest.com', '123@123.com'
  ];

  // Check for existing cooldown on component mount
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

  // Update countdown timer
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
    // Basic email format validation
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      return 'Please enter a valid email address';
    }

    // Check for test patterns
    if (testPatterns.includes(emailVal.toLowerCase())) {
      return 'Please use a valid email address';
    }

    // Extract domain from email
    const domain = emailVal.split('@')[1].toLowerCase();

    // Check for disposable domains
    if (disposableDomains.includes(domain)) {
      return 'Disposable email addresses are not allowed';
    }

    // Check for suspicious patterns
    if (/^(test|temp|demo|example)/i.test(emailVal.split('@')[0])) {
      return 'Please use a valid email address';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Check if this email was recently submitted
    const storedEmail = localStorage.getItem('lastSubmittedEmail');
    if (storedEmail === email) {
      setError('This email has already been submitted recently');
      return;
    }

    // Check if in cooldown period
    if (cooldown) {
      setError('Please wait before submitting another email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby4kMORYTPDmHJr3iaFK05KP4CBNvDGFHub5Xr2xSiOM4BWB0GRZlIFtryUYs3395AT/exec';
      
      // Create form data with the expected structure
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
        
        // Set cooldown period for 24 hours
        const cooldownPeriod = 24*60*60*1000; // 24 hours in milliseconds
        const cooldownEnd = new Date().getTime() + cooldownPeriod;
        
        setCooldown(cooldownEnd);
        setTimeLeft(cooldownPeriod);
        
        // Store in localStorage
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
    <div className="min-h-screen bg-[#f8f8f6] mt-16 py-20 px-4 sm:px-6 lg:px-8 animate-fade-in font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 bg-white border border-slate-200 text-[#0b4a93] text-xs font-semibold uppercase tracking-wider inline-block rounded-lg">
            Join Our Team
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl lg:text-6xl font-heading">
            Build Your Career With Us
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Join a team that values innovation, collaboration, and professional growth.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Openings Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="text-[#0b4a93]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="ml-3 text-lg font-bold text-slate-900 font-heading">Current Opportunities</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-slate-900">No current openings</h3>
                    <p className="mt-2 text-slate-500 text-xs leading-relaxed">
                      We don't have any open positions right now, but we're always looking for talented individuals.
                    </p>
                    <p className="mt-2 text-slate-500 text-xs leading-relaxed">
                      Submit your email below to be the first to know about new opportunities.
                    </p>
                  </div>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
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
                          className="w-full px-3 py-2 bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0b4a93] focus:border-[#0b4a93] text-slate-800 placeholder-slate-400 text-sm rounded-lg transition-colors duration-150"
                          placeholder="your@email.com"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-xs">
                          <p className="font-semibold text-red-800">
                            {error}
                          </p>
                        </div>
                      )}

                      {timeLeft > 0 && (
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-xs">
                          <p className="font-semibold text-yellow-800">
                            Please wait {timeLeft} seconds before submitting another email.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || timeLeft > 0}
                        className={`w-full flex justify-center items-center py-2.5 px-4 text-white font-semibold text-sm uppercase tracking-wider transition-colors duration-150 rounded-lg ${
                          isLoading || timeLeft > 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#00a859] hover:bg-[#0b4a93]'
                        }`}
                      >
                        {isLoading ? 'Submitting...' : 'Notify Me About New Positions'}
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-150 text-xs">
                      <p className="font-semibold text-green-800">
                        Thank you for subscribing! We'll notify you when new positions become available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="text-[#0b4a93]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="ml-3 text-lg font-bold text-slate-900 font-heading">Why Join Us?</h2>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        name: 'Competitive Compensation',
                        description: 'We offer market-leading salaries and comprehensive benefits packages.',
                        icon: <FiDollarSign className="text-[#0b4a93]" size={16} />,
                      },
                      {
                        name: 'Professional Growth',
                        description: 'Continuous learning opportunities and career development programs.',
                        icon: <FiBookOpen className="text-[#0b4a93]" size={16} />,
                      },
                      {
                        name: 'Flexible Work',
                        description: 'Hybrid work models and flexible scheduling options.',
                        icon: <FiHome className="text-[#0b4a93]" size={16} />,
                      },
                      {
                        name: 'Inclusive Culture',
                        description: 'Diverse team where everyone feels valued and respected.',
                        icon: <FiGlobe className="text-[#0b4a93]" size={16} />,
                      },
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 bg-slate-50 border border-slate-150 p-2 rounded-lg">
                          {benefit.icon}
                        </div>
                        <div className="ml-3.5">
                          <h3 className="text-sm font-semibold text-slate-800">{benefit.name}</h3>
                          <p className="mt-1 text-slate-500 text-xs leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Values */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="text-[#0b4a93]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="ml-3 text-lg font-bold text-slate-900 font-heading">Our Values</h2>
                  </div>

                  <ul className="space-y-3.5 text-xs">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] mt-1.5 mr-2.5 flex-shrink-0"></span>
                      <span className="text-slate-600 font-medium">Innovation through collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] mt-1.5 mr-2.5 flex-shrink-0"></span>
                      <span className="text-slate-600 font-medium">Customer-first approach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] mt-1.5 mr-2.5 flex-shrink-0"></span>
                      <span className="text-slate-600 font-medium">Data-driven decisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] mt-1.5 mr-2.5 flex-shrink-0"></span>
                      <span className="text-slate-600 font-medium">Ethical business practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;