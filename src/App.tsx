import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 基本的なセクションコンポーネント
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

const ServiceSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="service-section">
      <div className="service-bg">
        <div className="service-title-container">
          <h2 className="service-title twinkling-text">サービス</h2>
        </div>
        
        <div className="service-content">
          <div className="service-grid">
            <div className="service-item">
              <img src="/2025/04/プログラミング.png" alt="プログラミング" className="service-icon" />
              <h3>プログラミング</h3>
              <p>JavaScriptやPythonなどの言語を使って、基礎から応用まで学習できます。</p>
            </div>
            <div className="service-item">
              <img src="/2025/04/マイクラ.png" alt="マイクラ" className="service-icon" />
              <h3>マイクラ</h3>
              <p>Minecraftを使った楽しいプログラミング学習で、コマンドや建築を学びます。</p>
            </div>
            <div className="service-item">
              <img src="/2025/04/デザイン.png" alt="デザイン" className="service-icon" />
              <h3>デザイン</h3>
              <p>WebデザインやUIデザインの基礎から、実践的なスキルまで身につけます。</p>
            </div>
            <div className="service-item">
              <img src="/2025/04/動画編集.png" alt="動画編集" className="service-icon" />
              <h3>動画編集</h3>
              <p>YouTubeやSNS向けの動画編集技術を学び、クリエイティブなスキルを磨きます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialsSection: React.FC = () => {
  return (
    <div className="materials-section">
      <div className="materials-bg">
        <div className="materials-title-container">
          <h2 className="materials-title twinkling-text">教材</h2>
        </div>
        
        <div className="materials-content">
          <div className="materials-grid">
            <div className="material-item">
              <img src="/2025/04/minecraft-logo.png" alt="Minecraft教材" className="material-icon" />
              <h3>Minecraft コマンド教材</h3>
              <p>楽しみながらプログラミングの基礎を学べる、Minecraftのコマンド学習教材です。</p>
            </div>
            <div className="material-item">
              <img src="/2025/04/javascript-logo.png" alt="JavaScript教材" className="material-icon" />
              <h3>JavaScript 基礎講座</h3>
              <p>Web開発の基礎となるJavaScriptを、初心者でも分かりやすく学べる教材です。</p>
            </div>
            <div className="material-item">
              <img src="/2025/04/python-logo.png" alt="Python教材" className="material-icon" />
              <h3>Python プログラミング</h3>
              <p>AI開発でも使われるPythonの基礎から応用まで学べる実践的な教材です。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsSection: React.FC = () => {
  return (
    <div className="news-section">
      <div className="news-bg">
        <div className="news-title-container">
          <h2 className="news-title twinkling-text">ニュース</h2>
        </div>
        
        <div className="news-content">
          <div className="news-grid">
            <div className="news-item">
              <div className="news-date">2024.12.06</div>
              <h3>中学特別支援学級から国立大学へ行けた話</h3>
              <p>発達障害を持つ生徒がif(塾)で学び、見事国立大学に合格した体験談をご紹介します。</p>
            </div>
            <div className="news-item">
              <div className="news-date">2024.10.27</div>
              <h3>藤野英人様をお招きし投資の勉強会を開催</h3>
              <p>秋田県とEO North Japan様と共に、投資について学ぶ貴重な機会をいただきました。</p>
            </div>
            <div className="news-item">
              <div className="news-date">2024.10.17</div>
              <h3>eスポーツ大会で優勝しました！</h3>
              <p>if(塾)の生徒がストリートファイター6のeスポーツ大会で見事優勝を果たしました。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <div className="contact-section">
      <div className="contact-bg">
        <div className="contact-title-container">
          <h2 className="contact-title twinkling-text">お問い合わせ</h2>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>if(塾)へのお問い合わせ</h3>
            <p>プログラミング学習や体験授業について、お気軽にお問い合わせください。</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <h4>体験授業</h4>
                <p>まずは体験授業で、if(塾)の雰囲気を感じてみてください。</p>
                <a href="https://if-juku.net/trial" className="contact-button">体験授業申し込み</a>
              </div>
              
              <div className="contact-method">
                <h4>資料請求</h4>
                <p>詳しい資料をご希望の方は、こちらからダウンロードできます。</p>
                <a href="/2024/08/if塾パンフレット.pdf" className="contact-button" target="_blank">資料ダウンロード</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// メインページコンポーネント
const MainPage: React.FC = () => (
  <div className="App">
    <MainVisual />
    <AboutSection />
    <ServiceSection />
    <MaterialsSection />
    <NewsSection />
    <ContactSection />
  </div>
);

// メインAppコンポーネント
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;