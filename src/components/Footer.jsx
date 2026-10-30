import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ArrowUpRight, Check } from 'lucide-react';
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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Presentation */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight font-heading">
              Professional Edge Global
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              An international corporate advisory firm delivering certified accounting, tax compliance, ERP implementation, and digital growth strategies.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <a 
                href="https://www.facebook.com/profile.php?id=61554279516750" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
                aria-label="Facebook"
              >
                <span>Facebook</span>
                <ArrowUpRight size={14} />
              </a>
              <span className="text-slate-700">·</span>
              <a 
                href="mailto:professionaledgeglobal@gmail.com" 
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Email Advisory Desk
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-slate-200 mb-4 uppercase tracking-wider">
              Firm
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/marketing" className="hover:text-white transition-colors">Digital Practice</Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-slate-200 mb-4 uppercase tracking-wider">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="hover:text-white transition-colors block leading-snug"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory Briefings Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Advisory Briefings
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Receive periodic regulatory updates, tax briefings, and corporate governance notes.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 text-slate-500" size={15} />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email address"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600 text-white placeholder-slate-500 text-xs rounded-md transition-colors"
                    required
                  />
                </div>

                {error && (
                  <div className="p-2 bg-red-950/50 text-red-200 border border-red-900/50 text-xs rounded-md">
                    {error}
                  </div>
                )}

                {timeLeft > 0 && (
                  <div className="p-2 bg-slate-900 text-slate-300 border border-slate-800 text-xs rounded-md">
                    Cooldown active: {timeLeft}s
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || timeLeft > 0}
                  className={`w-full bg-brand-blue hover:bg-primary-hover text-white font-medium py-2 px-4 transition-colors flex items-center justify-center gap-1.5 text-xs rounded-md ${
                    isLoading || timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-md flex items-start gap-2.5">
                <Check size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    Subscription Activated
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Thank you for subscribing to our briefings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Professional Edge Global Pvt. Ltd. All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-800">|</span>
            <p className="text-slate-500">
              Developed by{" "}
              <a 
                href="https://pujan-joshi.com.np" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Pujan Joshi
              </a>
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
