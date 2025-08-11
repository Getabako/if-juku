import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { MATERIALS_INDEX } from '../../data/staticData';

const MaterialsContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const CodeBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before {
    content: '{ "code": "learning", "status": "active" }';
    position: absolute;
    top: 20%;
    left: 5%;
    color: ${theme.colors.primary.main};
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    white-space: pre-wrap;
    animation: type 10s infinite;
  }
  
  &::after {
    content: 'if(learning) { success(); }';
    position: absolute;
    bottom: 20%;
    right: 5%;
    color: ${theme.colors.secondary.main};
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    animation: type 8s infinite reverse;
  }
  
  @keyframes type {
    0%, 50% { opacity: 0; }
    51%, 100% { opacity: 1; }
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

const MaterialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const MaterialCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const MaterialImage = styled.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  opacity: 0.7;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100px;
    font-size: 2rem;
  }
`;

const MaterialTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const MaterialDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    display: none;
  }
`;

const MaterialDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.text.secondary};
  opacity: 0.7;
`;

const ShowMoreButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  margin: 2rem auto 0;
  display: block;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px ${theme.colors.primary.main};
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

const Materials = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);
  const [minecraftPosts, setMinecraftPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMinecraftPosts = async () => {
      try {
        // minecraftカテゴリーのインデックスを読み込み
        const posts = MATERIALS_INDEX.posts;
        
        console.log('Loaded minecraft posts:', posts); // デバッグログ
        // 最新の投稿を取得（日付順にソート済み）
        setMinecraftPosts(posts);
      } catch (error) {
        console.error('Error loading minecraft posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMinecraftPosts();
  }, []);

  // プレースホルダーデータ（実際のデータがない場合の表示用）
  const placeholderMaterials = [
    {
      id: 1,
      title: "Minecraft基礎講座",
      description: "マインクラフトの基本操作から建築の基礎まで学びます。",
      date: "2024/01/15",
      icon: "🎮"
    },
    {
      id: 2,
      title: "AI活用入門",
      description: "ChatGPTやGeminiなどのAIツールの効果的な使い方を学びます。",
      date: "2024/01/20",
      icon: "🤖"
    },
    {
      id: 3,
      title: "プログラミング基礎",
      description: "プログラミングの基本概念と実践的なコーディングスキルを習得します。",
      date: "2024/01/25",
      icon: "💻"
    },
    {
      id: 4,
      title: "Web開発入門",
      description: "HTML、CSS、JavaScriptの基礎からWebサイト制作まで。",
      date: "2024/02/01",
      icon: "🌐"
    },
    {
      id: 5,
      title: "起業家精神",
      description: "ビジネスマインドと起業に必要な基本知識を学びます。",
      date: "2024/02/05",
      icon: "💡"
    },
    {
      id: 6,
      title: "デジタルマーケティング",
      description: "SNSマーケティングやオンライン販売の基礎を学びます。",
      date: "2024/02/10",
      icon: "📱"
    }
  ];

  const handleShowMore = () => {
    navigate('/blog/minecraft');
  };

  const handleCardClick = (postId) => {
    console.log('Card clicked, navigating to:', `/post/${postId}`); // デバッグログ
    navigate(`/post/${postId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
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
    <MaterialsContainer id="materials">
      <CodeBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          オンライン教材
        </SectionTitle>
        
        {loading && (
          <PlaceholderText>
            📚 Minecraft教材を読み込み中...
          </PlaceholderText>
        )}
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <MaterialsGrid variants={containerVariants}>
            {minecraftPosts.length > 0 ? (
              minecraftPosts.slice(0, visibleCount).map((post) => (
                <MaterialCard
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="cyber-frame"
                  onClick={() => handleCardClick(post.id)}
                >
                  <MaterialImage>
                    🎮
                  </MaterialImage>
                  <MaterialTitle>{post.title}</MaterialTitle>
                  <MaterialDescription>{post.excerpt}</MaterialDescription>
                  <MaterialDate>{formatDate(post.date)}</MaterialDate>
                </MaterialCard>
              ))
            ) : (
              !loading && placeholderMaterials.slice(0, visibleCount).map((material) => (
                <MaterialCard
                  key={material.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="cyber-frame"
                >
                  <MaterialImage>
                    {material.icon}
                  </MaterialImage>
                  <MaterialTitle>{material.title}</MaterialTitle>
                  <MaterialDescription>{material.description}</MaterialDescription>
                  <MaterialDate>{material.date}</MaterialDate>
                </MaterialCard>
              ))
            )}
          </MaterialsGrid>
          
          {(minecraftPosts.length > visibleCount || (!loading && minecraftPosts.length === 0)) && (
            <ShowMoreButton
              onClick={handleShowMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glitch-effect"
            >
              Minecraft記事をもっと見る
            </ShowMoreButton>
          )}
        </motion.div>
      </ContentWrapper>
    </MaterialsContainer>
  );
};

export default Materials;