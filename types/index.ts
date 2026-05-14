/**
 * Doctor Portal App — Shared TypeScript Types
 * Single source of truth for all data shapes.
 */

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type Gender = 'M' | 'F' | 'Other';
export type UserRole = 'doctor' | 'receptionist' | 'admin';
export type ThemeMode = 'light' | 'dark' | 'auto';

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

// ── Doctor ───────────────────────────────────────────────────────────────────

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  qualification: string;
  experience: string;
  hospital: string;
  regNo: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  rating: number;
  totalPatients: number;
  reviews: number;
}

// ── Appointments ─────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  name: string;
  type: string;
  time: string;
  date: string;         // 'Today' | 'Tomorrow' | ISO string
  token: string;
  status: AppointmentStatus;
  age: number;
  gender: Gender;
  avatar: string;
  phone?: string;
  notes?: string;
  diagnosisHistory?: string[];
}

// ── Sessions (OPD booking) ────────────────────────────────────────────────────

export interface Session {
  id: string;
  name: string;
  startTime: string;    // HH:MM
  endTime: string;      // HH:MM
  duration: number;     // minutes
  totalTokens: number;
  bookedTokens: number;
  available: boolean;
  onlineBooking: boolean;
  day: string;          // 'Mon' | 'Tue' | ...
}

// ── Shifts (recurring schedule) ───────────────────────────────────────────────

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  maxTokens: number;
  days: string[];
  active: boolean;
}

// ── Profile metadata ──────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  name: string;
  subtitle: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

// ── Settings ──────────────────────────────────────────────────────────────────

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  appointmentReminders: boolean;
  patientUpdates: boolean;
  cancellations: boolean;
  marketing: boolean;
}

export interface BookingSettings {
  onlineBooking: boolean;
  autoConfirm: boolean;
  smsReminder: boolean;
  cancelCutoffHours: number;
  reminderHours: number;
  defaultDurationMinutes: number;
}

// ── Navigation helper ─────────────────────────────────────────────────────────

export type RootStackParamList = {
  '(auth)/login': undefined;
  '(tabs)/index': undefined;
  '(tabs)/appointments': undefined;
  '(tabs)/booking': undefined;
  '(tabs)/schedule': undefined;
  '(tabs)/profile': undefined;
  '(tabs)/settings': undefined;
  '(tabs)/wellness': undefined;
  '(tabs)/site': undefined;
  'patient/[id]': { id: string };
};
