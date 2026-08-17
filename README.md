<div align="center">

# 🧠 Kaizen — 改善

### Continuous Improvement Habit Tracker

[![React Native](https://img.shields.io/badge/React_Native-0.79.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

**改善** = Continuous Improvement

*"The Kaizen philosophy states that the best improvement is one that never stops."*

Kaizen helps you build lasting habits and control your screen time — one small improvement at a time.

</div>

---

## ✨ Features

### 📋 Daily Habit Tracker
- ✅ Track 18+ preset daily tasks (Morning, Noon, Evening, Night)
- 🔥 Streak counter — see how many days you've maintained your habits
- ➕ Add custom tasks with emojis and health tips
- 📊 Progress visualization with emerald-gold gradient rings

### 📱 Social Media Monitor
- 📸 Track Instagram, Telegram, Twitter/X usage
- ⚠️ Smart alerts when approaching daily limits
- 📈 Weekly usage charts
- 🎯 Set custom limits per app

### 🎨 Premium Design
- 💎 **Emerald Night** theme — luxurious dark mode
- ✨ Glass morphism cards with emerald accents
- 🌈 Gold gradient streaks
- 📱 iOS-inspired clean UI

---

## 📸 Screenshots

<div align="center">
<img src="https://v3b.fal.media/files/b/0aa6b878/KxwsyHQalAe8rFwyDl-2M_pfQ6uHUd.png" width="250" alt="Home Screen">
<img src="https://v3b.fal.media/files/b/0aa6b871/24TfPIpbSk1J7Q6yxZXyx_NgSo2fRM.png" width="250" alt="Tasks">
<img src="https://v3b.fal.media/files/b/0aa6b887/kGKaa8c42srFw2rsnR7u2_IXALjd64.png" width="250" alt="Social">
</div>

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/go) app on your phone

### Installation

```bash
# Clone the repository
git clone https://github.com/Kidsonthedrugs/kaizen-app.git

# Navigate to project
cd kaizen-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on Your Phone

1. Install **Expo Go** from App Store / Google Play
2. Run `npx expo start`
3. Scan the QR code with your phone camera

---

## 🎨 Theme: Emerald Night

Kaizen uses a premium dark theme inspired by luxury aesthetics:

| Color | Hex | Usage |
|-------|-----|-------|
| 🖤 Background | `#050F0A` | Deep black-green |
| 💎 Primary | `#10B981` | Emerald green |
| ✨ Secondary | `#D4AF37` | Gold accents |
| 📦 Surface | `#0C1A12` | Cards & containers |
| ✅ Success | `#22C55E` | Completed tasks |
| ⚠️ Warning | `#E8A87C` | Limit alerts |

---

## 📁 Project Structure

```
kaizen-app/
├── App.tsx                 # Entry point
├── src/
│   ├── theme/             # Color definitions
│   ├── types/             # TypeScript interfaces
│   ├── data/              # Preset tasks & defaults
│   ├── hooks/             # State management
│   ├── utils/             # Storage helpers
│   ├── components/        # Reusable UI components
│   │   ├── ProgressRing   # Circular progress
│   │   ├── TaskCard       # Task item
│   │   ├── SocialCard     # Social media card
│   │   └── BottomNav      # Tab navigation
│   └── screens/           # App screens
│       ├── HomeScreen     # Dashboard
│       ├── TasksScreen    # Task list
│       ├── SocialScreen   # Social tracker
│       └── SettingsScreen # Settings
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native | Cross-platform mobile framework |
| Expo | Development platform & build tools |
| TypeScript | Type-safe JavaScript |
| AsyncStorage | Local data persistence |
| React Native SVG | Beautiful circular progress rings |
| Ionicons | Premium icon set |

---

## 📝 Customization

### Adding Custom Tasks

Edit `src/data/presets.ts`:

```typescript
{
  id: 'my_task',
  name: 'My Task',
  emoji: '🎯',
  category: 'morning', // morning | noon | evening | night
  healthTip: 'Why this matters',
  keywords: ['custom', 'task'],
  interval: 1,
}
```

### Changing Theme Colors

Edit `src/theme/colors.ts`:

```typescript
export const Colors = {
  primary: '#10B981',    // Change primary color
  secondary: '#D4AF37',  // Change accent color
  background: '#050F0A', // Change background
  // ... more colors
};
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 💎 Built with passion for continuous improvement

**改善 — One small step at a time**

Star ⭐ this repo if you found it useful!

</div>
