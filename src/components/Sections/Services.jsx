import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { useModal } from '../../hooks/useModal';

const ServicesContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const CloudBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Cloud = styled.div`
  position: absolute;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.3;
  
  &:nth-child(1) {
    width: 400px;
    height: 150px;
    top: 20%;
    left: -200px;
    animation: float 30s infinite;
  }
  
  &:nth-child(2) {
    width: 300px;
    height: 120px;
    top: 60%;
    right: -150px;
    animation: float 25s infinite reverse;
  }
  
  &:nth-child(3) {
    width: 500px;
    height: 180px;
    bottom: 10%;
    left: 50%;
    animation: float 35s infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(100px) translateY(-20px); }
    50% { transform: translateX(200px) translateY(10px); }
    75% { transform: translateX(100px) translateY(-10px); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled(motion.p)`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal};
  backdrop-filter: blur(10px);
  
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
    padding: 1rem;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: rgba(0, 255, 255, 0.1);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary.main};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    display: none;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.secondary};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all ${theme.animations.duration.fast};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.background.primary};
    transform: rotate(90deg);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
`;

const ModalDescription = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { isOpen, openModal, closeModal, Modal } = useModal();

  const services = [
    {
      id: 1,
      title: "オンライン授業",
      icon: "/2025/02/1.png",
      shortDesc: "全国どこからでも参加可能",
      fullDesc: "Discordを使用したリアルタイムオンライン授業。全国どこからでも参加でき、録画も視聴可能です。質問もチャットやボイスで気軽にできます。"
    },
    {
      id: 2,
      title: "オフラインイベント",
      icon: "/2025/02/2.png",
      shortDesc: "秋田県内で定期開催",
      fullDesc: "月に1回程度、秋田県内でオフラインイベントを開催。実際に会って交流したり、特別なワークショップを実施します。"
    },
    {
      id: 3,
      title: "教育相談",
      icon: "/2025/02/3.png",
      shortDesc: "保護者向けサポート",
      fullDesc: "お子様の学習状況や進路について、専門スタッフが個別相談に応じます。教育方針や家庭でのサポート方法もアドバイスします。"
    },
    {
      id: 4,
      title: "案件割振",
      icon: "/2025/02/4.png",
      shortDesc: "実践的な仕事体験",
      fullDesc: "実際の案件をレベルに応じて割り振り、報酬を得ながら実践的なスキルを身につけます。メンターがサポートするので安心です。"
    },
    {
      id: 5,
      title: "独立サポート",
      icon: "/2025/02/5.png",
      shortDesc: "起業・独立を支援",
      fullDesc: "将来の起業や独立を目指す生徒に対して、ビジネスプランの作成から資金調達まで総合的にサポートします。"
    },
    {
      id: 6,
      title: "AI先生",
      icon: "/2025/02/6.png",
      shortDesc: "24時間質問可能",
      fullDesc: "最新のAI技術を活用した学習サポート。24時間いつでも質問でき、個人のレベルに合わせた最適な学習を提供します。"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <ServicesContainer id="services">
      <CloudBackground>
        <Cloud />
        <Cloud />
        <Cloud />
      </CloudBackground>
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            サービス内容
          </SectionTitle>
          
          <SubTitle variants={itemVariants}>
            月額11,000円（税込）〜で利用できる、if(塾)の全面サポートサブスクリプション！
          </SubTitle>
          
          <ServicesGrid variants={containerVariants}>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  setSelectedService(service);
                  openModal(e);
                }}
                className="cyber-frame"
              >
                <ServiceIcon>
                  <img src={service.icon} alt={service.title} />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.shortDesc}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </motion.div>
      </ContentWrapper>
      
      <Modal className="cyber-frame">
        {selectedService && (
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            as={motion.div}
            className="cyber-frame"
          >
            <CloseButton onClick={() => {
              setSelectedService(null);
              closeModal();
            }}>×</CloseButton>
            <ModalTitle>{selectedService.title}</ModalTitle>
            <ModalDescription>{selectedService.fullDesc}</ModalDescription>
          </ModalContent>
        )}
      </Modal>
    </ServicesContainer>
  );
};

export default Services;