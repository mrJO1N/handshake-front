import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useRegister } from './useRegister';
import { createMockServices, renderHookWithProviders } from '@/shared/lib/test/renderWithProviders';
import type { AuthResponse, RegisterDto } from '@/entities/user';

const dto: RegisterDto = { email: 'user@example.com', username: 'user', password: 'secret1' };

const authResponse: AuthResponse = {
  accessToken: 'token-123',
  user: { id: '1', email: dto.email, username: dto.username },
};

describe('useRegister', () => {
  it('should dispatch setSession and save the token to the store on success', async () => {
    const services = createMockServices({
      userService: { register: vi.fn().mockResolvedValue(authResponse) },
    });

    const { result, store } = renderHookWithProviders(() => useRegister(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(store.getState().session.user).toEqual(authResponse.user);
    expect(store.getState().session.accessToken).toBe(authResponse.accessToken);
    expect(services.userService.saveToken).toHaveBeenCalledWith(authResponse.accessToken);
  });

  it('should leave the store untouched when the register mutation fails', async () => {
    const services = createMockServices({
      userService: { register: vi.fn().mockRejectedValue(new Error('Email taken')) },
    });

    const { result, store } = renderHookWithProviders(() => useRegister(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(store.getState().session).toEqual({ user: null, accessToken: null });
    expect(services.userService.saveToken).not.toHaveBeenCalled();
  });
});
