import { Link } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  return (
    <header>
      <h1>MedManager</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/profile">Profile</Link> | 
        <Link to="/medmanagement">Manage Medications</Link> | 
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
      </nav>
    </header>
  )
}

export default Header