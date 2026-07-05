import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useUpdateProfile } from './useUpdateProfile';
import { createMockServices, createTestStore, renderHookWithProviders } from '@/app/test/renderWithProviders';
import type { IUser, UpdateProfileDto } from '@/entities/user';

const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };
const updatedUser: IUser = { id: '1', email: 'new@example.com', username: 'newname' };
const dto: UpdateProfileDto = { email: updatedUser.email, username: updatedUser.username };

describe('useUpdateProfile', () => {
  it('should update the session user in the store on success', async () => {
    const services = createMockServices({
      userService: { updateProfile: vi.fn().mockResolvedValue(updatedUser) },
    });
    const store = createTestStore({ session: { user, accessToken: 'token-123' } });

    const { result } = renderHookWithProviders(() => useUpdateProfile(), { services, store });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(store.getState().session.user).toEqual(updatedUser);
    expect(store.getState().session.accessToken).toBe('token-123');
  });

  it('should leave the store untouched when the mutation fails', async () => {
    const services = createMockServices({
      userService: { updateProfile: vi.fn().mockRejectedValue(new Error('Conflict')) },
    });
    const store = createTestStore({ session: { user, accessToken: 'token-123' } });

    const { result } = renderHookWithProviders(() => useUpdateProfile(), { services, store });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(store.getState().session.user).toEqual(user);
  });
});
