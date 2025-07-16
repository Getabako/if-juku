import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const BeginnerContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const StarsBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: 
      ${Array(50).fill(0).map(() => 
        `${Math.random() * 100}vw ${Math.random() * 100}vh 0 white`
      ).join(',')};
    animation: twinkle-star 3s infinite;
  }
  
  &::after {
    width: 1px;
    height: 1px;
    animation-duration: 4s;
    animation-delay: 1s;
  }
  
  @keyframes twinkle-star {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
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

const QuestsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const QuestCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${props => props.isRecruiting ? theme.colors.secondary.main : theme.colors.primary.main};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  
  ${props => props.isRecruiting && `
    animation: pulse-border 2s infinite;
    
    @keyframes pulse-border {
      0%, 100% { 
        border-color: ${theme.colors.secondary.main};
        box-shadow: 0 0 20px ${theme.colors.secondary.main};
      }
      50% { 
        border-color: ${theme.colors.secondary.light};
        box-shadow: 0 0 30px ${theme.colors.secondary.main};
      }
    }
  `}
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px ${props => 
      props.isRecruiting ? `rgba(0, 255, 0, 0.3)` : `rgba(0, 255, 255, 0.3)`
    };
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const QuestIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 70px;
    height: 70px;
  }
`;

const QuestTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary.main};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const QuestStatus = styled.div`
  background: ${props => props.isRecruiting ? 
    `linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})` : 
    `linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`
  };
  color: ${theme.colors.background.primary};
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const QuestTool = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.secondary};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all ${theme.animations.duration.fast};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.background.primary};
    transform: rotate(90deg);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
`;

const ModalDescription = styled.div`
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  
  p {
    margin-bottom: 1rem;
  }
  
  strong {
    color: ${theme.colors.secondary.main};
  }
`;

const ChallengeForBeginner = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const quests = [
    {
      id: 1,
      title: "Minecraft建築",
      icon: "/2025/03/quest2.png",
      status: "募集中",
      tool: "Minecraft",
      isRecruiting: true,
      description: "マインクラフトで創造的な建築物を作成します。基本的なブロックの配置から、複雑な建築技法まで学べます。",
      details: "報酬: 1,000円〜5,000円/作品"
    },
    {
      id: 2,
      title: "動画編集",
      icon: "/2025/03/quest1.png",
      status: "募集中",
      tool: "DavinchResolve",
      isRecruiting: true,
      description: "YouTubeやSNS向けの動画編集スキルを身につけます。カット編集、エフェクト、BGM挿入など。",
      details: "報酬: 2,000円〜10,000円/動画"
    },
    {
      id: 3,
      title: "Web開発",
      icon: "/2025/03/quest3.png",
      status: "募集中",
      tool: "WordPress",
      isRecruiting: true,
      description: "WordPressを使ったWebサイト制作。HTMLやCSSの基礎も学びながら実践的なサイトを作ります。",
      details: "報酬: 5,000円〜30,000円/サイト"
    },
    {
      id: 4,
      title: "SNS投稿",
      icon: "/2025/03/quest4.png",
      status: "募集中",
      tool: "Instagram / Canva",
      isRecruiting: true,
      description: "SNSマーケティングの基礎を学び、魅力的な投稿を作成します。デザインツールの使い方も習得。",
      details: "報酬: 500円〜2,000円/投稿"
    },
    {
      id: 5,
      title: "イラスト",
      icon: "/2025/03/quest5.png",
      status: "募集中",
      tool: "ClipStudio",
      isRecruiting: true,
      description: "デジタルイラストの描き方を学びます。キャラクターデザインから背景まで幅広く対応。",
      details: "報酬: 3,000円〜20,000円/作品"
    },
    {
      id: 6,
      title: "AI開発",
      icon: "/2025/03/quest6.png",
      status: "募集中",
      tool: "ChatGPT / Gemini",
      isRecruiting: true,
      description: "最新のAIツールを使った開発やプロンプトエンジニアリング。AIを活用した業務効率化も学べます。",
      details: "報酬: 3,000円〜15,000円/案件"
    }
  ];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <BeginnerContainer id="challenge-beginner">
      <StarsBackground />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(チャレンジ)forビギナー
          </SectionTitle>
          
          <QuestsGrid variants={containerVariants}>
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedQuest(quest)}
                isRecruiting={quest.isRecruiting}
                className="cyber-frame"
              >
                <QuestIcon>
                  <img src={quest.icon} alt={quest.title} />
                </QuestIcon>
                <QuestTitle>{quest.title}</QuestTitle>
                <QuestStatus isRecruiting={quest.isRecruiting}>
                  {quest.status}
                </QuestStatus>
                <QuestTool>ツール: {quest.tool}</QuestTool>
              </QuestCard>
            ))}
          </QuestsGrid>
        </motion.div>
      </ContentWrapper>
      
      <AnimatePresence>
        {selectedQuest && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuest(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="cyber-frame"
            >
              <CloseButton onClick={() => setSelectedQuest(null)}>×</CloseButton>
              <ModalTitle>{selectedQuest.title}</ModalTitle>
              <ModalDescription>
                <p>{selectedQuest.description}</p>
                <p><strong>使用ツール:</strong> {selectedQuest.tool}</p>
                <p><strong>{selectedQuest.details}</strong></p>
              </ModalDescription>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </BeginnerContainer>
  );
};

export default ChallengeForBeginner;