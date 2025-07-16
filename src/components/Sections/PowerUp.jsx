import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const PowerUpContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const ComicBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before {
    content: 'POW!';
    position: absolute;
    top: 15%;
    left: 10%;
    font-size: 3rem;
    color: ${theme.colors.secondary.main};
    font-weight: bold;
    font-family: ${theme.fonts.secondary};
    animation: comic-pop 3s ease-in-out infinite;
  }
  
  &::after {
    content: 'BOOM!';
    position: absolute;
    bottom: 15%;
    right: 10%;
    font-size: 2.5rem;
    color: ${theme.colors.primary.main};
    font-weight: bold;
    font-family: ${theme.fonts.secondary};
    animation: comic-pop 3s ease-in-out infinite 1.5s;
  }
  
  @keyframes comic-pop {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(5deg); }
  }
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
  height: 100%;
  overflow-y: auto;
  
  /* カスタムスクロールバー */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: 4px;
    
    &:hover {
      background: ${theme.colors.primary.light};
    }
  }
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

const ComicSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 600px;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 500px;
  }
`;

const ComicImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
  cursor: pointer;
  user-select: none;
`;

const NavigationControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 1px solid ${theme.colors.primary.main};
  backdrop-filter: blur(10px);
`;

const NavigationButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px ${theme.colors.primary.main};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.div`
  color: ${theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    min-width: 60px;
  }
`;

const AutoPlayToggle = styled(motion.button)`
  background: ${props => props.isPlaying ? 
    `linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})` : 
    'transparent'};
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.text.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all ${theme.animations.duration.normal};
  margin-top: 1rem;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px ${theme.colors.secondary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.3rem 0.8rem;
    font-size: 0.7rem;
  }
`;

const PowerUp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  // PC版とモバイル版の画像データ
  const pcImages = [
    "/2025/03/ifcomicpc5.png",
    "/2025/03/ifcomicpc6.png",
    "/2025/04/ifcomicpc7.png",
    "/2025/03/ifcomicpc8.png",
    "/2025/03/ifcomicpc9.png",
    "/2025/03/ifcomicpc10.png",
    "/2025/03/ifcomicpc11.png",
    "/2025/03/ifcomicpc12.png",
    "/2025/03/ifcomicpc13.png",
    "/2025/03/ifcomicpc14.png"
  ];

  const mobileImages = [
    "/2025/03/ifcomicsp2.png",
    "/2025/03/ifcomicsp3.png",
    "/2025/03/ifcomicsp4.png",
    "/2025/03/ifcomicsp5.png",
    "/2025/03/ifcomicsp6.png",
    "/2025/03/ifcomicsp7.png",
    "/2025/03/ifcomicsp8.png",
    "/2025/03/ifcomicsp9.png",
    "/2025/03/ifcomicsp10.png",
    "/2025/03/ifcomicsp11.png",
    "/2025/03/ifcomicsp12.png",
    "/2025/03/ifcomicsp13.png",
    "/2025/03/ifcomicsp14.png",
    "/2025/03/ifcomicsp15.png",
    "/2025/03/ifcomicsp16.png",
    "/2025/03/ifcomicsp17.png",
    "/2025/03/ifcomicsp18.png",
    "/2025/03/ifcomicsp19.png",
    "/2025/03/ifcomicsp20.png",
    "/2025/03/ifcomicsp21.png"
  ];

  const images = isMobile ? mobileImages : pcImages;

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
      setIsAutoPlaying(false);
    } else {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      setAutoPlayInterval(interval);
      setIsAutoPlaying(true);
    }
  };

  React.useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [autoPlayInterval]);

  // デバイス変更時に現在のページをリセット
  React.useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  const imageVariants = {
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

  return (
    <PowerUpContainer id="powerup">
      <ComicBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          if(塾)でキミもパワーUP！
        </SectionTitle>
        
        <ComicSlider className="cyber-frame">
          <AnimatePresence mode="wait" initial={false}>
            <ComicImage
              key={currentPage}
              src={images[currentPage]}
              alt={`パワーUP コミック ${currentPage + 1}`}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  handleNext();
                } else if (swipe > 10000) {
                  handlePrevious();
                }
              }}
            />
          </AnimatePresence>
          
          <NavigationControls>
            <NavigationButton
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </NavigationButton>
            
            <PageIndicator>
              {currentPage + 1} / {images.length}
            </PageIndicator>
            
            <NavigationButton
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </NavigationButton>
          </NavigationControls>
        </ComicSlider>
        
        <AutoPlayToggle
          isPlaying={isAutoPlaying}
          onClick={toggleAutoPlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? '⏸️ 一時停止' : '▶️ 自動再生'}
        </AutoPlayToggle>
      </ContentWrapper>
    </PowerUpContainer>
  );
};

export default PowerUp;