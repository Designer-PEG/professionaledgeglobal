import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiFacebook, FiGlobe } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Footer = () => {
  const footerServices = [
    { id: 'market-research', title: 'Market Research & Digital Marketing' },
    { id: 'accounting-consulting', title: 'Accounting & Business Consulting' },
    { id: 'erp-implementation', title: 'ERP Support & Implementations' },
    { id: 'tax-advisory', title: 'Expert Tax Advisory' },
    { id: 'hr-outsourcing', title: 'HR Outsourcing & Capacity Development' }
  ];

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const disposableDomains = [
    'yopmail.com', 'mailinator.com', 'temp-mail.org', 'guerrillamail.com',
    '10minutemail.com', 'tempmail.com', 'fakeinbox.com', 'trashmail.com'
  ];

  const testPatterns = [
    'test@test.com', 'example@example.com', 'demo@demo.com', 'admin@admin.com'
  ];

  useEffect(() => {
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
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (cooldown) {
      setError('Please wait before submitting another email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxCp-x-8CKOAGxO2A_0xw09tIXWoMLVBaaPxVhtDA-30Etw8mc2Mk1auK0yPdJML74/exec';
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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900/60 font-sans relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/35 rounded-full blur-3xl pointer-events-none opacity-10" />

      <div className="container mx-auto px-6 py-24 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-white tracking-tight font-heading">
                Professional Edge <span className="text-brand-green">Global</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                A premium international consulting agency delivering financial advisory, corporate operations upskilling, and creative digital strategies.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61554279516750" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Connect with us</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 md:pl-4">
            <h4 className="text-xs font-bold text-white mb-5 uppercase tracking-widest text-slate-200">Company</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-250">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-250">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors duration-250">Services</Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-white transition-colors duration-250">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-250">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Offerings Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white mb-5 uppercase tracking-widest text-slate-200">Offerings</h4>
            <ul className="space-y-3 text-[11px] sm:text-xs">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="hover:text-white transition-colors duration-250 block truncate max-w-[180px]"
                    title={service.title}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Newsletter Box */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest text-slate-200">Insights</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stay ahead with curated industry updates and corporate advisories.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative flex items-center">
                  <FiMail className="absolute left-3 text-slate-500" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green text-white placeholder-slate-500 text-xs rounded-lg transition-colors duration-200"
                    required
                  />
                </div>

                {error && (
                  <div className="p-2.5 bg-red-950/30 text-red-200 border border-red-900/30 text-[10px] font-semibold rounded-lg leading-relaxed">
                    {error}
                  </div>
                )}

                {timeLeft > 0 && (
                  <div className="p-2 bg-brand-green/10 text-green-400 border border-brand-green/20 text-[10px] rounded-lg">
                    Cooldown active: {timeLeft}s
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || timeLeft > 0}
                  className={`w-full bg-brand-blue hover:bg-brand-green text-white font-bold py-2.5 px-4 transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider rounded-lg shadow-sm ${
                    isLoading || timeLeft > 0 ? 'opacity-55 cursor-not-allowed' : 'active:scale-98'
                  }`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                  <FiArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-slate-900 border border-slate-850 text-center rounded-xl animate-fade-in shadow-inner">
                <p className="text-xs font-bold text-brand-green tracking-wide">
                  ✓ Subscription Activated
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Thank you for joining Professional Edge.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900/80 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-medium">
              &copy; {new Date().getFullYear()} Professional Edge Global. Built for excellence.
            </p>
            <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest">
              Made by -{" "}
              <a 
                href="https://pujan-joshi.com.np" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-green font-bold transition-colors"
              >
                Pujan Joshi
              </a>
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors duration-150">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-150">Privacy</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors duration-150">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;