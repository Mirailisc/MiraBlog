import React, { useContext } from 'react'
import styles from './index.module.scss'
import Logo from '../../images/logo.svg'
import { Button } from '@fluentui/react-components'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(0)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" style={{ textDecoration: 'none' }} className={styles.navbarBrand}>
          <img src={Logo} alt="logo" />| Note
        </Link>
        <div className={styles.navLinks}>
          {user ? (
            <>
              <Link to="/editor" style={{ textDecoration: 'none' }}>
                <Button>Create</Button>
              </Link>
              <Button onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                <Button>Sign in</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
