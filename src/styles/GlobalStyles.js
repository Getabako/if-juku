import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    font-family: ${theme.fonts.primary};
    background: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
  }

  #root {
    height: 100vh;
    overflow: hidden;
  }

  .App {
    height: 100vh;
    overflow: hidden;
  }

  /* Swiper基本スタイル */
  .swiper {
    width: 100%;
    height: 100vh;
  }

  .swiper-slide {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .swiper-pagination {
    right: 20px !important;
    left: auto !important;
    top: 50% !important;
    transform: translateY(-50%);
    width: auto !important;
    height: auto !important;
  }

  .swiper-pagination-bullet {
    width: 12px !important;
    height: 12px !important;
    background: rgba(255, 255, 255, 0.3) !important;
    border: 2px solid ${theme.colors.primary.main};
    border-radius: 50%;
    opacity: 1 !important;
    margin: 8px 0 !important;
    transition: all ${theme.animations.duration.normal} ease;
  }

  .swiper-pagination-bullet-active {
    background: ${theme.colors.primary.main} !important;
    box-shadow: ${theme.colors.glow.blue};
  }

  /* レスポンシブ対応 */
  .pc-only {
    display: block;
  }

  .sp-only {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .pc-only {
      display: none;
    }

    .sp-only {
      display: block;
    }

    .swiper-pagination {
      right: 10px !important;
    }
  }

  /* Twinkling Text Animation */
  @keyframes twinkle {
    0%, 100% { opacity: 1; text-shadow: ${theme.colors.glow.blue}; }
    50% { opacity: 0.8; text-shadow: 0 0 30px ${theme.colors.primary.main}, 0 0 40px ${theme.colors.primary.dark}; }
  }

  .twinkling-text {
    animation: twinkle 2s infinite;
    color: ${theme.colors.primary.main};
    text-shadow: ${theme.colors.glow.blue};
  }

  /* サイバー風エフェクト */
  .cyber-frame {
    position: relative;
    border: 2px solid ${theme.colors.primary.main};
    background: ${theme.colors.background.secondary};
    backdrop-filter: blur(10px);
  }

  .cyber-frame::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark}, ${theme.colors.primary.main});
    z-index: -1;
    border-radius: inherit;
  }

  /* ネオングロー効果 */
  .neon-glow {
    box-shadow: 
      0 0 10px ${theme.colors.primary.main},
      0 0 20px ${theme.colors.primary.main},
      0 0 30px ${theme.colors.primary.main},
      inset 0 0 10px rgba(0, 255, 255, 0.1);
  }

  /* グリッチエフェクト */
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  .glitch-effect:hover {
    animation: glitch 0.3s;
  }
`;