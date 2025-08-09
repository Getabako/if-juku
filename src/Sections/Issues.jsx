import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const IssuesContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const GeometricBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    border: 2px solid ${theme.colors.primary.main};
  }
  
  &::before {
    width: 300px;
    height: 300px;
    top: 10%;
    left: -150px;
    transform: rotate(45deg);
    animation: float-rotate 20s linear infinite;
  }
  
  &::after {
    width: 400px;
    height: 400px;
    bottom: 10%;
    right: -200px;
    transform: rotate(-45deg);
    animation: float-rotate 25s linear infinite reverse;
  }
  
  @keyframes float-rotate {
    0% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(225deg) translateY(-20px); }
    100% { transform: rotate(405deg) translateY(0); }
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

const SliderContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 600px;
  }
`;

const IssueCard = styled(motion.div)`
  position: absolute;
  width: 90%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid ${theme.colors.primary.main};
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const CardContent = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${theme.colors.text.primary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all ${theme.animations.duration.normal};
  z-index: 10;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 20px ${theme.colors.primary.main};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -60px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    left: -20px;
  }
`;

const NextButton = styled(NavigationButton)`
  right: -60px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    right: -20px;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Indicator = styled(motion.button)`
  width: ${props => props.active ? '30px' : '10px'};
  height: 10px;
  background: ${props => props.active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.3)'};
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 5px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    background: ${theme.colors.primary.light};
  }
`;

const Issues = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const issues = [
    {
      title: "増え続ける不登校",
      image: "/2025/03/ideal2.png",
      content: "日本の不登校数は年々増加し、現在は過去最高を記録しています。if(塾)は学校でも家でもない第三の居場所を目指し、不登校になりがちな子どもたちが自分らしく安心して学べる環境を提供します。遊びを通じて心が解けるようになり、意欲や学習習慣を再構築していきます。"
    },
    {
      title: "地方と都市部のデジタルディバイド",
      image: "/2025/03/ideal3.png",
      content: "日本はICT後進国で、特に教育分野では諸外国に大きな遅れをとっています。if(塾)は最新AIを開発し、いつでも最大効率で学習できる環境を整えます。人間先生・AI先生どちらにも気軽に質問でき、地方からICT教育を革命的に進めるプロジェクトを推進します。"
    },
    {
      title: "広がる経済格差",
      image: "/2025/03/ideal1.png",
      content: "地方と都市部の経済格差は深刻で、大学進学や就職の選択肢が狭まりがちです。if(塾)は「自ら稼ぐ力」を育成することで、家庭環境や地域に左右されずに将来の夢を切り拓けるよう支援します。地域の仕事にチャレンジしながら報酬を得て、高校生自身が社会で活躍できる道を広げていきます。"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? issues.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === issues.length - 1 ? 0 : prev + 1));
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <IssuesContainer id="issues">
      <GeometricBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          if(塾)が取り組む課題
        </SectionTitle>
        
        <SliderContainer>
          <SliderWrapper>
            <PrevButton
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </PrevButton>
            
            <CardContainer>
              <AnimatePresence initial={false} custom={currentIndex}>
                <IssueCard
                  key={currentIndex}
                  custom={currentIndex}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      handleNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                      handlePrevious();
                    }
                  }}
                  className="cyber-frame"
                >
                  <CardImage src={issues[currentIndex].image} alt={issues[currentIndex].title} />
                  <CardTitle>{issues[currentIndex].title}</CardTitle>
                  <CardContent>{issues[currentIndex].content}</CardContent>
                </IssueCard>
              </AnimatePresence>
            </CardContainer>
            
            <NextButton
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </NextButton>
          </SliderWrapper>
          
          <Indicators>
            {issues.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </Indicators>
        </SliderContainer>
      </ContentWrapper>
    </IssuesContainer>
  );
};

export default Issues;