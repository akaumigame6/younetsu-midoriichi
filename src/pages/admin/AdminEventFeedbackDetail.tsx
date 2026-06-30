import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { mockSurveys } from '../../data/mockData';

export default function AdminEventFeedbackDetail() {
  const navigate = useNavigate();

  return (
    <div className="content-area fade-in">
      <button 
        className="btn-ghost" 
        style={{ alignSelf: 'flex-start', padding: 0, marginBottom: '16px' }}
        onClick={() => navigate('/admin/dashboard')}
      >
        <ArrowLeft size={20} />
        ダッシュボードへ戻る
      </button>

      <h1 className="title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
        イベントアンケート ({mockSurveys.length}件)
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {mockSurveys.length === 0 ? (
          <p style={{ color: 'var(--color-text-light)', textAlign: 'center', marginTop: '32px' }}>
            まだアンケートは届いていません。
          </p>
        ) : (
          mockSurveys.map((s) => (
            <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {new Date(s.createdAt).toLocaleString()}
                </span>
                {s.surveyData.referralSource && (
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#e0f2f1', color: '#00796b', padding: '2px 8px', borderRadius: '12px' }}>
                    {s.surveyData.referralSource}
                  </span>
                )}
              </div>
              
              {s.surveyData.content && (
                <div style={{ marginBottom: s.surveyData.q1 ? '16px' : '0', paddingBottom: s.surveyData.q1 ? '12px' : '0', borderBottom: s.surveyData.q1 ? '1px solid var(--color-border)' : 'none' }}>
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: '0.95rem' }}>{s.surveyData.content}</p>
                </div>
              )}
              {s.surveyData.q1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>感情:</span>
                    <span style={{ fontWeight: 600 }}>{s.surveyData.q1}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>場所:</span>
                    <span>{s.surveyData.q2}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>理由:</span>
                    <span>{s.surveyData.q3}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
