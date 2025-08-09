import React, { useState, useEffect } from 'react';
import './ScheduleSection.css';

const ScheduleSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="schedule-section">
      <div className="schedule-bg">
        <div className="schedule-title-container">
          <h2 className="schedule-title twinkling-text">授業スケジュール</h2>
        </div>
        
        <div className="calendar-container cyber-frame">
          <div className="cyber-frame-corner top-left"></div>
          <div className="cyber-frame-corner top-right"></div>
          <div className="cyber-frame-corner bottom-left"></div>
          <div className="cyber-frame-corner bottom-right"></div>
          
          <div className="calendar-wrapper">
            {!isMobile ? (
              <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&bgcolor=%23F09300&title=%E6%8E%88%E6%A5%AD%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB&src=MTc0YWEzMWQ0NjY4YzY0MWMxZWZmYzQxYmZjMjg5YTZmYzlkMzUxZDlhYjgyMmFkZTY1ZDFkNGMyNjIxNzMyZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E4C441"
                style={{ border: "solid 1px #777", width: "100%", height: "100%" }}
                frameBorder="0"
                scrolling="no"
                title="授業スケジュール"
              />
            ) : (
              <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&bgcolor=%23F09300&mode=AGENDA&title=%E6%8E%88%E6%A5%AD%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB&src=MTc0YWEzMWQ0NjY4YzY0MWMxZWZmYzQxYmZjMjg5YTZmYzlkMzUxZDlhYjgyMmFkZTY1ZDFkNGMyNjIxNzMyZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E4C441"
                style={{ border: "solid 1px #777", width: "100%", height: "100%" }}
                frameBorder="0"
                scrolling="no"
                title="授業スケジュール"
              />
            )}
          </div>
          
          <div className="particles-container">
            <div className="particles"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;