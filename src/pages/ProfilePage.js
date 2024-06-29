import Profile from '../components/Profile'

const ProfilePage = ({ user, medications }) => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} medications={medications} />
    </div>
  )
}

export default ProfilePage
