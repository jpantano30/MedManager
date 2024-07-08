import Profile from '../components/Profile'
// eslint-disable-next-line
import { updateUserProfile } from '../services/medications'

const ProfilePage = ({ user }) => {
  return (
    <div>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
