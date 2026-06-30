import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { findCreatorById, getFeedbacksByCreatorId } from '../../data/mockData';

export default function AdminCreatorFeedbackDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const creator = id ? findCreatorById(id) : null;
  const feedbacks = id ? getFeedbacksByCreatorId(id) : [];

  if (!creator) {
    return (
      <div className="content-area fade-in">
        <p>作家が見つかりません。</p>
        <button className="btn-ghost" onClick={() => navigate('/admin/dashboard')}>戻る</button>
      </div>
    );
  }

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
        {creator.name} 宛の感想 ({feedbacks.length}件)
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {feedbacks.length === 0 ? (
          <p style={{ color: 'var(--color-text-light)', textAlign: 'center', marginTop: '32px' }}>
            まだ感想は届いていません。
          </p>
        ) : (
          feedbacks.map((f) => (
            <div key={f.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {new Date(f.createdAt).toLocaleString()}
                </span>
                {f.reaction === 'read' && (
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#e0f2f1', color: '#00796b', padding: '2px 8px', borderRadius: '12px' }}>
                    作家が確認済み
                  </span>
                )}
              </div>
              
              {f.feedbackData.content && (
                <div style={{ marginBottom: f.feedbackData.q1 ? '16px' : '0', paddingBottom: f.feedbackData.q1 ? '12px' : '0', borderBottom: f.feedbackData.q1 ? '1px solid var(--color-border)' : 'none' }}>
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: '0.95rem' }}>{f.feedbackData.content}</p>
                </div>
              )}
              {f.feedbackData.q1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>感情:</span>
                    <span style={{ fontWeight: 600 }}>{f.feedbackData.q1}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>場所:</span>
                    <span>{f.feedbackData.q2}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginRight: '8px' }}>理由:</span>
                    <span>{f.feedbackData.q3}</span>
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
