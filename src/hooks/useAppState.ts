/**
 * Brain Root - useAppState Hook
 * Manages app state with AsyncStorage persistence
 */
import { useState, useEffect, useCallback } from 'react';
import { AppState as AppStateType, Task } from '../types';
import {
  loadState,
  saveState,
  markTaskDone,
  undoTask,
  getTodayCompletions,
  getStreak,
  addCustomTask,
  deleteTask,
  updateSocialUsage,
  updateSettings,
} from '../utils/storage';

export const useAppState = () => {
  const [state, setState] = useState<AppStateType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load state on mount
  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      setLoading(false);
    });
  }, []);

  // Get today's completed task IDs
  const todayCompleted = state ? getTodayCompletions(state) : [];

  // Check if a task is done today
  const isTaskDone = useCallback(
    (taskId: string) => todayCompleted.includes(taskId),
    [todayCompleted]
  );

  // Get streak for a task
  const getTaskStreak = useCallback(
    (taskId: string) => (state ? getStreak(state, taskId) : 0),
    [state]
  );

  // Toggle task completion
  const toggleTask = useCallback(
    async (taskId: string) => {
      if (!state) return;
      if (isTaskDone(taskId)) {
        const newState = await undoTask(state, taskId);
        setState(newState);
      } else {
        const newState = await markTaskDone(state, taskId);
        setState(newState);
      }
    },
    [state, isTaskDone]
  );

  // Add a custom task
  const addTask = useCallback(
    async (task: Task) => {
      if (!state) return;
      const newState = await addCustomTask(state, task);
      setState(newState);
    },
    [state]
  );

  // Delete a task
  const removeTask = useCallback(
    async (taskId: string) => {
      if (!state) return;
      const newState = await deleteTask(state, taskId);
      setState(newState);
    },
    [state]
  );

  // Update social media usage
  const setSocialUsage = useCallback(
    async (appName: string, minutes: number) => {
      if (!state) return;
      const newState = await updateSocialUsage(state, appName, minutes);
      setState(newState);
    },
    [state]
  );

  // Update settings
  const setSettings = useCallback(
    async (settings: Partial<AppStateType['settings']>) => {
      if (!state) return;
      const newState = await updateSettings(state, settings);
      setState(newState);
    },
    [state]
  );

  // Calculate today's progress
  const todayProgress = state
    ? {
        total: state.tasks.length,
        completed: todayCompleted.length,
        percentage:
          state.tasks.length > 0
            ? Math.round((todayCompleted.length / state.tasks.length) * 100)
            : 0,
      }
    : { total: 0, completed: 0, percentage: 0 };

  // Get total streak (longest current streak)
  const totalStreak = state
    ? Math.max(...state.streaks.map((s) => s.current), 0)
    : 0;

  return {
    state,
    loading,
    todayCompleted,
    todayProgress,
    totalStreak,
    isTaskDone,
    getTaskStreak,
    toggleTask,
    addTask,
    removeTask,
    setSocialUsage,
    setSettings,
  };
};
