/**
 * Mock seed data — replaces scattered inline arrays across all screens.
 * In production: delete this file and fetch from API.
 */

import {
  Doctor, Appointment, Session, Shift,
  Certification, Education, NotificationSettings, BookingSettings,
} from '../types';

export const MOCK_DOCTOR: Doctor = {
  id: 'doc-001',
  firstName: 'Rajesh',
  lastName: 'Kumar',
  specialty: 'Senior Cardiologist',
  qualification: 'MBBS, MD, DM Cardiology',
  experience: '15+ Years',
  hospital: 'City Medical Center',
  regNo: 'MCI-45231',
  email: 'rajesh.kumar@citymed.in',
  phone: '+91 98765 43210',
  bio: 'Specialized in interventional cardiology with expertise in complex cardiac procedures. Former fellow at AIIMS. Awarded "Best Cardiologist" at National Medical Awards 2023.',
  avatar: 'https://i.pravatar.cc/200?img=12',
  rating: 4.9,
  totalPatients: 16549,
  reviews: 1248,
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1',  name: 'Rony Brawa',    type: 'Consultation',   time: '09:00 AM', date: 'Today',    token: 'T01', status: 'confirmed',  age: 34, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=1',  phone: '+91 98001 11001' },
  { id: '2',  name: 'Sarah Wilson',  type: 'Follow-up',      time: '10:30 AM', date: 'Today',    token: 'T02', status: 'confirmed',  age: 28, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=5',  phone: '+91 98001 11002' },
  { id: '3',  name: 'Mike Johnson',  type: 'Checkup',        time: '11:00 AM', date: 'Today',    token: 'T03', status: 'pending',    age: 45, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=3',  phone: '+91 98001 11003' },
  { id: '4',  name: 'Priya Sharma',  type: 'Consultation',   time: '12:00 PM', date: 'Today',    token: 'T04', status: 'pending',    age: 32, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=9',  phone: '+91 98001 11004' },
  { id: '5',  name: 'Alex Chen',     type: 'Follow-up',      time: '02:00 PM', date: 'Today',    token: 'T05', status: 'confirmed',  age: 51, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=7',  phone: '+91 98001 11005' },
  { id: '6',  name: 'Grill Merhew',  type: 'Consultation',   time: '03:00 PM', date: 'Today',    token: 'T06', status: 'cancelled',  age: 29, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=2',  phone: '+91 98001 11006' },
  { id: '7',  name: 'Yashka Mintas', type: 'Checkup',        time: '04:00 PM', date: 'Today',    token: 'T07', status: 'completed',  age: 60, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=20', phone: '+91 98001 11007' },
  { id: '8',  name: 'John Smith',    type: 'Post-Op Review', time: '09:30 AM', date: 'Tomorrow', token: 'T01', status: 'confirmed',  age: 38, gender: 'M', avatar: 'https://i.pravatar.cc/80?img=11', phone: '+91 98001 11008' },
  { id: '9',  name: 'Glory Gill',    type: 'Consultation',   time: '11:30 AM', date: 'Tomorrow', token: 'T02', status: 'pending',    age: 22, gender: 'F', avatar: 'https://i.pravatar.cc/80?img=16', phone: '+91 98001 11009' },
];

export const MOCK_SESSIONS: Session[] = [
  { id: '1', name: 'Morning OP',   startTime: '09:00', endTime: '13:00', duration: 30, totalTokens: 20, bookedTokens: 14, available: true,  onlineBooking: true,  day: 'Mon' },
  { id: '2', name: 'Afternoon OP', startTime: '14:00', endTime: '18:00', duration: 30, totalTokens: 20, bookedTokens: 8,  available: true,  onlineBooking: true,  day: 'Mon' },
  { id: '3', name: 'Evening OP',   startTime: '19:00', endTime: '22:00', duration: 20, totalTokens: 15, bookedTokens: 15, available: false, onlineBooking: false, day: 'Mon' },
];

export const MOCK_SHIFTS: Shift[] = [
  { id: '1', name: 'Morning OP',     startTime: '09:00', endTime: '13:00', maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true  },
  { id: '2', name: 'Afternoon OP',   startTime: '14:00', endTime: '18:00', maxTokens: 20, days: ['Mon','Tue','Wed','Thu','Fri'], active: true  },
  { id: '3', name: 'Evening OP',     startTime: '19:00', endTime: '22:00', maxTokens: 15, days: ['Mon','Wed','Fri'],             active: false },
  { id: '4', name: 'Weekend Morning',startTime: '08:00', endTime: '12:00', maxTokens: 25, days: ['Sat','Sun'],                   active: true  },
];

export const MOCK_CERTIFICATIONS: Certification[] = [
  { id: '1', name: 'Medical Council Registration',         subtitle: 'Valid until Dec 2026' },
  { id: '2', name: 'Board Certified Cardiologist',         subtitle: 'RGUHS Board' },
  { id: '3', name: 'Advanced Cardiac Life Support (ACLS)', subtitle: 'AHA Certified' },
  { id: '4', name: 'Basic Life Support (BLS)',             subtitle: 'AHA Certified' },
];

export const MOCK_EDUCATION: Education[] = [
  { id: '1', degree: 'MBBS',                   institution: 'Medical College of India', year: '2005' },
  { id: '2', degree: 'MD (Internal Medicine)',  institution: 'Delhi University',         year: '2008' },
  { id: '3', degree: 'DM Cardiology',          institution: 'AIIMS, New Delhi',         year: '2011' },
  { id: '4', degree: 'Fellowship (Interv.)',   institution: 'Apollo Hospitals',          year: '2013' },
];

export const MOCK_NOTIFICATION_SETTINGS: NotificationSettings = {
  push: true, email: true, sms: false,
  appointmentReminders: true, patientUpdates: true,
  cancellations: true, marketing: false,
};

export const MOCK_BOOKING_SETTINGS: BookingSettings = {
  onlineBooking: true, autoConfirm: false, smsReminder: true,
  cancelCutoffHours: 2, reminderHours: 24, defaultDurationMinutes: 30,
};
