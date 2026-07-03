import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuth, selectUser } from '@/entities/session';
import { RegisterModal, LoginModal, LogoutButton } from '@/features/auth';
import { useAuthModals } from '../model/useAuthModals';

import styles from './Header.module.sass';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import clsx from 'clsx';

export const HeaderMobile = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector(selectUser);
  const isMobile = useIsMobile()
  const { active, openLogin, openRegister, close } = useAuthModals();

  return (
    <header className={clsx(styles.header, isMobile && styles.mobile)}>
      <div className={styles.inner}>
        <Link to="/" className={clsx(styles.logo, isMobile && styles.mobile)}>
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
              {!isMobile && <Button onClick={openRegister}>
                Регистрация
              </Button>}
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