import os
import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, MenuButtonWebApp
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters
from dotenv import load_dotenv
import openai
from PIL import Image
import io

# Загрузка переменных окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Получение переменных окружения
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
WEBAPP_URL = os.getenv('WEBAPP_URL')

# Инициализация клиента OpenAI
openai.api_key = OPENAI_API_KEY

async def setup_menu_button(application: Application):
    """Настраивает кнопку меню для мини-приложения."""
    await application.bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text="🔍 Сканер Еды",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )
    )

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Отправляет сообщение с кнопкой для открытия веб-приложения."""
    keyboard = [
        [InlineKeyboardButton(
            "📸 Открыть сканер еды",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )],
        [InlineKeyboardButton(
            "ℹ️ Как пользоваться",
            callback_data="help"
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_message = (
        "👋 Добро пожаловать в Сканер Еды!\n\n"
        "Это мини-приложение поможет вам:\n"
        "🔍 Распознавать продукты на фото\n"
        "📊 Узнавать калорийность блюд\n"
        "🥗 Получать информацию о составе\n\n"
        "Нажмите на кнопку ниже или используйте кнопку меню для быстрого доступа к сканеру."
    )
    
    await update.message.reply_text(welcome_message, reply_markup=reply_markup)

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка нажатий на кнопки."""
    query = update.callback_query
    await query.answer()

    if query.data == "help":
        help_text = (
            "🤖 Как пользоваться Сканером Еды:\n\n"
            "1. Нажмите на кнопку '📸 Открыть сканер еды' или используйте кнопку меню\n"
            "2. Разрешите доступ к камере\n"
            "3. Наведите камеру на еду\n"
            "4. Увидите распознавание в реальном времени\n"
            "5. Нажмите кнопку съемки для подробного анализа\n\n"
            "🔄 Вы можете переключаться между камерами и использовать вспышку при необходимости\n"
            "📱 Приложение работает как в чате с ботом, так и через кнопку меню Telegram"
        )
        await query.message.reply_text(help_text)

async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка фото, полученного из веб-приложения."""
    try:
        # Получаем данные фото
        photo_data = update.message.web_app_data.data
        
        # Конвертируем данные в изображение
        image = Image.open(io.BytesIO(photo_data))
        
        # Отправляем сообщение о обработке
        processing_message = await update.message.reply_text("🔄 Анализируем ваше блюдо...")
        
        # Анализируем с помощью OpenAI Vision
        response = await openai.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Проанализируй это блюдо и предоставь: 1) Какие продукты присутствуют на фото 2) Примерное количество калорий 3) Основную информацию о питательной ценности. Оформи ответ красиво, используя эмодзи."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{photo_data.hex()}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )

        # Удаляем сообщение о обработке
        await processing_message.delete()
        
        # Отправляем результат анализа
        await update.message.reply_text(response.choices[0].message.content)
        
    except Exception as e:
        logger.error(f"Ошибка обработки данных: {str(e)}")
        await update.message.reply_text("Извините, произошла ошибка при обработке фото. Пожалуйста, попробуйте еще раз.")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Отправляет сообщение при команде /help."""
    help_text = (
        "🤖 Помощь по использованию Сканера Еды\n\n"
        "Как пользоваться:\n"
        "1. Нажмите кнопку '📸 Открыть сканер еды' или используйте кнопку меню\n"
        "2. Разрешите доступ к камере\n"
        "3. Наведите камеру на еду\n"
        "4. Увидите распознавание в реальном времени\n"
        "5. Нажмите кнопку съемки для подробного анализа\n\n"
        "Команды:\n"
        "/start - Открыть главное меню\n"
        "/help - Показать это сообщение"
    )
    await update.message.reply_text(help_text)

async def post_init(application: Application):
    """Действия после инициализации бота."""
    await setup_menu_button(application)

def main():
    """Запуск бота."""
    # Создаем приложение
    application = Application.builder().token(TELEGRAM_TOKEN).post_init(post_init).build()

    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))

    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main() 