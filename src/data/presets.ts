/**
 * Brain Root - Default Preset Tasks
 * Common tasks that most people choose
 */
import { Task, Settings } from '../types';

export const PRESET_TASKS: Task[] = [
  // ☀️ MORNING
  {
    id: 'brush_morning',
    name: 'Morning Brush',
    emoji: '🪥',
    category: 'morning',
    healthTip: 'Remove overnight plaque. Min 2 min.',
    keywords: ['مسواک', 'brush', 'دندان'],
    interval: 1,
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    emoji: '🥣',
    category: 'morning',
    healthTip: 'Most important meal. Activates brain.',
    keywords: ['صبحانه', 'breakfast', 'غذا'],
    interval: 1,
  },
  {
    id: 'zinc',
    name: 'Zinc',
    emoji: '💊',
    category: 'morning',
    healthTip: 'Boosts immunity and skin.',
    keywords: ['زینک', 'zinc', 'قرص'],
    interval: 1,
  },
  {
    id: 'cold_shower',
    name: 'Cold Shower',
    emoji: '❄️',
    category: 'morning',
    healthTip: '2 min cold. Dopamine boost.',
    keywords: ['آب سرد', 'cold', 'دوش'],
    interval: 1,
  },
  {
    id: 'walking',
    name: 'Walking',
    emoji: '🚶',
    category: 'morning',
    healthTip: '30 min walk. Clears mind.',
    keywords: ['پیاده', 'walking', 'قدم'],
    interval: 1,
  },
  {
    id: 'meditation',
    name: 'Meditation',
    emoji: '🧘',
    category: 'morning',
    healthTip: '10 min. Reduces stress.',
    keywords: ['مراقبه', 'meditation', 'آرامش'],
    interval: 1,
  },

  // 🌤 NOON
  {
    id: 'lunch',
    name: 'Lunch',
    emoji: '🍽',
    category: 'noon',
    healthTip: 'Protein + complex carbs.',
    keywords: ['ناهار', 'lunch', 'غذا'],
    interval: 1,
  },
  {
    id: 'omega3',
    name: 'Omega 3',
    emoji: '🐟',
    category: 'noon',
    healthTip: 'Natural anti-inflammatory.',
    keywords: ['امگا', 'omega', 'قرص'],
    interval: 1,
  },
  {
    id: 'deep_work',
    name: 'Deep Work',
    emoji: '⚡',
    category: 'noon',
    healthTip: '2h focused work. No distractions.',
    keywords: ['عمیق', 'deep', 'تمرکز'],
    interval: 1,
  },
  {
    id: 'hydration',
    name: 'Drink Water',
    emoji: '💧',
    category: 'noon',
    healthTip: '8 glasses daily. Stay hydrated.',
    keywords: ['آب', 'water', 'نوشیدن'],
    interval: 1,
  },

  // 🌙 EVENING
  {
    id: 'dinner',
    name: 'Dinner',
    emoji: '🍽',
    category: 'evening',
    healthTip: 'Light meal, 2h before sleep.',
    keywords: ['شام', 'dinner', 'غذا'],
    interval: 1,
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    emoji: '💎',
    category: 'evening',
    healthTip: 'Better sleep, less anxiety.',
    keywords: ['منیزیم', 'magnesium', 'قرص'],
    interval: 1,
  },
  {
    id: 'coding',
    name: 'Coding',
    emoji: '💻',
    category: 'evening',
    healthTip: 'Practice daily. Skills compound.',
    keywords: ['کد', 'coding', 'برنامه'],
    interval: 1,
  },
  {
    id: 'ai_work',
    name: 'AI Work',
    emoji: '🤖',
    category: 'evening',
    healthTip: 'Explore and build. AI is the future.',
    keywords: ['ai', 'هوش مصنوعی'],
    interval: 1,
  },
  {
    id: 'reading',
    name: 'Read Book',
    emoji: '📚',
    category: 'evening',
    healthTip: '30 min reading. Knowledge compounds.',
    keywords: ['کتاب', 'book', 'مطالعه'],
    interval: 1,
  },

  // 🌑 NIGHT
  {
    id: 'brush_night',
    name: 'Night Brush',
    emoji: '🪥',
    category: 'night',
    healthTip: 'Most important brush. Don\'t forget floss!',
    keywords: ['مسواک', 'brush', 'دندان'],
    interval: 1,
  },
  {
    id: 'journal',
    name: 'Journal',
    emoji: '📓',
    category: 'night',
    healthTip: 'Write thoughts. Clarity from writing.',
    keywords: ['ژورنال', 'journal', 'نوشتن'],
    interval: 1,
  },
  {
    id: 'sleep',
    name: 'Sleep Schedule',
    emoji: '😴',
    category: 'night',
    healthTip: 'Phone away! Book or tea 30min before.',
    keywords: ['خواب', 'sleep', 'آماده'],
    interval: 1,
  },
];

export const DEFAULT_SETTINGS: Settings = {
  socialLimits: {
    instagram: 60,
    telegram: 45,
    twitter: 30,
  },
  reminders: {
    morning: { time: '07:00', enabled: true },
    noon: { time: '12:30', enabled: true },
    evening: { time: '19:00', enabled: true },
    night: { time: '22:30', enabled: true },
  },
};

export const SOCIAL_APPS = [
  { id: 'instagram', name: 'Instagram', emoji: '📸', color: '#E1306C' },
  { id: 'telegram', name: 'Telegram', emoji: '✈️', color: '#0088CC' },
  { id: 'twitter', name: 'Twitter/X', emoji: '🐦', color: '#1DA1F2' },
];
