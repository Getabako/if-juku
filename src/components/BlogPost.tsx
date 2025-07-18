import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Post } from '../utils/postLoader';
import './BlogPost.css';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // カテゴリ別フォルダから記事を検索
        const categories = ['ai-lectures', 'blog', 'others'];
        let foundPost: Post | null = null;
        
        for (const category of categories) {
          try {
            // カテゴリのindexを読み込み
            const indexModule = await import(`../data/posts/${category}/index.json`);
            const index = indexModule.default;
            
            // 該当する記事を検索
            const postInfo = index.posts.find((p: any) => p.id === parseInt(id));
            
            if (postInfo) {
              // 記事詳細を読み込み
              const postModule = await import(`../data/posts/${category}/${postInfo.filename}`);
              foundPost = postModule.default;
              break;
            }
          } catch (err) {
            console.log(`Category ${category} not found or empty`);
          }
        }
        
        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError('記事が見つかりませんでした');
        }
        
      } catch (err) {
        console.error('Error loading post:', err);
        setError('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>記事を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h2>エラー</h2>
          <p>{error || '記事が見つかりませんでした'}</p>
          <button onClick={() => navigate(-1)} className="back-button">
            戻る
          </button>
        </div>
      </div>
    );
  }

  // 画像URLを変換する関数
  const convertImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    
    // WordPressのURLから年月とファイル名を抽出
    const match = url.match(/\/(\d{4})\/(\d{2})\/([^\/]+)$/);
    if (match) {
      const [, year, month, filename] = match;
      return `/${year}/${month}/${filename}`;
    }
    
    // 既に相対パスの場合はそのまま返す
    if (url.startsWith('/')) {
      return url;
    }
    
    return url;
  };

  // コンテンツ内の画像URLを変換
  const convertContentImages = (content: string): string => {
    if (!content) return '';
    
    // img src属性のURLを変換
    return content.replace(/https?:\/\/[^\/]+\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s]+)/g, '/$1/$2/$3');
  };

  return (
    <div className="blog-post-container">
      <div className="blog-post-header">
        <Link to="/" className="back-to-home">← ホームに戻る</Link>
        <Link to="/blog" className="back-to-list">← 記事一覧に戻る</Link>
      </div>
      
      <article className="blog-post">
        <header className="blog-post-header-content">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">{formatDate(post.date)}</span>
            <span className="blog-post-author">by {post.author}</span>
            <div className="blog-post-categories">
              {post.categories.map((category, index) => (
                <span key={index} className="blog-post-category">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </header>

        {post.featuredImage && convertImageUrl(post.featuredImage) && (
          <div className="blog-post-image">
            <img src={convertImageUrl(post.featuredImage)!} alt={post.title} />
          </div>
        )}

        <div className="blog-post-content">
          <div className="blog-post-excerpt">
            <p>{post.excerpt}</p>
          </div>
          
          <div className="blog-post-body">
            <div dangerouslySetInnerHTML={{ __html: convertContentImages(post.content) }} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;