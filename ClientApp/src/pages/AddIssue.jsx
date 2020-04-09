import React, { useState } from 'react'
import axios from 'axios'
import ActionItemInput from '../components/ActionItemInput'

const AddIssue = () => {
  const [issueToAdd, setIssueToAdd] = useState({})
  const [actionItemsToAdd, setActionItemsToAdd] = useState([])

  // State Trackers
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

  const addIssueToApi = async () => {
    // Post Issue to Dd
    const resp = await axios.post('/api/issue', issueToAdd)
    console.log(resp.data)

    // Add issue Id to list of Action Items
    setActionItemsToAdd(prevActionItems => {
      prevActionItems.forEach(i => (i.issueId = resp.data.id))
      return prevActionItems
    })

    // Posts Action Items to Db with Issue Ids
    await axios.post('/api/actionitem/list', actionItemsToAdd)
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

      <ActionItemInput trackActionItemsToAdd={trackActionItemsToAdd} />

      <div className="action-item">
        <input className="checkbox" type="checkbox" name="" id=""></input>
        <input
          onChange={trackActionItemsToAdd}
          placeholder="Action Item..."
          className="description"
          type="text"
          name=""
          id="1"
        />
      </div>

      <button onClick={addIssueToApi}>Add Issue</button>
    </div>
  )
}

export default AddIssue
