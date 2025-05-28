import { useEffect, useState } from 'react'
import './App.css'
import WebApp from '@twa-dev/sdk'

interface NutritionData {
  proteins: number
  carbs: number
  fats: number
  calories: number
}

function App() {
  const [nutritionData] = useState<NutritionData>({
    proteins: 0,
    carbs: 0,
    fats: 0,
    calories: 1615 // Целевое количество калорий
  })

  useEffect(() => {
    WebApp.ready()
    // Устанавливаем тему Telegram
    document.documentElement.className = WebApp.colorScheme
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="settings-icon">⚙️</div>
        <div className="premium-banner">
          <div className="premium-content">
            <h2>CalorieAI Премиум!</h2>
            <p>Получите неограниченный доступ к распознаванию на базе ИИ.</p>
            <button className="start-button">Начать</button>
          </div>
          <div className="premium-images">
            {/* Здесь будут изображения еды */}
          </div>
        </div>
      </header>

      <section className="progress-section">
        <h2>Ваш прогресс</h2>
        <div className="nutrition-card">
          <div className="today-header">
            <span>сегодня</span>
            <span>{nutritionData.calories} ккал</span>
          </div>
          
          <div className="nutrition-stats">
            <div className="stat-row">
              <span>🥩 Белки</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${(nutritionData.proteins/100) * 100}%`}}></div>
              </div>
              <span>{nutritionData.proteins}/100 г</span>
            </div>
            
            <div className="stat-row">
              <span>🍚 Углеводы</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${(nutritionData.carbs/201) * 100}%`}}></div>
              </div>
              <span>{nutritionData.carbs}/201 г</span>
            </div>
            
            <div className="stat-row">
              <span>🥑 Жиры</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: `${(nutritionData.fats/44) * 100}%`}}></div>
              </div>
              <span>{nutritionData.fats}/44 г</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="home-button">🏠</button>
        <button className="scan-button">📸</button>
        <button className="stats-button">📊</button>
      </footer>
    </div>
  )
}

export default App
