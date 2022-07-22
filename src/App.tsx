import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/apollo'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.scss';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

// Components
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import NoteEditor from './components/NoteEditor'
import LoginPage from './components/LoginPage'

function App() {
  const location = useLocation()

  const renderNavbar = () => {
    if(location.pathname === '/sign-in') return null
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
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
