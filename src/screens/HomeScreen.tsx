/**
 * Brain Root - Home Dashboard Screen
 * Main screen with progress, streaks, and quick actions
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../theme/colors';
import { ProgressRing } from '../components/ProgressRing';
import { TaskCard } from '../components/TaskCard';
import { SocialCard } from '../components/SocialCard';
import { useAppState } from '../hooks/useAppState';
import { SOCIAL_APPS } from '../data/presets';

export const HomeScreen: React.FC = () => {
  const {
    state,
    todayProgress,
    totalStreak,
    isTaskDone,
    getTaskStreak,
    toggleTask,
  } = useAppState();

  // Get morning tasks for quick view
  const morningTasks = state?.tasks.filter((t) => t.category === 'morning').slice(0, 4) || [];

  // Get today's social usage
  const today = new Date().toISOString().split('T')[0];
  const socialUsage = state?.socialUsage.filter((u) => u.date === today) || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🧠 Brain Root</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Progress Ring */}
        <View style={styles.progressSection}>
          <ProgressRing percentage={todayProgress.percentage} />
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>
              🔥 {totalStreak} day streak
            </Text>
          </View>
        </View>

        {/* Quick Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Tasks</Text>
          {morningTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isDone={isTaskDone(task.id)}
              streak={getTaskStreak(task.id)}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.socialScroll}
          >
            {SOCIAL_APPS.map((app) => {
              const usage = socialUsage.find((u) => u.appName === app.id);
              return (
                <SocialCard
                  key={app.id}
                  emoji={app.emoji}
                  name={app.name}
                  used={usage?.durationMinutes || 0}
                  limit={state?.settings.socialLimits[app.id as keyof typeof state.settings.socialLimits] || 60}
                  color={app.color}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Progress</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{todayProgress.completed}</Text>
              <Text style={styles.summaryLabel}>Done</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{todayProgress.total - todayProgress.completed}</Text>
              <Text style={styles.summaryLabel}>Remaining</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {todayProgress.percentage}%
              </Text>
              <Text style={styles.summaryLabel}>Complete</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  streakBadge: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  socialScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.surfaceBorder,
  },
});
