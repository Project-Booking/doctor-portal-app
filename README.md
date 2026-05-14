# 🏥 Doctor Portal App

A modern, production-ready **React Native mobile application** for doctor OPD management — built with Expo Router, TypeScript, and a unified violet design system.

**Repository**: [github.com/Project-Booking/doctor-portal-app](https://github.com/Project-Booking/doctor-portal-app)  
**Platform**: Android & iOS (via Expo Go or native build)  
**Last Updated**: May 2026

---

## ✨ Features

### 📋 Appointments Management
- View all patient appointments with expandable detail cards
- Filter by status: **All / Confirmed / Pending / Completed / Cancelled**
- Real-time search by patient name or visit type
- Inline actions: **Confirm**, **Cancel**, **Mark Completed**
- Patient stats dashboard (counts per status)

### 🏥 OPD Session Booking
- Configure OPD sessions per day of the week
- Token progress bars showing booked vs. available slots
- Enable / disable individual sessions on the fly
- Slide-up edit modal with full session configuration:
  - Session name, start/end time, slot duration, total tokens
  - Online booking toggle, active/inactive toggle

### 🕐 Shift Schedule Management
- Create, edit, and delete doctor shifts
- Day-of-week selector per shift (Mon–Sun)
- Overview stats: total shifts, active, inactive, total tokens
- Active/inactive toggle per shift card

### 👤 Doctor Profile
- Hero cover with avatar, name, specialty, hospital
- Key stats: total patients, years experience, rating, reviews
- Tabbed view: **Info** | **Education** | **Certifications**

### ⚙️ Settings
- **Profile tab**: update personal & professional details
- **Booking tab**: online booking, auto-confirm, SMS reminders, slot duration
- **Notifications tab**: Push, Email, SMS channels + event type toggles

### 🌿 Wellness Hub
- Doctor wellness tips carousel
- Profile information editor
- Notification preferences
- Light / Dark / Auto theme selector

### 🏫 Site Management
- Add / remove professional certifications
- Add / remove education entries

---

## 🗂️ Project Structure

```
doctor-portal-app/
├── app/
│   ├── _layout.tsx                  # Root navigator (Stack)
│   └── (tabs)/
│       ├── _layout.tsx              # Tab navigator (5 tabs)
│       ├── index.tsx                # 🏠 Home Dashboard
│       ├── appointments.tsx         # 📋 Appointments list
│       ├── booking.tsx              # 🏥 OPD Session Booking
│       ├── schedule.tsx             # 🕐 Shift Schedule
│       ├── profile.tsx              # 👤 Doctor Profile
│       ├── settings.tsx             # ⚙️  Settings
│       ├── site.tsx                 # 🏫 Site Management
│       └── wellness.tsx             # 🌿 Wellness Hub
├── components/
│   ├── haptic-tab.tsx               # Tab bar haptic feedback
│   └── ui/
│       ├── icon-symbol.tsx          # SF Symbols ↔ Material Icons
│       └── icon-symbol.ios.tsx      # iOS native SF Symbols
├── constants/
│   └── theme.ts                     # Design system tokens
├── hooks/
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── assets/images/                   # App icons & splash
├── android/                         # Android native project
├── app.json                         # Expo config
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+
- **npm** v9+ or **yarn**
- **Expo Go** app on your phone — [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) · [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Installation

```bash
# Clone the repository
git clone https://github.com/Project-Booking/doctor-portal-app.git
cd doctor-portal-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press:
- `a` → Android emulator
- `i` → iOS simulator (macOS only)
- `w` → Web browser (limited — see note below)

---

## 📜 Scripts

```bash
# Start Metro dev server
npx expo start

# Clear cache and restart
npx expo start --clear

# Run on Android device/emulator
npx expo run:android

# Run on iOS device/simulator
npx expo run:ios

# Lint
npx expo lint
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~54.x | Managed workflow & toolchain |
| `expo-router` | ~3.4 | File-based navigation |
| `react-native` | 0.73.x | Core framework |
| `react-native-safe-area-context` | ~5.6 | Safe area insets |
| `@react-navigation/bottom-tabs` | ^7 | Tab navigation |
| `@expo/vector-icons` | ^14 | Icon library |
| `expo-haptics` | ~12.8 | Tab haptic feedback |
| `expo-font` | ~11.10 | Custom font loading |
| `react-native-reanimated` | ~3.6 | Animations |

---

## 🎨 Design System

All design tokens are centralized in [`constants/theme.ts`](constants/theme.ts):

```ts
PRIMARY        = '#7C3AED'  // Violet 600 — primary brand color
SUCCESS        = '#10B981'  // Green
WARNING        = '#F59E0B'  // Amber
DANGER         = '#EF4444'  // Red
INFO           = '#3B82F6'  // Blue
```

The file exports spacing scale, font size scale, border radii, and shadow presets — making all screens visually consistent.

---

## 📱 Navigation

5 visible bottom tabs:

| Tab | Screen | Description |
|-----|--------|-------------|
| 🏠 Home | `index.tsx` | Dashboard with stats, active session, today's appointments |
| 📋 Appointments | `appointments.tsx` | Full patient appointment list |
| 🏥 Booking *(center)* | `booking.tsx` | OPD session configuration |
| 🕐 Schedule | `schedule.tsx` | Shift management |
| 👤 Profile | `profile.tsx` | Doctor profile & credentials |

Settings, Site Management, and Wellness are accessible via `router.push()` from the relevant screens.

---

## ⚠️ Known Limitations

> **Web bundler**: `react-native-reanimated` v3.6.x has a known incompatibility with the Expo web bundler (`_getAnimationTimestamp` error). This does **not** affect Android or iOS. Use Expo Go on a physical device or an emulator for the best experience.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

## 👥 Organization

| | |
|--|--|
| **GitHub Org** | [Project-Booking](https://github.com/Project-Booking) |
| **Repository** | [doctor-portal-app](https://github.com/Project-Booking/doctor-portal-app) |
| **Stack** | React Native · Expo · TypeScript |
| **Created** | April 2026 |
| **Last Rebuild** | May 2026 |
