import React, { useState } from 'react'
import axios from 'axios'
import Users from '../components/Users'
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ImportanceButtons from '../components/ImportanceButtons'
import ActionItemInput from '../components/ActionItemInput'

const AddIssue = () => {
  const { user } = useAuth0()
  const { getTokenSilently } = useAuth0()
  console.log(user)

  // Authorization

  // Hooks
  const [startDate, setStartDate] = useState()
  const [issueToAdd, setIssueToAdd] = useState({ ClaimedIssueId: null })
  const [descriptionsToAdd, setDescriptionsToAdd] = useState([''])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [rSelected, setRSelected] = useState(1)

  // Hook Trackers
  const trackIssueDetails = e => {
    console.log(e.target.value)

    const key = e.target.name
    let value = e.target.value

    if (key === 'ClaimedUserId') {
      value = parseInt(value)
      if (value === -1) {
        value = null
      }
    }

    setIssueToAdd(oldIssue => {
      oldIssue[key] = value
      return oldIssue
    })
  }

  // Axios calls

  const addIssueToApi = async () => {
    // Set UserEmail on Issue
    setIssueToAdd(oldIssue => {
      oldIssue['userEmail'] = user.email
      oldIssue['importance'] = rSelected
      if (startDate) {
        oldIssue['dueDate'] = startDate.toISOString()
      }

      return oldIssue
    })

    // Get Token
    const token = await getTokenSilently()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    // Post Issue to Dd
    const resp = await axios.post('/api/issue', issueToAdd)

    console.log(resp.data.id)

    if (resp.status === 201) {
      // Add issue Id to list of Action Items
      const actionItemsToAdd = descriptionsToAdd
        .filter(description => description.length > 0)
        .map(description => ({
          description: description,
          issueId: resp.data.id,
        }))

      // Posts Action Items to Db with Issue Ids
      await axios({
        method: 'POST',
        url: '/api/actionitem/list',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: actionItemsToAdd,
      })

      setShouldRedirect(true)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/issues/my" />
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
        />

        <textarea
          onChange={trackIssueDetails}
          name="description"
          rows="4"
          cols="50"
          placeholder="Description..."
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
        <section className="date-picker">
          <DatePicker
            placeholderText="Select Due Date"
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </section>
        <button className="create-issue" onClick={addIssueToApi}>
          Add Issue
        </button>
      </div>
    </section>
  )
}

export default AddIssue
