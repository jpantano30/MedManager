// Styling
import './App.css'

// React and Hooks
import { useEffect, useState, useCallback } from 'react'

// React Router
import { Route, Routes, useNavigate } from 'react-router-dom'

// Components and Pages
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import MedManagement from './pages/MedManagement'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MedicationLog from './pages/MedicationLog'

// API
import { getMedications } from './api/medications'

// Date Formatting
import { format } from 'date-fns'


const App = () => {
  const [medications, setMedications] = useState([])
  const [user, setUser] = useState(!!localStorage.getItem('token'))

  const navigate = useNavigate()

  const safeFormat = useCallback((date, formatStr) => {
    const parsedDate = new Date(date)
    return format(parsedDate, formatStr)
  }, [])

  useEffect(() => {
    const fetchMedicationsData = async () => {
      try {
        const meds = await getMedications()
        console.log('fetched medications: ', meds)
        setMedications(meds)
      } catch (error) {
        console.log('Error fetching medications or medications taken:', error)
      }
    }
    fetchMedicationsData()
  }, []) 


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
      <Header/>
      <Routes>
        <Route 
          path='/' 
          element={
            <PrivateRoute>
              <Home 
                medications={medications} 
                setMedications={setMedications} 
                safeFormat={safeFormat}
                user={user} 
              />
            </PrivateRoute>
          }
        />
        <Route 
          path='/medication_logs'
          element={
            <PrivateRoute>
              <MedicationLog 
                setMedications={setMedications}/>
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
      <Footer 
        user={user} 
        onLogout={handleLogout} 
      />
    </div>
  )
}

export default App