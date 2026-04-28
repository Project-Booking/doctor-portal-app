# Migration Guide: Old Structure → Unified Structure

## Overview
This document maps all 15 original folders to their new locations in the unified DoctorPortalApp structure.

## Migration Mapping

### 1. DoctorAppointmentDashboard
**New Location:** `src/modules/appointments/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| App.js | (Part of AppointmentsScreen.js) | Screen wrapper logic |
| components/Header.js | components/AppointmentHeader.js | Renamed for clarity |
| components/StatsCards.js | components/AppointmentStats.js | Renamed for clarity |
| components/AppointmentsTable.js | components/AppointmentsList.js | Renamed for clarity |
| components/PatientsResult.js | components/PatientsMetrics.js | Renamed for clarity |

**New Screen File:** `src/screens/AppointmentsScreen.js`

---

### 2. DoctorScheduleManagement
**New Location:** `src/modules/schedule/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| App.js | (Part of ScheduleScreen.js) | Screen wrapper logic |
| components/Header.js | components/ScheduleHeader.js | Renamed for clarity |
| components/ShiftList.js | components/ShiftList.js | No change |
| components/ShiftCard.js | components/ShiftCard.js | No change |
| components/EditPanel.js | components/ScheduleEditPanel.js | Renamed for clarity |
| components/BottomNav.js | (Moved to BottomTabBar.js) | Unified navigation |

**New Screen File:** `src/screens/ScheduleScreen.js`

---

### 3. DoctorScheduleEditSlot
**New Location:** `src/modules/schedule/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| components/EditSlotModal.js | (Merged into ScheduleEditPanel.js) | Combined functionality |

---

### 4. DoctorProfileSettings
**New Location:** `src/modules/profile/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| App.js | (Part of ProfileScreen.js) | Screen wrapper logic |
| components/ProfileSettingsScreen.js | components/ProfileBasicInfo.js | Functionality extracted |

**New Screen File:** `src/screens/ProfileScreen.js`

---

