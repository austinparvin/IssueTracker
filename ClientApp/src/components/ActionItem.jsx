import React from 'react'

const ActionItem = ({ actionItem }) => {
  return (
      
    <div className="action-item">
      <input className="checkbox" type="checkbox" name="" id=""></input>
      <p>{actionItem.description}</p>
    </div>
  )
}

export default ActionItem
