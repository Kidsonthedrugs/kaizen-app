/**
 * Brain Root - Social Media Card
 * Shows usage with mini progress bar
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../theme/colors';

interface SocialCardProps {
  emoji: string;
  name: string;
  used: number;
  limit: number;
  color: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  emoji,
  name,
  used,
  limit,
  color,
}) => {
  const percentage = Math.min(Math.round((used / limit) * 100), 100);
  const isOver = used > limit;
  const isWarning = percentage >= 80 && !isOver;

  const size = 60;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Mini progress ring */}
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} />
            <Stop offset="100%" stopColor={`${color}88`} />
          </LinearGradient>
        </Defs>

        {/* Background */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.surfaceBorder}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isOver ? Colors.error : isWarning ? Colors.warning : `url(#grad-${name})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Emoji inside */}
      <Text style={styles.emoji}>{emoji}</Text>

      {/* Info */}
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.time, isOver && styles.timeOver]}>
        {used}/{limit}m
      </Text>

      {/* Status pill */}
      <View style={[styles.statusPill, isOver && styles.statusPillOver, isWarning && styles.statusPillWarning]}>
        <Text style={[styles.statusText, isOver && styles.statusTextOver, isWarning && styles.statusTextWarning]}>
          {isOver ? '⚠️ Over' : isWarning ? '⚠️ Almost' : '✅ On track'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    width: 120,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  emoji: {
    position: 'absolute',
    top: 24,
    fontSize: 22,
  },
  name: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginTop: 4,
  },
  timeOver: {
    color: Colors.error,
  },
  statusPill: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusPillWarning: {
    backgroundColor: 'rgba(232, 168, 124, 0.2)',
  },
  statusPillOver: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statusText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statusTextWarning: {
    color: Colors.warning,
  },
  statusTextOver: {
    color: Colors.error,
  },
});
