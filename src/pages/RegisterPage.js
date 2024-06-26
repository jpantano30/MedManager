import Register from '../components/Register'

const RegisterPage = ({ onRegister }) => {
  return (
    <div>
      <h1>Register</h1>
      <Register onRegister={onRegister} />
    </div>
  )
}

export default RegisterPage
