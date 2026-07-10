import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useDeleteAccount } from './useDeleteAccount';
import { createTestStore, renderHookWithProviders } from '@/app/test/renderWithProviders';
import { userService, type IUser } from '@/entities/user';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useDeleteAccount', () => {
  it('should clear the stored token and the session on success', async () => {
    vi.spyOn(userService, 'deleteAccount').mockResolvedValue(undefined);
    const clearTokenSpy = vi.spyOn(userService, 'clearToken').mockImplementation(() => {});
    const store = createTestStore({ session: { user, accessToken: 'token-123' } });

    const { result } = renderHookWithProviders(() => useDeleteAccount(), { store });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(clearTokenSpy).toHaveBeenCalledOnce();
    expect(store.getState().session).toEqual({ user: null, accessToken: null });
  });
});
