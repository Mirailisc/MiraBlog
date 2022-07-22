import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.scss'
import { useQuery } from '@apollo/client'
import { GET_ARTICLES } from '../../services/graphql'
import { Spinner } from '@fluentui/react-components'
import { Alert } from '@fluentui/react-components/unstable'
import { AuthContext } from '../../context/authContext'

const Articles = () => {
  const [articles, setArticles] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    pollInterval: 500,
  })

  const { user }: any = useContext(AuthContext)

  useEffect(() => {
    if (data) {
      setArticles(data.articles)
      setTimeout(() => {
        setIsLoading(false)
      })
    }
  }, [loading, error, data])

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.welcomeText}>Welcome back, {user?.name}.</h1>
      {error ? (
        <Alert intent="error">{error.message}</Alert>
      ) : isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.articles}>
          {articles.map((items: any, index: number) => {
            return (
              <div className={styles.listArticle} key={index++}>
                <div className={styles.article}>
                  <h4>{items.title}</h4>
                  <p>{items.author_id}</p>
                  <p>{items.markdown_detail}</p>
                </div>
                <hr />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Articles
