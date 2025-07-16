import { useRef, useEffect, useCallback } from 'react';
import { Swiper } from 'swiper/types';

export const useSwiper = (totalSlides: number) => {
  const swiperRef = useRef<Swiper | null>(null);

  const slideToSection = (sectionId: string) => {
    if (!swiperRef.current) return;

    const slides = document.querySelectorAll('.swiper-slide');
    let targetIndex = -1;

    slides.forEach((slide, index) => {
      if (slide.id === sectionId || slide.querySelector(`#${sectionId}`)) {
        targetIndex = index;
      }
    });

    if (targetIndex !== -1) {
      swiperRef.current.slideTo(targetIndex, 800);
    }
  };

  const handleSlideChange = useCallback((swiper: Swiper) => {
    // This function is called when the slide changes
    // Can be used for tracking or other side effects
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.substring(1);
        slideToSection(sectionId);
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return { swiperRef, slideToSection, handleSlideChange };
};