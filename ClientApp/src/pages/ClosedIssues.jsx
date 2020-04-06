import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
        return <Issue issue={issue} />
      })}
    </section>
    // <section className="empty-my-issues">
    //   <header>You have no Issues</header>
    //   <Link to="/issues/add">
    //     <button>Add an Issue</button>
    //   </Link>
    //   <header>OR</header>
    //   <Link to="/issues/avail">
    //     <button>Check Available Issues</button>
    //   </Link>
    // </section>
  )
}

export default ClosedIssues
