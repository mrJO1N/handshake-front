import { useMutation } from '@tanstack/react-query';
import { userService } from '@/entities/user';
import type { RegisterDto } from '@/entities/user';
import { setSession } from '@/entities/session';
import { useDispatch } from 'react-redux';

export const useRegister = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (dto: RegisterDto) => userService.register(dto),
    onSuccess: ({ user, accessToken }) => {
      userService.saveToken(accessToken)
      dispatch(setSession({ user, accessToken })); // token to Redux
    },
  });
};
