import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers';
import { router } from './router';
import './styles/global.sass';

export const App = () => (
    <AppProviders>
        <RouterProvider router={router} />
        {/* home */}
    </AppProviders>
);