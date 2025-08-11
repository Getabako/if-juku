import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogList.css';
import postsIndex from '../data/posts/index.json';

interface PostSummary {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

interface CategoryInfo {
  minecraft: string;
  news: string;
  blog: string;
  'ai-lectures': string;
  others: string;
  [key: string]: string;
}

const categoryNames: CategoryInfo = {
  minecraft: 'Minecraft',
  news: 'お知らせ',
  blog: 'if塾ブログ',
  'ai-lectures': 'AI講座',
  others: 'その他'
};

const BlogList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        
        // 全体のインデックスを使用
        const allPosts = postsIndex.posts;
        
        // カテゴリーでフィルタリング
        let filteredPosts = allPosts;
        if (category && category !== 'all') {
          filteredPosts = allPosts.filter((post: PostSummary) => post.category === category);
        }
        
        setPosts(filteredPosts);
        setError(null);
        
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    if (newCategory === 'all') {
      navigate('/blog');
    } else {
      navigate(`/blog/${newCategory}`);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="blog-list-header">
          <Link to="/" className="back-to-home">← ホームに戻る</Link>
        </div>
        <div className="blog-list-loading">
          <div className="loading-spinner"></div>
          <p>記事を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-list-container">
        <div className="blog-list-header">
          <Link to="/" className="back-to-home">← ホームに戻る</Link>
        </div>
        <div className="blog-list-error">
          <h2>エラー</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <Link to="/" className="back-to-home">← ホームに戻る</Link>
        <h1 className="blog-list-title">ブログ記事一覧</h1>
      </div>

      <div className="blog-list-content">
        <div className="category-filter">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''} 
            onClick={() => handleCategoryChange('all')}
          >
            すべて
          </button>
          {Object.entries(categoryNames).map(([key, name]) => (
            <button 
              key={key}
              className={selectedCategory === key ? 'active' : ''} 
              onClick={() => handleCategoryChange(key)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="posts-grid">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>記事が見つかりませんでした</p>
            </div>
          ) : (
            posts.map(post => (
              <article key={post.id} className="post-card">
                <Link to={`/post/${post.id}`} className="post-link">
                  <div className="post-card-content">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-meta">
                      <span className="post-date">{formatDate(post.date)}</span>
                      <span className="post-category">{categoryNames[post.category] || post.category}</span>
                    </div>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <span className="read-more">記事を読む →</span>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;