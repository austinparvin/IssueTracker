import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Users from '../components/Users'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import { Button, ButtonGroup } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ImportanceButtons from '../components/ImportanceButtons'
import ActionItemInput from '../components/ActionItemInput'

const EditIssue = props => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  const issueId = props.match.params.issueId

  // Hooks
  const [issue, setIssue] = useState({})
  const [startDate, setStartDate] = useState()
  const [descriptionsToAdd, setDescriptionsToAdd] = useState([''])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rSelected, setRSelected] = useState(1)

  // Get Issue and ActionItems
  const getIssue = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Get Issue
    const resp = await axios.get(`api/issue/${issueId}`)
    setIssue(resp.data)

    // Grabbing due date from issue
    const date = new Date(resp.data.dueDate)
    if (resp.data.dueDate) {
      setStartDate(new Date(date.getTime() - date.getTimezoneOffset() * 60000))
    }

    // Get ActionItems
    const response = await axios.get(`/api/actionItem/${issueId}`)
    setDescriptionsToAdd(response.data.map(ai => ai.description).concat(['']))

    setRSelected(resp.data.importance)
  }

  useEffect(() => {
    getIssue()
  }, [])

  // Track Issue Details
  const trackIssueDetails = e => {
    const key = e.target.name
    let value = e.target.value

    if (key === 'ClaimedUserId') {
      value = parseInt(value)
      if (value === -1) {
        value = null
      }
    }

    setIssue(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  // Update Issue Function
  const updateIssue = async () => {
    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Delete The Current ActionItems
    const deleteResponse = await axios.delete(
      `/api/actionItem/list/${issueId}`,
      descriptionsToAdd
    )

    // Update Issue props to Put
    setIssue(oldIssue => {
      oldIssue['importance'] = rSelected
      oldIssue['dueDate'] = startDate
      return oldIssue
    })

    // Put Issue to Dd
    const resp = await axios.put(`/api/issue/${issue.id}`, issue)

    if (resp.status === 204) {
      // Add issueId and description to list of Action Items to add
      const actionItemsToAdd = descriptionsToAdd
        .filter(description => description.length > 0)
        .map(description => ({
          description: description,
          issueId: issue.id,
        }))

      // Posts Action Items to Db with Issue Ids
      await axios.post('/api/actionitem/list', actionItemsToAdd)

      setShouldRedirect(true)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/issue/details/${issueId}`} />
  }

  return (
    <section className="add-issue">
      <div className="add-issue-form">
        <input
          onChange={trackIssueDetails}
          type="text"
          className="title"
          name="title"
          placeholder="Title..."
          defaultValue={issue.title}
        />
        <textarea
          onChange={trackIssueDetails}
          name="description"
          rows="4"
          cols="50"
          placeholder="Description..."
          defaultValue={issue.description}
        />
        {descriptionsToAdd.map((description, index) => (
          <ActionItemInput
            setDescriptionsToAdd={setDescriptionsToAdd}
            descriptionsToAdd={descriptionsToAdd}
            description={description}
            index={index}
          />
        ))}
        <ImportanceButtons setRSelected={setRSelected} rSelected={rSelected} />
        <Users trackIssueDetails={trackIssueDetails} />
        <DatePicker
          placeholderText="Select Due Date"
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button onClick={updateIssue}>Update Issue</button>
      </div>
    </section>
  )
}

export default EditIssue
