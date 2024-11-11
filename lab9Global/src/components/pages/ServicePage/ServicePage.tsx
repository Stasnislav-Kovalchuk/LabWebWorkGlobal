import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServicePage.scss';
import servicesData from '../../../services.json';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  included: string;
  benefits: string;
  recommendedFor: string;
  price: number;
  // image: string;
}

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const foundService = servicesData.find(s => s.id === Number(id));
    if (foundService) {
      setService(foundService);
    }
  }, [id]);

  if (!service) {
    return <div className="service-page">Сервіс не знайдено</div>;
  }

  return (
    <div className="service-page">
      <h1>{service.name}</h1>
      <p className="description">{service.description}</p>
      <div className="details">
        <div className="detail-item">
          <h3>Тривалість</h3>
          <p>{service.duration}</p>
        </div>
        <div className="detail-item">
          <h3>Включено</h3>
          <p>{service.included}</p>
        </div>
        <div className="detail-item">
          <h3>Переваги</h3>
          <p>{service.benefits}</p>
        </div>
        <div className="detail-item">
          <h3>Рекомендовано для</h3>
          <p>{service.recommendedFor}</p>
        </div>
      </div>
      <div className="price">{service.price} грн</div>
      <div className="action-buttons">
        <button className="book">Записатися</button>
        <button className="contact">Зв'язатися з нами</button>
      </div>
    </div>
  );
};

export default ServicePage;
