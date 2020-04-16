import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = ({ trackIssueDetails }) => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const resp = await axios.get('api/user')
    setUsers(resp.data)
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <select onChange={trackIssueDetails} name="ClaimedUserId" id="users">
      <option value={-1}>Unassigned</option>
      {users.map(user => {
        return <option value={user.id}>{user.fullName}</option>
      })}
    </select>
  )
}

export default Users
