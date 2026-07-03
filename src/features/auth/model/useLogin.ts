import { useMutation } from '@tanstack/react-query';
import { useUserService } from '@/entities/user';
import { setSession } from '@/entities/session';
import type { LoginDto } from '@/entities/user';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
  const userService = useUserService();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (dto: LoginDto) => userService.login(dto),
    onSuccess: ({ user, accessToken }) => {
      userService.saveToken(accessToken)
      dispatch(setSession({user, accessToken}))
    },
  });
};