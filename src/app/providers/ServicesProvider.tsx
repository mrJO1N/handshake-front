import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { httpClient, setAccessTokenProvider } from '@/shared/api';
import { createUserService, type UserService } from '@/entities/user';
import { createPostService, type PostService } from '@/entities/post';
import { selectAccessToken } from '@/entities/session';
import { store } from '@/app/store';

setAccessTokenProvider(() => selectAccessToken(store.getState()));

export interface Services {
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

interface ServicesProviderProps {
  children: ReactNode;
  // позволяет подменить сервисы в тестах (DI), в проде не передаётся
  services?: Services;
}

export const ServicesProvider = ({ children, services: servicesOverride }: ServicesProviderProps) => {
  const services = useMemo<Services>(
    () =>
      servicesOverride ?? {
        userService: createUserService(httpClient),
        postService: createPostService(httpClient),
      },
    [servicesOverride],
  );

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
