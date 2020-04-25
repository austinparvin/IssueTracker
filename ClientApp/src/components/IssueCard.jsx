import React from 'react'
import { Link } from 'react-router-dom'
import ListOfActionItems from './ListOfActionItems'

const IssueCard = ({ issue }) => {
  return (
    <Link to={`/issue/details/${issue.id}`}>
      <section className={`issue-card`}>
        <div className="title-n-importance">
          <header>{issue.title}</header>
          <span className={`badge text-right bgc-${issue.importance}`}>!</span>
        </div>
        <p>{issue.description}</p>
        <ListOfActionItems issueId={issue.id} />
      </section>
    </Link>
  )
}

export default IssueCard
