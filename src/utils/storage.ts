/**
 * Brain Root - AsyncStorage Helper
 * Simple JSON storage on device
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Task, TaskCompletion, SocialUsage, Streak, Settings } from '../types';
import { PRESET_TASKS, DEFAULT_SETTINGS } from '../data/presets';

const STORAGE_KEY = '@brain_root_data';

// Get today's date as YYYY-MM-DD
export const getToday = (): string => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// Default state
const getDefaultState = (): AppState => ({
  tasks: PRESET_TASKS,
  completions: [],
  socialUsage: [],
  streaks: [],
  settings: DEFAULT_SETTINGS,
});

// Load state from storage
export const loadState = async (): Promise<AppState> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const state = JSON.parse(json) as AppState;
      // Ensure tasks exist
      if (!state.tasks || state.tasks.length === 0) {
        state.tasks = PRESET_TASKS;
      }
      if (!state.settings) {
        state.settings = DEFAULT_SETTINGS;
      }
      return state;
    }
    return getDefaultState();
  } catch (e) {
    console.error('Failed to load state:', e);
    return getDefaultState();
  }
};

// Save state to storage
export const saveState = async (state: AppState): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

// Mark task as done for today
export const markTaskDone = async (
  state: AppState,
  taskId: string
): Promise<AppState> => {
  const today = getToday();
  
  // Check if already done today
  const existing = state.completions.find(
    (c) => c.taskId === taskId && c.date === today
  );
  if (existing) return state;

  const newCompletion: TaskCompletion = {
    taskId,
    date: today,
    completedAt: new Date().toISOString(),
  };

  // Update streak
  const task = state.tasks.find((t) => t.id === taskId);
  let newStreaks = [...state.streaks];
  
  if (task) {
    const streakIndex = newStreaks.findIndex((s) => s.taskId === taskId);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streakIndex >= 0) {
      const streak = newStreaks[streakIndex];
      if (streak.lastCompletedDate === yesterdayStr || streak.lastCompletedDate === today) {
        streak.current += 1;
      } else {
        streak.current = 1;
      }
      streak.best = Math.max(streak.best, streak.current);
      streak.lastCompletedDate = today;
    } else {
      newStreaks.push({
        taskId,
        current: 1,
        best: 1,
        lastCompletedDate: today,
      });
    }
  }

  const newState = {
    ...state,
    completions: [...state.completions, newCompletion],
    streaks: newStreaks,
  };

  await saveState(newState);
  return newState;
};

// Undo task completion for today
export const undoTask = async (
  state: AppState,
  taskId: string
): Promise<AppState> => {
  const today = getToday();
  
  const newState = {
    ...state,
    completions: state.completions.filter(
      (c) => !(c.taskId === taskId && c.date === today)
    ),
  };

  await saveState(newState);
  return newState;
};

// Get today's completions
export const getTodayCompletions = (state: AppState): string[] => {
  const today = getToday();
  return state.completions
    .filter((c) => c.date === today)
    .map((c) => c.taskId);
};

// Get streak for a task
export const getStreak = (state: AppState, taskId: string): number => {
  const streak = state.streaks.find((s) => s.taskId === taskId);
  return streak?.current || 0;
};

// Add custom task
export const addCustomTask = async (
  state: AppState,
  task: Task
): Promise<AppState> => {
  const newState = {
    ...state,
    tasks: [...state.tasks, task],
  };
  await saveState(newState);
  return newState;
};

// Delete task
export const deleteTask = async (
  state: AppState,
  taskId: string
): Promise<AppState> => {
  const newState = {
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
    completions: state.completions.filter((c) => c.taskId !== taskId),
    streaks: state.streaks.filter((s) => s.taskId !== taskId),
  };
  await saveState(newState);
  return newState;
};

// Update social usage
export const updateSocialUsage = async (
  state: AppState,
  appName: string,
  minutes: number
): Promise<AppState> => {
  const today = getToday();
  const existing = state.socialUsage.find(
    (u) => u.appName === appName && u.date === today
  );

  let newUsage;
  if (existing) {
    newUsage = state.socialUsage.map((u) =>
      u.appName === appName && u.date === today
        ? { ...u, durationMinutes: minutes }
        : u
    );
  } else {
    const limits: Record<string, number> = {
      instagram: state.settings.socialLimits.instagram,
      telegram: state.settings.socialLimits.telegram,
      twitter: state.settings.socialLimits.twitter,
    };
    newUsage = [
      ...state.socialUsage,
      {
        appName,
        emoji: appName === 'instagram' ? '📸' : appName === 'telegram' ? '✈️' : '🐦',
        date: today,
        durationMinutes: minutes,
        limitMinutes: limits[appName] || 60,
      },
    ];
  }

  const newState = { ...state, socialUsage: newUsage };
  await saveState(newState);
  return newState;
};

// Update settings
export const updateSettings = async (
  state: AppState,
  settings: Partial<Settings>
): Promise<AppState> => {
  const newState = {
    ...state,
    settings: { ...state.settings, ...settings },
  };
  await saveState(newState);
  return newState;
};
