import React from 'react';
import { aboutContent } from './data';
import { Eye, Target, Activity, Check } from 'lucide-react';

const AboutSection = () => {
  const getIcon = (title) => {
    switch (title) {
      case 'Our Vision':
        return <Eye className="text-brand-blue" size={20} strokeWidth={1.75} />;
      case 'Our Mission':
        return <Target className="text-brand-green" size={20} strokeWidth={1.75} />;
      case 'Our Goals':
        return <Activity className="text-brand-blue" size={20} strokeWidth={1.75} />;
      default:
        return <Target className="text-slate-400" size={20} strokeWidth={1.75} />;
    }
  };

  const renderSection = (section, index, reverse = false) => {
    return (
      <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center py-14 first:pt-0 last:pb-0 border-b last:border-b-0 border-slate-200">
        {/* Image Column */}
        <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
          <div className="overflow-hidden border border-slate-200 rounded-md bg-slate-100">
            <img 
              src={section.image} 
              alt={section.title} 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </div>
        
        {/* Content Column */}
        <div className={`md:col-span-7 space-y-5 ${reverse ? 'md:order-1' : ''}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              {getIcon(section.title)}
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                0{index + 1}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">
              {section.title}
            </h3>
          </div>
          
          <ul className="space-y-3 pt-2 border-t border-slate-200">
            {section.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                <Check className="text-brand-green flex-shrink-0 mt-1" size={16} strokeWidth={2} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        {renderSection(aboutContent.vision, 0)}
        {renderSection(aboutContent.mission, 1, true)}
        {renderSection(aboutContent.goals, 2)}
      </div>
    </section>
  );
};

export default AboutSection;
