import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'

const OpenIssues = () => {
  const { getTokenSilently } = useAuth0()

  const [openIssues, setOpenIssues] = useState([])

  const getOpenIssues = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('api/issue/open')
    setOpenIssues(resp.data)
  }

  useEffect(() => {
    getOpenIssues()
  }, [])

  if (openIssues.length < 1) {
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
