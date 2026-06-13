import { JournalDay, MealItem } from "../types";

// Parse raw food diaries pasted from Everfit or myfitnesspal.
export function parseEverfitTextJournal(text: string): JournalDay[] {
  if (!text || !text.trim()) return [];

  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const daysList: JournalDay[] = [];
  let currentDay: Partial<JournalDay> | null = null;
  let currentMeal: Partial<MealItem> | null = null;

  // Track standard month abbreviations
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Detect high level day header:
    // e.g., "YesterdayFRI", "Jun 11THU", "Jun 10WED", "Jun 9TUE", "Jun 8MON", "Jun 7SUN"
    const isYesterday = line.toLowerCase().startsWith("yesterday");
    const isToday = line.toLowerCase().startsWith("today");
    const isMonthDate = months.some(m => line.startsWith(m));

    if (isYesterday || isToday || isMonthDate) {
      // If we already have a day in progress, save it
      if (currentDay && currentDay.date && currentDay.meals && currentDay.meals.length > 0) {
        finalizeDay(currentDay as JournalDay);
        daysList.push(currentDay as JournalDay);
      }

      let dateStr = line;
      let dayOfWeek = "MON";

      // Parse dateStr & Day of Week.
      // E.g., "YesterdayFRI" -> Date: Yesterday (or deduce relative date, let's keep text literal), Day of Week: FRI
      if (isYesterday) {
        // Today is Jun 12 2026, so yesterday is Jun 11
        dateStr = "Jun 11";
        dayOfWeek = "THU";
      } else if (isToday) {
        dateStr = "Jun 12";
        dayOfWeek = "FRI";
      } else {
        // e.g. "Jun 11THU" -> "Jun 11" & "THU"
        // Let's strip the last 3 chars if they are capital letters representing day
        const match = line.match(/^([A-Za-z]{3}\s+\d+)([A-Z]{3})/);
        if (match) {
          dateStr = match[1];
          dayOfWeek = match[2];
        } else {
          // fallback
          dateStr = line.replace(/[A-Z]{3}$/, "");
          const dowMatch = line.match(/[A-Z]{3}$/);
          if (dowMatch) dayOfWeek = dowMatch[0];
        }
      }

      currentDay = {
        date: dateStr,
        dayOfWeek: dayOfWeek,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        proteinPct: 0,
        carbsPct: 0,
        fatPct: 0,
        meals: [],
        starred: true
      };

      // The line immediately following a day header is often the item count (e.g., "16", "15").
      // Skip it if it's just a raw number.
      if (i + 1 < lines.length && /^\d+$/.test(lines[i + 1])) {
        i++; // skip count line
      }
      i++;
      continue;
    }

    // Detect meal item start: e.g. "04:47 PM" or "11:45 PM"
    const isTime = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)$/i.test(line);
    if (isTime && currentDay) {
      if (currentMeal) {
        // finalize previous meal
        currentDay.meals?.push(currentMeal as MealItem);
      }

      // Start new meal item
      currentMeal = {
        id: `m-parsed-${Math.random().toString(36).substr(2, 9)}`,
        name: "",
        mealType: "snack",
        time: line,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      };

      // Read next properties
      // Under a time line, we expect:
      // Line + 1: Name (e.g. "Chicken Leg")
      // Line + 2: Meal Category (e.g. "snack")
      // Line + 3: Calories (e.g. "237 Cal" or "190 Cal")
      // Line + 4: macro letters or titles (e.g. "P")
      // Line + 5: protein amount (e.g. "31 g")
      // Line + 6: macro letter (e.g. "C")
      // ...
      let offset = 1;
      while (i + offset < lines.length) {
        const subLine = lines[i + offset];

        // If we hit another time line or day line, we stop parsing properties
        const nextIsTime = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)$/i.test(subLine);
        const nextIsYesterday = subLine.toLowerCase().startsWith("yesterday");
        const nextIsToday = subLine.toLowerCase().startsWith("today");
        const nextIsMonthDate = months.some(m => subLine.startsWith(m));

        if (nextIsTime || nextIsYesterday || nextIsToday || nextIsMonthDate) {
          break;
        }

        // Process meal details:
        if (offset === 1) {
          currentMeal.name = subLine;
        } else if (offset === 2) {
          currentMeal.mealType = subLine.toLowerCase();
        } else if (subLine.toLowerCase().includes("cal")) {
          const calVal = parseInt(subLine.replace(/[^\d]/g, ""), 10);
          if (!isNaN(calVal)) {
            currentMeal.calories = calVal;
          }
        } else if (subLine === "P" || subLine === "Protein") {
          // next line should be grams
          const nextVal = lines[i + offset + 1];
          if (nextVal) {
            const val = parseFloat(nextVal.replace(/[^\d.]/g, ""));
            if (!isNaN(val)) currentMeal.protein = val;
          }
        } else if (subLine === "C" || subLine === "Carbs" || subLine === "Carbohydrate") {
          const nextVal = lines[i + offset + 1];
          if (nextVal) {
            const val = parseFloat(nextVal.replace(/[^\d.]/g, ""));
            if (!isNaN(val)) currentMeal.carbs = val;
          }
        } else if (subLine === "F" || subLine === "Fat" || subLine === "Lipids") {
          const nextVal = lines[i + offset + 1];
          if (nextVal) {
            const val = parseFloat(nextVal.replace(/[^\d.]/g, ""));
            if (!isNaN(val)) currentMeal.fat = val;
          }
        }

        offset++;
      }

      i += (offset - 1);
    }

    i++;
  }

  // Push any trailing meal or day
  if (currentDay) {
    if (currentMeal) {
      currentDay.meals?.push(currentMeal as MealItem);
    }
    if (currentDay.date && currentDay.meals && currentDay.meals.length > 0) {
      finalizeDay(currentDay as JournalDay);
      daysList.push(currentDay as JournalDay);
    }
  }

  return daysList;
}

// Finalize total calories and macro calculations of a parsed day.
function finalizeDay(day: JournalDay) {
  let totalCal = 0;
  let totalP = 0;
  let totalC = 0;
  let totalF = 0;

  for (const meal of day.meals) {
    totalCal += meal.calories || 0;
    totalP += meal.protein || 0;
    totalC += meal.carbs || 0;
    totalF += meal.fat || 0;
  }

  day.calories = Math.round(totalCal);
  day.protein = parseFloat(totalP.toFixed(1));
  day.carbs = parseFloat(totalC.toFixed(1));
  day.fat = parseFloat(totalF.toFixed(1));

  // Percentage Calculations
  const proteinKcal = totalP * 4;
  const carbsKcal = totalC * 4;
  const fatKcal = totalF * 9;
  const totalKcalMacro = proteinKcal + carbsKcal + fatKcal;

  if (totalKcalMacro > 0) {
    day.proteinPct = Math.round((proteinKcal / totalKcalMacro) * 100);
    day.carbsPct = Math.round((carbsKcal / totalKcalMacro) * 100);
    day.fatPct = Math.round((fatKcal / totalKcalMacro) * 100);
  } else {
    day.proteinPct = 0;
    day.carbsPct = 0;
    day.fatPct = 0;
  }
}

// General CSV file to JSON parser for physical exports.
export function parseCSVToRawRows(text: string): string[][] {
  const lines = text.split("\n");
  const result: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    // Basic CSV cell extraction respecting quotes
    const row: string[] = [];
    let insideQuote = false;
    let entry = "";

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        row.push(entry.trim());
        entry = "";
      } else {
        entry += char;
      }
    }
    row.push(entry.trim());
    result.push(row);
  }

  return result;
}
