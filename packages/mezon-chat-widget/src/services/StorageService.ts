/**
 * Storage Service
 * Handles session persistence to localStorage
 */

import type { ISessionService } from './interfaces';

const SESSION_KEY = 'mezon_light_chat_session';

export class StorageService implements ISessionService {
  private storage: Storage = localStorage;

  save(session: any): void {
    try {
      this.storage.setItem(SESSION_KEY, JSON.stringify(session));
      console.log('✅ Session saved to localStorage', session);
    } catch (error) {
      console.error('[StorageService] Failed to save session:', error);
    }
  }

  restore(): any | null {
    try {
      const data = this.storage.getItem(SESSION_KEY);
      if (!data) return null;

      const session = JSON.parse(data);
      console.log('✅ Session restored from localStorage', session);
      return session;
    } catch (error) {
      console.error('[StorageService] Failed to restore session:', error);
      this.clear();
      return null;
    }
  }

  clear(): void {
    try {
      this.storage.removeItem(SESSION_KEY);
      console.log('Session cleared from localStorage');
    } catch (error) {
      console.error('[StorageService] Failed to clear session:', error);
    }
  }

  hasSession(): boolean {
    return this.restore() !== null;
  }
}
