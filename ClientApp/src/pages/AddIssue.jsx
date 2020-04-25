import React, { useState } from 'react'
import axios from 'axios'
import ActionItemInput from '../components/ActionItemInput'
import Users from '../components/Users'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import { Button, ButtonGroup } from 'reactstrap'

const AddIssue = () => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  console.log(user)

  // Authorization

  // Hooks
  const [issueToAdd, setIssueToAdd] = useState({ ClaimedIssueId: null })
  const [descriptionsToAdd, setDescriptionsToAdd] = useState([''])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rSelected, setRSelected] = useState(1)

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

    setIssueToAdd(oldIssue => {
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
    setDescriptionsToAdd(newDescriptionsToAdd)
  }

  // Axios calls

  const addIssueToApi = async () => {
    // Set UserEmail on Issue
    setIssueToAdd(oldIssue => {
      oldIssue['userEmail'] = user.email
      return oldIssue
    })

    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Post Issue to Dd
    const resp = await axios.post('/api/issue', issueToAdd)

    console.log(resp.data.id)

    if (resp.status === 201) {
      // Add issue Id to list of Action Items
      const actionItemsToAdd = descriptionsToAdd
        .filter(description => description.length > 0)
        .map(description => ({
          description: description,
          issueId: resp.data.id,
        }))

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
    return <Redirect to="/issues/my" />
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
        />

        <textarea
          onChange={trackIssueDetails}
          name="description"
          rows="4"
          cols="50"
          placeholder="Description..."
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
        <section className="importance">
          <h5>Importance</h5>
          <ButtonGroup>
            <Button
              className="low importance-button"
              onClick={() => setRSelected(1)}
              active={rSelected === 1}
            >
              Low
            </Button>
            <Button
              className="medium importance-button"
              onClick={() => setRSelected(2)}
              active={rSelected === 2}
            >
              Medium
            </Button>
            <Button
              className="high importance-button"
              onClick={() => setRSelected(3)}
              active={rSelected === 3}
            >
              High
            </Button>
          </ButtonGroup>
        </section>
        <Users trackIssueDetails={trackIssueDetails} />
        <button onClick={addIssueToApi}>Add Issue</button>
      </div>
    </section>
  )
}

export default AddIssue
