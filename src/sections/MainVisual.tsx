import React, { useState, useEffect } from 'react';
import './MainVisual.css';

const MainVisual: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-visual-section">
      <div className="main-video-container">
        {!isMobile ? (
          <video className="main-video pc-only" autoPlay loop muted playsInline>
            <source src="/2025/04/ifmv2.mp4" type="video/mp4" />
          </video>
        ) : (
          <video className="main-video sp-only" autoPlay loop muted playsInline>
            <source src="/2025/04/ifmvsp-1.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default MainVisual;