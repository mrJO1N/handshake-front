import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuth, selectUser } from '@/entities/session';
import { RegisterModal, LoginModal, LogoutButton } from '@/features/auth';
import { useAuthModals } from '../model/useAuthModals';

import styles from './Header.module.sass';

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector(selectUser);
  const { active, openLogin, openRegister, close } = useAuthModals();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          ИПОРУКАМ
        </Link>

        <div className={styles.actions}>
          {isAuth && user
            ? <>
              <span className={styles.username}>
                @{user.username}
              </span>
              <LogoutButton />
            </>
            :
            <>
              <Button
                variant="clear"
                onClick={openLogin}
              >
                Вход
              </Button>
              <Button onClick={openRegister}>
                Регистрация
              </Button></>
          }
        </div>
      </div>

      <LoginModal
        isOpen={active === 'login'}
        onClose={close}
        onSwitchToRegister={openRegister}
      />
      <RegisterModal
        isOpen={active === 'register'}
        onClose={close}
        onSwitchToLogin={openLogin}
      />
    </header>
  );
};