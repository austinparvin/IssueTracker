import React, { useState } from 'react'
import axios from 'axios'

const ActionItem = ({ actionItem }) => {
  const [isChecked, setIsChecked] = useState(actionItem.isChecked)

  const trackIsChecked = async () => {
    actionItem.isChecked = !actionItem.isChecked
    setIsChecked(actionItem.isChecked)
    const resp = await axios.put(`api/actionitem/${actionItem.id}`, actionItem)
    console.log(resp.data)
  }

  let opts = {}
  if (isChecked) {
    opts['checked'] = 'checked'
  } else {
    opts['checked'] = ''
  }

  return (
    <div className="action-item">
      <div className="checkbox">
      <div class="cover"></div>
        <input
          onClick={trackIsChecked}
          className="checkbox"
          type="checkbox"
          name=""
          {...opts}
          id=""
        ></input>
      </div>
      <div className="description">
        <p>{actionItem.description}</p>
      </div>
    </div>
  )
}

export default ActionItem
