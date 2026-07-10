import { useMutation } from '@tanstack/react-query';
import { userService } from '@/entities/user';
import { setSession, selectAccessToken } from '@/entities/session';
import type { UpdateProfileDto } from '@/entities/user';
import { useDispatch, useSelector } from 'react-redux';

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  return useMutation({
    mutationFn: (dto: UpdateProfileDto) => userService.updateProfile(dto),
    onSuccess: (user) => {
      if (!accessToken) return;
      dispatch(setSession({ user, accessToken }));
    },
  });
};
