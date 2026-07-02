import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers';
import { router } from './router';
import './styles/global.sass';
import { useInitializeAuth } from '@/entities/user';

const AppContent = () => {
    useInitializeAuth();

    return <RouterProvider router={router} />
}

export const App = () => {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    );
}