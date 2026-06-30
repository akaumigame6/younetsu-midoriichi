import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // トップページとアンケートフロー最初のページはヘッダーを非表示
  if (location.pathname === '/' || location.pathname === '/survey') return null;

  const isAdmin = location.pathname.startsWith('/admin');

  const handleTitleClick = () => {
    if (isAdmin) navigate('/admin/dashboard');
    else navigate('/viewer');
  };

  return (
    <header
      className="header"
      style={{ justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
    >
      <button
        onClick={handleTitleClick}
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {isAdmin ? '⚙️ 主催者管理' : '感想スタンド'}
      </button>
    </header>
  );
}
