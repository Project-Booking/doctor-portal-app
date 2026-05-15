import create from 'zustand';
import { AppState, AppActionHandlers } from '@/types';
import {
  fetchDoctorProfile,
  fetchAppointments,
  fetchSessions,
  fetchShifts,
  fetchCertifications,
  fetchEducation,
  fetchNotificationSettings,
  fetchBookingSettings,
  updateDoctorProfile,
  updateAppointmentStatus,
  updateNotificationSettings,
  updateBookingSettings,
} from '@/services/doctorService';

interface AppStoreState extends AppState {
  isLoading: boolean;
  error?: string;
  loadAppData: () => Promise<void>;
  updateDoctor: (data: Partial<AppState['doctor']>) => Promise<void>;
  setAppointmentStatus: (id: string, status: AppState['appointments'][number]['status']) => Promise<void>;
  updateNotificationSettings: (settings: Partial<AppState['notificationSettings']>) => Promise<void>;
  updateBookingSettings: (settings: Partial<AppState['bookingSettings']>) => Promise<void>;
}

const initialState: AppState = {
  doctor: {
    id: '', firstName: '', lastName: '', specialty: '', qualification: '', experience: '', hospital: '',
    regNo: '', email: '', phone: '', bio: '', avatar: '', rating: 0, totalPatients: 0, reviews: 0,
  },
  appointments: [],
  sessions: [],
  shifts: [],
  certifications: [],
  education: [],
  notificationSettings: {
    push: true,
    email: true,
    sms: false,
    appointmentReminders: true,
    patientUpdates: true,
    cancellations: true,
    marketing: false,
  },
  bookingSettings: {
    onlineBooking: true,
    autoConfirm: false,
    smsReminder: true,
    cancelCutoffHours: 2,
    reminderHours: 24,
    defaultDurationMinutes: 30,
  },
};

export const useAppStore = create<AppStoreState>((set, get) => ({
  ...initialState,
  isLoading: true,
  error: undefined,
  loadAppData: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const [doctor, appointments, sessions, shifts, certifications, education, notificationSettings, bookingSettings] = await Promise.all([
        fetchDoctorProfile(),
        fetchAppointments(),
        fetchSessions(),
        fetchShifts(),
        fetchCertifications(),
        fetchEducation(),
        fetchNotificationSettings(),
        fetchBookingSettings(),
      ]);

      set({ doctor, appointments, sessions, shifts, certifications, education, notificationSettings, bookingSettings, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load doctor dashboard';
      set({ error: message, isLoading: false });
    }
  },
  updateDoctor: async (data) => {
    try {
      const doctor = await updateDoctorProfile(data);
      set({ doctor });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update doctor profile';
      set({ error: message });
    }
  },
  setAppointmentStatus: async (id, status) => {
    try {
      const appointment = await updateAppointmentStatus(id, status);
      set((state) => ({
        appointments: state.appointments.map((item) => (item.id === id ? appointment : item)),
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update appointment status';
      set({ error: message });
    }
  },
  updateNotificationSettings: async (settings) => {
    try {
      const notificationSettings = await updateNotificationSettings(settings);
      set({ notificationSettings });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save notification settings';
      set({ error: message });
    }
  },
  updateBookingSettings: async (settings) => {
    try {
      const bookingSettings = await updateBookingSettings(settings);
      set({ bookingSettings });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save booking settings';
      set({ error: message });
    }
  },
}));
