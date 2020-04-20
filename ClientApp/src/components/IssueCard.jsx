import React from 'react'
import { Link } from 'react-router-dom'
import ListOfActionItems from './ListOfActionItems'

const IssueCard = ({ issue }) => {
  return (
    <Link to={`/issue/details/${issue.id}`}>
      <section className="issue-card">
        <div>
          <header>{issue.title}</header>
        </div>
        <p>{issue.description}</p>
        <ListOfActionItems issueId={issue.id} />
      </section>
    </Link>
  )
}

export default IssueCard
