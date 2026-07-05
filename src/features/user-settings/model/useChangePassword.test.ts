import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useChangePassword } from './useChangePassword';
import { createMockServices, renderHookWithProviders } from '@/app/test/renderWithProviders';
import type { ChangePasswordDto, IUser } from '@/entities/user';

const dto: ChangePasswordDto = { currentPassword: 'old-secret', newPassword: 'new-secret' };
const user: IUser = { id: '1', email: 'user@example.com', username: 'user' };

describe('useChangePassword', () => {
  it('should call userService.changePassword with the dto', async () => {
    const services = createMockServices({
      userService: { changePassword: vi.fn().mockResolvedValue(user) },
    });

    const { result } = renderHookWithProviders(() => useChangePassword(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(services.userService.changePassword).toHaveBeenCalledWith(dto);
  });

  it('should surface an error when changing the password fails', async () => {
    const services = createMockServices({
      userService: { changePassword: vi.fn().mockRejectedValue(new Error('Invalid current password')) },
    });

    const { result } = renderHookWithProviders(() => useChangePassword(), { services });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
