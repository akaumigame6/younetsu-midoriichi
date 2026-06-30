import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';

/**
 * AdminLogin - イベント主催者ログインページ
 * 現段階ではモックのみ。SupabaseのAuth実装後に接続。
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth でのログイン
    // モックとして固定値でログイン可能にしておく
    if (email === 'admin@example.com' && password === 'password') {
      navigate('/admin/dashboard');
    } else {
      setError('メールアドレスまたはパスワードが違います。\n（デモ: admin@example.com / password）');
    }
  };

  return (
    <div
      className="content-area fade-in"
      style={{ justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚙️</div>
        <h1 className="title" style={{ margin: 0 }}>主催者ログイン</h1>
        <p className="subtitle" style={{ marginTop: '8px', marginBottom: 0 }}>
          イベント主催者専用ページです。
        </p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label" htmlFor="email">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> メールアドレス
            </span>
          </label>
          <input
            id="email"
            type="email"
            className="input-text"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label" htmlFor="password">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} /> パスワード
            </span>
          </label>
          <input
            id="password"
            type="password"
            className="input-text"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FFF3CD',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #FFD970',
            fontSize: '0.85rem',
            color: '#856404',
            whiteSpace: 'pre-wrap',
          }}>
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary">
          <LogIn size={20} />
          ログイン
        </button>
      </form>

      <div style={{
        marginTop: '32px',
        padding: '12px 16px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        fontSize: '0.8rem',
        color: 'var(--color-text-light)',
        textAlign: 'center',
      }}>
        🔒 このページはイベント主催者のみアクセスできます
      </div>
    </div>
  );
}
