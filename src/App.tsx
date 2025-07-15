import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import { useSwiper } from './hooks/useSwiper';

// Sections
import MainVisual from './sections/MainVisual';
import AboutSection from './sections/AboutSection';
import CourseSection from './sections/CourseSection';
import ScheduleSection from './sections/ScheduleSection';
import ServiceSection from './sections/ServiceSection';
import ChallengeSection from './sections/ChallengeSection';
import BeginnerSection from './sections/BeginnerSection';
import IssuesSection from './sections/IssuesSection';
import FlowSection from './sections/FlowSection';
import MembersSection from './sections/MembersSection';
import MaterialsSection from './sections/MaterialsSection';
import NewsSection from './sections/NewsSection';
import FAQSection from './sections/FAQSection';
import YouTubeSection from './sections/YouTubeSection';
import PowerUpSection from './sections/PowerUpSection';
import ContactSection from './sections/ContactSection';
import WorkRequestSection from './sections/WorkRequestSection';
import KitazunaSection from './sections/KitazunaSection';

// Components
import Navigation from './components/Navigation';
import BlogPost from './components/BlogPost';
import SwipeGuide from './components/SwipeGuide';

// メインページコンポーネント
const MainPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { swiperRef } = useSwiper();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          enabled: true,
          sensitivity: 0.5,
          releaseOnEdges: true,
          thresholdDelta: 50,
          thresholdTime: 300,
        }}
        keyboard={{
          enabled: true,
        }}
        speed={600}
        modules={[Mousewheel, Keyboard, Pagination]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        onSwiper={(swiper: any) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide><MainVisual /></SwiperSlide>
        <SwiperSlide id="if-about"><AboutSection /></SwiperSlide>
        <SwiperSlide id="courses"><CourseSection /></SwiperSlide>
        <SwiperSlide id="schedule"><ScheduleSection /></SwiperSlide>
        <SwiperSlide id="services"><ServiceSection /></SwiperSlide>
        <SwiperSlide id="if-challenge"><ChallengeSection /></SwiperSlide>
        <SwiperSlide id="if-challenge-beginner"><BeginnerSection /></SwiperSlide>
        <SwiperSlide id="if-issues"><IssuesSection /></SwiperSlide>
        <SwiperSlide id="flow"><FlowSection /></SwiperSlide>
        <SwiperSlide id="members"><MembersSection /></SwiperSlide>
        <SwiperSlide id="materials"><MaterialsSection /></SwiperSlide>
        <SwiperSlide id="news"><NewsSection /></SwiperSlide>
        <SwiperSlide id="faq"><FAQSection /></SwiperSlide>
        <SwiperSlide id="youtube"><YouTubeSection /></SwiperSlide>
        
        {/* PowerUp Section - PC/SP分岐 */}
        {!isMobile ? (
          <>
            <SwiperSlide id="if-powerup" className="pc-only"><PowerUpSection pageNumber={1} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={2} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={3} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={4} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={5} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={6} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={7} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={8} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={9} isMobile={false} /></SwiperSlide>
            <SwiperSlide className="pc-only"><PowerUpSection pageNumber={10} isMobile={false} /></SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide id="if-powerup" className="sp-only"><PowerUpSection pageNumber={1} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={2} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={3} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={4} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={5} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={6} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={7} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={8} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={9} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={10} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={11} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={12} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={13} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={14} isMobile={true} /></SwiperSlide>
            <SwiperSlide className="sp-only"><PowerUpSection pageNumber={15} isMobile={true} /></SwiperSlide>
          </>
        )}
        
        <SwiperSlide id="contact"><ContactSection /></SwiperSlide>
        <SwiperSlide id="work-request"><WorkRequestSection /></SwiperSlide>
        <SwiperSlide id="kitazuna"><KitazunaSection /></SwiperSlide>
      </Swiper>
      <SwipeGuide />
    </div>
  );
};

// メインAppコンポーネント
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
