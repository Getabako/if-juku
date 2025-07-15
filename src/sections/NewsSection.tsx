import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewsSection.css';
import { loadNewsPosts } from '../utils/postLoader';
import type { Post } from '../utils/postLoader';

// Post型を拡張してcategoryを追加
interface NewsPost extends Post {
  category: string;
}

const NewsSection: React.FC = () => {
  // 初期ダミーデータ（スクロール開始用）
  const initialDummyPosts: NewsPost[] = [
    {
      id: 0,
      title: "読み込み中...",
      excerpt: "お知らせを読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["お知らせ"],
      category: "お知らせ"
    },
    {
      id: 1,
      title: "読み込み中...",
      excerpt: "お知らせを読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["お知らせ"],
      category: "お知らせ"
    },
    {
      id: 2,
      title: "読み込み中...",
      excerpt: "お知らせを読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["お知らせ"],
      category: "お知らせ"
    },
    {
      id: 3,
      title: "読み込み中...",
      excerpt: "お知らせを読み込んでいます",
      content: "",
      featuredImage: "https://via.placeholder.com/400x300?text=Loading",
      link: "#",
      date: new Date().toISOString(),
      author: "if(塾)",
      categories: ["お知らせ"],
      category: "お知らせ"
    }
  ];

  const [posts, setPosts] = useState<NewsPost[]>(initialDummyPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // カテゴリ別フォルダからニュース関連記事を読み込み（マインクラフト以外）
    const loadPosts = async () => {
      setLoading(true);
      
      try {
        const newsPosts = await loadNewsPosts(12); // ループ用に多めに取得
        // NewsPost型に変換（カテゴリを追加）
        const newsPostsWithCategory: NewsPost[] = newsPosts.map(post => ({
          ...post,
          category: post.categories[0] || 'お知らせ'
        }));
        setPosts(newsPostsWithCategory);
      } catch (error) {
        console.error('Failed to load news posts:', error);
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
    <div className="news-section">
      <div className="news-bg">
        <div className="news-title-container">
          <h2 className="news-title twinkling-text">お知らせ</h2>
        </div>
        
        <div className="energy-background">
          <div className="energy-rays"></div>
          <div className="energy-particles"></div>
          <div className="energy-glow"></div>
        </div>
        
        <div className="news-content-wrapper">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">お知らせを読み込み中...</p>
            </div>
          ) : (
            <div className="news-scroll-container">
              <div className="news-scroll-track">
                {/* 元の記事群 */}
                {posts.map((post) => (
                  <article key={`original-${post.id}`} className="news-card">
                    <div className="card-header">
                      <div className="card-category">{post.category}</div>
                      <div className="card-date">{formatDate(post.date)}</div>
                    </div>
                    <div className="card-image">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title" title={post.title}>{truncateTitle(post.title)}</h3>
                      <Link to={`/blog/${post.id}`} className="card-link">
                        詳細を見る
                        <span className="link-icon">⚡</span>
                      </Link>
                    </div>
                  </article>
                ))}
                {/* 複製した記事群（無限ループ用） */}
                {posts.map((post) => (
                  <article key={`duplicate-${post.id}`} className="news-card">
                    <div className="card-header">
                      <div className="card-category">{post.category}</div>
                      <div className="card-date">{formatDate(post.date)}</div>
                    </div>
                    <div className="card-image">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title" title={post.title}>{truncateTitle(post.title)}</h3>
                      <Link to={`/blog/${post.id}`} className="card-link">
                        詳細を見る
                        <span className="link-icon">⚡</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          
          <div className="more-link-container">
            <a href="https://if-juku.net/" className="more-link">
              すべてのお知らせを見る
              <span className="more-arrow">⚡⚡</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;