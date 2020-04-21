import React, { useState } from 'react'
import axios from 'axios'
import ActionItemInput from '../components/ActionItemInput'
import Users from '../components/Users'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'

const AddIssue = () => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  console.log(user)

  // Authorization

  // Hooks
  const [issueToAdd, setIssueToAdd] = useState({ ClaimedIssueId: null })
  const [actionItemsToAdd, setActionItemsToAdd] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

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

  const trackActionItemsToAdd = e => {
    const value = e.target.value
    const id = e.target.id
    setActionItemsToAdd(oldActionItems => {
      oldActionItems[id] = { description: value, issueId: 0 }
      return oldActionItems
    })
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
      setActionItemsToAdd(prevActionItems => {
        prevActionItems.forEach(i => {
          i.issueId = resp.data.id
        })
        return prevActionItems
      })

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

  // if (shouldRedirect) {
  //   return <Redirect to="/issues/my" />
  // }

  // Return a true or false for if all input fields
  const ActionItems = () => {
    const [inputList, setInputList] = useState([
      <ActionItemInput
        key="0"
        id="0"
        trackActionItemsToAdd={trackActionItemsToAdd}
      />,
    ])

    // Adds Action Items
    const onAddBtnClick = event => {
      setInputList(
        inputList.concat(
          <ActionItemInput
            key={inputList.length}
            id={inputList.length}
            trackActionItemsToAdd={trackActionItemsToAdd}
          />
        )
      )
    }

    return (
      <div className="action-item-input-list">
        {inputList}
        <button onClick={onAddBtnClick}>Add Action Item</button>
      </div>
    )
  }

  return (
    <div className="add-issue">
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

      <ActionItems />
      {/* <Users trackIssueDetails={trackIssueDetails} /> */}
      <button onClick={addIssueToApi}>Add Issue</button>
    </div>
  )
}

export default AddIssue
