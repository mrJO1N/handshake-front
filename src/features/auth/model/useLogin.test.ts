import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useLogin } from './useLogin';
import { renderHookWithProviders } from '@/app/test/renderWithProviders';
import { userService, type AuthResponse, type LoginDto } from '@/entities/user';

const dto: LoginDto = { email: 'user@example.com', password: 'secret1' };

const authResponse: AuthResponse = {
  accessToken: 'token-123',
  user: { id: '1', email: dto.email, username: 'user' },
};

describe('useLogin', () => {
  it('should dispatch setSession and save the token to the store on success', async () => {
    vi.spyOn(userService, 'login').mockResolvedValue(authResponse);
    const saveTokenSpy = vi.spyOn(userService, 'saveToken').mockImplementation(() => {});

    const { result, store } = renderHookWithProviders(() => useLogin());

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(store.getState().session.user).toEqual(authResponse.user);
    expect(store.getState().session.accessToken).toBe(authResponse.accessToken);
    expect(saveTokenSpy).toHaveBeenCalledWith(authResponse.accessToken);
  });

  it('should leave the store untouched when the login mutation fails', async () => {
    vi.spyOn(userService, 'login').mockRejectedValue(new Error('Invalid credentials'));
    const saveTokenSpy = vi.spyOn(userService, 'saveToken').mockImplementation(() => {});

    const { result, store } = renderHookWithProviders(() => useLogin());

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(store.getState().session).toEqual({ user: null, accessToken: null });
    expect(saveTokenSpy).not.toHaveBeenCalled();
  });
});
