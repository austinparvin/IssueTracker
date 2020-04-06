import React from 'react'
import { Link } from 'react-router-dom'

const Issue = ({ issue }) => {
  return (
    <Link to={`/issue/details/${issue.id}`}>
      <section className="issue-details">
        <div>
          <header>{issue.title}</header>
        </div>
        <p>{issue.description}</p>
      </section>
    </Link>
  )
}

export default Issue
