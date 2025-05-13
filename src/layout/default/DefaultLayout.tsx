import { NavLink, Outlet } from 'react-router';
import { ROUTES } from '../../constants';

import styles from './DefaultLayout.module.css'

function DefaultLayout() {
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
      </header>

      <div className={styles.wrapper}>
        <Outlet/>
      </div>
    </div>

  )
}

export default DefaultLayout;