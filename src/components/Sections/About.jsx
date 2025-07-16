import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const AboutContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const CyberBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 255, 255, 0.05) 40%,
      rgba(0, 255, 255, 0.1) 60%,
      transparent 100%
    );
    animation: pulse 4s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
  }
`;

const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
  
  @keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 2rem;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SectionContent = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.primary};
  margin-bottom: 2rem;
  font-family: ${theme.fonts.primary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${theme.colors.primary.main}, 
      transparent,
      ${theme.colors.secondary.main}
    );
    z-index: -1;
    opacity: 0;
    transition: opacity ${theme.animations.duration.normal};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${theme.colors.secondary.main};
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.primary.main};
  font-family: ${theme.fonts.secondary};
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`;

const About = () => {
  const features = [
    {
      icon: "🚀",
      title: "最先端のAI教育",
      description: "最新のAI技術を活用した革新的な学習体験"
    },
    {
      icon: "💡",
      title: "起業家精神の育成",
      description: "実践的なビジネススキルと起業マインドを習得"
    },
    {
      icon: "🌐",
      title: "オンライン完結",
      description: "全国どこからでも参加可能な完全オンライン授業"
    },
    {
      icon: "👨‍💻",
      title: "実践的プログラミング",
      description: "マインクラフトを使った楽しいプログラミング学習"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <AboutContainer id="about">
      <CyberBackground>
        <GridPattern />
      </CyberBackground>
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(塾)について
          </SectionTitle>
          
          <SectionContent variants={itemVariants}>
            <p>
              if(塾)は、AIと起業を学ぶオンラインプログラミング塾です。
              マインクラフトやAIを活用した創造的な学習環境で、
              子どもたちの可能性を最大限に引き出します。
            </p>
            <p style={{ marginTop: '1rem' }}>
              遊びながら学び、学びながら稼ぐ。
              新しい時代に必要なスキルを身につけ、
              自分の夢を実現する力を育てます。
            </p>
          </SectionContent>
          
          <FeatureGrid variants={containerVariants}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="cyber-frame"
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </motion.div>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;