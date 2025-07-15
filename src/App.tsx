import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';

// 各セクションコンポーネント
const MainVisualSection: React.FC = () => {
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
      <div className="pc-only">
        <video className="main-video" autoPlay loop muted playsInline>
          <source src="/2025/04/ifmv2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="sp-only">
        <video className="main-video" autoPlay loop muted playsInline>
          <source src="/2025/04/ifmvsp-1.mp4" type="video/mp4" />
        </video>
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
    <div id="if-about" className="new-concept-section">
      <div className="new-concept-title-container">
        <h2 className="new-concept-title twinkling-text">if(塾)について</h2>
      </div>
      <div className="pc-only concept-background">
        <img src="/2025/04/if塾横スクロールPC.png" alt="if(塾)について PC版" />
      </div>
      <div className="sp-only concept-background">
        <img src="/2025/04/if塾概要sp-1.png" alt="if(塾)について SP版" />
      </div>
    </div>
  );
};

const CourseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('liberal');

  return (
    <div id="courses" className="course-section">
      <div className="course-bg">
        <div className="course-title-container">
          <h2 className="course-title twinkling-text">コース紹介</h2>
        </div>
        <div className="course-tabs">
          <button 
            className={`tab-button ${activeTab === 'liberal' ? 'active' : ''}`}
            onClick={() => setActiveTab('liberal')}
          >
            <span className="tab-icon">⚡</span>リベラルコース
          </button>
          <button 
            className={`tab-button ${activeTab === 'self-realization' ? 'active' : ''}`}
            onClick={() => setActiveTab('self-realization')}
          >
            <span className="tab-icon">🚀</span>自己実現コース
          </button>
        </div>
        <div className="tab-content-container">
          <div className={`tab-content ${activeTab === 'liberal' ? 'active' : ''}`}>
            <div className="course-card cyber-card">
              <div className="course-header">
                <div className="course-header-title">リベラルコース</div>
                <div className="cyber-line"></div>
              </div>
              <div className="course-body">
                <div className="course-description">
                  マインクラフトで学ぶ創造力・基礎ITスキルコース<br />
                  マインクラフトを活用して、創造力と基礎的なITスキルを楽しみながら身につけます。
                </div>
                <div className="course-details">
                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-text">授業頻度: 週1回から参加可能</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">👨‍🎓</div>
                    <div className="detail-text">オススメの学年: 小学生～中学生にオススメ</div>
                  </div>
                </div>
                <div className="course-features">
                  <h3 className="features-title">特徴:</h3>
                  <ul className="features-list">
                    <li>マインクラフトをメタバース化した空間で自由に探索・建築</li>
                    <li>AI先生やゲームコンテンツを活用した遊び感覚の学習</li>
                    <li>子ども一人ひとりに合った学習スタイルを発見</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={`tab-content ${activeTab === 'self-realization' ? 'active' : ''}`}>
            <div className="course-card cyber-card">
              <div className="course-header">
                <div className="course-header-title">自己実現コース</div>
                <div className="cyber-line"></div>
              </div>
              <div className="course-body">
                <div className="course-description">
                  AIと起業を学ぶ自己実現コース<br />
                  AIを活用したプログラミングやビジネスモデルの構築を学び、実践的なスキルを身につけます。
                </div>
                <div className="course-details">
                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-text">授業頻度: 週2～3回推奨</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">👨‍🎓</div>
                    <div className="detail-text">オススメの学年: 中学生～高校生にオススメ</div>
                  </div>
                </div>
                <div className="course-features">
                  <h3 className="features-title">特徴:</h3>
                  <ul className="features-list">
                    <li>AIを活用したプログラミングやビジネスモデルの構築</li>
                    <li>起業家精神を育成し、自分の興味や特性を活かしたプロジェクト企画・実行</li>
                    <li>メンターのサポートを受けながら、実際の仕事に挑戦し収益を得る経験</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="schedule" className="schedule-section">
      <div className="schedule-bg">
        <div className="schedule-title-container">
          <h2 className="schedule-title twinkling-text">授業スケジュール</h2>
        </div>
        <div className="calendar-container cyber-frame">
          <div className="cyber-frame-corner top-left"></div>
          <div className="cyber-frame-corner top-right"></div>
          <div className="cyber-frame-corner bottom-left"></div>
          <div className="cyber-frame-corner bottom-right"></div>
          <div className="calendar-wrapper">
            <iframe 
              src={isMobile 
                ? "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&bgcolor=%23F09300&mode=AGENDA&title=if(%E5%A1%BE)%20%E6%8E%88%E6%A5%AD%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB&src=MTc0YWEzMWQ0NjY4YzY0MWMxZWZmYzQxYmZjMjg5YTZmYzlkMzUxZDlhYjgyMmFkZTY1ZDFkNGMyNjIxNzMyZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E4C441"
                : "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&bgcolor=%23F09300&title=if(%E5%A1%BE)%20%E6%8E%88%E6%A5%AD%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB&src=MTc0YWEzMWQ0NjY4YzY0MWMxZWZmYzQxYmZjMjg5YTZmYzlkMzUxZDlhYjgyMmFkZTY1ZDFkNGMyNjIxNzMyZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E4C441"
              }
              style={{ border: 'solid 1px #777', width: '100%', height: '600px' }}
              frameBorder="0"
              scrolling="no"
            />
          </div>
          <div className="particles-container">
            <div className="particles"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <div id="contact" className="contact-links-section">
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

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          enabled: true,
          sensitivity: 0.5,
          releaseOnEdges: true,
          thresholdDelta: 50,
          thresholdTime: 300,
        }}
        keyboard={{
          enabled: true,
        }}
        speed={600}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        pagination={{
          clickable: true,
          renderBullet: function (index: number, className: string) {
            return `<span class="${className}"></span>`;
          },
        }}
        className="swiper-container"
      >
        <SwiperSlide>
          <MainVisualSection />
        </SwiperSlide>
        <SwiperSlide>
          <AboutSection />
        </SwiperSlide>
        <SwiperSlide>
          <CourseSection />
        </SwiperSlide>
        <SwiperSlide>
          <ScheduleSection />
        </SwiperSlide>
        <SwiperSlide>
          <ContactSection />
        </SwiperSlide>
      </Swiper>
      
      <div className="swipe-guide">
        <div className="swipe-icon">
          <span></span>
        </div>
        <p>スワイプで次へ</p>
      </div>
    </div>
  );
}

export default App;