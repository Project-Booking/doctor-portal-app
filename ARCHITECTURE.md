# Architecture Overview - DoctorPortalApp

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.js                               │
│                    (Main Entry Point)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  MainNavigator.js                            │
│              (Manages Tab Switching)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Active Tab → Renders Corresponding Screen             │ │
│  └────────────────────────────────────────────────────────┘ │
└────┬────────────┬──────────────┬───────────────┬────────────┘
     │            │              │               │
     ↓            ↓              ↓               ↓
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│Appts     │  │Schedule  │  │Profile   │  │Settings  │
│Screen    │  │Screen    │  │Screen    │  │Screen    │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │             │
     ↓             ↓             ↓             ↓
  ┌─────┐       ┌─────┐       ┌─────┐     ┌─────────┐
  │Appts│       │Sche.│       │Prof.│     │Settings │
  │Mod. │       │Mod. │       │Mod. │     │Module   │
  └──┬──┘       └──┬──┘       └──┬──┘     └─────┬───┘
     │            │             │              │
     ├─Hdr        ├─Hdr         ├─Hdr          ├─Hdr
     ├─Stats      ├─ShiftList   ├─Stats        ├─Tabs
     ├─List       ├─EditPanel   └─BasicInfo    ├─ProfPanel
     └─Metrics    └─ShiftCard                  └─BookPanel
                         │
                         ↓
                  ┌──────────────────┐
                  │  Shared Comps    │
                  │  BottomTabBar    │
                  └──────────────────┘
```

---

## 📦 Module Hierarchy

```
DoctorPortalApp (Root)
│
├── 🔵 Appointments Module
│   ├── AppointmentHeader (Search, Profile)
│   ├── AppointmentStats (Summary Cards)
│   ├── AppointmentsList (Table View)
│   └── PatientsMetrics (Visual Stats)
│
├── 🟡 Schedule Module
│   ├── ScheduleHeader (Title)
│   ├── ShiftList (Container)
│   │   └── ShiftCard (Individual Shift)
│   └── ScheduleEditPanel (Editing)
│
├── 🟣 Profile Module
│   ├── ProfileHeader (Title + Save)
│   ├── ProfileStats (Stats Grid)
│   └── ProfileBasicInfo (Form)
│
├── 🟢 Settings Module
│   ├── SettingsHeader (Title)
│   ├── SettingsTabs (Profile/Booking)
│   ├── SettingsProfilePanel (Profile Settings)
│   └── SettingsBookingPanel (Booking Settings)
│
├── 📍 Navigation
│   └── MainNavigator (Tab Management)
│
└── 🎨 Shared Components
    └── BottomTabBar (Navigation Tabs)
```

---

## 🔄 Data Flow Diagram

```
User Interaction (Tab Press)
           │
           ↓
BottomTabBar.js
  setActiveTab(tabId)
           │
           ↓
MainNavigator.js
  activeTab state updated
           │
           ↓
Conditional Rendering
  renderScreen()
           │
    ┌──────┼──────┬──────┬──────┐
    │      │      │      │      │
    ↓      ↓      ↓      ↓      ↓
   Appts  Sche. Prof.  Sett.  [Future]
  Screen Screen Screen Screen  Screens
    │      │      │      │
    └──────┴──────┴──────┴─────────────→ Display
```

---

## 🎯 Component Flow - Appointments Example

```
AppointmentsScreen
│
├─ AppointmentHeader
│  └─ TextInput + Profile Avatar
│
├─ AppointmentStats
│  ├─ Purple Card (Total Appts)
│  └─ White Card (Cancelled)
│
├─ AppointmentsList
│  └─ FlatList
│      └─ Row Items (Name, Time)
│
└─ PatientsMetrics
   └─ Circle with Patient Count
```

---

## 📱 Screen Layout

```
┌─────────────────────────────────────────┐
│         Status Bar                      │
├─────────────────────────────────────────┤
│                                         │
│         Screen Content                  │
│         (Tab-based)                     │
│                                         │
│         • Header                        │
│         • Stats/Info                    │
│         • List/Form                     │
│         • Additional Content            │
│                                         │
├─────────────────────────────────────────┤
│  📅    🕐    👤    ⚙️                    │
│ Appts  Sche. Prof. Sett.               │
│                                         │
│       ← Bottom Tab Bar →                │
└─────────────────────────────────────────┘
```

---

## 🔌 File Dependencies

### AppointmentsScreen.js Depends On:
- React, React Native (Core)
- AppointmentHeader.js
- AppointmentStats.js
- AppointmentsList.js
- PatientsMetrics.js

### MainNavigator.js Depends On:
- React, React Native (Core)
- AppointmentsScreen.js
- ScheduleScreen.js
- ProfileScreen.js
- SettingsScreen.js
- BottomTabBar.js

### BottomTabBar.js Depends On:
- React, React Native (Core)

---

## 🗂️ Import Hierarchy

```
Level 0 (App.js)
└── MainNavigator.js (Level 1)
    ├── AppointmentsScreen.js
    │   ├── AppointmentHeader (Level 2)
    │   ├── AppointmentStats (Level 2)
    │   ├── AppointmentsList (Level 2)
    │   └── PatientsMetrics (Level 2)
    │
    ├── ScheduleScreen.js
    │   ├── ScheduleHeader (Level 2)
    │   ├── ShiftList (Level 2)
    │   │   └── ShiftCard (Level 3)
    │   └── ScheduleEditPanel (Level 2)
    │
    ├── ProfileScreen.js
    │   ├── ProfileHeader (Level 2)
    │   ├── ProfileStats (Level 2)
    │   └── ProfileBasicInfo (Level 2)
    │
    ├── SettingsScreen.js
    │   ├── SettingsHeader (Level 2)
    │   ├── SettingsTabs (Level 2)
    │   ├── SettingsProfilePanel (Level 2)
    │   └── SettingsBookingPanel (Level 2)
    │
    └── BottomTabBar.js (Level 1)
