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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

const ContactCard = styled(motion.a)`
  background: transparent;
  border: none;
  border-radius: 50px;
  padding: 0;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  height: 80px;
  
  /* Neon tube effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      #ff0080, #7928ca, #0070f3, #00dfd8, #ff0080
    );
    background-size: 400% 100%;
    border-radius: 50px;
    z-index: -1;
    animation: neon-flow 3s linear infinite;
  }
  
  /* Inner background */
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 47px;
    z-index: 0;
  }
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(121, 40, 202, 0.4),
      0 0 90px rgba(0, 112, 243, 0.3);
  }
  
  @keyframes neon-flow {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 70px;
  }
`;

const ContactContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  color: white;
  margin: 0;
  font-family: ${theme.fonts.secondary};
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

// ContactButton component removed as it's now integrated into ContactCard

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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ContactContent>
                  <ContactIcon>{contact.icon}</ContactIcon>
                  <ContactTitle>{contact.title}</ContactTitle>
                </ContactContent>
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