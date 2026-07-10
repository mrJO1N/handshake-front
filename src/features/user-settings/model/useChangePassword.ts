import { useMutation } from '@tanstack/react-query';
import { userService } from '@/entities/user';
import type { ChangePasswordDto } from '@/entities/user';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (dto: ChangePasswordDto) => userService.changePassword(dto),
  });
};
