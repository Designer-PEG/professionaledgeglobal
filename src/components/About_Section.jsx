// AboutSection.jsx
import React from 'react';
import { staffMembers, aboutContent } from './data';

const AboutSection = () => {
  const renderSection = (section, reverse = false) => {
    return (
      <div className="mb-16 last:mb-0">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 font-heading">{section.title}</h3>
        <div className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? 'flex-col-reverse md:flex-row' : ''}`}>
          <div className={reverse ? 'order-1 md:order-2' : ''}>
            <img 
              src={section.image} 
              alt={section.title} 
              className="border border-slate-200 rounded-lg w-full h-auto grayscale opacity-95 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className={`${reverse ? 'order-2 md:order-1' : ''}`}>
            <ul className="space-y-3.5 text-slate-600 text-sm">
              {section.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className={`${getBulletColor(section.title)} mr-3 text-base flex-shrink-0`}>
                    {getBulletSymbol(section.title)}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const getBulletColor = (title) => {
    switch(title) {
      case 'Our Vision': return 'text-[#0b4a93]';
      case 'Our Mission': return 'text-[#00a859]';
      case 'Our Goals': return 'text-[#0b4a93]';
      default: return 'text-slate-400';
    }
  };

  const getBulletSymbol = (title) => {
    switch(title) {
      case 'Our Vision': return '•';
      case 'Our Mission': return '•';
      case 'Our Goals': return '✓';
      default: return '•';
    }
  };

  return (
    <div className="py-20 bg-[#f8f8f6] border-y border-slate-150 font-sans">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* About Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
            We are dedicated to delivering innovative solutions that transform businesses and empower people.
          </p>
        </div>

        {/* Vision Section */}
        {renderSection(aboutContent.vision)}

        {/* Mission Section */}
        {renderSection(aboutContent.mission, true)}

        {/* Goals Section */}
        {renderSection(aboutContent.goals)}

      </div>
    </div>
  );
};

export default AboutSection;