import React, { useState, useEffect } from 'react';
import './IssuesSection.css';

interface IssueCard {
  id: number;
  title: string;
  content: string;
  image: string;
}

const IssuesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const issues: IssueCard[] = [
    {
      id: 1,
      title: '増え続ける不登校',
      content: '日本の不登校数は年々増加し、現在は過去最高を記録しています。\nif(塾)は学校でも家でもない第三の居場所を目指し、不登校になりがちな子どもたちが自分らしく安心して学べる環境を提供します。\n遊びを通じて心が解けるようになり、意欲や学習習慣を再構築していきます。',
      image: '/2025/03/ideal2.png'
    },
    {
      id: 2,
      title: '地方と都市部のデジタルディバイド',
      content: '日本はICT後進国で、特に教育分野では諸外国に大きな遅れをとっています。\nif(塾)は最新AIを開発し、いつでも最大効率で学習できる環境を整えます。\n人間先生・AI先生どちらにも気軽に質問でき、地方からICT教育を革命的に進めるプロジェクトを推進します。',
      image: '/2025/03/ideal3.png'
    },
    {
      id: 3,
      title: '広がる経済格差',
      content: '地方と都市部の経済格差は深刻で、大学進学や就職の選択肢が狭まりがちです。\nif(塾)は「自ら稼ぐ力」を育成することで、家庭環境や地域に左右されずに将来の夢を切り拓けるよう支援します。\n地域の仕事にチャレンジしながら報酬を得て、高校生自身が社会で活躍できる道を広げていきます。',
      image: '/2025/03/ideal1.png'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % issues.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + issues.length) % issues.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="issues-section">
      <div className="issues-bg">
        <div className="issues-title-container">
          <h2 className="issues-title twinkling-text">if(塾)が取り組む課題</h2>
        </div>
        
        <div className="dawn-background">
          <div className="dawn-light"></div>
        </div>
        
        <div className="issues-description">
          <p className="highlight-text">
            if(塾)は秋田県で出会った高校生たちが中心になって生まれました。<br />
            地方の教育課題を自ら解決する若い力を、ここから育んでいきます。
          </p>
        </div>
        
        <div className="issues-slider-controls">
          <button className="issue-nav-btn prev-btn" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="issue-indicator">
            {issues.map((_, index) => (
              <span
                key={index}
                className={`issue-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button className="issue-nav-btn next-btn" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        
        <div className="issues-slider-container">
          {issues.map((issue, index) => (
            <div
              key={issue.id}
              className={`issue-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="issue-card">
                <div className="card-image-container">
                  <img src={issue.image} alt={issue.title} />
                  <div className="card-title-overlay">{issue.title}</div>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    {issue.content.split('\n').map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < issue.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssuesSection;