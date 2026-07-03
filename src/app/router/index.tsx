import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { PostsPage } from '@/pages/posts';
import { AuthPage } from '@/pages/auth';
import { CreatePostPage } from '@/pages/create-post';
import { selectIsAuth } from '@/entities/session';
import { useSelector } from 'react-redux';

export const useRouter = () => {
  const isAuth = useSelector(selectIsAuth)

  // public routes
  const routes = [
    { path: '/', element: <HomePage /> },
    { path: "/posts", element: <PostsPage /> },
    { path: "/login", element: <AuthPage variant="login" /> },
    { path: "/register", element: <AuthPage variant="register" /> },
    { path: "*", element: <>404</> }
  ]

  // private routes
  const privateRoutes = [
    { path: "/posts/create", element: <CreatePostPage />, }
  ]

  if (isAuth) routes.push(...privateRoutes)

  return createBrowserRouter([
    {
      element: <RootLayout />,
      children: routes,
    },
  ]);
}