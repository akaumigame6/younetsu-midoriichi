import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { User, Settings } from 'lucide-react';
import { EventSettingsProvider } from './context/EventSettingsContext';
import { ViewerFeedbackProvider } from './context/ViewerFeedbackContext';

// ===== Viewer (鑑賞者) フロー =====
import EventSurvey from './pages/viewer/EventSurvey';
import SurveyWizard from './pages/viewer/SurveyWizard';
import CreatorSelect from './pages/viewer/CreatorSelect';
import CompleteSend from './pages/viewer/CompleteSend';
import ViewerMenu from './pages/viewer/ViewerMenu';
import MyFeedbackDetail from './pages/viewer/MyFeedbackDetail';

// ===== Creator (作家) 閲覧ページ =====
import CreatorFeedbackView from './pages/creator/CreatorFeedbackView';

// ===== Admin (イベント主催者) =====
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCreatorFeedbackDetail from './pages/admin/AdminCreatorFeedbackDetail';
import AdminEventFeedbackDetail from './pages/admin/AdminEventFeedbackDetail';

// ============================
// トップページ
// ============================
function Home() {
  const navigate = useNavigate();
  return (
    <div className="content-area fade-in" style={{ justifyContent: 'center' }}>
      <h1 className="title" style={{ textAlign: 'center', marginBottom: '8px' }}>感想スタンド</h1>
      <p className="subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
        心が動いたその場所から、1分で届く。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 鑑賞者: 一連のフローへ */}
        <button className="btn-primary" onClick={() => navigate('/survey')}>
          <User size={20} />
          鑑賞者として参加する
        </button>

        {/* 主催者: ログインへ */}
        <button className="btn-secondary" onClick={() => navigate('/admin')}>
          <Settings size={20} />
          イベント主催者の方はこちら
        </button>
      </div>

      <div style={{
        marginTop: '48px',
        padding: '16px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '0.8rem',
        color: 'var(--color-text-light)',
        textAlign: 'center',
        lineHeight: 1.8,
      }}>
        作家の方は主催者から届いたURLを直接開いてください
      </div>
    </div>
  );
}

// ============================
// App ルート定義
// ============================
function App() {
  return (
    <EventSettingsProvider>
      <ViewerFeedbackProvider>
        <Router>
          <div className="app-container">
            <Header />
            <Routes>
          {/* トップ */}
          <Route path="/" element={<Home />} />

          {/* ==================== */}
          {/* 鑑賞者フロー          */}
          {/* ==================== */}

          {/* Step 1: イベント全体のアンケート */}
          <Route path="/survey" element={<EventSurvey />} />
          <Route path="/survey/wizard" element={<SurveyWizard />} />
          <Route path="/survey/creators" element={<CreatorSelect />} />

          {/* Step 3: 確認・送信完了 */}
          <Route path="/survey/complete" element={<CompleteSend />} />

          {/* 鑑賞者メニュー（フロー完了後の到達地点） */}
          <Route path="/viewer" element={<ViewerMenu />} />
          <Route path="/viewer/feedback/:id" element={<MyFeedbackDetail />} />

          {/* ==================== */}
          {/* 作家ビューページ      */}
          {/* ==================== */}
          {/* 主催者から共有されたURLで直接アクセス */}
          <Route path="/creator/:token" element={<CreatorFeedbackView />} />

          {/* ==================== */}
          {/* イベント主催者ページ  */}
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/creator/:id" element={<AdminCreatorFeedbackDetail />} />
          <Route path="/admin/event-survey" element={<AdminEventFeedbackDetail />} />
        </Routes>
      </div>
    </Router>
      </ViewerFeedbackProvider>
    </EventSettingsProvider>
  );
}

export default App;
