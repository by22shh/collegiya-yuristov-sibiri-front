# Настройка отправки email

Для работы формы обратной связи необходимо настроить переменные окружения.

## Создайте файл .env.local в корне проекта:

```env
# Email настройки для отправки писем (Mail.ru)
SMTP_HOST=smtp.mail.ru
SMTP_PORT=587
SMTP_USER=your-email@mail.ru
SMTP_PASS=your-app-password

# Email куда будут приходить письма с формы
CONTACT_EMAIL=colus@internet.ru
```

## Настройка Mail.ru (рекомендуется для России):

1. Войдите в свой аккаунт Mail.ru
2. Перейдите в настройки безопасности
3. Включите двухфакторную аутентификацию (если еще не включена)
4. Создайте пароль для приложений:
   - Настройки → Безопасность → Пароли для внешних приложений
   - Создайте новый пароль
   - Используйте этот пароль в SMTP_PASS

**Настройки для Mail.ru:**
```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=587
SMTP_USER=your-email@mail.ru
SMTP_PASS=your-app-password
CONTACT_EMAIL=colus@internet.ru
```

## Альтернативные SMTP серверы:

### Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Yandex:
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=587
SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-app-password
```

## Проверка работы:

После настройки переменных окружения перезапустите сервер разработки:
```bash
bun run dev
```

Форма обратной связи будет отправлять письма на указанный в CONTACT_EMAIL адрес.
