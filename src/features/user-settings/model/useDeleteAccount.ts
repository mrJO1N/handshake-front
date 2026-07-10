import { useMutation } from '@tanstack/react-query';
import { userService } from '@/entities/user';
import { clearSession } from '@/entities/session';
import { useDispatch } from 'react-redux';

export const useDeleteAccount = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: () => {
      userService.clearToken();
      dispatch(clearSession());
    },
  });
};
