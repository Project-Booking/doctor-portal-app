import React, { createContext, useState, useCallback } from 'react';

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    specialization: '',
    avatar: '',
    isLoggedIn: false,
  });

  // Appointments State
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Schedule State
  const [schedule, setSchedule] = useState([]);
  const [shifts, setShifts] = useState([]);

  // Booking State
  const [bookingPreferences, setBookingPreferences] = useState({
    onlineBooking: true,
    futureBooking: true,
    notifications: true,
  });

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  // User Actions
  const loginUser = useCallback((userData) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
    setError(null);
  }, []);

  const logoutUser = useCallback(() => {
    setUser({
      id: null,
      name: '',
      email: '',
      specialization: '',
      avatar: '',
      isLoggedIn: false,
    });
  }, []);

  const updateUserProfile = useCallback((updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  }, []);

  // Appointment Actions
  const addAppointment = useCallback((appointment) => {
    setAppointments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...appointment,
      },
    ]);
  }, []);

  const updateAppointment = useCallback((id, updatedData) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updatedData } : apt))
    );
  }, []);

  const deleteAppointment = useCallback((id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, []);

  // Schedule Actions
  const addShift = useCallback((shift) => {
    setShifts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...shift,
      },
    ]);
  }, []);

  const updateShift = useCallback((id, updatedData) => {
    setShifts((prev) =>
      prev.map((shift) => (shift.id === id ? { ...shift, ...updatedData } : shift))
    );
  }, []);

  const deleteShift = useCallback((id) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  }, []);

  // Booking Preferences Actions
  const updateBookingPreferences = useCallback((preferences) => {
    setBookingPreferences((prev) => ({
      ...prev,
      ...preferences,
    }));
  }, []);

  // UI Actions
  const setLoadingState = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const setErrorState = useCallback((errorMsg) => {
    setError(errorMsg);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Context Value
  const value = {
    // State
    user,
    appointments,
    selectedAppointment,
    schedule,
    shifts,
    bookingPreferences,
    loading,
    error,
    theme,

    // User Actions
    loginUser,
    logoutUser,
    updateUserProfile,

    // Appointment Actions
    addAppointment,
    updateAppointment,
    deleteAppointment,
    setSelectedAppointment,

    // Schedule Actions
    addShift,
    updateShift,
    deleteShift,

    // Booking Actions
    updateBookingPreferences,

    // UI Actions
    setLoadingState,
    setErrorState,
    clearError,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
