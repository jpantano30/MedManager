import { useState } from 'react'
import { registerUser } from '../api/medications'
import { useNavigate } from 'react-router-dom'

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { username, email, password }
    try {
      const response = await registerUser(user)
      onRegister(response)
      navigate('/login')
    } catch (error) {
      console.error('Error registering:', error)
      setError('Registration failed. Please check your details and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Register</button>
    </form>
  )
}

export default Register
