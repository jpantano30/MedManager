import { useState, useEffect } from 'react'
import { getUserProfile } from '../api/medications'

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const data = await getUserProfile()
          setProfile(data)
        } catch (error) {
          console.log('Error fetching profile: ', error)
          setError('Failed to fetch profile')
        } finally {
          setLoading(false)
        }
      }
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [user])
  // fetchProfile function: if data is fetched, its stored in profile state using setProfile. if error occures, its stores in setError
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
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
    </div>
  )
}

export default Profile
