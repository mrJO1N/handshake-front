import { useMutation } from '@tanstack/react-query';
import { useUserService } from '@/entities/user';
import type { RegisterDto } from '@/entities/user';

export const useRegister = () => {
  const userService = useUserService();
  return useMutation({
    mutationFn: (dto: RegisterDto) => userService.register(dto),
  });
};