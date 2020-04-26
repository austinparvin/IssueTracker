import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'

import { Button, ButtonGroup } from 'reactstrap'

const MyIssues = () => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  const [myIssues, setMyIssues] = useState([])
  const [rSelected, setRSelected] = useState(0)

  const getMyIssues = async () => {
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const resp = await axios.get(`api/issue/my/${user.email}`)
    setMyIssues(resp.data)
  }

  const filterList = list => {
    if (rSelected === 0) {
      return list.filter(issue => issue.claimedUserEmail === user.email)
    } else if (rSelected === 1) {
      return list.filter(issue => issue.userEmail === user.email)
    }
  }

  useEffect(() => {
    getMyIssues()
  }, [])

  if (myIssues.length < 1) {
    return (
      <section className="empty-my-issues">
        <header>You have no Issues</header>
        <Link to="/issues/create">
          <button>Add an Issue</button>
        </Link>
        <header>OR</header>
        <Link to="/issues/open">
          <button>Check Open Issues</button>
        </Link>
      </section>
    )
  } else {
    return (
      <section className="my-issues">
        {/* <div className="assigned-created-btns-container">
          <ButtonGroup className="assigned-created-btns">
            <Button
              className=""
              onClick={() => setRSelected(0)}
              active={rSelected === 0}
            >
              Assigned
            </Button>
            <Button
              className=""
              onClick={() => setRSelected(1)}
              active={rSelected === 1}
            >
              Created
            </Button>
          </ButtonGroup>
        </div> */}
        {filterList(myIssues).map(issue => {
          return <IssueCard key={issue.id} issue={issue} />
        })}
      </section>
    )
  }
}

export default MyIssues
