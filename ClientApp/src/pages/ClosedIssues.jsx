import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { useAuth0 } from '../react-auth0-spa'

import { Button, ButtonGroup } from 'reactstrap'

const ClosedIssues = () => {
  const { getTokenSilently, user } = useAuth0()
  const [myClosedIssues, setMyClosedIssues] = useState([])
  const [rSelected, setRSelected] = useState(0)

  const getMyClosedIssues = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get('api/issue/closed')
    setMyClosedIssues(resp.data)
  }

  const filterList = list => {
    if (rSelected == 0) {
      return list.filter(issue => issue.claimedUserEmail == user.email)
    } else if (rSelected == 1) {
      return list.filter(issue => issue.userEmail == user.email)
    } else if (rSelected == 2) {
      return list
    }
  }
  useEffect(() => {
    getMyClosedIssues()
  }, [])

  return (
    <section className="my-issues">
      <div className="assigned-created-btns-container">
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
          <Button
            className=""
            onClick={() => setRSelected(2)}
            active={rSelected === 2}
          >
            All Issues
          </Button>
        </ButtonGroup>
      </div>
      {filterList(myClosedIssues).map(issue => {
        return <IssueCard key={issue.id} issue={issue} />
      })}
    </section>
  )
}

export default ClosedIssues
