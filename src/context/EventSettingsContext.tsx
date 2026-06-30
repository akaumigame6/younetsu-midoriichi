import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface EventSettings {
  eventName: string;
  eventDesc: string;
  venue: string;
  dateFrom: string;
  dateTo: string;
  surveyEnabled: boolean;
}

interface EventSettingsContextType {
  settings: EventSettings;
  updateSettings: (newSettings: Partial<EventSettings>) => void;
}

const defaultSettings: EventSettings = {
  eventName: '緑市 マルシェ',
  eventDesc: 'このイベントについての説明...',
  venue: '〇〇ギャラリー',
  dateFrom: '',
  dateTo: '',
  surveyEnabled: true,
};

const EventSettingsContext = createContext<EventSettingsContextType | undefined>(undefined);

export const EventSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<EventSettings>(() => {
    const saved = localStorage.getItem('eventSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('eventSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<EventSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <EventSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </EventSettingsContext.Provider>
  );
};

export const useEventSettings = () => {
  const context = useContext(EventSettingsContext);
  if (!context) {
    throw new Error('useEventSettings must be used within an EventSettingsProvider');
  }
  return context;
};
