import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const CoursesContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%);
  z-index: 0;
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

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? 
    `linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})` : 
    'transparent'};
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px ${theme.colors.primary.main};
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const CourseCard = styled(motion.div)`
  background-image: ${props => props.$activeTab === 'liberal' ? 
    "url('/2025/08/liberal.png')" :
    "url('/2025/08/ideal.png')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${theme.colors.primary.main}, 
      ${theme.colors.primary.dark},
      ${theme.colors.secondary.main},
      ${theme.colors.primary.main}
    );
    background-size: 400% 400%;
    z-index: -1;
    animation: gradient-border 10s ease infinite;
    border-radius: inherit;
  }
  
  @keyframes gradient-border {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CourseTitle = styled.h3`
  font-size: 2rem;
  color: ${theme.colors.primary.main};
  font-family: ${theme.fonts.secondary};
  background: rgba(0, 0, 0, 0.85);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-block;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    ${theme.colors.glow.blue};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const CourseTag = styled.span`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  color: ${theme.colors.background.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 0 10px ${theme.colors.secondary.main};
`;

const CourseDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 1rem;
  border-radius: 8px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const CourseInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.primary.main};
  font-weight: bold;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.8rem 0.8rem 0.8rem 2rem;
  border-radius: 6px;
  
  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: ${theme.colors.secondary.main};
    text-shadow: 0 0 5px ${theme.colors.secondary.main};
  }
`;

const Courses = () => {
  const [activeTab, setActiveTab] = useState('liberal');

  const courses = {
    liberal: {
      title: "リベラルコース",
      tag: "小学生～中学生推奨",
      description: "マインクラフトで学ぶ創造力・基礎ITスキルコース",
      frequency: "週1回から参加可能",
      target: "小学生～中学生にオススメ",
      features: [
        "マインクラフトをメタバース化した空間で自由に探索・建築",
        "AI先生やゲームコンテンツを活用した遊び感覚の学習",
        "子ども一人ひとりに合った学習スタイルを発見",
        "創造力と基礎的なITスキルを楽しく習得"
      ]
    },
    selfrealization: {
      title: "自己実現コース",
      tag: "中学生～高校生推奨",
      description: "AIと起業を学ぶ自己実現コース",
      frequency: "週2～3回推奨",
      target: "中学生～高校生にオススメ",
      features: [
        "AIを活用したプログラミングやビジネスモデルの構築",
        "起業家精神を育成し、自分の興味や特性を活かしたプロジェクト企画・実行",
        "メンターのサポートを受けながら、実際の仕事に挑戦し収益を得る経験",
        "将来のキャリアに直結する実践的なスキルを習得"
      ]
    }
  };

  const currentCourse = courses[activeTab];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <CoursesContainer id="courses">
      <BackgroundEffect />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          コース紹介
        </SectionTitle>
        
        <TabContainer>
          <TabButton
            active={activeTab === 'liberal'}
            onClick={() => setActiveTab('liberal')}
            className="glitch-effect"
          >
            リベラルコース
          </TabButton>
          <TabButton
            active={activeTab === 'selfrealization'}
            onClick={() => setActiveTab('selfrealization')}
            className="glitch-effect"
          >
            自己実現コース
          </TabButton>
        </TabContainer>
        
        <AnimatePresence mode="wait">
          <CourseCard
            key={activeTab}
            $activeTab={activeTab}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="cyber-frame neon-glow"
          >
            <CourseHeader>
              <CourseTitle>{currentCourse.title}</CourseTitle>
              <CourseTag>{currentCourse.tag}</CourseTag>
            </CourseHeader>
            
            <CourseDescription>
              {currentCourse.description}
            </CourseDescription>
            
            <CourseInfo>
              <InfoItem>
                <InfoLabel>頻度</InfoLabel>
                <InfoValue>{currentCourse.frequency}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>対象</InfoLabel>
                <InfoValue>{currentCourse.target}</InfoValue>
              </InfoItem>
            </CourseInfo>
            
            <FeatureList>
              {currentCourse.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureItem>{feature}</FeatureItem>
                </motion.div>
              ))}
            </FeatureList>
          </CourseCard>
        </AnimatePresence>
      </ContentWrapper>
    </CoursesContainer>
  );
};

export default Courses;