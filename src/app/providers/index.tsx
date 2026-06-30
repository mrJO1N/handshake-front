import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { QueryProvider } from './QueryProvider';
import { ServicesProvider } from './ServicesProvider';
import { ReactNode } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
        <QueryProvider>
            <ServicesProvider>{children}</ServicesProvider>
        </QueryProvider>
    </Provider>
);