import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Briefcase, 
  Info, 
  Compass, 
  Phone, 
  Menu, 
  X, 
  ChevronRight,
  MapPin,
  Mail,
  ArrowUpRight
} from "lucide-react";
import PEG from "../assets/PEG-Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 relative py-5 ${
      isActive
        ? "text-brand-blue font-semibold after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-brand-blue"
        : "text-slate-600 hover:text-slate-900"
    }`;

  const bottomTabs = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/services", label: "Services", icon: Briefcase },
    { path: "/career", label: "Careers", icon: Compass },
    { path: "/contact", label: "Contact", icon: Phone }
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 bg-white border-b border-slate-200 transition-shadow duration-200 ${
          isScrolled ? "shadow-xs" : ""
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Lockup */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center gap-3 group focus:outline-none"
                onClick={closeMobileMenu}
              >
                <img
                  src={PEG}
                  alt="Professional Edge Global Logo"
                  className="h-9 w-9 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-slate-900 font-bold tracking-tight text-[15px] leading-snug group-hover:text-brand-blue transition-colors">
                    Professional Edge Global
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium leading-none">
                    Corporate &amp; Financial Advisory
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-7">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/career" className={navLinkClass}>
                Careers
              </NavLink>
              
              <div className="pl-2 border-l border-slate-200">
                <NavLink 
                  to="/contact" 
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 rounded-md"
                >
                  Get Started
                </NavLink>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMenuOpen}
                className="text-slate-700 hover:text-slate-900 p-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile Primary Navigation" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200">
        <div className="grid grid-cols-5 h-14">
          {bottomTabs.map((tab) => {
            const isActive = path === tab.path || (tab.path !== "/" && path.startsWith(tab.path));
            const Icon = tab.icon;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={closeMobileMenu}
                className={`flex flex-col items-center justify-center gap-1 border-t-2 transition-colors ${
                  isActive
                    ? "border-brand-blue text-brand-blue bg-slate-50/60"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon size={16} />
                <span className="text-[10px] font-medium leading-none">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/40"
            onClick={closeMobileMenu}
          />
          
          <div className="fixed top-16 inset-x-0 bg-white border-b border-slate-200 p-6 shadow-lg z-10 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Navigation
              </p>
              {[
                { to: "/", label: "Home", desc: "Overview & advisory standards" },
                { to: "/about", label: "About Us", desc: "Leadership, mission & audit team" },
                { to: "/services", label: "Advisory Services", desc: "Accounting, tax, ERP & BPO" },
                { to: "/career", label: "Careers", desc: "Openings & talent network" },
                { to: "/contact", label: "Contact Us", desc: "Schedule a consultation" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
              <Link to="/privacy-policy" onClick={closeMobileMenu} className="hover:text-brand-blue">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" onClick={closeMobileMenu} className="hover:text-brand-blue">
                Terms &amp; Conditions
              </Link>
              <Link to="/cookie-policy" onClick={closeMobileMenu} className="hover:text-brand-blue">
                Cookie Policy
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-blue" />
                <span>Tinkune, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="mailto:professionaledgeglobal@gmail.com"
                  className="text-slate-600 hover:text-brand-blue flex items-center gap-1 font-medium"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61554279516750"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-brand-blue flex items-center gap-0.5 font-medium"
                >
                  <span>Facebook</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
