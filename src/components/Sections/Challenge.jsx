import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const ChallengeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const FireBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(255, 100, 0, 0.2) 0%,
    rgba(255, 200, 0, 0.1) 50%,
    transparent 100%
  );
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0,100 Q20,80 40,100 T80,100 T100,100" fill="rgba(255,100,0,0.1)"/></svg>');
    background-size: 200px 100px;
    animation: fire 3s ease-in-out infinite;
  }
  
  @keyframes fire {
    0%, 100% { transform: translateX(0) scaleY(1); }
    50% { transform: translateX(-100px) scaleY(1.2); }
  }
`;

const ParticleEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${theme.colors.secondary.main};
    border-radius: 50%;
    animation: float-up 8s linear infinite;
  }
  
  &::before {
    left: 20%;
    animation-delay: 0s;
  }
  
  &::after {
    left: 80%;
    animation-delay: 4s;
  }
  
  @keyframes float-up {
    0% {
      bottom: -10px;
      opacity: 1;
    }
    100% {
      bottom: 100%;
      opacity: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1000px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ChallengeImage = styled(motion.img)`
  width: 100%;
  max-width: 600px;
  height: auto;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${theme.colors.text.primary};
  max-width: 700px;
  background: rgba(26, 26, 26, 0.8);
  padding: 2rem;
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 4rem;
    color: ${theme.colors.primary.main};
    opacity: 0.3;
  }
  
  &::after {
    content: '"';
    position: absolute;
    bottom: -40px;
    right: 20px;
    font-size: 4rem;
    color: ${theme.colors.primary.main};
    opacity: 0.3;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 1.5rem;
  }
`;

const HighlightText = styled.span`
  color: ${theme.colors.secondary.main};
  font-weight: bold;
  text-shadow: 0 0 10px ${theme.colors.secondary.main};
`;

const Challenge = () => {
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <ChallengeContainer id="challenge">
      <FireBackground />
      <ParticleEffect />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(チャレンジ)
          </SectionTitle>
          
          <ChallengeImage
            src={isMobile ? "/2025/04/名称未設定のデザイン-34.png" : "/2025/04/能動的に学ぶ.png"}
            alt="if(チャレンジ)のサイクル"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          
          <Description variants={itemVariants} className="cyber-frame">
            <HighlightText>能動的に楽しく学ぶ</HighlightText>ことで
            <HighlightText>スキルを獲得</HighlightText>し、
            スキルを活かして<HighlightText>学びながら稼ぐ</HighlightText>！
            <br />
            学びの好循環により、<HighlightText>成長が加速</HighlightText>！
          </Description>
        </motion.div>
      </ContentWrapper>
    </ChallengeContainer>
  );
};

export default Challenge;