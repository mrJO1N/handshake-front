import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,       // родитель — рисует хедер + Outlet
    children: [
      { path: '/', element: <HomePage /> },  // попадает в Outlet
    ],
  },
]);