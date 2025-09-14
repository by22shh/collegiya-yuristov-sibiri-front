import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на отправку формы через Resend');
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

    // Определение типа услуги для отображения
    const serviceTypeLabels = {
      citizen: 'Услуги для граждан',
      business: 'Услуги для бизнеса',
      consultation: 'Консультация',
      other: 'Другое'
    };

    const serviceLabel = serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels] || serviceType;

    // Отправка email через Resend
    console.log('Отправляем письмо через Resend...');
    
    const { data, error } = await resend.emails.send({
      from: 'Коллегия юристов Сибири <noreply@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'colus@internet.ru'],
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
    });

    if (error) {
      console.error('Ошибка Resend:', error);
      return NextResponse.json(
        { error: 'Ошибка при отправке через Resend: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Письмо успешно отправлено через Resend:', data?.id);

    return NextResponse.json(
      { message: 'Сообщение успешно отправлено' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка при отправке email через Resend:', error);
    
    let errorMessage = 'Произошла ошибка при отправке сообщения';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
