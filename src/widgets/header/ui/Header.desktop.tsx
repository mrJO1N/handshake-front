import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { selectIsAuth, selectUser } from '@/entities/session';
import { ThemeToggle } from '@/entities/theme';

import styles from './Header.module.sass';
import { useSelector } from 'react-redux';

export const HeaderDesktop = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          ИПОРУКАМ
        </Link>

        <div className={styles.actions}>
          <ThemeToggle />
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
                Вход
              </Button>
              <Button onClick={() => navigate("/register")}>
                Регистрация
              </Button>
            </>
          }
        </div>
      </div>
    </header>
  );
};