import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'
import LoadingSpinner from '../components/LoadingSpinner'

const AvailIssues = () => {
  const { getTokenSilently } = useAuth0()

  const [availIssues, setAvailIssues] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAvailIssues = async () => {
    setIsLoading(true)
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('api/issue/avail')
    setAvailIssues(resp.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getAvailIssues()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  } else if (availIssues.length < 1) {
    return (
      <section className="empty-my-issues">
        <header>There are no Available Issues</header>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {availIssues.map(issue => {
          return <IssueCard key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default AvailIssues
