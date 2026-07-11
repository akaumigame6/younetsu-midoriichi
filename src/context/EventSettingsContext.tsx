import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface EventSettings {
  eventName: string;
  eventDesc: string;
  venue: string;
  dateFrom: string;
  dateTo: string;
  eventQ2Placeholder?: string;
  eventQ3Placeholder?: string;
  creatorQ2Placeholder?: string;
  creatorQ3Placeholder?: string;
  freeEventPlaceholder?: string;
  freeCreatorPlaceholder?: string;
  referralSources?: string;
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
  eventQ2Placeholder: '例：〇〇の展示で、入り口の雰囲気から',
  eventQ3Placeholder: '例：色使いがとても綺麗だったから',
  creatorQ2Placeholder: '例：作品の〇〇の表現から',
  creatorQ3Placeholder: '例：不思議な魅力があったから',
  freeEventPlaceholder: '例：素晴らしい体験でした。特に〇〇が印象に残りました。',
  freeCreatorPlaceholder: '例：素晴らしい体験でした。特に〇〇が印象に残りました。',
  referralSources: 'X(旧Twitter),Instagram,ポスター/チラシ,知人の紹介,その他',
};

const EventSettingsContext = createContext<EventSettingsContextType | undefined>(undefined);

export const EventSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<EventSettings>(defaultSettings);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eventSettings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('eventSettings', JSON.stringify(settings));
    }
  }, [settings, isMounted]);

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
