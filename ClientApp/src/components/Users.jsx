import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const resp = await axios.get('api/user')
    setUsers(resp.data)
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <select id="users">
      {users.map(user => {
        return <option value={user.id}>{user.fullName}</option>
      })}
    </select>
  )
}

export default Users
