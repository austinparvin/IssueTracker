import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

export class NavMenu extends Component {
  static displayName = NavMenu.name

  render() {
    return (
      <header>
        <ul className="custom-nav-bar">
          <Link tag={Link} className="text-dark" to="/issues/my">
            My Issues
          </Link>

          <Link tag={Link} className="text-dark" to="/issues/avail">
            Avail Issues
          </Link>

          <Link tag={Link} className="text-dark" to="/issues/add">
            Add Issue
          </Link>

          <Link tag={Link} className="text-dark" to="/issues/closed">
            Closed Issues
          </Link>
        </ul>
      </header>
    )
  }
}
