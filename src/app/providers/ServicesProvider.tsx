import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { httpClient } from '@/shared/api';
import { createUserService, type UserService } from '@/entities/user';
import { createPostService, type PostService } from '@/entities/post';

interface Services {
  userService: UserService;
  postService: PostService;
}

const ServicesContext = createContext<Services | null>(null);

// внутренний, НЕ экспортируется наружу фичам напрямую
export const useServicesContext = () => {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('ServicesProvider missing');
  return ctx;
};

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const services = useMemo<Services>(
    () => ({
      userService: createUserService(httpClient),
      postService: createPostService(httpClient),
    }),
    [],
  );

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
