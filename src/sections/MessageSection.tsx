import React from 'react';
import './MessageSection.css';

const MessageSection: React.FC = () => {
  return (
    <div className="message-section">
      <div className="message-bg">
        <div className="message-title-container">
          <h2 className="message-title twinkling-text">if(メッセージ)</h2>
        </div>
        
        <div className="stars-background message-stars">
          <div className="stars stars-layer1"></div>
          <div className="stars stars-layer2"></div>
          <div className="stars stars-layer3"></div>
        </div>
        
        <div className="message-content-wrapper">
          <div className="message-content">
            <p className="message-text">
              現代は目まぐるしく変化する時代です。AIの活用は今後さらに重要になり、教育の在り方も価値観も変わっていくでしょう。<br/><br/>
              このサイトは最新AIで制作されています。表現手段とAIを組み合わせれば表現できないものはありません。皆さんもAIを使った開発や起業、自由な表現に挑戦してほしいです。<br/><br/>
              学校が面白くないと感じる人もいるかもしれません。私たちもそうでした。だからこそ、誰でも楽しめる塾を目指しています。<br/><br/>
              行動すれば世界は変わります。if(塾)の運営メンバーも高校生から始め、挑戦を形にしています。<br/><br/>
              まずは日常の何かを変えてみましょう。第一歩として、if(塾)で好きなことに取り組んでみませんか？<br/><br/>
              if(塾)で、あなたの可能性を最大限に引き出しましょう。
            </p>
            <div className="message-signature">
              <div className="message-author">
                <span>塾頭: 高崎翔太</span>
              </div>
              <div className="message-author">
                <span>塾長: 山﨑琢己</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;