import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ActionItem from '../components/ActionItem'
import { Link } from 'react-router-dom'

const IssueDetails = props => {
  const issueId = props.match.params.issueId
  const [issue, setIssue] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [redirectLocation, setRedirectLocation] = useState('')
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
      setRedirectLocation('my')
      setShouldRedirect(true)
    }
  }

  const deleteIssue = async () => {
    const resp = await axios.delete(`/api/issue/${issueId}`)
    console.log(resp.data)
    if (resp.status === 200) {
      setRedirectLocation('closed')
      setShouldRedirect(true)
    }
  }

  useEffect(() => {
    getIssueById()
  }, [])

  if (shouldRedirect) {
    return <Redirect to={`/issues/${redirectLocation}`} />
  }

  return (
    <section className="issue-details">
      <div>
        <header>{issue.title}</header>
        <div className="icons">
          <Link to={`/issue/edit/${issue.id}`}>
            <div className="edit">&#934;</div>
          </Link>
          <div onClick={closeIssue} className="close">
            &#60;
          </div>
          <div onClick={deleteIssue} className="close">
            &
          </div>
        </div>
      </div>
      <p>{issue.description}</p>
      <div className="my-action-items">
        {actionItems.map(actionItem => {
          return <ActionItem key={actionItem.id} actionItem={actionItem} />
        })}
      </div>
    </section>
  )
}

export default IssueDetails
