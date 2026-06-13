import { Client, JournalDay, ClientReport } from "./types";

export const SEEDED_CLIENTS: Client[] = [
  {
    id: "reuvein-mittler",
    name: "Reuvein mittler",
    weight: 175,
    tdee: 2200,
    goalCalories: 1700,
    proteinGoal: 149, // 35% of 1700 from Protein (approx 149g)
    carbsGoal: 149,   // 35% of 1700 from Carbs (approx 149g)
    fatGoal: 57,      // 30% of 1700 from Fat (approx 57g)
    goalType: "fat_loss"
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    weight: 142,
    tdee: 1950,
    goalCalories: 1950,
    proteinGoal: 130, // 27% Protein
    carbsGoal: 220,   // 45% Carbs
    fatGoal: 60,      // 28% Fat
    goalType: "maintenance"
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    weight: 190,
    tdee: 2600,
    goalCalories: 3000,
    proteinGoal: 180, // 24% Protein
    carbsGoal: 390,   // 52% Carbs
    fatGoal: 80,      // 24% Fat
    goalType: "muscle_gain"
  }
];

export const SEEDED_JOURNAL: Record<string, JournalDay[]> = {
  "reuvein-mittler": [
    {
      date: "Jun 08",
      dayOfWeek: "MON",
      calories: 1829,
      protein: 141.5,
      carbs: 180,
      fat: 56.4,
      proteinPct: 31,
      carbsPct: 41,
      fatPct: 28,
      starred: true,
      meals: [
        { id: "m1", name: "Chicken cutlets", mealType: "dinner", time: "09:04 PM", calories: 247, protein: 25, carbs: 8, fat: 14 },
        { id: "m2", name: "Avocado", mealType: "dinner", time: "09:04 PM", calories: 160, protein: 2, carbs: 9, fat: 15 },
        { id: "m3", name: "Rice Cake", mealType: "dinner", time: "09:04 PM", calories: 35, protein: 0.6, carbs: 7, fat: 0.2 },
        { id: "m4", name: "Broccoli", mealType: "dinner", time: "09:04 PM", calories: 31, protein: 3, carbs: 6, fat: 0.4 },
        { id: "m5", name: "Almond Butter Plain Without Salt", mealType: "snack", time: "04:24 PM", calories: 98, protein: 3, carbs: 3, fat: 9 },
        { id: "m6", name: "Banana", mealType: "snack", time: "04:23 PM", calories: 53, protein: 0.6, carbs: 12, fat: 0.2 },
        { id: "m7", name: "No Cow - Chunky Peanut Butter Protein Bar", mealType: "snack", time: "04:23 PM", calories: 190, protein: 21, carbs: 26, fat: 4 },
        { id: "m8", name: "Tuna fish", mealType: "snack", time: "04:22 PM", calories: 132, protein: 28, carbs: 0, fat: 1 },
        { id: "m9", name: "Dave's Killer Bread - Organic Bread", mealType: "snack", time: "04:22 PM", calories: 110, protein: 5, carbs: 22, fat: 2 },
        { id: "m10", name: "Dave's Killer Bread - Organic Bread", mealType: "snack", time: "04:22 PM", calories: 110, protein: 5, carbs: 22, fat: 2 },
        { id: "m11", name: "Norman's - Vanilla Greek Light Nonfat Yogurt", mealType: "snack", time: "04:21 PM", calories: 100, protein: 10, carbs: 14, fat: 0 },
        { id: "m12", name: "Norman's - Vanilla Greek Light Nonfat Yogurt", mealType: "snack", time: "04:21 PM", calories: 100, protein: 10, carbs: 14, fat: 0 },
        { id: "m13", name: "Almond Milk", mealType: "snack", time: "04:22 PM", calories: 30, protein: 1, carbs: 1, fat: 3 },
        { id: "m14", name: "Orgain - Vanilla Bean Flavored Protein Powder", mealType: "snack", time: "04:21 PM", calories: 160, protein: 21, carbs: 20, fat: 5 },
        { id: "m15", name: "NuGo - Slim Protein Bar, Toasted Coconut", mealType: "snack", time: "04:21 PM", calories: 180, protein: 17, carbs: 17, fat: 7 },
        { id: "m16", name: "Blueberry Frozen Unsweetened", mealType: "snack", time: "04:21 PM", calories: 40, protein: 0.3, carbs: 9, fat: 0.5 },
        { id: "m17", name: "Frozen Strawberries", mealType: "snack", time: "04:21 PM", calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
        { id: "m18", name: "Romaine lettuce", mealType: "snack", time: "04:22 PM", calories: 21, protein: 1, carbs: 4, fat: 0.1 }
      ]
    },
    {
      date: "Jun 09",
      dayOfWeek: "TUE",
      calories: 1708,
      protein: 129.8,
      carbs: 139.0,
      fat: 72.8,
      proteinPct: 30,
      carbsPct: 32,
      fatPct: 38,
      starred: true,
      meals: [
        { id: "m19", name: "Qualify whey", mealType: "snack", time: "10:47 PM", calories: 120, protein: 24, carbs: 3, fat: 2 },
        { id: "m20", name: "Nugo - Mint Chocolate Chip", mealType: "snack", time: "10:46 PM", calories: 200, protein: 10, carbs: 29, fat: 5 },
        { id: "m21", name: "Lean ground burger", mealType: "snack", time: "10:45 PM", calories: 250, protein: 26, carbs: 0, fat: 15 },
        { id: "m22", name: "Green beans", mealType: "snack", time: "10:45 PM", calories: 40, protein: 2, carbs: 7, fat: 0.3 },
        { id: "m23", name: "Grilled salmon", mealType: "snack", time: "05:57 PM", calories: 259, protein: 26, carbs: 0, fat: 17 },
        { id: "m24", name: "Sweet Potato", mealType: "snack", time: "05:57 PM", calories: 249, protein: 4, carbs: 58, fat: 0.5 },
        { id: "m25", name: "Feta Cheese", mealType: "snack", time: "05:57 PM", calories: 75, protein: 4, carbs: 1, fat: 6 },
        { id: "m26", name: "Almond Slices", mealType: "snack", time: "05:56 PM", calories: 173, protein: 6, carbs: 6, fat: 15 },
        { id: "m27", name: "Greek Yogurt", mealType: "snack", time: "05:55 PM", calories: 120, protein: 10, carbs: 6, fat: 5 },
        { id: "m28", name: "Nugo Slim Coconut", mealType: "snack", time: "05:57 PM", calories: 200, protein: 15, carbs: 22, fat: 7 },
        { id: "m29", name: "Lettuce Romaine Raw", mealType: "snack", time: "05:57 PM", calories: 8, protein: 0.6, carbs: 2, fat: 0.1 },
        { id: "m30", name: "Lettuce Romaine Raw", mealType: "snack", time: "05:57 PM", calories: 8, protein: 0.6, carbs: 2, fat: 0.1 },
        { id: "m31", name: "Alpine Fresh - Blueberries", mealType: "snack", time: "05:56 PM", calories: 6, protein: 0.1, carbs: 1, fat: 0 }
      ]
    },
    {
      date: "Jun 10",
      dayOfWeek: "WED",
      calories: 1725,
      protein: 139.0,
      carbs: 161.0,
      fat: 58.6,
      proteinPct: 32,
      carbsPct: 37,
      fatPct: 31,
      starred: true,
      meals: [
        { id: "m32", name: "Grilled salmon", mealType: "snack", time: "10:05 PM", calories: 259, protein: 26, carbs: 0, fat: 17 },
        { id: "m33", name: "Pumpkin Seeds", mealType: "snack", time: "10:05 PM", calories: 151, protein: 7, carbs: 5, fat: 13 },
        { id: "m34", name: "Vegetable Soup", mealType: "snack", time: "10:05 PM", calories: 83, protein: 3, carbs: 15, fat: 1 },
        { id: "m35", name: "Sprout Living - Epic Protein, Original", mealType: "dinner", time: "06:47 PM", calories: 130, protein: 26, carbs: 7, fat: 3 },
        { id: "m36", name: "Dave's Killer Bread - Organic Bread", mealType: "snack", time: "05:30 PM", calories: 110, protein: 5, carbs: 22, fat: 2 },
        { id: "m37", name: "Dave's Killer Bread - Organic Bread", mealType: "snack", time: "05:30 PM", calories: 110, protein: 5, carbs: 22, fat: 2 },
        { id: "m38", name: "eggs - Fried Eggs", mealType: "snack", time: "05:30 PM", calories: 105, protein: 9, carbs: 2, fat: 8 },
        { id: "m39", name: "Nugo Slim - Brownie Crunch", mealType: "snack", time: "05:30 PM", calories: 190, protein: 16, carbs: 19, fat: 6 },
        { id: "m40", name: "No Cow", mealType: "snack", time: "05:29 PM", calories: 190, protein: 20, carbs: 24, fat: 6 },
        { id: "m41", name: "Orgain - Vanilla Organic Protein Powder", mealType: "snack", time: "05:29 PM", calories: 150, protein: 21, carbs: 15, fat: 4 },
        { id: "m42", name: "Norman's - Vanilla Greek Light Yogurt", mealType: "snack", time: "05:29 PM", calories: 100, protein: 10, carbs: 14, fat: 0 },
        { id: "m43", name: "Almond Milk", mealType: "snack", time: "05:29 PM", calories: 30, protein: 1, carbs: 1, fat: 3 },
        { id: "m44", name: "Frozen strawberry", mealType: "snack", time: "05:28 PM", calories: 50, protein: 1, carbs: 12, fat: 0.4 },
        { id: "m45", name: "Blueberry Frozen Unsweetened", mealType: "snack", time: "05:28 PM", calories: 40, protein: 0.3, carbs: 9, fat: 0.5 },
        { id: "m46", name: "Banana", mealType: "snack", time: "05:29 PM", calories: 27, protein: 0.3, carbs: 6, fat: 0.1 }
      ]
    },
    {
      date: "Jun 11",
      dayOfWeek: "THU",
      calories: 1607,
      protein: 141.6,
      carbs: 153.6,
      fat: 49.3,
      proteinPct: 35,
      carbsPct: 37,
      fatPct: 28,
      starred: true,
      meals: [
        { id: "m47", name: "Low Fat Cottage Cheese", mealType: "snack", time: "11:45 PM", calories: 98, protein: 11, carbs: 3, fat: 2 },
        { id: "m48", name: "Omelette", mealType: "snack", time: "11:45 PM", calories: 154, protein: 10, carbs: 1, fat: 12 },
        { id: "m49", name: "Spelt cracker", mealType: "snack", time: "11:45 PM", calories: 120, protein: 3, carbs: 21, fat: 3 },
        { id: "m50", name: "Nut' N Better - Organic Peanut Butter", mealType: "snack", time: "04:46 PM", calories: 190, protein: 8, carbs: 7, fat: 16 },
        { id: "m51", name: "Whole Wheat Bread", mealType: "snack", time: "04:46 PM", calories: 71, protein: 3, carbs: 12, fat: 1 },
        { id: "m52", name: "Whole Wheat Bread", mealType: "snack", time: "04:46 PM", calories: 71, protein: 3, carbs: 12, fat: 1 },
        { id: "m53", name: "Qualify whey", mealType: "snack", time: "04:45 PM", calories: 120, protein: 24, carbs: 3, fat: 2 },
        { id: "m54", name: "Tuna fish", mealType: "snack", time: "04:45 PM", calories: 132, protein: 28, carbs: 0, fat: 1 },
        { id: "m55", name: "Nugo Slim - Brownie Crunch", mealType: "snack", time: "04:45 PM", calories: 190, protein: 16, carbs: 19, fat: 6 },
        { id: "m56", name: "Orgain - Vanilla Organic Protein Powder", mealType: "snack", time: "04:45 PM", calories: 150, protein: 21, carbs: 15, fat: 4 },
        { id: "m57", name: "Norman's - Vanilla Greek Light Yogurt", mealType: "snack", time: "04:45 PM", calories: 100, protein: 10, carbs: 14, fat: 0 },
        { id: "m58", name: "Almond Milk", mealType: "snack", time: "04:45 PM", calories: 30, protein: 1, carbs: 1, fat: 3 },
        { id: "m59", name: "Blueberry Frozen Unsweetened", mealType: "snack", time: "04:45 PM", calories: 79, protein: 0.7, carbs: 19, fat: 1 },
        { id: "m60", name: "Frozen strawberry", mealType: "snack", time: "04:47 PM", calories: 50, protein: 1, carbs: 12, fat: 0.4 },
        { id: "m61", name: "Banana", mealType: "snack", time: "04:45 PM", calories: 53, protein: 0.6, carbs: 12, fat: 0.2 }
      ]
    },
    {
      date: "Jun 12",
      dayOfWeek: "FRI",
      calories: 2237,
      protein: 184.5,
      carbs: 232.0,
      fat: 66.8,
      proteinPct: 32,
      carbsPct: 41,
      fatPct: 27,
      starred: true,
      meals: [
        { id: "m62", name: "Chicken Leg", mealType: "snack", time: "04:47 PM", calories: 237, protein: 31, carbs: 0, fat: 12 },
        { id: "m63", name: "Chicken Soup", mealType: "snack", time: "04:47 PM", calories: 174, protein: 12, carbs: 17, fat: 6 },
        { id: "m64", name: "Salmon", mealType: "snack", time: "04:47 PM", calories: 206, protein: 22, carbs: 0, fat: 13 },
        { id: "m65", name: "Sourdough bread", mealType: "snack", time: "04:46 PM", calories: 272, protein: 11, carbs: 52, fat: 2 },
        { id: "m66", name: "Sourdough bread", mealType: "snack", time: "04:46 PM", calories: 272, protein: 11, carbs: 52, fat: 2 },
        { id: "m67", name: "Nugo Slim - Brownie Crunch", mealType: "snack", time: "04:46 PM", calories: 190, protein: 16, carbs: 19, fat: 6 },
        { id: "m68", name: "Hemp seed", mealType: "snack", time: "04:46 PM", calories: 166, protein: 9, carbs: 2, fat: 13 },
        { id: "m69", name: "Chickpeas", mealType: "snack", time: "04:46 PM", calories: 164, protein: 9, carbs: 27, fat: 3 },
        { id: "m70", name: "Tuna fish", mealType: "snack", time: "04:46 PM", calories: 132, protein: 28, carbs: 0, fat: 1 },
        { id: "m71", name: "Orgain - Organic Protein", mealType: "snack", time: "04:45 PM", calories: 150, protein: 21, carbs: 15, fat: 4 },
        { id: "m72", name: "Norman's - Vanilla Greek Light Nonfat Yogurt", mealType: "snack", time: "04:45 PM", calories: 100, protein: 10, carbs: 14, fat: 0 },
        { id: "m73", name: "Salad", mealType: "snack", time: "04:45 PM", calories: 50, protein: 2, carbs: 10, fat: 2 },
        { id: "m74", name: "Frozen Blueberries", mealType: "snack", time: "04:45 PM", calories: 35, protein: 0.5, carbs: 9, fat: 0.2 },
        { id: "m75", name: "Frozen Strawberries", mealType: "snack", time: "04:45 PM", calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
        { id: "m76", name: "Almond Milk", mealType: "snack", time: "04:44 PM", calories: 30, protein: 1, carbs: 1, fat: 3 },
        { id: "m77", name: "Banana", mealType: "snack", time: "04:44 PM", calories: 27, protein: 0.3, carbs: 6, fat: 0.1 }
      ]
    }
  ],
  "sarah-chen": [
    {
      date: "Jun 08",
      dayOfWeek: "MON",
      calories: 1910,
      protein: 125,
      carbs: 212,
      fat: 62,
      proteinPct: 26,
      carbsPct: 44,
      fatPct: 30,
      starred: false,
      meals: [
        { id: "s1", name: "Turkey Wrap & Spinach", mealType: "lunch", time: "12:30 PM", calories: 480, protein: 35, carbs: 45, fat: 12 },
        { id: "s2", name: "Whey Protein Shake", mealType: "snack", time: "03:45 PM", calories: 210, protein: 26, carbs: 8, fat: 3 },
        { id: "s3", name: "Steak and Rice Bowl", mealType: "dinner", time: "07:15 PM", calories: 780, protein: 48, carbs: 95, fat: 24 },
        { id: "s4", name: "Greek Yogurt & Berries", mealType: "breakfast", time: "08:15 AM", calories: 240, protein: 16, carbs: 32, fat: 4 },
        { id: "s5", name: "Peanuts & Dark Chocolate", mealType: "snack", time: "09:30 PM", calories: 200, protein: 0, carbs: 32, fat: 19 }
      ]
    },
    {
      date: "Jun 09",
      dayOfWeek: "TUE",
      calories: 1980,
      protein: 132,
      carbs: 228,
      fat: 58,
      proteinPct: 27,
      carbsPct: 46,
      fatPct: 27,
      starred: true,
      meals: [
        { id: "s6", name: "Eggs, Whites & Oatmeal", mealType: "breakfast", time: "08:15 AM", calories: 420, protein: 28, carbs: 54, fat: 10 },
        { id: "s7", name: "Salmon & Baked Potato", mealType: "lunch", time: "01:00 PM", calories: 610, protein: 42, carbs: 58, fat: 22 },
        { id: "s8", name: "Tofu with Mixed Greens & Quinoa", mealType: "dinner", time: "07:00 PM", calories: 650, protein: 32, carbs: 84, fat: 18 },
        { id: "s9", name: "Apple with Almond Butter", mealType: "snack", time: "04:30 PM", calories: 300, protein: 30, carbs: 32, fat: 8 }
      ]
    }
  ]
};

export const SEEDED_REPORTS: Record<string, ClientReport[]> = {
  "reuvein-mittler": [
    {
      id: "r-rep-1",
      clientId: "reuvein-mittler",
      dateRange: "Jun 08 - Jun 12",
      createdAt: "2026-06-12",
      analysis: {
        macroBreakdownFeedback: "Reuvein is executing his protein target at an elite level, averaging 147.3g of protein daily, which hits his 149g coaching target within 1.1% margin. Carbs have been slightly higher on Friday during high intensity training (232g), pushing the average carbs slightly above compliance (38% actual vs 35% goal). Fat remains exceptionally controlled at 30% average energy output, lining up precisely with the fat-loss protocol limit.",
        calorieAssessment: "Daily energy intake is averaging 1,821 kcal against a budget of 1,700 kcal. This represents a weekly average variance of +121 kcal, which is highly compliant. Given a calculated TDEE of 2,200 kcal, Reuvein remains in a consistent net energy deficit of roughly -379 kcal daily. This ensures sustained fat tissue oxidation while sparing active skeletal muscle.",
        practicalRecommendations: [
          "Maintain high protein ingestion spacing: ensure at least 25g - 30g of protein is consumed every 3 to 4 hours to sustain active muscle nitrogen retention.",
          "Strategic Carb Loading: restrict higher carb items (like Sourdough bread) strictly to the 2-hour pre-workout or post-workout metabolic window to aid glycogen recovery.",
          "Hydration check: attempt to consume 3.5 liters of clean water daily, especially when supplementing with protein isolates to support proper kidney clearance."
        ],
        menuSuggestions: [
          "Swap Friday's multiple units of Sourdough Bread (544 kcal total) for 1 unit of Ezekiel Bread or Spelt Crackers to shave off 150-200 passive empty carb calories.",
          "Replace the double servings of commercial snack bars (like Nugo Slim or No Cow) with raw unsalted pumpkin seeds or low-fat cottage cheese to reduce refined sugar alcohols.",
          "Maximize volume on lower days by trading Commercial Fruit/Greek yogurts for unflavored nonfat Greek yogurt, sweetening with natural vanilla extract or stevia."
        ],
        coachingSummary: "Excellent overall discipline this week! You are maintaining your calorie targets within key compliance zones, and hitting your protein goal in a remarkable fashion. Let's make the minor carbohydrate adjustments suggested for next week to accelerate the final stages of the fat loss milestone."
      }
    }
  ]
};
