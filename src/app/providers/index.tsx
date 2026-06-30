import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ServicesProvider } from './ServicesProvider';

export const AppProviders = ({ children }: { children: ReactNode }) => (
    <QueryProvider>
        <ServicesProvider>{children}</ServicesProvider>
    </QueryProvider>
);