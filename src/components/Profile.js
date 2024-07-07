import { useState, useEffect} from 'react'
import { getUserProfile, updateUserProfile } from '../services/medications'

const Profile = ({ user  }) => {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updatedProfile, setUpdatedProfile] = useState({ username: '', email: '' })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile()
        setProfile(data)
        setUpdatedProfile({ username: data.username, email: data.email })
      } catch (error) {
        console.log('Error fetching profile: ', error)
        setError('Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [user])

  const handleEditing = () => {
    setEditing(!editing)
  }

  const handleChange = (e) => {
    setUpdatedProfile({...updatedProfile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Updated Profile Data:', updatedProfile)
    try {
      await updateUserProfile(updatedProfile)
      setProfile(updatedProfile)
      setEditing(false)
    } catch (error) {
      console.log('Error updating profile: ', error)
      setError(error.message || 'Failed to update profile')
    }
  }

  if (loading){
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if(!profile){ 
    return <div>No profile available.</div>
  }

  return (
    <div>
      <h2>Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
              type='text' 
              name='username' 
              value={updatedProfile.username} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type='email' 
              name='email' 
              value={updatedProfile.email} 
              onChange={handleChange} 
            />
          </div>
          <button type='submit'>Save</button>
          <button onClick={handleEditing}>Cancel</button>
        </form>
      ) : (
      <div>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <button type='button' onClick={handleEditing}>Edit Profile</button>
      </div>
      
      )}
    </div>
  )
}

export default Profile