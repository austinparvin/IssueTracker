import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'

const AvailableIssues = () => {
  const { getTokenSilently } = useAuth0()

  const [availableIssues, setAvailableIssues] = useState([])

  const getAvailableIssues = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('api/issue/available')
    setAvailableIssues(resp.data)
  }

  useEffect(() => {
    getAvailableIssues()
  }, [])

  if (availableIssues.length < 1) {
    return (
      <section className="empty-my-issues">
        <header>There are no Available Issues</header>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {availableIssues.map(issue => {
          return <IssueCard key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default AvailableIssues
