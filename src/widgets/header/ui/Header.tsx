import { NavLink, Link } from 'react-router-dom';
// import { RegisterModal } from '@/features/auth-register';
import { useAuthModals } from '../model/useAuthModals';
import styles from './Header.module.sass';

import { Button } from '@/shared/ui';

const navLinks = [
  { to: '/', label: 'Главная', end: true },
  { to: '/posts', label: 'Посты' },
];

export const Header = () => {
  const { active, openLogin, openRegister, close } = useAuthModals();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          ИПОРУКАМ
        </Link>

        {/* <nav className={styles.nav}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {label}
            </NavLink>
          ))}
        </nav> */}

        <div className={styles.actions}>
          <Button
            className="login"
            variant="clear"
            onClick={openLogin}
          >
            Вход
          </Button>
          <Button onClick={openRegister}>
            Регистрация
          </Button>
        </div>
      </div>

      {/* <RegisterModal isOpen={active === 'register'} onClose={close} /> */}
      {/* LoginModal появится, когда сделаешь features/auth-login */}
    </header>
  );
};