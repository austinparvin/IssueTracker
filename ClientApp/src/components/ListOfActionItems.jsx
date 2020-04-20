import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ActionItem from './ActionItem'

const ListOfActionItems = ({ issueId }) => {
  const [actionItems, setActionItems] = useState([])

  const GetActionItems = async () => {
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setActionItems(response.data)
  }
  useEffect(() => {
    GetActionItems()
  }, [])

  return (
    <div className="my-action-items">
      {actionItems.map(actionItem => {
        return <ActionItem key={actionItem.id} actionItem={actionItem} />
      })}
    </div>
  )
}

export default ListOfActionItems
