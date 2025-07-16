import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const ScheduleContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: 
    repeating-linear-gradient(
      45deg,
      ${theme.colors.primary.main},
      ${theme.colors.primary.main} 1px,
      transparent 1px,
      transparent 15px
    ),
    repeating-linear-gradient(
      -45deg,
      ${theme.colors.secondary.main},
      ${theme.colors.secondary.main} 1px,
      transparent 1px,
      transparent 15px
    );
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
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

const CalendarFrame = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      transparent 30%,
      rgba(0, 255, 255, 0.1) 70%,
      transparent 100%
    );
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const CalendarHeader = styled.div`
  background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  color: ${theme.colors.background.primary};
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: -2rem -2rem 1rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: -1rem -1rem 1rem;
    font-size: 1rem;
  }
`;

const CalendarContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 500px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 400px;
  }
`;

const CalendarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  text-align: center;
  padding: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 2px solid ${theme.colors.primary.main};
    border-radius: 50%;
    animation: pulse-ring 2s infinite;
  }
  
  @keyframes pulse-ring {
    0% { 
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% { 
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`;

const InfoText = styled(motion.p)`
  text-align: center;
  color: ${theme.colors.text.secondary};
  margin-top: 2rem;
  font-size: 0.9rem;
  line-height: 1.6;
  
  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: all ${theme.animations.duration.fast};
    
    &:hover {
      text-shadow: ${theme.colors.glow.blue};
      text-decoration: underline;
    }
  }
`;

const Schedule = () => {
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ScheduleContainer id="schedule">
      <BackgroundPattern />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            授業スケジュール
          </SectionTitle>
          
          <CalendarFrame variants={itemVariants} className="cyber-frame">
            <CalendarHeader>
              if(塾) 授業カレンダー
            </CalendarHeader>
            
            <CalendarContainer>
              <CalendarPlaceholder>
                <div>
                  <p>Google カレンダーがここに表示されます</p>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    {isMobile ? 'アジェンダ表示' : 'カレンダー表示'}
                  </p>
                </div>
              </CalendarPlaceholder>
            </CalendarContainer>
          </CalendarFrame>
          
          <InfoText variants={itemVariants}>
            授業は基本的にオンラインで実施されます。<br />
            詳しいスケジュールは入塾後にご案内いたします。
          </InfoText>
        </motion.div>
      </ContentWrapper>
    </ScheduleContainer>
  );
};

export default Schedule;