import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MaterialsSection.css';
import { loadMaterialPosts } from '../utils/postLoader';
import type { Post } from '../utils/postLoader';

// Post型はpostLoader.tsで定義済み
type MaterialPost = Post;

const MaterialsSection: React.FC = () => {
  // 初期ダミーデータ（スクロール開始用）
  const initialDummyPosts: MaterialPost[] = [
    {
      id: 0,
      title: "読み込み中...",
      excerpt: "教材を読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["マインクラフト"]
    },
    {
      id: 1,
      title: "読み込み中...",
      excerpt: "教材を読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["マインクラフト"]
    },
    {
      id: 2,
      title: "読み込み中...",
      excerpt: "教材を読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["マインクラフト"]
    },
    {
      id: 3,
      title: "読み込み中...",
      excerpt: "教材を読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["マインクラフト"]
    }
  ];

  const [posts, setPosts] = useState<MaterialPost[]>(initialDummyPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // カテゴリ別フォルダからマインクラフト関連記事を読み込み
    const loadPosts = async () => {
      setLoading(true);
      
      try {
        const materialPosts = await loadMaterialPosts(12); // ループ用に多めに取得
        setPosts(materialPosts);
      } catch (error) {
        console.error('Failed to load material posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateTitle = (title: string, maxLength: number = 10) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <div className="materials-section">
      <div className="materials-bg">
        <div className="materials-title-container">
          <h2 className="materials-title twinkling-text">オンライン教材</h2>
        </div>
        
        <div className="stars-background">
          <div className="stars stars-layer1"></div>
          <div className="stars stars-layer2"></div>
          <div className="stars stars-layer3"></div>
        </div>
        
        <div className="materials-content-wrapper">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">マインクラフト教材を読み込み中...</p>
            </div>
          ) : (
            <div className="materials-scroll-container">
              <div className="materials-scroll-track">
                {/* 元の記事群 */}
                {posts.map((post) => (
                  <article key={`original-${post.id}`} className="material-card">
                    <div className="card-image">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="card-overlay">
                        <span className="card-date">{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title" title={post.title}>{truncateTitle(post.title)}</h3>
                      <Link to={`/blog/${post.id}`} className="card-link">
                        教材を見る
                        <span className="link-arrow">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
                {/* 複製した記事群（無限ループ用） */}
                {posts.map((post) => (
                  <article key={`duplicate-${post.id}`} className="material-card">
                    <div className="card-image">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="card-overlay">
                        <span className="card-date">{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title" title={post.title}>{truncateTitle(post.title)}</h3>
                      <Link to={`/blog/${post.id}`} className="card-link">
                        教材を見る
                        <span className="link-arrow">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          
          <div className="more-link-container">
            <a href="https://if-juku.net/" className="more-link">
              もっと見る
              <span className="more-arrow">»</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsSection;