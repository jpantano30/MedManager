import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>MedManager</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/profile">Profile</Link> | 
        <Link to="/medmanagement">Manage Medications</Link> | 
        <Link to="/medication_logs">Medication Log</Link>
      </nav>
    </header>
  )
}

export default Header