import { z } from 'zod';
import client from './apiClient';
import { Appointment, Doctor, Session, Shift, Certification, Education, NotificationSettings, BookingSettings, Gender } from '@/types';

const DoctorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  specialty: z.string(),
  qualification: z.string(),
  experience: z.string(),
  hospital: z.string(),
  regNo: z.string(),
  email: z.string().email(),
  phone: z.string(),
  bio: z.string(),
  avatar: z.string().url(),
  rating: z.number(),
  totalPatients: z.number(),
  reviews: z.number(),
});

const AppointmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  time: z.string(),
  date: z.string(),
  token: z.string(),
  status: z.enum(['confirmed', 'pending', 'completed', 'cancelled']),
  age: z.number(),
  gender: z.enum(['M', 'F', 'Other']),
  avatar: z.string().url(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  diagnosisHistory: z.array(z.string()).optional(),
});

const SessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number(),
  totalTokens: z.number(),
  bookedTokens: z.number(),
  available: z.boolean(),
  onlineBooking: z.boolean(),
  day: z.string(),
});

const ShiftSchema = z.object({
  id: z.string(),
  name: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  maxTokens: z.number(),
  days: z.array(z.string()),
  active: z.boolean(),
});

const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  subtitle: z.string(),
});

const EducationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
});

const NotificationSettingsSchema = z.object({
  push: z.boolean(),
  email: z.boolean(),
  sms: z.boolean(),
  appointmentReminders: z.boolean(),
  patientUpdates: z.boolean(),
  cancellations: z.boolean(),
  marketing: z.boolean(),
});

const BookingSettingsSchema = z.object({
  onlineBooking: z.boolean(),
  autoConfirm: z.boolean(),
  smsReminder: z.boolean(),
  cancelCutoffHours: z.number(),
  reminderHours: z.number(),
  defaultDurationMinutes: z.number(),
});

const AppointmentListSchema = z.array(AppointmentSchema);
const SessionListSchema = z.array(SessionSchema);
const ShiftListSchema = z.array(ShiftSchema);
const CertificationListSchema = z.array(CertificationSchema);
const EducationListSchema = z.array(EducationSchema);

export async function fetchDoctorProfile(): Promise<Doctor> {
  const response = await client.get('/doctor/profile');
  return DoctorSchema.parse(response.data);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await client.get('/doctor/appointments');
  return AppointmentListSchema.parse(response.data);
}

export async function fetchSessions(): Promise<Session[]> {
  const response = await client.get('/doctor/sessions');
  return SessionListSchema.parse(response.data);
}

export async function fetchShifts(): Promise<Shift[]> {
  const response = await client.get('/doctor/shifts');
  return ShiftListSchema.parse(response.data);
}

export async function fetchCertifications(): Promise<Certification[]> {
  const response = await client.get('/doctor/certifications');
  return CertificationListSchema.parse(response.data);
}

export async function fetchEducation(): Promise<Education[]> {
  const response = await client.get('/doctor/education');
  return EducationListSchema.parse(response.data);
}

export async function fetchNotificationSettings(): Promise<NotificationSettings> {
  const response = await client.get('/doctor/settings/notifications');
  return NotificationSettingsSchema.parse(response.data);
}

export async function fetchBookingSettings(): Promise<BookingSettings> {
  const response = await client.get('/doctor/settings/booking');
  return BookingSettingsSchema.parse(response.data);
}

export async function updateDoctorProfile(data: Partial<Doctor>): Promise<Doctor> {
  const response = await client.patch('/doctor/profile', data);
  return DoctorSchema.parse(response.data);
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment> {
  const response = await client.patch(`/doctor/appointments/${id}/status`, { status });
  return AppointmentSchema.parse(response.data);
}

export async function updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
  const response = await client.patch('/doctor/settings/notifications', settings);
  return NotificationSettingsSchema.parse(response.data);
}

export async function updateBookingSettings(settings: Partial<BookingSettings>): Promise<BookingSettings> {
  const response = await client.patch('/doctor/settings/booking', settings);
  return BookingSettingsSchema.parse(response.data);
}

const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  gender: z.enum(['M', 'F', 'Other']),
  avatar: z.string().url(),
  phone: z.string().optional(),
  token: z.string(),
  status: z.enum(['confirmed', 'pending', 'completed', 'cancelled']),
  type: z.string(),
  time: z.string(),
  date: z.string(),
  notes: z.string().optional(),
  diagnosisHistory: z.array(z.string()).optional(),
});

const PatientHistorySchema = z.array(z.object({
  date: z.string(),
  type: z.string(),
  status: z.enum(['confirmed', 'pending', 'completed', 'cancelled']),
  summary: z.string(),
}));

export async function fetchPatientById(id: string): Promise<z.infer<typeof PatientSchema>> {
  const response = await client.get(`/patients/${id}`);
  return PatientSchema.parse(response.data);
}

export async function fetchPatientHistory(id: string): Promise<z.infer<typeof PatientHistorySchema>> {
  const response = await client.get(`/patients/${id}/history`);
  return PatientHistorySchema.parse(response.data);
}
