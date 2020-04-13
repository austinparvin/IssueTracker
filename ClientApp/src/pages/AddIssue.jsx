import React, { useState } from 'react'
import axios from 'axios'
import ActionItemInput from '../components/ActionItemInput'
import { Redirect } from 'react-router-dom'

const AddIssue = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')

  // Hooks
  const [issueToAdd, setIssueToAdd] = useState({})
  const [actionItemsToAdd, setActionItemsToAdd] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Hook Trackers
  const trackIssueDetails = e => {
    const key = e.target.name
    const value = e.target.value
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
  const getCurrentUserId = async () => {
    const resp = await axios.get('api/profile')
    setIssueToAdd(oldIssue => {
      oldIssue['userId'] = resp.data
      return oldIssue
    })
  }

  const addIssueToApi = async () => {
    const response = await axios.get('api/profile')
    setIssueToAdd(oldIssue => {
      oldIssue['userId'] = response.data
      return oldIssue
    })

    // Post Issue to Dd
    const resp = await axios({
      method: 'POST',
      url: '/api/issue',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: issueToAdd,
    })

    console.log(resp.data.id)

    if (resp.status === 201) {
      // Add issue Id to list of Action Items
      setActionItemsToAdd(prevActionItems => {
        prevActionItems.forEach(i => (i.issueId = resp.data.id))
        return prevActionItems
      })

      // Posts Action Items to Db with Issue Ids
      await axios.post('/api/actionitem/list', actionItemsToAdd)

      setShouldRedirect(true)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/issues/my" />
  }

  // Return a true or false for if all input fields
  const ActionItems = () => {
    const [inputList, setInputList] = useState([
      <ActionItemInput id="0" trackActionItemsToAdd={trackActionItemsToAdd} />,
    ])

    // Adds Action Items
    const onAddBtnClick = event => {
      setInputList(
        inputList.concat(
          <ActionItemInput
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

      <button onClick={addIssueToApi}>Add Issue</button>
    </div>
  )
}

export default AddIssue
