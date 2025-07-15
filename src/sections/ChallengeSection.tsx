import React, { useState, useEffect } from 'react';
import './ChallengeSection.css';

const ChallengeSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="challenge-section">
      <div className="challenge-bg">
        <div className="challenge-title-container">
          <h2 className="challenge-title twinkling-text">if(チャレンジ)</h2>
        </div>
        
        <div className="fire-background">
          <div className="flames flame1"></div>
          <div className="flames flame2"></div>
          <div className="flames flame3"></div>
        </div>
        
        <div className="challenge-description">
          <div className="cyber-text-frame">
            <p className="cyber-text">
              能動的に楽しく学ぶことでスキルを獲得し、スキルを活かして学びながら稼ぐ！<br/>学びの好循環により、成長が加速！
            </p>
          </div>
        </div>
        
        <div className="challenge-image-container">
          <div className="challenge-image pc-only">
            {!isMobile && (
              <img src="/2025/04/能動的に学ぶ.png" alt="能動的に学ぶサイクル PC版" />
            )}
          </div>
          <div className="challenge-image sp-only">
            {isMobile && (
              <img src="/2025/04/名称未設定のデザイン-34.png" alt="能動的に学ぶサイクル スマホ版" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;