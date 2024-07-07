import { Link } from 'react-router-dom'

const Footer = ({ user, onLogout }) => {
  return (
    <footer>
      <div className='footer-content'>
        {user ? (
            <>
              <button className='logout' onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> | 
              <Link to="/register">Register</Link>
            </>
          )}
      </div>
    </footer>
  )
}

export default Footer
