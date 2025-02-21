import { v4 as uuidv4 } from 'uuid';

// Types
export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  created_at: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export interface Profile extends Omit<User, 'password'> {}

// Mock database
class MockDB {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, string> = new Map(); // token -> userId

  // Auth methods
  async signUp(email: string, password: string): Promise<{ user: Profile | null; error: Error | null }> {
    if (Array.from(this.users.values()).some(u => u.email === email)) {
      return { user: null, error: new Error('User already exists') };
    }

    const user: User = {
      id: uuidv4(),
      email,
      password, // In real app, hash this
      created_at: new Date().toISOString(),
      full_name: null,
      avatar_url: null,
      updated_at: null,
    };

    this.users.set(user.id, user);
    return { user: this.toProfile(user), error: null };
  }

  async signIn(email: string, password: string): Promise<{ token: string | null; error: Error | null }> {
    const user = Array.from(this.users.values()).find(u => u.email === email && u.password === password);
    if (!user) {
      return { token: null, error: new Error('Invalid credentials') };
    }

    const token = uuidv4();
    this.sessions.set(token, user.id);
    return { token, error: null };
  }

  async getUser(token: string): Promise<{ user: Profile | null; error: Error | null }> {
    const userId = this.sessions.get(token);
    if (!userId) {
      return { user: null, error: new Error('Invalid session') };
    }

    const user = this.users.get(userId);
    return user ? { user: this.toProfile(user), error: null } : { user: null, error: new Error('User not found') };
  }

  async signOut(token: string): Promise<{ error: Error | null }> {
    this.sessions.delete(token);
    return { error: null };
  }

  // Helper methods
  private toProfile(user: User): Profile {
    const { password, ...profile } = user;
    return profile;
  }
}

export const mockDB = new MockDB();