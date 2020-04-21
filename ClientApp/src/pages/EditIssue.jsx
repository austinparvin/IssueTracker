import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ActionItemInputEdit from '../components/ActionItemInputEdit'
import ActionItemInput from '../components/ActionItemInput'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'

const EditIssue = props => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  // Hooks
  const issueId = props.match.params.issueId

  const [issue, setIssue] = useState({})
  const [actionItems, setActionItems] = useState([])
  const [actionItemsToAdd, setActionItemsToAdd] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Get Issue and ActionItems
  const getIssue = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.get(`api/issue/${issueId}`)
    setIssue(resp.data)
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setActionItems(response.data)
  }

  useEffect(() => {
    getIssue()
  }, [])

  // Hook Trackers
  const trackIssueDetails = e => {
    const key = e.target.name
    const value = e.target.value
    setIssue(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  const trackActionItems = e => {
    const value = e.target.value
    const id = e.target.id

    const title = parseInt(e.target.title)
    setActionItems(oldActionItems => {
      oldActionItems[id] = { id: title, description: value, issueId: 0 }
      return oldActionItems
    })
  }

  const trackActionItemsToAdd = e => {
    const value = e.target.value
    const id = e.target.id
    setActionItemsToAdd(oldActionItemsToAdd => {
      oldActionItemsToAdd[id] = { description: value, issueId: 0 }
      return oldActionItemsToAdd
    })
  }

  // Add Issue To Db api call
  const updateIssueToApi = async () => {
    setIssue(oldIssue => {
      oldIssue['userEmail'] = user.email
      return oldIssue
    })

    // Post Issue to Dd
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const resp = await axios.put(`/api/issue/${issue.id}`, issue)
    console.log(resp.data + 'Issue Updated')

    // Add issue Id to list of Action Items
    setActionItems(prevActionItems => {
      prevActionItems.forEach(i => {
        i.issueId = issue.id
      })
      return prevActionItems
    })

    setActionItemsToAdd(prevActionItemsToAdd => {
      prevActionItemsToAdd.forEach(i => {
        i.issueId = issue.id
      })
      return prevActionItemsToAdd
    })

    const rep = await axios.put('/api/actionitem/list', actionItems)
    console.log(rep.data)

    const filtered = actionItemsToAdd.filter(ai => {
      return ai != null
    })

    const postResp = await axios.post('/api/actionitem/list', filtered)
    console.log(postResp.data)

    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to={`/issue/details/${issue.id}`} />
  }

  // Return a true or false for if all input fields
  const ActionItems = () => {
    const [inputList, setInputList] = useState(
      actionItems.map((actionItem, i) => {
        return (
          <ActionItemInputEdit
            actionItem={actionItem}
            key={i}
            id={i}
            trackActionItems={trackActionItems}
          />
        )
      })
    )

    // Adds Action Items
    const onAddBtnClick = event => {
      setInputList(
        inputList.concat(
          <ActionItemInput
            key={inputList.length}
            id={inputList.length}
            trackActionItemsToAdd={trackActionItemsToAdd}
          />
        )
      )
    }

    return (
      <div className="action-item-input-list">
        {inputList}
        <button onClick={onAddBtnClick}>Add Action Item</button>
      </div>
    )
  }

  return (
    <div className="add-issue">
      <input
        onChange={trackIssueDetails}
        type="text"
        className="title"
        name="title"
        defaultValue={issue.title}
      />

      <textarea
        onChange={trackIssueDetails}
        name="description"
        rows="4"
        cols="50"
        defaultValue={issue.description}
      />

      <ActionItems />

      <button onClick={updateIssueToApi}>Update Issue</button>
    </div>
  )
}

export default EditIssue
