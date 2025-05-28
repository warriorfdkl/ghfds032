import React, { useState } from 'react';
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
  const { addNutrition } = useNutritionStore();

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
      
      // Добавляем результаты в хранилище
      addNutrition(
        result.calories,
        result.protein,
        result.carbs,
        result.fat
      );

      // Показываем результат пользователю
      // TODO: Добавить красивое уведомление
      
    } catch (error) {
      console.error('Error analyzing food:', error);
      // TODO: Показать ошибку пользователю
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Компоненты камеры и UI будут здесь */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1C1C1E] p-4 rounded-xl">
            <p className="text-white">Анализируем фото...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodAnalysis; 