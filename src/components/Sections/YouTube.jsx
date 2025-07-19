import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const YouTubeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const PlayButtonBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.05;
  
  &::before {
    content: '▶';
    position: absolute;
    top: 20%;
    left: 15%;
    font-size: 8rem;
    color: ${theme.colors.primary.main};
    animation: pulse-play 4s ease-in-out infinite;
  }
  
  &::after {
    content: '▶';
    position: absolute;
    bottom: 20%;
    right: 15%;
    font-size: 6rem;
    color: ${theme.colors.secondary.main};
    animation: pulse-play 4s ease-in-out infinite 2s;
  }
  
  @keyframes pulse-play {
    0%, 100% { transform: scale(1); opacity: 0.05; }
    50% { transform: scale(1.2); opacity: 0.1; }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const VideoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const VideoCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 150px;
  }
`;

const ChannelInfo = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
`;

const ChannelName = styled.h3`
  font-size: 2rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
`;

const ChannelHandle = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.secondary.main};
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ChannelDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  z-index: 2;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${theme.colors.background.primary};
  transition: all ${theme.animations.duration.normal};
  
  &::before {
    content: '▶';
    margin-left: 3px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const VideoInfo = styled.div`
  padding: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const VideoTitle = styled.h3`
  font-size: 1.1rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  line-height: 1.3;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const VideoDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const VideoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${theme.colors.text.secondary};
  opacity: 0.8;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`;

const ViewCount = styled.span`
  &::before {
    content: '👁 ';
  }
`;

const PublishDate = styled.span`
  &::before {
    content: '📅 ';
  }
`;

const ChannelButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  border: 2px solid #ff0000;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  }
  
  &::before {
    content: '📺';
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const PlaceholderText = styled.div`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
`;

const YouTube = () => {
  // if(塾)チャンネルの動画情報
  const channelInfo = {
    name: "if(塾)",
    handle: "@if-juku", 
    url: "https://www.youtube.com/@if-juku",
    description: "AIとプログラミングを学ぶオンライン塾",
    subscribers: "最新の学習動画を配信中"
  };

  const videoPlaceholders = [
    {
      id: 1,
      title: "if(塾)の学習方法紹介",
      description: "AIを活用した効率的な学習方法をご紹介します。",
      thumbnail: "🎓"
    },
    {
      id: 2,
      title: "生徒作品発表会",
      description: "if(塾)の生徒が制作した素晴らしい作品をご覧ください。",
      thumbnail: "🎨"
    },
    {
      id: 3,
      title: "プログラミング入門講座",
      description: "初心者でも分かりやすいプログラミングの基礎を解説。",
      thumbnail: "💻"
    }
  ];

  const handleChannelClick = () => {
    window.open('https://www.youtube.com/@if-juku', '_blank');
  };

  const handleVideoClick = () => {
    window.open(channelInfo.url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <YouTubeContainer id="youtube">
      <PlayButtonBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          YouTube
        </SectionTitle>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ChannelInfo variants={itemVariants} className="cyber-frame">
            <ChannelName>{channelInfo.name}</ChannelName>
            <ChannelHandle>{channelInfo.handle}</ChannelHandle>
            <ChannelDescription>{channelInfo.description}</ChannelDescription>
            <ChannelDescription>{channelInfo.subscribers}</ChannelDescription>
          </ChannelInfo>

          <VideoGrid variants={containerVariants}>
            {videoPlaceholders.map((video) => (
              <VideoCard
                key={video.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cyber-frame"
                onClick={handleVideoClick}
              >
                <VideoThumbnail>
                  <motion.div
                    style={{ fontSize: '4rem', zIndex: 2, position: 'relative' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {video.thumbnail}
                  </motion.div>
                  <PlayButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </VideoThumbnail>
                
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoDescription>{video.description}</VideoDescription>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
          
          <ChannelButton
            onClick={handleChannelClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            YouTubeチャンネルへ
          </ChannelButton>
        </motion.div>
      </ContentWrapper>
    </YouTubeContainer>
  );
};

export default YouTube;