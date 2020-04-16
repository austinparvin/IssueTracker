import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ActionItem from '../components/ActionItem'
import { Link } from 'react-router-dom'

const IssueDetails = props => {
  const issueId = props.match.params.issueId
  const [currentUser, setCurrentUser] = useState({})
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

  const getCurrentUser = async () => {
    const resp = await axios.get('api/profile')
    console.log(resp.data)
    setCurrentUser(resp.data)
  }

  const claimIssue = async () => {
    setIssue(oldIssue => {
      oldIssue['claimedUserId'] = currentUser.id
      return oldIssue
    })
    const resp = await axios.put(`/api/issue/${issue.id}`, issue)
    if (resp.status === 204) {
      setRedirectLocation('my')
      setShouldRedirect(true)
    }
  }

  useEffect(() => {
    getCurrentUser()
    getIssueById()
  }, [])

  if (shouldRedirect) {
    return <Redirect to={`/issues/${redirectLocation}`} />
  }

  const DeleteButton = () => {
    return (
      <div onClick={deleteIssue} className="close">
        &#x1F5D1;
      </div>
    )
  }

  return (
    <section className="issue-details">
      <div>
        <header>{issue.title}</header>
        <div className="icons">
          <Link to={`/issue/edit/${issue.id}`}>
            <div className="edit"> &#x270F;</div>
          </Link>
          <div onClick={closeIssue} className="close">
            &#x2612;
          </div>
          {currentUser.id === issue.userId ? <DeleteButton /> : null}
        </div>
      </div>
      <p>{issue.description}</p>
      <div className="my-action-items">
        {actionItems.map(actionItem => {
          return <ActionItem key={actionItem.id} actionItem={actionItem} />
        })}
      </div>
      {!issue.claimedUserId ? (
        <button onClick={claimIssue}>Claim Issue</button>
      ) : (
        ''
      )}
    </section>
  )
}

export default IssueDetails
