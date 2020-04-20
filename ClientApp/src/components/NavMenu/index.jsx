import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

export class NavMenu extends Component {
  static displayName = NavMenu.name

  render() {
    return (
      <header>
        <ul className="custom-nav-bar">
          <Link tag={Link} to="/issues/my">
            My Issues
          </Link>

          <Link tag={Link} to="/issues/avail">
            Avail Issues
          </Link>

          <Link tag={Link} to="/issues/add">
            Add Issue
          </Link>

          <Link tag={Link} to="/issues/closed">
            Closed Issues
          </Link>
        </ul>
      </header>
    )
  }
}
