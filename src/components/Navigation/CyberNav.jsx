import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.navigation};
  background: ${theme.colors.background.secondary};
  backdrop-filter: blur(10px);
  border-bottom: 2px solid ${theme.colors.primary.main};
  box-shadow: ${theme.colors.glow.blue};
  padding: 1rem 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  filter: drop-shadow(${theme.colors.glow.blue});
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: aura-pulse 2s ease-in-out infinite;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, transparent 60%);
    border-radius: 50%;
    animation: aura-pulse 2s ease-in-out infinite 0.5s;
    z-index: -1;
  }

  &:hover {
    filter: drop-shadow(0 0 30px ${theme.colors.primary.main});
    transform: scale(1.05);
    
    &::before {
      background: radial-gradient(circle at center, rgba(0, 255, 255, 0.5) 0%, transparent 70%);
    }
    
    &::after {
      background: radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 60%);
    }
  }
  
  @keyframes aura-pulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.5; 
    }
    50% { 
      transform: scale(1.1); 
      opacity: 1; 
    }
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all ${theme.animations.duration.normal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: ${theme.fonts.primary};

  &:hover {
    color: ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.main};
    box-shadow: ${theme.colors.glow.blue};
    text-shadow: ${theme.colors.glow.blue};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 4px;
  min-width: 200px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all ${theme.animations.duration.normal};
  z-index: 1000;
  margin-top: 0.5rem;
  box-shadow: ${theme.colors.glow.blue};
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  transition: all ${theme.animations.duration.normal};
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  font-family: ${theme.fonts.primary};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
    padding-left: 1.5rem;
    text-shadow: ${theme.colors.glow.blue};
  }
`;

const CyberNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const isPc = useMediaQuery({ minWidth: theme.breakpoints.pc });

  if (!isPc) return null;

  const menuItems = [
    {
      label: "if(塾)について",
      href: "#about",
      submenu: [
        { label: "コース紹介", href: "#courses" },
        { label: "授業スケジュール", href: "#schedule" },
        { label: "サービス内容", href: "#services" },
        { label: "if(チャレンジ)", href: "#challenge" },
        { label: "if(チャレンジ)forビギナー", href: "#challenge-beginner" },
        { label: "if(塾)が取り組む課題", href: "#issues" },
        { label: "入塾までの流れ", href: "#flow" },
        { label: "運営メンバー", href: "#members" },
        { label: "仕事の依頼はこちら", href: "#business-inquiry" }
      ]
    },
    {
      label: "オンライン教材",
      href: "#materials"
    },
    {
      label: "お知らせ",
      href: "#news"
    },
    {
      label: "YouTube",
      href: "#youtube"
    },
    {
      label: "Kitazuna開発中",
      href: "#kitazuna"
    },
    {
      label: "よくある質問",
      href: "#faq"
    },
    {
      label: "お問い合わせ",
      href: "#contact"
    }
  ];

  const handleScrollTo = (href) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavContainer>
      <NavWrapper>
        <Logo 
          src="/2025/04/logo.png"
          alt="if(塾)"
          onClick={() => handleScrollTo('#main-visual')}
        />
        <NavMenu>
          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              onMouseEnter={() => setActiveDropdown(item.submenu ? index : null)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink onClick={() => handleScrollTo(item.href)}>
                {item.label}
                {item.submenu && <span>▼</span>}
              </NavLink>
              {item.submenu && (
                <DropdownMenu isOpen={activeDropdown === index}>
                  {item.submenu.map((subItem, subIndex) => (
                    <DropdownItem
                      key={subIndex}
                      onClick={() => handleScrollTo(subItem.href)}
                    >
                      {subItem.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </NavItem>
          ))}
        </NavMenu>
      </NavWrapper>
    </NavContainer>
  );
};

export default CyberNav;