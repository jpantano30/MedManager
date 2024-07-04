import { Link } from 'react-router-dom'

const Footer = ({ user, onLogout }) => {
  return (
    <footer>
      {user ? (
          <>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | 
            <Link to="/register">Register</Link>
          </>
        )}
      <p>&copy; 2024 MedManager</p>
    </footer>
  )
}

export default Footer
