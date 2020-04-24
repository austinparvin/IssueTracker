// src/components/NavBar.js

import React, { useState } from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from '../images/logo.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as AccountIcon } from '../images/account-icon.svg'
import { ReactComponent as AvailIcon } from '../images/card.svg'
import { ReactComponent as ClosedIcon } from '../images/closed.svg'
import { NavLink as RRNavLink } from 'react-router-dom'
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
      {isAuthenticated && (
        <nav className="fixed-top-nav">
          <ReactLogo />
          <section className="search-bar">search</section>
          <section>
            {' '}
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle>
                <AccountIcon />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={RRNavLink} exact to="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </section>
        </nav>
      )}
    </div>
  )
}

export default NavBar
