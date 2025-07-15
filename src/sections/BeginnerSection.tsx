import React from 'react';
import './BeginnerSection.css';

interface QuestItem {
  id: number;
  name: string;
  status: string;
  tools: string;
  icon: string;
}

const BeginnerSection: React.FC = () => {
  const questItems: QuestItem[] = [
    {
      id: 1,
      name: 'マインクラフト建築',
      status: '募集中',
      tools: '使用ツール例: Minecraft',
      icon: '/2025/03/quest2.png'
    },
    {
      id: 2,
      name: '動画編集',
      status: '募集中',
      tools: '使用ツール例: DavinchResolve',
      icon: '/2025/03/quest1.png'
    },
    {
      id: 3,
      name: 'Web開発',
      status: '募集中',
      tools: '使用ツール例: WordPress',
      icon: '/2025/03/quest3.png'
    },
    {
      id: 4,
      name: 'SNS投稿',
      status: '募集中',
      tools: '使用ツール例: Instagram / Canva',
      icon: '/2025/03/quest4.png'
    },
    {
      id: 5,
      name: 'イラスト',
      status: '募集中',
      tools: '使用ツール例: ClipStudio',
      icon: '/2025/03/quest5.png'
    },
    {
      id: 6,
      name: 'AI開発',
      status: '募集中',
      tools: '使用ツール例: ChatGPT / Gemini',
      icon: '/2025/03/quest6.png'
    }
  ];

  return (
    <div className="beginner-section">
      <div className="beginner-bg">
        <div className="beginner-title-container">
          <h2 className="beginner-title twinkling-text">if(チャレンジ)forビギナー</h2>
        </div>
        
        <div className="wooden-background">
          <div className="wood-grain"></div>
        </div>
        
        <div className="quest-board">
          <div className="quest-board-title">仕事内容</div>
          <div className="quest-list">
            {questItems.map((quest) => (
              <div key={quest.id} className="quest-item">
                <div className="quest-icon">
                  <img src={quest.icon} alt={quest.name} />
                </div>
                <div className="quest-info">
                  <div className="quest-name">{quest.name}</div>
                  <div className="quest-status">{quest.status}</div>
                  <div className="quest-tools">{quest.tools}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://if-juku.net/if-challenge/" className="cyber-button">
            <span className="cyber-button-text">if(チャレンジ)に申し込む</span>
            <span className="cyber-button-glitch"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BeginnerSection;