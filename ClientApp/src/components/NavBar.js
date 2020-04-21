// src/components/NavBar.js

import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      {isAuthenticated && (
        <span>
          <Link to="/issues/my">My</Link>
          <Link to="/issues/avail">Available</Link>
          <Link to="/issues/add">Add</Link>
          <Link to="/issues/closed">Closed</Link>
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  )
}

export default NavBar
