import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const MobileNavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.navigation};
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid ${theme.colors.primary.main};
  padding: 1rem;

  @media (min-width: ${theme.breakpoints.pc}) {
    display: none;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileLogo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.primary.main};
  text-shadow: 0 0 10px ${theme.colors.primary.main};
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary.main};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.98);
  border-top: 1px solid ${theme.colors.primary.main};
  max-height: ${props => props.isOpen ? '80vh' : '0'};
  overflow-y: auto;
  overflow-x: hidden;
  transition: max-height 0.3s ease;
`;

const MobileMenuItem = styled.div`
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
`;

const MobileMenuLink = styled.a`
  display: block;
  padding: 1rem;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
    padding-left: 1.5rem;
  }
`;

const SubMenuToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
  }
`;

const SubMenu = styled.div`
  background: rgba(0, 0, 0, 0.5);
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubMenuItem = styled.a`
  display: block;
  padding: 0.75rem 2rem;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
    padding-left: 2.5rem;
  }
`;

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  if (!isMobile) return null;

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
        { label: "入塾までの流れ", href: "#flow" }
      ]
    },
    {
      label: "運営メンバー",
      href: "#members"
    },
    {
      label: "学習コンテンツ",
      href: "#contents",
      submenu: [
        { label: "オンライン教材", href: "#materials" },
        { label: "お知らせ", href: "#news" },
        { label: "YouTube", href: "#youtube" }
      ]
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
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <MobileNavContainer>
      <MobileHeader>
        <MobileLogo>if(塾)</MobileLogo>
        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </HamburgerButton>
      </MobileHeader>
      
      <MobileMenu isOpen={isMenuOpen}>
        {menuItems.map((item, index) => (
          <MobileMenuItem key={index}>
            {item.submenu ? (
              <>
                <SubMenuToggle onClick={() => toggleSubmenu(index)}>
                  <span>{item.label}</span>
                  <span>{activeSubmenu === index ? '▲' : '▼'}</span>
                </SubMenuToggle>
                <SubMenu isOpen={activeSubmenu === index}>
                  {item.submenu.map((subItem, subIndex) => (
                    <SubMenuItem
                      key={subIndex}
                      onClick={() => handleScrollTo(subItem.href)}
                    >
                      {subItem.label}
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </>
            ) : (
              <MobileMenuLink onClick={() => handleScrollTo(item.href)}>
                {item.label}
              </MobileMenuLink>
            )}
          </MobileMenuItem>
        ))}
      </MobileMenu>
    </MobileNavContainer>
  );
};

export default MobileNav;