import { mockDB } from './mock-db';

class MockAuth {
  private static instance: MockAuth;
  private token: string | null = null;

  private constructor() {
    // Load token from localStorage in client-side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('mock_auth_token');
    }
  }

  static getInstance(): MockAuth {
    if (!MockAuth.instance) {
      MockAuth.instance = new MockAuth();
    }
    return MockAuth.instance;
  }

  async signUp(email: string, password: string) {
    return mockDB.signUp(email, password);
  }

  async signIn(email: string, password: string) {
    const { token, error } = await mockDB.signIn(email, password);
    if (token) {
      this.token = token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_auth_token', token);
      }
    }
    return { token, error };
  }

  async signOut() {
    if (this.token) {
      await mockDB.signOut(this.token);
      this.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_auth_token');
      }
    }
    return { error: null };
  }

  async getUser() {
    if (!this.token) {
      return { user: null, error: null };
    }
    return mockDB.getUser(this.token);
  }
}

export const mockAuth = MockAuth.getInstance();