### 5. MobileProfessionalDetails
**New Location:** `src/modules/profile/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| components/ProfessionalDetailsScreen.js | (Merged into ProfileBasicInfo.js) | Combined with profile |

---

### 6. DoctorSettingsPreferences
**New Location:** `src/modules/settings/`

**File Mappings:**
| Old File | New File | Notes |
|----------|----------|-------|
| App.js | (Part of SettingsScreen.js) | Screen wrapper logic |
| components/Header.js | components/SettingsHeader.js | Renamed for clarity |
| components/Tabs.js | components/SettingsTabs.js | Renamed for clarity |
| components/ProfilePanel.js | components/SettingsProfilePanel.js | Renamed for clarity |
| components/BookingPanel.js | components/SettingsBookingPanel.js | Renamed for clarity |
| components/StatsCards.js | (Moved to ProfileStats) | Reused component |

**New Screen File:** `src/screens/SettingsScreen.js`

---

### 7. DoctorSessionBookingManagement
**New Location:** `src/modules/booking/`

**Status:** ⏳ Pending consolidation

**File Location:**
- Original: `DoctorSessionBookingManagement/components/SessionBookingScreen.js`
- Target: `src/modules/booking/components/SessionBookingScreen.js`

---

### 8. MobileBookingPreferences
**New Location:** `src/modules/booking/`

**Status:** ⏳ Pending consolidation

**File Location:**
- Original: `MobileBookingPreferences/components/BookingPreferencesScreen.js`
- Target: `src/modules/booking/components/BookingPreferencesScreen.js`

---

### 9. DoctorSiteManagementCertifications
**New Location:** `src/modules/site-management/`

**Status:** ⏳ Pending consolidation

**File Location:**
- Original: `DoctorSiteManagementCertifications/components/SiteManagementScreen.js`
- Target: `src/modules/site-management/components/SiteManagementCertifications.js`

---

### 10. DoctorSiteManagementFull
**New Location:** `src/modules/site-management/`

**Status:** ⏳ Pending consolidation

**File Location:**
- Original: `DoctorSiteManagementFull/components/SiteManagementScreen.js`
- Target: `src/modules/site-management/components/SiteManagementFull.js`

---

### 11. SiteManagementEducation
**New Location:** `src/modules/site-management/`

**Status:** ⏳ Pending consolidation

**File Location:**
- Original: `SiteManagementEducation/components/EducationScreen.js`
- Target: `src/modules/site-management/components/SiteManagementEducation.js`

---

### 12. PremiumWellnessDashboard
**New Location:** `src/modules/wellness/`

**Status:** ⏳ Pending consolidation

**File Components:**
- Banner.js
- BottomNavigation.js
- NotificationSettings.js
- ProfileForm.js
- ThemeSettings.js

---

### 13. RefinedPremiumWellnessSettings
**New Location:** `src/modules/wellness/`

**Status:** ⏳ Pending consolidation

**File Components:**
- Banner.js
- BottomNav.js
- NotificationCard.js
- ProfileCard.js
- ThemeCard.js

---

### 14. MobileScheduleDashboard
**New Location:** `src/modules/schedule/` (or separate mobile module)

**Status:** ⏳ Pending consolidation

**File Components:**
- Header.js → ScheduleHeader.js (or MobileScheduleHeader.js)
- ShiftList.js
- ShiftCard.js
- BottomNav.js

---

### 15. DarkModeDoctorDashboard
**New Location:** `src/modules/appointments/` or theme-related utilities

**Status:** ⏳ Pending consolidation

**Note:** This appears to be theme/styling related. Should be converted to a theme provider or styling system rather than a separate module.

---

## Naming Convention Changes

### Component Names

| Old Pattern | New Pattern | Example |
|------------|------------|---------|
| Generic names | Descriptive names | `Header.js` → `AppointmentHeader.js` |
| Screen.js | ModuleScreen.js | `DashboardScreen` → `AppointmentsScreen` |
| Panel.js | ModulePanelName.js | `EditPanel.js` → `ScheduleEditPanel.js` |

### Benefits of New Naming
✅ No ambiguity when importing components
✅ Easy to search and find components
✅ Self-documenting code
✅ Better IDE autocomplete

### Import Path Changes

**Before:**
```javascript
import Header from '../DoctorAppointmentDashboard/components/Header';
import EditPanel from '../DoctorScheduleManagement/components/EditPanel';
```

**After:**
```javascript
import { AppointmentHeader } from '../modules/appointments';
import { ScheduleEditPanel } from '../modules/schedule';
```

---

## How to Complete Migration

### Step 1: Identify Remaining Files
- [ ] Booking module components
- [ ] Site Management module components
- [ ] Wellness module components
- [ ] Mobile Schedule module components
- [ ] Dark Mode styling

### Step 2: Create Module Folders
- [ ] Create folder structure for each module
- [ ] Create components subdirectories

### Step 3: Copy and Rename
- [ ] Copy component files to new locations
- [ ] Rename files using new conventions
- [ ] Update import statements

### Step 4: Create Screen Files
- [ ] Create BookingScreen.js
- [ ] Create SiteManagementScreen.js
- [ ] Create WellnessScreen.js

### Step 5: Update Navigation
- [ ] Add new screens to MainNavigator.js
- [ ] Update BottomTabBar with new tabs if needed

### Step 6: Testing
- [ ] Test all navigation
- [ ] Verify component functionality
- [ ] Check styling and layout

---

## Troubleshooting

### Import Errors
**Problem:** Cannot find module after migration
**Solution:** Double-check file path and ensure file exists in new location

### Component Not Rendering
**Problem:** Component appears but doesn't display correctly
**Solution:** Verify that all imported dependencies are available

### Styling Issues
**Problem:** Styles look different in new location
**Solution:** Check that color/theme values haven't changed

---

## Benefits of Complete Migration

✅ **Single Project** - No more 15 separate applications
✅ **Unified Navigation** - Tab-based navigation throughout
✅ **Better Organization** - Features grouped logically
✅ **Easier Maintenance** - Changes in one place
✅ **Code Reuse** - Shared components centralized
✅ **Faster Development** - Know where everything is
✅ **Better Collaboration** - Team understands structure

---

## Next Steps

1. Review this migration guide
2. Implement remaining module consolidations
3. Test all functionality
4. Update imports across the application
5. Remove old folder structure
6. Document any custom modifications
