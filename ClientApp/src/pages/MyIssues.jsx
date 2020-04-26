import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'

const MyIssues = () => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  const [myIssues, setMyIssues] = useState([])

  const getMyIssues = async () => {
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const resp = await axios.get(`api/issue/my/${user.email}`)
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
        <Link to="/issues/open">
          <button>Check Open Issues</button>
        </Link>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {myIssues.map(issue => {
          return <IssueCard key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default MyIssues
