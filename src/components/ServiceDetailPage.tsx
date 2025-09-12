'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Coins, FileText, Phone, Mail } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  category: 'citizen' | 'business';
  description: string;
  fullDescription: string;
  features: string[];
  process: string[];
  timeline: string;
  price: string;
  documents: string[];
  examples: string[];
  iconEmoji: string;
}

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBack: () => void;
  onContact: () => void;
  onPrivacyPolicy?: () => void;
}

export default function ServiceDetailPage({ service, onBack, onContact, onPrivacyPolicy }: ServiceDetailPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
      {/* Навигация назад */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 sm:mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-50 nav-button text-sm sm:text-base"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
        Назад к услугам
      </Button>

      {/* Заголовок */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <div className="text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4">{service.iconEmoji}</div>
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 mb-2 px-2 sm:px-4">{service.title}</h1>
        <Badge
          variant="secondary"
          className="bg-white/60 text-gray-700 text-xs sm:text-sm"
        >
          {service.category === 'citizen' ? 'Для граждан' : 'Для бизнеса'}
        </Badge>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
        {/* Описание */}
        <div className="lg:col-span-2">
          <Card className="service-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Описание услуги</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{service.fullDescription}</p>

            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Что входит в услугу:</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5 sm:mt-1">✓</span>
                  <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Боковая панель */}
        <div className="space-y-4 sm:space-y-6">
          {/* Цена и время */}
          <Card className="service-card p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Стоимость</div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">{service.price}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Срок выполнения</div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">{service.timeline}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Кнопка обращения */}
          <Card className="service-card text-center p-4 sm:p-6">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Нужна консультация?</h3>
            <Button
              onClick={onContact}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold mb-3"
            >
              <Mail className="w-4 h-4 mr-2" />
              Написать нам
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/70 border-white/50 text-gray-700 hover:bg-white/90"
              onClick={() => window.open('tel:+79139511507')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Позвонить
            </Button>
          </Card>
        </div>
      </div>

      {/* Процесс работы */}
      <Card className="service-card mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Как мы работаем</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.process.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Необходимые документы */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card className="service-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Необходимые документы
          </h2>
          <ul className="space-y-2">
            {service.documents.map((doc, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span className="text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Примеры ситуаций */}
        <Card className="service-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Примеры ситуаций</h2>
          <ul className="space-y-3">
            {service.examples.map((example, index) => (
              <li key={index} className="bg-white/40 rounded-lg p-3">
                <span className="text-gray-700">{example}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Юридическая информация */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <p>Общество с ограниченной ответственностью "Коллегия юристов Сибири"</p>
          <p>ОГРН: 1225400038467 • ИНН/КПП: 5473053475/547301001</p>
          <p>Юр. адрес: Россия, 630060, г. Новосибирск, ул. Лесосечная, д. 14, кв. 30</p>
          <p>Факт. адрес: Россия, 630090, г. Новосибирск, ул. Демакова, д. 30, офис 504</p>
          <p>© 2025 Коллегия юристов Сибири. Все права защищены</p>
          {onPrivacyPolicy && (
            <p className="mt-2">
              <button
                onClick={onPrivacyPolicy}
                className="text-gray-500 hover:text-gray-700 underline transition-colors"
              >
                Политика обработки персональных данных
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
