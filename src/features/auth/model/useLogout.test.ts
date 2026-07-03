import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useLogout } from './useLogout';
import { createMockServices, createTestStore, renderHookWithProviders } from '@/shared/lib/test/renderWithProviders';
import type { IUser } from '@/entities/user';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useLogout', () => {
  it('should clear the stored token and the session on success', async () => {
    const services = createMockServices();
    const store = createTestStore({ session: { user, accessToken: 'token-123' } });

    const { result } = renderHookWithProviders(() => useLogout(), { services, store });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(services.userService.clearToken).toHaveBeenCalledOnce();
    expect(store.getState().session).toEqual({ user: null, accessToken: null });
  });
});
