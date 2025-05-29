import { useEffect } from 'react'
import './App.css'
import { HomeIcon, CameraIcon, StatsIcon, SettingsIcon, ProteinIcon, CarbsIcon, FatsIcon } from './components/Icons'
import { useNutritionStore } from './store/nutritionStore'
import FoodAnalysis from './components/FoodAnalysis'

function App() {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useNutritionStore()

  useEffect(() => {
    // Telegram WebApp initialization
    const webapp = (window as any).Telegram.WebApp
    webapp.ready()
    webapp.expand()
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
            <span className="calories">{dailyCalories} ккал</span>
          </div>
          
          <div className="nutrition-stats">
            <div className="stat-row">
              <div className="stat-icon">
                <ProteinIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Белки</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(dailyProtein/100) * 100}%`}} />
                </div>
                <span className="stat-value">{dailyProtein}/100 г</span>
              </div>
            </div>
            
            <div className="stat-row">
              <div className="stat-icon">
                <CarbsIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Углеводы</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(dailyCarbs/201) * 100}%`}} />
                </div>
                <span className="stat-value">{dailyCarbs}/201 г</span>
              </div>
            </div>
            
            <div className="stat-row">
              <div className="stat-icon">
                <FatsIcon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Жиры</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{width: `${(dailyFat/44) * 100}%`}} />
                </div>
                <span className="stat-value">{dailyFat}/44 г</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="nav-button">
          <HomeIcon />
        </button>
        <div className="camera-button-container">
          <FoodAnalysis />
        </div>
        <button className="nav-button">
          <StatsIcon />
        </button>
      </footer>
    </div>
  )
}

export default App
