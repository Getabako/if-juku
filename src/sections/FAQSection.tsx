import React, { useState } from 'react';
import './FAQSection.css';

interface QAItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('質問を選んでね！答えるよ～');
  const [isAnswering, setIsAnswering] = useState(false);

  const qaItems: QAItem[] = [
    {
      question: 'どこで開催されますか？',
      answer: '普段の授業はオンラインでdiscordを使って行うので、いつでもどこでも参加可能です。秋田県内では定期的にオフラインイベントを開催予定です。'
    },
    {
      question: 'Minecraft未経験でも大丈夫？',
      answer: 'もちろん大丈夫です！マイクラに詳しい講師と、高校生の助手が1から優しく教えてくれます。'
    },
    {
      question: 'PCのみでしょうか？',
      answer: '申し訳ありませんが、様々なものを作るためにはPC版Minecraftが必要です。お子様がやりたいことを実現できるPCについては、塾長たくみが選び方からサポートしますので、お気軽にご相談ください。'
    },
    {
      question: '体験に必要なものは？',
      answer: '体験授業にはお子様が使えるPC、discord、java版マインクラフトが必要です。詳しくはお申し込み後のメールでもご案内しています。'
    },
    {
      question: '資料はありますか？',
      answer: '資料請求ボタンから資料請求をお願いします。'
    },
    {
      question: 'カメラオフで参加できますか？',
      answer: 'はい、ビデオオフOK。食べながらでも踊りながらでも自由に参加できます。'
    }
  ];

  const leftQuestions = qaItems.slice(0, 3);
  const rightQuestions = qaItems.slice(3, 6);

  const handleQuestionClick = (answer: string) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    setCurrentMessage('');
    
    // タイピングエフェクト
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < answer.length) {
        setCurrentMessage(answer.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsAnswering(false);
      }
    }, 50);
  };

  return (
    <div className="faq-section">
      <div className="faq-bg">
        <div className="faq-title-container">
          <h2 className="faq-title twinkling-text">よくある質問</h2>
        </div>
        
        <div className="virtual-background">
          <div className="grid-lines"></div>
          <div className="floating-particles"></div>
          <div className="glow-effects"></div>
        </div>
        
        <div className="faq-layout">
          {/* 左側ボタン */}
          <div className="faq-column left-column">
            {leftQuestions.map((qa, index) => (
              <button
                key={index}
                className="question-btn"
                onClick={() => handleQuestionClick(qa.answer)}
                disabled={isAnswering}
              >
                {qa.question}
              </button>
            ))}
          </div>
          
          {/* 中央のキャラクターとメッセージ */}
          <div className="faq-column center-column">
            <div className="faq-character">
              <img 
                src="/2025/02/getabako0.png" 
                alt="キャラクター" 
                className={`character-image closed ${!isAnswering ? 'visible' : ''}`}
              />
              <img 
                src="/2025/02/getabako1.png" 
                alt="キャラクター" 
                className={`character-image open ${isAnswering ? 'visible' : ''}`}
              />
            </div>
            <div className="message-window">
              <div className="message-content">
                {currentMessage}
                {isAnswering && <span className="cursor">|</span>}
              </div>
            </div>
          </div>
          
          {/* 右側ボタン */}
          <div className="faq-column right-column">
            {rightQuestions.map((qa, index) => (
              <button
                key={index}
                className="question-btn"
                onClick={() => handleQuestionClick(qa.answer)}
                disabled={isAnswering}
              >
                {qa.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;