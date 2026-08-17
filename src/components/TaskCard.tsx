/**
 * Brain Root - Task Card Component
 * Individual task with checkbox and streak
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  isDone: boolean;
  streak: number;
  onToggle: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  streak,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isDone && styles.containerDone]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      {/* Left accent border */}
      <View style={[styles.accent, isDone && styles.accentDone]} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.emoji}>{task.emoji}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.name, isDone && styles.nameDone]}>
            {task.name}
          </Text>
          <Text style={styles.tip}>{task.healthTip}</Text>
        </View>
      </View>

      {/* Right side */}
      <View style={styles.right}>
        {/* Streak badge */}
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {streak}</Text>
          </View>
        )}

        {/* Checkbox */}
        <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
          {isDone && (
            <Ionicons name="checkmark" size={16} color={Colors.background} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  containerDone: {
    opacity: 0.7,
  },
  accent: {
    width: 4,
    height: '100%',
    backgroundColor: Colors.primary,
  },
  accentDone: {
    backgroundColor: Colors.success,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  nameDone: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  tip: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 8,
  },
  streakBadge: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});
