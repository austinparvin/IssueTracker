import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Issue from '../components/Issue'

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
        return <Issue key={issue.id} issue={issue} />
      })}
    </section>
  )
}

export default ClosedIssues
