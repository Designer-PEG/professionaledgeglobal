import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, PhoneCall } from "lucide-react";
import useSEO from '../hooks/useSEO';

const NotFound = () => {
  const navigate = useNavigate();
  useSEO("Page Not Found", "The requested page was not found on Professional Edge Global's server.");

  return (
    <div className="min-h-[85vh] bg-white flex flex-col justify-center items-center px-6 pt-28 pb-20 font-sans">
      <div className="max-w-lg w-full border border-slate-200 rounded-md p-8 sm:p-12 bg-slate-50/50 text-left space-y-6">
        
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-blue block">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-heading">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
            The page you requested may have been moved, renamed, or is temporarily unavailable. Use the options below to return to our advisory platform.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors rounded-md inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="px-5 py-2.5 bg-brand-blue hover:bg-primary-hover text-white text-sm font-medium transition-colors rounded-md inline-flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Return Home</span>
          </Link>

          <Link
            to="/contact"
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors rounded-md inline-flex items-center justify-center gap-2"
          >
            <PhoneCall size={15} />
            <span>Contact Us</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
