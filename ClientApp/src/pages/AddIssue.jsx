import React, { useState } from 'react'

const AddIssue = () => {
  const [issueToAdd, setIssueToAdd] = useState({})

  const trackIssueDetails = e => {
    const key = e.target.name
    const value = e.target.value
    setIssueToAdd(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  const addIssueToApi = () => {
    console.log(issueToAdd)
  }

  return (
    <div className="add-issue">
      <input
        onChange={trackIssueDetails}
        type="text"
        className="title"
        name="title"
        defaultValue="Title..."
      />

      <textarea
        onChange={trackIssueDetails}
        name="description"
        rows="4"
        cols="50"
        defaultValue="Description..."
      />

      <button onClick={addIssueToApi}>Add Issue</button>
    </div>
  )
}

export default AddIssue
