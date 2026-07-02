import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserService } from './useUserService';
import { useAppDispatch } from '@/app/store/hooks';
import { setSession, clearSession } from '@/entities/session';

export const useInitializeAuth = () => {
  const userService = useUserService();
  const dispatch = useAppDispatch();

  const { data: user, isError, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = userService.getToken();
      if (!token) throw new Error('No token');
      return userService.fetchMe(token);
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const token = userService.getToken();

    if (!token) {
      dispatch(clearSession());
      return;
    }

    if (user) {
      dispatch(setSession({ user, accessToken: token }));
    }

    if (isError) {
      userService.clearToken();
      dispatch(clearSession());
    }
  }, [user, isError, dispatch, userService]);
};
