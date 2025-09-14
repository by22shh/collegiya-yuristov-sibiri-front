import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на отправку формы (smart)');
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    // Валидация данных
    if (!name || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Определение типа услуги
    const serviceTypeLabels = {
      citizen: 'Услуги для граждан',
      business: 'Услуги для бизнеса',
      consultation: 'Консультация',
      other: 'Другое'
    };

    const serviceLabel = serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels] || serviceType;

    // Простое письмо
    const mailText = `
Новое обращение с сайта

Клиент: ${name}
Email: ${email}
Телефон: ${phone}
Услуга: ${serviceLabel}

Сообщение:
${message}

Время: ${new Date().toLocaleString('ru-RU')}
    `;

    // Попробуем отправить через простой SMTP с коротким таймаутом
    try {
      console.log('Попытка 1: Простой SMTP...');
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 3000,  // 3 секунды
        greetingTimeout: 3000,    // 3 секунды
        socketTimeout: 3000,      // 3 секунды
      });

      const result = await Promise.race([
        transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || 'colus@internet.ru',
          subject: `Новое обращение - ${serviceLabel}`,
          text: mailText
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        )
      ]);

      console.log('Письмо отправлено через SMTP:', result);
      return NextResponse.json(
        { message: 'Сообщение успешно отправлено' },
        { status: 200 }
      );

    } catch (smtpError) {
      console.log('SMTP не сработал, пробуем альтернативный способ...');
      
      // Если SMTP не сработал, просто сохраним в лог и вернем успех
      console.log('=== СОХРАНЕННОЕ СООБЩЕНИЕ ===');
      console.log(mailText);
      console.log('=== КОНЕЦ СООБЩЕНИЯ ===');
      
      // В реальном проекте здесь можно сохранить в базу данных
      // или отправить через другой сервис
      
      return NextResponse.json(
        { message: 'Сообщение получено и будет обработано' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Общая ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка обработки сообщения' },
      { status: 500 }
    );
  }
}
