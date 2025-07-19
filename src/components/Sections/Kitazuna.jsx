import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const KitazunaContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.4;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(0, 50, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 50, 0, 0.8) 100%
  );
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const SubTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #4ade80;
  margin-bottom: 2.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px #4ade80;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const DevelopmentBadge = styled(motion.div)`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  box-shadow: 
    0 0 20px rgba(239, 68, 68, 0.5),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  animation: pulse-badge 2s ease-in-out infinite;
  
  @keyframes pulse-badge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 0.4rem 1.2rem;
  }
`;

const GameDescription = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid #4ade80;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 40px rgba(74, 222, 128, 0.3),
    inset 0 0 30px rgba(74, 222, 128, 0.1);
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const DescriptionText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const HighlightText = styled.span`
  color: #4ade80;
  font-weight: bold;
  text-shadow: 0 0 10px #4ade80;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(74, 222, 128, 0.15) 50%,
    transparent 100%
  );
  padding: 0 0.5rem;
  border-radius: 4px;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid #4ade80;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(74, 222, 128, 0.2);
    border-color: #22d3ee;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const FeatureTitle = styled.div`
  color: #4ade80;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const FeatureText = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.4;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    #4ade80 0%,
    #22d3ee 50%,
    #4ade80 100%
  );
  background-size: 200% 200%;
  border: 3px solid #4ade80;
  color: #000;
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    animation: gradient-shift 2s ease infinite;
    transform: translateY(-3px);
    box-shadow: 
      0 15px 40px rgba(74, 222, 128, 0.4),
      0 0 30px #4ade80;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const Kitazuna = () => {
  const handleButtonClick = () => {
    window.open('https://kitazuna.if-juku.net/', '_blank');
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <KitazunaContainer id="kitazuna">
      <VideoBackground 
        autoPlay 
        loop 
        muted 
        playsInline
        src="/2025/07/kitazuna.mp4"
      />
      <VideoOverlay />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            Kitazuna
          </SectionTitle>
          
          <SubTitle variants={itemVariants}>
            -未来杉の守護者-
          </SubTitle>
          
          <DevelopmentBadge variants={itemVariants}>
            🚧 開発中 🚧
          </DevelopmentBadge>
          
          <GameDescription variants={itemVariants} className="cyber-frame">
            <DescriptionText>
              <HighlightText>🎮 目的: 学んだスキルを作品として形にする</HighlightText> - 秋田県全域を舞台にしたRPG（HD2D形式）で、地域の伝統文化をテーマにしたゲーム作成ツールです。
            </DescriptionText>
            <DescriptionText>
              プレイヤーは<HighlightText>杉野健太</HighlightText>として秋田各地を巡り、ナマハゲや稲庭うどん、竿燈祭りなどの伝統文化に触れながら、過度な真面目さが生んだ化身「スギノオウ」を封印する冒険を繰り広げます。
            </DescriptionText>
            <DescriptionText>
              <HighlightText>地域IP活用</HighlightText>のゲーム開発を通じて、伝統と現代の融合を学び、実際の<HighlightText>収益化体験</HighlightText>まで可能な教育プラットフォームとして設計されています。
            </DescriptionText>
          </GameDescription>

          <FeatureGrid variants={containerVariants}>
            <FeatureCard variants={itemVariants}>
              <FeatureIcon>🌲</FeatureIcon>
              <FeatureTitle>美しい森の世界</FeatureTitle>
              <FeatureText>豊かな自然が息づく3Dの世界を探索しよう</FeatureText>
            </FeatureCard>
            
            <FeatureCard variants={itemVariants}>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>絆システム</FeatureTitle>
              <FeatureText>仲間との絆を深めて新たな力を解放</FeatureText>
            </FeatureCard>
            
            <FeatureCard variants={itemVariants}>
              <FeatureIcon>⚔️</FeatureIcon>
              <FeatureTitle>戦略バトル</FeatureTitle>
              <FeatureText>知恵と勇気で強大な敵に立ち向かおう</FeatureText>
            </FeatureCard>
          </FeatureGrid>
          
          <CTAButton
            onClick={handleButtonClick}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ゲーム情報を見る
          </CTAButton>
        </motion.div>
      </ContentWrapper>
    </KitazunaContainer>
  );
};

export default Kitazuna;