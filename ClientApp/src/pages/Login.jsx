import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [token, setToken] = useState('')

  const logUserIntoApi = async () => {
    const resp = await axios.post('/auth/login', {
      email: loginEmail,
      password: loginPassword,
    })
    console.log(resp.data)
    setToken(resp.data.token)
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
