import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { googleLogout, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './authContext';
import type { GoogleUser } from './authTypes';

const STORAGE_KEY = 'google_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as GoogleUser;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });

  const login = useCallback((credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      setUser(decoded);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decoded));
    }
  }, []);

  const logout = useCallback(() => {
    googleLogout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
