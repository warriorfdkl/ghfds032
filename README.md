# Food Tracker Telegram Mini App

A Telegram Mini App for analyzing food and tracking calories using AI vision.

## Features

- 📸 Take photos of food
- 🔍 AI-powered food recognition
- 📊 Calorie tracking
- 🥗 Nutritional information

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Python + python-telegram-bot
- AI: OpenAI Vision API
- Hosting: Vercel (frontend) + Your preferred hosting for bot

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/food-tracker-bot.git
cd food-tracker-bot
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Create .env file in root directory
```
TELEGRAM_TOKEN=your_bot_token
OPENAI_API_KEY=your_openai_key
```

4. Install Python dependencies
```bash
pip install -r requirements.txt
```

5. Run the development server
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Bot
python bot.py
```

## Deployment

The frontend is automatically deployed to Vercel when pushing to the main branch.

For the bot, you'll need to:
1. Host it on your preferred platform
2. Set up environment variables
3. Update the WEBAPP_URL in the bot to point to your Vercel deployment

## License

MIT 