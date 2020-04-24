import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../auth_config.json'

const Users = ({ trackIssueDetails }) => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    // Get Token
    const token = config.usersToken
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('https://dev-om43iisv.auth0.com/api/v2/users')
    console.log(resp)
    setUsers(resp.data)
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <select onChange={trackIssueDetails} name="ClaimedUserEmail" id="users">
      <option value={-1}>Unassigned</option>
      {users.map(user => {
        return (
          <option key={user.email} value={user.email}>
            {user.name}
          </option>
        )
      })}
    </select>
  )
}

export default Users
