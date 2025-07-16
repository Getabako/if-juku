import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const MainVisualContainer = styled.section`
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
  z-index: ${theme.zIndex.background};
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: ${theme.zIndex.content};
  text-align: center;
  color: ${theme.colors.text.primary};
  padding: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.fonts.primary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  box-shadow: ${theme.colors.glow.blue};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.primary.main};
    animation: glitch 0.3s;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

const ScrollArrow = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: ${theme.colors.primary.main};
`;

const MainVisual = () => {
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  const handleCTAClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainVisualContainer id="main-visual">
      <VideoBackground
        src={isMobile ? "/2025/04/ifmvsp-1.mp4" : "/2025/04/ifmv2.mp4"}
        autoPlay
        loop
        muted
        playsInline
      />
      <VideoOverlay />
      <ContentWrapper>
        <MainTitle className="twinkling-text">if(塾)</MainTitle>
        <SubTitle>
          AIと起業を学ぶ、オンラインプログラミング塾<br />
          遠隔・全国対応で、好きなことを学びながら稼げる力を育成
        </SubTitle>
        <CTAButton onClick={handleCTAClick} className="glitch-effect">
          無料体験授業を申し込む
        </CTAButton>
      </ContentWrapper>
      <ScrollIndicator>
        <span>SCROLL</span>
        <ScrollArrow>↓</ScrollArrow>
      </ScrollIndicator>
    </MainVisualContainer>
  );
};

export default MainVisual;