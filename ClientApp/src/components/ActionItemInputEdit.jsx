import React from 'react'

const ActionItemInputEdit = ({ trackActionItems, id, actionItem }) => {
  return (
    <div className="action-item">
      <input className="checkbox" type="checkbox" name="" id=""></input>
      <input
        onChange={trackActionItems}
        defaultValue={actionItem.description}
        className="description"
        type="text"
        title={actionItem.id}
        id={id}
      />
    </div>
  )
}

export default ActionItemInputEdit
