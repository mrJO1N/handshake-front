import { useMutation } from '@tanstack/react-query';
import { useUserService } from '@/entities/user';
import type { ChangePasswordDto } from '@/entities/user';

export const useChangePassword = () => {
  const userService = useUserService();

  return useMutation({
    mutationFn: (dto: ChangePasswordDto) => userService.changePassword(dto),
  });
};
