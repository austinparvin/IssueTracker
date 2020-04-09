import React from 'react'

const ActionItemInput = ({ trackActionItemsToAdd }) => {
  return (
    <div className="action-item">
      <input className="checkbox" type="checkbox" name="" id=""></input>
      <input
        onChange={trackActionItemsToAdd}
        placeholder="Action Item..."
        className="description"
        type="text"
        name=""
        id="0"
      />
    </div>
  )
}

export default ActionItemInput
