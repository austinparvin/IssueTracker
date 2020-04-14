import React from 'react'

const ActionItem = ({ actionItem }) => {
  return (
    <div className="action-item">
      <div className="checkbox">
        <input className="checkbox" type="checkbox" name="" id=""></input>
      </div>
      <div className="description">
        <p>{actionItem.description}</p>
      </div>
    </div>
  )
}

export default ActionItem
