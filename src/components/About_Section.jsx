import React from 'react';
import { staffMembers, aboutContent } from './data';
import { FiEye, FiTarget, FiActivity } from 'react-icons/fi';

const AboutSection = () => {
  const getIcon = (title) => {
    switch (title) {
      case 'Our Vision':
        return <FiEye className="text-brand-blue" size={24} />;
      case 'Our Mission':
        return <FiTarget className="text-brand-green" size={24} />;
      case 'Our Goals':
        return <FiActivity className="text-brand-blue" size={24} />;
      default:
        return <FiTarget className="text-slate-400" size={24} />;
    }
  };

  const getCardBorderColor = (title) => {
    switch (title) {
      case 'Our Vision':
        return 'hover:border-brand-blue/30';
      case 'Our Mission':
        return 'hover:border-brand-green/30';
      case 'Our Goals':
        return 'hover:border-brand-blue/30';
      default:
        return 'hover:border-slate-350';
    }
  };

  const renderSection = (section, reverse = false) => {
    return (
      <div className={`grid md:grid-cols-12 gap-12 items-center mb-24 last:mb-0`}>
        {/* Visual Frame */}
        <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
          <div className="relative group overflow-hidden border border-slate-200/80 rounded-2xl bg-slate-900 shadow-md">
            <img 
              src={section.image} 
              alt={section.title} 
              className="w-full h-72 object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
          </div>
        </div>
        
        {/* Content detail panel */}
        <div className={`md:col-span-7 space-y-6 ${reverse ? 'md:order-1' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-3xs">
              {getIcon(section.title)}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">
              {section.title}
            </h3>
          </div>
          
          <div className={`p-6 bg-white border border-slate-200/60 rounded-2xl transition-all duration-300 shadow-2xs ${getCardBorderColor(section.title)}`}>
            <ul className="space-y-4">
              {section.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-[10px] text-brand-green font-extrabold">
                    ✓
                  </span>
                  <span className="mt-0.5">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/60 font-sans relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Vision Section */}
        {renderSection(aboutContent.vision)}

        {/* Mission Section */}
        {renderSection(aboutContent.mission, true)}

        {/* Goals Section */}
        {renderSection(aboutContent.goals)}
      </div>
    </section>
  );
};

export default AboutSection;