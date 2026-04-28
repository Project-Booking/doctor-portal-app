import api from './api';

// Appointment Service
export const appointmentService = {
  // Get all appointments
  getAppointments: async (doctorId) => {
    return api.get(`/appointments?doctorId=${doctorId}`);
  },

  // Get single appointment
  getAppointment: async (appointmentId) => {
    return api.get(`/appointments/${appointmentId}`);
  },

  // Create appointment
  createAppointment: async (appointmentData) => {
    return api.post('/appointments', appointmentData);
  },

  // Update appointment
  updateAppointment: async (appointmentId, appointmentData) => {
    return api.put(`/appointments/${appointmentId}`, appointmentData);
  },

  // Delete appointment
  deleteAppointment: async (appointmentId) => {
    return api.delete(`/appointments/${appointmentId}`);
  },

  // Get appointment metrics
  getMetrics: async (doctorId) => {
    return api.get(`/appointments/metrics/${doctorId}`);
  },
};

// Schedule Service
export const scheduleService = {
  // Get schedule
  getSchedule: async (doctorId) => {
    return api.get(`/schedule/${doctorId}`);
  },

  // Get all shifts
  getShifts: async (doctorId) => {
    return api.get(`/shifts?doctorId=${doctorId}`);
  },

  // Create shift
  createShift: async (shiftData) => {
    return api.post('/shifts', shiftData);
  },

  // Update shift
  updateShift: async (shiftId, shiftData) => {
    return api.put(`/shifts/${shiftId}`, shiftData);
  },

  // Delete shift
  deleteShift: async (shiftId) => {
    return api.delete(`/shifts/${shiftId}`);
  },
};

// Profile Service
export const profileService = {
  // Get profile
  getProfile: async (doctorId) => {
    return api.get(`/profile/${doctorId}`);
  },

  // Update profile
  updateProfile: async (doctorId, profileData) => {
    return api.put(`/profile/${doctorId}`, profileData);
  },

  // Get certifications
  getCertifications: async (doctorId) => {
    return api.get(`/profile/${doctorId}/certifications`);
  },

  // Add certification
  addCertification: async (doctorId, certificationData) => {
    return api.post(`/profile/${doctorId}/certifications`, certificationData);
  },

  // Delete certification
  deleteCertification: async (doctorId, certificationId) => {
    return api.delete(`/profile/${doctorId}/certifications/${certificationId}`);
  },
};

// Auth Service
export const authService = {
  // Login
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Logout
  logout: async () => {
    return api.post('/auth/logout', {});
  },

  // Register
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  // Refresh token
  refreshToken: async (token) => {
    return api.post('/auth/refresh', { token });
  },

  // Verify email
  verifyEmail: async (email, code) => {
    return api.post('/auth/verify-email', { email, code });
  },
};

// Settings Service
export const settingsService = {
  // Get settings
  getSettings: async (doctorId) => {
    return api.get(`/settings/${doctorId}`);
  },

  // Update settings
  updateSettings: async (doctorId, settingsData) => {
    return api.put(`/settings/${doctorId}`, settingsData);
  },

  // Get notification preferences
  getNotificationPreferences: async (doctorId) => {
    return api.get(`/settings/${doctorId}/notifications`);
  },

  // Update notification preferences
  updateNotificationPreferences: async (doctorId, preferences) => {
    return api.put(`/settings/${doctorId}/notifications`, preferences);
  },
};

// Booking Service
export const bookingService = {
  // Get booking preferences
  getBookingPreferences: async (doctorId) => {
    return api.get(`/booking/preferences/${doctorId}`);
  },

  // Update booking preferences
  updateBookingPreferences: async (doctorId, preferences) => {
    return api.put(`/booking/preferences/${doctorId}`, preferences);
  },

  // Get available slots
  getAvailableSlots: async (doctorId, date) => {
    return api.get(`/booking/available-slots?doctorId=${doctorId}&date=${date}`);
  },

  // Book session
  bookSession: async (bookingData) => {
    return api.post('/booking/sessions', bookingData);
  },
};

export default {
  appointmentService,
  scheduleService,
  profileService,
  authService,
  settingsService,
  bookingService,
};
