import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';

// Icons as emoji for simplicity
const ICONS = {
  dashboard: '📊',
  appointments: '📋',
  schedule: '📅',
  patients: '👥',
  booking: '🎫',
  profile: '👤',
  settings: '⚙️',
  site: '🏢',
  wellness: '💚',
  mobile: '📱',
  analytics: '📈',
  notifications: '🔔',
  reports: '📑',
  staff: '👨‍⚕️',
  logout: '🚪',
};

export default function AdminDashboardScreen() {
  const [activeSection, setActiveSection] = useState('overview');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock data for dashboard
  const stats = {
    totalAppointments: 156,
    pendingAppointments: 23,
    completedToday: 12,
    totalPatients: 89,
    upcomingShifts: 5,
    newBookings: 8,
  };

  const quickActions = [
    { id: 'appointments', label: 'Appointments', icon: ICONS.appointments, count: stats.pendingAppointments, color: '#4A90E2' },
    { id: 'schedule', label: 'Schedule', icon: ICONS.schedule, count: stats.upcomingShifts, color: '#50C878' },
    { id: 'patients', label: 'Patients', icon: ICONS.patients, count: stats.totalPatients, color: '#9B59B6' },
    { id: 'booking', label: 'Bookings', icon: ICONS.booking, count: stats.newBookings, color: '#F39C12' },
    { id: 'site', label: 'Site Mgmt', icon: ICONS.site, count: 0, color: '#1ABC9C' },
    { id: 'wellness', label: 'Wellness', icon: ICONS.wellness, count: 0, color: '#E74C3C' },
  ];

  const recentActivity = [
    { id: 1, type: 'appointment', message: 'New appointment request from John Doe', time: '5 min ago' },
    { id: 2, type: 'booking', message: 'Sarah Smith confirmed booking #2345', time: '15 min ago' },
    { id: 3, type: 'schedule', message: 'Shift updated for tomorrow 9AM-5PM', time: '1 hour ago' },
    { id: 4, type: 'patient', message: 'New patient registered: Michael Brown', time: '2 hours ago' },
    { id: 5, type: 'settings', message: 'Profile settings updated', time: '3 hours ago' },
  ];

  const renderOverview = () => (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalAppointments}</Text>
          <Text style={styles.statLabel}>Total Appointments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.pendingAppointments}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.completedToday}</Text>
          <Text style={styles.statLabel}>Completed Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalPatients}</Text>
          <Text style={styles.statLabel}>Total Patients</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.quickActionCard, { borderLeftColor: action.color }]}
            onPress={() => handleQuickAction(action.id)}
          >
            <Text style={styles.quickActionIcon}>{action.icon}</Text>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
            {action.count > 0 && (
              <View style={[styles.badge, { backgroundColor: action.color }]}>
                <Text style={styles.badgeText}>{action.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderAppointments = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.pageTitle}>Appointments Management</Text>
      
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>📋</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>View All Appointments</Text>
            <Text style={styles.listSubtitle}>See and manage all appointments</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>➕</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Create New Appointment</Text>
            <Text style={styles.listSubtitle}>Schedule a new patient visit</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>📊</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Appointment Reports</Text>
            <Text style={styles.listSubtitle}>View analytics and reports</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>⏰</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Pending Approvals</Text>
            <Text style={styles.listSubtitle}>{stats.pendingAppointments} requests waiting</Text>
          </View>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>{stats.pendingAppointments}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderPatients = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.pageTitle}>Patient Management</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalPatients}</Text>
          <Text style={styles.statLabel}>Total Patients</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>New This Week</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>👥</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>All Patients</Text>
            <Text style={styles.listSubtitle}>View patient records</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>➕</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Add New Patient</Text>
            <Text style={styles.listSubtitle}>Register a new patient</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listIcon}>📋</Text>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Patient History</Text>
            <Text style={styles.listSubtitle}>View visit history</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.pageTitle}>Settings</Text>
      
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Enable dark theme</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#50C878' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingDescription}>Push notification settings</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#50C878' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Profile Settings</Text>
            <Text style={styles.settingDescription}>Update your profile</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Security</Text>
            <Text style={styles.settingDescription}>Password and security</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingDescription}>Get help and contact support</Text>
          </View>
          <Text style={styles.listArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const handleQuickAction = (actionId) => {
    Alert.alert('Quick Action', `Opening ${actionId}...`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out') },
      ]
    );
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: ICONS.dashboard },
    { id: 'appointments', label: 'Appointments', icon: ICONS.appointments },
    { id: 'patients', label: 'Patients', icon: ICONS.patients },
    { id: 'settings', label: 'Settings', icon: ICONS.settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'appointments':
        return renderAppointments();
      case 'patients':
        return renderPatients();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Doctor Admin Panel</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Dr. Smith</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Tabs */}
      <View style={styles.menuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                activeSection === item.id && styles.menuItemActive,
              ]}
              onPress={() => setActiveSection(item.id)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.menuLabel,
                  activeSection === item.id && styles.menuLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  menuContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  menuItemActive: {
    backgroundColor: '#4A90E2',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  menuLabelActive: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
    marginTop: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  listSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  listArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  pendingBadge: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});