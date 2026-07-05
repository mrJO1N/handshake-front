import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { selectIsAuth, selectUser } from '@/entities/session';

import styles from './Header.module.sass';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export const HeaderMobile = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const navigate = useNavigate()

  return (
    <header className={clsx(styles.header, styles.mobile)}>
      <div className={styles.inner}>
        <Link to="/" className={clsx(styles.logo, styles.mobile)}>
          ИПОРУКАМ
        </Link>

        <div className={styles.actions}>
          {isAuth && user
            ? <>
              <button className={styles.username} onClick={() => navigate("/users/me")}>
                @{user.username}
              </button>
            </>
            :
            <>
              <Button
                variant="clear"
                onClick={() => navigate("/login")}
              >
                Войти
              </Button>
            </>
          }
        </div>
      </div>
    </header>
  );
};