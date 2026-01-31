export interface SavedSession {

}

export class SessionManager {
  private static SESSION_KEY = 'mezon_chat_session';

  static saveSession(session: any, user: any): void {
    if (!session || !user) return;
    
    // Save everything from session plus user info
    const savedSession: SavedSession = {
      ...session, // Spread original session to keep all fields
      api_url: session.api_url || 'https://api.mezon.ai',
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };

    try {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(savedSession));
      console.log('✅ Session saved to sessionStorage', savedSession);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  static restoreSession(): SavedSession | null {
    try {
      const saved = sessionStorage.getItem(this.SESSION_KEY);
      if (!saved) return null;

      const session: SavedSession = JSON.parse(saved);

      // Check if expired
      if (Date.now() > session.expires_at) {
        console.log('Session expired, removing...');
        this.clearSession();
        return null;
      }

      console.log('✅ Session restored from sessionStorage');
      return session;
    } catch (error) {
      console.error('Failed to restore session:', error);
      return null;
    }
  }

  static clearSession(): void {
    try {
      sessionStorage.removeItem(this.SESSION_KEY);
      console.log('Session cleared');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  static hasValidSession(): boolean {
    const session = this.restoreSession();
    return session !== null;
  }
}
