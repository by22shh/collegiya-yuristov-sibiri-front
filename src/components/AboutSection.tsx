'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Shield, Clock, Scale, Handshake, Target, GraduationCap, Star, CreditCard, Smartphone, BookOpen, Send } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  experience: string;
  specialization: string[];
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Крейс Даниил Андреевич",
    position: "Управляющий партнёр",
    experience: "Опыт работы с 2019 г.",
    specialization: ["Аспирант (ИФП НГУ, с 2024 г.)"],
    image: "👨‍💼"
  },
  {
    name: "Козырко Денис Вадимович",
    position: "Заместитель управляющего партнёра",
    experience: "Опыт работы с 2019 г.",
    specialization: ["Аспирант (ИФП НГУ, с 2023 г.)"],
    image: "👨‍💼"
  },
  {
    name: "Русских Анастасия Витальевна",
    position: "Менеджер",
    experience: "Опыт работы с 2022 г.",
    specialization: ["Бакалавр (ЭФ НГУ, 2022 г.)"],
    image: "👩‍💼"
  },
  {
    name: "Котляр Владислав Андреевич",
    position: "Младший юрист",
    experience: "Опыт работы с 2024 г.",
    specialization: [],
    image: "🧑‍💼"
  },
  {
    name: "Зорин Степан Андреевич",
    position: "Младший юрист",
    experience: "Опыт работы с 2024 г.",
    specialization: [],
    image: "🧑‍💼"
  }
];

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    number: "200+",
    label: "довольных клиентов"
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "90%",
    label: "успешных дел"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    number: "2022",
    label: "год основания"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: "24/7",
    label: "консультации"
  }
];

interface AboutSectionProps {
  onPrivacyPolicy?: () => void;
}

export default function AboutSection({ onPrivacyPolicy }: AboutSectionProps = {}) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Заголовок секции */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">О нас</h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto px-4">
          Коллегия юристов Сибири – это команда профессионалов, готовых защитить Ваши интересы в любой правовой ситуации.
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="team-member-card text-center py-8">
            <div className="text-gray-700 mb-3 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Наша миссия */}
      <div className="mb-16">
        <Card className="service-card text-center py-12 px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Наша цель</h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Мы делаем всё возможное для того, чтобы наша деятельность была результативной, а высокое доверие наших клиентов – оправданным.
            <br /><br />
            Мы не только эффективно выполним Ваше поручение, но еще и научим Ваших оппонентов добросовестно вести дела.
          </p>
        </Card>
      </div>

      {/* Команда */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h3>
        <p className="text-lg text-gray-700">
          Специалисты с глубокими познаниями в области российского права
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
        {teamMembers.map((member, index) => (
          <Card key={index} className="team-member-card">
            <div className="text-6xl mb-4">{member.image}</div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
            <p className="text-gray-700 font-medium mb-2">{member.position}</p>
            <p className="text-sm text-gray-600 mb-3">{member.experience}</p>
            <div className="space-y-1">
              {member.specialization.map((spec, specIndex) => (
                <Badge
                  key={specIndex}
                  variant="secondary"
                  className="text-xs bg-white/60 text-gray-700 mr-1"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Наши преимущества */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Наши преимущества</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        <Card className="service-card text-center py-8">
          <div className="text-gray-700 mb-4 flex justify-center">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Юристы</h4>
          <p className="text-sm text-gray-700">
            Мы являемся выпускниками одного из самых престижных университетов России – НГУ. Мы не только выигрываем дела, но и меняем судебную практику
          </p>
        </Card>

        <Card className="service-card text-center py-8">
          <div className="text-gray-700 mb-4 flex justify-center">
            <Star className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Качество</h4>
          <p className="text-sm text-gray-700">
            Мы делаем работу качественно, а не "к понедельнику"
          </p>
        </Card>

        <Card className="service-card text-center py-8">
          <div className="text-gray-700 mb-4 flex justify-center">
            <CreditCard className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Цены</h4>
          <p className="text-sm text-gray-700">
            По финансовым вопросам мы придерживаемся индивидуального подхода. Кроме того, мы активно сотрудничаем с клиентами на условиях о "гонораре успеха", то есть когда клиенты рассчитываются с нами лишь после того, как мы выиграем их дела
          </p>
        </Card>

        <Card className="service-card text-center py-8">
          <div className="text-gray-700 mb-4 flex justify-center">
            <Smartphone className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Мобильность</h4>
          <p className="text-sm text-gray-700">
            Мы всегда на связи и всегда готовы подъехать к Вам для обсуждения рабочих вопросов
          </p>
        </Card>

        <Card className="service-card text-center py-8">
          <div className="text-gray-700 mb-4 flex justify-center">
            <BookOpen className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Стиль</h4>
          <p className="text-sm text-gray-700">
            Мы не только хорошо владеем литературным и юридическим русским языком, но и сопровождаем документы ссылками на отечественную и зарубежную академическую доктрину
          </p>
        </Card>
      </div>

      {/* Социальные сети */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Мы в социальных сетях:</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://vk.com/colus_law"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
              aria-label="ВКонтакте"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186c.164-.543 0-.942-.777-.942h-2.577c-.653 0-.953.343-1.117.726 0 0-1.308 3.178-3.162 5.242-.598.598-.872.789-1.2.789-.163 0-.404-.191-.404-.734V6.186c0-.653-.191-.942-.734-.942H8.94c-.404 0-.653.302-.653.583 0 .618.945.761 1.042 2.5v3.775c0 .826-.149.977-.47.977-.872 0-2.995-3.193-4.255-6.843-.247-.702-.493-.986-1.15-.986H.875c-.734 0-.883.343-.883.726 0 .679.872 4.056 4.056 8.51 2.126 2.992 5.134 4.61 7.865 4.61 1.64 0 1.84-.368 1.84-1.003v-2.325c0-.734.155-.883.68-.883.387 0 1.05.191 2.593 1.66 1.77 1.77 2.063 2.564 3.067 2.564h2.577c.734 0 1.106-.368.893-1.101-.232-.727-1.065-1.783-2.167-3.01-.598-.7-1.495-1.452-1.767-1.828-.387-.5-.276-.721 0-1.166 0 0 3.12-4.393 3.446-5.884z"/>
              </svg>
            </a>
            <a
              href="https://t.me/colus_law"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Юридическая информация */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Общество с ограниченной ответственностью "Коллегия юристов Сибири"</p>
          <p>ОГРН: 1225400038467 • ИНН/КПП: 5473053475/547301001</p>
          <p>Адрес: Россия, 630090, г. Новосибирск, ул. Демакова, д. 30</p>
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
