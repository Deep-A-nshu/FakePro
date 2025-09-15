import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

type CallSettings = {
  name: string;
  number: string;
  photo?: string;
  message: string;
  voice?: string;
};

type CallContextValue = {
  settings: CallSettings;
  incoming: boolean;
  triggerCallNow: () => void;
  scheduleCall: (minutes: number) => void;
  updateSettings: (s: Partial<CallSettings>) => void;
  endCall: () => void;
};

const defaultSettings: CallSettings = {
  name: 'Unknown',
  number: '',
  message: 'Hello, this is a fake call.',
};

const CallContext = createContext<CallContextValue | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CallSettings>(defaultSettings);
  const [incoming, setIncoming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerCallNow = () => {
    setIncoming(true);
  };

  const scheduleCall = (minutes: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const ms = minutes * 60000;
    timeoutRef.current = setTimeout(() => {
      setIncoming(true);
    }, ms);
  };

  const updateSettings = (s: Partial<CallSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
  };

  const endCall = () => {
    setIncoming(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value: CallContextValue = {
    settings,
    incoming,
    triggerCallNow,
    scheduleCall,
    updateSettings,
    endCall,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCall must be used within CallProvider');
  return ctx;
};

