import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const MessageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const LetterBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before {
    content: '✉️';
    position: absolute;
    top: 10%;
    left: 15%;
    font-size: 4rem;
    animation: float-letter 6s ease-in-out infinite;
  }
  
  &::after {
    content: '💌';
    position: absolute;
    bottom: 10%;
    right: 15%;
    font-size: 3rem;
    animation: float-letter 6s ease-in-out infinite 3s;
  }
  
  @keyframes float-letter {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(10deg); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
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

const MessageCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  
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

const MessageContent = styled.div`
  text-align: center;
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const HighlightText = styled.span`
  color: ${theme.colors.secondary.main};
  font-weight: bold;
  text-shadow: 0 0 10px ${theme.colors.secondary.main};
  animation: glow-pulse 2s ease-in-out infinite alternate;
  
  @keyframes glow-pulse {
    0% { text-shadow: 0 0 10px ${theme.colors.secondary.main}; }
    100% { text-shadow: 0 0 20px ${theme.colors.secondary.main}; }
  }
`;

const SignatureSection = styled(motion.div)`
  border-top: 2px solid ${theme.colors.primary.main};
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const SignatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SignatureRole = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  opacity: 0.8;
`;

const SignatureName = styled.div`
  color: ${theme.colors.primary.main};
  font-size: 1.2rem;
  font-weight: bold;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${theme.colors.primary.main};
    border-radius: 50%;
    animation: float-particle 8s linear infinite;
  }
  
  &::before {
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    right: 10%;
    animation-delay: 4s;
  }
  
  @keyframes float-particle {
    0% {
      bottom: -10px;
      opacity: 1;
    }
    100% {
      bottom: 110%;
      opacity: 0;
    }
  }
`;

const Message = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
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
    <MessageContainer id="message">
      <LetterBackground />
      <FloatingParticles />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(メッセージ)
          </SectionTitle>
          
          <MessageCard variants={itemVariants} className="cyber-frame">
            <MessageContent>
              <motion.p variants={itemVariants}>
                現代は目まぐるしく変化する時代です。<HighlightText>AIの活用</HighlightText>は今後さらに重要になり、教育の在り方も価値観も変わっていくでしょう。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                このサイトは<HighlightText>最新AIで制作</HighlightText>されています。表現手段とAIを組み合わせれば表現できないものはありません。皆さんもAIを使った開発や起業、自由な表現に挑戦してほしいです。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                学校が面白くないと感じる人もいるかもしれません。私たちもそうでした。だからこそ、<HighlightText>誰でも楽しめる塾</HighlightText>を目指しています。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                <HighlightText>行動すれば世界は変わります</HighlightText>。if(塾)の運営メンバーも高校生から始め、挑戦を形にしています。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                まずは日常の何かを変えてみましょう。第一歩として、<HighlightText>if(塾)で好きなことに取り組んでみませんか？</HighlightText>
              </motion.p>
              
              <motion.p variants={itemVariants}>
                <HighlightText>if(塾)で、あなたの可能性を最大限に引き出しましょう。</HighlightText>
              </motion.p>
            </MessageContent>
            
            <SignatureSection variants={itemVariants}>
              <SignatureItem>
                <SignatureRole>塾頭</SignatureRole>
                <SignatureName>高崎翔太</SignatureName>
              </SignatureItem>
              
              <SignatureItem>
                <SignatureRole>塾長</SignatureRole>
                <SignatureName>山﨑琢己</SignatureName>
              </SignatureItem>
            </SignatureSection>
          </MessageCard>
        </motion.div>
      </ContentWrapper>
    </MessageContainer>
  );
};

export default Message;