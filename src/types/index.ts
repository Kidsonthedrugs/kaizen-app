/**
 * Brain Root - Type Definitions
 */

export interface Task {
  id: string;
  name: string;
  emoji: string;
  category: 'morning' | 'noon' | 'evening' | 'night';
  healthTip: string;
  keywords: string[];
  interval: number; // days
}

export interface TaskCompletion {
  taskId: string;
  date: string; // YYYY-MM-DD
  completedAt: string; // ISO timestamp
}

export interface SocialUsage {
  appName: string;
  emoji: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  limitMinutes: number;
}

export interface Streak {
  taskId: string;
  current: number;
  best: number;
  lastCompletedDate: string;
}

export interface AppState {
  tasks: Task[];
  completions: TaskCompletion[];
  socialUsage: SocialUsage[];
  streaks: Streak[];
  settings: Settings;
}

export interface Settings {
  socialLimits: {
    instagram: number;
    telegram: number;
    twitter: number;
  };
  reminders: {
    morning: { time: string; enabled: boolean };
    noon: { time: string; enabled: boolean };
    evening: { time: string; enabled: boolean };
    night: { time: string; enabled: boolean };
  };
}

export type TabName = 'home' | 'tasks' | 'social' | 'settings';
