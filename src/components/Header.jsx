import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import PEG from "../assets/PEG-logo.png";

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
    `text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 ${
      isActive
        ? "text-blue-400 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full"
        : "text-gray-300 hover:text-blue-400"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-3 px-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300 ${
      isActive
        ? "text-blue-400 bg-blue-500/10 border-l-4 border-blue-500 pl-3"
        : "text-gray-300 hover:text-blue-400 hover:bg-white/5"
    }`;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md py-2.5 shadow-lg border-b border-white/5"
          : "bg-slate-950/90 backdrop-blur-sm py-4 border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center">
          
          {/* Logo container with micro-interaction */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={closeMobileMenu}
            >
              <div className="rounded-full bg-white shadow-md p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-slate-100">
                <img
                  src={PEG}
                  alt="Professional Edge Global Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-white font-bold tracking-wider text-base hidden lg:block uppercase font-poppins">
                Professional Edge Global
              </span>
            </Link>
          </div>

          {/* Desktop Menu with visual active indicators */}
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
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Contact Us
            </NavLink>
          </div>

          {/* Mobile Menu Open Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="text-white hover:text-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-over Right Drawer Navigation */}
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ease-in-out pointer-events-none ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop Blur filter */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Drawer Container */}
          <div 
            className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900/98 shadow-2xl p-6 pointer-events-auto flex flex-col justify-between transition-transform duration-500 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-white p-1 flex items-center justify-center">
                    <img src={PEG} alt="PEG Logo" className="h-8 w-8 object-contain" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-wider text-sm font-poppins">PEG</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close Menu"
                  className="text-gray-400 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Menu Links */}
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

            {/* Drawer Footer Details */}
            <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-500">
              <p className="font-semibold text-gray-400 mb-1">Professional Edge Global</p>
              <p>Business Transformation & Technology</p>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;