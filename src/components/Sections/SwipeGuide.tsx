import React, { useEffect, useState } from 'react';
import './SwipeGuide.css';

const SwipeGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const showInterval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }, 7000);

    return () => {
      clearTimeout(fadeTimeout);
      clearInterval(showInterval);
    };
  }, []);

  return (
    <div className={`swipe-guide ${isVisible ? 'visible' : ''}`}>
      <div className="swipe-icon">
        <span></span>
      </div>
      <p>スワイプで次へ</p>
    </div>
  );
};

export default SwipeGuide;