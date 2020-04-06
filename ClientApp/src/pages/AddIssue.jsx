import React from 'react'

const AddIssue = () => {
  return (
    <div className="add-issue">
      <input type="text" className="title" name="title" value="Title..." />

      <textarea rows="4" cols="50">
        Description...
      </textarea>

      <button>Add Issue</button>
    </div>
  )
}

export default AddIssue
