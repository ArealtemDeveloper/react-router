import { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES, INITIAL_ROUTES } from '../../constants';

import styles from './DefaultLayout.module.css'
import cn from 'classnames';

import { useAuth } from '../../context/AuthProvider';

import VLoader from '../../components/VLoader/VLoader';


function DefaultLayout() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignOut = () => {
    auth?.signOut(() => {
      navigate(INITIAL_ROUTES.main);
    });
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <ul className={styles.list}>
            { ROUTES.map(route => (
                <li key={route.id}>
                  <NavLink
                    className={styles.link}
                    to={route.path}
                    style={({ isActive }) => isActive ? {pointerEvents: 'none', color: 'red'} : {}}
                  >
                    { route.label }
                  </NavLink>
                </li>
            ))}
          </ul>
          <div className={styles.user}>
              {
                !auth?.user 
                ? <NavLink
                    className={cn(styles.link, styles.btn)}
                    to={INITIAL_ROUTES.login}
                  >
                    Вход
                  </NavLink>
                : <div className={styles.logout}>
                    <span className={styles.user}>
                      {auth?.user}
                    </span>

                    <button
                      className={cn(styles.link, styles.btn)}
                      onClick={handleSignOut}
                    >
                      Выйти
                    </button>
                  </div>
              }
          </div>
      </header>

      <div className={styles.wrapper}>
        <Suspense fallback={<VLoader/>}>
          <Outlet/>
        </Suspense>
      </div>
    </div>

  )
}

export default DefaultLayout;