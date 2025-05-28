import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NutritionState {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  addNutrition: (calories: number, protein: number, carbs: number, fat: number) => void;
  resetDaily: () => void;
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set) => ({
      dailyCalories: 0,
      dailyProtein: 0,
      dailyCarbs: 0,
      dailyFat: 0,
      
      addNutrition: (calories: number, protein: number, carbs: number, fat: number) =>
        set((state) => ({
          dailyCalories: state.dailyCalories + calories,
          dailyProtein: state.dailyProtein + protein,
          dailyCarbs: state.dailyCarbs + carbs,
          dailyFat: state.dailyFat + fat,
        })),
        
      resetDaily: () =>
        set({
          dailyCalories: 0,
          dailyProtein: 0,
          dailyCarbs: 0,
          dailyFat: 0,
        }),
    }),
    {
      name: 'nutrition-storage',
    }
  )
); 