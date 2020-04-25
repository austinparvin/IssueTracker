import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Users from '../components/Users'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'

const EditIssue = props => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  const issueId = props.match.params.issueId

  // Hooks
  const [issue, setIssue] = useState({})
  const [descriptionsToAdd, setDescriptionsToAdd] = useState([''])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Get Issue and ActionItems
  const getIssue = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Get Issue
    const resp = await axios.get(`api/issue/${issueId}`)
    setIssue(resp.data)

    // Get ActionItems
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setDescriptionsToAdd(response.data.map(ai => ai.description).concat(['']))
  }

  useEffect(() => {
    getIssue()
  }, [])
  // Hook Trackers
  const trackIssueDetails = e => {
    console.log(e.target.value)

    const key = e.target.name
    let value = e.target.value

    if (key === 'ClaimedUserId') {
      value = parseInt(value)
      if (value === -1) {
        value = null
      }
    }

    setIssue(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  const trackActionItemsToAdd = (index, newDescription) => {
    let newDescriptionsToAdd = [
      ...descriptionsToAdd.slice(0, index),
      newDescription,
      ...descriptionsToAdd.slice(index + 1),
    ].filter(description => description.length > 0)
    const allFilled = newDescriptionsToAdd.every(
      description => description.length > 0
    )
    console.log({ newDescriptionsToAdd, allFilled })

    if (allFilled) {
      newDescriptionsToAdd = newDescriptionsToAdd.concat([''])
    }
    console.log(newDescriptionsToAdd)
    setDescriptionsToAdd(newDescriptionsToAdd)
  }

  // Axios calls

  const updateIssue = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Delete The Current ActionItems
    const deleteResponse = await axios.delete(
      `/api/actionItem/list/${issueId}`,
      descriptionsToAdd
    )

    // Post Issue to Dd
    const resp = await axios.put(`/api/issue/${issue.id}`, issue)

    console.log(resp)

    if (resp.status === 204) {
      // Add issue Id to list of Action Items
      const actionItemsToAdd = descriptionsToAdd
        .filter(description => description.length > 0)
        .map(description => ({
          description: description,
          issueId: issue.id,
        }))

      console.log(actionItemsToAdd)

      // Posts Action Items to Db with Issue Ids
      await axios({
        method: 'POST',
        url: '/api/actionitem/list',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: actionItemsToAdd,
      })

      setShouldRedirect(true)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/issue/details/${issueId}`} />
  }

  return (
    <section className="add-issue">
      <div className="add-issue-form">
        <input
          onChange={trackIssueDetails}
          type="text"
          className="title"
          name="title"
          placeholder="Title..."
          defaultValue={issue.title}
        />

        <textarea
          onChange={trackIssueDetails}
          name="description"
          rows="4"
          cols="50"
          placeholder="Description..."
          defaultValue={issue.description}
        />
        {descriptionsToAdd.map((description, index) => (
          <div className="action-item">
            <input
              className="checkbox"
              type="checkbox"
              name=""
              id=""
              disabled
            ></input>
            <input
              onChange={event =>
                trackActionItemsToAdd(index, event.target.value)
              }
              value={description}
              placeholder="Action Item..."
              className="description"
              type="text"
              name=""
            />
          </div>
        ))}
        <Users trackIssueDetails={trackIssueDetails} />
        <button onClick={updateIssue}>Update Issue</button>
      </div>
    </section>
  )
}

export default EditIssue
