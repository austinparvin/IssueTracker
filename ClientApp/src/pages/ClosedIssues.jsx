import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Issue from '../components/Issue'
import IssueDetails from './IssueDetails'

const ClosedIssues = () => {
  const [myClosedIssues, setMyClosedIssues] = useState([])

  const getMyClosedIssues = async () => {
    const resp = await axios.get('api/issue/closed')
    setMyClosedIssues(resp.data)
  }

  useEffect(() => {
    getMyClosedIssues()
  }, [])

  return (
    <section className="my-issues">
      {myClosedIssues.map(issue => {
        return (
          <Link to={`/issue/details/${issue.id}`}>
            <IssueDetails key={issue.id} issueId={issue.id} />
          </Link>
        )
      })}
    </section>
  )
}

export default ClosedIssues
