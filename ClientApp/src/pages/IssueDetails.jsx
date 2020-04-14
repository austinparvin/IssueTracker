import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ActionItem from '../components/ActionItem'

const IssueDetails = props => {
  const issueId = props.match.params.issueId
  const [issue, setIssue] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [actionItems, setActionItems] = useState([])

  const getIssueById = async () => {
    const resp = await axios.get(`/api/issue/${issueId}`)
    setIssue(resp.data)
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setActionItems(response.data)
  }

  const closeIssue = async () => {
    setIssue(oldIssue => {
      oldIssue.isOpen = false
      return oldIssue
    })
    const resp = await axios.put(`/api/issue/${issueId}`, issue)
    console.log(resp.data)
    if (resp.status === 204) {
      setShouldRedirect(true)
    }
  }

  useEffect(() => {
    getIssueById()
  }, [])

  if (shouldRedirect) {
    return <Redirect to="/issues/my" />
  }

  return (
    <section className="issue-details">
      <div>
        <header>{issue.title}</header>
        <div className="icons">
          <div className="edit">&#934;</div>
          <div onClick={closeIssue} className="close">
            &#60;
          </div>
        </div>
      </div>
      <p>{issue.description}</p>
      <div className="my-action-items">
        {actionItems.map(actionItem => {
          return <ActionItem actionItem={actionItem} />
        })}
      </div>
    </section>
  )
}

export default IssueDetails
