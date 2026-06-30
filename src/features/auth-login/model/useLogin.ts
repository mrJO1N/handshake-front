import { useMutation } from '@tanstack/react-query';
import { useUserService } from '@/entities/user';
import { useAppDispatch } from '@/app/store/hooks';
import { setSession } from '@/entities/session';
import type { LoginDto } from '@/entities/user';

export const useLogin = () => {
  const userService = useUserService();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (dto: LoginDto) => userService.login(dto),
    onSuccess: ({ user, accessToken }) => {
      dispatch(setSession({ user, accessToken })); // токен → Redux
    },
  });
};