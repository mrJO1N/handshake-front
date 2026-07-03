import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { PostsPage } from '@/pages/posts';
import { AuthPage } from '@/pages/auth';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/login", element: <AuthPage variant="login" /> },
      { path: "/register", element: <AuthPage variant="register" /> }
    ],
  },
]);