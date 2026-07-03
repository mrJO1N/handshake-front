import { useMutation } from '@tanstack/react-query';
import { useUserService } from '@/entities/user';
import type { RegisterDto } from '@/entities/user';
import { setSession } from '@/entities/session';
import { useAppDispatch } from '@/app/store/hooks';

export const useRegister = () => {
  const userService = useUserService();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (dto: RegisterDto) => userService.register(dto),
    onSuccess: ({ user, accessToken }) => {
      userService.saveToken(accessToken)
      dispatch(setSession({ user, accessToken })); // token to Redux
    },
  });
};
