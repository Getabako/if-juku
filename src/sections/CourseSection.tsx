import React, { useState } from 'react';
import './CourseSection.css';

const CourseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('liberal');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="course-section">
      <div className="course-bg">
        <div className="course-title-container">
          <h2 className="course-title twinkling-text">コース紹介</h2>
        </div>
        
        <div className="course-tabs">
          <button 
            className={`tab-button ${activeTab === 'liberal' ? 'active' : ''}`}
            onClick={() => handleTabChange('liberal')}
          >
            <span className="tab-icon">⚡</span>リベラルコース
          </button>
          <button 
            className={`tab-button ${activeTab === 'self-realization' ? 'active' : ''}`}
            onClick={() => handleTabChange('self-realization')}
          >
            <span className="tab-icon">🚀</span>自己実現コース
          </button>
        </div>

        <div className="tab-content-container">
          {activeTab === 'liberal' && (
            <div className="tab-content active">
              <div className="course-card cyber-card liberal-course">
                <div className="course-header">
                  <div className="course-header-title">リベラルコース</div>
                  <div className="cyber-line"></div>
                </div>
                <div className="course-body">
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
          )}

          {activeTab === 'self-realization' && (
            <div className="tab-content active">
              <div className="course-card cyber-card ideal-course">
                <div className="course-header">
                  <div className="course-header-title">自己実現コース</div>
                  <div className="cyber-line"></div>
                </div>
                <div className="course-body">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSection;