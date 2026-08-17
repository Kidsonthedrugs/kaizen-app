/**
 * Brain Root - Social Media Tracker Screen
 * Track and limit social media usage
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../theme/colors';
import { useAppState } from '../hooks/useAppState';
import { SOCIAL_APPS } from '../data/presets';

export const SocialScreen: React.FC = () => {
  const { state } = useAppState();
  const today = new Date().toISOString().split('T')[0];

  const socialUsage = state?.socialUsage.filter((u) => u.date === today) || [];

  // Calculate total screen time
  const totalMinutes = socialUsage.reduce((sum, u) => sum + u.durationMinutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Screen Time</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Total Screen Time */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Screen Time</Text>
          <Text style={styles.totalTime}>
            {hours > 0 ? `${hours}h ` : ''}{mins}m
          </Text>
          <Text style={styles.totalSubtext}>today</Text>
        </View>

        {/* App Cards */}
        <View style={styles.appCards}>
          {SOCIAL_APPS.map((app) => {
            const usage = socialUsage.find((u) => u.appName === app.id);
            const used = usage?.durationMinutes || 0;
            const limit = state?.settings.socialLimits[app.id as keyof typeof state.settings.socialLimits] || 60;
            const percentage = Math.min(Math.round((used / limit) * 100), 100);
            const isOver = used > limit;

            // Ring params
            const size = 100;
            const strokeWidth = 8;
            const radius = (size - strokeWidth) / 2;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (percentage / 100) * circumference;

            return (
              <View key={app.id} style={styles.appCard}>
                {/* Progress Ring */}
                <View style={styles.ringContainer}>
                  <Svg width={size} height={size}>
                    <Defs>
                      <LinearGradient id={`grad-${app.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={app.color} />
                        <Stop offset="100%" stopColor={`${app.color}88`} />
                      </LinearGradient>
                    </Defs>

                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke={Colors.surfaceBorder}
                      strokeWidth={strokeWidth}
                      fill="none"
                    />

                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke={isOver ? Colors.error : `url(#grad-${app.id})`}
                      strokeWidth={strokeWidth}
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                  </Svg>

                  <Text style={styles.ringEmoji}>{app.emoji}</Text>
                </View>

                {/* App Info */}
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={[styles.appTime, isOver && styles.appTimeOver]}>
                  {used}/{limit}m
                </Text>

                {/* Status */}
                <View style={[
                  styles.statusPill,
                  isOver && styles.statusPillOver
                ]}>
                  <Text style={[
                    styles.statusText,
                    isOver && styles.statusTextOver
                  ]}>
                    {isOver ? '⚠️ Over limit' : '✅ On track'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Weekly Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Overview</Text>
          <View style={styles.chartBars}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const isToday = i === new Date().getDay() - 1;
              const height = Math.random() * 60 + 20; // Random for demo
              return (
                <View key={day} style={styles.chartBarContainer}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: `${height}%`,
                        backgroundColor: isToday ? Colors.primary : Colors.surfaceLight,
                      },
                    ]}
                  />
                  <Text style={[styles.chartDay, isToday && styles.chartDayToday]}>
                    {day}
                  </Text>
                </View>
              );
            })}
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
  content: {
    paddingBottom: 100,
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
  totalCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  totalTime: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  totalSubtext: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  appCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  appCard: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    width: 110,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  ringContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringEmoji: {
    position: 'absolute',
    fontSize: 28,
  },
  appName: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 12,
    fontWeight: '500',
  },
  appTime: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginTop: 4,
  },
  appTimeOver: {
    color: Colors.error,
  },
  statusPill: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusPillOver: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statusText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statusTextOver: {
    color: Colors.error,
  },
  chartCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    borderRadius: 4,
    minHeight: 8,
  },
  chartDay: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 8,
  },
  chartDayToday: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
