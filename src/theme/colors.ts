/**
 * Brain Root - Emerald Night Theme 💎
 * Premium dark theme with emerald green and gold accents
 */

export const Colors = {
  // Backgrounds
  background: '#050F0A',        // Deep black-green
  surface: '#0C1A12',           // Dark forest cards
  surfaceLight: '#122418',      // Lighter cards
  surfaceBorder: '#1A3326',     // Card borders
  
  // Primary - Emerald
  primary: '#10B981',           // Emerald
  primaryLight: '#34D399',      // Light emerald
  primaryDark: '#059669',       // Dark emerald
  primaryGlow: 'rgba(16, 185, 129, 0.3)', // Glow effect
  
  // Secondary - Gold
  secondary: '#D4AF37',         // Gold
  secondaryLight: '#E8C84A',    // Light gold
  secondaryDark: '#B8960F',     // Dark gold
  
  // Status
  success: '#22C55E',           // Green
  warning: '#E8A87C',           // Rose gold
  error: '#EF4444',             // Red
  
  // Text
  textPrimary: '#F8FAFC',       // Clean white
  textSecondary: '#94A3A0',     // Sage gray
  textMuted: '#5A7068',         // Muted green-gray
  
  // Streak Gradient
  streakStart: '#10B981',       // Emerald
  streakEnd: '#D4AF37',         // Gold
  
  // Social Media Colors
  instagram: '#E1306C',         // Instagram pink
  telegram: '#0088CC',          // Telegram blue
  twitter: '#1DA1F2',           // Twitter blue
  
  // Gradient presets
  gradients: {
    emerald: ['#059669', '#10B981', '#34D399'] as const,
    gold: ['#B8960F', '#D4AF37', '#E8C84A'] as const,
    emeraldGold: ['#10B981', '#D4AF37'] as const,
    aurora: ['#10B981', '#06B6D4'] as const,
  }
};

export type ColorKey = keyof typeof Colors;
