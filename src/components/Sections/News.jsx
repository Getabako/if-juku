import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';

const NewsContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const NewsTickerBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before {
    content: 'BREAKING NEWS • 最新情報 • UPDATE • ニュース • ';
    position: absolute;
    top: 20%;
    left: 0;
    width: 200%;
    color: ${theme.colors.primary.main};
    font-family: ${theme.fonts.secondary};
    font-size: 1.2rem;
    white-space: nowrap;
    animation: news-ticker 20s linear infinite;
  }
  
  &::after {
    content: 'LATEST • 最新 • NEWS • お知らせ • UPDATE • ';
    position: absolute;
    bottom: 20%;
    right: 0;
    width: 200%;
    color: ${theme.colors.secondary.main};
    font-family: ${theme.fonts.secondary};
    font-size: 1.2rem;
    white-space: nowrap;
    animation: news-ticker 25s linear infinite reverse;
  }
  
  @keyframes news-ticker {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
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

const NewsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const NewsCard = styled(motion.div)`
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
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 40%,
      rgba(0, 255, 255, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NewsIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const NewsInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NewsCategory = styled.span`
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.background.primary};
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.6rem;
    padding: 0.1rem 0.5rem;
  }
`;

const NewsDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.text.secondary};
  margin-top: 0.2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`;

const NewsTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  line-height: 1.3;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const NewsExcerpt = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    display: none;
  }
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

const News = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsPosts = async () => {
      try {
        // newsカテゴリーのインデックスを読み込み
        const indexModule = await import('../../data/posts/news/index.json');
        const posts = indexModule.default.posts;
        
        console.log('Loaded news posts:', posts); // デバッグログ
        // 最新の投稿を取得（日付順にソート済み）
        setNewsPosts(posts);
      } catch (error) {
        console.error('Error loading news posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsPosts();
  }, []);

  // プレースホルダーデータ（実際のデータがない場合の表示用）
  const placeholderNews = [
    {
      id: 1,
      title: "新コース「AI活用プログラミング」開講のお知らせ",
      excerpt: "最新のAI技術を活用したプログラミング学習コースが開講されます。ChatGPTやGeminiなどの最新AIツールを使用した効率的な学習方法を学べます。",
      date: "2024/01/15",
      category: "重要",
      icon: "🎓"
    },
    {
      id: 2,
      title: "春の特別体験授業開催決定！",
      excerpt: "3月に無料の特別体験授業を開催します。マインクラフトやAIプログラミングを実際に体験できる絶好の機会です。",
      date: "2024/01/20",
      category: "イベント",
      icon: "✨"
    },
    {
      id: 3,
      title: "塾生の作品がコンテストで入賞！",
      excerpt: "if(塾)の生徒が制作したマインクラフト作品が全国コンテストで優秀賞を受賞しました。日頃の学習成果が実を結んだ素晴らしい結果です。",
      date: "2024/01/25",
      category: "成果",
      icon: "🏆"
    },
    {
      id: 4,
      title: "オンライン教材のアップデート",
      excerpt: "学習管理システムと教材コンテンツを大幅にアップデートしました。より使いやすく、効果的な学習体験を提供します。",
      date: "2024/02/01",
      category: "アップデート",
      icon: "🔄"
    },
    {
      id: 5,
      title: "新メンター紹介",
      excerpt: "経験豊富な新しいメンターが加わりました。Web開発とAI分野の専門家として、生徒の学習をサポートします。",
      date: "2024/02/05",
      category: "メンバー",
      icon: "👨‍🏫"
    },
    {
      id: 6,
      title: "GWスペシャル企画開催予定",
      excerpt: "ゴールデンウィークに特別な集中講座を開催予定です。普段より深く学習できる絶好の機会をお見逃しなく！",
      date: "2024/02/10",
      category: "予告",
      icon: "🌟"
    }
  ];

  const handleShowMore = () => {
    navigate('/blog/news');
  };

  const handleCardClick = (postId) => {
    console.log('News card clicked, navigating to:', `/post/${postId}`); // デバッグログ
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

  const getCategoryIcon = (title) => {
    if (title.includes('採択') || title.includes('優勝')) return '🏆';
    if (title.includes('イベント') || title.includes('開催')) return '✨';
    if (title.includes('紹介') || title.includes('取材')) return '📺';
    if (title.includes('募集') || title.includes('参加')) return '📢';
    return '📢';
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
    <NewsContainer id="news">
      <NewsTickerBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          お知らせ
        </SectionTitle>
        
        {loading && (
          <PlaceholderText>
            📢 最新のお知らせを読み込み中...
          </PlaceholderText>
        )}
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <NewsGrid variants={containerVariants}>
            {newsPosts.length > 0 ? (
              newsPosts.slice(0, visibleCount).map((post) => (
                <NewsCard
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cyber-frame"
                  onClick={() => handleCardClick(post.id)}
                >
                  <NewsHeader>
                    <NewsIcon>{getCategoryIcon(post.title)}</NewsIcon>
                    <NewsInfo>
                      <NewsCategory>お知らせ</NewsCategory>
                      <NewsDate>{formatDate(post.date)}</NewsDate>
                    </NewsInfo>
                  </NewsHeader>
                  <NewsTitle>{post.title}</NewsTitle>
                  <NewsExcerpt>{post.excerpt}</NewsExcerpt>
                </NewsCard>
              ))
            ) : (
              !loading && placeholderNews.slice(0, visibleCount).map((news) => (
                <NewsCard
                  key={news.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cyber-frame"
                >
                  <NewsHeader>
                    <NewsIcon>{news.icon}</NewsIcon>
                    <NewsInfo>
                      <NewsCategory>{news.category}</NewsCategory>
                      <NewsDate>{news.date}</NewsDate>
                    </NewsInfo>
                  </NewsHeader>
                  <NewsTitle>{news.title}</NewsTitle>
                  <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                </NewsCard>
              ))
            )}
          </NewsGrid>
          
          {(newsPosts.length > visibleCount || (!loading && newsPosts.length === 0)) && (
            <ShowMoreButton
              onClick={handleShowMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glitch-effect"
            >
              お知らせをもっと見る
            </ShowMoreButton>
          )}
        </motion.div>
      </ContentWrapper>
    </NewsContainer>
  );
};

export default News;