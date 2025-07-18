import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const FlowContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const CircuitBackground = styled.div`
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
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary.main},
      transparent
    );
  }
  
  &::before {
    top: 30%;
    animation: circuit-flow 8s linear infinite;
  }
  
  &::after {
    bottom: 30%;
    animation: circuit-flow 8s linear infinite reverse;
  }
  
  @keyframes circuit-flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const CircuitNode = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${theme.colors.primary.main};
  border-radius: 50%;
  box-shadow: 0 0 10px ${theme.colors.primary.main};
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation: pulse 2s infinite;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 15%;
    animation: pulse 2s infinite 1s;
  }
  
  &:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation: pulse 2s infinite 0.5s;
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 1; 
    }
    50% { 
      transform: scale(1.5); 
      opacity: 0.5; 
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

const FlowImageWrapper = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  position: relative;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const FlowImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform ${theme.animations.duration.normal};
  
  &:hover {
    transform: scale(1.02);
  }
`;

const FlowDescription = styled(motion.div)`
  margin-top: 2rem;
  text-align: center;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const FlowText = styled.p`
  color: ${theme.colors.text.primary};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const ContactButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.background.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
  box-shadow: 0 0 20px ${theme.colors.secondary.main};
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.secondary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const Flow = () => {
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  const handleContactClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
    <FlowContainer id="flow">
      <CircuitBackground>
        <CircuitNode />
        <CircuitNode />
        <CircuitNode />
      </CircuitBackground>
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            入塾までの流れ
          </SectionTitle>
          
          <FlowImageWrapper variants={itemVariants} className="cyber-frame">
            <FlowImage
              src={isMobile ? "/2025/04/名称未設定のデザイン-34.png" : "/2025/04/if塾横スクロールPC.png"}
              alt="入塾までの流れ"
            />
            
            <FlowDescription variants={itemVariants}>
              <FlowText>
                まずは無料体験授業にお申し込みください。
                お子様の興味や現在のスキルレベルに合わせて、
                最適な学習プランをご提案いたします。
              </FlowText>
              
              <ContactButton
                onClick={handleContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glitch-effect"
              >
                無料体験授業に申し込む
              </ContactButton>
            </FlowDescription>
          </FlowImageWrapper>
        </motion.div>
      </ContentWrapper>
    </FlowContainer>
  );
};

export default Flow;