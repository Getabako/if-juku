import React from 'react';
import './KitazunaSection.css';

const KitazunaSection: React.FC = () => {
  return (
    <div className="kitazuna-section">
      <video 
        className="kitazuna-video-bg" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/2025/07/kitazuna.mp4" type="video/mp4" />
      </video>
      <div className="kitazuna-bg">
        <div className="kitazuna-title-container">
          <h2 className="kitazuna-title twinkling-text">Kitazuna -未来杉の守護者- 開発中</h2>
        </div>
        
        <div className="forest-particles">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
          <div className="leaf leaf-4"></div>
          <div className="leaf leaf-5"></div>
        </div>
        
        <div className="kitazuna-content">
          <p className="kitazuna-subtitle">秋田の未来を守る、新たな冒険が始まる</p>
          <a 
            href="https://kitazuna.if-juku.net" 
            className="kitazuna-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="button-inner">
              <span className="button-icon">⚔</span>
              <span className="button-text">ゲームの詳細を見る</span>
              <span className="button-icon">🛡</span>
            </span>
            <span className="button-aura"></span>
          </a>
        </div>
        
        <div className="mystical-effects">
          <div className="magic-circle"></div>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
        </div>
      </div>
    </div>
  );
};

export default KitazunaSection;