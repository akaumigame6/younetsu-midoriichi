// ========================
// Creator (作家) Types
// ========================
export interface Creator {
  id: string;
  name: string;
  description?: string;
  shareToken: string; // URLで共有するためのトークン
  iconUrl?: string; // アイコン画像URL
}

// ========================
// Survey (イベントアンケート) Types
// ========================
export type SurveyInputType = 'free' | 'questions';

export interface SurveyFreeData {
  type: 'free';
  content: string;
  q1?: string;
  q2?: string;
  q3?: string;
  referralSource?: string;
}

export interface SurveyQuestionsData {
  type: 'questions';
  selectedEmotions?: string[];
  freeEmotion?: string;
  q1: string; // 感情まとめ文字列
  q2: string; // どこで感じたか
  q3: string; // その理由
  content?: string;
  referralSource?: string;
}

export type SurveyData = SurveyFreeData | SurveyQuestionsData;

// ========================
// Feedback (作家への感想) Types
// ========================
export type FeedbackInputType = 'free' | 'questions';

export interface FeedbackFreeData {
  type: 'free';
  content: string;
  q1?: string;
  q2?: string;
  q3?: string;
}

export interface FeedbackQuestionsData {
  type: 'questions';
  selectedEmotions?: string[];
  freeEmotion?: string;
  q1: string;
  q2: string;
  q3: string;
  content?: string;
}

export type FeedbackData = FeedbackFreeData | FeedbackQuestionsData;

// ========================
// Submitted Feedback Record
// ========================
export interface FeedbackRecord {
  id: string;
  creatorId: string;
  feedbackData: FeedbackData;
  surveyData?: SurveyData;
  createdAt: string;
  reaction?: 'read'; // 作家による既読反応
}

// ========================
// Submitted Survey Record (イベント全体アンケート)
// ========================
export interface SurveyRecord {
  id: string;
  surveyData: SurveyData;
  createdAt: string;
}

// ========================
// Admin (イベント主催者) Types
// ========================
export interface AdminUser {
  id: string;
  email: string;
}
