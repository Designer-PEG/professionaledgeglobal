import React, { useEffect, useState } from 'react';
import Rakhi from '../assets/Rakhi.png';
import Gaijatra from '../assets/Gaijatra.png';
import heroBg from '../assets/bg-1.jpg';
import heroBg3 from '../assets/bg-3.jpg';
import heroBg4 from '../assets/bg-4.jpg';
import about from '../assets/About.png';
import './hero.css';

const HEADER_HEIGHT = 50;
const regularBackgrounds = [heroBg, about, heroBg3, heroBg4];
const REGULAR_DURATION = 5000; // 5 seconds
const SPECIAL_DURATION = 30000; // 30 seconds (3x longer)

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [currentBackgrounds, setCurrentBackgrounds] = useState(regularBackgrounds);
  const [currentDuration, setCurrentDuration] = useState(REGULAR_DURATION);
  const [isSpecialDay, setIsSpecialDay] = useState(false);

  useEffect(() => {
    // Check current date and modify backgrounds array accordingly
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentDay = currentDate.getDate();

    // August 9, 2025 - Rakhi
    if (currentYear === 2025 && currentMonth === 8 && currentDay === 9) {
      setCurrentBackgrounds([Rakhi, Rakhi, ...regularBackgrounds]);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
    } 
    // August 10, 2025 - Gaijatra
    else if (currentYear === 2025 && currentMonth === 8 && currentDay === 10) {
      setCurrentBackgrounds([Gaijatra, Gaijatra, ...regularBackgrounds]);
      setCurrentDuration(SPECIAL_DURATION);
      setIsSpecialDay(true);
    } else {
      setCurrentBackgrounds(regularBackgrounds);
      setCurrentDuration(REGULAR_DURATION);
      setIsSpecialDay(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % currentBackgrounds.length);
    }, currentDuration);
    return () => clearInterval(interval);
  }, [currentBackgrounds, currentDuration]);

  const marqueeItems = [
    "🚀 New Training Classes have opened! Connect with us to Join Now",
    "📈 Limited-time offer: Get 20% off on all consulting services this month",
    "💼 Exclusive webinar: Digital Transformation Strategies on July 25th"
  ];

  return (
    <section className="hero-section">
      <div className="hero-header">
        <h1 className="hero-title">
          Let's Unlock Your Business Edge – Connect Now
        </h1>
        <div className="hero-marquee-container">
          <div className="hero-marquee-wrapper">
            <div className="hero-marquee-content">
              {marqueeItems.map((item, index) => (
                <span key={index} className="hero-marquee-item">{item}</span>
              ))}
              {/* Duplicate the items for seamless looping */}
              {marqueeItems.map((item, index) => (
                <span key={`duplicate-${index}`} className="hero-marquee-item">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img src={currentBackgrounds[bgIndex]} alt="Hero" className="hero-image" />
        {isSpecialDay && (
          <div className="special-day-notice">
            Celebrating {currentBackgrounds[0] === Rakhi ? "Raksha Bandhan" : "Gaijatra"} today!
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;