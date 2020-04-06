import React from 'react'

const Issue = ({ issue }) => {
  return (
    <section className="issue-details">
      <div>
        <header>{issue.title}</header>
      </div>
      <p>{issue.description}</p>
    </section>
  )
}

export default Issue
