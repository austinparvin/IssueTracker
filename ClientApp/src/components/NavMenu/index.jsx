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
            My
          </Link>

          <Link tag={Link} to="/issues/avail">
            Avail
          </Link>

          <Link tag={Link} to="/issues/add">
            Add
          </Link>

          <Link tag={Link} to="/issues/closed">
            Closed
          </Link>
          <Link tag={Link} to="/issues/closed">
            Settings
          </Link>
        </ul>
      </header>
    )
  }
}
