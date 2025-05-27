# Telegram Food Scanner

Telegram мини-приложение для распознавания еды и анализа пищевой ценности с помощью камеры.

## Возможности

- 📸 Распознавание еды в реальном времени
- 🔍 Определение ингредиентов
- 📊 Анализ калорийности
- 🥗 Информация о пищевой ценности
- 📱 Работает как мини-приложение Telegram

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/warriorfdkl/ghfds032.git
cd ghfds032
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Создайте файл `.env` и добавьте необходимые переменные окружения:
```
TELEGRAM_TOKEN=ваш_токен_телеграм_бота
OPENAI_API_KEY=ваш_ключ_openai
WEBAPP_URL=url_вашего_приложения
```

4. Запустите бота:
```bash
python bot.py
```

## Настройка мини-приложения

1. Зарегистрируйте мини-приложение в BotFather:
   - Отправьте команду /mybots
   - Выберите вашего бота
   - Нажмите Menu Button
   - Выберите Edit Menu Button
   - Выберите Web App
   - Введите URL вашего веб-приложения

2. Разместите веб-приложение на HTTPS хостинге:
   - index.html
   - styles.css
   - app.js
   - SVG иконки

## Технологии

- Python 3.8+
- python-telegram-bot
- OpenAI API (GPT-4 Vision)
- TensorFlow.js
- Flask 