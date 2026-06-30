import { useNavigate } from 'react-router-dom';
import { Edit3, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { useEventSettings } from '../../context/EventSettingsContext';
import { useViewerFeedback } from '../../context/ViewerFeedbackContext';
import { findCreatorById } from '../../data/mockData';

/**
 * ViewerMenu - 鑑賞者向けメニューページ
 * アンケートフロー完了後（または2回目以降アクセス時）に到達するマイページ。
 * メニュー選択型の画面。
 */
export default function ViewerMenu() {
  const navigate = useNavigate();
  const { settings } = useEventSettings();
  const { feedbacks } = useViewerFeedback();

  return (
    <div className="content-area fade-in" style={{ justifyContent: 'flex-start' }}>
      <h1 className="title" style={{ textAlign: 'center', marginBottom: '8px' }}>
        {settings.eventName}
      </h1>
      <p className="subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
        ご参加ありがとうございます
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button
          className="btn-primary"
          onClick={() => navigate('/survey/creators')}
        >
          <MessageSquare size={20} />
          作家に感想を送る
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            className="btn-secondary"
            onClick={() => navigate('/survey')}
          >
            <Edit3 size={20} />
            イベントアンケートに答える
          </button>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-light)',
            textAlign: 'center',
            margin: 0,
          }}>
            ✏️ すでに回答済みの方は、こちらから内容を変更できます
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '48px',
        padding: '16px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '0.85rem',
        color: 'var(--color-text-light)',
        textAlign: 'center',
      }}>
        感想は匿名で主催者作家に届けられます。
      </div>

      {feedbacks.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>送った感想</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {feedbacks.map(f => {
              const date = new Date(f.timestamp);
              const timeString = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
              
              let title = '';
              if (f.type === 'event') {
                title = 'イベント全体アンケート';
              } else if (f.type === 'creator' && f.creatorId) {
                const creator = findCreatorById(f.creatorId);
                title = creator ? `宛先: ${creator.name}` : '宛先: 不明な作家';
              }

              return (
                <button
                  key={f.id}
                  className="card"
                  onClick={() => navigate(`/viewer/feedback/${f.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                    transition: 'transform 0.1s, box-shadow 0.1s'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                      <Clock size={12} /> {timeString} に送信
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--color-text-light)" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
