import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { selectIsAuth, selectUser } from '@/entities/session';
import { LogoutButton } from '@/features/auth';

import styles from './Header.module.sass';
import { useSelector } from 'react-redux';
import { ModalRoot } from '@/widgets/modal-root';
import { useModal } from '@/widgets/modal-root/model/useModal';

export const HeaderDesktop = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const { open } = useModal()

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
                onClick={() => open("login")}
              >
                Вход
              </Button>
              <Button onClick={() => open("register")}>
                Регистрация
              </Button>
            </>
          }
        </div>
      </div>
    </header>
  );
};