// Styling
import './App.css'
// Hooks 
import { useEffect, useState } from 'react'
// React Router
import { Route, Routes, useNavigate } from 'react-router-dom'
// Pages 
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import MedManagement from './pages/MedManagement'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// Components
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
// Fetch Requests 
import { getMedications } from './api/medications'


const App = () => {
  const [medications, setMedications] = useState([])
  const [user, setUser] = useState(localStorage.getItem('token') ? true : null)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const fetchMedications = async () => {
        try {
          const data = await getMedications()
          setMedications(data)
        } catch (error) {
          console.log('Error fetching medications: ', error)
        }
      }
      fetchMedications()
    }
  }, [user])

  const handleRegister = (user) => {
    setUser(user)
  }

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setMedications([])
    navigate('/login')
  } 

  return (
    <div className='App'>
      <Header 
        user={user} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route 
          path='/' 
          element={
            <PrivateRoute>
              <Home 
                medications={medications} 
                setMedications={setMedications} 
                user={user} 
              />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile' 
          element={
            <PrivateRoute>
              <ProfilePage 
                user={user}
              />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/medmanagement' 
          element={
            <PrivateRoute>
              <MedManagement 
                medications={medications} 
                setMedications={setMedications}
                user={user}
              />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/login' 
          element={
            <LoginPage 
              onLogin={handleLogin} 
            />
          } 
        />
        <Route 
          path='/register' 
          element={
            <RegisterPage 
              onRegister={handleRegister} 
            />
          } 
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App