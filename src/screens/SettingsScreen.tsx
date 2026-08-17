/**
 * Brain Root - Settings Screen
 * Customize tasks, limits, and reminders
 */
import React from 'react';
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { useAppState } from '../hooks/useAppState';

export const SettingsScreen: React.FC = () => {
  const { state, setSettings } = useAppState();

  const settings = state?.settings;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Social Media Limits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Social Media Limits</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>📸 Instagram</Text>
            <Text style={styles.settingValue}>{settings?.socialLimits.instagram || 60} min/day</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>✈️ Telegram</Text>
            <Text style={styles.settingValue}>{settings?.socialLimits.telegram || 45} min/day</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>🐦 Twitter/X</Text>
            <Text style={styles.settingValue}>{settings?.socialLimits.twitter || 30} min/day</Text>
          </View>
        </View>

        {/* Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Reminders</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>☀️ Morning</Text>
              <Text style={styles.settingTime}>{settings?.reminders.morning.time || '07:00'}</Text>
            </View>
            <Switch
              value={settings?.reminders.morning.enabled ?? true}
              onValueChange={(v) =>
                setSettings({
                  reminders: {
                    ...settings!.reminders,
                    morning: { ...settings!.reminders.morning, enabled: v },
                  },
                })
              }
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>🌤 Noon</Text>
              <Text style={styles.settingTime}>{settings?.reminders.noon.time || '12:30'}</Text>
            </View>
            <Switch
              value={settings?.reminders.noon.enabled ?? true}
              onValueChange={(v) =>
                setSettings({
                  reminders: {
                    ...settings!.reminders,
                    noon: { ...settings!.reminders.noon, enabled: v },
                  },
                })
              }
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>🌙 Evening</Text>
              <Text style={styles.settingTime}>{settings?.reminders.evening.time || '19:00'}</Text>
            </View>
            <Switch
              value={settings?.reminders.evening.enabled ?? true}
              onValueChange={(v) =>
                setSettings({
                  reminders: {
                    ...settings!.reminders,
                    evening: { ...settings!.reminders.evening, enabled: v },
                  },
                })
              }
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>🌑 Night</Text>
              <Text style={styles.settingTime}>{settings?.reminders.night.time || '22:30'}</Text>
            </View>
            <Switch
              value={settings?.reminders.night.enabled ?? true}
              onValueChange={(v) =>
                setSettings({
                  reminders: {
                    ...settings!.reminders,
                    night: { ...settings!.reminders.night, enabled: v },
                  },
                })
              }
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Appearance</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingValue}>Emerald Night 💎</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Made with</Text>
            <Text style={styles.settingValue}>💎 by Brain Root</Text>
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
  section: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  settingTime: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
