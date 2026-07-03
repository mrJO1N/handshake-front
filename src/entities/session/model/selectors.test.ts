import { describe, it, expect } from 'vitest';
import { selectUser, selectAccessToken, selectIsAuth } from './selectors';
import type { RootState } from '@/app/store';
import type { IUser } from '@/entities/user';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

const buildState = (session: RootState['session']): RootState => ({ session });

describe('session selectors', () => {
  it('selectUser should return the user from state', () => {
    const state = buildState({ user, accessToken: 'token' });
    expect(selectUser(state)).toEqual(user);
  });

  it('selectAccessToken should return the token from state', () => {
    const state = buildState({ user, accessToken: 'token' });
    expect(selectAccessToken(state)).toBe('token');
  });

  it('selectIsAuth should return true when accessToken is present', () => {
    const state = buildState({ user, accessToken: 'token' });
    expect(selectIsAuth(state)).toBe(true);
  });

  it('selectIsAuth should return false when accessToken is absent', () => {
    const state = buildState({ user: null, accessToken: null });
    expect(selectIsAuth(state)).toBe(false);
  });
});
