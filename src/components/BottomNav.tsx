/**
 * Brain Root - Bottom Navigation Bar
 * Tab navigation with emerald active state
 */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { TabName } from '../types';

interface BottomNavProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const TABS: { name: TabName; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { name: 'home', icon: 'home', label: 'Home' },
  { name: 'tasks', icon: 'checkmark-circle', label: 'Tasks' },
  { name: 'social', icon: 'time', label: 'Social' },
  { name: 'settings', icon: 'settings', label: 'Settings' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabChange(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline` as keyof typeof Ionicons.glyphMap}
              size={24}
              color={isActive ? Colors.primary : Colors.textMuted}
            />
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    paddingBottom: 34, // Safe area
    paddingTop: 12,
    height: 90,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: -12,
    width: 20,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
