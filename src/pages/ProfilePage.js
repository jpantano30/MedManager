import Profile from '../components/Profile'

const ProfilePage = ({ user}) => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
