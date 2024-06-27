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
import { getMedications, markMedicationAsTaken, addMedication, deleteMedication, updateMedication } from './api/medications'


const App = () => {
  const [medications, setMedications] = useState([])
  const [user, setUser] = useState(localStorage.getItem('token') ? true : null)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const fetchMedications = async () => {
        try {
          const data = await getMedications()
          setMedications(data.map(med => ({
            ...med,
            taken_days: Array.isArray(med.taken_days) ? med.taken_days : []
          })))
        } catch (error) {
          console.log('Error fetching medications: ', error)
        }
      }
      fetchMedications()
    }
  }, [user])

  const handleMarkAsTaken = async (id, date, checked) => {
    try {
      await markMedicationAsTaken(id, date)
      if (checked) {
        setMedications(
          medications.map((med) =>
            med.id === id ? { ...med, taken_days: [...med.taken_days, date] } : med
          )
        )
      } else {
        setMedications(
          medications.map((med) =>
            med.id === id ? { ...med, taken_days: med.taken_days.filter((d) => d !== date) } : med
          )
        )
      }
    } catch (error) {
      console.error('Error marking medication as taken:', error)
    }
  }

  const handleAdd = async (medication) => {
    const newMedication = await addMedication(medication)
    setMedications([...medications, {
      ...newMedication,
      taken_days: Array.isArray(newMedication.taken_days) ? newMedication.taken_days : []
    }])
  }

  const handleDelete = async (id) => {
    await deleteMedication(id)
    setMedications(medications.filter(med => med.id !== id))
  }

  const handleEdit = async (id, medication) => {
    const updatedMedication = await updateMedication(id, medication)
    setMedications(medications.map(med => (med.id === id ? {
      ...updatedMedication,
      taken_days: Array.isArray(updatedMedication.taken_days) ? updatedMedication.taken_days : []
    } : med)))
  }

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
                handleMarkAsTaken={handleMarkAsTaken}
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
                handleAdd={handleAdd}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleMarkAsTaken={handleMarkAsTaken}
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
