import React from 'react'
import { Link } from 'react-router-dom'
import ListOfActionItems from './ListOfActionItems'

const IssueCard = ({ issue }) => {
  const formatDueByTime = hours => {
    if (hours > 744) {
      return Math.floor(hours / 744) + ' mo.'
    } else if (hours > 24) {
      return Math.floor(hours / 24) + ' days'
    } else {
      return Math.floor(hours) + ' hrs'
    }
  }
  return (
    <Link to={`/issue/details/${issue.id}`}>
      <section className={`issue-card`}>
        <div className="title-n-importance">
          <header>{issue.title}</header>
          <div className="dueDate">
            {issue.dueDate
              ? formatDueByTime(
                  (new Date(
                    new Date(issue.dueDate).getTime() -
                      new Date(issue.dueDate).getTimezoneOffset() * 60000
                  ) -
                    Date.now()) /
                    10000 /
                    360
                )
              : ''}
          </div>
          <span className={`badge text-right bgc-${issue.importance}`}>!</span>
        </div>
        <p>{issue.description}</p>
        <ListOfActionItems issueId={issue.id} />
      </section>
    </Link>
  )
}

export default IssueCard
