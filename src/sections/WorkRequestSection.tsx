import React from 'react';
import './WorkRequestSection.css';

const WorkRequestSection: React.FC = () => {
  return (
    <div className="work-request-section">
      <video 
        className="work-request-video-bg" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/2025/07/ifbusiness.mp4" type="video/mp4" />
      </video>
      <div className="work-request-bg">
        <div className="work-request-title-container">
          <h2 className="work-request-title twinkling-text">if(塾)への仕事のご依頼はこちら</h2>
        </div>
        
        <div className="cyber-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
        
        <div className="work-request-content">
          <a 
            href="https://service.if-juku.net" 
            className="work-request-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="button-inner">
              <span className="button-text">お仕事のご依頼・詳細はこちら</span>
              <span className="button-arrow">→</span>
            </span>
            <span className="button-glow"></span>
          </a>
        </div>
        
        <div className="tech-grid">
          <div className="grid-line horizontal"></div>
          <div className="grid-line horizontal"></div>
          <div className="grid-line horizontal"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkRequestSection;