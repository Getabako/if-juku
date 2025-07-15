import React from 'react';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  return (
    <div className="contact-section">
      <div className="contact-links-bg">
        <div className="contact-links-title-container">
          <h2 className="contact-links-title twinkling-text">各種お問い合わせ</h2>
        </div>
        
        <div className="neon-background">
          <div className="neon-grid"></div>
          <div className="neon-glow"></div>
        </div>
        
        <div className="neon-banners-container">
          <a href="https://if-juku.net/contact/" className="neon-banner contact-banner">
            <div className="neon-text">お問い合わせ</div>
            <div className="neon-glow-effect"></div>
          </a>
          
          <a href="/2024/08/if塾パンフレット.pdf" className="neon-banner document-banner">
            <div className="neon-text">資料請求</div>
            <div className="neon-glow-effect"></div>
          </a>
          
          <a href="https://if-juku.net/trial/" className="neon-banner trial-banner">
            <div className="neon-text">体験授業申し込み</div>
            <div className="neon-glow-effect"></div>
          </a>
          
          <a href="https://lin.ee/lGK9c4Nx" className="neon-banner line-banner">
            <div className="neon-text">LINE公式アカウント</div>
            <div className="neon-glow-effect"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;