import React, { useState, useEffect } from 'react';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="about-section">
      <div className="about-bg">
        <div className="about-title-container">
          <h2 className="about-title twinkling-text">if(塾)について</h2>
        </div>
        
        <div className="concept-background">
          {!isMobile ? (
            <img 
              src="/2025/04/if塾横スクロールPC.png" 
              alt="if(塾)について PC版" 
              className="concept-image pc-only"
            />
          ) : (
            <img 
              src="/2025/04/if塾概要sp-1.png" 
              alt="if(塾)について SP版" 
              className="concept-image sp-only"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;