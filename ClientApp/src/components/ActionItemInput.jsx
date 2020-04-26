import React from 'react'

const ActionItemInput = ({
  setDescriptionsToAdd,
  descriptionsToAdd,
  index,
  description,
}) => {
  const trackActionItemsToAdd = (index, newDescription) => {
    let newDescriptionsToAdd = [
      ...descriptionsToAdd.slice(0, index),
      newDescription,
      ...descriptionsToAdd.slice(index + 1),
    ].filter(description => description.length > 0)
    const allFilled = newDescriptionsToAdd.every(
      description => description.length > 0
    )
    console.log({ newDescriptionsToAdd, allFilled })

    if (allFilled) {
      newDescriptionsToAdd = newDescriptionsToAdd.concat([''])
    }
    setDescriptionsToAdd(newDescriptionsToAdd)
  }
  return (
    <div key={index} className="action-item">
      <input
        className="checkbox"
        type="checkbox"
        name=""
        id=""
        disabled
      ></input>
      <input
        onChange={event => trackActionItemsToAdd(index, event.target.value)}
        value={description}
        placeholder="Action Item..."
        className="description"
        type="text"
        name=""
      />
    </div>
  )
}

export default ActionItemInput
