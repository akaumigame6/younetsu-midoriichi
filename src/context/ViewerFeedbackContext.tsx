import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FeedbackData, SurveyData } from '../types';

export interface SavedFeedback {
  id: string; // 一意のID (セッション内)
  type: 'event' | 'creator';
  creatorId?: string; // creator の場合のみ
  data: FeedbackData | SurveyData;
  timestamp: string;
}

interface ViewerFeedbackContextType {
  feedbacks: SavedFeedback[];
  addFeedback: (feedback: SavedFeedback) => void;
  updateFeedback: (id: string, newData: FeedbackData | SurveyData) => void;
  getFeedbackById: (id: string) => SavedFeedback | undefined;
}

const ViewerFeedbackContext = createContext<ViewerFeedbackContextType | undefined>(undefined);

export const ViewerFeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<SavedFeedback[]>(() => {
    const saved = sessionStorage.getItem('viewerFeedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('viewerFeedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const addFeedback = (feedback: SavedFeedback) => {
    setFeedbacks(prev => {
      // 同じ作家(またはイベント)に複数回送った場合は上書きするか、新規追加するか？
      // 今回は新規追加(または上書き)としておく。わかりやすくするため常に新規追加(複数件対応)
      return [feedback, ...prev];
    });
  };

  const updateFeedback = (id: string, newData: FeedbackData | SurveyData) => {
    setFeedbacks(prev => 
      prev.map(f => f.id === id ? { ...f, data: newData, timestamp: new Date().toISOString() } : f)
    );
  };

  const getFeedbackById = (id: string) => {
    return feedbacks.find(f => f.id === id);
  };

  return (
    <ViewerFeedbackContext.Provider value={{ feedbacks, addFeedback, updateFeedback, getFeedbackById }}>
      {children}
    </ViewerFeedbackContext.Provider>
  );
};

export const useViewerFeedback = () => {
  const context = useContext(ViewerFeedbackContext);
  if (!context) {
    throw new Error('useViewerFeedback must be used within a ViewerFeedbackProvider');
  }
  return context;
};
