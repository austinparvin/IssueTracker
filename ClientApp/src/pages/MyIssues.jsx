import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Issue from '../components/Issue'

const MyIssues = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')
  const [myIssues, setMyIssues] = useState([])

  const getMyIssues = async () => {
    const resp = await axios.get('api/issue/open')
    setMyIssues(resp.data)
  }

  const getCurrentUserId = async () => {
    const resp = await axios.get('api/profile')
    console.log(resp.data)
  }

  useEffect(() => {
    getCurrentUserId()
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
          return <Issue issue={issue} />
        })}
      </section>
    )
  }
}

export default MyIssues
