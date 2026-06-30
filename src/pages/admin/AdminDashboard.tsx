import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BarChart2, Copy, Check, LogOut, ExternalLink,
  Settings, MessageSquare, Save, GripVertical, ChevronDown, ChevronUp, ChevronRight
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { mockCreators, mockFeedbacks, mockSurveys } from '../../data/mockData';
import { useEventSettings } from '../../context/EventSettingsContext';

type TabKey = 'overview' | 'creators' | 'creator-settings' | 'event-settings' | 'questions';

// ============================
// タブ: 感想概要
// ============================
function TabOverview() {
  const navigate = useNavigate();
  const totalFeedbacks = mockFeedbacks.length;
  const totalSurveys = mockSurveys.length;
  const feedbacksByCreator = mockCreators.map((c) => ({
    ...c,
    count: mockFeedbacks.filter((f) => f.creatorId === c.id).length,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* サマリー数値 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div 
          className="card" 
          style={{ textAlign: 'center', padding: '12px', cursor: 'pointer', transition: 'all 0.2s', border: '2px solid transparent' }}
          onClick={() => navigate('/admin/event-survey')}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{totalSurveys}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '2px' }}>イベント回答</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '12px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{totalFeedbacks}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '2px' }}>感想総数</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '12px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{mockCreators.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '2px' }}>参加作家数</div>
        </div>
      </div>

      {/* 作家別 受信感想数 */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>作家別 受信感想数（詳細確認）</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {feedbacksByCreator.map((c) => (
            <button 
              key={c.id} 
              className="card" 
              onClick={() => navigate(`/admin/creator/${c.id}`)}
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', textAlign: 'left', transition: 'transform 0.1s, box-shadow 0.1s'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, marginBottom: '2px' }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  {c.count > 0 ? `${c.count}件の感想が届いています` : 'まだ感想はありません'}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: c.count > 0 ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                  {c.count}
                </div>
                <ChevronRight size={18} color="var(--color-text-light)" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* イベントアンケート直近 */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>イベントアンケート (直近3件)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {mockSurveys.slice(0, 3).map((s) => (
            <div key={s.id} className="card" style={{ padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>
                {new Date(s.createdAt).toLocaleString()}
              </div>
              {s.surveyData.type === 'free' ? (
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{s.surveyData.content}</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--color-text-light)' }}>感情:</span> {s.surveyData.q1}</div>
                  <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--color-text-light)' }}>理由:</span> {s.surveyData.q3}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================
// タブ: 作家管理・URL発行
// ============================
function TabCreators() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopyUrl = (token: string) => {
    const url = `${window.location.origin}/YouNetsu/creator/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        各作家にURLをコピーして共有してください。作家はそのURLから自分宛ての感想を閲覧できます。
      </p>
      {mockCreators.map((creator) => {
        const shareUrl = `${window.location.origin}/YouNetsu/creator/${creator.shareToken}`;
        const isCopied = copiedToken === creator.shareToken;
        return (
          <div key={creator.id} className="card">
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{creator.name}</div>
            <div style={{
              fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '12px',
              wordBreak: 'break-all', fontFamily: 'monospace',
              backgroundColor: '#f5f5f5', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            }}>
              {shareUrl}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleCopyUrl(creator.shareToken)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px', borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isCopied ? '#4CAF50' : 'var(--color-border)'}`,
                  backgroundColor: isCopied ? '#E8F5E9' : 'var(--color-surface)',
                  color: isCopied ? '#2E7D32' : 'var(--color-text)',
                  fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? 'コピー済み' : 'URLをコピー'}
              </button>
              <a
                href={shareUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-light)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'none',
                }}
              >
                <ExternalLink size={16} />確認
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================
// タブ: 作家個別設定
// ============================
function TabCreatorSettings() {
  const [creators, setCreators] = useState(
    mockCreators.map((c) => ({ ...c, visible: true }))
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const updateCreator = (id: string, key: string, value: string | boolean) => {
    setCreators((prev) => prev.map((c) => c.id === id ? { ...c, [key]: value } : c));
  };

  const handleAddCreator = () => {
    const newId = `creator${Date.now()}`;
    const newCreator = {
      id: newId,
      name: '新規作家',
      description: 'プロフィールを入力してください',
      iconUrl: '',
      shareToken: `token-${newId}`,
      visible: true
    };
    setCreators(prev => [...prev, newCreator]);
    setExpandedId(newId);
  };

  const handleDeleteCreator = (id: string) => {
    if (window.confirm('この作家を削除しますか？\n（関連する感想データも今後表示されなくなります）')) {
      setCreators(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    // TODO: Supabaseへの保存処理
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        各作家のプロフィール・表示設定を管理します。
      </p>
      {creators.map((creator) => (
        <div key={creator.id} className="card" style={{ padding: '16px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setExpandedId(expandedId === creator.id ? null : creator.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GripVertical size={16} color="var(--color-text-light)" />
              <span style={{ fontWeight: 700 }}>{creator.name}</span>
              {!creator.visible && (
                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#f5f5f5', color: 'var(--color-text-light)' }}>
                  非表示
                </span>
              )}
            </div>
            {expandedId === creator.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {expandedId === creator.id && (
            <div className="fade-in" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">表示名</label>
                <input type="text" className="input-text"
                  value={creator.name}
                  onChange={(e) => updateCreator(creator.id, 'name', e.target.value)}
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">プロフィール文</label>
                <textarea className="input-text" style={{ minHeight: '80px' }}
                  value={creator.description ?? ''}
                  onChange={(e) => updateCreator(creator.id, 'description', e.target.value)}
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">アイコン画像URL (SVG DataURL等)</label>
                <input type="text" className="input-text"
                  value={creator.iconUrl ?? ''}
                  placeholder="https://... または data:image/..."
                  onChange={(e) => updateCreator(creator.id, 'iconUrl', e.target.value)}
                />
                {creator.iconUrl && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>プレビュー:</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                      <img src={creator.iconUrl} alt="icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>一覧に表示する</span>
                <button
                  onClick={() => updateCreator(creator.id, 'visible', !creator.visible)}
                  style={{
                    width: '48px', height: '28px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                    backgroundColor: creator.visible ? 'var(--color-primary)' : 'var(--color-border)',
                    transition: 'background-color 0.2s', position: 'relative', flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
                    position: 'absolute', top: '4px', transition: 'left 0.2s',
                    left: creator.visible ? '24px' : '4px',
                  }} />
                </button>
              </div>
              
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleDeleteCreator(creator.id)}
                  style={{ 
                    backgroundColor: 'transparent', border: '1px solid #f44336', color: '#f44336', 
                    padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.85rem' 
                  }}
                >
                  この作家を削除する
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button 
        onClick={handleAddCreator}
        style={{
          width: '100%', padding: '12px', backgroundColor: 'transparent', 
          border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-light)', cursor: 'pointer', fontWeight: 600,
          marginTop: '8px', marginBottom: '16px'
        }}
      >
        + 新規作家を追加する
      </button>

      <button className="btn-primary" onClick={handleSave}>
        {saved ? <><Check size={18} /> 保存しました</> : <><Save size={18} /> 設定を保存</>}
      </button>
    </div>
  );
}

// ============================
// タブ: イベント全体設定
// ============================
function TabEventSettings() {
  const { settings, updateSettings } = useEventSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const eventSurveyUrl = `${window.location.origin}/YouNetsu/survey`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(eventSurveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    updateSettings(localSettings);
    // TODO: Supabaseへの保存処理
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        イベント全体に関する設定を管理します。
      </p>

      <div className="input-group" style={{ marginBottom: 0 }}>
        <label className="input-label">イベント名</label>
        <input type="text" className="input-text" value={localSettings.eventName} onChange={(e) => setLocalSettings({...localSettings, eventName: e.target.value})} />
      </div>

      <div className="input-group" style={{ marginBottom: 0 }}>
        <label className="input-label">イベント説明文（鑑賞者ページに表示）</label>
        <textarea className="input-text" style={{ minHeight: '80px' }}
          placeholder="このイベントについての説明..."
          value={localSettings.eventDesc} onChange={(e) => setLocalSettings({...localSettings, eventDesc: e.target.value})}
        />
      </div>

      <div className="input-group" style={{ marginBottom: 0 }}>
        <label className="input-label">会場名</label>
        <input type="text" className="input-text" placeholder="例：〇〇ギャラリー"
          value={localSettings.venue} onChange={(e) => setLocalSettings({...localSettings, venue: e.target.value})} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">開催開始日</label>
          <input type="date" className="input-text" value={localSettings.dateFrom} onChange={(e) => setLocalSettings({...localSettings, dateFrom: e.target.value})} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">開催終了日</label>
          <input type="date" className="input-text" value={localSettings.dateTo} onChange={(e) => setLocalSettings({...localSettings, dateTo: e.target.value})} />
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px', backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
      }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>イベントアンケートを有効にする</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            OFFにすると鑑賞者はアンケートをスキップして作家の感想送信へ直接進みます
          </div>
        </div>
        <button
          onClick={() => setLocalSettings({...localSettings, surveyEnabled: !localSettings.surveyEnabled})}
          style={{
            width: '48px', height: '28px', borderRadius: '14px', border: 'none', cursor: 'pointer',
            backgroundColor: localSettings.surveyEnabled ? 'var(--color-primary)' : 'var(--color-border)',
            transition: 'background-color 0.2s', position: 'relative', flexShrink: 0, marginLeft: '12px',
          }}
        >
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
            position: 'absolute', top: '4px', transition: 'left 0.2s',
            left: localSettings.surveyEnabled ? '24px' : '4px',
          }} />
        </button>
      </div>
      <div style={{
        marginTop: '16px', padding: '24px', backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-primary)' }}>鑑賞者用アンケートの共有</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)', textAlign: 'center' }}>
          会場に掲示して、鑑賞者にスマートフォンからアクセスしてもらいます。
        </p>
        
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <QRCode value={eventSurveyUrl} size={160} />
        </div>

        <div style={{ width: '100%', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            readOnly 
            value={eventSurveyUrl} 
            className="input-text" 
            style={{ marginBottom: 0, flex: 1, backgroundColor: '#f5f5f5', color: 'var(--color-text-light)' }} 
          />
          <button 
            onClick={handleCopyUrl}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px',
              backgroundColor: copied ? '#E8F5E9' : 'var(--color-surface)',
              color: copied ? '#2E7D32' : 'var(--color-text)',
              border: `1px solid ${copied ? '#4CAF50' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', flexShrink: 0
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'コピー済み' : 'コピー'}
          </button>
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave}>
        {saved ? <><Check size={18} /> 保存しました</> : <><Save size={18} /> 設定を保存</>}
      </button>
    </div>
  );
}

// ============================
// タブ: 質問例文設定
// ============================
const DEFAULT_QUESTIONS = {
  eventQ2Placeholder: '例：展示の雰囲気、作品の配置など',
  eventQ2Label: 'どこでそう感じましたか？',
  eventQ3Placeholder: '例：自分の経験や思い出と結びついたから',
  eventQ3Label: 'なぜそう感じたのでしょうか？',
  creatorQ2Placeholder: '例：鮮やかな色使い、繊細な線',
  creatorQ2Label: '作品のどの部分に惹かれましたか？',
  creatorQ3Placeholder: '例：昔の思い出と重なったから',
  creatorQ3Label: 'なぜそう感じたのでしょうか？',
  freeEventPlaceholder: '例：素晴らしい空間でした。特に〇〇が印象に残りました。',
  freeCreatorPlaceholder: '例：とても素敵な作品でした。特に〇〇の表現が...',
};

function TabQuestions() {
  const [q, setQ] = useState(DEFAULT_QUESTIONS);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof DEFAULT_QUESTIONS, value: string) => {
    setQ((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Supabaseへの保存処理
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-light)', marginBottom: '4px', marginTop: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
      {children}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        3つの質問フォームと自由記述のプレースホルダー・ラベルを変更できます。
      </p>

      <SectionTitle>📋 イベントアンケート（3つの質問）</SectionTitle>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q2 ラベル（どこで感じたか）</label>
          <input type="text" className="input-text" value={q.eventQ2Label} onChange={(e) => update('eventQ2Label', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q2 プレースホルダー</label>
          <input type="text" className="input-text" value={q.eventQ2Placeholder} onChange={(e) => update('eventQ2Placeholder', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q3 ラベル（その理由）</label>
          <input type="text" className="input-text" value={q.eventQ3Label} onChange={(e) => update('eventQ3Label', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q3 プレースホルダー</label>
          <input type="text" className="input-text" value={q.eventQ3Placeholder} onChange={(e) => update('eventQ3Placeholder', e.target.value)} />
        </div>
      </div>

      <SectionTitle>🎨 作家への感想（3つの質問）</SectionTitle>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q2 ラベル（どこで感じたか）</label>
          <input type="text" className="input-text" value={q.creatorQ2Label} onChange={(e) => update('creatorQ2Label', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q2 プレースホルダー</label>
          <input type="text" className="input-text" value={q.creatorQ2Placeholder} onChange={(e) => update('creatorQ2Placeholder', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q3 ラベル（その理由）</label>
          <input type="text" className="input-text" value={q.creatorQ3Label} onChange={(e) => update('creatorQ3Label', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Q3 プレースホルダー</label>
          <input type="text" className="input-text" value={q.creatorQ3Placeholder} onChange={(e) => update('creatorQ3Placeholder', e.target.value)} />
        </div>
      </div>

      <SectionTitle>📝 自由記述フォーム</SectionTitle>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">イベントアンケート プレースホルダー</label>
          <input type="text" className="input-text" value={q.freeEventPlaceholder} onChange={(e) => update('freeEventPlaceholder', e.target.value)} />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">作家への感想 プレースホルダー</label>
          <input type="text" className="input-text" value={q.freeCreatorPlaceholder} onChange={(e) => update('freeCreatorPlaceholder', e.target.value)} />
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave}>
        {saved ? <><Check size={18} /> 保存しました</> : <><Save size={18} /> 設定を保存</>}
      </button>
    </div>
  );
}

// ============================
// AdminDashboard (親コンポーネント)
// ============================
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview',         label: '感想概要',       icon: <BarChart2 size={15} /> },
    { key: 'creators',         label: 'URL発行',         icon: <Copy size={15} /> },
    { key: 'creator-settings', label: '作家設定',        icon: <Users size={15} /> },
    { key: 'event-settings',   label: 'イベント設定',    icon: <Settings size={15} /> },
    { key: 'questions',        label: '質問例文',        icon: <MessageSquare size={15} /> },
  ];

  return (
    <div className="content-area fade-in">
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="title" style={{ margin: 0 }}>管理ダッシュボード</h1>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)', fontSize: '0.85rem',
            color: 'var(--color-text-light)', cursor: 'pointer',
          }}
          onClick={() => navigate('/admin')}
        >
          <LogOut size={14} />
          ログアウト
        </button>
      </div>

      {/* Tab bar - 2行レイアウト（5タブ対応） */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4px',
        marginBottom: '8px',
        backgroundColor: 'var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px',
      }}>
        {tabs.slice(0, 3).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              padding: '10px 8px', borderRadius: 'calc(var(--radius-sm) - 2px)',
              fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
              backgroundColor: activeTab === tab.key ? 'var(--color-surface)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-light)',
              boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
              border: 'none', cursor: 'pointer',
            }}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4px',
        marginBottom: '20px',
        backgroundColor: 'var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px',
      }}>
        {tabs.slice(3).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              padding: '10px 8px', borderRadius: 'calc(var(--radius-sm) - 2px)',
              fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
              backgroundColor: activeTab === tab.key ? 'var(--color-surface)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-light)',
              boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
              border: 'none', cursor: 'pointer',
            }}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview'         && <TabOverview />}
      {activeTab === 'creators'         && <TabCreators />}
      {activeTab === 'creator-settings' && <TabCreatorSettings />}
      {activeTab === 'event-settings'   && <TabEventSettings />}
      {activeTab === 'questions'        && <TabQuestions />}
    </div>
  );
}
