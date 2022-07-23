import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { Button } from '@fluentui/react-components'

const PageNotFound = () => {
  return (
    <>
      <div className={styles.pageNotFound}>
        <div className={styles.message}>
          <h1>404 ERROR</h1>
          <p>YOU JUST FELL INTO THE ABYSS!</p>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button appearance="secondary">Go Back</Button>
        </Link>
      </div>
    </>
  )
}

export default PageNotFound
