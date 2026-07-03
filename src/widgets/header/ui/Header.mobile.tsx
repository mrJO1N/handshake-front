import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { selectIsAuth, selectUser } from '@/entities/session';
import { RegisterModal, LoginModal, LogoutButton } from '@/features/auth';
import { useAuthModals } from '../model/useAuthModals';

import styles from './Header.module.sass';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useIsMobile } from '@/shared/lib/hooks';

export const HeaderMobile = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const { active, openLogin, openRegister, close } = useAuthModals();
  const isMobile = useIsMobile()

  return (
    <header className={clsx(styles.header, styles.mobile)}>
      <div className={styles.inner}>
        <Link to="/" className={clsx(styles.logo, styles.mobile)}>
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
                Войти
              </Button>
              {
                isMobile && <Button onClick={openRegister}>
                  Регистрация
                </Button>
              }
            </>

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