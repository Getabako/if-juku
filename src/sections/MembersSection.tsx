import React, { useState, useEffect } from 'react';
import './MembersSection.css';

interface MemberInfo {
  id: number;
  name: string;
  title: string;
  description: string;
  imagePc: string;
  imageSp: string;
}

const MembersSection: React.FC = () => {
  const [currentMember, setCurrentMember] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const members: MemberInfo[] = [
    {
      id: 1,
      name: '高崎翔太',
      title: '塾頭: 高崎翔太',
      description: '元々は実は臨床心理士。ICTものづくりを通して、言葉による表現が難しかった子が自分の思いを伝えられるようになったり、学習に意欲を持てなかった子が目標を見つけて難関大学へ進学したり…多くの子どもたちが持つ可能性の扉を開くお手伝いをしてきた、経験豊富なメンターだよ！',
      imagePc: '/2025/08/staff0.png',
      imageSp: '/2025/08/staff0.png'
    },
    {
      id: 2,
      name: '山﨑琢己',
      title: '塾長: 山﨑琢己',
      description: '高校1年でIT会社を起業！Web開発やPCコンサルタントとして活躍後、if(塾)を開業。塾長としてみんなをまとめ、授業もメインで回す頼れるリーダーだよ！AI開発や講演も行う、AI活用の最前線に立つ若きイノベーター！中学時代は支援級で過ごした経験も力に、現役で国立大学合格！',
      imagePc: '/2025/08/staff1.png',
      imageSp: '/2025/08/staff1.png'
    },
    {
      id: 3,
      name: '加賀屋結眞',
      title: 'CFO: 加賀屋結眞',
      description: '高校1年でIT会社を起業！Web開発やマーケティングコンサルタントとして活躍後、if(塾)を開業。CFOとして、みんなにif(塾)の魅力を伝えるコミュニケーターだよ！年上の起業家たちとも積極的に交流し、ホリエモンにプレゼンした経験も持つチャレンジャー！パソコンを使った表現力で周りが驚くような発想力と行動力を発揮し、次の事業立ち上げを計画中！',
      imagePc: '/2025/08/staff2.png',
      imageSp: '/2025/08/staff2.png'
    },
    {
      id: 4,
      name: '井上陽斗',
      title: 'CTO: 井上陽斗',
      description: '高校1年からif(塾)に参加！プログラミング未経験からスタートし、if(塾)のマインクラフトワールドのシステムを全て開発した天才クリエイター！まるでドラえもんみたいに、お願いしたものをいつの間にか作ってくれる頼れる存在！集中して自分の世界に入り込み、周りがびっくりするような天才的なアイデアを次々と生み出している開発の達人だよ！',
      imagePc: '/2025/08/staff3.png',
      imageSp: '/2025/08/staff3.png'
    },
    {
      id: 5,
      name: 'Y君',
      title: '専属e-Sports Player: Y君',
      description: '高校生で格闘ゲームを始め、わずか数ヶ月でトップクラスの実力を獲得！県内大学の大会では最年少で優勝した期待のアスリート！抜群の集中力で塾頭をゲームで打ち負かす実力の持ち主！プロゲーマーを目指して本格始動し、YouTubeやTwitchでの配信も積極的に行っているよ！',
      imagePc: '/2025/08/staff4.png',
      imageSp: '/2025/08/staff4.png'
    }
  ];

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % members.length);
  };

  const prevMember = () => {
    setCurrentMember((prev) => (prev - 1 + members.length) % members.length);
  };

  const goToMember = (index: number) => {
    setCurrentMember(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextMember, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="members-section">
      <div className="members-bg">
        <div className="members-title-container">
          <h2 className="members-title twinkling-text">運営メンバー</h2>
        </div>
        
        <div className="stars-background">
          <div className="stars stars-layer1"></div>
          <div className="stars stars-layer2"></div>
          <div className="stars stars-layer3"></div>
        </div>
        
        <div className="members-controls">
          <button className="member-nav-btn prev-btn" onClick={prevMember}>
            &#10094;
          </button>
          <div className="member-indicator">
            {members.map((_, index) => (
              <span
                key={index}
                className={`member-dot ${index === currentMember ? 'active' : ''}`}
                onClick={() => goToMember(index)}
              />
            ))}
          </div>
          <button className="member-nav-btn next-btn" onClick={nextMember}>
            &#10095;
          </button>
        </div>
        
        <div className="members-slider">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`member-profile ${index === currentMember ? 'active' : ''}`}
            >
              <div className="member-image">
                <img 
                  src={isMobile ? member.imageSp : member.imagePc} 
                  alt={member.title} 
                  className={isMobile ? 'sp-only-img' : 'pc-only-img'}
                />
                <div className="member-banner">
                  <div className="member-banner-text">{member.title}</div>
                </div>
              </div>
              <div className="member-info">
                <h3 className="member-title">{member.title}</h3>
                <p className="member-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersSection;