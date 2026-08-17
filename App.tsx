/**
 * Brain Root - Main App
 * Emerald Night Theme 💎
 * Daily Habit Tracker + Social Media Monitor
 */
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Colors } from './src/theme/colors';
import { TabName } from './src/types';
import { BottomNav } from './src/components/BottomNav';
import { HomeScreen } from './src/screens/HomeScreen';
import { TasksScreen } from './src/screens/TasksScreen';
import { SocialScreen } from './src/screens/SocialScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { useAppState } from './src/hooks/useAppState';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const { loading } = useAppState();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Brain Root...</Text>
      </View>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'social':
        return <SocialScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
