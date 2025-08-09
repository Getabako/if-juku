import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';

const MembersContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const HexagonalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid ${theme.colors.primary.main};
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  
  &::before {
    top: 20%;
    left: 10%;
    animation: float-hex 15s infinite;
  }
  
  &::after {
    bottom: 20%;
    right: 10%;
    animation: float-hex 20s infinite reverse;
  }
  
  @keyframes float-hex {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
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

const MemberSlider = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const MemberCard = styled(motion.div)`
  position: relative;
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid rgba(0, 255, 255, 0.6);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 25px rgba(0, 255, 255, 0.2),
    inset 0 0 15px rgba(0, 255, 255, 0.05);
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const MemberImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.colors.primary.main};
  box-shadow: 0 0 20px ${theme.colors.primary.main};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const MemberRole = styled.p`
  color: ${theme.colors.secondary.main};
  font-size: 1.1rem;
  font-weight: bold;
  text-shadow: 0 0 10px ${theme.colors.secondary.main};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const MemberDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const NavDot = styled(motion.button)`
  width: ${props => props.active ? '30px' : '10px'};
  height: 10px;
  background: ${props => props.active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.3)'};
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 5px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    background: ${theme.colors.primary.light};
    transform: scale(1.2);
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all ${theme.animations.duration.normal};
  z-index: 10;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 20px ${theme.colors.primary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -60px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    left: -20px;
  }
`;

const NextButton = styled(NavigationButton)`
  right: -60px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    right: -20px;
  }
`;

const Members = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });

  const members = [
    {
      name: "高崎翔太",
      role: "塾頭",
      pcImage: "/2025/02/IMG_9646-scaled.jpg",
      mobileImage: "/2025/02/1-1.png",
      description: "元々は実は臨床心理士。ICTものづくりを通して、言葉による表現が難しかった子が自分の思いを伝えられるようになったり、学習に意欲を持てなかった子が目標を見つけて難関大学へ進学したり…多くの子どもたちが持つ可能性の扉を開くお手伝いをしてきた、経験豊富なメンターだよ！"
    },
    {
      name: "山﨑琢己",
      role: "塾長",
      pcImage: "/2025/02/takumi.png",
      mobileImage: "/2025/02/2-1.png",
      description: "高校1年でIT会社を起業！Web開発やPCコンサルタントとして活躍後、if(塾)を開業。塾長としてみんなをまとめ、授業もメインで回す頼れるリーダーだよ！AI開発や講演も行う、AI活用の最前線に立つ若きイノベーター！中学時代は支援級で過ごした経験も力に、現役で国立大学合格！"
    },
    {
      name: "加賀屋結眞",
      role: "CFO",
      pcImage: "/2025/02/IMG_9909-scaled.jpg",
      mobileImage: "/2025/02/3-1.png",
      description: "高校1年でIT会社を起業！Web開発やマーケティングコンサルタントとして活躍後、if(塾)を開業。CFOとして、みんなにif(塾)の魅力を伝えるコミュニケーターだよ！年上の起業家たちとも積極的に交流し、ホリエモンにプレゼンした経験も持つチャレンジャー！パソコンを使った表現力で周りが驚くような発想力と行動力を発揮し、次の事業立ち上げを計画中！"
    },
    {
      name: "井上陽斗",
      role: "CTO",
      pcImage: "/2025/02/120362.jpg",
      mobileImage: "/2025/02/4-1.png",
      description: "高校1年からif(塾)に参加！プログラミング未経験からスタートし、if(塾)のマインクラフトワールドのシステムを全て開発した天才クリエイター！まるでドラえもんみたいに、お願いしたものをいつの間にか作ってくれる頼れる存在！集中して自分の世界に入り込み、周りがびっくりするような天才的なアイデアを次々と生み出している開発の達人だよ！"
    },
    {
      name: "Y君",
      role: "専属e-Sports Player",
      pcImage: "/2024/12/IMG_20240825_151743-scaled.jpg",
      mobileImage: "/2025/02/5-1.png",
      description: "高校生で格闘ゲームを始め、わずか数ヶ月でトップクラスの実力を獲得！県内大学の大会では最年少で優勝した期待のアスリート！抜群の集中力で塾頭をゲームで打ち負かす実力の持ち主！プロゲーマーを目指して本格始動し、YouTubeやTwitchでの配信も積極的に行っているよ！"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  const currentMember = members[currentIndex];

  return (
    <MembersContainer id="members">
      <HexagonalBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          運営メンバー
        </SectionTitle>
        
        <MemberSlider>
          <PrevButton
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </PrevButton>
          
          <AnimatePresence mode="wait" initial={false}>
            <MemberCard
              key={currentIndex}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              className="cyber-frame"
            >
              <MemberHeader>
                <MemberImage
                  src={isMobile ? currentMember.mobileImage : currentMember.pcImage}
                  alt={currentMember.name}
                />
                <MemberInfo>
                  <MemberName>{currentMember.name}</MemberName>
                  <MemberRole>{currentMember.role}</MemberRole>
                </MemberInfo>
              </MemberHeader>
              
              <MemberDescription>
                {currentMember.description}
              </MemberDescription>
            </MemberCard>
          </AnimatePresence>
          
          <NextButton
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </NextButton>
          
          <NavigationDots>
            {members.map((_, index) => (
              <NavDot
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </NavigationDots>
        </MemberSlider>
      </ContentWrapper>
    </MembersContainer>
  );
};

export default Members;