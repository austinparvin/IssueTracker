// src/components/NavBar.js

import React, { useState } from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from '../images/logo.svg'
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from 'reactstrap'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState)

  return (
    <div>
      {!isAuthenticated && (
        <>
          <nav className="navbar">
            <ReactLogo />
            <section className="login-signup">
              <span className="login" onClick={() => loginWithRedirect({})}>
                Log in
              </span>
              <button onClick={() => loginWithRedirect({})}>Sign Up</button>
            </section>
          </nav>
          <div className="promo">
            <h1>
              Trello lets you work more collaboratively and get more done.
            </h1>
            <p>
              Trello’s boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way
            </p>
            <button onClick={() => loginWithRedirect({})}>
              Sign Up - It's Free!
            </button>
          </div>
        </>
      )}

      {isAuthenticated && (
        <span className="nav">
          {/* <Link to="/issues/my">My</Link>
          <Link to="/issues/avail">Available</Link>
          <Link to="/issues/add">Add</Link>
          <Link to="/issues/closed">Closed</Link>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Settings</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <Nav pills>
            <NavItem>
              <NavLink href="/issues/my">My</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/issues/avail">Avail</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/issues/add">Add</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/issues/closed">Closed</NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                Set
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </span>
      )}
    </div>
  )
}

export default NavBar
