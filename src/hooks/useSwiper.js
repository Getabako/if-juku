import { useState, useRef, useCallback } from 'react';

export const useSwiper = (totalSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef(null);

  const goToSlide = useCallback((index) => {
    if (swiperRef.current && index >= 0 && index < totalSlides) {
      setIsTransitioning(true);
      swiperRef.current.slideTo(index);
      setCurrentSlide(index);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const handleSlideChange = useCallback((swiper) => {
    setCurrentSlide(swiper.activeIndex);
  }, []);

  return {
    currentSlide,
    isTransitioning,
    swiperRef,
    goToSlide,
    nextSlide,
    prevSlide,
    handleSlideChange
  };
};