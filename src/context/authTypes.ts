import type { CredentialResponse } from '@react-oauth/google';

export interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export interface AuthContextType {
  user: GoogleUser | null;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}
