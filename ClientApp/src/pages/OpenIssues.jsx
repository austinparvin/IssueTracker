import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'
import LoadingSpinner from '../components/LoadingSpinner'

const OpenIssues = () => {
  const { getTokenSilently } = useAuth0()

  const [openIssues, setOpenIssues] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getOpenIssues = async () => {
    setIsLoading(true)
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('api/issue/open')
    setOpenIssues(resp.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getOpenIssues()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  } else if (openIssues.length < 1) {
    return (
      <section className="empty-my-issues">
        <header>There are no Open Issues</header>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {openIssues.map(issue => {
          return <IssueCard key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default OpenIssues
