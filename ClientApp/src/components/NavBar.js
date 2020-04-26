import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactLogo } from '../images/logo.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as AccountIcon } from '../images/account-icon.svg'
import { ReactComponent as AvailIcon } from '../images/card.svg'
import { ReactComponent as ClosedIcon } from '../images/closed.svg'
import Laptop from '../images/laptop.png'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <>
          <nav className="navbar">
            <ReactLogo />
            <section className="login-signup">
              <Link className="login" to="/issues/my">
                LOGIN
              </Link>
              <Link className="login" to="/issues/my">
                <button>SIGN UP</button>
              </Link>
            </section>
          </nav>
          <div className="promo">
            <div className="left-column">
              <h1>
                Ladybug lets you work more efficiently and track progress.
              </h1>
              <p>
                Ladybug’s interface, cards, and lists enable you to track and
                detail your projects issues in a streamlined, quick way
              </p>
              <Link className="signup-cta" to="/issues/my">
                <button>Sign Up - It's Free!</button>
              </Link>
            </div>
          </div>
          <div className="promo-row-2">
            <div className="left-column flex-item">
              <h1>TRACK ISSUES SEEMLESSLY WITH ISSUE CARDS</h1>
              <p>
                Ladybug’s interface, cards, and lists enable you to track and
                detail your projects issues in a streamlined, quick way
              </p>
            </div>
            <div className="laptop flex-item">
              <img src={Laptop} alt="Laptop" className="responsive" />
            </div>
          </div>
        </>
      )}

      {isAuthenticated && (
        <>
          <nav className="fixed-top-nav">
            <ReactLogo />
            {/* <section className="search-bar">search</section> */}
            <section className="settings">
              <Link to="/profile">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="profile-pic"
                  width="45"
                  height="45"
                />
              </Link>
            </section>
          </nav>
          <span className="nav">
            <Nav pills>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  exact
                  to="/issues/my"
                  activeClassName="active"
                >
                  <AccountIcon className="hide link-icon" />
                  My<span className="hide">&nbsp;Issues</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/issues/open">
                  <AvailIcon className="hide link-icon" />
                  Open<span className="hide">&nbsp;Issues</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/issues/create">
                  <AddIcon className="hide link-icon" />
                  Create<span className="hide">&nbsp;Issues</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/issues/closed">
                  <ClosedIcon className="hide link-icon" />
                  Closed<span className="hide">&nbsp;Issues</span>
                </NavLink>
              </NavItem>
              <NavItem className="hide-desktop">
                <NavLink tag={RRNavLink} exact to="/profile">
                  Profile
                </NavLink>
              </NavItem>
            </Nav>
          </span>
        </>
      )}
    </div>
  )
}

export default NavBar
