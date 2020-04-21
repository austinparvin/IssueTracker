// src/App.js

import React from 'react'
import NavBar from './components/NavBar'
import { useAuth0 } from './react-auth0-spa'

import { Router, Route, Switch } from 'react-router-dom'
import Profile from './components/Profile'
import history from './utils/history'

import PrivateRoute from './components/PrivateRoute'
import MyIssues from './pages/MyIssues'
import AvailableIssues from './pages/AvailableIssues'
import AddIssue from './pages/AddIssue'
import ClosedIssues from './pages/ClosedIssues'
import EditIssue from './pages/EditIssue'
import IssueDetails from './pages/IssueDetails'
import NotFound from './pages/NotFound'

function App() {
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/issues/my" component={MyIssues} />
          <PrivateRoute path="/issues/avail" component={AvailableIssues} />
          <PrivateRoute path="/issues/add" component={AddIssue} />
          <PrivateRoute path="/issues/closed" component={ClosedIssues} />
          <PrivateRoute
            exact
            path="/issue/edit/:issueId"
            component={EditIssue}
          />
          <PrivateRoute
            exact
            path="/issue/details/:issueId"
            component={IssueDetails}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
