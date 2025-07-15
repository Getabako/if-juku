import React, { useState, useEffect } from 'react';
import './YouTubeSection.css';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

const YouTubeSection: React.FC = () => {
  // 初期ダミーデータ（スクロール開始用）
  const initialDummyVideos: YouTubeVideo[] = [
    {
      id: "loading1",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading2",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading3",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading4",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading5",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading6",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading7",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    },
    {
      id: "loading8",
      title: "動画を読み込み中...",
      thumbnail: "https://via.placeholder.com/480x360?text=Loading",
      publishedAt: new Date().toISOString(),
      description: "YouTubeチャンネルから動画を読み込んでいます"
    }
  ];

  const [videos, setVideos] = useState<YouTubeVideo[]>(initialDummyVideos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // if-jukuのチャンネルID
  const CHANNEL_ID = 'UCB_YF1CyU1nu-g3kmRsgmkA';
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      
      // CORSを回避するためのプロキシサーバーを使用
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(proxyUrl + encodeURIComponent(RSS_URL));
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      const entries = xml.getElementsByTagName('entry');
      const videoList: YouTubeVideo[] = [];
      
      // 6本の動画を取得（2列×3本）
      for (let i = 0; i < Math.min(entries.length, 6); i++) {
        const entry = entries[i];
        const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent || '';
        const title = entry.getElementsByTagName('title')[0]?.textContent || '';
        const published = entry.getElementsByTagName('published')[0]?.textContent || '';
        const mediaGroup = entry.getElementsByTagName('media:group')[0];
        const description = mediaGroup?.getElementsByTagName('media:description')[0]?.textContent || '';
        const thumbnail = mediaGroup?.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') || '';
        
        videoList.push({
          id: videoId,
          title,
          thumbnail,
          publishedAt: published,
          description
        });
      }
      
      setVideos(videoList);
      setError(null);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError('動画の読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="youtube-section">
      <div className="youtube-bg">
        <div className="youtube-title-container">
          <h2 className="youtube-title twinkling-text">YouTube</h2>
        </div>
        
        <div className="stars-background">
          <div className="stars stars-layer1"></div>
          <div className="stars stars-layer2"></div>
          <div className="stars stars-layer3"></div>
        </div>
        
        <div className="youtube-content-wrapper">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">動画を読み込み中...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-text">{error}</p>
              <button onClick={fetchYouTubeVideos} className="retry-button">
                再試行
              </button>
            </div>
          ) : (
            <div className="youtube-scroll-container">
              {/* 1列目: 下から上へスクロール */}
              <div className="youtube-column youtube-column-1">
                <div className="youtube-track scroll-bottom-to-top">
                  {videos.slice(0, 3).map((video) => (
                    <article key={`col1-1-${video.id}`} className="youtube-card">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-link">
                        <div className="video-thumbnail">
                          <img src={video.thumbnail} alt={video.title} />
                          <div className="play-overlay">
                            <div className="play-button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="video-content">
                          <h3 className="video-title">{video.title}</h3>
                          <div className="video-meta">
                            <span className="video-date">{formatDate(video.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                  {/* 複製（無限ループ用） */}
                  {videos.slice(0, 3).map((video) => (
                    <article key={`col1-2-${video.id}`} className="youtube-card">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-link">
                        <div className="video-thumbnail">
                          <img src={video.thumbnail} alt={video.title} />
                          <div className="play-overlay">
                            <div className="play-button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="video-content">
                          <h3 className="video-title">{video.title}</h3>
                          <div className="video-meta">
                            <span className="video-date">{formatDate(video.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              {/* 2列目: 上から下へスクロール */}
              <div className="youtube-column youtube-column-2">
                <div className="youtube-track scroll-top-to-bottom">
                  {videos.slice(3, 6).map((video) => (
                    <article key={`col2-1-${video.id}`} className="youtube-card">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-link">
                        <div className="video-thumbnail">
                          <img src={video.thumbnail} alt={video.title} />
                          <div className="play-overlay">
                            <div className="play-button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="video-content">
                          <h3 className="video-title">{video.title}</h3>
                          <div className="video-meta">
                            <span className="video-date">{formatDate(video.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                  {/* 複製（無限ループ用） */}
                  {videos.slice(3, 6).map((video) => (
                    <article key={`col2-2-${video.id}`} className="youtube-card">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-link">
                        <div className="video-thumbnail">
                          <img src={video.thumbnail} alt={video.title} />
                          <div className="play-overlay">
                            <div className="play-button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="video-content">
                          <h3 className="video-title">{video.title}</h3>
                          <div className="video-meta">
                            <span className="video-date">{formatDate(video.publishedAt)}</span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="channel-link-container">
            <a href="https://www.youtube.com/@if-juku" className="channel-link" target="_blank" rel="noopener noreferrer">
              チャンネルを見る
              <span className="channel-icon">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;