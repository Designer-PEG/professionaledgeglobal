import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import PEG from "../assets/PEG-Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll state for header height and background adjustment
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide / show logic
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      }, 2500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-[14px] font-medium tracking-wide transition-colors duration-150 relative py-1.5 ${
      isActive
        ? "text-[#0b4a93] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#00a859] after:rounded-full"
        : "text-slate-600 hover:text-[#0b4a93]"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-3.5 px-4 text-base font-medium tracking-wide transition-colors duration-150 ${
      isActive
        ? "text-[#0b4a93] bg-slate-50 border-l-2 border-[#00a859]"
        : "text-slate-600 hover:text-[#0b4a93] hover:bg-slate-50/50"
    }`;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-white border-b border-slate-150 py-3`}
    >
      <nav className="container mx-auto px-6 max-w-5xl">
        <div className="flex justify-between items-center">
          
          {/* Logo container */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center justify-center p-1 border border-slate-150 bg-white rounded-lg">
                <img
                  src={PEG}
                  alt="Professional Edge Global Logo"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-[#0b4a93] font-bold tracking-wide text-sm hidden lg:block font-heading">
                Professional Edge Global
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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
              className="px-4 py-2 bg-[#0b4a93] hover:bg-[#00a859] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#00a859] rounded-lg"
            >
              Contact Us
            </NavLink>
          </div>

          {/* Mobile Menu Open Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="text-slate-800 hover:text-[#0b4a93] p-1.5 focus:outline-none focus:ring-1 focus:ring-[#0b4a93]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-over Drawer Navigation */}
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out pointer-events-none ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/10 pointer-events-auto"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Drawer Container */}
          <div 
            className={`absolute top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white border-l border-slate-200 p-6 pointer-events-auto flex flex-col justify-between transition-transform duration-300 ease-in-out rounded-l-2xl ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-5 border-b border-slate-150 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1 border border-slate-150 bg-white rounded-lg">
                    <img src={PEG} alt="PEG Logo" className="h-7 w-7 object-contain" />
                  </div>
                  <span className="text-[#0b4a93] font-bold tracking-wide text-xs font-heading">PEG</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close Menu"
                  className="text-slate-400 hover:text-slate-700 p-1.5 focus:outline-none focus:ring-1 focus:ring-[#0b4a93]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Menu Links */}
              <div className="space-y-1.5">
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

            {/* Drawer Footer Details */}
            <div className="border-t border-slate-150 pt-5 text-center text-[11px] text-slate-400">
              <p className="font-semibold text-[#0b4a93] mb-0.5">Professional Edge Global</p>
              <p>Business Transformation & Technology</p>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;