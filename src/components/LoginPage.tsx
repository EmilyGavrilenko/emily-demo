import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">&#10003;</div>
        <h1>Todo List</h1>
        <p>Sign in with Google to manage your tasks</p>
        <div className="google-btn-wrapper">
          <GoogleLogin
            onSuccess={login}
            onError={() => console.error('Google login failed')}
            theme="outline"
            size="large"
            shape="pill"
            text="signin_with"
          />
        </div>
      </div>
    </div>
  );
}
