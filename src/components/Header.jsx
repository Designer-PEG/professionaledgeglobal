import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import PEG from "../assets/PEG-Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update page reading progress bar
      if (scrollHeight > 0) {
        setScrollProgress((currentScrollY / scrollHeight) * 100);
      }

      // Scroll state for header height adjustment
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / show logic based on direction
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > 80) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (currentScrollY > 80 && !isMenuOpen) {
          setIsVisible(false);
        }
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMenuOpen]);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-2 ${
      isActive
        ? "text-brand-blue font-bold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2.5px] after:bg-brand-green after:rounded-full"
        : "text-slate-500 hover:text-brand-blue"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-4 px-6 text-sm font-semibold uppercase tracking-wider transition-all duration-200 rounded-xl ${
      isActive
        ? "text-brand-blue bg-slate-50/80 border-l-4 border-brand-green shadow-xs"
        : "text-slate-600 hover:text-brand-blue hover:bg-slate-50/50"
    }`;

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-lg border-b border-slate-200/50 py-3 shadow-md shadow-slate-100/30" 
            : "bg-white/40 backdrop-blur-xs border-b border-slate-100/20 py-5"
        }`}
      >
        {/* Scroll Progress Bar at the top of the header */}
        <div 
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />

        <nav className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-between items-center">
            
            {/* Logo container */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center gap-3 group focus:outline-none"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-center p-1.5 border border-slate-200/60 bg-white/90 rounded-xl shadow-xs group-hover:scale-105 group-hover:border-brand-blue/30 transition-all duration-300">
                  <img
                    src={PEG}
                    alt="Professional Edge Global Logo"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 font-extrabold tracking-tight text-sm font-heading group-hover:text-brand-blue transition-colors duration-300 leading-none">
                    Professional Edge Global
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">
                    Business Advisory
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/marketing" className={navLinkClass}>
                Digital Marketing
              </NavLink>
              <NavLink to="/career" className={navLinkClass}>
                Career
              </NavLink>
              
              <NavLink 
                to="/contact" 
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-green text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/30 rounded-lg shadow-sm hover:shadow-md hover:scale-102"
              >
                Get Started
              </NavLink>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
                className="text-slate-700 hover:text-brand-blue p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile slide drawer */}
          <div 
            className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Drawer Container */}
            <div 
              className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-slate-100 p-8 flex flex-col justify-between transition-transform duration-500 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1 border border-slate-100 bg-white rounded-lg shadow-xs">
                      <img src={PEG} alt="PEG Logo" className="h-6 w-6 object-contain" />
                    </div>
                    <span className="text-slate-900 font-extrabold tracking-tight text-xs font-heading">PEG</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    aria-label="Close Menu"
                    className="text-slate-400 hover:text-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="space-y-2">
                  <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                  <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    About Us
                  </NavLink>
                  <NavLink to="/services" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    Services
                  </NavLink>
                  <NavLink to="/marketing" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    Digital Marketing
                  </NavLink>
                  <NavLink to="/career" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    Career
                  </NavLink>
                  <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                    Contact Us
                  </NavLink>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-slate-100 pt-6 text-center text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                <p className="text-brand-blue font-bold mb-1">Professional Edge Global</p>
                <p className="text-slate-350">Redefining Excellence</p>
              </div>
            </div>
          </div>

        </nav>
      </header>
    </>
  );
};

export default Header;