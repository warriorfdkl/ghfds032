import { useEffect, useState } from 'react'
import './App.css'
import WebApp from '@twa-dev/sdk'
import { HomeIcon, CameraIcon, StatsIcon, SettingsIcon, ProteinIcon, CarbsIcon, FatsIcon } from './components/Icons'

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
        <button className="icon-button settings-button">
          <SettingsIcon />
        </button>
        <div className="premium-banner">
          <div className="premium-content">
            <h2>CalorieAI Премиум!</h2>
            <p>Получите неограниченный доступ к распознаванию на базе ИИ.</p>
            <button className="start-button">Начать</button>
          </div>
          <div className="premium-images">
            <div className="premium-image-placeholder" />
            <div className="premium-image-placeholder" />
          </div>
        </div>
      </header>

      <section className="progress-section">
        <h2>Ваш прогресс</h2>
        <div className="nutrition-card">
          <div className="today-header">
            <span>сегодня</span>
            <span className="calories">{nutritionData.calories} ккал</span>
          </div>
          
          <div className="nutrition-stats">
            <div className="stat-row">
              <div className="stat-icon">
                <ProteinIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Белки</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(nutritionData.proteins/100) * 100}%`}} />
                </div>
                <span className="stat-value">{nutritionData.proteins}/100 г</span>
              </div>
            </div>
            
            <div className="stat-row">
              <div className="stat-icon">
                <CarbsIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Углеводы</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(nutritionData.carbs/201) * 100}%`}} />
                </div>
                <span className="stat-value">{nutritionData.carbs}/201 г</span>
              </div>
            </div>
            
            <div className="stat-row">
              <div className="stat-icon">
                <FatsIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Жиры</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(nutritionData.fats/44) * 100}%`}} />
                </div>
                <span className="stat-value">{nutritionData.fats}/44 г</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="nav-button">
          <HomeIcon />
        </button>
        <button className="nav-button camera-button">
          <CameraIcon />
        </button>
        <button className="nav-button">
          <StatsIcon />
        </button>
      </footer>
    </div>
  )
}

export default App
