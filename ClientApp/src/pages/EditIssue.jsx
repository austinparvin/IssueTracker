import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ActionItemInput from '../components/ActionItemInput'
import { Redirect } from 'react-router-dom'

const EditIssue = props => {
  // Authentication
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')

  // Hooks
  const issueId = props.match.params.issueId
  const [issue, setIssue] = useState({})
  const [actionItems, setActionItems] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Get Issue and ActionItems
  const getIssue = async () => {
    const resp = await axios.get(`api/issue/${issueId}`)
    console.log(resp.data)
    setIssue(resp.data)
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setActionItems(response.data)
  }

  // Hook Trackers
  const trackIssueDetails = e => {
    const key = e.target.name
    const value = e.target.value
    setIssue(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  const trackActionItemsToAdd = e => {
    const value = e.target.value
    const id = e.target.id
    setActionItems(oldActionItems => {
      oldActionItems[id] = { description: value, issueId: 0 }
      return oldActionItems
    })
  }

  const addIssueToApi = async () => {
    const response = await axios.get('api/profile')
    setIssue(oldIssue => {
      oldIssue['userId'] = response.data
      return oldIssue
    })

    // Post Issue to Dd
    const resp = await axios({
      method: 'PUT',
      url: '/api/issue',
      data: issue,
    })

    if (resp.status === 201) {
      // Add issue Id to list of Action Items
      setActionItems(prevActionItems => {
        prevActionItems.forEach(i => (i.issueId = resp.data.id))
        return prevActionItems
      })

      // Posts Action Items to Db with Issue Ids
      await axios.post('/api/actionitem/list', actionItems)

      setShouldRedirect(true)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/issues/my" />
  }

  // Return a true or false for if all input fields
  const ActionItems = () => {
    const [inputList, setInputList] = useState([
      <ActionItemInput id="0" trackActionItemsToAdd={trackActionItemsToAdd} />,
    ])

    // Adds Action Items
    const onAddBtnClick = event => {
      setInputList(
        inputList.concat(
          <ActionItemInput
            id={inputList.length}
            trackActionItemsToAdd={trackActionItemsToAdd}
          />
        )
      )
    }
    useEffect(() => {
      getIssue()
    }, [])
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

      <button onClick={addIssueToApi}>Add Issue</button>
    </div>
  )
}

export default EditIssue
