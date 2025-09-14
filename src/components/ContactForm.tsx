'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, Send, CheckCircle, X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  serviceType: z.string().min(1, 'Выберите тип услуги'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  readonly onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Добавляем таймаут для запроса (15 секунд)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/contact-smart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при отправке сообщения');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Очистка формы через 3 секунды
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        onClose?.();
      }, 3000);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setIsSubmitting(false);
      
      if (error instanceof Error && error.name === 'AbortError') {
        setError('Превышено время ожидания. Проверьте подключение к интернету и попробуйте еще раз.');
      } else {
        setError(error instanceof Error ? error.message : 'Произошла ошибка при отправке сообщения');
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-form text-center px-4 py-6">
        <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Спасибо за обращение!</h3>
        <p className="text-sm md:text-base text-gray-700">
          Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form relative max-w-full">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
          <Mail className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-4">
        Форма обратной связи
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <X className="w-4 h-4 text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label htmlFor="name" className="text-sm md:text-base text-gray-900 font-medium">
            Ваше имя *
          </Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Введите Ваше имя"
            className={`mt-1 bg-white/70 border-white/50 ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-900 font-medium">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
            className={`mt-1 bg-white/70 border-white/50 ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-900 font-medium">
            Телефон *
          </Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+7 (xxx) xxx-xx-xx"
            className={`mt-1 bg-white/70 border-white/50 ${errors.phone ? 'border-red-400' : ''}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-900 font-medium">
            Тип услуги *
          </Label>
          <Select onValueChange={(value) => setValue('serviceType', value)}>
            <SelectTrigger className={`mt-1 bg-white/70 border-white/50 ${errors.serviceType ? 'border-red-400' : ''}`}>
              <SelectValue placeholder="Выберите тип услуги" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="citizen">Услуги для граждан</SelectItem>
              <SelectItem value="business">Услуги для бизнеса</SelectItem>
              <SelectItem value="consultation">Консультация</SelectItem>
              <SelectItem value="other">Другое</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message" className="text-gray-900 font-medium">
            Сообщение *
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Опишите Вашу ситуацию подробнее..."
            rows={3}
            className={`mt-1 bg-white/70 border-white/50 resize-none ${errors.message ? 'border-red-400' : ''}`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Согласие на обработку персональных данных */}
        <div className="pt-2">
          <p className="text-xs text-gray-600 text-center">
            Отправляя сообщение, Вы даёте своё согласие на обработку персональных данных.
          </p>
        </div>

        <div className="flex space-x-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Отправляем...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Отправить сообщение
              </>
            )}
          </Button>

          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            >
              Отмена
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4 pt-4 border-t border-white/30">
        <p className="text-xs text-gray-600 text-center">
          Или свяжитесь с нами напрямую:
        </p>
        <div className="flex justify-center space-x-6 mt-2">
          <a
            href="mailto:colus@internet.ru"
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Mail className="w-4 h-4 mr-1" />
            Email
          </a>
          <a
            href="tel:+79139511507"
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Phone className="w-4 h-4 mr-1" />
            Телефон
          </a>
        </div>
      </div>
    </div>
  );
}
