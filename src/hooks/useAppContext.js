import { useContext } from 'react';
import { AppContext } from './AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  
  return context;
};

// Specific Context Hooks
export const useUser = () => {
  const { user, loginUser, logoutUser, updateUserProfile } = useAppContext();
  return { user, loginUser, logoutUser, updateUserProfile };
};

export const useAppointments = () => {
  const {
    appointments,
    selectedAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    setSelectedAppointment,
  } = useAppContext();
  
  return {
    appointments,
    selectedAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    setSelectedAppointment,
  };
};

export const useSchedule = () => {
  const {
    schedule,
    shifts,
    addShift,
    updateShift,
    deleteShift,
  } = useAppContext();
  
  return {
    schedule,
    shifts,
    addShift,
    updateShift,
    deleteShift,
  };
};

export const useBooking = () => {
  const { bookingPreferences, updateBookingPreferences } = useAppContext();
  return { bookingPreferences, updateBookingPreferences };
};

export const useUI = () => {
  const {
    loading,
    error,
    theme,
    setLoadingState,
    setErrorState,
    clearError,
    toggleTheme,
  } = useAppContext();
  
  return {
    loading,
    error,
    theme,
    setLoadingState,
    setErrorState,
    clearError,
    toggleTheme,
  };
};

export default useAppContext;
