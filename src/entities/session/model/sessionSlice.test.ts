import { describe, it, expect } from 'vitest';
import { sessionReducer, setSession, clearSession } from './sessionSlice';
import type { IUser } from '@/entities/user';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('sessionSlice', () => {
  it('should return the initial state', () => {
    const state = sessionReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ user: null, accessToken: null });
  });

  it('should store user and accessToken on setSession', () => {
    const state = sessionReducer(undefined, setSession({ user, accessToken: 'token-123' }));
    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe('token-123');
  });

  it('should clear user and accessToken on clearSession', () => {
    const loggedInState = sessionReducer(undefined, setSession({ user, accessToken: 'token-123' }));
    const state = sessionReducer(loggedInState, clearSession());
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });
});
