import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useInitializeAuth } from './useInitializeAuth';
import { createMockServices, createTestStore, renderHookWithProviders } from '@/shared/lib/test/renderWithProviders';
import type { IUser } from './types';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useInitializeAuth', () => {
  it('should clear the session when there is no stored token', async () => {
    const services = createMockServices({
      userService: { getToken: vi.fn().mockReturnValue(null) },
    });
    const store = createTestStore({ session: { user, accessToken: 'stale-token' } });

    renderHookWithProviders(() => useInitializeAuth(), { services, store });

    await waitFor(() => expect(store.getState().session).toEqual({ user: null, accessToken: null }));
    expect(services.userService.fetchMe).not.toHaveBeenCalled();
  });

  it('should set the session from the fetched user when a stored token is valid', async () => {
    const services = createMockServices({
      userService: {
        getToken: vi.fn().mockReturnValue('valid-token'),
        fetchMe: vi.fn().mockResolvedValue(user),
      },
    });

    const { store } = renderHookWithProviders(() => useInitializeAuth(), { services });

    await waitFor(() =>
      expect(store.getState().session).toEqual({ user, accessToken: 'valid-token' }),
    );
  });

  it('should clear the token and session when fetching the current user fails', async () => {
    const services = createMockServices({
      userService: {
        getToken: vi.fn().mockReturnValue('expired-token'),
        fetchMe: vi.fn().mockRejectedValue(new Error('Unauthorized')),
      },
    });
    const store = createTestStore({ session: { user, accessToken: 'expired-token' } });

    renderHookWithProviders(() => useInitializeAuth(), { services, store });

    await waitFor(() => expect(services.userService.clearToken).toHaveBeenCalled());
    expect(store.getState().session).toEqual({ user: null, accessToken: null });
  });
});
