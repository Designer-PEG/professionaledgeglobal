import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
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
    <footer className="bg-[#0f0f0f] text-slate-300 border-t border-slate-900 font-sans">
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Company Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide font-heading">Professional Edge Global</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering businesses with innovative solutions and exceptional service since 2020.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61554279516750" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#0b4a93] transition-colors duration-150" 
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center group"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Subscribe</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Get the latest news and updates delivered to your inbox.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00a859] focus:border-[#00a859] text-white placeholder-slate-500 text-sm rounded-lg transition-colors duration-150"
                    required
                  />
                </div>

                {error && (
                  <div className="p-2 bg-red-950/20 text-red-200 border border-red-900/30 text-xs font-medium rounded-lg">
                    {error}
                  </div>
                )}

                {timeLeft > 0 && (
                  <div className="p-2 bg-[#00a859]/10 text-green-400 border border-green-950/30 text-xs rounded-lg">
                    Please wait {timeLeft} seconds before resubmitting.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || timeLeft > 0}
                  className={`w-full bg-[#0b4a93] hover:bg-[#00a859] text-white font-semibold py-2 px-4 transition-colors duration-150 flex items-center justify-center text-sm rounded-lg ${
                    isLoading || timeLeft > 0 ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Submitting...' : 'Subscribe'}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-slate-900 border border-slate-800 text-center rounded-lg">
                <p className="text-sm font-semibold text-[#00a859]">
                  ✓ Subscription completed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Professional Edge Global. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors duration-150">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors duration-150">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;