'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Shield, Clock, Scale, Handshake, Target, GraduationCap, Star, CreditCard, Smartphone, BookOpen } from 'lucide-react';

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

      {/* Юридическая информация */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
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
