import React from 'react';

interface PowerUpSectionProps {
  pageNumber: number;
  isMobile: boolean;
}

const PowerUpSection: React.FC<PowerUpSectionProps> = ({ pageNumber, isMobile }) => {
  const getImageUrl = (pageNumber: number, isMobile: boolean) => {
    if (!isMobile) {
      // PC版の画像URL
      if (pageNumber === 3) {
        return `/2025/04/ifcomicpc7.png`;
      }
      return `https://if-juku.net/wp-content/uploads/2025/03/ifcomicpc${pageNumber + 4}.png`;
    } else {
      // SP版の画像URL
      return `https://if-juku.net/wp-content/uploads/2025/03/ifcomicsp${pageNumber + 1}.png`;
    }
  };

  return (
    <div className="powerup-section section-container">
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#000'
      }}>
        <img 
          src={getImageUrl(pageNumber, isMobile)}
          alt={`パワーアップ${isMobile ? 'SP' : 'PC'}${pageNumber}`}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain' 
          }}
        />
      </div>
    </div>
  );
};

export default PowerUpSection;