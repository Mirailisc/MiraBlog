import React, { useContext, useState } from 'react'
import styles from './index.module.scss'
import { Formik } from 'formik'
import { Input, Button } from '@fluentui/react-components'
import { Alert } from '@fluentui/react-components/unstable'
import { useMutation, gql } from '@apollo/client'
import { AuthContext } from '../../context/authContext'
import { LOGIN_USER } from '../../services/graphql'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [error, setErrors] = useState<any>([])
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const [login] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData.user)
      navigate('/')
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors)
    },
  })

  return (
    <>
      <div className={styles.loginCard}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values: ILoginForm) => {
            const errors: any = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }
            if (!values.password) {
              errors.password = 'Required'
            }
            return errors
          }}
          onSubmit={(values: ILoginForm) => {
            login({ variables: { email: values.email, password: values.password } })
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <h3>Sign in</h3>
              <label>Email address</label>
              {errors.email ? <Alert intent="error">{errors.email && touched.email && errors.email}</Alert> : null}
              <Input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
              <label>Password</label>
              {errors.password ? (
                <Alert intent="error">{errors.password && touched.password && errors.password}</Alert>
              ) : null}
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Button appearance="primary" type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default LoginPage

interface ILoginForm {
  email: string
  password: string
}
