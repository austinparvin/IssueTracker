import React from 'react'

const ActionItemInput = ({ trackActionItemsToAdd, id }) => {
  return (
    <div className="action-item">
      <input className="checkbox" type="checkbox" name="" id=""></input>
      <input
        onChange={trackActionItemsToAdd}
        placeholder="Action Item..."
        className="description"
        type="text"
        name=""
        id={id}
      />
    </div>
  )
}

export default ActionItemInput
