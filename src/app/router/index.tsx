import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { PostsPage } from '@/pages/posts';
import { AuthPage } from '@/pages/auth';
import { CreatePostPage } from '@/pages/create-post';
import { UserPage } from '@/pages/user';
import { selectIsAuth } from '@/entities/session';
import { useSelector } from 'react-redux';
import { ModalRoot } from '@/widgets/modal-root';
import { BASE_URL } from '@/shared/config';
import { useMemo } from 'react';

export const useRouter = () => {
  const isAuth = useSelector(selectIsAuth)
  return useMemo(() => {
    // public routes
    const routes = [
      { path: '/', element: <HomePage /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/login", element: <AuthPage variant="login" /> },
      { path: "/register", element: <AuthPage variant="register" /> },
      { path: "*", element: <>404 error</> }
    ]

    // private routes
    const privateRoutes = [
      { path: "/posts/create", element: <CreatePostPage />, },
      { path: "/users/me", element: <UserPage />, }
    ]

    if (isAuth) routes.push(...privateRoutes)

    return createBrowserRouter([
      {
        element: <>
          <RootLayout />
          <ModalRoot />
        </>,
        children: routes,
      },
    ], { basename: BASE_URL });
  }, [isAuth])
}
