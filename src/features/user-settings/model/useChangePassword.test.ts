import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useChangePassword } from './useChangePassword';
import { renderHookWithProviders } from '@/app/test/renderWithProviders';
import { userService, type ChangePasswordDto, type IUser } from '@/entities/user';

const dto: ChangePasswordDto = { currentPassword: 'old-secret', newPassword: 'new-secret' };
const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useChangePassword', () => {
  it('should call userService.changePassword with the dto', async () => {
    const changePasswordSpy = vi.spyOn(userService, 'changePassword').mockResolvedValue(user);

    const { result } = renderHookWithProviders(() => useChangePassword());

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(changePasswordSpy).toHaveBeenCalledWith(dto);
  });

  it('should surface an error when changing the password fails', async () => {
    vi.spyOn(userService, 'changePassword').mockRejectedValue(new Error('Invalid current password'));

    const { result } = renderHookWithProviders(() => useChangePassword());

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
