import { type ReactElement, type ReactNode } from 'react';
import { render, renderHook, type RenderHookOptions, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { sessionReducer } from '@/entities/session';
import { modalReducer } from '@/entities/modal';
import { themeReducer } from '@/entities/theme';
import type { RootState } from '@/app/store';
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
    reducer: { session: sessionReducer, modal: modalReducer, theme: themeReducer },
    preloadedState: preloadedState as RootState | undefined,
  });

interface ProvidersOptions {
  store?: EnhancedStore<RootState>;
  queryClient?: QueryClient;
}

const makeWrapper = ({ store, queryClient }: Required<ProvidersOptions>) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
      </MemoryRouter>
    );
  };

export function renderWithProviders(
  ui: ReactElement,
  options: ProvidersOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
  const { store = createTestStore(), queryClient = createTestQueryClient(), ...rest } = options;

  return {
    store,
    queryClient,
    ...render(ui, {
      wrapper: makeWrapper({ store, queryClient }),
      ...rest,
    }),
  };
}

export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  options: ProvidersOptions & Omit<RenderHookOptions<Props>, 'wrapper'> = {},
) {
  const { store = createTestStore(), queryClient = createTestQueryClient(), ...rest } = options;

  return {
    store,
    queryClient,
    ...renderHook(hook, {
      wrapper: makeWrapper({ store, queryClient }),
      ...rest,
    }),
  };
}
