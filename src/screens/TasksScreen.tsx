/**
 * Brain Root - Tasks Screen
 * Full task list with category filters
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { TaskCard } from '../components/TaskCard';
import { useAppState } from '../hooks/useAppState';

type Category = 'all' | 'morning' | 'noon' | 'evening' | 'night';

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '📋' },
  { key: 'morning', label: 'Morning', emoji: '☀️' },
  { key: 'noon', label: 'Noon', emoji: '🌤' },
  { key: 'evening', label: 'Evening', emoji: '🌙' },
  { key: 'night', label: 'Night', emoji: '🌑' },
];

export const TasksScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { state, isTaskDone, getTaskStreak, toggleTask } = useAppState();

  const tasks = state?.tasks.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  ) || [];

  const completedCount = tasks.filter((t) => isTaskDone(t.id)).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today's Tasks</Text>
        <Text style={styles.subtitle}>
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabs}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.tab,
              selectedCategory === cat.key && styles.tabActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat.key && styles.tabTextActive,
              ]}
            >
              {cat.emoji} {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: tasks.length > 0
                  ? `${(completedCount / tasks.length) * 100}%`
                  : '0%',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedCount}/{tasks.length} done
        </Text>
      </View>

      {/* Task List */}
      <ScrollView
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDone={isTaskDone(task.id)}
            streak={getTaskStreak(task.id)}
            onToggle={() => toggleTask(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyText}>No tasks in this category</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  tabsScroll: {
    maxHeight: 48,
  },
  tabs: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.background,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    minWidth: 60,
  },
  taskList: {
    flex: 1,
    marginTop: 16,
  },
  taskListContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
