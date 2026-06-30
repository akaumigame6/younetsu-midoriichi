import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { useViewerFeedback } from '../../context/ViewerFeedbackContext';
import { findCreatorById } from '../../data/mockData';

export default function MyFeedbackDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getFeedbackById } = useViewerFeedback();

  const feedback = id ? getFeedbackById(id) : undefined;

  if (!feedback) {
    return (
      <div className="content-area fade-in">
        <p>感想が見つかりません。</p>
        <button className="btn-ghost" onClick={() => navigate('/viewer')}>戻る</button>
      </div>
    );
  }

  const handleEdit = () => {
    if (feedback.type === 'event') {
      navigate('/survey/wizard', { state: { context: 'event', editMode: true, editId: feedback.id, initialData: feedback.data } });
    } else {
      navigate('/survey/wizard', { state: { context: 'creator', creatorId: feedback.creatorId, editMode: true, editId: feedback.id, initialData: feedback.data } });
    }
  };

  const title = feedback.type === 'event' 
    ? 'イベント全体アンケート' 
    : `宛先: ${feedback.creatorId ? findCreatorById(feedback.creatorId)?.name : '不明'}`;

  return (
    <div className="content-area fade-in">
      <button 
        className="btn-ghost" 
        style={{ alignSelf: 'flex-start', padding: 0, marginBottom: '16px' }}
        onClick={() => navigate('/viewer')}
      >
        <ArrowLeft size={20} />
        メニューへ戻る
      </button>

      <h1 className="title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{title}</h1>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '24px' }}>
        送信日時: {new Date(feedback.timestamp).toLocaleString()}
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        {feedback.data.content && (
          <div style={{ marginBottom: feedback.data.q1 ? '24px' : '0', paddingBottom: feedback.data.q1 ? '16px' : '0', borderBottom: feedback.data.q1 ? '1px solid var(--color-border)' : 'none' }}>
            <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{feedback.data.content}</p>
          </div>
        )}
        {feedback.data.q1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Q. どんな感情になったか</div>
              <div style={{ fontWeight: 500 }}>{feedback.data.q1}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Q. どこでそう感じたか</div>
              <div style={{ fontWeight: 500 }}>{feedback.data.q2 || '（未回答）'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Q. その理由は</div>
              <div style={{ fontWeight: 500 }}>{feedback.data.q3 || '（未回答）'}</div>
            </div>
          </div>
        )}
      </div>

      <button className="btn-primary" onClick={handleEdit}>
        <Edit3 size={18} />
        内容を修正する
      </button>
    </div>
  );
}
