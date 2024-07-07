import Profile from '../components/Profile'
import { updateUserProfile } from '../services/medications'

const ProfilePage = ({ user }) => {
  return (
    <div>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
