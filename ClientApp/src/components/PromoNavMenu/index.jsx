import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

export class PromoNavMenu extends Component {
  static displayName = PromoNavMenu.name

  render() {
    return (
      <header>
        <ul className="promotion-nav-bar">
          <Link tag={Link} className="text-dark" to="/signup">
            Sign Up
          </Link>

          <Link tag={Link} className="text-dark" to="/login">
            Login
          </Link>
        </ul>
      </header>
    )
  }
}
