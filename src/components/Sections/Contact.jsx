import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const ContactContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const ContactBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before {
    content: '📞';
    position: absolute;
    top: 15%;
    left: 10%;
    font-size: 3rem;
    animation: ring 3s ease-in-out infinite;
  }
  
  &::after {
    content: '📧';
    position: absolute;
    bottom: 15%;
    right: 10%;
    font-size: 3rem;
    animation: bounce 3s ease-in-out infinite 1.5s;
  }
  
  @keyframes ring {
    0%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(-10deg); }
    20%, 40% { transform: rotate(10deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ContactCard = styled(motion.a)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 40%,
      rgba(0, 255, 255, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const ContactIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, transparent 30%, rgba(255, 255, 255, 0.2) 70%);
    transform: translate(-50%, -50%);
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  font-weight: bold;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const ContactDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const ContactButton = styled.div`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  color: ${theme.colors.background.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px ${theme.colors.secondary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const FooterInfo = styled(motion.div)`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 600px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 1rem;
  }
`;

const Copyright = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 255, 255, 0.3);
  font-size: 0.8rem;
  opacity: 0.8;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`;

const Contact = () => {
  const contactLinks = [
    {
      id: 1,
      title: "お問い合わせ",
      description: "ご質問・ご相談はこちらから",
      icon: "📩",
      url: "https://if-juku.net/contact/",
      buttonText: "お問い合わせ"
    },
    {
      id: 2,
      title: "資料請求",
      description: "詳しい資料をダウンロード",
      icon: "📄",
      url: "https://if-juku.net/wp-content/uploads/2024/08/if塾パンフレット.pdf",
      buttonText: "資料請求"
    },
    {
      id: 3,
      title: "体験授業申し込み",
      description: "無料で体験授業を受講",
      icon: "🎓",
      url: "https://if-juku.net/trial/",
      buttonText: "体験申し込み"
    },
    {
      id: 4,
      title: "LINE公式アカウント",
      description: "気軽にメッセージできます",
      icon: "💬",
      url: "https://lin.ee/lGK9c4Nx",
      buttonText: "友だち追加"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ContactContainer id="contact">
      <ContactBackground />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            各種お問い合わせ
          </SectionTitle>
          
          <ContactGrid variants={containerVariants}>
            {contactLinks.map((contact) => (
              <ContactCard
                key={contact.id}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-frame"
              >
                <ContactIcon>
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {contact.icon}
                  </span>
                </ContactIcon>
                <ContactTitle>{contact.title}</ContactTitle>
                <ContactDescription>{contact.description}</ContactDescription>
                <ContactButton>{contact.buttonText}</ContactButton>
              </ContactCard>
            ))}
          </ContactGrid>
          
          <FooterInfo variants={itemVariants}>
            <p>
              if(塾)は、AIと起業を学ぶオンラインプログラミング塾です。<br />
              全国どこからでも参加可能で、子どもたちの可能性を最大限に引き出します。
            </p>
            <p>
              お気軽にお問い合わせください。あなたの学習を全力でサポートします！
            </p>
            <Copyright>
              © 2024 if(塾) All rights reserved.
            </Copyright>
          </FooterInfo>
        </motion.div>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;