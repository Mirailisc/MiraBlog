import React, { useContext, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/apollo'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import './App.scss';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { AuthContext } from './context/authContext'

// Components
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import NoteEditor from './components/NoteEditor'
import LoginPage from './components/LoginPage'
import PageNotFound from './components/PageNotFound'

function App() {
  const location = useLocation()
  const { user }: any = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/sign-in")
    }
  }, [user])

  const renderNavbar = () => {
    if(location.pathname === '/sign-in') return null
    if(location.pathname === '/404') return null
    else return <Navbar/>
  }
  initializeIcons();

  return (
    <ApolloProvider client={client}>
      {renderNavbar()}
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard /> }/>
          <Route path="/editor" element={<NoteEditor /> }/>
          <Route path="/sign-in" element={<LoginPage /> }/>
          <Route path="/404" element={<PageNotFound />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
