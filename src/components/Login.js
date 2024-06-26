import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/medications'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { username, password }
    try {
      await loginUser(user)
      onLogin(true)
      navigate('/')
    } catch (error) {
      console.log('Error logging in:', error)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>} 
      {/* JENA look this up! ^*/}
      <div>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
