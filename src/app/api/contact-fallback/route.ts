import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на отправку формы (fallback)');
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    // Валидация данных
    if (!name || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Простая настройка SMTP с минимальными таймаутами
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.ru',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000,  // 5 секунд
      greetingTimeout: 5000,    // 5 секунд
      socketTimeout: 5000,      // 5 секунд
    } as nodemailer.TransportOptions);

    // Определение типа услуги
    const serviceTypeLabels = {
      citizen: 'Услуги для граждан',
      business: 'Услуги для бизнеса',
      consultation: 'Консультация',
      other: 'Другое'
    };

    const serviceLabel = serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels] || serviceType;

    // Простое письмо без HTML
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'colus@internet.ru',
      subject: `Новое обращение - ${serviceLabel}`,
      text: `
Новое обращение с сайта

Клиент: ${name}
Email: ${email}
Телефон: ${phone}
Услуга: ${serviceLabel}

Сообщение:
${message}

Время: ${new Date().toLocaleString('ru-RU')}
      `
    };

    console.log('Отправляем письмо (fallback)...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', result.messageId);

    return NextResponse.json(
      { message: 'Сообщение успешно отправлено' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка fallback:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки. Попробуйте связаться с нами напрямую.' },
      { status: 500 }
    );
  }
}
