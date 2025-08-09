import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.primary.main};
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const QuestGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const QuestCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  height: 280px;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 40%,
      rgba(0, 255, 255, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover, &:active {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem;
    height: 240px;
  }
`;

const QuestImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 120px;
  }
`;

const QuestTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary.main};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    ${theme.colors.glow.blue};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const QuestDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    display: none;
  }
`;

const QuestDetails = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid ${theme.colors.primary.main};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
  z-index: 2;
  
  ${QuestCard}:hover &, ${QuestCard}:active & {
    transform: translateY(0);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const DetailText = styled.p`
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: left;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;


const ChallengeForBeginner = () => {

  const quests = [
    {
      id: 1,
      title: "Quest 1",
      image: "/2025/04/quest1.png",
      shortDesc: "動画編集にチャレンジ",
      fullDesc: "動画編集ソフトを使って、自分だけのオリジナル動画を作成します。カット、エフェクト、BGMの追加など、基本的な動画編集技術を習得します。"
    },
    {
      id: 2,
      title: "Quest 2",
      image: "/2025/04/quest2.png",
      shortDesc: "マインクラフトで建築",
      fullDesc: "マインクラフトを使って創造力を発揮し、自分だけの建築物を作成します。基本的な建築技術から応用まで、楽しく学習できます。"
    },
    {
      id: 3,
      title: "Quest 3",
      image: "/2025/04/quest3.png",
      shortDesc: "プログラミング基礎",
      fullDesc: "ビジュアルプログラミングから始めて、プログラミングの基本概念を学習します。ゲーム感覚で楽しく論理的思考を身につけます。"
    },
    {
      id: 4,
      title: "Quest 4",
      image: "/2025/04/quest4.png",
      shortDesc: "デジタルアート制作",
      fullDesc: "デジタルツールを使って、イラストやアート作品を制作します。創造性を発揮しながら、デジタル技術を習得できます。"
    },
    {
      id: 5,
      title: "Quest 5",
      image: "/2025/04/quest5.png",
      shortDesc: "3Dモデリング体験",
      fullDesc: "3Dモデリングソフトを使って、立体的な作品を作成します。空間認識能力を養いながら、新しい表現方法を学びます。"
    },
    {
      id: 6,
      title: "Quest 6",
      image: "/2025/04/quest6.png",
      shortDesc: "総合プロジェクト",
      fullDesc: "これまでに学習した技術を組み合わせて、オリジナルの作品を完成させます。企画から完成まで、一連の制作プロセスを体験します。"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <BeginnerContainer id="challenge-beginner">
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
          
          <QuestGrid variants={containerVariants}>
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                variants={itemVariants}
                className="cyber-frame"
              >
                <QuestImage src={quest.image} alt={quest.title} />
                <QuestTitle>{quest.title}</QuestTitle>
                <QuestDescription>{quest.shortDesc}</QuestDescription>
                <QuestDetails>
                  <DetailText>{quest.fullDesc}</DetailText>
                </QuestDetails>
              </QuestCard>
            ))}
          </QuestGrid>
        </motion.div>
      </ContentWrapper>
      
    </BeginnerContainer>
  );
};

export default ChallengeForBeginner;