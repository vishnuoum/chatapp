import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ChatProvider, useChatContext } from './contexts/ChatContext'

function App() {

  return (
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  )
}

function AppRoutes() {

  const { userId } = useChatContext();



  return (
    <main className='main-content'>
      <Routes>
        <Route path="/" element={!userId ? <Navigate to="/login" replace /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  )
}

export default App
