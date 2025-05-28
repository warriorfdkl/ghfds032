import React from 'react';
import { useNutritionStore } from '../store/nutritionStore';
import { ProteinIcon, CarbsIcon, FatsIcon } from './Icons';

const NutritionProgress: React.FC = () => {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useNutritionStore();

  // Целевые значения (можно вынести в настройки пользователя позже)
  const TARGET_PROTEIN = 100; // г
  const TARGET_CARBS = 201; // г
  const TARGET_FAT = 44; // г

  const getProgressWidth = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <div className="bg-[#1C1C1E] rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-white">сегодня</span>
        <span className="text-white">{Math.round(dailyCalories)} ккал</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ProteinIcon className="text-red-500 w-5 h-5" />
          <div className="flex-1 h-2 bg-[#2C2C2E] rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: getProgressWidth(dailyProtein, TARGET_PROTEIN) }}
            />
          </div>
          <span className="text-white min-w-[80px] text-right">
            {Math.round(dailyProtein)}/{TARGET_PROTEIN} г
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CarbsIcon className="text-purple-500 w-5 h-5" />
          <div className="flex-1 h-2 bg-[#2C2C2E] rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: getProgressWidth(dailyCarbs, TARGET_CARBS) }}
            />
          </div>
          <span className="text-white min-w-[80px] text-right">
            {Math.round(dailyCarbs)}/{TARGET_CARBS} г
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FatsIcon className="text-yellow-500 w-5 h-5" />
          <div className="flex-1 h-2 bg-[#2C2C2E] rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: getProgressWidth(dailyFat, TARGET_FAT) }}
            />
          </div>
          <span className="text-white min-w-[80px] text-right">
            {Math.round(dailyFat)}/{TARGET_FAT} г
          </span>
        </div>
      </div>
    </div>
  );
};

export default NutritionProgress; 