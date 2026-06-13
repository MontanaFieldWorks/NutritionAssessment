export type GoalType = 'fat_loss' | 'muscle_gain' | 'maintenance';

export interface Client {
  id: string;
  name: string;
  weight: number; // in lbs
  tdee: number; // TDEE in kcal
  goalCalories: number; // target calories in kcal
  proteinGoal: number; // in grams
  carbsGoal: number; // in grams
  fatGoal: number; // in grams
  goalType: GoalType;
}

export interface MealItem {
  id: string;
  name: string;
  mealType: string; // 'snack' | 'breakfast' | 'lunch' | 'dinner'
  time: string; // e.g. "04:47 PM"
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface JournalDay {
  date: string; // e.g. "Jun 12", "Jun 11"
  dayOfWeek: string; // e.g. "FRI", "THU"
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  proteinPct: number; // percentage of calories
  carbsPct: number; // percentage of calories
  fatPct: number; // percentage of calories
  meals: MealItem[];
  starred?: boolean;
}

export interface NutritionAnalysis {
  macroBreakdownFeedback: string;
  calorieAssessment: string;
  practicalRecommendations: string[];
  menuSuggestions: string[];
  coachingSummary: string;
}

export interface ClientReport {
  id: string;
  clientId: string;
  dateRange: string;
  analysis: NutritionAnalysis;
  createdAt: string;
}
