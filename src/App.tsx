import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 基本的なセクションコンポーネント
const MainVisual: React.FC = () => (
  <section className="main-visual">
    <div className="container">
      <h1 className="main-title">if(塾)</h1>
      <p className="main-subtitle">プログラミング学習サイト</p>
    </div>
  </section>
);

const AboutSection: React.FC = () => (
  <section className="about-section">
    <div className="container">
      <h2>About</h2>
      <p>if(塾)は、プログラミング学習を支援する塾です。</p>
    </div>
  </section>
);

const ServiceSection: React.FC = () => (
  <section className="service-section">
    <div className="container">
      <h2>Services</h2>
      <div className="service-grid">
        <div className="service-item">
          <h3>プログラミング指導</h3>
          <p>個別指導でプログラミングを学習</p>
        </div>
        <div className="service-item">
          <h3>Minecraft教材</h3>
          <p>Minecraftを使った楽しい学習</p>
        </div>
        <div className="service-item">
          <h3>個別指導</h3>
          <p>一人ひとりに合わせた指導</p>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection: React.FC = () => (
  <section className="contact-section">
    <div className="container">
      <h2>Contact</h2>
      <p>お問い合わせはこちらから</p>
    </div>
  </section>
);

// メインページコンポーネント
const MainPage: React.FC = () => (
  <div className="App">
    <MainVisual />
    <AboutSection />
    <ServiceSection />
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