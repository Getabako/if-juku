import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const FAQContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  /* カスタムスクロールバー */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: 4px;
    
    &:hover {
      background: ${theme.colors.primary.light};
    }
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const FAQLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  gap: 2rem;
  align-items: flex-start;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FAQColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    position: static;
    margin-bottom: 2rem;
  }
`;

const CharacterImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  object-fit: contain;
  transition: all ${theme.animations.duration.normal};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const FAQItem = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
  }
`;

const QuestionButton = styled(motion.button)`
  width: 100%;
  background: transparent;
  border: none;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.primary.main};
    opacity: 0;
    transition: opacity ${theme.animations.duration.normal};
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const QuestionIcon = styled.div`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  color: ${theme.colors.background.primary};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const QuestionText = styled.div`
  flex: 1;
  font-weight: 500;
`;

const ToggleIcon = styled(motion.div)`
  color: ${theme.colors.primary.main};
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const AnswerContainer = styled(motion.div)`
  overflow: hidden;
`;

const AnswerContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 0.9rem;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 1rem 1rem;
    font-size: 0.8rem;
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [characterState, setCharacterState] = useState('closed');

  const leftFAQs = [
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
    }
  ];

  const rightFAQs = [
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

  const toggleFAQ = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // キャラクターの状態を更新
    const hasOpenItems = Object.values({ ...openItems, [id]: !openItems[id] }).some(Boolean);
    setCharacterState(hasOpenItems ? 'open' : 'closed');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const answerVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <FAQContainer id="faq">
      <QuestionMarkBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          よくある質問
        </SectionTitle>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <FAQLayout>
            {/* 左側のFAQ */}
            <FAQColumn>
              {leftFAQs.map((faq) => (
                <FAQItem key={faq.id} variants={itemVariants} className="cyber-frame">
                  <QuestionButton
                    onClick={() => toggleFAQ(faq.id)}
                    whileHover={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <QuestionIcon>Q</QuestionIcon>
                    <QuestionText>{faq.question}</QuestionText>
                    <ToggleIcon
                      animate={{ rotate: openItems[faq.id] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </ToggleIcon>
                  </QuestionButton>
                  
                  <AnimatePresence>
                    {openItems[faq.id] && (
                      <AnswerContainer
                        variants={answerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <AnswerContent>
                          <strong>A:</strong> {faq.answer}
                        </AnswerContent>
                      </AnswerContainer>
                    )}
                  </AnimatePresence>
                </FAQItem>
              ))}
            </FAQColumn>
            
            {/* 中央のキャラクター */}
            <CharacterSection>
              <CharacterImage
                src={characterState === 'open' ? "/2025/02/getabako1.png" : "/2025/02/getabako0.png"}
                alt="FAQ キャラクター"
                animate={{ scale: characterState === 'open' ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </CharacterSection>
            
            {/* 右側のFAQ */}
            <FAQColumn>
              {rightFAQs.map((faq) => (
                <FAQItem key={faq.id} variants={itemVariants} className="cyber-frame">
                  <QuestionButton
                    onClick={() => toggleFAQ(faq.id)}
                    whileHover={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <QuestionIcon>Q</QuestionIcon>
                    <QuestionText>{faq.question}</QuestionText>
                    <ToggleIcon
                      animate={{ rotate: openItems[faq.id] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </ToggleIcon>
                  </QuestionButton>
                  
                  <AnimatePresence>
                    {openItems[faq.id] && (
                      <AnswerContainer
                        variants={answerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <AnswerContent>
                          <strong>A:</strong> {faq.answer}
                        </AnswerContent>
                      </AnswerContainer>
                    )}
                  </AnimatePresence>
                </FAQItem>
              ))}
            </FAQColumn>
          </FAQLayout>
        </motion.div>
      </ContentWrapper>
    </FAQContainer>
  );
};

export default FAQ;