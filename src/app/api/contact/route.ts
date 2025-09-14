import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на отправку формы');
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    console.log('Данные формы:', { name, email, phone, serviceType, message: message.substring(0, 50) + '...' });

    // Валидация данных
    if (!name || !email || !phone || !serviceType || !message) {
      console.log('Ошибка валидации: не все поля заполнены');
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Настройка транспорта для отправки email
    console.log('Настройка SMTP транспорта...');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'НЕ УСТАНОВЛЕН');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.ru',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true для порта 465, false для других портов
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Дополнительные настройки для Mail.ru
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 10000, // 10 секунд на подключение
      greetingTimeout: 10000,   // 10 секунд на приветствие
      socketTimeout: 10000,     // 10 секунд на операции
      pool: false,              // не использовать пул соединений
      maxConnections: 1,        // максимум 1 соединение
      maxMessages: 1,           // максимум 1 сообщение за соединение
    } as nodemailer.TransportOptions);

    console.log('SMTP транспорт создан, пропускаем проверку соединения для ускорения...');

    // Определение типа услуги для отображения
    const serviceTypeLabels = {
      citizen: 'Услуги для граждан',
      business: 'Услуги для бизнеса',
      consultation: 'Консультация',
      other: 'Другое'
    };

    const serviceLabel = serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels] || serviceType;

    // Настройка email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'colus@internet.ru',
      subject: `Новое обращение с сайта - ${serviceLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Новое обращение с сайта
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Информация о клиенте:</h3>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Тип услуги:</strong> ${serviceLabel}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Сообщение:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Время отправки:</strong> ${new Date().toLocaleString('ru-RU', {
                timeZone: 'Asia/Novosibirsk',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `,
      text: `
Новое обращение с сайта

Информация о клиенте:
- Имя: ${name}
- Email: ${email}
- Телефон: ${phone}
- Тип услуги: ${serviceLabel}

Сообщение:
${message}

Время отправки: ${new Date().toLocaleString('ru-RU', {
        timeZone: 'Asia/Novosibirsk'
      })}
      `
    };

    // Отправка email
    console.log('Отправляем письмо...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Письмо успешно отправлено:', result.messageId);

    return NextResponse.json(
      { message: 'Сообщение успешно отправлено' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    
    let errorMessage = 'Произошла ошибка при отправке сообщения';
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Превышено время ожидания. Попробуйте еще раз.';
      } else if (error.message.includes('auth')) {
        errorMessage = 'Ошибка авторизации. Проверьте настройки почты.';
      } else if (error.message.includes('connection')) {
        errorMessage = 'Ошибка подключения к почтовому серверу.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
