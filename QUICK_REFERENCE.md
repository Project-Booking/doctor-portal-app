# Quick Reference Guide - DoctorPortalApp

## 🎯 Quick Navigation

### Main Entry Point
```
App.js
  ↓
MainNavigator.js (handles tab switching)
  ↓
AppointmentsScreen / ScheduleScreen / ProfileScreen / SettingsScreen
```

### File Location Quick Links

| Feature | Location | Main File |
|---------|----------|-----------|
| Appointments | `src/modules/appointments/` | AppointmentsScreen.js |
| Schedule | `src/modules/schedule/` | ScheduleScreen.js |
| Profile | `src/modules/profile/` | ProfileScreen.js |
| Settings | `src/modules/settings/` | SettingsScreen.js |
| Navigation | `src/navigation/` | MainNavigator.js |
| Shared UI | `src/shared-components/` | BottomTabBar.js |

---

## 📁 Module Structure Template

Each module follows this structure:
```
src/modules/module-name/
├── index.js                    # Exports all components
├── components/
│   ├── Component1.js
│   ├── Component2.js
│   └── Component3.js
└── hooks/                      # (Optional) Custom hooks
```

---

## 🔧 How to Find Something

### Find a Component
1. Know what it does? Search in `src/modules/feature/components/`
2. Component name is descriptive: `AppointmentHeader`, `ShiftCard`, etc.
3. Example: Looking for appointment search? → `AppointmentHeader.js`

### Find a Screen
All screens are in `src/screens/` named as `*Screen.js`
- AppointmentsScreen.js
- ScheduleScreen.js
- ProfileScreen.js
- SettingsScreen.js

### Find Navigation
Navigation handled in `src/navigation/MainNavigator.js`

---

## ➕ How to Add a New Feature

### Step 1: Create Module Folder
```bash
mkdir -p src/modules/feature-name/components
```

### Step 2: Create Component Files
```javascript
// src/modules/feature-name/components/FeatureHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FeatureHeader() {
  return (
    <View style={styles.container}>
      <Text>Feature Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### Step 3: Create Index File
```javascript
// src/modules/feature-name/index.js
export { default as FeatureHeader } from './components/FeatureHeader';
export { default as FeatureContent } from './components/FeatureContent';
```

### Step 4: Create Screen File
```javascript
// src/screens/FeatureScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { FeatureHeader, FeatureContent } from '../modules/feature-name';

export default function FeatureScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FeatureHeader />
        <FeatureContent />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
```

### Step 5: Update Navigation
Edit `src/navigation/MainNavigator.js`:
```javascript
// Add to tabs array in BottomTabBar
const tabs = [
  // ... existing tabs
  { id: 'feature', label: 'Feature', icon: '🎉' },
];

// Add case in renderScreen()
case 'feature':
  return <FeatureScreen />;
```

---

## 🚀 Common Import Patterns

### From Module
```javascript
// ✓ Good - Clean and organized
import { AppointmentHeader, AppointmentStats } from '../modules/appointments';

// OR
import AppointmentHeader from '../modules/appointments/components/AppointmentHeader';
```

### Avoid
```javascript
// ✗ Bad - Ambiguous
import Header from '../modules/appointments/components/Header';
```

---

## 🎨 Styling Conventions

### Color Palette
- Primary Purple: `#7C3AED`
- Primary Brown: `#8B5A3C`
- Light Background: `#F5F1E9`
- Card Background: `#FFFFFF`
- Text Dark: `#333333`
- Text Light: `#999999`

### Common Styles
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
});
```

---

## 🧪 Testing File Locations

Tests follow the same structure:
```
src/modules/appointments/__tests__/
├── AppointmentHeader.test.js
├── AppointmentStats.test.js
└── AppointmentsList.test.js
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview and structure |
| MIGRATION_GUIDE.md | How old folders map to new structure |
| STATUS.md | Project completion status |
| QUICK_REFERENCE.md | This file - quick answers |

---

## ❓ FAQ

### Q: Where should I add a new component?
A: Determine which feature it belongs to, then add it to `src/modules/feature/components/`

### Q: How do I import a component?
A: Use the module's index.js: `import { ComponentName } from '../modules/feature'`

### Q: Where is the main navigation?
A: `src/navigation/MainNavigator.js` handles tab switching between screens

### Q: How do I add a new screen?
A: Create `src/screens/NewScreen.js`, import components, add to MainNavigator

### Q: What about shared components?
A: Put them in `src/shared-components/` and export from index.js

### Q: Where should utilities go?
A: Create `src/utils/utilityName.js` for helper functions

### Q: How do I handle global state?
A: Consider Context API in `src/context/` or Redux setup

---

## 🔗 Module Dependencies

```
AppointmentsScreen
├── AppointmentHeader
├── AppointmentStats
├── AppointmentsList
└── PatientsMetrics

ScheduleScreen
├── ScheduleHeader
├── ShiftList
│   └── ShiftCard
└── ScheduleEditPanel

ProfileScreen
├── ProfileHeader
├── ProfileStats
└── ProfileBasicInfo

SettingsScreen
├── SettingsHeader
├── SettingsTabs
├── SettingsProfilePanel
└── SettingsBookingPanel

MainNavigator
└── BottomTabBar
```

---

## 🛠️ Development Workflow

### 1. Branch for Feature
```bash
git checkout -b feature/appointments-filter
```

### 2. Create/Modify Component
Edit component in `src/modules/appointments/components/`

### 3. Import in Screen
Update `src/screens/AppointmentsScreen.js`

### 4. Test Navigation
Ensure tab switching works in MainNavigator

### 5. Commit Changes
```bash
git add src/
git commit -m "feat: add appointment filter"
```

---

## 🐛 Debugging Tips

### Component Not Showing
1. Check import path is correct
2. Verify component is exported from module's index.js
3. Check if screen is in MainNavigator

### Navigation Not Working
1. Verify screen case in MainNavigator
2. Check tab ID matches in BottomTabBar
3. Ensure setActiveTab is called correctly

### Styling Issues
1. Check StyleSheet is properly defined
2. Verify color values are correct
3. Check padding/margin values

### Import Errors
1. Verify file exists in correct location
2. Check filename matches exactly
3. Verify relative path is correct

---

## 📞 Support

For issues or questions:
1. Check README.md for overview
2. Check MIGRATION_GUIDE.md for old→new mapping
3. Check STATUS.md for completion status
4. Check relevant module's index.js for available exports

---

**Last Updated:** 2024
**Version:** 1.0.0
