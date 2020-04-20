import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Issue from '../components/Issue'
import IssueDetails from './IssueDetails'

const MyIssues = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')
  const [myIssues, setMyIssues] = useState([])

  const getMyIssues = async () => {
    const user = await axios.get('api/profile')
    const resp = await axios.get(`api/issue/my/${user.data.id}`)
    setMyIssues(resp.data)
  }

  useEffect(() => {
    getMyIssues()
  }, [])

  if (myIssues.length < 1) {
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
  } else {
    return (
      <section className="my-issues">
        {myIssues.map(issue => {
          return (
            <Link key={issue.id} to={`/issue/details/${issue.id}`}>
              <IssueDetails key={issue.id} issueId={issue.id} />
            </Link>
          )
        })}
      </section>
    )
  }
}

export default MyIssues
