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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
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

const ChallengeImage = styled(motion.img)`
  max-width: 100%;
  max-height: 60vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  filter: drop-shadow(${theme.colors.glow.blue});
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 50vh;
  }
`;

const MessageContainer = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const MessageTitle = styled.h3`
  font-size: 2rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
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

const MessageText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const NoticeText = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const JobRequestButton = styled.button`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.background.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
    animation: glitch 0.3s;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
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

  const handleJobRequest = () => {
    window.open('https://service.if-juku.net', '_blank');
  };

  return (
    <ChallengeContainer id="challenge">
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(チャレンジ)
          </SectionTitle>
          
          <ChallengeImage
            variants={itemVariants}
            src={isMobile ? "/2025/04/名称未設定のデザイン-34.png" : "/2025/04/能動的に学ぶ.png"}
            alt="if(チャレンジ) - 能動的に学ぶ力を身につける"
          />
          
          <MessageContainer variants={itemVariants}>
            <MessageTitle>能動的に学ぶ力を身につける</MessageTitle>
            <MessageText>
              企業からの案件を割り振って、実際に報酬を得ながら実践的なスキルを習得します。
              メンターのサポートのもと、リアルなビジネス環境で成長していきます。
            </MessageText>
            <NoticeText>
              ※ 案件参加には保護者の同意が必要になります
            </NoticeText>
            <JobRequestButton onClick={handleJobRequest}>
              if(塾)の塾生に仕事を依頼する
            </JobRequestButton>
          </MessageContainer>
        </motion.div>
      </ContentWrapper>
    </ChallengeContainer>
  );
};

export default Challenge;