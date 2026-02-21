import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-icon">&#10003;</span>
        <h1>Todo List</h1>
      </div>
      <div className="header-right">
        <img
          src={user.picture}
          alt={user.name}
          className="avatar"
          referrerPolicy="no-referrer"
        />
        <span className="user-name">{user.name}</span>
        <button className="sign-out-btn" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
