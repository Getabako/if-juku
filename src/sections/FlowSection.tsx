import React, { useState, useEffect } from 'react';
import './FlowSection.css';

const FlowSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flow-section">
      <div className="flow-bg">
        <div className="flow-title-container">
          <h2 className="flow-title twinkling-text">入塾までの流れ</h2>
        </div>
        
        <div className="cyber-grid-bg"></div>
        
        <div className="flow-image-container">
          <div className="flow-image pc-only">
            {!isMobile && (
              <img src="/2025/04/flow_pc.png" alt="入塾までの流れ PC版" />
            )}
          </div>
          <div className="flow-image sp-only">
            {isMobile && (
              <img src="/2025/04/flow_sp.png" alt="入塾までの流れ スマホ版" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowSection;