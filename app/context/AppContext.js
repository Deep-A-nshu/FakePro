import React, { createContext, useState, useRef, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [callSettings, setCallSettings] = useState({
    callerName: 'Sarah Wilson',
    callerNumber: '+1 (555) 123-4567',
    callerAvatar: 'SW',
    message: 'Hey, can you talk? I need to discuss the project urgently.',
    vibration: true,
  });

  const [templates, setTemplates] = useState([
    { id: 'boss', name: 'Boss Emergency', icon: 'MJ', caller: 'Mike Johnson', number: '+1 (555) 987-6543', message: "We need you in the office immediately." },
    { id: 'doctor', name: 'Doctor Appointment', icon: 'DS', caller: "Dr. Smith's Office", number: '+1 (555) 234-5678', message: 'Reminder about your appointment today.' },
    { id: 'delivery', name: 'Delivery Driver', icon: 'ED', caller: 'Express Delivery', number: '+1 (555) 876-5432', message: "I'm at your location with your package." },
  ]);

  const countdownRef = useRef(null);
  const scheduledTimeRef = useRef(null);

  // countdown effect
  useEffect(() => {
    if (typeof countdown === 'number' && countdown > 0) {
      countdownRef.current = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (countdown === 0) {
      triggerFakeCall();
      setCountdown(null);
    }
    return () => clearTimeout(countdownRef.current);
  }, [countdown]);

  // scheduled effect
  useEffect(() => {
    if (scheduledTime) {
      scheduledTimeRef.current = setInterval(() => {
        if (new Date() >= new Date(scheduledTime)) {
          triggerFakeCall();
          setScheduledTime(null);
          clearInterval(scheduledTimeRef.current);
        }
      }, 1000);
      return () => clearInterval(scheduledTimeRef.current);
    }
  }, [scheduledTime]);

  const triggerFakeCall = () => {
    setIsCallActive(true);
  };

  const cancelScheduled = () => {
    setCountdown(null);
    setScheduledTime(null);
    clearTimeout(countdownRef.current);
    clearInterval(scheduledTimeRef.current);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode, setDarkMode,
        isCallActive, setIsCallActive,
        countdown, setCountdown,
        scheduledTime, setScheduledTime,
        callSettings, setCallSettings,
        templates, setTemplates,
        triggerFakeCall, cancelScheduled
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
