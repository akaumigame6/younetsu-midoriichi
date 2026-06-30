import { useParams } from 'react-router-dom';
import { MessageCircle, Heart } from 'lucide-react';
import { findCreatorByToken, getFeedbacksByCreatorId } from '../../data/mockData';

/**
 * CreatorFeedbackView - 作家向け感想閲覧ページ
 * URLパラメータの shareToken を使って作家を特定し、
 * 自分宛ての感想を一覧表示する。既読反応も送れる。
 */
export default function CreatorFeedbackView() {
  const { token } = useParams<{ token: string }>();

  const creator = token ? findCreatorByToken(token) : null;
  const feedbacks = creator ? getFeedbacksByCreatorId(creator.id) : [];

  if (!creator) {
    return (
      <div className="content-area" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="title">ページが見つかりません</h1>
        <p className="subtitle">URLが正しいかご確認ください。</p>
      </div>
    );
  }

  return (
    <div className="content-area fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '2rem',
        }}>
          🎨
        </div>
        <h1 className="title" style={{ margin: 0 }}>{creator.name}</h1>
        <p className="subtitle" style={{ marginTop: '8px', marginBottom: 0 }}>{creator.description}</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
          寄せられた感想
          <span style={{
            marginLeft: '8px',
            fontSize: '0.9rem',
            fontWeight: 400,
            color: 'var(--color-text-light)',
          }}>
            ({feedbacks.length}件)
          </span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {feedbacks.map((fb) => (
          <div key={fb.id} className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-light)',
                fontSize: '0.85rem',
              }}>
                <MessageCircle size={16} />
                <span>{new Date(fb.createdAt).toLocaleDateString('ja-JP')}</span>
              </div>
              {fb.reaction === 'read' && (
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF9C4',
                  color: '#7C6D00',
                  border: '1px solid #F0D000',
                }}>
                  ❤️ 既読
                </span>
              )}
            </div>

            {fb.feedbackData.type === 'free' ? (
              <p style={{ whiteSpace: 'pre-wrap' }}>{fb.feedbackData.content}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Q. どんな感情になったか</div>
                  <div style={{ fontWeight: 500 }}>{fb.feedbackData.q1}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Q. どこでそう感じたか</div>
                  <div style={{ fontWeight: 500 }}>{fb.feedbackData.q2}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Q. その理由は</div>
                  <div style={{ fontWeight: 500 }}>{fb.feedbackData.q3}</div>
                </div>
              </div>
            )}

            {fb.reaction !== 'read' && (
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    // TODO: Supabase で既読フラグを更新
                    alert('既読にしました（API実装後に動作します）');
                  }}
                >
                  <Heart size={16} />
                  既読にする
                </button>
              </div>
            )}
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--color-text-light)',
            padding: '60px 0',
          }}>
            <MessageCircle size={40} style={{ marginBottom: '16px', opacity: 0.4 }} />
            <p>まだ感想は届いていません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
