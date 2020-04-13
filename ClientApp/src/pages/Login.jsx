import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [token, setToken] = useState('')

  const logUserIntoApi = async () => {
    const resp = await axios.post('/auth/login', {
      email: loginEmail,
      password: loginPassword,
    })
    if (resp.status === 200) {
      console.log(resp.data)
      setToken(resp.data.token)
      // Store the token on the client's localstorage
      localStorage.setItem('token', resp.data.token)
      setShouldRedirect(true)
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + resp.data.token
    }
    // redirect the user to their MyIssues page
  }

  if (shouldRedirect) {
    return <Redirect to="/issues/my" />
  }

  return (
    <div>
      <section className="login">
        <section>
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
          />
        </section>
        <button onClick={logUserIntoApi}>Login</button>
      </section>
    </div>
  )
}

export default Login
