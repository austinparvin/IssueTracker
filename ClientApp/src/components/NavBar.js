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
      {!isAuthenticated && (
        <>
          <nav className="navbar">
            <ReactLogo />
            <section className="login-signup">
              <Link className="login" to="/issues/my">
                Log in
              </Link>
              <Link className="login" to="/issues/my">
                <button>Sign Up</button>
              </Link>
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
            <Link className="signup-cta" to="/issues/my">
              <button>Sign Up - It's Free!</button>
            </Link>
          </div>
        </>
      )}

      {isAuthenticated && (
        <span className="nav">
          <Nav pills>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                exact
                to="/issues/my"
                activeClassName="active"
              >
                <AccountIcon className="hide" />
                My <span className="hide">Issues</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/issues/avail">
                <AvailIcon className="hide" />
                Avail<span className="hide">able Issues</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/issues/add">
                <AddIcon className="hide" />
                Add <span className="hide">Issues</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/issues/closed">
                <ClosedIcon className="hide" />
                Closed <span className="hide">Issues</span>
              </NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                Set<span className="hide">tings</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={RRNavLink} exact to="/profile">
                  Profile
                </DropdownItem>
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
