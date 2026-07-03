import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useLogin } from './useLogin';
import { createMockServices, renderHookWithProviders } from '@/app/test/renderWithProviders';
import type { AuthResponse, LoginDto } from '@/entities/user';

const dto: LoginDto = { email: 'user@example.com', password: 'secret1' };

const authResponse: AuthResponse = {
  accessToken: 'token-123',
  user: { id: '1', email: dto.email, username: 'user' },
};

describe('useLogin', () => {
  it('should dispatch setSession and save the token to the store on success', async () => {
    const services = createMockServices({
      userService: { login: vi.fn().mockResolvedValue(authResponse) },
    });

    const { result, store } = renderHookWithProviders(() => useLogin(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(store.getState().session.user).toEqual(authResponse.user);
    expect(store.getState().session.accessToken).toBe(authResponse.accessToken);
    expect(services.userService.saveToken).toHaveBeenCalledWith(authResponse.accessToken);
  });

  it('should leave the store untouched when the login mutation fails', async () => {
    const services = createMockServices({
      userService: { login: vi.fn().mockRejectedValue(new Error('Invalid credentials')) },
    });

    const { result, store } = renderHookWithProviders(() => useLogin(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(store.getState().session).toEqual({ user: null, accessToken: null });
    expect(services.userService.saveToken).not.toHaveBeenCalled();
  });
});
