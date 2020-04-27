import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListOfActionItems from '../components/ListOfActionItems'
import { useAuth0 } from '../react-auth0-spa'
import LoadingSpinner from '../components/LoadingSpinner'

const IssueDetails = props => {
  const issueId = props.match ? props.match.params.issueId : props.issueId
  const { user } = useAuth0()
  const [issue, setIssue] = useState({})
  const [dueDate, setDueDate] = useState()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [redirectLocation, setRedirectLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getIssueById = async () => {
    setIsLoading(true)
    const resp = await axios.get(`/api/issue/${issueId}`)
    setIssue(resp.data)
    if (resp.data.dueDate) {
      const date = new Date(resp.data.dueDate)
      setDueDate(new Date(date.getTime() - date.getTimezoneOffset() * 60000))
    }
    setIsLoading(false)
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
  const releaseIssue = async () => {
    setIssue(oldIssue => {
      oldIssue['claimedUserEmail'] = null
      return oldIssue
    })
    const resp = await axios.put(`/api/issue/${issue.id}`, issue)
    if (resp.status === 204) {
      setRedirectLocation('my')
      setShouldRedirect(true)
    }
  }

  const formatDueByTime = hours => {
    if (hours > 744) {
      return Math.floor(hours / 744) + ' mo.'
    } else if (hours >= 48) {
      return Math.floor(hours / 24) + ' days'
    } else if (hours > 24) {
      return Math.floor(hours / 24) + ' day'
    } else if (hours > 1) {
      return Math.floor(hours) + ' hrs'
    } else if (hours > 0) {
      return Math.floor(hours * 60) + ' mins'
    } else {
      return 'Past Due'
    }
  }
  useEffect(() => {
    getIssueById()
  }, [])
  useEffect(() => {
    console.log(dueDate)
    console.log((dueDate - Date.now()) / 10000 / 360)
  }, [dueDate])
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
  const EditButton = () => {
    return (
      <Link to={`/issue/edit/${issue.id}`}>
        <div className="edit"> &#x270F;</div>
      </Link>
    )
  }
  if (isLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <section className="issue-details-page">
        <section className="issue-details">
          <div className="title-n-importance">
            <header>{issue.title}</header>
            <div className="dueDate">
              {dueDate && issue.isOpen
                ? formatDueByTime((dueDate - Date.now()) / 10000 / 360)
                : ''}
            </div>
            <span className={`badge text-right bgc-${issue.importance}`}>
              !
            </span>
          </div>
          <p>{issue.description}</p>
          <ListOfActionItems issueId={issueId} />
          <div className="buttons">
            {!issue.claimedUserEmail ? (
              <button onClick={claimIssue}>Claim Issue</button>
            ) : (
              <button onClick={releaseIssue}>Release Issue</button>
            )}
            <div className="icons">
              {user.email === issue.userEmail ? <EditButton /> : null}
              <div onClick={closeIssue} className="close">
                &#x2612;
              </div>
              {user.email === issue.userEmail ? <DeleteButton /> : null}
            </div>
          </div>
          <section className="claimed-by">
            {issue.claimedUserEmail
              ? 'Claimed by: ' + issue.claimedUserEmail
              : 'Available'}
          </section>
        </section>
      </section>
    )
  }
}

export default IssueDetails
