import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const FAQContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a3a 0%, #2a2a5a 50%, #3a3a7a 100%);
`;

const QuestionMarkBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before,
  &::after {
    content: '?';
    position: absolute;
    font-size: 10rem;
    color: ${theme.colors.primary.main};
    font-weight: bold;
    animation: float-question 8s ease-in-out infinite;
  }
  
  &::before {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    bottom: 10%;
    right: 10%;
    animation-delay: 4s;
  }
  
  @keyframes float-question {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
    50% { transform: translateY(-20px) rotate(15deg); opacity: 0.2; }
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

const GameArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
`;

const CharacterArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CharacterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 0 20px ${theme.colors.primary.main});
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;


const QuestionButtonsContainer = styled.div`
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const QuestionButtonsLeft = styled.div`
  @media (min-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 280px;
    z-index: 10;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: contents;
  }
`;

const QuestionButtonsRight = styled.div`
  @media (min-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 280px;
    z-index: 10;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: contents;
  }
`;

const QuestionButton = styled.button`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 100;
  
  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 15px ${theme.colors.primary.main};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    padding: 0.5rem;
    border-radius: 8px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    text-align: left;
    &:hover {
      transform: translateX(5px);
    }
  }
`;

const MessageWindow = styled.div`
  position: fixed !important;
  bottom: 2rem !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 90% !important;
  max-width: 800px !important;
  min-height: 150px !important;
  background: rgba(255, 0, 0, 0.9) !important;
  border: 5px solid #00ffff !important;
  border-radius: 15px !important;
  padding: 1.5rem !important;
  z-index: 10002 !important;
  pointer-events: auto !important;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95% !important;
    min-height: 120px !important;
    padding: 1rem !important;
    bottom: 1rem !important;
  }
`;

const MessageText = styled.div`
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background: #00ffff;
    color: #000;
  }
`;

const ContinuePrompt = styled(motion.div)`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  color: ${theme.colors.primary.main};
  font-size: 0.8rem;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const FAQ = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const typingIntervalRef = useRef(null);
  const mouthAnimationIntervalRef = useRef(null);

  const faqs = [
    {
      id: 1,
      question: "どこで開催されますか？",
      answer: "普段の授業はオンラインでdiscordを使って行うので、いつでもどこでも参加可能です。秋田県内では定期的にオフラインイベントを開催予定です。"
    },
    {
      id: 2,
      question: "Minecraft未経験でも大丈夫？",
      answer: "もちろん大丈夫です！マイクラに詳しい講師と、高校生の助手が1から優しく教えてくれます。"
    },
    {
      id: 3,
      question: "PCのみでしょうか？",
      answer: "申し訳ありませんが、様々なものを作るためにはPC版Minecraftが必要です。お子様がやりたいことを実現できるPCについては、塾長たくみが選び方からサポートしますので、お気軽にご相談ください。"
    },
    {
      id: 4,
      question: "体験に必要なものは？",
      answer: "体験授業にはお子様が使えるPC、discord、java版マインクラフトが必要です。詳しくはお申し込み後のメールでもご案内しています。"
    },
    {
      id: 5,
      question: "資料はありますか？",
      answer: "資料請求ボタンから資料請求をお願いします。"
    },
    {
      id: 6,
      question: "カメラオフで参加できますか？",
      answer: "はい、ビデオオフOK。食べながらでも踊りながらでも自由に参加できます。"
    }
  ];

  // 口パクアニメーション
  useEffect(() => {
    if (mouthAnimationIntervalRef.current) {
      clearInterval(mouthAnimationIntervalRef.current);
    }
    
    if (isTalking) {
      mouthAnimationIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => prev === 0 ? 1 : 0);
      }, 150);
    } else {
      setCurrentImageIndex(0);
    }
    
    return () => {
      if (mouthAnimationIntervalRef.current) {
        clearInterval(mouthAnimationIntervalRef.current);
      }
    };
  }, [isTalking]);

  // タイピング効果
  const startTyping = (message) => {
    // 既存のタイピングをクリア
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    setDisplayedText('');
    setIsTyping(true);
    setIsTalking(true);
    
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setIsTalking(false);
      }
    }, 50);
  };
  
  // メッセージを閉じる関数
  const closeMessage = () => {
    setCurrentMessage('');
    setDisplayedText('');
    
    // Swiperを再有効化
    if (window.swiper && window.swiper.allowTouchMove !== undefined) {
      window.swiper.allowTouchMove = true;
    }
  };

  const handleQuestionClick = (faq) => {
    console.log('Button clicked:', faq.question);
    console.log('Setting message:', faq.answer);
    setCurrentMessage(faq.answer);
    startTyping(faq.answer);
    
    // Swiperを無効化
    if (window.swiper && window.swiper.allowTouchMove !== undefined) {
      window.swiper.allowTouchMove = false;
    }
  };

  const getCharacterImage = () => {
    const baseImage = currentImageIndex === 0 ? '/2025/02/getabako0.png' : '/2025/02/getabako1.png';
    return baseImage;
  };

  return (
    <FAQContainer id="faq">
      <QuestionMarkBackground />
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="twinkling-text"
      >
        よくある質問
      </SectionTitle>

      <GameArea>
        <QuestionButtonsContainer>
          <QuestionButtonsLeft>
            {faqs.slice(0, 3).map((faq) => (
              <QuestionButton
                key={faq.id}
                onClick={() => handleQuestionClick(faq)}
              >
                {faq.question}
              </QuestionButton>
            ))}
          </QuestionButtonsLeft>

          <QuestionButtonsRight>
            {faqs.slice(3, 6).map((faq) => (
              <QuestionButton
                key={faq.id}
                onClick={() => handleQuestionClick(faq)}
              >
                {faq.question}
              </QuestionButton>
            ))}
          </QuestionButtonsRight>
        </QuestionButtonsContainer>

        <CharacterArea>
          <CharacterContainer>
            <CharacterImage
              src={getCharacterImage()}
              alt="getabako"
              animate={{ 
                scale: isTalking ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 0.3,
                repeat: isTalking ? Infinity : 0 
              }}
            />
          </CharacterContainer>
        </CharacterArea>
      </GameArea>

      {currentMessage && ReactDOM.createPortal(
        <MessageWindow>
          <CloseButton onClick={closeMessage}>×</CloseButton>
          <MessageText>
            {displayedText || "メッセージを読み込み中..."}
          </MessageText>
        </MessageWindow>,
        document.body
      )}
      
      {/* デバッグ用の情報表示 */}
      <div style={{position: 'fixed', top: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px', fontSize: '12px', zIndex: 20000}}>
        <div>currentMessage: {currentMessage ? 'あり' : 'なし'}</div>
        <div>displayedText: {displayedText || 'なし'}</div>
        <div>isTyping: {isTyping ? 'はい' : 'いいえ'}</div>
        <div>isTalking: {isTalking ? 'はい' : 'いいえ'}</div>
      </div>
    </FAQContainer>
  );
};

export default FAQ;