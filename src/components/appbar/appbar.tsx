import { NavLink } from 'react-router-dom'
import styles from './appbar.module.scss'
import ContentWrapper from '../content-wrapper/content-wrapper'
import clsx from 'clsx'

export default function AppBar() {
  return (
    <div className={styles.appbar}>
      <ContentWrapper centered fullHeight>
        <div>
          <h1>JSON Coding Challenge</h1>
          <div className={styles.nav}>
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Preview
            </NavLink>
            <NavLink
              to={`/edit`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Edit JSON
            </NavLink>
            <div className={clsx(styles.animation, styles['start-home'])}></div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
