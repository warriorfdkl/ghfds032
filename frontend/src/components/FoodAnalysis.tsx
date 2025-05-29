import React, { useState, useRef } from 'react';
import { useNutritionStore } from '../store/nutritionStore';

interface AnalysisResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FoodAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addNutrition } = useNutritionStore();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // TODO: Показать ошибку пользователю
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Устанавливаем размеры canvas равными размерам видео
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Рисуем кадр из видео на canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Получаем данные изображения в формате base64
        const imageData = canvas.toDataURL('image/jpeg');
        
        // Останавливаем камеру
        stopCamera();
        
        // Анализируем фото
        analyzeFood(imageData);
      }
    }
  };

  const analyzeFood = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      // Здесь будет запрос к API для анализа фото
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const result: AnalysisResult = await response.json();
      setCurrentResult(result);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error analyzing food:', error);
      // TODO: Показать ошибку пользователю
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToDaily = () => {
    if (currentResult) {
      addNutrition(
        currentResult.calories,
        currentResult.protein,
        currentResult.carbs,
        currentResult.fat
      );
      setShowResults(false);
      setCurrentResult(null);
    }
  };

  return (
    <>
      {/* Кнопка открытия камеры */}
      <button
        onClick={startCamera}
        className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-600 transition-colors"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </button>

      {/* Модальное окно с камерой */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
            <button
              onClick={stopCamera}
              className="bg-red-500 text-white px-6 py-3 rounded-full"
            >
              Отмена
            </button>
            <button
              onClick={capturePhoto}
              className="bg-white text-black px-6 py-3 rounded-full"
            >
              Сделать фото
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно с результатами */}
      {showResults && currentResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1C1C1E] p-6 rounded-xl max-w-sm w-full mx-4">
            <h3 className="text-white text-xl font-medium mb-4">
              {currentResult.name}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>Калории:</span>
                <span>{currentResult.calories} ккал</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Белки:</span>
                <span>{currentResult.protein}г</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Углеводы:</span>
                <span>{currentResult.carbs}г</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Жиры:</span>
                <span>{currentResult.fat}г</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowResults(false)}
                className="flex-1 bg-[#2C2C2E] text-white py-3 rounded-xl"
              >
                Отмена
              </button>
              <button
                onClick={handleAddToDaily}
                className="flex-1 bg-purple-500 text-white py-3 rounded-xl"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Индикатор загрузки */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1C1C1E] p-4 rounded-xl">
            <p className="text-white">Анализируем фото...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodAnalysis; 