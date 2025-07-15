import React, { useState } from 'react';
import './ServiceSection.css';

interface ServiceInfo {
  id: string;
  title: string;
  content: string;
  image: string;
}

const ServiceSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);

  const serviceInfo: Record<string, ServiceInfo> = {
    online: {
      id: 'online',
      title: 'オンライン授業',
      content: '最新のテクノロジーを活用した双方向型のオンライン授業です。自宅にいながら、専門講師からマインクラフトやAIを学ぶことができます。',
      image: '/2025/02/1.png'
    },
    offline: {
      id: 'offline',
      title: 'オフラインイベント',
      content: '定期的に開催される対面イベントで、仲間と一緒に学び、交流を深めましょう。実際に会って話すことで生まれる化学反応を体験できます。',
      image: '/2025/02/2.png'
    },
    consultation: {
      id: 'consultation',
      title: '教育相談',
      content: '発達特性や学習面でのお悩みに、専門知識を持った講師が丁寧に対応します。お子様に合った学び方を一緒に見つけていきましょう。',
      image: '/2025/02/3.png'
    },
    projects: {
      id: 'projects',
      title: '案件割振',
      content: '身につけたスキルを活かして実際の仕事に挑戦できます。報酬を得ながら実践的な経験を積むことができる貴重な機会です。',
      image: '/2025/02/4.png'
    },
    independence: {
      id: 'independence',
      title: '独立サポート',
      content: '将来独立して働きたい方向けに、ビジネスモデルの構築から起業までをサポートします。自分の強みを活かした働き方を実現しましょう。',
      image: '/2025/02/5.png'
    },
    ai: {
      id: 'ai',
      title: 'AI先生',
      content: '最新のAI技術を活用した個別学習支援システムです。24時間いつでも質問できる環境で、自分のペースで学習を進められます。',
      image: '/2025/02/6.png'
    }
  };

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceInfo[serviceId]);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="service-section">
      <div className="service-bg">
        <div className="service-title-container">
          <h2 className="service-title twinkling-text">サービス内容</h2>
        </div>
        
        <div className="sky-background">
          <div className="clouds cloud1"></div>
          <div className="clouds cloud2"></div>
          <div className="clouds cloud3"></div>
        </div>
        
        <div className="service-blocks-container">
          {Object.values(serviceInfo).map((service) => (
            <div 
              key={service.id}
              className="service-block" 
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="block-inner">
                <img src={service.image} alt={service.title} />
                <div className="block-title">{service.title}</div>
                <div className="hover-effect"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="subscription-info">
          <p className="subscription-text">月額11,000円（税込）〜で利用できる、if(塾)の全面サポートサブスクリプション！</p>
        </div>
        
        {/* Modal */}
        {selectedService && (
          <div className="service-modal show">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <h3 className="modal-title">{selectedService.title}</h3>
              <div className="modal-body">{selectedService.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSection;