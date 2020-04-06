import React from 'react'

const Issue = ({ issue }) => {
  return (
    <section className="issue-details">
      <div>
        <header>{issue.title}</header>
        <div className="icons">
          <div className="edit">&#934;</div>
          <div className="delete">&#926;</div>
        </div>
      </div>
      <p>{issue.description}</p>
    </section>
  )
}

export default Issue
