import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Issue from '../components/Issue'

const AvailableIssues = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')
  const [availableIssues, setAvailableIssues] = useState([])

  const getAvailableIssues = async () => {
    const resp = await axios.get('api/issue/available')
    setAvailableIssues(resp.data)
  }

  const getCurrentUser = async () => {
    const resp = await axios.get('api/profile')
    console.log(resp.data)
  }

  useEffect(() => {
    getCurrentUser()
    getAvailableIssues()
  }, [])

  if (availableIssues.length < 1) {
    return (
      <section className="empty-my-issues">
        <header>You have no Issues</header>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {availableIssues.map(issue => {
          return <Issue key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default AvailableIssues