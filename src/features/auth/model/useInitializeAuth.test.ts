import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useInitializeAuth } from './useInitializeAuth';
import { createTestStore, renderHookWithProviders } from '@/app/test/renderWithProviders';
import { userService } from '@/entities/user';
import type { IUser } from '@/shared/contracts';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useInitializeAuth', () => {
  it('should clear the session when there is no stored token', async () => {
    vi.spyOn(userService, 'getToken').mockReturnValue(null);
    const fetchMeSpy = vi.spyOn(userService, 'fetchMe');
    const store = createTestStore({ session: { user, accessToken: 'stale-token' } });

    renderHookWithProviders(() => useInitializeAuth(), { store });

    await waitFor(() => expect(store.getState().session).toEqual({ user: null, accessToken: null }));
    expect(fetchMeSpy).not.toHaveBeenCalled();
  });

  it('should set the session from the fetched user when a stored token is valid', async () => {
    vi.spyOn(userService, 'getToken').mockReturnValue('valid-token');
    vi.spyOn(userService, 'fetchMe').mockResolvedValue(user);

    const { store } = renderHookWithProviders(() => useInitializeAuth());

    await waitFor(() =>
      expect(store.getState().session).toEqual({ user, accessToken: 'valid-token' }),
    );
  });

  it('should clear the token and session when fetching the current user fails', async () => {
    vi.spyOn(userService, 'getToken').mockReturnValue('expired-token');
    vi.spyOn(userService, 'fetchMe').mockRejectedValue(new Error('Unauthorized'));
    const clearTokenSpy = vi.spyOn(userService, 'clearToken').mockImplementation(() => {});
    const store = createTestStore({ session: { user, accessToken: 'expired-token' } });

    renderHookWithProviders(() => useInitializeAuth(), { store });

    await waitFor(() => expect(clearTokenSpy).toHaveBeenCalled());
    expect(store.getState().session).toEqual({ user: null, accessToken: null });
  });
});
