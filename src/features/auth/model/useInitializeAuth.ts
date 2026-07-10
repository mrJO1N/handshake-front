import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/entities/user';
import { setSession, clearSession } from '@/entities/session';
import { useDispatch } from 'react-redux';

export const useInitializeAuth = () => {
  const dispatch = useDispatch();

  const { data: user, isError } = useQuery({
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
  }, [user, isError, dispatch]);
};
