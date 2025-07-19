import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Keyboard } from 'swiper/modules';
import { useSwiper } from '../hooks/useSwiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// セクションコンポーネント
import MainVisual from '../components/Sections/MainVisual';
import About from '../components/Sections/About';
import Courses from '../components/Sections/Courses';
import Schedule from '../components/Sections/Schedule';
import Services from '../components/Sections/Services';
import Challenge from '../components/Sections/Challenge';
import ChallengeForBeginner from '../components/Sections/ChallengeForBeginner';
import Issues from '../components/Sections/Issues';
import Flow from '../components/Sections/Flow';
import Members from '../components/Sections/Members';
import Materials from '../components/Sections/Materials';
import News from '../components/Sections/News';
import FAQ from '../components/Sections/FAQ';
import YouTube from '../components/Sections/YouTube';
import PowerUp from '../components/Sections/PowerUp';
import Message from '../components/Sections/Message';
import BusinessInquiry from '../components/Sections/BusinessInquiry';
import Kitazuna from '../components/Sections/Kitazuna';
import Contact from '../components/Sections/Contact';

// ナビゲーション
import CyberNav from '../components/Navigation/CyberNav';
import MobileNav from '../components/Navigation/MobileNav';

const sections = [
  { id: 'main-visual', component: MainVisual },
  { id: 'about', component: About },
  { id: 'courses', component: Courses },
  { id: 'schedule', component: Schedule },
  { id: 'services', component: Services },
  { id: 'challenge', component: Challenge },
  { id: 'challenge-beginner', component: ChallengeForBeginner },
  { id: 'issues', component: Issues },
  { id: 'flow', component: Flow },
  { id: 'members', component: Members },
  { id: 'materials', component: Materials },
  { id: 'news', component: News },
  { id: 'faq', component: FAQ },
  { id: 'youtube', component: YouTube },
  { id: 'powerup', component: PowerUp },
  { id: 'message', component: Message },
  { id: 'business-inquiry', component: BusinessInquiry },
  { id: 'kitazuna', component: Kitazuna },
  { id: 'contact', component: Contact }
];

const HomePage: React.FC = () => {
  const { swiperRef, handleSlideChange } = useSwiper(sections.length);

  const swiperConfig = {
    direction: 'vertical' as const,
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    allowTouchMove: true,
    speed: 600,
    modules: [Mousewheel, Pagination, Keyboard],
    onSlideChange: handleSlideChange,
  };

  return (
    <>
      <CyberNav />
      <MobileNav />
      <Swiper {...swiperConfig} ref={swiperRef}>
        {sections.map((section) => {
          const SectionComponent = section.component;
          return (
            <SwiperSlide key={section.id}>
              <SectionComponent />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default HomePage;