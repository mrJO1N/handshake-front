import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { selectIsAuth, selectUser } from '@/entities/session';
import { LogoutButton } from '@/features/auth';

import styles from './Header.module.sass';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useIsMobile } from '@/shared/lib/hooks';
import { useModal } from '@/widgets/modal-root';

export const HeaderMobile = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const isMobile = useIsMobile()
  const { open } = useModal()

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
                onClick={() => open("login")}
              >
                Войти
              </Button>
              {
                isMobile && <Button onClick={() => open("register")}>
                  Регистрация
                </Button>
              }
            </>

          }
        </div>
      </div>
    </header>
  );
};