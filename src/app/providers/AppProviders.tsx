import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { selectAccessToken } from '@/entities/session';
import { setAccessTokenProvider } from '@/shared/api';
import { QueryProvider } from './QueryProvider';
import { ReactNode } from 'react';

setAccessTokenProvider(() => selectAccessToken(store.getState()));

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <QueryProvider>{children}</QueryProvider>
        </Provider>
    );
}
