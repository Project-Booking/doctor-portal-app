/**
 * AppContext — global app state for doctor profile, appointments,
 * sessions, shifts, and settings. Single source of truth for all screens.
 *
 * Replace useReducer initialState values with API calls in useEffect hooks
 * when connecting to a real backend.
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  Doctor, Appointment, AppointmentStatus, Session, Shift,
  Certification, Education, NotificationSettings, BookingSettings,
} from '../types';
import {
  MOCK_DOCTOR, MOCK_APPOINTMENTS, MOCK_SESSIONS, MOCK_SHIFTS,
  MOCK_CERTIFICATIONS, MOCK_EDUCATION,
  MOCK_NOTIFICATION_SETTINGS, MOCK_BOOKING_SETTINGS,
} from '../utils/mockData';

// ── State Shape ───────────────────────────────────────────────────────────────

interface AppState {
  doctor: Doctor;
  appointments: Appointment[];
  sessions: Session[];
  shifts: Shift[];
  certifications: Certification[];
  education: Education[];
  notificationSettings: NotificationSettings;
  bookingSettings: BookingSettings;
}

const initialState: AppState = {
  doctor: MOCK_DOCTOR,
  appointments: MOCK_APPOINTMENTS,
  sessions: MOCK_SESSIONS,
  shifts: MOCK_SHIFTS,
  certifications: MOCK_CERTIFICATIONS,
  education: MOCK_EDUCATION,
  notificationSettings: MOCK_NOTIFICATION_SETTINGS,
  bookingSettings: MOCK_BOOKING_SETTINGS,
};

// ── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'UPDATE_DOCTOR'; payload: Partial<Doctor> }
  | { type: 'SET_APPOINTMENT_STATUS'; payload: { id: string; status: AppointmentStatus } }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_SESSION'; payload: Session }
  | { type: 'TOGGLE_SESSION_AVAILABILITY'; payload: string }
  | { type: 'ADD_SHIFT'; payload: Shift }
  | { type: 'UPDATE_SHIFT'; payload: Shift }
  | { type: 'DELETE_SHIFT'; payload: string }
  | { type: 'TOGGLE_SHIFT_ACTIVE'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'UPDATE_NOTIFICATION_SETTINGS'; payload: Partial<NotificationSettings> }
  | { type: 'UPDATE_BOOKING_SETTINGS'; payload: Partial<BookingSettings> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_DOCTOR':
      return { ...state, doctor: { ...state.doctor, ...action.payload } };

    case 'SET_APPOINTMENT_STATUS':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? { ...a, status: action.payload.status } : a
        ),
      };

    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [action.payload, ...state.appointments] };

    case 'UPDATE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case 'TOGGLE_SESSION_AVAILABILITY':
      return {
        ...state,
        sessions: state.sessions.map((s) =>
          s.id === action.payload ? { ...s, available: !s.available } : s
        ),
      };

    case 'ADD_SHIFT':
      return { ...state, shifts: [...state.shifts, action.payload] };

    case 'UPDATE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };

    case 'DELETE_SHIFT':
      return { ...state, shifts: state.shifts.filter((s) => s.id !== action.payload) };

    case 'TOGGLE_SHIFT_ACTIVE':
      return {
        ...state,
        shifts: state.shifts.map((s) =>
          s.id === action.payload ? { ...s, active: !s.active } : s
        ),
      };

    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };

    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((c) => c.id !== action.payload),
      };

    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((e) => e.id !== action.payload),
      };

    case 'UPDATE_NOTIFICATION_SETTINGS':
      return {
        ...state,
        notificationSettings: { ...state.notificationSettings, ...action.payload },
      };

    case 'UPDATE_BOOKING_SETTINGS':
      return {
        ...state,
        bookingSettings: { ...state.bookingSettings, ...action.payload },
      };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface AppContextValue extends AppState {
  dispatch: React.Dispatch<Action>;
  // Convenience action helpers
  updateDoctor: (data: Partial<Doctor>) => void;
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addAppointment: (appt: Appointment) => void;
  updateSession: (session: Session) => void;
  toggleSessionAvailability: (id: string) => void;
  addShift: (shift: Shift) => void;
  updateShift: (shift: Shift) => void;
  deleteShift: (id: string) => void;
  toggleShiftActive: (id: string) => void;
  addCertification: (cert: Certification) => void;
  deleteCertification: (id: string) => void;
  addEducation: (edu: Education) => void;
  deleteEducation: (id: string) => void;
  updateNotificationSettings: (s: Partial<NotificationSettings>) => void;
  updateBookingSettings: (s: Partial<BookingSettings>) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateDoctor          = useCallback((data: Partial<Doctor>) =>        dispatch({ type: 'UPDATE_DOCTOR', payload: data }), []);
  const setAppointmentStatus  = useCallback((id: string, status: AppointmentStatus) => dispatch({ type: 'SET_APPOINTMENT_STATUS', payload: { id, status } }), []);
  const addAppointment        = useCallback((appt: Appointment) =>            dispatch({ type: 'ADD_APPOINTMENT', payload: appt }), []);
  const updateSession         = useCallback((session: Session) =>             dispatch({ type: 'UPDATE_SESSION', payload: session }), []);
  const toggleSessionAvailability = useCallback((id: string) =>              dispatch({ type: 'TOGGLE_SESSION_AVAILABILITY', payload: id }), []);
  const addShift              = useCallback((shift: Shift) =>                dispatch({ type: 'ADD_SHIFT', payload: shift }), []);
  const updateShift           = useCallback((shift: Shift) =>                dispatch({ type: 'UPDATE_SHIFT', payload: shift }), []);
  const deleteShift           = useCallback((id: string) =>                  dispatch({ type: 'DELETE_SHIFT', payload: id }), []);
  const toggleShiftActive     = useCallback((id: string) =>                  dispatch({ type: 'TOGGLE_SHIFT_ACTIVE', payload: id }), []);
  const addCertification      = useCallback((cert: Certification) =>         dispatch({ type: 'ADD_CERTIFICATION', payload: cert }), []);
  const deleteCertification   = useCallback((id: string) =>                  dispatch({ type: 'DELETE_CERTIFICATION', payload: id }), []);
  const addEducation          = useCallback((edu: Education) =>              dispatch({ type: 'ADD_EDUCATION', payload: edu }), []);
  const deleteEducation       = useCallback((id: string) =>                  dispatch({ type: 'DELETE_EDUCATION', payload: id }), []);
  const updateNotificationSettings = useCallback((s: Partial<NotificationSettings>) => dispatch({ type: 'UPDATE_NOTIFICATION_SETTINGS', payload: s }), []);
  const updateBookingSettings = useCallback((s: Partial<BookingSettings>) =>  dispatch({ type: 'UPDATE_BOOKING_SETTINGS', payload: s }), []);

  return (
    <AppContext.Provider value={{
      ...state, dispatch,
      updateDoctor, setAppointmentStatus, addAppointment,
      updateSession, toggleSessionAvailability,
      addShift, updateShift, deleteShift, toggleShiftActive,
      addCertification, deleteCertification, addEducation, deleteEducation,
      updateNotificationSettings, updateBookingSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside <AppProvider>');
  return ctx;
}
