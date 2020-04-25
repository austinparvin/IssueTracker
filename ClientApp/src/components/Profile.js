import React, { Fragment } from 'react'
import { useAuth0 } from '../react-auth0-spa'

const Profile = () => {
  const { loading, user, logout } = useAuth0()

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <section className="profile-page">
        <img src={user.picture} alt="Profile" className="profile-pic" />

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button className="btn btn-light" onClick={() => logout()}>
          LOGOUT
        </button>
      </section>
    </Fragment>
  )
}

export default Profile
