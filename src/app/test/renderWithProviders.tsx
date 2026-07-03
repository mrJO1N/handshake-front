import { type ReactElement, type ReactNode } from 'react';
import { render, renderHook, type RenderHookOptions, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { sessionReducer } from '@/entities/session';
import type { RootState } from '@/app/store';
import { ServicesProvider, type Services } from '@/app/providers/ServicesProvider';
import { MemoryRouter } from 'react-router-dom';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: { session: sessionReducer },
    preloadedState: preloadedState as RootState | undefined,
  });

export const createMockServices = (overrides: Partial<Services> = {}): Services => ({
  userService: {
    register: vi.fn(),
    login: vi.fn(),
    fetchMe: vi.fn(),
    saveToken: vi.fn(),
    getToken: vi.fn(),
    clearToken: vi.fn(),
    ...overrides.userService,
  },
  postService: {
    findPostsByQuery: vi.fn(),
    createPost: vi.fn(),
    ...overrides.postService,
  },
});

interface ProvidersOptions {
  store?: EnhancedStore<RootState>;
  queryClient?: QueryClient;
  services?: Services;
}

const makeWrapper = ({ store, queryClient, services }: Required<ProvidersOptions>) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ServicesProvider services={services}>{children}</ServicesProvider>
          </QueryClientProvider>
        </Provider>
      </MemoryRouter>
    );
  };

export function renderWithProviders(
  ui: ReactElement,
  options: ProvidersOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
  const { store = createTestStore(), queryClient = createTestQueryClient(), services = createMockServices(), ...rest } =
    options;

  return {
    store,
    queryClient,
    services,
    ...render(ui, {
      wrapper: makeWrapper({ store, queryClient, services }),
      ...rest,
    }),
  };
}

export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  options: ProvidersOptions & Omit<RenderHookOptions<Props>, 'wrapper'> = {},
) {
  const { store = createTestStore(), queryClient = createTestQueryClient(), services = createMockServices(), ...rest } =
    options;

  return {
    store,
    queryClient,
    services,
    ...renderHook(hook, {
      wrapper: makeWrapper({ store, queryClient, services }),
      ...rest,
    }),
  };
}
