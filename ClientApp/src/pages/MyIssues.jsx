import React from 'react'
import { Link } from 'react-router-dom'

const MyIssues = () => {
  return (
    <section className="empty-my-issues">
      <header>You have no Issues</header>
      <Link to="/issues/add">
        <button>Add an Issue</button>
      </Link>
      <header>OR</header>
      <Link to="/issues/avail">
        <button>Check Available Issues</button>
      </Link>
    </section>
  )
}

export default MyIssues
