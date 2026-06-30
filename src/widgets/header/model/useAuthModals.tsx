import { useState } from 'react';

type AuthModal = 'login' | 'register' | null;

export const useAuthModals = () => {
  const [active, setActive] = useState<AuthModal>(null);

  return {
    active,
    openLogin: () => setActive('login'),
    openRegister: () => setActive('register'),
    close: () => setActive(null),
  };
};