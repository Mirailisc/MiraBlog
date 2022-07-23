import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

const root = document.getElementById('root')

ReactDOM.render(
  <AuthProvider>
    <FluentProvider theme={teamsLightTheme}>
      <Router>
        <App />
      </Router>
    </FluentProvider>
  </AuthProvider>,
  root
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