```

---

## 🔐 Data Flow - State Management (Current)

```
App Component
│
├── (No State here - Stateless)
│
└── MainNavigator
    │
    ├── State: activeTab
    │   └── Updated by: BottomTabBar.setActiveTab()
    │
    ├── AppointmentsScreen
    │   └── No internal state (Future: Redux/Context)
    │
    ├── ScheduleScreen
    │   └── Local state: active, times, etc.
    │
    ├── ProfileScreen
    │   └── No internal state (Future: Form state mgmt)
    │
    ├── SettingsScreen
    │   └── Local state: activeTab
    │
    └── BottomTabBar
        └── Calls: setActiveTab(tabId)
```

---

## 🚀 Scalability Architecture

```
Current Structure (40% Complete)
↓
Add Remaining Modules
├── Booking Module
├── Site Management Module
├── Wellness Module
└── Mobile Variants
↓
Add State Management Layer
├── Redux Store
│   ├── appointmentSlice
│   ├── scheduleSlice
│   ├── profileSlice
│   └── settingsSlice
└── OR Context API
    ├── AppointmentContext
    ├── ScheduleContext
    └── etc.
↓
Add Services Layer
├── API Services
├── Auth Services
└── Data Persistence
↓
Production Ready App
```

---

## 🔄 Navigation State Machine

```
        ┌─────────────────┐
        │  Initial State  │
        │  (Appointments) │
        └────────┬────────┘
                 │
        ┌────────↓────────┐
        │                 │
    [Appointments]    [Schedule]
        │                 │
        │                 │
    [Profile]     ┌───────↓────────┐
        │         │                 │
        └────────→[Settings]    [Future Screens]
```

---

## 📊 Component Complexity

### Simple Components (Presentational)
- ✓ AppointmentHeader
- ✓ AppointmentStats
- ✓ ShiftCard
- ✓ ProfileHeader
- ✓ SettingsHeader

### Medium Components (With Logic)
- ✓ AppointmentsList (FlatList)
- ✓ SettingsTabs (Conditional render)
- ✓ ScheduleEditPanel (Form + Switch)

### Complex Components (Containers)
- ✓ MainNavigator (State + Multiple screens)
- ✓ ProfileScreen (Combined multiple modules)
- ✓ SettingsScreen (Tab switching + conditionals)

---

## 🎨 Design System

### Color Palette
```
Primary Colors:
├── Purple: #7C3AED (Highlights, CTAs)
├── Brown: #8B5A3C (Secondary actions)
└── Gray: #999999 (Text, borders)

Background Colors:
├── White: #FFFFFF (Cards, containers)
├── Light Beige: #F5F1E9 (Screen backgrounds)
├── Light Purple: #F3F0FF (Accent backgrounds)
└── Very Light: #FAF7F2 (Profile screen)

State Colors:
├── Success: #10B981 (Green)
├── Error: #EF4444 (Red)
├── Warning: #F59E0B (Orange)
└── Info: #3B82F6 (Blue)
```

### Typography
```
Headings:
├── H1: fontSize: 26, fontWeight: 'bold'
├── H2: fontSize: 20, fontWeight: 'bold'
├── H3: fontSize: 18, fontWeight: 'bold'
└── H4: fontSize: 16, fontWeight: 'bold'

Body:
├── Large: fontSize: 16, fontWeight: '500'
├── Regular: fontSize: 14, fontWeight: '400'
└── Small: fontSize: 12, fontWeight: '400'
```

### Spacing
```
Standard Spacing: 4px unit
├── xs: 4px
├── sm: 8px
├── md: 12px
├── lg: 16px
├── xl: 20px
└── xxl: 24px
```

---

## ✅ Current Capabilities

- ✓ Tab-based navigation between 4 screens
- ✓ Appointment viewing and management UI
- ✓ Schedule shift editing
- ✓ Profile information display
- ✓ Settings configuration
- ✓ Responsive design
- ✓ Multiple color schemes support (ready)

---

## ⏳ Future Architecture

```
Enhanced Structure (Post-Consolidation)
│
├─ API Integration Layer
│  └─ Redux Middleware
│
├─ Authentication Layer
│  └─ JWT Token Management
│
├─ Push Notifications
│  └─ Firebase Integration
│
├─ Analytics
│  └─ User Behavior Tracking
│
└─ Offline Support
   └─ Local Data Persistence
```

---

## 📈 Performance Considerations

### Current
- Tab navigation: O(1) - Direct screen switching
- Component rendering: Efficient for given size
- State updates: Local to components

### Optimizations Needed
- [ ] Implement FlatList virtualization
- [ ] Lazy load screens
- [ ] Memoize components
- [ ] Optimize re-renders

---

**Last Updated:** 2024
**Architecture Version:** 1.0
