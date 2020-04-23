import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListOfActionItems from '../components/ListOfActionItems'
import { useAuth0 } from '../react-auth0-spa'

const IssueDetails = props => {
  const issueId = props.match ? props.match.params.issueId : props.issueId
  const { user } = useAuth0()
  const [issue, setIssue] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [redirectLocation, setRedirectLocation] = useState('')
  const getIssueById = async () => {
    const resp = await axios.get(`/api/issue/${issueId}`)
    setIssue(resp.data)
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
  const claimIssue = async () => {
    setIssue(oldIssue => {
      oldIssue['claimedUserEmail'] = user.email
      return oldIssue
    })
    const resp = await axios.put(`/api/issue/${issue.id}`, issue)
    if (resp.status === 204) {
      setRedirectLocation('my')
      setShouldRedirect(true)
    }
  }
  useEffect(() => {
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
    <div className="issue-details-page">
      <section className="issue-details">
        <div>
          <header>{issue.title}</header>
        </div>
        <p>{issue.description}</p>
        <ListOfActionItems issueId={issueId} />
        <div className="buttons">
          {!issue.claimedUserEmail ? (
            <button onClick={claimIssue}>Claim Issue</button>
          ) : (
            ''
          )}
          <div className="icons">
            <Link to={`/issue/edit/${issue.id}`}>
              <div className="edit"> &#x270F;</div>
            </Link>
            <div onClick={closeIssue} className="close">
              &#x2612;
            </div>
            {user.email === issue.userEmail ? <DeleteButton /> : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default IssueDetails
